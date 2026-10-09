// Vídeo curto de rolagem, num celular (padrão) ou num desktop (--desk), no mesmo passe-partout das pranchas.
// Captura quadro a quadro (a rolagem fica lisa mesmo com a página pesada) e grava mp4 + pôster jpg.
//
//   node tools/capture/video.mjs <slug> <url> <nome> [--desk] [--tint #e6e1dc] [--down 8] [--from 0] [--max 6000]
//
// --from e --max limitam o trecho da página (em px CSS), por exemplo só uma galeria fixada.
//
// Saída: src/assets/work/<slug>/<nome>.mp4 e <nome>.jpg (o primeiro quadro, usado como pôster).
import { chromium } from 'playwright-core';
import sharp from 'sharp';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const exe =
  process.env.CHROME_PATH ||
  '/Users/lucas/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const [slug, url, name] = process.argv.slice(2);
const arg = (k, d) => {
  const i = process.argv.indexOf('--' + k);
  return i > -1 ? process.argv[i + 1] : d;
};
if (!slug || !url || !name) {
  console.error('uso: node video.mjs <slug> <url> <nome> [--desk] [--tint #hex] [--down segundos] [--from px] [--max px]');
  process.exit(1);
}
const tint = arg('tint', '#e6e1dc');
const down = Number(arg('down', 8)); // segundos descendo
const maxScroll = Number(arg('max', 6000)); // até onde rolar, em px CSS
const from = Number(arg('from', 0)); // de onde começar
const desk = process.argv.includes('--desk');
const fps = 30;

// passe-partout 16:10 com um celular (ou uma tela de desktop) no meio, como em compose.mjs
const W = 1920, H = 1200;
const [VW, VH, DPR] = desk ? [1440, 900, 2] : [390, 844, 2];
const [PH, R] = desk ? [920, 14] : [980, 48];
const PW = Math.round((VW / VH) * PH);
const PX = Math.round((W - PW) / 2), PY = Math.round((H - PH) / 2 - 8);

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const browser = await chromium.launch({ executablePath: exe, headless: true });
const page = await browser.newPage({
  viewport: { width: VW, height: VH },
  deviceScaleFactor: DPR,
  isMobile: !desk,
  hasTouch: !desk,
});
await page.goto(url, { waitUntil: 'networkidle' });
await page.addStyleTag({ content: 'html{scroll-behavior:auto!important} ::-webkit-scrollbar{display:none}' });

// uma passada inteira antes, para as animações de entrada e as imagens já estarem prontas
const height = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
const end = Math.min(height, maxScroll);
for (let y = 0; y <= end; y += 400) {
  await page.evaluate((y) => scrollTo(0, y), y);
  await page.waitForTimeout(120);
}
await page.evaluate((y) => scrollTo(0, y), from);
await page.waitForTimeout(1200);

// linha do tempo: parado no começo, desce, parado no fim, volta ao começo (o loop fecha sem corte)
const hold = 0.8, up = 1.6;
const ramp = (s, f) => {
  const n = Math.round(s * fps);
  return Array.from({ length: n }, (_, i) => f(ease(i / (n - 1))));
};
const timeline = [
  ...Array(Math.round(hold * fps)).fill(from),
  ...ramp(down, (t) => from + t * (end - from)),
  ...Array(Math.round(hold * fps)).fill(end),
  ...ramp(up, (t) => end - t * (end - from)),
];

// fundo com sombra e moldura, feito uma vez só
const pad = 85; // margem para o desfoque da sombra caber no quadro
const shadow = await sharp(
  Buffer.from(`<svg width="${PW + pad * 2}" height="${PH + pad * 2}"><rect x="${pad}" y="${pad}" width="${PW}" height="${PH}" rx="${R}" fill="rgba(0,0,0,0.18)"/></svg>`),
)
  .blur(34)
  .png()
  .toBuffer();
const base = await sharp({ create: { width: W, height: H, channels: 3, background: tint } })
  .composite([{ input: shadow, left: PX - pad, top: PY - pad + 22 }])
  .png()
  .toBuffer();
const mask = Buffer.from(`<svg width="${PW}" height="${PH}"><rect width="${PW}" height="${PH}" rx="${R}" ry="${R}"/></svg>`);
const line = Buffer.from(
  `<svg width="${PW}" height="${PH}"><rect x="0.5" y="0.5" width="${PW - 1}" height="${PH - 1}" rx="${R}" fill="none" stroke="rgba(0,0,0,0.07)" stroke-width="1.5"/></svg>`,
);

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `video-${slug}-`));
for (const [i, y] of timeline.entries()) {
  await page.evaluate((y) => scrollTo(0, y), Math.round(y));
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  const shot = await page.screenshot();
  const screen = await sharp(shot)
    .resize(PW, PH, { fit: 'fill' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
  await sharp(base)
    .composite([
      { input: screen, left: PX, top: PY },
      { input: line, left: PX, top: PY },
    ])
    .png({ compressionLevel: 1 })
    .toFile(path.join(tmp, `f-${String(i).padStart(4, '0')}.png`));
  if (i % 60 === 0) console.log(`quadro ${i}/${timeline.length}`);
}
await browser.close();

const out = `/Users/lucas/Developer/portfolio/src/assets/work/${slug}/`;
fs.mkdirSync(out, { recursive: true });
execFileSync('ffmpeg', [
  '-y', '-loglevel', 'error',
  '-framerate', String(fps),
  '-i', path.join(tmp, 'f-%04d.png'),
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '27',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an',
  out + name + '.mp4',
]);
await sharp(path.join(tmp, 'f-0000.png')).jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(out + name + '.jpg');
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`ok: ${out}${name}.mp4 (${(fs.statSync(out + name + '.mp4').size / 1e6).toFixed(2)} MB)`);
