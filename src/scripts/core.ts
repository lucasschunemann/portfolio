import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export const root = document.documentElement;
export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = matchMedia('(pointer: fine)').matches;

/* ---------------------------------------------------------------- scroll */

export let lenis: Lenis | null = null;

export function initScroll() {
  if (reduced) return;
  lenis = new Lenis({ lerp: 0.095, wheelMultiplier: 0.95, touchMultiplier: 1.4 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

export function scrollToTarget(target: string | number | Element, immediate = false) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (el === null) return;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement | number, {
      immediate,
      offset: typeof el === 'number' ? 0 : -24,
      duration: 1.5,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      force: true,
    });
  } else if (typeof el === 'number') {
    window.scrollTo({ top: el, behavior: immediate || reduced ? 'auto' : 'smooth' });
  } else {
    el.scrollIntoView({ behavior: immediate || reduced ? 'auto' : 'smooth' });
  }
}

/* ------------------------------------------------------------ transições */

type PT = { color: string; fg: string; label: string };

const pt = document.querySelector<HTMLElement>('[data-pt]')!;
const ptPanel = pt.querySelector<HTMLElement>('.pt__panel')!;
const ptLabel = pt.querySelector<HTMLElement>('.pt__label')!;
const ptText = pt.querySelector<HTMLElement>('[data-pt-label]')!;

function leave(href: string, data: PT) {
  try {
    sessionStorage.setItem('pt', JSON.stringify(data));
  } catch {}
  root.style.setProperty('--pt-color', data.color);
  root.style.setProperty('--pt-fg', data.fg);
  ptText.textContent = data.label;
  pt.classList.add('is-active');
  lenis?.stop();

  if (reduced) {
    location.assign(href);
    return;
  }
  gsap
    .timeline({ onComplete: () => location.assign(href) })
    .fromTo(ptPanel, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'expo.inOut' })
    .fromTo(ptLabel, { yPercent: 120 }, { yPercent: 0, duration: 0.7, ease: 'expo.out' }, 0.4);
}

/** Cobre a página que chegou e revela; `onReveal` dispara quando o painel começa a subir. */
export function enter(onReveal: () => void) {
  if (!root.classList.contains('is-entering')) {
    onReveal();
    return;
  }
  let data: Partial<PT> = {};
  try {
    data = JSON.parse(sessionStorage.getItem('pt') || '{}');
    sessionStorage.removeItem('pt');
  } catch {}
  ptText.textContent = data.label || '';

  if (reduced) {
    root.classList.remove('is-entering');
    onReveal();
    return;
  }

  gsap
    .timeline({
      onComplete: () => {
        root.classList.remove('is-entering');
        gsap.set(ptPanel, { clearProps: 'clipPath' });
      },
    })
    .set(ptLabel, { yPercent: 0 })
    .to(ptLabel, { yPercent: -120, duration: 0.55, ease: 'expo.in' }, 0.05)
    .fromTo(
      ptPanel,
      { clipPath: 'inset(0% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: 'expo.inOut' },
      0.3,
    )
    .add(onReveal, 0.62);
}

export function initTransitions() {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const raw = a.getAttribute('href')!;
    if (/^(mailto|tel):/.test(raw)) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;

    const same = url.pathname.replace(/\/$/, '') === location.pathname.replace(/\/$/, '');
    if (same) {
      e.preventDefault();
      if (url.hash) {
        scrollToTarget(url.hash);
        history.replaceState(null, '', url.hash);
      } else {
        scrollToTarget(0);
      }
      return;
    }

    e.preventDefault();
    leave(url.href, {
      color: a.dataset.color || 'var(--blue)',
      fg: a.dataset.fg || 'var(--white)',
      label: a.dataset.label || '',
    });
  });

  // navegação só de âncora (voltar/avançar, URL digitada) passa pelo Lenis
  addEventListener('hashchange', () => scrollToTarget(location.hash));

  // voltar pelo histórico restaura do bfcache com o painel fechado
  window.addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    pt.classList.remove('is-active');
    gsap.set(ptPanel, { clipPath: 'inset(100% 0% 0% 0%)' });
    lenis?.start();
  });

  // prefetch ao passar o mouse
  const done = new Set<string>([location.pathname]);
  document.addEventListener('pointerover', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="/"]');
    if (!a) return;
    const path = new URL(a.href).pathname;
    if (done.has(path)) return;
    done.add(path);
    const l = document.createElement('link');
    l.rel = 'prefetch';
    l.href = path;
    document.head.appendChild(l);
  });
}

