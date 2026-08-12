# Version 3 Interaction QA — 2026-08-12

This is an internal QA note for the Version 3 preview.

## Navigation
- V3 Home, Interactive Timeline, Groundwater Window, and My Aquifer use the same primary navigation order.
- Mobile navigation uses horizontal scrolling rather than wrapping into multiple uneven rows.
- V2 `index.html` remains separate and is not rewritten by this QA pass.

## Interactive Timeline
- Opens at the 1950 baseline.
- Four anchor years remain visually dominant: 1950, 1980, 2026, 2050.
- Intermediate years 2030–2045 remain projection steps.
- Tracker working-index displays are presented without misleading percent signs in the Version 3 shell.
- Portales, New Mexico is restored to the rendered 28-community layer; Hereford remains a separate 2026 infrastructure example.
- Community markers, regional decline rings, and data-center pins receive keyboard focus, button roles, accessible labels, and Enter/Space activation in the V3 shell.
- Timeline year and working-index status use polite live-region updates for assistive technology.
- Autoplay stops at 2050 instead of wrapping immediately back to 1950.
- Manual year-button or slider interaction pauses autoplay so the interface does not fight the user.
- Mobile map scaling keeps the 500px internal map inside a narrow viewport while preserving marker interaction.

## Groundwater Window
- Opens at the 1950 baseline and uses the same V3 working-index language.
- The cross-section is explicitly labeled educational/illustrative rather than a surveyed engineering profile.
- The original core file contains exact placeholder well IDs, coordinates, depths, dates, and timeline values. In the Version 3 wrapper these values are hidden and the clickable wells are relabeled as illustrative profiles A/B/C.
- The well panel remains interactive, but it now explains that no placeholder well value is being asserted as a verified locality-specific measurement.
- This preserves the interaction concept while creating a clean future handoff point for a sourced monitoring-well data layer.

## Remaining QA before promotion
- Verify the rendered GitHub Pages preview on at least one desktop browser and one phone-sized viewport.
- Confirm external source links still open as expected in the deployed preview.
- Replace illustrative Groundwater Window well profiles with sourced well records only when an authoritative data source and field definitions are selected.
- Do not promote Version 3 over the current V2 landing page until the rendered preview has been reviewed end-to-end.