import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { createLines } from './lines';
import { finePointer, lenis, reduced, root } from './core';

const $ = <T extends Element = HTMLElement>(s: string, ctx: ParentNode = document) => ctx.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, ctx: ParentNode = document) => [...ctx.querySelectorAll<T>(s)];

/* ------------------------------------------------------------------ hero */

export function setupHero() {
  const hero = $('[data-hero]');
  if (!hero) return null;

  const canvas = $<HTMLCanvasElement>('[data-lines]', hero)!;
  const lines = createLines(canvas, { reduced });

  const titleChars = $$('[data-hero-line]', hero).flatMap(
    (l) => SplitText.create(l, { type: 'words,chars', charsClass: 'c', mask: 'words' }).chars as HTMLElement[],
  );
  const words = $$('.hero__word', hero);
  const wordChars = words.map((w) => SplitText.create(w, { type: 'chars', charsClass: 'c' }).chars as HTMLElement[]);

  if (reduced) {
    lines.renderStatic();
    return { play: () => gsap.timeline(), lines };
  }

  gsap.set(titleChars, { yPercent: 115 });
  wordChars.forEach((cs) => gsap.set(cs, { yPercent: 115 }));
  gsap.set($$('.hero__tag > span', hero), { yPercent: 110 });
  gsap.set($$('.hero__intro span', hero), { y: 24, autoAlpha: 0 });
  gsap.set($$('.hero__barcode rect', hero), { scaleY: 0, transformOrigin: '50% 100%' });
  gsap.set($$('.hero__barcode p, .hero__bottom > *', hero), { y: 20, autoAlpha: 0 });
  gsap.set('.hdr > *', { y: -24, autoAlpha: 0 });

  const loading = root.classList.contains('is-loading');
  if (!loading) gsap.set($$('[data-hero-shape]', hero), { scale: 0, rotation: -120 });

  const play = () => {
    const tl = gsap.timeline();
    tl.add(() => lines.start(), 0)
      .to(lines.state, { draw: 1, duration: 2.8, ease: 'power2.inOut' }, 0)
      .to(titleChars, { yPercent: 0, duration: 1.25, ease: 'expo.out', stagger: 0.028 }, 0.05)
      .to(wordChars[0], { yPercent: 0, duration: 1.25, ease: 'expo.out', stagger: 0.03 }, 0.45)
      .to($$('.hero__tag > span', hero), { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.07 }, 0.3)
      .to($$('.hero__intro span', hero), { y: 0, autoAlpha: 1, duration: 1, ease: 'expo.out', stagger: 0.07 }, 0.55)
      .to(
        $$('.hero__barcode rect', hero),
        { scaleY: 1, duration: 0.7, ease: 'expo.out', stagger: { each: 0.008, from: 'random' } },
        0.5,
      )
      .to($$('.hero__barcode p, .hero__bottom > *', hero), { y: 0, autoAlpha: 1, duration: 1, ease: 'expo.out', stagger: 0.08 }, 0.8)
      .to('.hdr > *', { y: 0, autoAlpha: 1, duration: 1, ease: 'expo.out', stagger: 0.07 }, 0.5);
    if (!loading) {
      tl.to($$('[data-hero-shape]', hero), { scale: 1, rotation: 0, duration: 1.1, ease: 'back.out(1.7)', stagger: 0.1 }, 0.35);
    }
    tl.add(() => cycleWords(words, wordChars), 1.2);
    return tl;
  };

  // saída do hero: a forma abre e gira, o título sobe
  gsap.to(lines.state, {
    scroll: 1,
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to($('.hero__title', hero), {
    y: () => -innerHeight * 0.12,
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });

  return { play, lines };
}

function cycleWords(words: HTMLElement[], chars: HTMLElement[][]) {
  let i = 0;
  const next = () => {
    const out = i;
    i = (i + 1) % words.length;
    words[i].classList.add('is-active');
    gsap
      .timeline({
        onComplete: () => {
          words[out].classList.remove('is-active');
          gsap.delayedCall(2.4, next);
        },
      })
      .to(chars[out], { yPercent: -115, duration: 0.7, ease: 'expo.in', stagger: 0.022 })
      .fromTo(chars[i], { yPercent: 115 }, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.03 }, 0.45);
  };
  gsap.delayedCall(2.2, next);
}

/* ---------------------------------------------------------------- loader */

/** Loader do primeiro acesso: as três formas da bandeira giram e voam para o hero. */
export function runLoader(onReveal: () => void) {
  const ld = $('[data-loader]');
  if (!ld || !root.classList.contains('is-loading')) return false;

  try {
    sessionStorage.setItem('seen', '1');
  } catch {}
  history.scrollRestoration = 'manual';
  scrollTo(0, 0);
  lenis?.stop();

  const shapes = $$('[data-ld-shape]', ld);
  const targets = $$('[data-hero-shape]');
  const count = $('[data-ld-count]', ld)!;
  const bg = $('.ld__bg', ld)!;
  const size = shapes[2].getBoundingClientRect().width;
  const pos = (i: number) => (i - 1) * size * 1.55;
  const c = { v: 0 };

  gsap.set(targets, { autoAlpha: 0 });
  gsap.set(shapes, { x: (i) => pos(i), scale: 0, rotation: -90 });

  const tl = gsap.timeline();
  tl.to(shapes, { scale: 1, rotation: 0, duration: 0.9, ease: 'back.out(1.8)', stagger: 0.12 })
    .to(
      c,
      {
        v: 100,
        duration: 2.3,
        ease: 'power2.inOut',
        onUpdate: () => (count.textContent = String(Math.round(c.v)).padStart(3, '0')),
      },
      0,
    )
    .to(shapes, { x: (i) => pos([2, 0, 1][i]), rotation: 180, duration: 0.75, ease: 'expo.inOut', stagger: 0.05 }, 0.95)
    .to(shapes, { x: (i) => pos([1, 2, 0][i]), rotation: 360, duration: 0.75, ease: 'expo.inOut', stagger: 0.05 }, 1.6)
    .to(shapes, { x: (i) => pos(i), rotation: 540, duration: 0.75, ease: 'expo.inOut', stagger: 0.05 }, 2.25)
    .add(() => {
      // voo até as formas do hero
      shapes.forEach((s, i) => {
        const a = s.getBoundingClientRect();
        const b = targets[i].getBoundingClientRect();
        gsap.to(s, {
          x: `+=${b.left + b.width / 2 - (a.left + a.width / 2)}`,
          y: `+=${b.top + b.height / 2 - (a.top + a.height / 2)}`,
          scale: b.width / a.width,
          rotation: 720,
          duration: 1.25,
          delay: i * 0.06,
          ease: 'expo.inOut',
          onComplete: i === 2 ? finish : undefined,
        });
      });
    }, 3.05)
    .to($$('.ld__count span, .ld__meta, .ld__top', ld), { yPercent: 110, autoAlpha: 0, duration: 0.7, ease: 'expo.in' }, 3.0)
    .to(bg, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.2, ease: 'expo.inOut' }, 3.25)
    .add(onReveal, 3.45);

  function finish() {
    gsap.set(targets, { autoAlpha: 1 });
    root.classList.remove('is-loading');
    ld!.remove();
    lenis?.start();
  }
  return true;
}

