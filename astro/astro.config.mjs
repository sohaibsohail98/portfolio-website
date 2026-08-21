import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://sohaibsohail.pages.dev',
  output: 'static',
  integrations: [tailwind()],
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
