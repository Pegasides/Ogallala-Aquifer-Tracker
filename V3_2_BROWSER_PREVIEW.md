# Version 3.2 Browser Preview

Purpose: review Version 3.2 in a real browser without changing `main`, GitHub Pages, Version 2, Version 3, or the preserved Version 3.1 state.

## StackBlitz working-branch preview

Use:

`https://stackblitz.com/github/Pegasides/Ogallala-Aquifer-Tracker/tree/version-3.2-working?file=v3.html&startScript=start&view=preview&initialpath=%2Fv3.html`

The existing `package.json` static server configuration is inherited from Version 3.1 and works for the Version 3.2 branch.

## Data Centers direct preview path

After the StackBlitz project is running, open `/data-centers.html` inside the preview to review the dedicated Data Centers hub.

## Important

- The public GitHub Pages site still follows `main` and is not changed by this preview.
- This preview is for human visual review only.
- Automated branch-local QA is handled by `.github/workflows/v3-2-smoke-test.yml`.
- The clean hero and Pretty Map binary assets are tracked as pending in `V3_2_CHECKPOINT_CURRENT.md` until their final repository files are wired.
