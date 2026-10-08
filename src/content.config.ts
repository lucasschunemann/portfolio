import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const artigos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artigos' }),
  schema: z.object({
    title: z.string(),
    /** título em duas partes: [sans em caixa-alta, serifa em itálico] */
    display: z.tuple([z.string(), z.string()]),
    date: z.coerce.date(),
    theme: z.string(),
    excerpt: z.string(),
    tone: z.enum(['blue', 'green', 'yellow', 'ink']),
    shape: z.enum(['rect', 'diamond', 'circle']),
  }),
});

export const collections = { artigos };
