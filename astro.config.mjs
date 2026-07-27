import sitemap from '@astrojs/sitemap';
import {paraglideVitePlugin} from '@inlang/paraglide-js';
import {defineConfig} from 'astro/config';

export default defineConfig({
  site: 'https://josephchow.dev',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: [
      'en',
      {path: 'zh-hans', codes: ['zh-Hans', 'zh-CN']},
      {path: 'zh-hant', codes: ['zh-Hant', 'zh-TW']},
      {path: 'yue', codes: ['yue', 'zh-HK']},
      'vi',
      'fr',
    ],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          'zh-hans': 'zh-Hans',
          'zh-hant': 'zh-Hant',
          yue: 'yue',
          vi: 'vi',
          fr: 'fr',
        },
      },
    }),
  ],
  vite: {
    plugins: [
      paraglideVitePlugin({
        project: './project.inlang',
        outdir: './src/paraglide',
        emitTsDeclarations: true,
        strategy: ['baseLocale'],
      }),
    ],
  },
});
