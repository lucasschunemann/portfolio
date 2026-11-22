import { getCollection, type CollectionEntry } from 'astro:content';
import { href, ui, type Lang } from '../i18n';

export const formatDate = (d: Date, lang: Lang = 'pt') =>
  `${String(d.getUTCDate()).padStart(2, '0')} ${ui[lang].months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;

export type Article = (CollectionEntry<'artigos'> | CollectionEntry<'articles'>) & {
  n: number;
  minutes: number;
  href: string;
  dateLabel: string;
};

/** Do mais novo para o mais antigo; `n` segue a ordem em que foram escritos. Em inglês, mesmo id do original. */
export async function getArticles(lang: Lang = 'pt'): Promise<Article[]> {
  const all = await getCollection(lang === 'en' ? 'articles' : 'artigos');
  return [...all]
    .sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf())
    .map((e, i) => ({
      ...e,
      n: i + 1,
      minutes: Math.max(1, Math.round((e.body ?? '').split(/\s+/).length / 200)),
      href: href(lang, `/artigos/${e.id}/`),
      dateLabel: formatDate(e.data.date, lang),
    }))
    .reverse();
}
