# Version 3 Release Readiness — 2026-08-12

This file records the release-readiness audit performed after the Version 3 interaction, mobile, source, and deployed-browser QA passes. It is an internal editorial/technical note, not a hydrologic data product.

## Current status

**Version 3 has passed its deployed browser smoke gate and is a release candidate ready for a final promotion decision.**

The Version 3 experience itself has no known release-blocking browser defect after the smoke pass described below. Replacing the root `index.html` still requires one controlled promotion-preparation step: preserve the exact current Version 2 root at a stable route and update Version 3's `My Aquifer` links before the root swap so those links do not loop back to Version 3.

## Deployment status

- GitHub Pages is enabled for `Pegasides/Ogallala-Aquifer-Tracker`.
- Pages publishes from branch `main`, repository root `/`.
- HTTPS is enforced.
- Pages route diagnostics returned HTTP 200 for `v3.html`, `v3-map.html`, `groundwater-window.html`, and `groundwater-window-core.html` during the successful smoke run.
- The release-candidate browser fix is on `main` at commit `df2b9d266d6b4d17f6db88ade84e1c1a7e54ca32`.

## Deployed browser smoke gate

A Playwright/Chromium smoke gate was added to the repository:

- `.github/workflows/v3-smoke-test.yml`
- `scripts/v3-smoke.mjs`

The workflow tests the deployed GitHub Pages site rather than only inspecting repository source.

### What the gate caught

The first browser run exposed a real Groundwater Window rendering defect: the Version 3 wrapper observed `#healthNumber` for mutations while also rewriting that same node on every observer callback. This produced a mutation loop that prevented the embedded Groundwater Window from becoming usable in the automated browser.

The wrapper was corrected so it rewrites the displayed index only when the text actually needs to change. The fix was committed as:

- `df2b9d266d6b4d17f6db88ade84e1c1a7e54ca32` — `Fix Groundwater Window mutation loop found by browser smoke test`

### Successful gate

GitHub Actions run `31615353335`, job `94176671074`, completed successfully after the fix.

**38 / 38 browser smoke checks passed.** The successful run verified:

- Version 3 home loads and the primary Interactive Timeline call-to-action works.
- V3 navigation order is Home → Interactive Timeline → Groundwater Window → My Aquifer.
- The timeline opens at 1950.
- Visible Tracker working-index displays do not use a percent sign.
- Anchor transitions 1950 / 1980 / 2026 / 2050 show indices 100 / 85 / 60 / 40.
- Intermediate projection steps are reachable and labeled as projection steps.
- Timeline autoplay stops at 2050 rather than wrapping immediately back to 1950.
- The 2026 map renders 28 community markers, 3 regional hotspot markers, and 3 infrastructure-context pins.
- Portales, NM is present in the rendered community layer and Hereford, TX is not treated as a tracker community.
- Community and infrastructure tooltips open from the keyboard.
- Groundwater Window opens at 1950 and removes the misleading percent sign from the working index.
- All four Groundwater anchor-year controls work.
- The illustrative profile card opens and closes, while placeholder measurement values remain hidden.
- My Aquifer navigation still reaches the current Version 2 experience while Version 2 remains at the root.
- No relevant desktop console errors were reported.
- At a 390-pixel mobile viewport, V3 Home, the Interactive Timeline shell, and Groundwater Window avoid page-level horizontal overflow.
- The mobile map scales inside its viewport.
- Mobile community tooltips work.
- Groundwater Window year controls render at 44 pixels high for touch use.
- No relevant mobile console errors were reported.

The browser/device smoke blocker is therefore **cleared**.

## Internal file / route audit

The Version 3 route chain and required local dependencies are present on `main`:

- `v3.html` — Version 3 home / preview
- `v3-map.html` — Version 3 timeline shell
- `v3-timeline.html` — embedded timeline/map experience
- `groundwater-window.html` — Version 3 Groundwater Window shell
- `groundwater-window-core.html` — preserved educational cross-section core
- `geography.js`
- `map-engine.js`
- `v3-windmill-hero.jpg`
- `v3-aquifer-visual.jpg`
- `index.html` — existing Version 2 landing / My Aquifer experience, intentionally unchanged during the Version 3 pass

## External source-link audit

The source destinations used by the current Version 3 map were rechecked and were available during the release-readiness audit.

### USGS
- High Plains Water-Level Monitoring Study: `https://ne.water.usgs.gov/projects/HPA/`
- Water-level Change in the High Plains Aquifer System: `https://www.usgs.gov/media/videos/water-level-change-high-plains-aquifer-system`

### Duos Technologies / Duos Edge AI
- Amarillo deployment: `https://ir.duostechnologies.com/news-events/press-releases/detail/832/duos-edge-ai-deploys-second-edge-data-center-in-amarillo`
- Hereford facility: `https://ir.duostechnologies.com/news-events/press-releases/detail/844/duos-edge-ai-to-host-hereford-edge-data-center-open-house`
- Lubbock facility: `https://ir.duostechnologies.com/news-events/press-releases/detail/840/duos-edge-ai-to-host-lubbock-edge-data-center-open-house`

The current wording should continue to distinguish company statements from independently measured hydrologic findings.

## Runtime dependency review

- `v3-timeline.html` loads D3 7.9.0 and TopoJSON Client 3.1.0 from jsDelivr.
- `map-engine.js` loads `us-atlas@3.0.1/states-10m.json` from jsDelivr to draw the eight-state geographic layer.
- The successful deployed browser run exercised the map with these runtime dependencies present.

## Promotion prerequisite

### Preserve the exact current Version 2 route before replacing root

Today, the Version 3 Home, Interactive Timeline, and Groundwater Window link `My Aquifer` to `index.html`, because Version 2 is still the root site. If Version 3 simply replaces `index.html` without changing those links, `My Aquifer` would point back to Version 3 instead of the preserved Version 2 subscriber experience.

Before promotion:

1. Copy the exact current `index.html` to a stable Version 2 route.
2. Update the Version 3 `My Aquifer` links to that preserved route.
3. Rerun the deployed browser smoke gate with the new routing expectation.
4. Only then replace root `index.html` with the Version 3 home.

This is a deployment-sequencing requirement, not a defect in the current Version 3 preview.

## Known technical debt — not current release blockers

### Rendered V3 shell and underlying timeline source are not yet fully normalized

`v3-map.html` currently corrects several presentation/data-label issues at runtime rather than rewriting the large `v3-timeline.html` source file. Most importantly:

- the rendered V3 community layer restores Portales, NM while the underlying `communities` array still contains Hereford, TX;
- the rendered V3 removes misleading percent signs from the Tracker working-index display while the underlying timeline source still contains legacy percent-format text in places.

The deployed browser gate verified the corrected rendered behavior. Normalizing the underlying source later would reduce maintenance risk.

### Groundwater Window well records remain illustrative placeholders in the preserved core

The preserved `groundwater-window-core.html` prototype contains specific well IDs, coordinates, depths, dates, and timeline water-level values that were not validated as a sourced monitoring-well dataset during this pass. The Version 3 wrapper hides those exact values and presents the clickable markers as illustrative profiles only. The deployed browser gate verified that the placeholder measurement grid remains hidden.

Do not expose the placeholder records as measurements unless they are replaced by a verified dataset.

## Promotion recommendation

**Version 3 has passed the release-candidate smoke gate. Do not perform an unprepared root swap.**

The next step is a final promotion decision. If promotion is approved, preserve the exact current Version 2 root at a stable route, repoint V3 `My Aquifer` navigation to it, rerun the smoke gate, and then promote Version 3 to `index.html` in a controlled final pass.
