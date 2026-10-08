import gsap from 'gsap';
import { createNoise3D } from './noise';

/**
 * Forma generativa de linhas (referência: pôster "Brazilidade").
 * Dezenas de contornos interpolados entre três curvas fechadas com ruído,
 * cada um girado um pouco mais que o anterior, o que dá a dobra de fita.
 * O cursor afasta as linhas; o clique solta uma onda.
 */
export function createLines(canvas: HTMLCanvasElement, opts: { reduced: boolean }) {
  const ctx = canvas.getContext('2d')!;
  const noise = createNoise3D(11);

  const K = 92; // linhas
  const M = 220; // amostras por linha
  const A = new Float32Array(M);
  const B = new Float32Array(M);
  const C = new Float32Array(M);
  const COS = new Float32Array(M);
  const SIN = new Float32Array(M);
  for (let j = 0; j < M; j++) {
    const a = (j / M) * Math.PI * 2;
    COS[j] = Math.cos(a);
    SIN[j] = Math.sin(a);
  }

  const state = {
    draw: 0, // 0..1 entrada
    scroll: 0, // 0..1 saída do hero
    pull: 0, // força do cursor
    mx: -9999,
    my: -9999,
    px: -9999,
    py: -9999,
    wave: 0,
    wx: 0,
    wy: 0,
  };

  let w = 0;
  let h = 0;
  let grad: CanvasGradient;
  let running = false;
  let visible = true;
  let last = performance.now();
  let clock = 0;

  function resize() {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = r.width;
    h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    grad = ctx.createLinearGradient(w * 0.15, h * 0.2, w * 0.95, h * 0.85);
    grad.addColorStop(0, '#13a84a');
    grad.addColorStop(0.35, '#6fd12a');
    grad.addColorStop(0.7, '#d6e81e');
    grad.addColorStop(1, '#ffd81f');
    if (!running) render(clock);
  }

  function render(t: number) {
    const tt = t * 0.00009;
    for (let j = 0; j < M; j++) {
      const c = COS[j];
      const s = SIN[j];
      A[j] = 0.1 + 0.06 * noise(c * 1.6 + 7.3, s * 1.6, tt * 1.4);
      B[j] = 0.66 + 0.4 * noise(c * 1.05 + 3.1, s * 1.05 - 1.7, tt);
      C[j] = 1 + 0.3 * noise(c * 0.8 - 4.2, s * 0.8 + 2.3, tt * 0.8) + 0.09 * noise(c * 2.3, s * 2.3, tt * 1.7);
    }

    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1;
    ctx.strokeStyle = grad;
    ctx.lineJoin = 'round';

    const mobile = w < 760;
    const R = Math.min(w * (mobile ? 0.46 : 0.3), h * 0.44) * (1 + state.scroll * 0.55);
    const cx = w * (mobile ? 0.5 : 0.6);
    const cy = h * (mobile ? 0.4 : 0.47) - state.scroll * h * 0.08;

    // cursor
    state.px += (state.mx - state.px) * 0.1;
    state.py += (state.my - state.py) * 0.1;
    const sig2 = (R * 0.32) ** 2;
    const amp = R * 0.24 * state.pull;

    // onda do clique
    const waveOn = state.wave > 0 && state.wave < 1;
    const waveR = state.wave * Math.max(w, h) * 0.9;
    const waveAmp = (1 - state.wave) * 34;

    const twist = 1.05 + state.scroll * 1.6 + Math.sin(tt * 5) * 0.18;
    const total = K + 24;

    for (let k = 0; k < K; k++) {
      const lp = Math.min(1, Math.max(0, (state.draw * total - k) / 24));
      if (lp <= 0) break;
      const s = k / (K - 1);
      const ph = twist * Math.pow(s, 1.5) + 0.22 * Math.sin(tt * 7 + s * 3);
      const cp = Math.cos(ph);
      const sp = Math.sin(ph);
      const sq = 0.72 + 0.28 * Math.cos(s * Math.PI * 1.25 + tt * 4);
      const lift = Math.sin(s * Math.PI) * R * 0.1;
      const u = 1 - s;
      const wa = u * u;
      const wb = 2 * u * s;
      const wc = s * s;
      const jMax = lp >= 1 ? M : Math.floor(M * lp);

      ctx.beginPath();
      for (let j = 0; j <= jMax; j++) {
        const q = j === M ? 0 : j;
        const r = (wa * A[q] + wb * B[q] + wc * C[q]) * R;
        const c = COS[q] * cp - SIN[q] * sp;
        const sn = SIN[q] * cp + COS[q] * sp;
        let x = cx + c * r;
        let y = cy + sn * r * sq + lift;

        if (amp > 0.5) {
          const dx = x - state.px;
          const dy = y - state.py;
          const d2 = dx * dx + dy * dy;
          if (d2 < sig2 * 6) {
            const f = (amp * Math.exp(-d2 / sig2)) / (Math.sqrt(d2) + 1);
            x += dx * f;
            y += dy * f;
          }
        }
        if (waveOn) {
          const dx = x - state.wx;
          const dy = y - state.wy;
          const d = Math.sqrt(dx * dx + dy * dy) + 0.001;
          const delta = d - waveR;
          if (delta * delta < 14400) {
            const f = waveAmp * Math.exp(-(delta * delta) / 3200);
            x += (dx / d) * f;
            y += (dy / d) * f;
          }
        }
        if (j === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  function tick() {
    const now = performance.now();
    clock += Math.min(now - last, 50);
    last = now;
    render(clock);
  }

  function start() {
    if (running || opts.reduced) return;
    running = true;
    last = performance.now();
    gsap.ticker.add(tick);
  }
  function stop() {
    if (!running) return;
    running = false;
    gsap.ticker.remove(tick);
  }

  const io = new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    },
    { threshold: 0 },
  );
  io.observe(canvas);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (visible) start();
  });

  const host = canvas.parentElement!;
  host.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    state.mx = e.clientX - r.left;
    state.my = e.clientY - r.top;
    if (state.px < -9000) {
      state.px = state.mx;
      state.py = state.my;
    }
    gsap.to(state, { pull: 1, duration: 0.6, overwrite: 'auto' });
  });
  host.addEventListener('pointerleave', () => {
    gsap.to(state, { pull: 0, duration: 0.9, overwrite: 'auto' });
  });
  canvas.addEventListener('pointerdown', (e) => {
    const r = canvas.getBoundingClientRect();
    state.wx = e.clientX - r.left;
    state.wy = e.clientY - r.top;
    gsap.fromTo(state, { wave: 0.001 }, { wave: 1, duration: 1.8, ease: 'power2.out' });
  });

  new ResizeObserver(resize).observe(canvas);
  resize();

  return {
    state,
    start,
    renderStatic() {
      state.draw = 1;
      render(4000);
    },
  };
}
