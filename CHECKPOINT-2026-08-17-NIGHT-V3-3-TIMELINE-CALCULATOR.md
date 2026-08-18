# CHECKPOINT — 2026-08-17 NIGHT
## Ogallala Aquifer Tracker V3.3 + Pretty Picture 5 + Yard Savings Calculator

**Status:** Strong stopping point. The core Tracker 3.3 structure is intact, the Pretty Picture 5 timeline is working, and the next calculator direction is clearly defined.

---

## 1. TRACKER VERSION 3.3 — CURRENT LIVE STATE

The **real Tracker Version 3.3** remains the master structure. We explicitly decided **not** to replace it with the collage-style integrated preview.

Current V3.3 file:
- `v3.html`
- Current content SHA: `b623c881d8ac2337fe893d1ad75e2d666a80422d`
- Latest V3.3 navigation commit: `3b774079f4ccc1e42ea7163c8a3493e4c427c3d5`

Current live V3.3 review URL:
- `https://pegasides.github.io/Ogallala-Aquifer-Tracker/v3.html?v=3b774079`

### V3.3 architecture decision locked tonight
Keep the existing V3.3 story sequence and layout intact.

Top navigation now includes these separate tools:
- V3.3 Home
- Interactive Timeline
- AI Data Centers
- Groundwater Window
- My Aquifer
- **Yard Savings**
- Sources
- Publication / Substack placeholder

**Important:** The Yard Savings Calculator stays a **separate button/tool**. It should not interrupt or reorganize the main V3.3 story sequence.

---

## 2. PRETTY PICTURE 5 — FINISHED INTERACTIVE TIMELINE

Pretty Picture 5 reached the successful working state tonight.

Current file:
- `pretty-picture-5.html`
- Current content SHA: `6ed98b2d5c84e9bf9643f0d4f92de2a6359f5c4a`
- Final pixel-safe recoloring commit: `33758c49af7cee235e6664a5416edad2609a0b76`

Current live timeline URL:
- `https://pegasides.github.io/Ogallala-Aquifer-Tracker/pretty-picture-5.html?v=33758c49`

### What is working
- 1950, 1980, 2026, 2030, 2035, 2040, 2045, 2050 year controls
- Existing timeline slider
- Play Timeline
- Correct Tracker Working Index progression
- Correct basin-status color progression
- Community labels stay readable
- 2045 and 2050 southern labels are no longer doubled
- Pixel-safe basin recoloring eliminated the earlier muted-label / bleed problem

### Basin progression locked
- 2026: Northern Stable / Central Stressed / Southern Critical — Index 60
- 2030: Northern Stable / Central Stressed / Southern Critical — Index 55
- 2035: Northern Stable / Central Critical / Southern Critical — Index 50
- 2040: Northern Stressed / Central Critical / Southern Critical — Index 45
- 2045: Northern Stressed / Central Critical / Southern Severe — Index 42
- 2050: Northern Stressed / Central Critical / Southern Severe — Index 40

Pretty Picture 5 should be treated as the current timeline master.

---

## 3. CURRENT LIVE YARD SAVINGS CALCULATOR — PRESERVE AS BACKUP

Current detailed calculator file:
- `yard-savings-calculator.html`
- Current content SHA: `ccba11863579ca46ddb21b7451958d99c217e83d`

The detailed calculator is functional, but Quinn judged it **too dense / daunting** for the subscriber-facing experience.

### Good elements to keep
- User can choose a quick estimate
- User can choose **Use My Actual Bill**
- Yard-size presets and custom area
- Water savings
- Water-bill savings
- Electricity / energy savings
- Electricity-cost savings
- Herbicide / pesticide / lawn-input savings
- Time savings
- Annual cash savings
- Transparent, category-by-category logic for credibility

### What should be removed from the default experience
- Too many controls visible at once
- Dense assumption panels
- Large comparison tables
- Long methodology blocks on the main screen
- Technical details that make the tool feel like a form or spreadsheet

**Do not delete the current detailed calculator.** Preserve it as the working backup until the simplified version is approved and live.

---

## 4. SIMPLIFIED CALCULATOR — NEW DESIGN DIRECTION APPROVED FOR FURTHER REVIEW

Tonight we created a much simpler calculator concept.

The latest concept image itself has been saved in the ChatGPT Library at:
- `/Ogallala Aquifer Tracker/Checkpoints/2026-08-17 Simplified Yard Savings Calculator Concept.png`

### Simplified screen structure

#### Step 1 — Your yard size
- 500 sq. ft.
- 1,000 sq. ft.
- 2,500 sq. ft.
- 5,000 sq. ft.
- Custom size

#### Step 2 — Choose your method
- **Quick Estimate**
- **Use My Actual Bill**

#### Step 3 — Your savings breakdown
Subscriber-facing categories should be clearly separated so the user can judge credibility and truthfulness:

1. **Water saved** — gallons / month
2. **Water bill saved** — dollars / month
3. **Electricity saved** — kWh equivalent / month
4. **Electricity cost saved** — dollars / month
5. **Herbicide + pesticide savings** — dollars / month
6. **Time saved** — hours / month
7. **Estimated annual cash savings** — dollars / year

### Key design principle locked tonight
**Simplify the experience, but do not hide the categories.**

The subscriber should see enough of the breakdown to understand where the claimed savings come from. This helps establish credibility and lets the user evaluate whether the estimate is reasonable for their own yard.

The preferred simplified design is:
- large readable type
- few choices
- no giant tables on the opening screen
- category-by-category savings cards
- Quick Estimate and Actual Bill remain prominent
- detailed methodology can be available later as a secondary / expandable explanation rather than dominating the calculator

---

## 5. NEXT STARTING POINT

When work resumes:

1. **Do not redesign Tracker 3.3.** Keep `v3.html` structure and sequence intact.
2. **Do not reopen the Pretty Picture 5 color/bleed issue unless a new defect is found.** It is working.
3. Start with the **Yard Savings Calculator simplification**.
4. Build a live simplified calculator based on tonight's approved direction.
5. Preserve the current detailed `yard-savings-calculator.html` as a backup before replacing or redirecting anything.
6. Keep **Use My Actual Bill**.
7. Keep the seven savings categories listed above visible enough to support credibility.
8. After the simplified calculator is approved, connect the existing V3.3 **Yard Savings** button to that approved live calculator.

---

## 6. TONIGHT'S BOTTOM LINE

**Tracker V3.3:** preserved and structurally correct.

**Pretty Picture 5:** working interactive timeline; current master.

**Yard Savings:** current detailed calculator preserved; simplified replacement concept now defined and saved for tomorrow.

**Resume tomorrow at:** simplify the live calculator without losing the category-by-category proof behind the savings numbers.
