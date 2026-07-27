import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import axe from 'axe-core';
import {JSDOM} from 'jsdom';

async function runAxe(relativeHtmlPath, url) {
  const indexPath = fileURLToPath(
    new URL(`../${relativeHtmlPath}`, import.meta.url)
  );
  const html = readFileSync(indexPath, 'utf8');
  const dom = new JSDOM(html, {
    url,
    runScripts: 'dangerously',
    pretendToBeVisual: true,
  });

  dom.window.eval(axe.source);
  const results = await dom.window.axe.run(dom.window.document, {
    resultTypes: ['violations'],
  });

  if (results.violations.length > 0) {
    console.error(
      relativeHtmlPath,
      JSON.stringify(results.violations, null, 2)
    );
    process.exit(1);
  }

  console.log(`axe: no violations (${relativeHtmlPath})`);
}

await runAxe('dist/index.html', 'https://josephchow.dev/');
await runAxe('dist/zh-hans/index.html', 'https://josephchow.dev/zh-hans/');
