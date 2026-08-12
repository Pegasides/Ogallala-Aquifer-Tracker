import { chromium } from 'playwright';

const rawBase = process.env.BASE_URL || 'http://127.0.0.1:8000/';
const BASE = rawBase.endsWith('/') ? rawBase : rawBase + '/';
let failures = 0;
const results = [];

function check(name, ok, detail = '') {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failures += 1;
}

async function txt(locator) {
  try { return (await locator.innerText()).trim(); } catch { return ''; }
}

async function waitForBranchServer() {
  for (let i = 0; i < 30; i++) {
    try {
      const r = await fetch(BASE + 'v3.html?smoke=' + Date.now(), { redirect: 'follow' });
      if (r.ok) return;
    } catch {}
    await new Promise(r => setTimeout(r, 1000));
  }
  throw new Error(`Version 3.1 branch server did not become reachable at ${BASE}`);
}

await waitForBranchServer();
const browser = await chromium.launch({ headless: true });

try {
  const context = await browser.newContext({ viewport: { width: 1365, height: 900 } });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });

  await page.goto(BASE + 'v3.html?smoke=desktop', { waitUntil: 'networkidle' });
  check('V3.1 home loads', (await page.title()).includes('Version 3.1'), await page.title());
  check('V3.1 preview badge is present', (await txt(page.locator('.hero-badge'))).includes('Version 3.1'), await txt(page.locator('.hero-badge')));
  check('Primary timeline CTA present', await page.locator('a.btn.primary[href="v3-map.html"]').count() > 0, await txt(page.locator('a.btn.primary[href="v3-map.html"]').first()));

  const hero = page.locator('.hero img').first();
  await hero.waitFor({ state: 'visible' });
  const heroInfo = await hero.evaluate(img => ({
    src: img.getAttribute('src') || '',
    complete: img.complete,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight
  }));
  check('High-resolution V3.1 hero is wired in', heroInfo.src.includes('ChatGPT%20Image%20Aug%208,%202026,%2010_14_56%20AM.png'), heroInfo.src);
  check('High-resolution V3.1 hero loads sharply', heroInfo.complete && heroInfo.naturalWidth >= 1000 && heroInfo.naturalHeight >= 500, `${heroInfo.naturalWidth}×${heroInfo.naturalHeight}`);

  const homeNav = await page.locator('.nav-links a').allInnerTexts();
  check('V3.1 home Tracker navigation order', JSON.stringify(homeNav.slice(0,5)) === JSON.stringify(['V3.1 Home','Interactive Timeline','Groundwater Window','My Aquifer','Sources']), homeNav.slice(0,5).join(' → '));
  check('Publication is visually separated from Tracker links', await page.locator('.nav-publication').count() === 1 && (await txt(page.locator('.nav-publication'))).includes('Substack'), await txt(page.locator('.nav-publication')));
  check('Sources credibility destination is present', await page.locator('a.destination[href="sources.html"]').count() === 1, await txt(page.locator('a.destination[href="sources.html"] h3')));

  await page.locator('a.btn.primary[href="v3-map.html"]').first().click();
  await page.waitForLoadState('networkidle');
  check('Timeline route loads', page.url().includes('/v3-map.html'), page.url());
  check('Timeline shell identifies Version 3.1', (await page.title()).includes('Version 3.1'), await page.title());

  const timeline = page.frameLocator('#timelineFrame');
  await timeline.locator('#sliderYear').waitFor({ state: 'visible' });
  await page.waitForTimeout(700);
  check('Timeline starts at 1950', await txt(timeline.locator('#sliderYear')) === '1950', await txt(timeline.locator('#sliderYear')));
  check('Working index display removes percent sign', !(await txt(timeline.locator('#overallStatus'))).includes('%') && !(await txt(timeline.locator('#summaryHealth'))).includes('%'), `${await txt(timeline.locator('#overallStatus'))} | ${await txt(timeline.locator('#summaryHealth'))}`);

  const anchors = [[1950,'100'],[1980,'85'],[2026,'60'],[2050,'40']];
  for (const [year, index] of anchors) {
    await timeline.locator(`.year-btn[data-year="${year}"]`).click();
    await page.waitForTimeout(250);
    check(`Anchor ${year} transition`, await txt(timeline.locator('#sliderYear')) === String(year) && await txt(timeline.locator('#summaryHealth')) === index, `year=${await txt(timeline.locator('#sliderYear'))}, index=${await txt(timeline.locator('#summaryHealth'))}`);
  }

  await timeline.locator('#yearSlider').evaluate(el => { el.value = '4'; el.dispatchEvent(new Event('input', { bubbles: true })); });
  await page.waitForTimeout(250);
  check('2035 projection step reachable', await txt(timeline.locator('#sliderYear')) === '2035' && await txt(timeline.locator('#sliderMode')) === 'Projection step', `${await txt(timeline.locator('#sliderYear'))} | ${await txt(timeline.locator('#sliderMode'))}`);

  await timeline.locator('.year-btn[data-year="1950"]').click();
  await timeline.locator('#playTimeline').click();
  await page.waitForTimeout(13200);
  const autoplayYear = await txt(timeline.locator('#sliderYear'));
  const autoplayButton = await txt(timeline.locator('#playTimeline'));
  await page.waitForTimeout(2200);
  check('Autoplay stops at 2050', autoplayYear === '2050' && await txt(timeline.locator('#sliderYear')) === '2050' && /Play/i.test(autoplayButton), `year=${autoplayYear}, button=${autoplayButton}`);

  await timeline.locator('.year-btn[data-year="2026"]').click();
  await page.waitForTimeout(350);
  check('2026 shows 28 community markers', await timeline.locator('.community-marker').count() === 28, String(await timeline.locator('.community-marker').count()));
  check('2026 shows three regional hotspot markers', await timeline.locator('.hotspot').count() === 3, String(await timeline.locator('.hotspot').count()));
  check('2026 shows three infrastructure examples', await timeline.locator('.dc-pin').count() === 3, String(await timeline.locator('.dc-pin').count()));
  const titles = await timeline.locator('.community-marker').evaluateAll(els => els.map(e => e.title));
  check('Portales is restored to community layer', titles.some(t => t.startsWith('Portales, NM')));
  check('Hereford is not in community layer', !titles.some(t => t.startsWith('Hereford, TX')));

  const community = timeline.locator('.community-marker').first();
  await community.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(150);
  check('Community tooltip opens from keyboard', await timeline.locator('.map-tooltip').count() === 1, (await txt(timeline.locator('.map-tooltip'))).slice(0,100));

  const dc = timeline.locator('.dc-pin').first();
  await dc.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(150);
  check('Infrastructure tooltip opens from keyboard', await timeline.locator('.map-tooltip').count() === 1, (await txt(timeline.locator('.map-tooltip'))).slice(0,100));

  await page.goto(BASE + 'groundwater-window.html?smoke=desktop', { waitUntil: 'networkidle' });
  check('Groundwater shell identifies Version 3.1', (await page.title()).includes('Version 3.1'), await page.title());
  const groundwater = page.frameLocator('#groundwaterFrame');
  await groundwater.locator('#currentYearBadge').waitFor({ state: 'visible' });
  await page.waitForTimeout(500);
  check('Groundwater Window starts at 1950', (await txt(groundwater.locator('#currentYearBadge'))).includes('1950'), await txt(groundwater.locator('#currentYearBadge')));
  check('Groundwater index removes percent sign', !(await txt(groundwater.locator('#healthNumber'))).includes('%'), await txt(groundwater.locator('#healthNumber')));

  for (const [index, year] of [[0,1950],[1,1980],[2,2026],[3,2050]]) {
    await groundwater.locator(`.year-button[data-index="${index}"]`).click();
    await page.waitForTimeout(180);
    check(`Groundwater ${year} transition`, (await txt(groundwater.locator('#currentYearBadge'))).includes(String(year)), await txt(groundwater.locator('#currentYearBadge')));
  }

  await groundwater.locator('.well').first().click();
  await page.waitForTimeout(200);
  const cardClass = await groundwater.locator('#wellCard').getAttribute('class') || '';
  check('Illustrative profile card opens', cardClass.includes('open'), cardClass);
  check('Placeholder measurement grid remains hidden', !(await groundwater.locator('.well-data-grid').isVisible()) && !(await groundwater.locator('.water-change-box').isVisible()));
  check('Illustrative profile warning is visible', (await txt(groundwater.locator('#v3IllustrativeWellNote'))).includes('Illustrative profile only'), (await txt(groundwater.locator('#v3IllustrativeWellNote'))).slice(0,120));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  check('Escape closes illustrative profile', !((await groundwater.locator('#wellCard').getAttribute('class')) || '').includes('open'));

  await page.goto(BASE + 'sources.html?smoke=desktop', { waitUntil: 'networkidle' });
  check('Sources page loads', (await page.title()).includes('Sources That Inform Our Story'), await page.title());
  check('Sources page has six integrity rules', await page.locator('.principle').count() === 6, String(await page.locator('.principle').count()));
  check('Sources page contains current Nebraska agency name', (await page.locator('body').innerText()).includes('Nebraska Department of Water, Energy, and Environment'));
  check('Sources page contains current Wyoming source', (await page.locator('body').innerText()).includes('Wyoming State Engineer'));
  check('Sources page uses official NRCS name', (await page.locator('body').innerText()).includes('USDA Natural Resources Conservation Service'));

  const poster = page.locator('.poster-frame img').first();
  await poster.waitFor({ state: 'visible' });
  const posterInfo = await poster.evaluate(img => ({
    src: img.getAttribute('src') || '',
    complete: img.complete,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight
  }));
  check('Verified Sources poster is wired in', posterInfo.src === 'Ogallala_Aquifer_Tracker_Sources_Poster_V3_1_verified.png', posterInfo.src);
  check('Verified Sources poster loads at publication resolution', posterInfo.complete && posterInfo.naturalWidth >= 1500 && posterInfo.naturalHeight >= 1000, `${posterInfo.naturalWidth}×${posterInfo.naturalHeight}`);
  check('Sources page declares live directory as controlling record', (await txt(page.locator('.poster-note'))).includes('controlling record'), await txt(page.locator('.poster-note')));

  await page.goto(BASE + 'groundwater-window.html?smoke=v2-route', { waitUntil: 'networkidle' });
  const v2Link = page.locator('.links a[href="index.html"]');
  await v2Link.click();
  await page.waitForLoadState('networkidle');
  check('My Aquifer navigation reaches Version 2', (await page.title()).includes('Alliance Pilot v2'), await page.title());

  const relevantDesktopErrors = consoleErrors.filter(e => !/favicon/i.test(e));
  check('No relevant desktop console errors', relevantDesktopErrors.length === 0, relevantDesktopErrors.slice(0,3).join(' | '));
  await context.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const mpage = await mobile.newPage();
  const mobileErrors = [];
  mpage.on('console', msg => { if (msg.type() === 'error') mobileErrors.push(msg.text()); });

  await mpage.goto(BASE + 'v3.html?smoke=mobile', { waitUntil: 'networkidle' });
  check('Mobile V3.1 home avoids page-level horizontal overflow', await mpage.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), `scroll=${await mpage.evaluate(() => document.documentElement.scrollWidth)}, client=${await mpage.evaluate(() => document.documentElement.clientWidth)}`);

  await mpage.goto(BASE + 'v3-map.html?smoke=mobile', { waitUntil: 'networkidle' });
  const mt = mpage.frameLocator('#timelineFrame');
  await mt.locator('#map-viewport').waitFor({ state: 'visible' });
  await mpage.waitForTimeout(700);
  check('Mobile timeline shell avoids page-level horizontal overflow', await mpage.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), `scroll=${await mpage.evaluate(() => document.documentElement.scrollWidth)}, client=${await mpage.evaluate(() => document.documentElement.clientWidth)}`);
  const vp = await mt.locator('#map-viewport').boundingBox();
  const grid = await mt.locator('.map-grid').boundingBox();
  check('Mobile map scales inside viewport', !!vp && !!grid && grid.width <= vp.width + 3, `viewport=${vp?.width}, map=${grid?.width}`);
  await mt.locator('.year-btn[data-year="2026"]').click();
  await mpage.waitForTimeout(250);
  await mt.locator('.community-marker').first().click();
  await mpage.waitForTimeout(120);
  check('Mobile community tooltip opens', await mt.locator('.map-tooltip').count() === 1, (await txt(mt.locator('.map-tooltip'))).slice(0,80));

  await mpage.goto(BASE + 'groundwater-window.html?smoke=mobile', { waitUntil: 'networkidle' });
  const mg = mpage.frameLocator('#groundwaterFrame');
  await mg.locator('.visualization-panel').waitFor({ state: 'visible' });
  await mpage.waitForTimeout(500);
  check('Mobile Groundwater shell avoids page-level horizontal overflow', await mpage.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), `scroll=${await mpage.evaluate(() => document.documentElement.scrollWidth)}, client=${await mpage.evaluate(() => document.documentElement.clientWidth)}`);
  const heights = [];
  for (let i = 0; i < await mg.locator('.year-button').count(); i++) heights.push((await mg.locator('.year-button').nth(i).boundingBox())?.height || 0);
  check('Mobile Groundwater year controls are touch-sized', Math.min(...heights) >= 43.5, heights.join(', '));

  await mpage.goto(BASE + 'sources.html?smoke=mobile', { waitUntil: 'networkidle' });
  check('Mobile Sources page avoids page-level horizontal overflow', await mpage.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), `scroll=${await mpage.evaluate(() => document.documentElement.scrollWidth)}, client=${await mpage.evaluate(() => document.documentElement.clientWidth)}`);
  check('Mobile Sources poster fits page width', await mpage.evaluate(() => {
    const img = document.querySelector('.poster-frame img');
    if (!img) return false;
    const r = img.getBoundingClientRect();
    return r.left >= -1 && r.right <= document.documentElement.clientWidth + 1;
  }));

  const relevantMobileErrors = mobileErrors.filter(e => !/favicon/i.test(e));
  check('No relevant mobile console errors', relevantMobileErrors.length === 0, relevantMobileErrors.slice(0,3).join(' | '));
  await mobile.close();

} finally {
  await browser.close();
}

console.log(`\n${results.length - failures}/${results.length} Version 3.1 smoke checks passed.`);
if (failures) process.exit(1);
