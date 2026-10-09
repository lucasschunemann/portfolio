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
  neth: '#ece3de',
  acronos: '#e9e6e8',
  'pf-advogados': '#e6e1dc',
  'wf-odontologia': '#ece5e4',
  traveldone: '#e9e5ee',
  real: '#e2e7eb',
  sendeski: '#e9e2d8',
  von: '#d9e6f2',
};

/** apaga as pranchas antigas da obra, mas guarda os vídeos e os pôsteres deles (feitos por video.mjs) */
function clear(slug) {
  const dir = OUT + slug + '/';
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  const keep = new Set(files.filter((f) => f.endsWith('.mp4')).flatMap((f) => [f, f.replace(/\.mp4$/, '.jpg')]));
  for (const f of files) if (!keep.has(f)) fs.rmSync(dir + f);
}

const jobs = {
  async neth() {
    clear('neth');
    await desk(p('neth', 'd-00.png'), tint.neth, o('neth', '01-capa.jpg'));
    await phones([p('neth', 'm-00.png'), p('neth', 'm-03.png'), p('neth', 'm-05.png')], tint.neth, o('neth', '02-celular.jpg'));
    await desk(p('neth', 'd-05.png'), tint.neth, o('neth', '03-metodo.jpg'));
    await desk(p('neth', 'x-empresas-ve.png'), tint.neth, o('neth', '04-empresas.jpg'));
  },
  async acronos() {
    clear('acronos');
    await desk(p('acronos', 'x-dark-auto.png'), '#2c2b2e', o('acronos', '01-capa.jpg'), { alpha: 0.4, line: 'rgba(255,255,255,0.08)' });
    await desk(p('acronos', 'd-00.png'), tint.acronos, o('acronos', '02-claro.jpg'));
    await desk(p('acronos', 'p-projects-1.png'), tint.acronos, o('acronos', '03-componentes.jpg'));
    await desk(p('acronos', 'p-cores-0.png'), tint.acronos, o('acronos', '04-cores.jpg'));
    await desk(p('acronos', 'p-botoes-0.png'), tint.acronos, o('acronos', '05-botoes.jpg'));
    await phones([p('acronos', 'm-00.png'), p('acronos', 'm-01.png'), p('acronos', 'm-04.png')], tint.acronos, o('acronos', '06-celular.jpg'));
    await phones([p('acronos', 'm-00.png')], tint.acronos, o('acronos', '00-parede.jpg'), { W: 1600, H: 2000, ph: 1640, r: 64 });
  },
  async 'pf-advogados'() {
    clear('pf-advogados');
    await desk(p('pf-advogados', 'd-00.png'), tint['pf-advogados'], o('pf-advogados', '01-capa.jpg'));
    await desk(p('pf-advogados', 'd-01.png'), tint['pf-advogados'], o('pf-advogados', '02-servicos.jpg'));
    await desk(p('pf-advogados', 'd-03.png'), tint['pf-advogados'], o('pf-advogados', '04-duvidas.jpg'));
    // 05-rolagem (vídeo): node video.mjs pf-advogados https://passigfirmino.adv.br 05-rolagem --down 10 --max 99999
  },
  async 'wf-odontologia'() {
    clear('wf-odontologia');
    await desk(p('wf-odontologia', 'd-00.png'), tint['wf-odontologia'], o('wf-odontologia', '01-capa.jpg'));
    await desk(p('wf-odontologia', 'd-01.png'), tint['wf-odontologia'], o('wf-odontologia', '02-equipe.jpg'));
    await desk(p('wf-odontologia', 'd-02.png'), tint['wf-odontologia'], o('wf-odontologia', '03-contato.jpg'));
    await phones([p('wf-odontologia', 'm-00.png'), p('wf-odontologia', 'm-01.png'), p('wf-odontologia', 'm-03.png')], tint['wf-odontologia'], o('wf-odontologia', '04-celular.jpg'));
  },
  async traveldone() {
    clear('traveldone');
    await desk(p('traveldone', 'd-00.png'), tint.traveldone, o('traveldone', '01-capa.jpg'));
    await desk(p('traveldone', 'd-01.png'), tint.traveldone, o('traveldone', '02-sobre.jpg'));
    await desk(p('traveldone', 'd-05.png'), tint.traveldone, o('traveldone', '03-viagens.jpg'));
    await desk(p('traveldone', 'd-03.png'), tint.traveldone, o('traveldone', '04-oferta.jpg'));
    await phones([p('traveldone', 'm-00.png'), p('traveldone', 'm-03.png'), p('traveldone', 'm-05.png')], tint.traveldone, o('traveldone', '05-celular.jpg'));
    await phones([p('traveldone', 'm-00.png')], tint.traveldone, o('traveldone', '00-parede.jpg'), { W: 1600, H: 2000, ph: 1640, r: 64 });
  },
  async real() {
    clear('real');
    await desk(p('real', 'd-00.png'), tint.real, o('real', '01-capa.jpg'));
    await desk(p('real', 'd-01.png'), tint.real, o('real', '02-projeto.jpg'));
    await phones([p('real', 'm-00.png'), p('real', 'm-01.png'), p('real', 'm-06.png')], tint.real, o('real', '03-celular.jpg'));
  },
  // sem site no ar: telas do protótipo, guardadas em material/sendeski
  async sendeski() {
    const s1 = fs.readFileSync('/Users/lucas/Developer/portfolio/material/sendeski/01-original.jpg');
    const s2 = fs.readFileSync('/Users/lucas/Developer/portfolio/material/sendeski/02-original.jpg');
    clear('sendeski');
    await desk(s1, tint.sendeski, o('sendeski', '01-capa.jpg'), { maxW: 1600 });
    await desk(s2, tint.sendeski, o('sendeski', '02-produto.jpg'), { maxW: 1600 });
  },
  async von() {
    await raw(p('von', 'd-00-intro.png'), o('von', '01-capa.jpg'));
    await raw(p('von', 'd-10-acronos.png'), o('von', '02-sala.jpg'));
    // 03-passeio (vídeo): gravação de tela do Lucas, 11 s a 25,5 s, crop=2940:1562:406:0, 1600 px, crf 29
    await raw(p('von', 'd-11-caso.png'), o('von', '04-caso.jpg'));
    await raw(p('von', 'd-03-catalogo.png'), o('von', '05-catalogo.jpg'));
    await phones([p('von', 'm-00-intro.png'), p('von', 'm-01-mundo.png')], tint.von, o('von', '06-celular.jpg'), { gap: 140 });
  },
};

// node compose.mjs            monta todas (precisa das capturas de todas em out/)
// node compose.mjs neth real  monta só essas
const only = process.argv.slice(2);
for (const [slug, job] of Object.entries(jobs)) if (!only.length || only.includes(slug)) await job();

console.log('ok');
