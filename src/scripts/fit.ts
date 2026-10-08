/** Ajusta o corpo do texto para ocupar a largura do bloco (títulos gigantes). */
export function initFit() {
  const els = [...document.querySelectorAll<HTMLElement>('[data-fit]')];
  if (!els.length) return;
  const range = document.createRange();

  const fit = (el: HTMLElement) => {
    const max = parseFloat(el.dataset.fitMax || '0.24') * innerWidth;
    const share = parseFloat(el.dataset.fit || '1');
    el.style.fontSize = '100px';
    range.selectNodeContents(el);
    const w = range.getBoundingClientRect().width;
    const avail = el.clientWidth * share;
    if (w > 0) el.style.fontSize = `${Math.min(max, (100 * avail) / w)}px`;
  };

  const run = () => els.forEach(fit);
  run();
  let raf = 0;
  new ResizeObserver(() => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(run);
  }).observe(document.body);
}
