// QA retrigger after verified Version 3.2 hero repair.
import { chromium } from 'playwright';

const rawBase = process.env.BASE_URL || 'http://127.0.0.1:8000/';
const BASE = rawBase.endsWith('/') ? rawBase : rawBase + '/';
let passed = 0;
let failed = 0;

function check(condition, label, detail = '') {
  if (condition) {
    passed += 1;
    console.log(`PASS: ${label}${detail ? ` — ${detail}` : ''}`);
  } else {
    failed += 1;
    console.error(`FAIL: ${label}${detail ? ` — ${detail}` : ''}`);
  }
}

async function checkV32Shell(page, route, label) {
  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  check((await page.title()).includes('3.2'), `${label} identifies Version 3.2`, await page.title());
  const brand = page.locator('.brand').first();
  if (await brand.count()) check((await brand.innerText()).includes('3.2'), `${label} brand is Version 3.2`, await brand.innerText());
  check(await page.locator('a.data-center-link[href="data-centers.html"]').count() === 1, `${label} carries AI Data Centers navigation`);
  check(await page.locator('a[href="v3-my-aquifer.html"]').count() >= 1, `${label} routes My Aquifer through the V3.2 wrapper`);
  check((await page.locator('.nav-publication').innerText()).toUpperCase().includes('SUBSTACK'), `${label} keeps Substack marker visible`);
}

const browser = await chromium.launch({ headless: true });
const desktop = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await desktop.newPage();
const consoleErrors = [];
page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
page.on('pageerror', err => consoleErrors.push(err.message));

await page.goto(BASE + 'v3.html', { waitUntil: 'networkidle' });
check((await page.title()).includes('Version 3.2'), 'V3.2 home title', await page.title());
check((await page.locator('.hero-badge').innerText()).toUpperCase().includes('VERSION 3.2'), 'V3.2 preview badge');
check(await page.locator('a.data-center-link[href="data-centers.html"]').count() === 1, 'Primary AI Data Centers navigation button exists');
check(await page.locator('.data-center-destination[href="data-centers.html"]').count() === 1, 'Homepage Data Centers destination exists');
check((await page.locator('.nav-publication').innerText()).toUpperCase().includes('SUBSTACK'), 'Substack publication marker remains visible');
check((await page.locator('.bridge').count()) === 1, 'Aquifer overview remains present');
check((await page.locator('.mission blockquote').innerText()).includes('tomorrow'), 'Groundwater stewardship line remains present');

const hero = page.locator('.hero img');
const heroInfo = await hero.evaluate(img => ({complete: img.complete, w: img.naturalWidth, h: img.naturalHeight, src: img.getAttribute('src')}));
check(heroInfo.complete && heroInfo.w >= 1600 && heroInfo.h >= 900, 'Hero asset loads at high resolution', `${heroInfo.w}×${heroInfo.h}`);

await page.goto(BASE + 'data-centers.html', { waitUntil: 'networkidle' });
check((await page.title()).includes('Version 3.2'), 'Data Centers page identifies V3.2', await page.title());
check(await page.locator('.status').count() === 3, 'Three facility status categories are present');
check((await page.locator('.status.operational').innerText()).includes('Operational'), 'Operational category present');
check((await page.locator('.status.construction').innerText()).includes('Under construction'), 'Under-construction category present');
check((await page.locator('.status.proposed').innerText()).includes('Proposed'), 'Proposed category present');
check(await page.locator('.map-placeholder').count() === 1, 'Pretty Map integration point is present');
check((await page.locator('body').innerText()).includes('Seventeen prepared facility graphics'), 'Seventeen-profile library plan is stated');
check((await page.locator('.truth-note').innerText()).includes('not, by itself, proof'), 'Data-center causation guardrail is visible');

