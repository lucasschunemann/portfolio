import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { enter, initCursor, initHeader, initMagnetic, initScroll, initTransitions, initUtilities, root } from './core';
import { initReveals } from './reveals';
import {
  initFlag,
  initMarquee,
  initServices,
  initStack,
  initStatement,
  initWordmark,
  runLoader,
  settleHash,
  setupHero,
} from './home';
import { setupIntro } from './intro';
import { initArticle, initBlogList, initCovers } from './article';
import { initFit } from './fit';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
gsap.defaults({ ease: 'expo.out' });

async function boot() {
  try {
    await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2500))]);
  } catch {}

  initFit();
  initScroll();
  initTransitions();
  initCursor();
  initMagnetic();
  initUtilities();

  const page = root.dataset.page;
  const intro = page === 'home' ? setupHero() : setupIntro();

  if (page === 'home') {
    initMarquee();
    initStatement();
    initStack();
    initServices();
    initFlag();
  }
  if (page === 'article') initArticle();
  if (page === 'articles') initBlogList();
  initWordmark();
  initHeader();

  root.classList.add('is-ready');

  const reveal = () => {
    intro?.play();
    initReveals();
    initCovers();
  };

  if (page === 'home' && runLoader(reveal)) return;
  if (page === 'home') settleHash();
  enter(reveal);
}

boot();
