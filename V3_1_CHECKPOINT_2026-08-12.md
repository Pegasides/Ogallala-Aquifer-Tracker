# Ogallala Aquifer Tracker — Version 3.1 Working Checkpoint

**Date:** August 12, 2026  
**Active development branch:** `version-3.1-working`  
**Purpose:** Durable handoff/checkpoint so this work can be recovered quickly if the ChatGPT conversation is lost.

## Sacred restore points — DO NOT EDIT

- `version-2.0-sacred` — preserved Version 2 state.
- `version-3.0-sacred` — preserved validated Version 3 state at commit `3f8fe1c7997c8a4b29941a8b94ad0b6eda19c374`.
- `main` was still at the validated Version 3 base when Version 3.1 work began.
- All new work belongs on `version-3.1-working` unless explicitly promoted later.

## Version 3.1 work completed so far

### 1. Front-door hero image restored at high resolution

- The old V3 hero asset `v3-windmill-hero.jpg` was only about 320 × 180 px and roughly 6 KB, which explains the blur when enlarged.
- Quinn resubmitted the intended Nebraska sunset / windmill title image.
- The high-resolution file was manually uploaded to `version-3.1-working` as:
  - `ChatGPT Image Aug 8, 2026, 10_14_56 AM.png`
- Repository size of the new file is about 3.3 MB.
- `v3.html` now uses this new image as the Version 3.1 front-door hero.

### 2. Front-door wording reconciled

Version 3.1 now explicitly carries the language discussed previously:

- **OGALLALA AQUIFER TRACKER**
- **One of America’s greatest hidden natural resources**
- **Sometimes change begins in one yard.**

The V3.1 page title, badge, brand, navigation label, and supporting homepage language were updated so the developing version is clearly identified as **Version 3.1**.

### 3. Tracker navigation separated from publication / Substack context

The prior checkpoint called for separating the publication/newsletter experience from the Tracker/dashboard product experience.

Completed in:

- `v3.html`
- `v3-map.html`
- `groundwater-window.html`

The main product links are grouped under **Tracker**. A distinct **Publication · Substack** label is visually separated from the Tracker links.

Important: a final Substack URL was not recorded in the earlier checkpoint, so no destination was invented. The publication label is intentionally non-clicking until the real URL is supplied or confirmed.

### 4. Dedicated Sources / credibility page created

New file:

- `sources.html`

Purpose:

- Make the evidence behind the Tracker visible, readable, clickable, accessible, and updateable.
- Keep measured data, Tracker interpretation, and scenarios clearly separated.
- Give readers direct access to primary national and state/regional sources.

The page includes primary-source links for:

- USGS High Plains Water-Level Monitoring Study
- USGS High Plains Aquifer Groundwater Network
- USDA Natural Resources Conservation Service
- U.S. Census Bureau
- NOAA / NCEI
- Nebraska Department of Water, Energy, and Environment
- Nebraska Natural Resources Districts
- University of Nebraska–Lincoln groundwater resources
- Kansas Geological Survey
- Kansas Department of Agriculture Division of Water Resources
- Colorado Division of Water Resources
- Texas Water Development Board
- Oklahoma Water Resources Board
- New Mexico Office of the State Engineer
- Wyoming State Engineer’s Office
- South Dakota Department of Agriculture and Natural Resources

The Sources page is linked from the V3.1 Home, Interactive Timeline, and Groundwater Window navigation. The V3.1 home page also has a **Credibility — Sources That Inform Our Story** destination card.

### 5. Public-facing integrity rules added

The Sources page now states six core editorial/scientific rules:

1. **Index ≠ percent remaining.** Tracker indices are comparison scales, not percentages of aquifer water remaining.
2. **Regional context ≠ local measurement.** Broad decline zones are not automatically city-specific measurements.
3. **Infrastructure context ≠ causation.** Presence of a facility does not prove local hydrologic impact.
4. **Scenario ≠ forecast.** 2050 and intermediate future views are Tracker scenarios unless a source supports a forecast.
5. **Company claim ≠ independent finding.** Company statements remain attributed as company statements.
6. **Illustration ≠ surveyed profile.** The Groundwater Window is educational and illustrative, not a surveyed engineering profile or literal statewide water-table surface.

### 6. Original Sources poster audited before reuse

