import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { reduced } from './core';

/** Entrada do título gigante + metadados (casos, artigos, índice de artigos). */
export function setupIntro() {
  const title = document.querySelector<HTMLElement>('[data-intro-title]');
  if (!title) return null;
  const chars = SplitText.create(title, { type: 'words,chars', charsClass: 'c', mask: 'words' }).chars;
  const fades = document.querySelectorAll('[data-intro-fade]');
  if (reduced) return { play: () => gsap.timeline() };

  gsap.set(chars, { yPercent: 112 });
  gsap.set(fades, { y: 26, autoAlpha: 0 });

  return {
    play: () =>
      gsap
        .timeline()
        .to(chars, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.03 }, 0)
        .to(fades, { y: 0, autoAlpha: 1, duration: 1.1, ease: 'expo.out', stagger: 0.12 }, 0.25),
  };
}
