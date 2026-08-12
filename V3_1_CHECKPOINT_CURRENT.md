# Ogallala Aquifer Tracker — Current Version 3.1 Recovery Pointer

**Date:** August 12, 2026
**Repository:** `Pegasides/Ogallala-Aquifer-Tracker`
**Active branch:** `version-3.1-working`

## Sacred branches — do not edit

- `version-2.0-sacred`
- `version-3.0-sacred`

## Current state

The high-resolution Version 3.1 hero is installed. Tracker navigation is separated from the Publication/Substack context. A live `sources.html` credibility directory has been created with current primary-source links and public integrity rules. The corrected visual Sources poster has been uploaded to the repository as `Ogallala_Aquifer_Tracker_Sources_Poster_V3_1_verified.png` and is now displayed on `sources.html`.

The live HTML source directory is the controlling factual record; the poster is its visual expression.

The existing smoke-test workflow still automatically triggers only on `main`, so normal `version-3.1-working` commits do not appear as automatic workflow runs. This is expected.

## Main checkpoint files

Read these before changing the project:

1. `V3_1_CHECKPOINT_2026-08-12.md`
2. `V3_1_SOURCES_AUDIT_2026-08-12.md`
3. `V3_SOURCE_CHECK_2026-08-12.md`

## Immediate next task

Build branch-aware Version 3.1 QA on `version-3.1-working` so the branch can be tested without changing `main` or either sacred branch. Prefer a local static server inside GitHub Actions and make the smoke script accept a branch-local `BASE_URL`. Include a direct test that the new hero image and verified Sources poster load successfully.

Do not promote or merge to `main` without explicit approval.
