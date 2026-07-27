import {existsSync, readdirSync, readFileSync} from 'node:fs';
import {describe, expect, it} from 'vitest';

describe('built splash page', () => {
  it('emits dist/index.html', () => {
    expect(existsSync('dist/index.html')).toBe(true);
  });

  it('includes the agreed calling-card copy and contact targets', () => {
    const html = readFileSync('dist/index.html', 'utf8');
    expect(html).toContain('Hello.');
    expect(html).toContain('My name is Joseph Chow.');
    expect(html).toContain('<h1');
    expect(html).toContain('Full-stack engineer');
    expect(html).toContain('MCP');
    expect(html).toContain('Mandarin');
    expect(html).toContain('Cantonese');
    expect(html).toContain('Vietnamese');
    expect(html).toContain('French');
    expect(html).toContain('https://github.com/chowjiaming');
    expect(html).toContain('https://www.linkedin.com/in/chowjiaming/');
    expect(html).toContain('mailto:contact@josephchow.dev');
    expect(html).not.toContain('twitter.com');
    expect(html).not.toContain('Iteration Matrix');
    expect(html).not.toContain('flagcdn.com');
    expect(html).not.toContain("Don't be a stranger");
  });

  it('includes SEO, a11y, and privacy hardening signals', () => {
    const html = readFileSync('dist/index.html', 'utf8');
    expect(html).toContain('rel="canonical"');
    expect(html).toContain('https://josephchow.dev/');
    expect(html).toContain('/og.png');
    expect(html).toContain('og:image:alt');
    expect(html).toContain('theme-color');
    expect(html).toContain('application/ld+json');
    expect(html).toContain('"@type":"Person"');
    expect(html).toContain('favicon.svg');
    expect(html).toContain('(opens in a new tab)');
    expect(html).not.toContain('fonts.googleapis.com');
    expect(html).not.toContain('name="generator"');
    expect(html).not.toContain('shortcut icon');

    const mailtoBlock = html.slice(
      html.indexOf('mailto:contact@josephchow.dev')
    );
    const mailtoSnippet = mailtoBlock.slice(0, 400);
    expect(mailtoSnippet).not.toContain('(opens in a new tab)');
  });

  it('emits robots.txt and a sitemap artifact', () => {
    expect(existsSync('dist/robots.txt')).toBe(true);
    const robots = readFileSync('dist/robots.txt', 'utf8');
    expect(robots).toContain('Sitemap:');

    const distFiles = readdirSync('dist');
    const hasSitemap = distFiles.some(
      (name) => name.startsWith('sitemap') && name.endsWith('.xml')
    );
    expect(hasSitemap).toBe(true);
  });

  it('ships a 1200x630 OG image and SVG favicon', () => {
    expect(existsSync('dist/og.png')).toBe(true);
    expect(existsSync('dist/favicon.svg')).toBe(true);
  });
});
