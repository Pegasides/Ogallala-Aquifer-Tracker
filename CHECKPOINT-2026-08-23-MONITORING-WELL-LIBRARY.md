# Ogallala Aquifer Tracker — Version 3.4 Continuity Checkpoint

**Checkpoint date:** August 23, 2026  
**Checkpoint name:** Monitoring Well Library foundation and two-library structure  
**Repository:** `Pegasides/Ogallala-Aquifer-Tracker`  
**Live version:** Version 3.4

## Decisions memorialized

1. The Tracker now has two separate subscriber libraries:
   - **AI Data Center Library** for facility profiles, current articles/government updates, and subscriber discussion.
   - **Monitoring Well Library** for groundwater monitoring-community and well profiles.
2. The former **Groundwater Window** navigation label is now **Monitoring Well Library** throughout Version 3.4.
3. The **AI Data Centers** navigation tab now uses the same aqua color, font, and active-tab treatment as **Interactive Timeline**; the earlier special gold treatment was removed.
4. The 2050 dashboard states **28 communities**, while only approximately 15 community labels are printed directly on the map. This is intentional for readability. Quinn reviewed the explanation and decided to **leave the map labeling as is**.
5. Colored triangles are AI data-center facilities and are not monitoring-community or monitoring-well markers.

## Monitoring Well Library landing map

- A dedicated 2050 monitoring-library map was created from the approved dashboard view.
- All colored AI data-center triangle markers were removed.
- The entire **AI DATA CENTERS** legend panel was removed.
- The 28-community directory, community dots and labels, basin boundaries, basin health colors, Tracker Working Index 40, and 2050 timeline presentation were preserved.
- The heading now reads **Explore the Monitoring Well Library**.
- Supporting copy invites users to explore well history, water levels, and available water-quality data.
- The cleaned map is placed at the top of the Monitoring Well Library page.
- The existing educational groundwater cross-section remains below it as a foundation for the future sourced profiles.

## Important upload correction

The first large monitoring-map upload was truncated/damaged even though the page HTML was correct. It was replaced with a new uncached asset:

- **Correct asset:** `monitoring-well-library-2050-v2.png`
- The live file was verified byte-for-byte against the completed local PNG.
- Verified dimensions: **1549 × 1015**, PNG, RGB.
- The page now references only the corrected `-v2` asset.

## Live links

- Monitoring Well Library:  
  `https://pegasides.github.io/Ogallala-Aquifer-Tracker/v3.4-groundwater-window.html?repair=final2`
- AI Data Center Library:  
  `https://pegasides.github.io/Ogallala-Aquifer-Tracker/v3.4-data-centers.html?v=monitoringwell1`

## Published GitHub commits from this work

- `ca2d579a2fc242679d94ca7b0c2c83eca1fd574a` — standardized AI tab and renamed Monitoring Well Library.
- `09b2cb64d0893d83f8163b8413a9c5c81a313b44` — added the Monitoring Well Library landing map and profile-library section.
- `9f7146d5fb3230b70dda32bd1d57755429b53682` — replaced the damaged map upload with the verified `-v2` image.

## Exact next task

Build **28 individual monitoring-well/community profiles**, using the Data Center Library interaction pattern as the model. Each monitoring profile should include, when defensible data are available:

1. Monitoring community and well identification.
2. Location, basin, responsible agency, and source link.
3. A clear graph of groundwater levels over the most useful available windows:
   - 10-year history
   - 20-year history
   - 30-year history
4. Measurement dates, units, datum/reference basis, and missing-data periods.
5. The exact well's available water-quality records whenever possible.
6. If exact-well quality records are unavailable, the closest defensible water-quality source, clearly labeled as a **nearby well/source rather than the same monitoring well**.
7. Sampling dates, analytes, units, reporting limits, and applicable comparison benchmarks.
8. Government, local-government, NRD/water-district, state-agency, USGS, and other authoritative updates relevant to that monitoring location.
9. Current local reporting when relevant and properly sourced.
10. A subscriber discussion/chat area below each profile, following the Data Center Library design.

## Accuracy rules for the next pass

- Never imply that nearby water-quality data came from the exact monitoring well.
- Clearly distinguish measured history from modeled projections or educational illustrations.
- Preserve original units and identify conversions.
- Cite the agency, station/well identifier, record date range, and retrieval date.
- Show gaps rather than inventing or interpolating measurements unless a modeled line is explicitly labeled.
- Prefer authoritative primary sources: USGS, state water agencies, NRDs/water districts, municipal records, and official laboratory/monitoring programs.

## Resume instruction for a new chat

Start from this checkpoint and the live Version 3.4 Monitoring Well Library. Do not rebuild the landing map. The next work is to establish the sourced list of the 28 monitoring communities/wells, confirm exact station identifiers, and prototype the first individual monitoring-well profile before replicating the structure across all 28.
