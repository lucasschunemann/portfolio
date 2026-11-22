import { defineConfig } from 'astro/config';

export default defineConfig({
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'auto' },
  // pt-BR na raiz, inglês em /en/ (rotas em inglês: /en/work/, /en/writing/). Textos e rotas: src/i18n.ts
  i18n: {
    locales: ['pt-BR', 'en'],
    defaultLocale: 'pt-BR',
    routing: { prefixDefaultLocale: false },
  },
});
