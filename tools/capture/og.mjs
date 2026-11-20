// Gera public/og.jpg (1200x630): assinatura da Quieto, a frase da abertura e o campo de barras parado.
// Não precisa do dev server. Cores de brand/tokens.css; fontes do node_modules.
import { chromium } from 'playwright-core';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { readFileSync } from 'node:fs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
// fontes embutidas: a página em branco do setContent não carrega file://
const font = (p) => 'data:font/woff2;base64,' + readFileSync(path.join(root, 'node_modules', p)).toString('base64');
const exe =
  process.env.CHROME_PATH ||
  '/Users/lucas/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';

const W = 1200;
const H = 630;
const perola = '#EEEAE2';
const grafite = '#141412';
const mute = '#8F8D89';
const indigo = '#33456B';

// mesmo desenho do campo da abertura (src/components/Quiet.astro), sem movimento
const fieldH = 250;
const n = 30;
const step = W / n;
const bw = Math.min(step * 0.42, 14);
const bars = Array.from({ length: n }, (_, i) => {
  const t = i / (n - 1);
  const h = fieldH * (1 - t * 0.72);
  const fill = i === n - 1 ? indigo : grafite;
  return `<rect x="${i * step + (step - bw) / 2}" y="${fieldH - h}" width="${bw}" height="${h}" rx="${bw / 2}" fill="${fill}"/>`;
}).join('');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: 'Host Grotesk'; src: url(${font('@fontsource-variable/host-grotesk/files/host-grotesk-latin-wght-normal.woff2')}) format('woff2'); font-weight: 300 800; }
@font-face { font-family: 'Fragment Mono'; src: url(${font('@fontsource/fragment-mono/files/fragment-mono-latin-400-normal.woff2')}) format('woff2'); }
* { margin: 0; box-sizing: border-box; }
body { width: ${W}px; height: ${H}px; background: ${perola}; color: ${grafite}; font-family: 'Host Grotesk', sans-serif; position: relative; overflow: hidden; }
.logo { position: absolute; left: 56px; top: 52px; display: flex; align-items: center; gap: 0.17em; font: 600 44px/0.9 'Host Grotesk'; letter-spacing: -0.055em; }
.logo svg { width: 0.64em; height: 0.64em; overflow: visible; }
.role { position: absolute; right: 56px; top: 62px; font: 400 15px/1 'Fragment Mono'; color: ${mute}; }
h1 { position: absolute; left: 56px; top: 150px; width: 860px; font-weight: 500; font-size: 50px; line-height: 1.08; letter-spacing: -0.03em; }
svg.field { position: absolute; left: 0; bottom: 0; }
</style></head><body>
<div class="logo"><svg viewBox="0 0 100 100"><rect x="22" y="14" width="20" height="72" rx="10" fill="${grafite}"/><rect x="56" y="34" width="20" height="52" rx="10" fill="${grafite}"/></svg>quieto</div>
<div class="role">Estúdio de design de produto · Blumenau</div>
<h1>Desenhamos produtos digitais e sites que as pessoas entendem de primeira.</h1>
<svg class="field" width="${W}" height="${fieldH}" viewBox="0 0 ${W} ${fieldH}">${bars}</svg>
</body></html>`;

const browser = await chromium.launch({ executablePath: exe, headless: true });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: 'png' });
await browser.close();
await sharp(png).jpeg({ quality: 88, progressive: true, mozjpeg: true }).toFile(path.join(root, 'public/og.jpg'));
console.log('public/og.jpg');
