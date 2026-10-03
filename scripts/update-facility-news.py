#!/usr/bin/env python3
"""Publish reviewed facility evidence; RSS matches are research candidates only.

Identity gates cannot verify a claim, publication date or final government action.
Only checked-in curated items and their actual review dates may reach the public feed.
"""

from __future__ import annotations

import argparse
import email.utils
import html
import json
import re
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG_PATH = ROOT / "data" / "facility-news-config.json"
OUTPUT_PATH = ROOT / "data" / "facility-news.json"
USER_AGENT = "OgallalaAquiferTracker/3.5 (+https://ogallalatracker.com)"


def clean(value: str | None) -> str:
    return re.sub(r"\s+", " ", html.unescape(value or "")).strip()


def parse_rss(xml_text: str) -> list[dict[str, str]]:
    root = ET.fromstring(xml_text)
    rows: list[dict[str, str]] = []
    for item in root.findall("./channel/item"):
        title = clean(item.findtext("title"))
        link = clean(item.findtext("link"))
        source_node = item.find("source")
        source = clean(source_node.text if source_node is not None else "")
        published_raw = clean(item.findtext("pubDate"))
        if not title or not link:
            continue
        try:
            published = email.utils.parsedate_to_datetime(published_raw)
            if published.tzinfo is None:
                published = published.replace(tzinfo=timezone.utc)
            published_iso = published.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
        except (TypeError, ValueError):
            published_iso = ""
        rows.append({
            "title": title,
            "url": link,
            "source": source or "News report",
            "publishedAt": published_iso,
        })
    return rows


def matches(item: dict[str, str], required_groups: list[list[str]]) -> bool:
    haystack = f"{item.get('title', '')} {item.get('source', '')}".casefold()
    return all(any(term.casefold() in haystack for term in group) for group in required_groups)


def fetch_profile(profile: dict, lookback_days: int) -> list[dict[str, str]]:
    query = f"{profile['query']} when:{lookback_days}d"
    url = "https://news.google.com/rss/search?" + urllib.parse.urlencode({
        "q": query,
        "hl": "en-US",
        "gl": "US",
        "ceid": "US:en",
    })
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=25) as response:
        xml_text = response.read().decode("utf-8", errors="replace")
    return [item for item in parse_rss(xml_text) if matches(item, profile["requiredAny"])]


def load_previous() -> dict:
    if not OUTPUT_PATH.exists():
        return {"profiles": {}}
    try:
        return json.loads(OUTPUT_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {"profiles": {}}


def public_items(profile: dict, limit: int) -> list[dict]:
    """Dedupe approved direct sources; never combine them with RSS candidates."""
    unique = []
    seen = set()
    for item in sorted(profile.get("curatedItems", []), key=lambda row: row.get("publishedAt") or "", reverse=True):
        url = item["url"]
        parsed = urllib.parse.urlsplit(url)
        if parsed.scheme != "https" or parsed.hostname in {"news.google.com", "news.yahoo.com"}:
            raise ValueError(f"A reviewed direct source is required: {url}")
        key = (parsed.hostname, parsed.path.rstrip('/'), parsed.query)
        if key in seen:
            continue
        seen.add(key)
        unique.append(item)
    return unique[:limit]


def build(collect_candidates: bool = False) -> int:
    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    profiles: dict[str, dict] = {}
    failures: list[str] = []

    for profile in config["profiles"]:
        profiles[profile["id"]] = {
            "label": profile["label"],
            "checkedAt": profile["verifiedAt"],
            "items": public_items(profile, config["maxItemsPerProfile"]),
        }
        if collect_candidates:
            try:
                candidates = fetch_profile(profile, config["lookbackDays"])
                # Research-only output; never written into the public JSON.
                print(json.dumps({"profile": profile["id"], "unreviewedCandidates": candidates}, ensure_ascii=False))
            except Exception as error:
                failures.append(f"{profile['id']}: {error}")

    payload = {
        "generatedAt": max(profile["verifiedAt"] for profile in config["profiles"]),
        "policy": "Only reviewed direct sources are published. RSS matches are unreviewed research candidates and cannot replace curated evidence. Checked dates record editorial review, not an automated fetch.",
        "profiles": profiles,
    }
    OUTPUT_PATH.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    if failures:
        print("Feed warnings:", *failures, sep="\n- ", file=sys.stderr)
    return 0


def self_test() -> int:
    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    ids = [profile["id"] for profile in config["profiles"]]
    assert len(ids) == len(set(ids))
    registry_text = (ROOT / "v3.4-facility-registry.js").read_text(encoding="utf-8")
    registry = json.loads(re.search(r"const records = (\[.*?\]);", registry_text, re.S).group(1))
    assert set(ids) == {record["id"] for record in registry}, "News coverage must match the canonical registry"
    assert all(re.fullmatch(r"\d{4}-\d{2}-\d{2}", profile["verifiedAt"]) for profile in config["profiles"])
    assert all(profile.get("query") and profile.get("requiredAny") for profile in config["profiles"])
    assert all(
        all(item.get("title") and item.get("url") and item.get("source") and item.get("note")
            for item in profile.get("curatedItems", []))
        for profile in config["profiles"]
    )
    sample = """<?xml version='1.0'?><rss><channel>
      <item><title>Microsoft expands Cheyenne data center</title><link>https://example.com/1</link><pubDate>Wed, 09 Sep 2026 12:00:00 GMT</pubDate><source>Example News</source></item>
      <item><title>Microsoft opens an office in Seattle</title><link>https://example.com/2</link><pubDate>Wed, 09 Sep 2026 11:00:00 GMT</pubDate><source>Example News</source></item>
    </channel></rss>"""
    rows = parse_rss(sample)
    gates = [["microsoft"], ["cheyenne", "wyoming"], ["data center", "datacenter"]]
    assert len(rows) == 2
    assert matches(rows[0], gates)
    assert not matches(rows[1], gates)
    approved = {"title": "Reviewed fact", "url": "https://example.org/permit", "source": "Official record", "publishedAt": "2026-09-01", "note": "Permit issued."}
    probe = {"curatedItems": [approved, dict(approved)], "unreviewedCandidates": [rows[0], rows[1]]}
    assert public_items(probe, 3) == [approved], "Candidates and duplicate URLs must not reach the public feed"
    for profile in config["profiles"]:
        public_items(profile, config["maxItemsPerProfile"])
    print(f"All {len(ids)} canonical records, actual review dates, reviewed-source publication and identity gates passed.")
    return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--self-test", action="store_true")
    parser.add_argument("--collect-candidates", action="store_true", help="Print research candidates without publishing them")
    args = parser.parse_args()
    raise SystemExit(self_test() if args.self_test else build(args.collect_candidates))
