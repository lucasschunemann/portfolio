// Comportamentos pequenos. Rodam a cada página, inclusive depois das View Transitions.
import { mailto, whatsapp } from '../data/contato';

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

/** Vídeos das obras tocam só enquanto estão na tela. Com movimento reduzido, ficam parados, com controles. */
let clipIo: IntersectionObserver | null = null;
function clips() {
  clipIo?.disconnect();
  const vids = document.querySelectorAll<HTMLVideoElement>('video[data-clip]');
  if (!vids.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    vids.forEach((v) => (v.controls = true));
    return;
  }
  clipIo = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const v = e.target as HTMLVideoElement;
        // se o navegador bloquear o autoplay (economia de bateria, por exemplo), o play fica com quem visita
        if (e.isIntersecting) v.play().catch(() => (v.controls = document.visibilityState === 'visible'));
        else v.pause();
      }
    },
    { threshold: 0.25 },
  );
  vids.forEach((v) => clipIo!.observe(v));
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

/**
 * "Luz" no rodapé: automática (segue o aparelho), acesa ou apagada, nessa ordem.
 * O botão é procurado pela tag: o <html> também tem data-luz, e foi assim que o clique já pegou a página inteira.
 */
const modes = ['automática', 'acesa', 'apagada'] as const;
type Mode = (typeof modes)[number];
function light() {
  const btn = document.querySelector<HTMLButtonElement>('button[data-tema]');
  const label = btn?.querySelector<HTMLElement>('[data-tema-label]');
  if (!btn || !label) return;
  const root = document.documentElement;
  const saved = (): Mode => {
    try {
      const t = localStorage.getItem('tema');
      if (t === 'acesa' || t === 'apagada') return t;
    } catch {}
    return 'automática';
  };
  label.textContent = saved();
  btn.onclick = () => {
    const next = modes[(modes.indexOf(saved()) + 1) % modes.length];
    const auto = matchMedia('(prefers-color-scheme: dark)').matches ? 'apagada' : 'acesa';
    const apply = () => {
      try {
        if (next === 'automática') localStorage.removeItem('tema');
        else localStorage.setItem('tema', next);
      } catch {}
      root.dataset.luz = next === 'automática' ? auto : next;
      label.textContent = next;
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

/** A faixa de orçamento escolhida no contato vai junto no e-mail e no WhatsApp. */
function budget() {
  const box = document.querySelector<HTMLFieldSetElement>('[data-budget]');
  const mail = document.querySelector<HTMLAnchorElement>('[data-mail]');
  const wa = document.querySelector<HTMLAnchorElement>('[data-wa]');
  if (!box) return;
  box.onchange = (e) => {
    const value = (e.target as HTMLInputElement).value;
    if (mail) mail.href = mailto('Novo projeto', value);
    if (wa) wa.href = whatsapp(value);
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
  clips();
  clock();
  light();
  budget();
  copy();
  toTop();
});
