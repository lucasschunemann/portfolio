import { getCollection, type CollectionEntry } from 'astro:content';

export const tones = {
  // mark: cor de destaque legível sobre o papel (capitular, marcadores, barra de leitura)
  blue: { bg: 'var(--blue)', fg: 'var(--white)', accent: 'var(--yellow)', mark: 'var(--blue)' },
  green: { bg: 'var(--green)', fg: 'var(--white)', accent: 'var(--yellow)', mark: 'var(--green)' },
  yellow: { bg: 'var(--yellow)', fg: 'var(--ink)', accent: 'var(--blue)', mark: 'var(--blue)' },
  ink: { bg: 'var(--ink)', fg: 'var(--white)', accent: 'var(--green)', mark: 'var(--ink)' },
} as const;

const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
export const formatDate = (d: Date) => `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;

export type Article = CollectionEntry<'artigos'> & {
  n: number;
  minutes: number;
  href: string;
  dateLabel: string;
  tone: (typeof tones)[keyof typeof tones];
};

/** Artigos do mais novo para o mais antigo; `n` segue a ordem em que foram escritos. */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('artigos');
  const byDate = [...all].sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
  return byDate
    .map((e, i) => ({
      ...e,
      n: i + 1,
      minutes: Math.max(1, Math.round((e.body ?? '').split(/\s+/).length / 200)),
      href: `/artigos/${e.id}/`,
      dateLabel: formatDate(e.data.date),
      tone: tones[e.data.tone],
    }))
    .reverse();
}
