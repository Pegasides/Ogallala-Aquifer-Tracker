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

for (const route of ['v3-map.html','groundwater-window.html','v3-my-aquifer.html','sources.html','index.html']) {
  const response = await page.goto(BASE + route, { waitUntil: 'domcontentloaded' });
  check(response?.ok(), `${route} loads`, String(response?.status()));
}

const relevantDesktopErrors = consoleErrors.filter(text => !/favicon/i.test(text));
check(relevantDesktopErrors.length === 0, 'No relevant desktop console errors', relevantDesktopErrors.join(' | '));

await desktop.close();

const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const mobilePage = await mobile.newPage();
const mobileErrors = [];
mobilePage.on('console', msg => { if (msg.type() === 'error') mobileErrors.push(msg.text()); });
mobilePage.on('pageerror', err => mobileErrors.push(err.message));

for (const route of ['v3.html','data-centers.html']) {
  await mobilePage.goto(BASE + route, { waitUntil: 'networkidle' });
  const dims = await mobilePage.evaluate(() => ({scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth}));
  check(dims.scroll <= dims.client + 1, `Mobile ${route} avoids page-level horizontal overflow`, `scroll=${dims.scroll}, client=${dims.client}`);
}

const dataCenterButtonHeight = await mobilePage.locator('a.data-center-link').evaluate(el => Math.round(el.getBoundingClientRect().height));
check(dataCenterButtonHeight >= 40, 'Mobile Data Centers navigation is touch-sized', String(dataCenterButtonHeight));
check(mobileErrors.filter(text => !/favicon/i.test(text)).length === 0, 'No relevant mobile console errors');

await mobile.close();
await browser.close();

console.log(`\n${passed}/${passed + failed} Version 3.2 smoke checks passed.`);
if (failed) process.exit(1);
