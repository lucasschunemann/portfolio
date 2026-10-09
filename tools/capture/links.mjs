import { chromium } from 'playwright-core';
const exe = process.env.CHROME_PATH || '/Users/lucas/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const browser = await chromium.launch({ executablePath: exe, headless: true });
const page = await browser.newPage();
await page.goto(process.argv[2], { waitUntil: 'networkidle' });
const links = await page.$$eval('a[href]', (as) => [...new Set(as.map((a) => a.href))].filter((h) => h.startsWith(location.origin)));
console.log(links.join('\n'));
await browser.close();
