import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { finePointer, reduced } from './core';

const $$ = <T extends Element = HTMLElement>(s: string, ctx: ParentNode = document) => [...ctx.querySelectorAll<T>(s)];

/* ------------------------------------------------------------ capa (anéis) */

/** Anéis nascem do centro, giram com o scroll e fazem túnel seguindo o cursor. */
export function initCovers() {
  $$('[data-cover]').forEach((cover) => {
    if (cover.classList.contains('acover--mini')) return;
    const rings = $$<SVGPathElement>('.acover__rings path', cover);
    const core = cover.querySelector<SVGPathElement>('.acover__core')!;
    if (reduced) return;
    const n = rings.length;

    gsap
      .timeline({ scrollTrigger: { trigger: cover, start: 'top 85%', once: true } })
      .from(core, { scale: 0, rotation: -90, duration: 1.4, ease: 'expo.out', svgOrigin: originOf(core) })
      .from(rings, { scale: 0.2, opacity: 0, duration: 1.4, ease: 'expo.out', stagger: 0.025, svgOrigin: originOf(core) }, 0.1);

    // torção: cada anel gira um pouco mais que o anterior
    rings.forEach((r, i) => {
      gsap.fromTo(
        r,
        { rotation: 0 },
        {
          rotation: (i / n) * 28,
          ease: 'none',
          svgOrigin: originOf(core),
          scrollTrigger: { trigger: cover, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });

    if (!finePointer) return;
    const movers = rings.map((r) => ({
      x: gsap.quickTo(r, 'x', { duration: 0.9, ease: 'power3' }),
      y: gsap.quickTo(r, 'y', { duration: 0.9, ease: 'power3' }),
    }));
    const coreX = gsap.quickTo(core, 'x', { duration: 0.9, ease: 'power3' });
    const coreY = gsap.quickTo(core, 'y', { duration: 0.9, ease: 'power3' });
    cover.addEventListener('pointermove', (e) => {
      const r = cover.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      movers.forEach((m, i) => {
        const k = 1 - i / n;
        m.x(nx * 220 * k);
        m.y(ny * 140 * k);
      });
      coreX(nx * 240);
      coreY(ny * 150);
    });
    cover.addEventListener('pointerleave', () => {
      movers.forEach((m) => (m.x(0), m.y(0)));
      coreX(0);
      coreY(0);
    });
  });
}

function originOf(el: SVGGraphicsElement) {
  const b = el.getBBox();
  return `${b.x + b.width / 2} ${b.y + b.height / 2}`;
}

/* ---------------------------------------------------------------- artigo */

export function initArticle() {
  const prose = document.querySelector<HTMLElement>('[data-prose]');
  if (!prose) return;

  // barra de leitura
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  if (bar) {
    gsap.set(bar, { scaleX: 0 });
    ScrollTrigger.create({
      trigger: prose,
      start: 'top 70%',
      end: 'bottom bottom',
      onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
    });
  }

  // índice: seção atual
  const links = $$<HTMLAnchorElement>('[data-toc-link]');
  links.forEach((a) => {
    const h = document.getElementById(a.dataset.tocLink!);
    if (!h) return;
    ScrollTrigger.create({
      trigger: h,
      start: 'top 45%',
      endTrigger: nextHeading(h) ?? prose,
      end: nextHeading(h) ? 'top 45%' : 'bottom 45%',
      onToggle: (self) => a.classList.toggle('is-current', self.isActive),
    });
  });

  // copiar link
  const copy = document.querySelector<HTMLButtonElement>('[data-copy-url]');
  if (copy) {
    const label = copy.querySelector<HTMLElement>('[data-copy-label]')!;
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(location.href.split('#')[0]);
        label.textContent = 'Link copiado ✓';
      } catch {
        label.textContent = 'Não deu, copie da barra';
      }
      setTimeout(() => (label.textContent = 'Copiar link'), 1800);
    });
  }

  if (reduced) return;
  // parágrafos sobem ao entrar
  $$(':scope > *:not(.post-end)', prose).forEach((el) => {
    gsap.from(el, {
      y: 28,
      autoAlpha: 0,
      duration: 1.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    });
  });
}

function nextHeading(h: HTMLElement) {
  let el = h.nextElementSibling;
  while (el && el.tagName !== 'H2') el = el.nextElementSibling;
  return el as HTMLElement | null;
}

/* ------------------------------------------------------- índice de artigos */

/** Prévia da capa segue o cursor sobre a lista. */
export function initBlogList() {
  const list = document.querySelector<HTMLElement>('[data-blog-list]');
  const preview = document.querySelector<HTMLElement>('[data-blog-preview]');
  if (!list || !preview) return;

  if (!reduced) {
    gsap.from(list.children, {
      y: 50,
      autoAlpha: 0,
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: list, start: 'top 90%', once: true },
    });
  }
  if (!finePointer || reduced) return;

  const items = new Map($$('[data-preview-item]', preview).map((el) => [el.dataset.previewItem!, el]));
  const xTo = gsap.quickTo(preview, 'x', { duration: 0.7, ease: 'power3' });
  const yTo = gsap.quickTo(preview, 'y', { duration: 0.7, ease: 'power3' });
  const rTo = gsap.quickTo(preview, 'rotation', { duration: 0.9, ease: 'power3' });
  let lastX = 0;
  gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 0 });

  list.addEventListener('pointermove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
    rTo(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
    lastX = e.clientX;
  });
  $$<HTMLAnchorElement>('[data-preview]', list).forEach((row) => {
    row.addEventListener('pointerenter', () => {
      items.forEach((el, id) => el.classList.toggle('is-on', id === row.dataset.preview));
      gsap.to(preview, { scale: 1, autoAlpha: 1, duration: 0.6, ease: 'expo.out', overwrite: 'auto' });
    });
  });
  list.addEventListener('pointerleave', () => {
    gsap.to(preview, { scale: 0, autoAlpha: 0, duration: 0.5, ease: 'expo.out', overwrite: 'auto' });
  });
}
