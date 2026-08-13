# Ogallala Aquifer Tracker — Version 3.2 Current Checkpoint

Date: August 12, 2026
Working branch: `version-3.2-working`

## Purpose
Version 3.2 is the active design/development branch. Versions 2 and 3 remain sacred, and the completed Version 3.1 visual-review state is preserved behind this branch.

## Current Version 3.2 direction
- Use the clean Ogallala Aquifer Tracker windmill hero with no Project 247 branding.
- Keep the homepage concise.
- Use the approved community/monitoring-well aquifer map as the working **Pretty Map**.
- The Pretty Map should become the shared visual base for the Interactive Timeline and the AI Data Centers layer.
- Keep the 28 community reference points available for concise public context.
- Alliance may be described as a hotspot when that terminology is tied directly to the controlling state source / well evidence.
- Keep a first-class **AI Data Centers** navigation button.
- Data-center status categories: **Operational**, **Under Construction**, and **Proposed**.
- The dedicated Data Centers experience is the deeper subscriber investigation layer and is separate from the Substack publication destination.
- Preserve `Publication · Substack` until the real publication URL is confirmed. Do not invent a URL.

## Completed in 3.2
- Created `version-3.2-working` from the preserved Version 3.1 edit state.
- Promoted `v3.html` visible branding to Version 3.2.
- Added a prominent gold-highlighted `AI Data Centers` navigation entry.
- Added `data-centers.html` as the dedicated subscriber Data Centers hub.
- Added the three facility status categories and a 17-profile gallery architecture.
- Added the Pretty Map integration point and explicit evidence/causation guardrails.
- Converted the outer Interactive Timeline, Groundwater Window, My Aquifer, and Sources shells to Version 3.2 navigation while preserving their underlying engines/content.
- Routed `My Aquifer` consistently through `v3-my-aquifer.html`; the preserved underlying `index.html` experience remains untouched.
- Kept the verified Version 3.1 Sources poster wired and explicitly preserved its provenance inside the Version 3.2 Sources page.
- Updated StackBlitz preview metadata to Version 3.2.
- Added `scripts/v3-2-smoke.mjs` and `.github/workflows/v3-2-smoke-test.yml` for branch-local browser QA.
- Removed the abandoned `.hero-transfer` staging chunks; they are not part of the product state.

## Browser QA — passed
GitHub Actions workflow: `V3.2 Branch Browser Smoke Test`
Run ID: `31672091967`
Head tested: `feef40dea58ec2bc9a942218c3d0d1a64e150ec2`
Result: **62/62 checks passed**.

The expanded suite verified, among other things:
- Version 3.2 identity and Data Centers navigation across the main subscriber-facing shells.
- Home hero still loads at 1672×941 resolution.
- Data Centers page, three project-status categories, 17-profile architecture, Pretty Map integration point, and causation guardrail.
- Interactive Timeline starts at 1950, reaches 2026, retains 28 communities, three regional hotspot markers, and three verified 2026 infrastructure examples.
- `Portales, NM` remains in the 28-community layer; `Hereford, TX` remains excluded from that layer.
- Groundwater Window keeps baseline index 100 and 2026 index 60 and retains non-percent language.
- My Aquifer wrapper still loads the preserved underlying experience.
- Sources poster remains wired, poster provenance is explicit, and all six evidence integrity rules remain present.
- Preserved V2 route still loads.
- No relevant desktop/mobile console errors.
- No page-level horizontal overflow across the six main Version 3.2 routes at 390px mobile width.
- Mobile Data Centers navigation remains touch-sized.

The final cleanup commits only delete abandoned transfer chunks and do not alter the tested product code.

## Pending visual asset wiring
1. **Clean hero**: recovered from the ChatGPT image library at full 1672×941 resolution, with Ogallala Aquifer Tracker branding and no Project 247. The current page still uses the previous high-resolution repo hero until the clean binary is transferred into GitHub.
2. **Pretty Map**: the approved map image / visual reference has been recovered from the image library. It shows the aquifer in three health zones with the community / monitoring reference points. Final binary wiring into GitHub remains pending.
3. **Data-center facility graphics**: 17 prepared facility images are planned for the profile library after their files are available in the repository.
4. **Groundwater Window**: concept retained, but its visual design is marked for a later rework.

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
