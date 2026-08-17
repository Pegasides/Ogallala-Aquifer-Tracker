# CHECKPOINT — Pretty Picture 4

Date: 2026-08-17
Project: Ogallala Aquifer Tracker
Milestone name: **Pretty Picture 4**

## Definition

Pretty Picture 4 is the recovered historical Version 3.3 interactive timeline page with the historical aquifer master image restored and the historical timeline controls preserved.

This milestone is important because it re-establishes a known-good live interactive baseline from the earlier Pretty Picture Two-era implementation before any new Pretty Picture Three substitution or redesign work.

## Live recovery page

https://pegasides.github.io/Ogallala-Aquifer-Tracker/historical-pretty-picture-live.html?v=4

## What is preserved

- Historical master aquifer image presentation.
- Eight year controls: 1950, 1980, 2026, 2030, 2035, 2040, 2045, 2050.
- Timeline slider.
- Play Timeline control with automatic progression.
- Tracker Working Index values by year.
- Northern, Central, and Southern basin status changes by year.
- Historical Version 3.3 page shell and supporting context.

## Image recovery architecture

The original historical page reconstructed the master image from 13 base64 parts formerly stored under the hidden `.v33-alpha2` directory.

For reliable GitHub Pages delivery, the exact same image-part blobs were exposed under the public folder:

`historical-pp2-assets/`

Files:
- part-00.b64
- part-01.b64
- part-02.b64
- part-03.b64
- part-04.b64
- part-05.b64
- part-06.b64
- part-07.b64
- part-08.b64
- part-09.b64
- part-10.b64
- part-11.b64
- part-12.b64

The loader page `historical-pretty-picture-live.html` redirects the historical image reconstruction to that public asset path. The historical timeline logic itself is not redesigned.

## Historical source

Historical working timeline source:
- `historical-v3-map.html`
- Original historical commit reference: `1364a570062e20e1f80d25087bba4f9b3e3d8758`
- Historical file blob SHA: `7bc22fb93ca04273712e088e398e4c6bef914048`

## Important project rule from this checkpoint

Do **not** rebuild the timeline from scratch when continuing from Pretty Picture 4.

Use Pretty Picture 4 as the known-good live-functionality baseline. Future visual work should preserve its working year buttons, slider, Play Timeline behavior, index progression, and basin-state logic unless Quinn explicitly requests otherwise.

Pretty Picture 3 remains the preferred visual design master for later substitution work, but Pretty Picture 4 is now the recovery/functionality checkpoint.

## Why this checkpoint matters

This checkpoint separates two concerns cleanly:

1. **Pretty Picture 3** — preferred visual design master.
2. **Pretty Picture 4** — recovered live interactive functionality baseline.

Future work should combine them carefully rather than replacing either one wholesale.
