# Ogallala Aquifer Tracker — Version 3.1 Browser Preview

**Date:** August 12, 2026  
**Repository:** `Pegasides/Ogallala-Aquifer-Tracker`  
**Working branch:** `version-3.1-working`

## Purpose

Provide a human browser-review route for Version 3.1 without changing `main`, the live GitHub Pages site, `version-2.0-sacred`, or `version-3.0-sacred`.

GitHub's public `deploy-pages` action currently documents pull-request Pages previews as an alpha feature that is not publicly available. Therefore Version 3.1 is **not** being deployed over the production GitHub Pages site for review.

## Chosen review route: StackBlitz

StackBlitz officially supports importing a public GitHub repository at a specific branch, tag, or commit and running a start command from the repository's `package.json`.

Version 3.1 now includes a small preview-only `package.json` that starts a static `http-server` on port 3000. This file does not alter Tracker content and exists to let a browser-based development environment serve the branch correctly.

Current working-branch review route:

`https://stackblitz.com/github/Pegasides/Ogallala-Aquifer-Tracker/tree/version-3.1-working?file=v3.html&startScript=start&view=preview&initialpath=%2Fv3.html`

The GitHub branch remains the source of truth. Pushing new Version 3.1 commits updates what StackBlitz imports from that branch.

## Rejected routes — do not use

Two RawGitHack approaches were tested and rejected:

1. `raw.githack.com` returned HTTP 403 to the GitHub Actions validator.
2. `rawcdn.githack.com` served the files but inserted an **External Content Notice** interstitial instead of opening the Tracker directly.

Those routes are retained only in GitHub Actions history as an audit trail and should not be used for human review.

## What this preview is not

- It is **not** the production GitHub Pages site.
- It does **not** merge Version 3.1 into `main`.
- It does **not** alter Version 2 or sacred Version 3.
- It should not be treated as the final public publication URL.

## Existing branch QA

The independent branch-local GitHub Actions test remains the controlling automated QA for Version 3.1. The successful run passed **55/55 browser checks** against the branch files using a local server inside Actions.

Human browser review in StackBlitz is an additional visual/interaction review step, not a replacement for that automated QA.
