# Ogallala Aquifer Tracker — Version 3.1 Browser Preview

**Date:** August 12, 2026  
**Repository:** `Pegasides/Ogallala-Aquifer-Tracker`  
**Working branch:** `version-3.1-working`

## Purpose

Provide a human browser-review route for Version 3.1 without changing `main`, the live GitHub Pages site, `version-2.0-sacred`, or `version-3.0-sacred`.

GitHub's public `deploy-pages` action currently documents pull-request Pages previews as an alpha feature that is not publicly available. Therefore Version 3.1 is **not** being deployed over the production GitHub Pages site for review.

## Preview routes

### Frozen QA-passed checkpoint

Use this for deliberate visual review of the state frozen after the 55/55 branch QA pass:

`https://raw.githack.com/Pegasides/Ogallala-Aquifer-Tracker/checkpoint-v3.1-qa-pass-2026-08-12/v3.html`

### Current working branch

Use this when reviewing the newest Version 3.1 working changes:

`https://raw.githack.com/Pegasides/Ogallala-Aquifer-Tracker/version-3.1-working/v3.html`

## What this preview is

RawGitHack is a static-content proxy for public GitHub files that serves HTML, JavaScript, CSS, images, and related assets with browser-renderable content types. The Ogallala Aquifer Tracker repository is public, so this preview does not expose private repository content.

The working-branch preview may be briefly cached. The frozen checkpoint URL is intended for stable review.

## What this preview is not

- It is **not** the production GitHub Pages site.
- It does **not** merge Version 3.1 into `main`.
- It does **not** alter Version 2 or sacred Version 3.
- It should not be treated as the final public publication URL.

## Validation

A separate GitHub Actions public-preview smoke workflow should test an exact Version 3.1 commit through this public browser route before the link is handed off for human review.
