# Ogallala Aquifer Tracker — Version 3 First Preview Milestone

**Moment recorded:** August 12, 2026 at approximately 3:12 AM CDT (America/Chicago)

## Why this file exists

This milestone records the moment when Quinn asked:

> “Can we memorialize this moment and save everything”

By this point, Version 3 had moved from an idea into a coherent development build and its first unlinked GitHub Pages preview had been published for review while the existing Version 2 homepage remained intact.

This file is intended to make the project recoverable even if a browser tab, local download, or ChatGPT conversation is lost.

## Repository

- Repository: `Pegasides/Ogallala-Aquifer-Tracker`
- GitHub Pages base: `https://pegasides.github.io/Ogallala-Aquifer-Tracker/`
- Current public homepage: Version 2 via `index.html`
- Version 3 preview: `https://pegasides.github.io/Ogallala-Aquifer-Tracker/v3.html`
- Version 3 preview timeline shell: `https://pegasides.github.io/Ogallala-Aquifer-Tracker/v3-map.html`

## Safety state at this milestone

The existing Version 2 homepage was **not replaced**.

At the moment of publication:

- `main` preview commit: `56893b633df093efa2042c2987c7189da7d10ac2`
- Version 3 protected development commit before this milestone note: `705489368f6caf666afd1d43c63fc5cc5324519f`
- Frozen published-preview branch: `v3-preview-milestone-20260812-0312`
- Frozen pre-note development branch: `v3-development-milestone-20260812-0312-base`

The GitHub Pages preview is **unlinked but public**, not password protected. Someone would need the exact URL to find it through normal use of the site because it is not linked from the Version 2 homepage.

## Version 3 identity

Version 3 is being treated as a substantial new generation of the Ogallala Aquifer Tracker rather than a patch to Version 2.

Its intended experience is:

**Story → Place → Time → Local relevance → Evidence → Practical choices**

Core theme:

**Everything is connected.**

Mission line:

**You cannot borrow from tomorrow’s groundwater.**

## Version 3 front door

`v3.html` now includes:

- Nebraska windmill/sunset title artwork.
- Version 3 development badge.
- A clean launch panel below the artwork rather than duplicate title text over the image.
- A blue aquifer explanatory visual showing “what lies beneath.”
- A clear disclaimer that the blue aquifer image is explanatory visual context, not the georeferenced interactive map.
- Four anchor years: 1950, 1980, 2026, and 2050.
- Direct paths to the Version 3 Interactive Timeline, My Aquifer, and Groundwater Window.
- Mobile-friendly horizontal navigation.
- Keyboard focus improvements.
- “Everything is connected” framing tying water, people, land, habitat, agriculture, industry, and infrastructure together.

## Version 3 interactive timeline

The Version 3 interactive map/timeline currently includes:

- Four anchor-year buttons plus a timeline slider.
- 1950 relative-health working index: 100.
- 1980 relative-health working index: 85.
- 2026 relative-health working index: 60.
- 2050 relative-health working index: 40 projected.
- Dynamic Northern, Central, and Southern basin conditions.
- Dynamic basin and community colors that change with the selected year.
- 28 modern tracker community reference locations.
- Selected-year dashboard information beside the map.
- Present-day >150-foot decline hotspot context shown only for 2026.
- Verified 2026 data-center examples shown only in the 2026 view.
- Projection views that intentionally hide present-day hotspot and data-center evidence so current observations are not mistaken for future measurements.
- Local-impact-versus-regional-pressure language for major water users and data centers.

## Basin working assessments

### 1950
- Overall: 100
- Northern: Healthy
- Central: Healthy
- Southern: Healthy

### 1980
- Overall: 85
- Northern: Good
- Central: Declining
- Southern: Declining

### 2026
- Overall: 60
- Northern: Stable
- Central: Stressed
- Southern: Critical

### 2050 projection
- Overall: 40
- Northern: Stressed
- Central: Critical
- Southern: Severe

The 100 / 85 / 60 / 40 values are **Tracker working communication indices**, not USGS percentages of remaining aquifer water.

## Scientific guardrails preserved at this milestone

- Community dots are reference locations unless locality-specific evidence is cited.
- The >150-foot decline layer represents broad source-backed hotspot context, not a claim that every nearby community has experienced a 150-foot decline.
- A nearby data center is not proof that it lowered a local well.
- Direct groundwater effects depend on water source, pumping rate, cooling design, recharge, hydraulic properties/connectivity, and cumulative withdrawals.
- The Tracker distinguishes local/direct potential effects from regional aquifer pressure.
- 2050 is a Tracker projection, not an observed measurement.
- Historical maps do not imply the modern 28-community monitoring/reference network existed in 1950 or 1980.

## Version 2 work preserved for continued integration

Version 3 development must preserve the strongest Version 2 work, including:

- Alliance-centered My Aquifer subscriber experience.
- Farmer/Irrigator profile.
- Town Resident/Municipal Water profile.
- Rural/Homeowner on Private Well profile.
- Privacy-first handling of private-well information.
- Groundwater quality information.
- Water-Wise Living story.
- Six wildflower/pollinator photographs.
- Wildflower garden video.
- Homeowner yard calculator.
- Water, financial, chemical/input, groundwater, and pollinator benefit framing.
- Town + ZIP personalization concept.
- “Since your last visit” direction.
- Local-vs-regional data-center pressure framing.

## Navigation architecture at this milestone

Version 3 has its own map shell, `v3-map.html`, so a reader entering through Version 3 stays inside a coherent Version 3 navigation experience while the already-tested map engine continues to run underneath.

Persistent Version 3 destinations are:

- V3 Home
- Interactive Timeline
- My Aquifer
- Groundwater Window

This shell approach was chosen specifically to avoid unnecessarily rewriting working map-engine code.

## Visual assets saved

- `v3-windmill-hero.jpg`
- `v3-aquifer-visual.jpg`

The windmill artwork is intentionally shown unobstructed because it already contains the project title treatment.

## Current preview publication

The first Version 3 preview is published for Quinn and Ali to review at:

`https://pegasides.github.io/Ogallala-Aquifer-Tracker/v3.html`

The live Version 2 homepage remains at the normal GitHub Pages root.

## What comes next

The next development phase should proceed deliberately from this saved milestone:

1. Review the Version 3 preview visually on laptop and phone.
2. Record Quinn’s reactions before major redesign changes.
3. Continue improving navigation and coherence across V3 Home, Interactive Timeline, My Aquifer, and Groundwater Window.
4. Continue integrating useful dashboard information into the unified experience.
5. Refine basin geography and hotspot representation as better source geometry/data are incorporated.
6. Expand present-day infrastructure only with verified source-backed facility, water, cooling, and power information.
7. Decide later how to retire or retain legacy standalone timeline/dashboard pages.
8. Do not replace the Version 2 homepage with Version 3 until the full Version 3 experience has been reviewed and intentionally approved.

## The moment

This is the first saved milestone where Version 3 existed simultaneously as:

- a protected development build,
- a coherent visual entrance,
- a unified timeline/map experience,
- a documented scientific framework,
- and a real GitHub Pages preview that could be opened and reviewed.

That is the state being preserved here.
