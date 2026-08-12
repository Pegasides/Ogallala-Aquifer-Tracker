# Ogallala Aquifer Tracker — Current Version 3.1 Recovery Pointer

**Date:** August 12, 2026
**Repository:** `Pegasides/Ogallala-Aquifer-Tracker`
**Active branch:** `version-3.1-working`

## Sacred branches — do not edit

- `version-2.0-sacred`
- `version-3.0-sacred`

Do not merge or promote Version 3.1 to `main` without explicit approval.

## Latest hard checkpoint

The latest frozen recovery branch is:

`checkpoint-v3.1-visual-review-2026-08-12`

The application state frozen for today’s visual review is commit:

`d536d4434b4f63761ed5b8746353dc81fd06201f`

A dedicated handoff note records the exact stopping point:

`V3_1_VISUAL_REVIEW_CHECKPOINT_2026-08-12.md`

## Current Version 3.1 state

Version 3.1 remains branch-tested and green.

Completed work includes:

- high-resolution Version 3.1 hero installed;
- Tracker navigation separated from Publication · Substack context;
- live `sources.html` credibility directory with primary-source links and public integrity rules;
- corrected verified Sources poster displayed;
- Version 3.1-specific branch browser QA;
- StackBlitz human browser-preview route for reviewing 3.1 without changing `main` or GitHub Pages;
- crisp replacement aquifer overview image uploaded and wired into the “What lies beneath” section.

The new aquifer image is:

`ChatGPT Image Aug 8, 2026, 12_40_48 PM.png`

The image swap was committed as:

`d536d4434b4f63761ed5b8746353dc81fd06201f`

## Latest branch QA

Latest successful run after the aquifer-image swap:

- Workflow: `V3.1 Branch Browser Smoke Test`
- Run ID: `31628863392`
- Tested head: `d536d4434b4f63761ed5b8746353dc81fd06201f`
- Result: **success**

The older main-only workflow `.github/workflows/v3-smoke-test.yml` remains untouched and continues to serve sacred/main release testing.

## Human visual review — exact stopping point

The Version 3.1 browser preview was opened successfully. The high-resolution front hero was visually confirmed as crystal clear and strong.

Two review items were identified:

1. **Project 247 must be removed from the hero artwork.**
   - It is baked into the image, not HTML text.
   - Cleanup is still pending.
   - Preserve the rest of the hero composition and message.

2. **The lower aquifer overview image appeared blurry in the old preview.**
   - A crisp replacement was uploaded and wired into `v3.html`.
   - Automated QA passed after the swap.
   - Human confirmation of the new image is still pending because the first StackBlitz workspace was showing a stale clone.

A fresh exact-commit StackBlitz import was opened using commit `d536d4434b4f63761ed5b8746353dc81fd06201f`.

At the stopping point it was still displaying:

- Cloning repo from GitHub
- Mounting environment in StackBlitz

First action on return: let that exact-commit preview finish loading, scroll to **What lies beneath**, and confirm the new image is crisp. Then address the Project 247 hero cleanup.

## Main checkpoint and audit files

Read these before changing the project:

1. `V3_1_CHECKPOINT_CURRENT.md` — this current recovery pointer
2. `V3_1_VISUAL_REVIEW_CHECKPOINT_2026-08-12.md` — exact visual-review stopping point
3. `V3_1_QA_2026-08-12.md` — branch QA record
4. `V3_1_CHECKPOINT_2026-08-12.md` — detailed earlier handoff
5. `V3_1_SOURCES_AUDIT_2026-08-12.md` — Sources/poster verification trail
6. `V3_SOURCE_CHECK_2026-08-12.md` — scientific/editorial guardrails inherited from validated V3

## Scientific/editorial guardrails that remain in force

- Four narrative anchors: 1950 / 1980 / 2026 / 2050.
- Tracker working indices: 100 / 85 / 60 / 40; these are not percentages of aquifer water remaining.
- 2050 is a Tracker scenario, not a measured future condition.
- >150-foot decline rings are regional context, not city-specific measurements.
- Infrastructure/data-center locations are context, not attribution or proof of hydrologic impact.
- Official 28-community presentation includes Portales, NM; Hereford, TX is not a community marker and remains only a 2026 infrastructure/context location.
- Groundwater Window is educational/illustrative, not a surveyed engineering profile or literal statewide water-table surface.
- Keep `Publication · Substack` visible. No final Substack destination has been confirmed, so do not invent one.

## Recovery instruction

Say:

> Allie, continue from the Ogallala V3.1 visual-review checkpoint from August 12, 2026.

Then read `V3_1_CHECKPOINT_CURRENT.md` and `V3_1_VISUAL_REVIEW_CHECKPOINT_2026-08-12.md` before making further changes.

Work only on `version-3.1-working`. Versions 2 and 3 are sacred. Do not promote to `main` without explicit approval.
