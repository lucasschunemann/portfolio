import sharp from 'sharp';
import fs from 'node:fs';
const base = new URL('./out/', import.meta.url).pathname;
for (const slug of fs.readdirSync(base)) {
  const files = fs.readdirSync(base + slug).filter((f) => f.endsWith('.png')).sort();
  const tiles = [];
  for (const f of files) {
    const isM = f.startsWith('m-');
    const w = isM ? 150 : 400;
    const buf = await sharp(base + slug + '/' + f).resize({ width: w }).png().toBuffer();
    const meta = await sharp(buf).metadata();
    const label = Buffer.from(`<svg width="${w}" height="22"><rect width="100%" height="100%" fill="#000"/><text x="6" y="16" font-family="Menlo" font-size="13" fill="#fff">${f}</text></svg>`);
    tiles.push({ buf, w, h: meta.height, label });
  }
  // empacota em linhas de até 1240 px
  let x = 0, y = 0, rowH = 0; const comps = []; const W = 1240;
  for (const t of tiles) {
    if (x + t.w > W) { x = 0; y += rowH + 30; rowH = 0; }
    comps.push({ input: t.label, left: x, top: y }, { input: t.buf, left: x, top: y + 22 });
    x += t.w + 10; rowH = Math.max(rowH, t.h + 22);
  }
  const H = y + rowH + 10;
  await sharp({ create: { width: W, height: H, channels: 3, background: '#777' } }).composite(comps).jpeg({ quality: 80 }).toFile(new URL(`./sheet-${slug}.jpg`, import.meta.url).pathname);
  console.log(slug, files.length, H);
}