/* --------------------------------------------------------------- marquee */

export function initMarquee() {
  const track = $('[data-marquee]');
  if (!track) return;
  const group = track.children[0] as HTMLElement;
  let w = group.offsetWidth;
  new ResizeObserver(() => (w = group.offsetWidth)).observe(group);
  let x = 0;
  let dir = -1;
  let skew = 0;
  const shapes = $$('.sh', track);

  if (reduced) return;
  gsap.ticker.add((_t, dt) => {
    const v = lenis ? lenis.velocity : 0;
    if (v > 0.3) dir = -1;
    else if (v < -0.3) dir = 1;
    x += dir * (0.055 * dt + Math.abs(v) * 0.55);
    if (x <= -w) x += w;
    if (x > 0) x -= w;
    skew += (gsap.utils.clamp(-10, 10, -v * 0.35) - skew) * 0.12;
    track.style.transform = `translate3d(${x}px,0,0) skewX(${skew.toFixed(2)}deg)`;
    const r = x * 0.4;
    for (const s of shapes) s.style.rotate = `${r}deg`;
  });
}

/* ------------------------------------------------------------- statement */

export function initStatement() {
  const el = $('[data-words]');
  if (!el || reduced) return;
  SplitText.create(el, {
    type: 'words',
    wordsClass: 'w',
    autoSplit: true,
    onSplit: (self) => {
      const items = $$('.w, .sh', self.elements[0] as HTMLElement);
      return gsap.fromTo(
        items,
        { opacity: 0.13 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 52%', scrub: true },
        },
      );
    },
  });
}

/* --------------------------------------------------------- pilha de cards */

