# Version 3 Release Readiness — 2026-08-12

This file records the release-readiness audit performed after the Version 3 interaction and mobile passes. It is an internal editorial/technical note, not a hydrologic data product.

## Deployment status

- GitHub Pages is enabled for `Pegasides/Ogallala-Aquifer-Tracker`.
- Pages publishes from branch `main`, repository root `/`.
- HTTPS is enforced.
- The latest Pages build completed successfully with no reported build error.
- At the time of this audit, the Pages build commit and the `main` branch head were both `c445a389e3a4241f09fc66c46c2fc2a6706fc24c`.

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

The source destinations used by the current Version 3 map were rechecked and are still available:

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
- D3 7.9.0 remains present on jsDelivr during this audit.
- These remote dependencies are a normal runtime dependency of the current map and should be included in a browser smoke test before promotion.

## Release blockers / known technical debt

### 1. Browser/device smoke test still required before promotion
The repository, route, source-link, and code-level interaction audits are complete, and GitHub Pages reports a successful build. However, this audit environment cannot independently execute the deployed GitHub Pages experience in a full browser with JavaScript, touch input, and real viewport/device behavior. Before replacing the live Version 2 root landing page, perform one real-browser smoke test of:

- V3 Home → Interactive Timeline → Groundwater Window → My Aquifer
- 1950 / 1980 / 2026 / 2050 anchor transitions
- 2030–2045 projection steps
- timeline autoplay stopping at 2050
- community, hotspot, and infrastructure tooltips
- phone-width map scaling and touch targets
- Groundwater Window year controls and illustrative profile cards
- external source links

This is the remaining release blocker for promotion of Version 3 to the primary landing page.

### 2. Rendered V3 shell and underlying timeline source are not yet fully normalized
`v3-map.html` currently corrects several presentation/data-label issues at runtime rather than rewriting the large `v3-timeline.html` source file. Most importantly:

- the rendered V3 community layer restores Portales, NM while the underlying `communities` array still contains Hereford, TX;
- the rendered V3 removes misleading percent signs from the Tracker working-index display while the underlying timeline source still contains legacy percent-format text in places.

The rendered Version 3 experience is intentionally corrected by the shell, but normalizing the underlying source later would reduce maintenance risk.

### 3. Groundwater Window well records remain illustrative placeholders in the preserved core
The preserved `groundwater-window-core.html` prototype contains specific well IDs, coordinates, depths, dates, and timeline water-level values that were not validated as a sourced monitoring-well dataset during this pass. The Version 3 wrapper therefore hides those exact values and presents the clickable markers as illustrative profiles only. Do not expose the placeholder records as measurements unless they are replaced by a verified dataset.

## Promotion recommendation

**Do not replace `index.html` yet.** Treat Version 3 as a release candidate. The technical/source audit is in good shape, GitHub Pages is building the current `main`, and no source-link blocker was found. The remaining gate is a short real-browser smoke test of the deployed interaction flow. If that passes, Version 3 can move to a final promotion decision without another feature pass.
