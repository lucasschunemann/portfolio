import { defineConfig } from 'astro/config';

export default defineConfig({
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'auto' },
});
