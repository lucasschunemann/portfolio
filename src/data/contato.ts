// Contato: leve de propósito (sem imagens), porque o script do navegador também usa.

export const email = 'lucas.vhschunemann@gmail.com';
/** só dígitos, com DDI e DDD */
export const phone = '5547992396261';

type Lang = 'pt' | 'en';

/**
 * Faixas de orçamento que aparecem no contato. Quem escreve já diz quanto pretende investir.
 * Três bastam: uma landing page cabe na primeira; um projeto de produto, na segunda ou na terceira.
 */
export const budgets: Record<Lang, string[]> = {
  pt: ['Até R$ 5 mil', 'R$ 5 a 15 mil', 'Acima de R$ 15 mil'],
  en: ['Up to R$ 5k', 'R$ 5k to 15k', 'Over R$ 15k'],
};

const words = {
  pt: {
    subject: 'Novo projeto',
    body: ['Olá!', '', 'O que eu preciso:', 'Em que ponto o projeto está:', 'Prazo ideal:'],
    budget: 'Orçamento',
    budgetAsk: 'Orçamento (uma faixa ou valor aproximado):',
    wa: 'Olá! Vi o site da Quieto e quero conversar sobre um projeto.',
  },
  en: {
    subject: 'New project',
    body: ['Hi!', '', 'What I need:', 'Where the project stands:', 'Ideal timeline:'],
    budget: 'Budget',
    budgetAsk: 'Budget (a range or a rough amount):',
    wa: "Hi! I saw Quieto's website and would like to talk about a project.",
  },
};

const budgetLine = (budget = '', lang: Lang = 'pt') =>
  budget ? `${words[lang].budget}: ${budget}` : words[lang].budgetAsk;

/** Link de e-mail já com assunto e um roteiro curto, orçamento incluído. */
export const mailto = (subject?: string, budget = '', lang: Lang = 'pt') => {
  const w = words[lang];
  const body = [...w.body, budgetLine(budget, lang), ''].join('\n');
  return `mailto:${email}?subject=${encodeURIComponent(subject || w.subject)}&body=${encodeURIComponent(body)}`;
};

/** Conversa no WhatsApp já com uma primeira frase e o orçamento. */
export const whatsapp = (budget = '', lang: Lang = 'pt') =>
  `https://wa.me/${phone}?text=${encodeURIComponent(`${words[lang].wa} ${budgetLine(budget, lang)}`.trimEnd())}`;
