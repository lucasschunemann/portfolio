import { getCollection, type CollectionEntry } from 'astro:content';

const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
export const formatDate = (d: Date) => `${String(d.getUTCDate()).padStart(2, '0')} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;

export type Article = CollectionEntry<'artigos'> & {
  n: number;
  minutes: number;
  href: string;
  dateLabel: string;
};

/** Do mais novo para o mais antigo; `n` segue a ordem em que foram escritos. */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('artigos');
  return [...all]
    .sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf())
    .map((e, i) => ({
      ...e,
      n: i + 1,
      minutes: Math.max(1, Math.round((e.body ?? '').split(/\s+/).length / 200)),
      href: `/artigos/${e.id}/`,
      dateLabel: formatDate(e.data.date),
    }))
    .reverse();
}
