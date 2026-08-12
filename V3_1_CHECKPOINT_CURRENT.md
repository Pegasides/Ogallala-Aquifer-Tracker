# Ogallala Aquifer Tracker — Current Version 3.1 Recovery Pointer

**Date:** August 12, 2026
**Repository:** `Pegasides/Ogallala-Aquifer-Tracker`
**Active branch:** `version-3.1-working`

## Sacred branches — do not edit

- `version-2.0-sacred`
- `version-3.0-sacred`

## Current state

Version 3.1 is now in a green branch-tested state.

Completed work includes:

- high-resolution Version 3.1 hero installed and verified at 1672 × 941 px;
- Tracker navigation separated from Publication · Substack context;
- live `sources.html` credibility directory with current primary-source links and six public integrity rules;
- corrected verified Sources poster uploaded and displayed:
  - `Ogallala_Aquifer_Tracker_Sources_Poster_V3_1_verified.png`
  - verified browser dimensions 1536 × 1024 px;
- Version 3.1-specific branch browser QA created and passing.

The live HTML source directory is the controlling factual record; the poster is its visual expression.

## Version 3.1 branch QA

Separate QA files now exist so `version-3.1-working` is tested against its own files instead of the deployed `main` site:

- `.github/workflows/v3-1-smoke-test.yml`
- `scripts/v3-1-smoke.mjs`
- `V3_1_QA_2026-08-12.md`

The workflow starts a local static server inside GitHub Actions and runs Playwright Chromium against the checked-out Version 3.1 branch files.

Latest successful run:

- Workflow: `V3.1 Branch Browser Smoke Test`
- Run ID: `31623744643`
- Tested head commit: `ab580ead30c810b7d6eee09bf439672a2313f839`
- Result: **55/55 checks passed**

The run verified the high-resolution hero, verified Sources poster, V3.1 navigation, four anchor years, 2035 projection step, autoplay stop at 2050, 28 community markers, Portales/Hereford correction, regional hotspot and infrastructure layers, Groundwater Window framing, keyboard interaction, mobile layouts, Sources integrity rules, and clean relevant console output.

The older main-only workflow `.github/workflows/v3-smoke-test.yml` remains untouched and continues to serve sacred/main release testing.

## Main checkpoint and audit files

Read these before changing the project:

1. `V3_1_CHECKPOINT_CURRENT.md` — this current recovery pointer
2. `V3_1_CHECKPOINT_2026-08-12.md` — detailed earlier handoff
3. `V3_1_QA_2026-08-12.md` — branch QA record and run IDs
4. `V3_1_SOURCES_AUDIT_2026-08-12.md` — Sources/poster verification trail
5. `V3_SOURCE_CHECK_2026-08-12.md` — scientific/editorial guardrails inherited from validated V3

## Scientific/editorial guardrails that remain in force

- Four narrative anchors: 1950 / 1980 / 2026 / 2050.
- Tracker working indices: 100 / 85 / 60 / 40; these are not percentages of aquifer water remaining.
- 2050 is a Tracker scenario, not a measured future condition.
- >150-foot decline rings are regional context, not city-specific measurements.
- Infrastructure/data-center locations are context, not attribution or proof of hydrologic impact.
- Official 28-community presentation includes Portales, NM; Hereford, TX is not a community marker and remains only a 2026 infrastructure/context location.
- Groundwater Window is educational/illustrative, not a surveyed engineering profile or literal statewide water-table surface.

## Current development boundary

Do not merge or promote Version 3.1 to `main` without explicit approval.

`main`, `version-2.0-sacred`, and `version-3.0-sacred` remain outside normal Version 3.1 editing.

## Recommended next work

With branch-local QA now green, the next Version 3.1 work can be chosen deliberately rather than as emergency repair. Strong candidates are:

- visual review of the new front door and Sources page in a human browser before promotion;
- confirm/finalize the real Publication · Substack destination;
- normalize remaining technical debt in the underlying timeline source only if needed;
- prepare a controlled promotion plan after visual/editorial approval.

## Recovery instruction for a new ChatGPT conversation

Say:

> Continue the Ogallala Aquifer Tracker Version 3.1 work from `V3_1_CHECKPOINT_CURRENT.md` in repo `Pegasides/Ogallala-Aquifer-Tracker`. Versions 2 and 3 are sacred. Active branch is `version-3.1-working`. Branch-local V3.1 QA passed 55/55; do not merge to main without my approval.

Read this file before making further project changes.
