# Ogallala Aquifer Tracker — Version 3 Development Checkpoint

Date: August 12, 2026

## Safety status

Version 3 is being developed on the protected branch:

`v2-map-integration-20260812`

The live `main` branch and the current Version 2 landing page (`index.html`) have not been replaced by the Version 3 work.

## Version 3 files added or changed

- `v3.html` — separate Version 3 development entrance.
- `v3-map.html` — Version 3 navigation shell around the interactive timeline.
- `v3-windmill-hero.jpg` — optimized windmill/sunset title image.
- `v3-aquifer-visual.jpg` — optimized blue aquifer explanatory visual.
- `map.html` — rebuilt interactive timeline/map for Version 3.

## Version 3 entrance (`v3.html`)

The new entrance includes:

- Windmill/sunset hero image shown unobstructed so the original title artwork is not duplicated by extra overlay text.
- Version 3 development badge.
- Clean launch panel beneath the hero image.
- Direct entrance to the Version 3 interactive timeline shell.
- Direct entrance to My Aquifer.
- Blue aquifer “What lies beneath” visual bridge.
- Clear note that the aquifer illustration is explanatory visual context, not the georeferenced interactive map.
- Four anchor-year cards:
  - 1950 — 100 — Baseline — all Healthy.
  - 1980 — 85 — Northern Good; Central Declining; Southern Declining.
  - 2026 — 60 — Northern Stable; Central Stressed; Southern Critical.
  - 2050 — 40 — Northern Stressed; Central Critical; Southern Severe.
- “Everything is connected” section connecting water, communities, land/habitat, and demand.
- Paths into Interactive Timeline, My Aquifer, and Groundwater Window.
- Mobile-friendly sticky navigation that scrolls horizontally instead of becoming a tall stacked menu.
- Improved keyboard focus treatment for major links and buttons.
- Mission line: “You cannot borrow from tomorrow’s groundwater.”

## Version 3 timeline shell (`v3-map.html`)

- Keeps Version 3 navigation visible while the interactive timeline is open.
- Provides direct routes to V3 Home, Interactive Timeline, My Aquifer, and Groundwater Window.
- Embeds the working `map.html` timeline rather than duplicating its map logic.
- Hides the older standalone map header/navigation inside the embedded view when same-origin access is available.
- Leaves the underlying map engine and year-switching logic unchanged.
- Uses horizontal scrolling for the navigation links on smaller screens.

## Version 3 interactive map (`map.html`)

Current Version 3 map work includes:

- Clearer four-year buttons and timeline controls.
- Working relative-health display for 1950 / 1980 / 2026 / 2050.
- Northern, Central, and Southern basin delineation with callouts.
- Basin and community colors change with the selected year.
- 28 tracker community reference locations.
- Selected-year dashboard integrated next to the map.
- Source-backed >150-foot long-term decline hotspot context shown only for 2026.
- Verified 2026 digital-infrastructure examples shown only in the 2026 view.
- Historical views do not display modern hotspot/data-center layers.
- Projection views do not present current hotspot/data-center observations as future measurements.
- Clear distinction between local impact and regional aquifer pressure.
- Tracker health percentages explicitly described as working communication indices, not percentages of remaining aquifer water.

## Important scientific guardrails

- A community marker is a reference location unless locality-specific evidence is cited.
- >150-foot decline rings are broad documented hotspot context, not claims that every nearby city has experienced a 150-foot decline.
- A nearby data center is not proof of a local well impact. Effects depend on water source, pumping rate, cooling design, recharge, hydraulic connectivity, and cumulative withdrawals.
- The 2050 view is a Tracker projection, not an observed measurement.

## Version 2 features to preserve as Version 3 develops

- Alliance-centered My Aquifer subscriber experience.
- Farmer/Irrigator, Town Resident/Municipal Water, and Rural/Private Well profiles.
- Water-Wise Living story and flower photographs.
- Wildflower garden video.
- Groundwater quality information.
- Private-well privacy-first design.
- Town + ZIP personalization concept.
- “Since your last visit” direction.
- Local-vs-regional data-center pressure framing.

## Next Version 3 build targets

1. Review `v3-map.html` at desktop and phone widths and confirm the embedded map remains comfortable to use.
2. Decide how much of the legacy standalone 1950 / 1980 / 2026 / 2050 pages should remain once the unified timeline is approved.
3. Continue integrating dashboard information into the unified experience rather than making the reader jump between separate legacy pages.
4. Expand the present-day infrastructure layer only with verified, source-backed facilities and water/cooling information.
5. Continue refining the basin geography and hotspot representation as better source geometry/data are incorporated.
6. Bring Version 3 navigation into Groundwater Window and, later, the My Aquifer experience without disrupting the current Version 2 landing page.
7. Review the full Version 3 branch before any merge to `main`.

## Product direction

Version 3 should feel like one coherent platform rather than a collection of separate pages:

**Story → Place → Time → Local relevance → Evidence → Practical choices**

Theme: **Everything is connected.**