export function initStack() {
  const cards = $$('[data-card]');
  if (!cards.length || reduced) return;

  cards.forEach((card, i) => {
    const inner = $('.card__in', card)!;
    const shade = $('.card__shade', card)!;

    gsap.from(card, {
      rotation: i % 2 ? 3 : -3,
      y: 80,
      ease: 'none',
      scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 55%', scrub: true },
    });

    const next = cards[i + 1];
    if (!next) return;
    gsap
      .timeline({
        scrollTrigger: {
          trigger: next,
          start: 'top bottom',
          end: () => `top ${parseFloat(getComputedStyle(next).top)}px`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
      .to(inner, { scale: 0.92, ease: 'none' }, 0)
      .to(shade, { opacity: 0.5, ease: 'none' }, 0);
  });
}

/* --------------------------------------------------------------- serviços */

export function initServices() {
  const wrap = $('[data-svc]');
  if (!wrap || reduced) return;
  const cards = $$('[data-svc-card]', wrap);
  const mm = gsap.matchMedia();

  mm.add('(min-width: 901px)', () => {
    const from = [
      { xPercent: 104, rotation: 9, y: 140 },
      { xPercent: 0, rotation: -5, y: 190 },
      { xPercent: -104, rotation: 13, y: 120 },
    ];
    const to = [
      { xPercent: 0, rotation: -5, y: 30 },
      { xPercent: 0, rotation: 2, y: -16 },
      { xPercent: 0, rotation: -2.5, y: 46 },
    ];
    cards.forEach((c, i) =>
      gsap.fromTo(c, from[i], {
        ...to[i],
        ease: 'none',
        scrollTrigger: { trigger: wrap, start: 'top 95%', end: 'center 55%', scrub: 1 },
      }),
    );

    if (finePointer) {
      cards.forEach((c) => {
        const ry = gsap.quickTo(c, 'rotationY', { duration: 0.6, ease: 'power3' });
        const rx = gsap.quickTo(c, 'rotationX', { duration: 0.6, ease: 'power3' });
        c.addEventListener('pointermove', (e) => {
          const r = c.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 14);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 14);
        });
        c.addEventListener('pointerleave', () => {
          ry(0);
          rx(0);
        });
      });
    }
  });

  mm.add('(max-width: 900px)', () => {
    cards.forEach((c, i) =>
      gsap.fromTo(
        c,
        { y: 90, rotation: i % 2 ? 5 : -5 },
        {
          y: 0,
          rotation: i % 2 ? 1.5 : -1.5,
          ease: 'none',
          scrollTrigger: { trigger: c, start: 'top 98%', end: 'top 55%', scrub: 1 },
        },
      ),
    );
  });
}

/* ---------------------------------------------------------------- bandeira */

export function initFlag() {
  const flag = $('[data-flag]');
  if (!flag || reduced) return;
  const [rect, diamond, circle] = $$('i', flag);

  gsap
    .timeline({
      scrollTrigger: { trigger: '#sobre', start: 'top 85%', end: 'top 10%', scrub: 1 },
    })
    .from(rect, { xPercent: -22, yPercent: 26, rotation: -14, scale: 0.62, ease: 'none' }, 0)
    .from(diamond, { xPercent: 38, yPercent: -34, rotation: 48, scale: 0.5, ease: 'none' }, 0)
    .from(circle, { xPercent: 120, yPercent: 80, scale: 0.3, ease: 'none' }, 0);

  if (!finePointer) return;
  const depth = [8, 18, 32];
  const movers = [rect, diamond, circle].map((el) => ({
    x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3' }),
    y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3' }),
  }));
  const area = flag.closest('section')!;
  area.addEventListener('pointermove', (e) => {
    const r = flag.getBoundingClientRect();
    const nx = (e.clientX - (r.left + r.width / 2)) / innerWidth;
    const ny = (e.clientY - (r.top + r.height / 2)) / innerHeight;
    movers.forEach((m, i) => {
      m.x(nx * depth[i] * 2);
      m.y(ny * depth[i] * 2);
    });
  });
  area.addEventListener('pointerleave', () => movers.forEach((m) => (m.x(0), m.y(0))));
}

/* ------------------------------------------------------- marca do rodapé */

export function initWordmark() {
  const wm = $('[data-wordmark]');
  if (!wm || reduced) return;
  const sans = $$('.d span', wm);
  const serif = $$('.si span', wm);
  const letters = [...sans, ...serif];

  gsap.from(letters, {
    yPercent: 105,
    duration: 1.4,
    ease: 'expo.out',
    stagger: 0.06,
    scrollTrigger: { trigger: wm, start: 'top 98%', once: true },
  });

  if (!finePointer) return;
  // largura e peso da sans seguem o cursor; o "von" em serifa se inclina
  const items = letters.map((el) => {
    const isSans = sans.includes(el);
    return {
      el,
      isSans,
      w: isSans ? gsap.quickTo(el, '--w', { duration: 0.6, ease: 'power3' }) : null,
      g: isSans ? gsap.quickTo(el, '--g', { duration: 0.6, ease: 'power3' }) : null,
      lift: isSans ? null : gsap.quickTo(el, '--lift', { duration: 0.8, ease: 'power3' }),
    };
  });
  sans.forEach((el) => gsap.set(el, { '--w': 75, '--g': 850 }));
  serif.forEach((el) => gsap.set(el, { '--lift': 0 }));

  const footer = wm.closest('footer')!;
  footer.addEventListener('pointermove', (e) => {
    for (const it of items) {
      const r = it.el.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      const t = Math.max(0, 1 - d / (innerWidth * 0.22));
      if (it.isSans) {
        it.w!(75 + t * 30);
        it.g!(850 - t * 600);
      } else {
        it.lift!(t);
      }
    }
  });
  footer.addEventListener('pointerleave', () => {
    for (const it of items) {
      if (it.isSans) {
        it.w!(75);
        it.g!(850);
      } else {
        it.lift!(0);
      }
    }
  });
}

/* ----------------------------------------------------------------- hash */

export function settleHash() {
  if (!location.hash) return;
  const el = document.querySelector(location.hash);
  if (!el) return;
  ScrollTrigger.refresh();
  if (lenis) lenis.scrollTo(el as HTMLElement, { immediate: true, force: true, offset: -24 });
  else el.scrollIntoView();
}
