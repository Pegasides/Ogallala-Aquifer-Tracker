# Ogallala Aquifer Tracker — Version 3.1 Visual Review Hard Checkpoint

**Date:** August 12, 2026
**Repository:** `Pegasides/Ogallala-Aquifer-Tracker`
**Active development branch:** `version-3.1-working`
**Frozen checkpoint branch:** `checkpoint-v3.1-visual-review-2026-08-12`

## Sacred branches — do not edit

- `version-2.0-sacred`
- `version-3.0-sacred`

Do not merge or promote Version 3.1 to `main` without explicit approval.

## Exact code state frozen before this note

Frozen application commit:

`d536d4434b4f63761ed5b8746353dc81fd06201f`

That commit contains the latest Version 3.1 application state reviewed today.

Latest Version 3.1 browser smoke run after the aquifer-image swap:

- Workflow: `V3.1 Branch Browser Smoke Test`
- Run ID: `31628863392`
- Result: **success**
- Tested head: `d536d4434b4f63761ed5b8746353dc81fd06201f`

## Where the human visual review stopped

The Version 3.1 StackBlitz/browser preview opened successfully and the high-resolution front hero looked excellent and crystal clear.

Two visual-review issues were identified:

1. **Remove “Project 247” from the hero artwork.**
   - The phrase is baked into the hero image itself; it is not HTML text.
   - This cleanup is still pending.
   - Preserve the rest of the hero composition and the line about the Ogallala Aquifer / one of America’s greatest hidden natural resources.

2. **Replace the blurry aquifer overview image below the hero.**
   - A sharper image was uploaded to `version-3.1-working` as:
     `ChatGPT Image Aug 8, 2026, 12_40_48 PM.png`
   - `v3.html` was updated to use that image in the “What lies beneath” section.
   - Commit: `d536d4434b4f63761ed5b8746353dc81fd06201f`
   - Automated V3.1 browser QA passed after this swap.
   - Human visual confirmation is **not yet complete** because the first StackBlitz workspace was stale.

## StackBlitz preview state at the stopping point

The earlier StackBlitz workspace had cloned an older branch state, so refreshing it did not show the new aquifer image.

A fresh exact-commit StackBlitz import was then opened for commit:

`d536d4434b4f63761ed5b8746353dc81fd06201f`

Exact import URL used:

`https://stackblitz.com/github/Pegasides/Ogallala-Aquifer-Tracker/tree/d536d4434b4f63761ed5b8746353dc81fd06201f?file=v3.html&startScript=start&view=preview&initialpath=%2Fv3.html`

At the moment work stopped, StackBlitz was still showing:

- Cloning repo from GitHub
- Mounting environment in StackBlitz

## First action when resuming

1. Return to the exact-commit StackBlitz preview above.
2. Let it finish loading.
3. Scroll to **What lies beneath** and verify that the new aquifer image is the crisp uploaded version.
4. After that visual confirmation, address the **Project 247** hero-art cleanup without disturbing sacred V2 or V3.

## Existing Version 3.1 guardrails still in force

- Narrative anchors: 1950 / 1980 / 2026 / 2050.
- Tracker working indices: 100 / 85 / 60 / 40; not percentages of water remaining.
- 2050 is a Tracker scenario, not a measured future condition.
- >150-foot decline rings are regional context, not city-specific measurements.
- Infrastructure/data-center locations are context, not attribution.
- Official 28-community presentation includes Portales, NM; Hereford, TX remains infrastructure/context only.
- Groundwater Window is educational/illustrative, not a surveyed engineering profile.
- Keep “Publication · Substack” visible; no publication URL has been confirmed, so do not invent one.

## Recovery phrase

Say:

> Allie, continue from the Ogallala V3.1 visual-review checkpoint from August 12, 2026.

Then read, in order:

1. `V3_1_CHECKPOINT_CURRENT.md`
2. `V3_1_VISUAL_REVIEW_CHECKPOINT_2026-08-12.md`
3. `V3_1_QA_2026-08-12.md`

Work only on `version-3.1-working`. Versions 2 and 3 are sacred. Do not promote to `main` without explicit approval.
