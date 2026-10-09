import sharp from 'sharp';
import fs from 'node:fs';

const OUT = '/Users/lucas/Developer/portfolio/src/assets/work/';
const SRC = new URL('./out/', import.meta.url).pathname;
const OLD = '/Users/lucas/Developer/portfolio/src/assets/work/';

const round = async (input, w, h, r) => {
  const img = await sharp(input).resize(w, h, { fit: 'fill' }).toBuffer();
  const mask = Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" ry="${r}"/></svg>`);
  return sharp(img).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
};
const shadow = async (w, h, r, blur, alpha) => {
  const pad = blur * 3;
  const svg = Buffer.from(
    `<svg width="${w + pad * 2}" height="${h + pad * 2}"><rect x="${pad}" y="${pad}" width="${w}" height="${h}" rx="${r}" fill="rgba(0,0,0,${alpha})"/></svg>`,
  );
  return { buf: await sharp(svg).blur(blur).png().toBuffer(), pad };
};
const hairline = (w, h, r, color) =>
  Buffer.from(`<svg width="${w}" height="${h}"><rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="${r}" fill="none" stroke="${color}" stroke-width="1.5"/></svg>`);

async function place(items, W, H, bg, file) {
  const comps = [];
  for (const it of items) {
    const sh = await shadow(it.w, it.h, it.r, it.blur ?? 34, it.alpha ?? 0.16);
    comps.push({ input: sh.buf, left: Math.round(it.x - sh.pad), top: Math.round(it.y - sh.pad + (it.drop ?? 22)) });
    comps.push({ input: await round(it.src, it.w, it.h, it.r), left: Math.round(it.x), top: Math.round(it.y) });
    comps.push({ input: hairline(it.w, it.h, it.r, it.line ?? 'rgba(0,0,0,0.07)'), left: Math.round(it.x), top: Math.round(it.y) });
  }
  await sharp({ create: { width: W, height: H, channels: 3, background: bg } })
    .composite(comps)
    .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(file);
}

/** captura de desktop centrada num passe-partout 16:10 */
async function desk(src, bg, file, opts = {}) {
  const meta = await sharp(src).metadata();
  const W = 2400, H = 1500;
  const maxW = opts.maxW ?? 1840;
  const scale = Math.min(maxW / meta.width, 1160 / meta.height, opts.upscale ? 9 : 1);
  const w = Math.round(meta.width * scale), h = Math.round(meta.height * scale);
  await place([{ src, w, h, x: (W - w) / 2, y: (H - h) / 2 - 8, r: opts.r ?? 18, alpha: opts.alpha, line: opts.line }], W, H, bg, file);
}

/** celulares lado a lado */
async function phones(srcs, bg, file, opts = {}) {
  const W = opts.W ?? 2400, H = opts.H ?? 1500;
  const ph = opts.ph ?? 1230;
  const metas = await Promise.all(srcs.map((s) => sharp(s).metadata()));
  const ws = metas.map((m) => Math.round((m.width / m.height) * ph));
  const gap = opts.gap ?? 96;
  const total = ws.reduce((a, b) => a + b, 0) + gap * (srcs.length - 1);
  let x = (W - total) / 2;
  const items = srcs.map((src, i) => {
    const it = { src, w: ws[i], h: ph, x, y: (H - ph) / 2 - 8, r: opts.r ?? 52, alpha: 0.18 };
    x += ws[i] + gap;
    return it;
  });
  await place(items, W, H, bg, file);
}

/** tela cheia, sem passe-partout */
async function raw(src, file, w = 2400) {
  await sharp(src).resize({ width: w }).jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(file);
}

const p = (slug, f) => SRC + slug + '/' + f;
const o = (slug, f) => {
  fs.mkdirSync(OUT + slug, { recursive: true });
  return OUT + slug + '/' + f;
};

const tint = {
  acronos: '#e9e6e8',
  'pf-advogados': '#e6e1dc',
  'wf-odontologia': '#ece5e4',
  traveldone: '#e9e5ee',
  sendeski: '#e9e2d8',
  von: '#d9e6f2',
};

// guarda as imagens antigas do Sendeski antes de sobrescrever a pasta
const sendeski1 = fs.readFileSync('/Users/lucas/Developer/portfolio/material/sendeski/01-original.jpg');
const sendeski2 = fs.readFileSync('/Users/lucas/Developer/portfolio/material/sendeski/02-original.jpg');
for (const d of ['acronos', 'pf-advogados', 'wf-odontologia', 'traveldone', 'sendeski']) fs.rmSync(OUT + d, { recursive: true, force: true });

