import { chromium } from 'playwright-core';
const exe = process.env.CHROME_PATH || '/Users/lucas/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const [, , slug, ...urls] = process.argv;
const out = new URL(`./out/${slug}/`, import.meta.url).pathname;
const browser = await chromium.launch({ executablePath: exe, headless: true, args: ['--hide-scrollbars'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, locale: 'pt-BR' });
const page = await ctx.newPage();
for (const u of urls) {
  await page.goto(u, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(2500);
  await page.addStyleTag({ content: `#__framer-badge-container${process.env.HIDE ? ', ' + process.env.HIDE : ''}{display:none!important}` });
  const name = u.split('/').filter(Boolean).pop();
  for (let y = 0; y < 2400; y += 300) { await page.evaluate((yy) => scrollTo(0, yy), y); await page.waitForTimeout(250); }
  await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(1200);
  await page.screenshot({ path: `${out}p-${name}-0.png` });
  await page.evaluate(() => scrollTo(0, 820)); await page.waitForTimeout(1200);
  await page.screenshot({ path: `${out}p-${name}-1.png` });
}
await browser.close();
