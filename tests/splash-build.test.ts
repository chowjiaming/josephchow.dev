import {existsSync, readFileSync} from 'node:fs';
import {describe, expect, it} from 'vitest';

describe('built splash page', () => {
  it('emits dist/index.html', () => {
    expect(existsSync('dist/index.html')).toBe(true);
  });

  it('includes the agreed calling-card copy and contact targets', () => {
    const html = readFileSync('dist/index.html', 'utf8');
    expect(html).toContain('Hello.');
    expect(html).toContain('My name is Joseph Chow.');
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
});
