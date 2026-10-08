import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { reduced } from './core';

const once = (trigger: Element, start = 'top 88%') => ({ trigger, start, once: true });

/** Revelações genéricas guiadas por atributos data-*. */
export function initReveals() {
  if (reduced) return;

  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'ln',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 108,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.09,
          scrollTrigger: once(el),
        }),
    });
  });

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, { y: 44, autoAlpha: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: once(el, 'top 92%') });
  });

  document.querySelectorAll<HTMLElement>('[data-reveal-list]').forEach((el) => {
    gsap.from(el.children, {
      y: 30,
      autoAlpha: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: once(el),
    });
  });

  document.querySelectorAll<HTMLElement>('[data-img-reveal]').forEach((el) => {
    const img = el.querySelector('img, .poster');
    gsap
      .timeline({ scrollTrigger: once(el, 'top 92%') })
      .fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' })
      .from(img, { scale: 1.35, duration: 1.8, ease: 'expo.out' }, 0.25);
  });

  document.querySelectorAll<HTMLElement>('[data-speed]').forEach((el) => {
    const s = parseFloat(el.dataset.speed || '0.1') * 100;
    gsap.set(el, { height: `${100 + s}%`, top: `${-s / 2}%`, position: 'absolute', left: 0 });
    gsap.fromTo(
      el,
      { yPercent: -s / 3 },
      {
        yPercent: s / 3,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  // rabisco desenhado
  document.querySelectorAll<SVGPathElement>('.scribble [data-draw]').forEach((p) => {
    gsap.fromTo(
      p,
      { drawSVG: '0%' },
      { drawSVG: '100%', duration: 1.2, ease: 'power3.inOut', scrollTrigger: once(p, 'top 95%') },
    );
    const link = p.closest('a');
    link?.addEventListener('pointerenter', () => {
      gsap.fromTo(p, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.9, ease: 'power3.inOut', overwrite: true });
    });
  });

  // pôster tipográfico (Acompanha)
  document.querySelectorAll<HTMLElement>('[data-poster]').forEach((el) => {
    gsap
      .timeline({ scrollTrigger: once(el, 'top 80%') })
      .from(el.querySelectorAll('.poster__bars i'), {
        scaleY: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: { each: 0.025, from: 'start' },
      })
      .from(
        el.querySelectorAll('.poster__old span'),
        { '--strike': 0, duration: 0.8, ease: 'expo.inOut', stagger: 0.1 },
        0.2,
      )
      .from(el.querySelectorAll('.poster__new .d'), { yPercent: 40, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.1 }, 0.5);
  });

  // números
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const o = { v: 0 };
    el.textContent = '0';
    gsap.to(o, {
      v: Number(el.dataset.count),
      duration: 1.8,
      ease: 'power3.out',
      scrollTrigger: once(el, 'top 92%'),
      onUpdate: () => (el.textContent = String(Math.round(o.v))),
    });
  });

  addEventListener('load', () => ScrollTrigger.refresh());
}
