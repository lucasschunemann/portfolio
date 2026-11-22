// Dois idiomas: pt-BR na raiz, inglês em /en/. Rotas, textos fixos de interface e o conteúdo de cada idioma.
// O conteúdo em inglês mora em src/data/site.en.ts; os textos fixos, aqui em `ui`.
import * as pt from './data/site';
import * as en from './data/site.en';
import { budgets, mailto, whatsapp } from './data/contato';
import type { Figure, Project } from './data/site';

export type Lang = 'pt' | 'en';
export const langs: Lang[] = ['pt', 'en'];
export const htmlLang: Record<Lang, string> = { pt: 'pt-BR', en: 'en' };
export const ogLocale: Record<Lang, string> = { pt: 'pt_BR', en: 'en_US' };

export const langOf = (pathname: string): Lang => (/^\/en(\/|$)/.test(pathname) ? 'en' : 'pt');

/** Caminho em português ("/obras/neth/", "/#obras") para o idioma pedido. */
export function href(lang: Lang, path: string): string {
  if (lang === 'pt') return path;
  return '/en' + path.replace(/^\/obras\//, '/work/').replace(/^\/artigos\//, '/writing/');
}

/** A mesma página no outro idioma. Caminho desconhecido (404) leva à home. */
export function altPath(pathname: string): string {
  const p = pathname.endsWith('/') ? pathname : pathname + '/';
  if (langOf(p) === 'en') {
    const rest = p.replace(/^\/en/, '');
    if (rest === '/') return '/';
    if (/^\/(work|writing)\//.test(rest)) return rest.replace(/^\/work\//, '/obras/').replace(/^\/writing\//, '/artigos/');
    return '/';
  }
  if (p === '/' || /^\/(obras|artigos)\//.test(p)) return href('en', p);
  return '/en/';
}

export const ui = {
  pt: {
    title: 'Estúdio de design de produto em Blumenau',
    skip: 'Pular para o conteúdo',
    nav: { obras: 'Obras', servicos: 'Serviços', sobre: 'Sobre', textos: 'Textos', contato: 'Contato', main: 'Principal' },
    clock: 'Horário em Blumenau',
    logo: 'Quieto, início',
    switchTo: { label: 'EN', title: 'Read in English' },
    foot: {
      set: 'Composto em Host Grotesk e Fragment Mono',
      updated: 'Atualizado em',
      light: 'Luz',
      lightAria: 'Tema da página',
      lightModes: ['automática', 'acesa', 'apagada'],
      top: 'Topo ↑',
    },
    home: {
      lead: 'Desenhamos produtos digitais e sites que as pessoas entendem de primeira.',
      leadMute:
        'A Quieto é um estúdio de design em Blumenau. Ajudamos startups, SaaS e negócios a sair da ideia e chegar numa interface clara, pronta para desenvolvimento ou já publicada.',
      start: 'Iniciar um projeto →',
      seeWork: 'Ver obras',
      clients: 'Clientes',
      wall: 'Obras selecionadas',
      services: 'Serviços',
      servicesAside: 'O que podemos fazer pelo seu projeto',
      from: 'A partir de',
      see: 'Veja',
      process: 'Como funciona',
      processAside: 'Do primeiro e-mail à entrega',
      index: 'Índice',
      works: 'obras',
      about: 'Sobre',
      texts: 'Textos',
      textsCount: 'textos',
      allTexts: 'Todos os textos →',
      contact: 'Contato',
      contactLead: 'Vamos tirar o seu projeto do papel.',
      contactMute:
        'Conte em poucas linhas o que você precisa, em que ponto está, o prazo e quanto pretende investir. A gente responde com os próximos passos.',
      budget: 'Orçamento previsto',
      email: 'Escrever um e-mail →',
      wa: 'Chamar no WhatsApp ↗',
      copy: 'Copiar e-mail',
      copied: 'E-mail copiado ✓',
      copyFail: 'Não deu, copie à mão',
    },
    room: {
      crumb: 'Obras',
      live: 'Ver o site no ar ↗',
      liveGallery: 'Ver a galeria no ar ↗',
      meta: ['Ano', 'Cliente', 'Indústria', 'Disciplina', 'Papel', 'Duração', 'Ferramentas'],
      noCover: 'Diagrama do motor de créditos. Produto em desenvolvimento; as telas não são públicas.',
      challenge: 'Desafio',
      decision: 'Decisão',
      process: 'Processo',
      result: 'Resultado',
      quote: 'Depoimento',
      translated: 'Traduzido do português',
      retro: 'Hoje faríamos diferente',
      contact: 'Contato',
      next: 'Próximo passo',
      ctaPersonal: 'Quer algo fora do comum para a sua marca?',
      cta: { ds: 'Precisa de um design system?', site: 'Precisa de um site assim?', product: 'Precisa de um produto assim?' },
      ctaMute: 'Conte o que você precisa e a gente responde com os próximos passos.',
      start: 'Iniciar um projeto →',
      mailSubject: (name: string) => `Projeto parecido com ${name}`,
      pager: 'Outras obras',
    },
    texts: {
      title: 'Textos',
      description: 'Textos da Quieto sobre design, produto e processo criativo.',
      head: 'Notas sobre design, produto e processo.',
      count: 'textos',
      back: '← Textos',
      read: 'min de leitura',
      next: 'Próximo texto →',
      nextAria: 'Próximo texto',
    },
    diagram: {
      aria: 'Diagrama: PIS, COFINS, ICMS e ISS convergem em CBS e IBS no motor de créditos do Acompanha. As telas do produto não são públicas.',
      title: 'Motor de créditos',
      sub: 'Simulação da Reforma Tributária, editável na própria tela',
      foot: 'Diagrama · as telas do produto não são públicas',
      collection: 'Coleção particular',
    },
    months: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  },
  en: {
    title: 'Product design studio in Blumenau, Brazil',
    skip: 'Skip to content',
    nav: { obras: 'Work', servicos: 'Services', sobre: 'About', textos: 'Writing', contato: 'Contact', main: 'Main' },
    clock: 'Time in Blumenau',
    logo: 'Quieto, home',
    switchTo: { label: 'PT', title: 'Ler em português' },
    foot: {
      set: 'Set in Host Grotesk and Fragment Mono',
      updated: 'Updated',
      light: 'Light',
      lightAria: 'Page theme',
      lightModes: ['auto', 'on', 'off'],
      top: 'Top ↑',
    },
    home: {
      lead: 'We design digital products and websites that people understand the first time.',
      leadMute:
        'Quieto is a design studio in Blumenau, Brazil. We help startups, SaaS companies and businesses get from an idea to a clear interface, ready for development or already live.',
      start: 'Start a project →',
      seeWork: 'See the work',
      clients: 'Clients',
      wall: 'Selected work',
      services: 'Services',
      servicesAside: 'What we can do for your project',
      from: 'From',
      see: 'See',
      process: 'How it works',
      processAside: 'From the first email to delivery',
      index: 'Index',
      works: 'works',
      about: 'About',
      texts: 'Writing',
      textsCount: 'articles',
      allTexts: 'All articles →',
      contact: 'Contact',
      contactLead: 'Tell us about your project.',
      contactMute:
        'A few lines are enough: what you need, where it stands, the timeline and how much you plan to invest. We reply with the next steps.',
      budget: 'Expected budget',
      email: 'Write an email →',
      wa: 'Message on WhatsApp ↗',
      copy: 'Copy email',
      copied: 'Email copied ✓',
      copyFail: "Couldn't copy, please copy it by hand",
    },
    room: {
      crumb: 'Work',
      live: 'See the live site ↗',
      liveGallery: 'See the live gallery ↗',
      meta: ['Year', 'Client', 'Industry', 'Discipline', 'Role', 'Duration', 'Tools'],
      noCover: 'Diagram of the credit engine. The product is in development; the screens are not public.',
      challenge: 'Challenge',
      decision: 'Decision',
      process: 'Process',
      result: 'Result',
      quote: 'Testimonial',
      translated: 'Translated from Portuguese',
      retro: 'What we would do differently today',
      contact: 'Contact',
      next: 'Next step',
      ctaPersonal: 'Want something out of the ordinary for your brand?',
      cta: { ds: 'Need a design system?', site: 'Need a website like this?', product: 'Need a product like this?' },
      ctaMute: 'Tell us what you need and we will reply with the next steps.',
      start: 'Start a project →',
      mailSubject: (name: string) => `Project similar to ${name}`,
      pager: 'More work',
    },
    texts: {
      title: 'Writing',
      description: 'Articles by Quieto on design, product and the creative process.',
      head: 'Notes on design, product and process.',
      count: 'articles',
      back: '← Writing',
      read: 'min read',
      next: 'Next article →',
      nextAria: 'Next article',
    },
    diagram: {
      aria: "Diagram: PIS, COFINS, ICMS and ISS converge into CBS and IBS in Acompanha's credit engine. The product screens are not public.",
      title: 'Credit engine',
      sub: 'Tax reform simulation, editable on the screen itself',
      foot: 'Diagram · the product screens are not public',
      collection: 'Private collection',
    },
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
} as const;

/* ------------------------------------------------------------- conteúdo */

/** Tipo de chamada no fim da obra. Vem do projeto em português, que é a fonte. */
export type Kind = 'personal' | 'ds' | 'site' | 'product';
export type LocalProject = Project & { kind: Kind };

const kindOf = (p: Project): Kind =>
  p.client === 'Projeto pessoal' ? 'personal' : p.service === 'Design system' ? 'ds' : p.type === 'Web' ? 'site' : 'product';

function need<T>(v: T | undefined, where: string): T {
  if (v === undefined) throw new Error(`Falta a tradução: ${where}`);
  return v;
}

/** Junta a estrutura do projeto (imagens, layout, links) com o texto em inglês, conferindo que nada ficou de fora. */
function localize(p: Project): Project {
  const t = need(en.projects[p.slug], p.slug);
  const at = (k: string) => `${p.slug}.${k}`;
  if (t.decisions.length !== p.decisions.length) throw new Error(`Número de decisões diferente: ${p.slug}`);
  if (t.images.length !== p.images.length) throw new Error(`Número de legendas diferente: ${p.slug}`);
  const cap = (f: Figure | undefined, c: string | undefined, k: string): Figure | undefined =>
    f && { ...f, caption: need(c, at(k)) };
  return {
    ...p,
    when: t.when,
    type: t.type,
    service: t.service,
    client: t.client ?? p.client,
    industry: t.industry,
    tools: t.tools,
    role: p.role && need(t.role, at('role')),
    duration: p.duration && need(t.duration, at('duration')),
    summary: t.summary,
    challenge: t.challenge,
    decisions: p.decisions.map((d, i) => ({
      ...d,
      title: t.decisions[i].title,
      text: t.decisions[i].text,
      fig: cap(d.fig, t.decisions[i].caption, `decisions[${i}].caption`),
    })),
    process: p.process && {
      ...p.process,
      text: need(t.process?.text, at('process')),
      figs: p.process.figs?.map((f, i) => cap(f, t.process?.captions?.[i], `process.captions[${i}]`)!),
    },
    result: p.result && need(t.result, at('result')),
    retro: p.retro && need(t.retro, at('retro')),
    // o depoimento fica como foi dito; a tradução vai ao lado, marcada
    quote: p.quote && { ...p.quote, role: t.quote?.role ?? p.quote.role, translation: t.quote?.text },
    images: p.images.map((f, i) => ({ ...f, caption: t.images[i] })),
  };
}

const enProjects = pt.projects.map(localize);

export function content(lang: Lang) {
  const E = lang === 'en';
  return {
    site: E ? { ...pt.site, ...en.site } : pt.site,
    clients: pt.clients,
    services: pt.services.map((s, i) => (E ? { ...s, ...en.services[i] } : s)),
    process: E ? en.process : pt.process,
    bio: E ? en.bio : pt.bio,
    facts: E ? en.facts : pt.facts,
    projects: (E ? enProjects : pt.projects).map((p, i) => ({ ...p, kind: kindOf(pt.projects[i]) })) as LocalProject[],
    budgets: budgets[lang],
    mailto: (subject?: string, budget?: string) => mailto(subject, budget, lang),
    whatsapp: (budget?: string) => whatsapp(budget, lang),
  };
}
