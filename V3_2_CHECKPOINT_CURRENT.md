# Ogallala Aquifer Tracker — Version 3.2 Current Checkpoint

Date: August 13, 2026
Working branch: `version-3.2-working`

## Purpose
Version 3.2 is the active design/development branch. Versions 2 and 3 remain sacred, and the completed Version 3.1 visual-review state is preserved behind this branch.

## Current Version 3.2 direction
- Use the clean Ogallala Aquifer Tracker windmill hero with no Project 247 branding.
- Keep the homepage concise.
- Use the approved community/monitoring-well aquifer map as the working **Pretty Map** visual language.
- The Pretty Map should become the shared visual base for the Interactive Timeline and the AI Data Centers layer.
- Keep the 28 community reference points available for concise public context.
- Alliance may be described as a hotspot when that terminology is tied directly to the controlling state source / well evidence.
- Keep a first-class **AI Data Centers** navigation button.
- Data-center status categories: **Operational**, **Under Construction**, and **Proposed**.
- The dedicated Data Centers experience is the deeper subscriber investigation layer and is separate from the Substack publication destination.
- Preserve `Publication · Substack` until the real publication URL is confirmed. Do not invent a URL.

## Completed in 3.2
- Created `version-3.2-working` from the preserved Version 3.1 edit state.
- Promoted visible shell branding to Version 3.2 across Home, Timeline, Groundwater Window, My Aquifer, and Sources.
- Added a prominent gold-highlighted `AI Data Centers` navigation entry.
- Added `data-centers.html` as the dedicated subscriber Data Centers hub.
- Added the three facility status categories and a 17-profile gallery architecture.
- Added the Pretty Map integration point and explicit evidence/causation guardrails.
- Added `scripts/v3-2-smoke.mjs` and `.github/workflows/v3-2-smoke-test.yml`.
- Expanded V3.2 browser QA to 62 checks; run `31672091967` completed successfully with **62/62** checks passed.
- Froze milestone branch `checkpoint-v3.2-shell-data-centers-2026-08-12`.
- Recovered and installed the clean windmill hero as `v3-2-hero-clean.webp` and wired `v3.html` to it. The artwork has no Project 247 branding.
- Repaired the hero binary at commit `8b99446d5dd8f79f5976aa9c1ffd568ef32b6356`. One-time repair run `31674274112` verified the rebuilt file is exactly 50,060 bytes, matches SHA-256 `8353ac49b2b65b5f1dc118d80bb13d44fbbb2a298eeda612cb0dcd25487bc32a`, and identifies as a 1672×941 WebP before committing it.
- Recovered the approved Pretty Map reference from the image library and compressed a web reference copy as `v3-2-pretty-map-reference.webp`. This reference asset is now in the repository but has **not yet replaced the live interactive map**, because the interactive 28-community layer remains the controlling geographic/evidence layer and must preserve the Portales correction.

## Pending visual / data work
1. **Pretty Map integration**: use `v3-2-pretty-map-reference.webp` as the visual design reference, but do not blindly replace the live map with baked labels. Preserve the controlling 28-community interactive layer, including `Portales, NM` and excluding Hereford from the official 28-community set.
2. **Data-center map layer**: layer Operational / Under Construction / Proposed facility markers over the shared Pretty Map framework. Facility placement and claims must be sourced before publication.
3. **Data-center facility graphics**: user has 17 prepared facility images. Load these into the profile library after their files are available in the repository.
4. **Groundwater Window**: concept retained, but its visual design is marked for a later rework.
5. **Substack**: keep the visible publication marker. Do not invent the final destination URL.

## Locked evidence rules
- Tracker working index is not percent water remaining.
- Regional context is not a local well measurement.
- Infrastructure location is context, not proof of causation.
- Company claims are not independent findings.
- 2050 is a Tracker scenario, not a measured future or guaranteed forecast.
- Groundwater Window is educational / illustrative unless a profile is explicitly tied to sourced measurements.
- `Portales, NM` remains the official community reference; `Hereford, TX` is not part of the 28-community layer.

## Recovery instruction
Read this file first. Work only on `version-3.2-working`. Do not promote to `main` without explicit user approval. Do not edit the sacred Version 2 or Version 3 branches, and do not rewrite the preserved Version 3.1 checkpoints.

Recovery phrase: **“Allie, continue from the Ogallala V3.2 checkpoint.”**
