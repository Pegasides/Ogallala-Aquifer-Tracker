# Ogallala Aquifer Tracker — Version 3.3 Hard Checkpoint

**Date:** August 16, 2026 — noon checkpoint
**Purpose:** Exact recovery point for Quinn and Ali before resuming work tonight.

## 1. Current Version 3.3 public state

Repository: `Pegasides/Ogallala-Aquifer-Tracker`

Primary public home:
`https://pegasides.github.io/Ogallala-Aquifer-Tracker/`

Version 3.3 home:
`https://pegasides.github.io/Ogallala-Aquifer-Tracker/v3.html`

Interactive Timeline:
`https://pegasides.github.io/Ogallala-Aquifer-Tracker/v3-map.html`

My Aquifer:
`https://pegasides.github.io/Ogallala-Aquifer-Tracker/v3-my-aquifer.html`

New Yard Savings Calculator:
`https://pegasides.github.io/Ogallala-Aquifer-Tracker/yard-savings-calculator.html`

The GitHub Pages blue repository link was previously opening an old Version 2 root page. The root `index.html` was changed so the blue Pages link now routes visitors to Version 3.3 Home. The old Version 2 root was preserved in the repository archive rather than discarded.

## 2. Interactive Timeline — approved master image checkpoint

The timeline no longer relies on one base image with CSS basin tint overlays. It now uses one exact approved PNG per year.

Approved years and Tracker Working Index values:

- 1950 — 100
- 1980 — 85
- 2026 — 60
- 2030 — 55
- 2035 — 50
- 2040 — 45
- 2045 — 42
- 2050 — 40

Approved image files are stored under:
`approved-timeline-images/`

Files:
- `1950.png`
- `1980.png`
- `2026.png`
- `2030.png`
- `2035.png`
- `2040.png`
- `2045.png`
- `2050.png`

`v3-map.html` swaps these exact images when the year controls are used. Transparent click targets sit over the baked-in year buttons and Play Timeline controls so the artwork itself remains unchanged while still functioning interactively.

Key status progression:
- 1950: all-blue baseline; Northern Healthy; Central Stable or Healthy baseline; Southern Healthy.
- 1980: Northern Good; Central Declining; Southern Declining.
- 2026: Northern Stable; Central Stressed; Southern Critical.
- 2030: Northern Stable; Central Stressed; Southern Critical.
- 2035: Northern Stable; Central Stressed; Southern Critical.
- 2040: Northern Stressed; Central Critical; Southern Severe.
- 2045: Northern Stressed; Central Critical; Southern Severe.
- 2050: Northern Stressed; Central Critical; Southern Severe.

Timeline publication commit:
`21baf475f0d7fae8d5ff13eeb9e1c34ffba773fe` — **Publish exact approved V3.3 timeline masters**

## 3. Yard Savings Calculator — new approved direction

Quinn approved replacing the old soft lawn calculator with a household-economics calculator aimed at a frugal subscriber who wants to know exactly what stays in their pocket.

New tool:
`yard-savings-calculator.html`

Core design principle:
**“If I convert this much lawn, what will I save this summer month, and what will I keep over a full year?”**

The calculator separates:

1. Water saved — gallons per active month.
2. Water bill savings — dollars per active month.
3. Power or fuel savings — mowing electricity, mowing fuel, and optional private-well pumping.
4. Power/fuel bill savings — dollars per active month.
5. Fertilizer, pesticide, and routine lawn-input savings — subscriber-entered cash spending.
6. Time returned to the subscriber — hours per active month and season.
7. Optional value of time — kept separate from cash savings unless the subscriber chooses an hourly value.
8. Estimated annual cash savings — based on an editable active watering/maintenance season, default six months.

Preset turf conversion buttons:
- 500 sq. ft.
- 1,000 sq. ft.
- 2,500 sq. ft.
- 5,000 sq. ft.
- plus custom square footage.

## 4. Two calculator modes

### A. Standard Estimate

Uses transparent Alliance assumptions and lets the subscriber edit the important ones.

Default planning assumptions:
- 1 inch over 1,000 sq. ft. ≈ 623 gallons.
- Summer lawn-water benchmark: 1.0–1.5 inches/week.
- 4.33 weeks/month.
- Default irrigation reduction after establishment: 90%.
- Default active watering/maintenance season: 6 months.

Alliance urban residential water-rate range used in the standard estimate:
- $1.557 per 100 cubic feet
- $1.759 per 100 cubic feet
- $2.165 per 100 cubic feet
- $2.706 per 100 cubic feet

Conversion used:
100 cubic feet ≈ 748 gallons.

The fixed monthly meter/service charge is not treated as avoidable savings.

Alliance residential electricity used for the standard electric-mower estimate:
approximately $0.1159/kWh from the current City rate sheet.

The user can choose:
- Municipal water or private well.
- Electric mower, gas mower, or manual/service/other.
- Electric mower kW.
- Mowing minutes per 1,000 sq. ft.
- Mowings per active month.
- Gas mower fuel spend if applicable.
- Fertilizer/pesticide/routine input spending.
- Private-well irrigation-pump kWh if applicable.
- Optional dollar value for their own time.

The calculator does not invent gasoline spending, fertilizer spending, pesticide spending, or private-well pumping cost. Those are user inputs when known.

### B. Use My Actual Bill

This is the major new feature Quinn approved.