await checkV32Shell(page, 'v3-map.html', 'Interactive Timeline shell');
const timeline = page.frameLocator('#timelineFrame');
await timeline.locator('#sliderYear').waitFor({ state: 'visible' });
check((await timeline.locator('#sliderYear').innerText()).trim() === '1950', 'Timeline still starts at 1950');
check(!(await timeline.locator('#overallStatus').innerText()).includes('%'), 'Timeline working index still avoids percent-remaining language');
await timeline.locator('.year-btn[data-year="2026"]').click();
await page.waitForTimeout(450);
check((await timeline.locator('#sliderYear').innerText()).trim() === '2026', 'Timeline reaches 2026');
check(await timeline.locator('.community-marker').count() === 28, 'Timeline still renders 28 communities', String(await timeline.locator('.community-marker').count()));
check(await timeline.locator('.hotspot').count() === 3, 'Timeline still renders three regional hotspot markers');
check(await timeline.locator('.dc-pin').count() === 3, 'Timeline retains three verified 2026 infrastructure examples');
check(await timeline.locator('.community-marker[title^="Portales, NM"]').count() === 1, 'Portales remains in the community layer');
check(await timeline.locator('.community-marker[title^="Hereford, TX"]').count() === 0, 'Hereford remains excluded from the 28-community layer');

await checkV32Shell(page, 'groundwater-window.html', 'Groundwater Window shell');
const groundwater = page.frameLocator('#groundwaterFrame');
await groundwater.locator('#currentYearBadge').waitFor({ state: 'visible' });
check((await groundwater.locator('#currentYearBadge').innerText()).includes('1950'), 'Groundwater Window still starts at 1950');
check((await groundwater.locator('#healthNumber').innerText()).trim() === '100', 'Groundwater Window baseline index remains 100');
await groundwater.locator('.year-button[data-index="2"]').click();
await page.waitForTimeout(250);
check((await groundwater.locator('#currentYearBadge').innerText()).includes('2026'), 'Groundwater Window reaches 2026');
check((await groundwater.locator('#healthNumber').innerText()).trim() === '60', 'Groundwater Window 2026 index remains 60');

await checkV32Shell(page, 'v3-my-aquifer.html', 'My Aquifer shell');
check(await page.locator('#myAquiferFrame').count() === 1, 'My Aquifer still wraps the preserved underlying experience');

await checkV32Shell(page, 'sources.html', 'Sources shell');
check(await page.locator('img[src="Ogallala_Aquifer_Tracker_Sources_Poster_V3_1_verified.png"]').count() === 1, 'Verified Sources poster remains wired');
check((await page.locator('.poster-note').innerText()).includes('Version 3.1 poster'), 'Sources page preserves poster provenance');
check(await page.locator('.principle').count() === 6, 'Six evidence integrity rules remain present');

const v2Response = await page.goto(BASE + 'index.html', { waitUntil: 'domcontentloaded' });
check(v2Response?.ok(), 'Preserved V2 route still loads', String(v2Response?.status()));

const relevantDesktopErrors = consoleErrors.filter(text => !/favicon/i.test(text));
check(relevantDesktopErrors.length === 0, 'No relevant desktop console errors', relevantDesktopErrors.join(' | '));

await desktop.close();

const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const mobilePage = await mobile.newPage();
const mobileErrors = [];
mobilePage.on('console', msg => { if (msg.type() === 'error') mobileErrors.push(msg.text()); });
mobilePage.on('pageerror', err => mobileErrors.push(err.message));

for (const route of ['v3.html','data-centers.html','v3-map.html','groundwater-window.html','v3-my-aquifer.html','sources.html']) {
  await mobilePage.goto(BASE + route, { waitUntil: 'networkidle' });
  const dims = await mobilePage.evaluate(() => ({scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth}));
  check(dims.scroll <= dims.client + 1, `Mobile ${route} avoids page-level horizontal overflow`, `scroll=${dims.scroll}, client=${dims.client}`);
}

await mobilePage.goto(BASE + 'data-centers.html', { waitUntil: 'networkidle' });
const dataCenterButtonHeight = await mobilePage.locator('a.data-center-link').evaluate(el => Math.round(el.getBoundingClientRect().height));
check(dataCenterButtonHeight >= 40, 'Mobile Data Centers navigation is touch-sized', String(dataCenterButtonHeight));
check(mobileErrors.filter(text => !/favicon/i.test(text)).length === 0, 'No relevant mobile console errors');

await mobile.close();
await browser.close();

console.log(`\n${passed}/${passed + failed} Version 3.2 smoke checks passed.`);
if (failed) process.exit(1);
