# Ogallala Aquifer Tracker — Version 3.3 Checkpoint

Date: 2026-08-14

## Milestone
Version 3.3 preserves the completed five-image visual-story homepage built from the Version 3.2 working branch.

## Homepage visual sequence
1. Ogallala Aquifer Tracker — three-basin overview artwork
2. Groundwater Window — edited Nebraska subsurface artwork
3. AI Data Center Impact on the Ogallala Aquifer
4. Real Example: AI Data Center Impact near Cheyenne, Wyoming
5. Sources That Inform Our Story

## Final verification
GitHub Actions run 31838631817 completed successfully after gallery cleanup with **64/64 browser smoke checks passing**.

The final browser gate confirmed:
- all five homepage artworks render successfully;
- artwork dimensions load at 1200×900, 1200×800, 850×567, 900×600, and 1536×1024;
- desktop and mobile have no relevant console errors;
- mobile routes avoid page-level horizontal overflow;
- the 28-community timeline remains intact;
- Portales remains included and Hereford remains excluded;
- Groundwater Window, My Aquifer, Data Centers, and Sources shells remain intact;
- preserved Version 2 still loads.

The tested product head was `9017f6bee1b2ddb326dcc27872bd585d5785cfe8`. A subsequent working-branch commit only removed the temporary V3.3 cleanup marker and did not change the product experience.

## Protection rules
- The August 13 Version 3.2 hard-save branch remains untouched.
- Do not merge or promote this checkpoint to main without Quinn's explicit approval.
- Preserve Version 2 and prior Version 3 checkpoints.

## Recovery phrase
“Allie, continue from the Ogallala V3.3 visual-story checkpoint from August 14, 2026.”
