// Contato: leve de propósito (sem imagens), porque o script do navegador também usa.

export const email = 'lucas.vhschunemann@gmail.com';
/** só dígitos, com DDI e DDD */
export const phone = '5547992396261';

/**
 * Faixas de orçamento que aparecem no contato. Quem escreve já diz quanto pretende investir.
 * Três bastam: uma landing page cabe na primeira; um projeto de produto, na segunda ou na terceira.
 */
export const budgets = ['Até R$ 5 mil', 'R$ 5 a 15 mil', 'Acima de R$ 15 mil'];

const budgetLine = (budget = '') => (budget ? `Orçamento: ${budget}` : 'Orçamento (uma faixa ou valor aproximado):');

/** Link de e-mail já com assunto e um roteiro curto, orçamento incluído. */
export const mailto = (subject = 'Novo projeto', budget = '') => {
  const body = ['Olá, Lucas!', '', 'O que eu preciso:', 'Em que ponto o projeto está:', 'Prazo ideal:', budgetLine(budget), ''].join(
    '\n',
  );
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

/** Conversa no WhatsApp já com uma primeira frase e o orçamento. */
export const whatsapp = (budget = '') =>
  `https://wa.me/${phone}?text=${encodeURIComponent(
    `Olá, Lucas! Vi o seu portfólio e quero conversar sobre um projeto. ${budgetLine(budget)} `.trimEnd(),
  )}`;
