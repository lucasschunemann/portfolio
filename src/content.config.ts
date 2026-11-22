import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const schema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  theme: z.string(),
  excerpt: z.string(),
  /** aparece na home */
  featured: z.boolean().default(false),
});

const artigos = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/artigos' }),
  schema,
});

/** Os mesmos textos em inglês: mesmo nome de arquivo, data e `featured` do original. */
const articles = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/artigos-en' }),
  schema,
});

export const collections = { artigos, articles };
