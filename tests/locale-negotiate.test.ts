import {describe, expect, it} from 'vitest';
import {isLikelyBot, negotiateLocale} from '../src/i18n/locales';

describe('negotiateLocale', () => {
  it('honors a non-English locale cookie', () => {
    expect(negotiateLocale('en-US', 'fr')).toBe('fr');
  });

  it('returns null for an English cookie so / stays unprefixed', () => {
    expect(negotiateLocale('fr-FR', 'en')).toBeNull();
  });

  it('maps Accept-Language to the best supported locale', () => {
    expect(negotiateLocale('fr-CA,fr;q=0.9,en;q=0.8', null)).toBe('fr');
    expect(negotiateLocale('zh-TW,zh;q=0.8', null)).toBe('zh-hant');
    expect(negotiateLocale('zh-CN,zh;q=0.8', null)).toBe('zh-hans');
    expect(negotiateLocale('zh-HK,yue;q=0.8', null)).toBe('yue');
    expect(negotiateLocale('vi-VN,vi;q=0.9', null)).toBe('vi');
  });

  it('returns null when English wins negotiation', () => {
    expect(negotiateLocale('en-US,en;q=0.9', null)).toBeNull();
  });
});

describe('isLikelyBot', () => {
  it('detects common crawlers', () => {
    expect(isLikelyBot('Mozilla/5.0 (compatible; Googlebot/2.1)')).toBe(true);
    expect(isLikelyBot('Mozilla/5.0 (Macintosh) Chrome/120.0.0.0')).toBe(false);
  });
});
