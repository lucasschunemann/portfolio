import { chromium } from 'playwright-core';
import fs from 'node:fs';

const exe = process.env.CHROME_PATH || '/Users/lucas/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
// HIDE='seletor' esconde algo a mais (um aviso de cookies, por exemplo) sem clicar em nada
const [, , slug, url, extra = ''] = process.argv;
const out = new URL(`./out/${slug}/`, import.meta.url).pathname;
fs.mkdirSync(out, { recursive: true });

const hide = `
  #__framer-badge-container, [class*="framer-badge"], a[href*="framer.com/?utm"], a[href*="framer.link"] { display: none !important; }
  *, *::before, *::after { caret-color: transparent !important; }
  ${process.env.HIDE ? `${process.env.HIDE} { display: none !important; }` : ''}
`;

const browser = await chromium.launch({
  executablePath: exe,
  headless: true,
  args: ['--ignore-gpu-blocklist', '--enable-gpu', '--use-angle=metal', '--hide-scrollbars'],
});

async function run(kind, opts, stops) {
  const ctx = await browser.newContext({ ...opts, locale: 'pt-BR', colorScheme: 'light' });
  const page = await ctx.newPage();
  await page.goto(url + extra, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(3000);
  await page.addStyleTag({ content: hide }).catch(() => {});
  // percorre a página para disparar animações de entrada
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = opts.viewport.height;
  for (let y = 0; y < H; y += Math.round(vh * 0.6)) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(350);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1500);
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const ys = stops === 'all' ? [...Array(Math.min(12, Math.ceil(total / vh))).keys()].map((i) => i * vh) : stops;
  let i = 0;
  for (const y of ys) {
    if (y > total - 50) break;
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${out}${kind}-${String(i++).padStart(2, '0')}.png` });
  }
  console.log(slug, kind, 'height', total, 'shots', i);
  await ctx.close();
}

await run('d', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }, 'all');
await run(
  'm',
  {
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  },
  'all',
);
await browser.close();
