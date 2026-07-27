import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import axe from 'axe-core';
import {JSDOM} from 'jsdom';

const indexPath = fileURLToPath(new URL('../dist/index.html', import.meta.url));
const html = readFileSync(indexPath, 'utf8');
const dom = new JSDOM(html, {
  url: 'https://josephchow.dev/',
  runScripts: 'dangerously',
  pretendToBeVisual: true,
});

dom.window.eval(axe.source);
const results = await dom.window.axe.run(dom.window.document, {
  resultTypes: ['violations'],
});

if (results.violations.length > 0) {
  console.error(JSON.stringify(results.violations, null, 2));
  process.exit(1);
}

console.log('axe: no violations');
