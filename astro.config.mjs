import sitemap from '@astrojs/sitemap';
import {defineConfig} from 'astro/config';

export default defineConfig({
  site: 'https://josephchow.dev',
  output: 'static',
  integrations: [sitemap()],
});
