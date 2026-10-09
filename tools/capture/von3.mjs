import { chromium } from 'playwright-core';
const exe = process.env.CHROME_PATH || '/Users/lucas/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const out = new URL('./out/von/', import.meta.url).pathname;
const browser = await chromium.launch({ executablePath: exe, headless: true, args: ['--ignore-gpu-blocklist', '--enable-gpu', '--use-angle=metal'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, locale: 'pt-BR' });
const page = await ctx.newPage();
const shot = (n) => page.screenshot({ path: out + n + '.png' });
await page.goto('https://galery-lemon.vercel.app/#acronos', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(3000);
await page.getByText('Entrar sem som').click();
await page.waitForTimeout(7000);
await shot('d-10-acronos');
const btns = await page.$$eval('button', (els) => els.filter((e) => e.offsetParent).map((e) => ((e.getAttribute('aria-label') || '') + ' | ' + (e.textContent || '').trim()).slice(0, 70)));
console.log(JSON.stringify(btns));
const caso = page.getByRole('button', { name: /caso completo/i });
if (await caso.count()) {
  await caso.first().click();
  await page.waitForTimeout(4000);
  await shot('d-11-caso');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1500);
}
await page.keyboard.press('Escape');
await page.waitForTimeout(1500);
const night = page.locator('button[aria-label*="oite" i], button[aria-label*="tema" i], button[aria-label*="lua" i]');
console.log('night buttons', await night.count());
if (await night.count()) {
  await night.first().click();
  await page.waitForTimeout(4500);
  await shot('d-12-noite');
}
await ctx.close();
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'pt-BR' });
const mp = await m.newPage();
await mp.goto('https://galery-lemon.vercel.app', { waitUntil: 'networkidle', timeout: 60000 });
await mp.waitForTimeout(4000);
await mp.screenshot({ path: out + 'm-00-intro.png' });
await mp.getByText('Entrar sem som').click().catch(() => {});
await mp.waitForTimeout(5000);
await mp.screenshot({ path: out + 'm-01-mundo.png' });
await browser.close();
