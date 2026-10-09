import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const artigos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artigos' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    theme: z.string(),
    excerpt: z.string(),
    /** aparece na home */
    featured: z.boolean().default(false),
  }),
});

export const collections = { artigos };