The preserved visual poster **Sources That Inform Our Story** was found in the ChatGPT file library and reviewed.

The original raster should **not** be published unchanged because it contains several details that needed correction:

- Nebraska source/domain reflected the older pre-merger structure.
- Wyoming used an older State Engineer domain.
- USDA text said **National Resources Conservation Service** instead of the official **Natural Resources Conservation Service**.
- Poster copyright still showed 2025.

Audit file created:

- `V3_1_SOURCES_AUDIT_2026-08-12.md`

The live `sources.html` directory is intended to be the controlling source directory whenever agency names or URLs change again.

### 7. Corrected Sources poster prepared — NOT YET UPLOADED TO GITHUB

A corrected 1536 × 1024 PNG has been prepared in the current ChatGPT session:

- `Ogallala_Aquifer_Tracker_Sources_Poster_V3_1_verified.png`

Corrections include:

- Nebraska: Department of Water, Energy, and Environment / `dwee.nebraska.gov`
- Wyoming: State Engineer’s Office / `seo.wyo.gov`
- USDA: **Natural Resources Conservation Service (NRCS)**
- Copyright updated to 2026

**Important:** this corrected PNG is currently in the ChatGPT working environment and has not yet been manually uploaded to GitHub.

## Exact next step after this checkpoint

1. Download `Ogallala_Aquifer_Tracker_Sources_Poster_V3_1_verified.png` from the ChatGPT conversation.
2. In GitHub, stay on branch `version-3.1-working`.
3. Choose **Add file → Upload files**.
4. Upload the corrected PNG to the repository root.
5. Suggested commit message: `Add verified Version 3.1 Sources poster`.
6. After the upload, have ChatGPT verify the filename and wire the poster into `sources.html`.
7. Keep the live HTML source directory as the controlling factual source; the poster is the visual expression of that verified directory.

## V3 scientific/editorial state that must remain intact

### Four anchor years

- 1950 — working index 100 — Northern Healthy / Central Healthy / Southern Healthy
- 1980 — working index 85 — Northern Good / Central Declining / Southern Declining
- 2026 — working index 60 — Northern Stable / Central Stressed / Southern Critical
- 2050 — working index 40 — Northern Stressed / Central Critical / Southern Severe

Intermediate projection steps remain 2030, 2035, 2040, and 2045.

### Community layer

The official 28-community set includes **Portales, NM** and does not include Hereford, TX as a community marker. Hereford remains only as a separate 2026 infrastructure/context pin.

### Decline context

The >150-foot decline rings are regional USGS context, not city-specific measurements.

### Data centers / infrastructure

The 2026 infrastructure layer is context, not attribution or proof of hydrologic impact.

### Groundwater Window

The cross-section is educational/illustrative. Placeholder well IDs, coordinates, depths, dates, or water-level values are not presented as verified locality-specific measurements in the official V3 wrapper.

## QA status inherited from sacred Version 3

The validated V3 browser smoke run previously passed **38/38 checks** after the Groundwater Window mutation-loop fix.

The existing GitHub Actions smoke workflow is still configured primarily for `main`; Version 3.1 branch-aware smoke testing still needs to be adapted before promotion.

## Version 3.1 files changed/added before this checkpoint

- `ChatGPT Image Aug 8, 2026, 10_14_56 AM.png` — added high-resolution hero image
- `v3.html` — V3.1 hero, wording, branding, navigation separation, Sources destination
- `v3-map.html` — V3.1 branding/navigation separation and Sources link
- `groundwater-window.html` — V3.1 branding/navigation separation and Sources link
- `sources.html` — new live verified Sources directory
- `V3_1_SOURCES_AUDIT_2026-08-12.md` — verification/audit trail
- `V3_1_CHECKPOINT_2026-08-12.md` — this handoff checkpoint

## Recovery instruction for a new ChatGPT conversation

Use this sentence:

> Continue the Ogallala Aquifer Tracker Version 3.1 work from `V3_1_CHECKPOINT_2026-08-12.md` in repo `Pegasides/Ogallala-Aquifer-Tracker`. Versions 2 and 3 are sacred. Active branch is `version-3.1-working`. The immediate next task is to upload and wire in the corrected verified Sources poster, then continue V3.1 QA.

That file should be read before making any further project changes.