/* ---------------------------------------------------------------- header */

export function initHeader() {
  const hdr = document.querySelector<HTMLElement>('[data-hdr]')!;

  if (lenis) {
    lenis.on('scroll', ({ scroll, direction }: Lenis) => {
      hdr.classList.toggle('is-hidden', direction === 1 && scroll > innerHeight * 0.5);
    });
  } else {
    let lastY = scrollY;
    addEventListener(
      'scroll',
      () => {
        const y = scrollY;
        hdr.classList.toggle('is-hidden', y > lastY && y > innerHeight * 0.5);
        lastY = y;
      },
      { passive: true },
    );
  }

  document.querySelectorAll('[data-hdr-light]').forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 40px',
      end: 'bottom 40px',
      onToggle: (self) => hdr.classList.toggle('is-light', self.isActive),
    });
  });

  // seção atual no menu
  hdr.querySelectorAll<HTMLAnchorElement>('.hdr__nav a').forEach((a) => {
    const id = new URL(a.href).hash;
    const sec = id && document.querySelector(id);
    if (!sec) return;
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => a.classList.toggle('is-current', self.isActive),
    });
  });
}

/* ---------------------------------------------------------------- cursor */

export function initCursor() {
  if (!finePointer || reduced) return;
  const el = document.querySelector<HTMLElement>('[data-cursor-el]')!;
  const label = el.querySelector<HTMLElement>('.cursor__label')!;
  const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' });
  const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' });
  let shown = false;

  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        shown = true;
      }
      el.classList.add('is-on');
      xTo(e.clientX);
      yTo(e.clientY);
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', () => el.classList.remove('is-on'));

  document.addEventListener('pointerover', (e) => {
    const target = e.target as HTMLElement;
    const onLight = !!target.closest('[data-hdr-light]');
    const t = target.closest<HTMLElement>('[data-cursor], a, button');
    el.classList.remove('is-label', 'is-link');
    el.style.setProperty('--cc', onLight ? 'var(--yellow)' : 'var(--blue)');
    if (!t) return;
    if (t.dataset.cursor) {
      label.textContent = t.dataset.cursor;
      el.style.setProperty('--cc', t.dataset.cursorColor || 'var(--blue)');
      el.style.setProperty('--cf', t.dataset.cursorFg || 'var(--white)');
      el.classList.add('is-label');
    } else {
      el.classList.add('is-link');
    }
  });
}

/* ------------------------------------------------------------- magnético */

export function initMagnetic() {
  if (!finePointer || reduced) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'elastic.out(1, 0.5)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'elastic.out(1, 0.5)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.3);
      yTo((e.clientY - r.top - r.height / 2) * 0.45);
    });
    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

/* ------------------------------------------------------------- utilitários */

export function initUtilities() {
  const clock = document.querySelector<HTMLElement>('[data-clock]');
  if (clock) {
    const fmt = new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const tick = () => (clock.textContent = fmt.format(new Date()));
    tick();
    setInterval(tick, 1000);
  }

  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    const label = btn.querySelector<HTMLElement>('[data-copy-label]')!;
    const original = label.textContent;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy!);
        label.textContent = 'Copiado ✓';
      } catch {
        label.textContent = 'Não deu, copie à mão';
      }
      setTimeout(() => (label.textContent = original), 1800);
    });
  });

  document.querySelectorAll('[data-top]').forEach((b) => b.addEventListener('click', () => scrollToTarget(0)));
}
