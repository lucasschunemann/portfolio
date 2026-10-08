// Comportamentos pequenos. Rodam a cada página, inclusive depois das View Transitions.

let clockTimer = 0;
let io: IntersectionObserver | null = null;

/** Elementos [data-r] aparecem com um fade curto quando entram na tela. */
function reveal() {
  io?.disconnect();
  const els = document.querySelectorAll<HTMLElement>('[data-r]:not(.in)');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('in');
        io!.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  els.forEach((el) => io!.observe(el));
}

/** Hora de Blumenau no cabeçalho; os dois pontos piscam a cada segundo. */
function clock() {
  clearInterval(clockTimer);
  const el = document.querySelector<HTMLElement>('[data-clock]');
  if (!el) return;
  const fmt = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' });
  const tick = () => {
    const [h, m] = fmt.format(new Date()).split(':');
    el.innerHTML = `${h}<i>:</i>${m}`;
  };
  tick();
  clockTimer = window.setInterval(tick, 15_000);
}

/** "Luz: acesa / apagada" troca o tema, com uma transição suave quando o navegador permite. */
function light() {
  const btn = document.querySelector<HTMLButtonElement>('[data-luz]');
  const label = document.querySelector<HTMLElement>('[data-luz-label]');
  if (!btn || !label) return;
  const root = document.documentElement;
  label.textContent = root.dataset.luz === 'apagada' ? 'apagada' : 'acesa';
  btn.onclick = () => {
    const nextLuz = root.dataset.luz === 'apagada' ? 'acesa' : 'apagada';
    const apply = () => {
      root.dataset.luz = nextLuz;
      label.textContent = nextLuz;
      try {
        localStorage.setItem('luz', nextLuz);
      } catch {}
    };
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (document.startViewTransition && !reduce) {
      root.classList.add('luz-switch');
      document.startViewTransition(apply).finished.finally(() => root.classList.remove('luz-switch'));
    } else {
      apply();
    }
  };
}

function copy() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    btn.onclick = async () => {
      const original = btn.textContent;
      try {
        await navigator.clipboard.writeText(btn.dataset.copy!);
        btn.textContent = btn.dataset.copyLabel ?? 'copiado';
      } catch {
        btn.textContent = 'Não deu, copie à mão';
      }
      setTimeout(() => (btn.textContent = original), 1600);
    };
  });
}

function toTop() {
  document.querySelectorAll<HTMLAnchorElement>('[data-top]').forEach((a) => {
    a.onclick = (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    };
  });
}

document.addEventListener('astro:page-load', () => {
  reveal();
  clock();
  light();
  copy();
  toTop();
});
