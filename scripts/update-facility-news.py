#!/usr/bin/env python3
"""Build the facility-specific daily news feed from Google News RSS.

The script applies explicit identity/location gates from the checked-in config.
It never edits the curated evidence already embedded in the facility profiles.
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


def build() -> int:
    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    previous = load_previous().get("profiles", {})
    now = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    profiles: dict[str, dict] = {}
    failures: list[str] = []

    for index, profile in enumerate(config["profiles"]):
        try:
            candidates = fetch_profile(profile, config["lookbackDays"])
            unique: list[dict[str, str]] = []
            seen: set[str] = set()
            for item in sorted(candidates, key=lambda row: row.get("publishedAt", ""), reverse=True):
                key = re.sub(r"\W+", " ", item["title"].casefold()).strip()
                if key in seen:
                    continue
                seen.add(key)
                unique.append(item)
            profiles[profile["id"]] = {
                "label": profile["label"],
                "checkedAt": now,
                "items": unique[: config["maxItemsPerProfile"]],
            }
        except Exception as error:  # Preserve last known-good data on transient feed errors.
            failures.append(f"{profile['id']}: {error}")
            profiles[profile["id"]] = previous.get(profile["id"], {
                "label": profile["label"],
                "checkedAt": None,
                "items": [],
            })
        if index + 1 < len(config["profiles"]):
            time.sleep(0.35)

    payload = {
        "generatedAt": now,
        "policy": "Automated candidates must match facility-specific identity and location terms. Curated evidence remains visible if no current match is found.",
        "profiles": profiles,
    }
    OUTPUT_PATH.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    if failures:
        print("Feed warnings:", *failures, sep="\n- ", file=sys.stderr)
    return 0


def self_test() -> int:
    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    ids = [profile["id"] for profile in config["profiles"]]
    assert len(ids) == 26
    assert len(ids) == len(set(ids))
    assert all(profile.get("query") and profile.get("requiredAny") for profile in config["profiles"])
    sample = """<?xml version='1.0'?><rss><channel>
      <item><title>Microsoft expands Cheyenne data center</title><link>https://example.com/1</link><pubDate>Wed, 09 Sep 2026 12:00:00 GMT</pubDate><source>Example News</source></item>
      <item><title>Microsoft opens an office in Seattle</title><link>https://example.com/2</link><pubDate>Wed, 09 Sep 2026 11:00:00 GMT</pubDate><source>Example News</source></item>
    </channel></rss>"""
    rows = parse_rss(sample)
    gates = [["microsoft"], ["cheyenne", "wyoming"], ["data center", "datacenter"]]
    assert len(rows) == 2
    assert matches(rows[0], gates)
    assert not matches(rows[1], gates)
    print("All 17 full profiles and 9 additional map markers, the parser, and relevance gates passed.")
    return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    raise SystemExit(self_test() if args.self_test else build())