// Acronos
await desk(p('acronos', 'x-dark-auto.png'), '#2c2b2e', o('acronos', '01-capa.jpg'), { alpha: 0.4, line: 'rgba(255,255,255,0.08)' });
await desk(p('acronos', 'd-00.png'), tint.acronos, o('acronos', '02-claro.jpg'));
await desk(p('acronos', 'p-projects-1.png'), tint.acronos, o('acronos', '03-componentes.jpg'));
await desk(p('acronos', 'p-cores-0.png'), tint.acronos, o('acronos', '04-cores.jpg'));
await desk(p('acronos', 'p-botoes-0.png'), tint.acronos, o('acronos', '05-botoes.jpg'));
await phones([p('acronos', 'm-00.png'), p('acronos', 'm-01.png'), p('acronos', 'm-04.png')], tint.acronos, o('acronos', '06-celular.jpg'));
await phones([p('acronos', 'm-00.png')], tint.acronos, o('acronos', '00-parede.jpg'), { W: 1600, H: 2000, ph: 1640, r: 64 });

// PF Advogados
await desk(p('pf-advogados', 'd-00.png'), tint['pf-advogados'], o('pf-advogados', '01-capa.jpg'));
await desk(p('pf-advogados', 'd-01.png'), tint['pf-advogados'], o('pf-advogados', '02-servicos.jpg'));
await desk(p('pf-advogados', 'd-02.png'), tint['pf-advogados'], o('pf-advogados', '03-quem-somos.jpg'));
await desk(p('pf-advogados', 'd-03.png'), tint['pf-advogados'], o('pf-advogados', '04-duvidas.jpg'));
await phones([p('pf-advogados', 'm-00.png'), p('pf-advogados', 'm-02.png'), p('pf-advogados', 'm-04.png')], tint['pf-advogados'], o('pf-advogados', '05-celular.jpg'));

// WF Odontologia
await desk(p('wf-odontologia', 'd-00.png'), tint['wf-odontologia'], o('wf-odontologia', '01-capa.jpg'));
await desk(p('wf-odontologia', 'd-01.png'), tint['wf-odontologia'], o('wf-odontologia', '02-equipe.jpg'));
await desk(p('wf-odontologia', 'd-02.png'), tint['wf-odontologia'], o('wf-odontologia', '03-contato.jpg'));
await phones([p('wf-odontologia', 'm-00.png'), p('wf-odontologia', 'm-01.png'), p('wf-odontologia', 'm-03.png')], tint['wf-odontologia'], o('wf-odontologia', '04-celular.jpg'));

// TravelDone
await desk(p('traveldone', 'd-00.png'), tint.traveldone, o('traveldone', '01-capa.jpg'));
await desk(p('traveldone', 'd-01.png'), tint.traveldone, o('traveldone', '02-sobre.jpg'));
await desk(p('traveldone', 'd-05.png'), tint.traveldone, o('traveldone', '03-viagens.jpg'));
await desk(p('traveldone', 'd-03.png'), tint.traveldone, o('traveldone', '04-oferta.jpg'));
await phones([p('traveldone', 'm-00.png'), p('traveldone', 'm-03.png'), p('traveldone', 'm-05.png')], tint.traveldone, o('traveldone', '05-celular.jpg'));
await phones([p('traveldone', 'm-00.png')], tint.traveldone, o('traveldone', '00-parede.jpg'), { W: 1600, H: 2000, ph: 1640, r: 64 });

// Sendeski (sem site no ar: telas do protótipo)
await desk(sendeski1, tint.sendeski, o('sendeski', '01-capa.jpg'), { maxW: 1600 });
await desk(sendeski2, tint.sendeski, o('sendeski', '02-produto.jpg'), { maxW: 1600 });

// VON
await raw(p('von', 'd-00-intro.png'), o('von', '01-capa.jpg'));
await raw(p('von', 'd-10-acronos.png'), o('von', '02-sala.jpg'));
await raw(p('von', 'd-12-noite.png'), o('von', '03-noite.jpg'));
await raw(p('von', 'd-11-caso.png'), o('von', '04-caso.jpg'));
await raw(p('von', 'd-03-catalogo.png'), o('von', '05-catalogo.jpg'));
await phones([p('von', 'm-00-intro.png'), p('von', 'm-01-mundo.png')], tint.von, o('von', '06-celular.jpg'), { gap: 140 });

console.log('ok');
