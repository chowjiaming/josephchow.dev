import {copyFile, mkdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Resvg} from '@resvg/resvg-js';
import satori from 'satori';

const root = fileURLToPath(new URL('..', import.meta.url));
const outDir = path.join(root, 'public', 'og');

const locales = [
  {path: 'en', badge: 'en'},
  {path: 'zh-hans', badge: 'zh-Hans'},
  {path: 'zh-hant', badge: 'zh-Hant'},
  {path: 'yue', badge: 'yue'},
  {path: 'vi', badge: 'vi'},
  {path: 'fr', badge: 'fr'},
];

async function loadMessages(localePath) {
  const file = path.join(root, 'messages', `${localePath}.json`);
  return JSON.parse(await readFile(file, 'utf8'));
}

const fontData = await readFile(
  path.join(
    root,
    'node_modules/@fontsource/fira-code/files/fira-code-latin-500-normal.woff'
  )
);

const enMessages = await loadMessages('en');
await mkdir(outDir, {recursive: true});

for (const locale of locales) {
  const messages = await loadMessages(locale.path);
  // Bitmap OG uses Latin-capable type; CJK locales fall back to the English tagline.
  const tagline = /[\u3400-\u9fff]/.test(messages.og_tagline)
    ? enMessages.og_tagline
    : messages.og_tagline;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px',
          backgroundColor: '#fafafa',
          color: '#141414',
          fontFamily: 'Fira Code',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {fontSize: 64, fontWeight: 500, marginBottom: 24},
              children: 'Joseph Chow',
            },
          },
          {
            type: 'div',
            props: {
              style: {fontSize: 30, lineHeight: 1.4, maxWidth: 980},
              children: tagline,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                marginTop: 48,
                display: 'flex',
                gap: 24,
                fontSize: 24,
                color: '#2ec4b6',
              },
              children: [
                {type: 'span', props: {children: 'josephchow.dev'}},
                {type: 'span', props: {children: locale.badge}},
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {name: 'Fira Code', data: fontData, weight: 500, style: 'normal'},
      ],
    }
  );

  const resvg = new Resvg(svg, {fitTo: {mode: 'width', value: 1200}});
  await writeFile(
    path.join(outDir, `${locale.path}.png`),
    resvg.render().asPng()
  );
  console.log(`og: wrote public/og/${locale.path}.png`);
}

await copyFile(
  path.join(outDir, 'en.png'),
  path.join(root, 'public', 'og.png')
);
console.log('og: wrote public/og.png (en fallback)');