Inputs:
- Typical winter **water-only** bill.
- Typical summer **water-only** bill.
- Total irrigated lawn square footage.
- Square footage to convert.
- Expected irrigation reduction after establishment.
- Active watering months per year.
- Optional real mowing/fuel/power, lawn-input, private-well pumping, and labor-time inputs.

Method:

`Seasonal outdoor-water signal = max(0, summer water-only bill − winter water-only bill)`

`Estimated water-bill savings = seasonal signal × converted-lawn share × irrigation-reduction percentage`

Where:

`converted-lawn share = min(1, conversion area ÷ total irrigated lawn area)`

This is deliberately labeled as a household estimate rather than proof that every summer/winter difference is caused by turf irrigation.

## 5. Friend’s real-world example — important validation case

Quinn reported a friend in Alliance who separates his water charge from other utilities and pays about **$200/month for water during the season** with a large lawn, estimated around 2,500 sq. ft. or more.

The key reasoning Quinn supplied was:
“If he is using half as much water, he should be saving about $100 per month.”

This observation triggered the Actual Bill mode.

The built-in example is:
- Winter water-only bill: $100/month
- Summer water-only bill: $200/month
- Total irrigated lawn: 2,500 sq. ft.
- Conversion area: 2,500 sq. ft.
- Irrigation reduction: 100%
- Active season: 6 months

Result:
- Seasonal water-bill opportunity ≈ **$100/month**
- Six-month seasonal water-bill opportunity ≈ **$600/year**

This example demonstrates why Actual Bill mode is more persuasive than relying only on a generic square-foot water-rate estimate.

## 6. Cash savings versus time value — methodological rule

Quinn approved the principle that the calculator must not artificially inflate “cash savings” by silently assigning a dollar value to the homeowner’s labor.

Therefore:

**Cash savings** = water bill + electricity/fuel + subscriber-entered fertilizer/pesticide/routine lawn inputs + optional private-well pumping cost avoided.

**Time returned** is displayed separately in hours.

If the subscriber chooses to enter an hourly value for their time, that optional value is displayed separately rather than hidden inside the bill-savings number.

## 7. Establishment-period warning

The calculator explicitly says savings are estimates **after native landscape establishment**.

Newly planted wildflowers/native landscapes can still need:
- watering,
- weed control,
- attention,
- establishment labor.

The larger long-term water and maintenance savings are not represented as beginning instantly on planting day.

## 8. My Aquifer integration

`v3-my-aquifer.html` was upgraded to Version 3.3 navigation and now includes a visible **Yard Savings** route.

The preserved My Aquifer subscriber page was restored as a root-level core file:
`my-aquifer-v33-core.html`

This was done so its existing flower photos and video continue to resolve correctly from the repository root.

Inside the My Aquifer Water-Wise Living section, the old soft “Try Your Own Yard” calculator is replaced at presentation time with a V3.3 launch panel explaining:
- Standard Estimate
- Use My Actual Bill
- Monthly + Annual savings
- the $100 winter / $200 summer example
- a button to open the full Yard Savings Calculator.

The original flower photos and video are preserved.

Key commits:
- `dd5365226b3c30864a48f82e47e9cd6c21e41257` — **Add V3.3 actual-bill yard savings calculator**
- `d99b11d3272f881048778873570f1f624a675988` — **Integrate V3.3 yard savings calculator into My Aquifer**
- `9f4b7bb789dd8eaac3addef7d19cbd440f9a3461` — **Restore My Aquifer V3.3 core at root**
- `6b035b4866dd337d85bbb3ca458788e0e9b47578` — **Fix My Aquifer media paths in V3.3 shell**

Latest Pages deployment for the integration completed successfully.

## 9. Blue GitHub Pages link checkpoint

Problem found:
The repository’s blue GitHub Pages link opens the site root. The root `index.html` was still the old My Aquifer Version 2 page, even though direct Version 3.3 URLs were correct.

Fix:
Root `index.html` was changed to route to Version 3.3 Home.

The old V2 root was archived at:
`archive/old-pages/index-v2-before-v33.html`

Therefore the intended public entry behavior is:

**Blue GitHub Pages link → Version 3.3 Home → current Version 3.3 navigation and tools.**

## 10. Exact pickup point for tonight

Do not redesign the calculator from scratch. The current architecture and visual direction are approved.

Start tonight by reviewing the live Yard Savings Calculator in a browser, especially:

1. Click **Use My Actual Bill**.
2. Click **Load example**.
3. Confirm the $100 winter / $200 summer / 2,500 sq. ft. / 100% reduction example produces approximately $100/month water-bill savings and $600 over a six-month season.
4. Test 500, 1,000, 2,500 and 5,000 sq. ft. in Standard Estimate.
5. Test municipal water versus private well.
6. Test electric versus gas mower logic.
7. Confirm monthly and annual values are visually easy to distinguish.
8. Confirm My Aquifer still displays the flower images/video and the new calculator launch panel.
9. Only after QA should we make additional refinements.

## 11. Recovery phrase

If the conversation history is unavailable tonight, Quinn can say:

**“Ali, load the August 16 noon V3.3 Yard Savings hard checkpoint.”**

The recovery file is:
`CHECKPOINT-2026-08-16-NOON-V3-3-YARD-SAVINGS.md`

That file is the authoritative written checkpoint for the state of Version 3.3 at this stopping point.
