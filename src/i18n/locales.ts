export const LOCALE_COOKIE = 'locale';

export const localePaths = [
  'en',
  'zh-hans',
  'zh-hant',
  'yue',
  'vi',
  'fr',
] as const;

export type LocalePath = (typeof localePaths)[number];

export type LocaleDefinition = {
  path: LocalePath;
  htmlLang: string;
  ogLocale: string;
  hreflang: string;
  homeHref: string;
};

export const locales: readonly LocaleDefinition[] = [
  {
    path: 'en',
    htmlLang: 'en',
    ogLocale: 'en_US',
    hreflang: 'en',
    homeHref: '/',
  },
  {
    path: 'zh-hans',
    htmlLang: 'zh-Hans',
    ogLocale: 'zh_CN',
    hreflang: 'zh-Hans',
    homeHref: '/zh-hans/',
  },
  {
    path: 'zh-hant',
    htmlLang: 'zh-Hant',
    ogLocale: 'zh_TW',
    hreflang: 'zh-Hant',
    homeHref: '/zh-hant/',
  },
  {
    path: 'yue',
    htmlLang: 'yue',
    ogLocale: 'zh_HK',
    hreflang: 'yue',
    homeHref: '/yue/',
  },
  {
    path: 'vi',
    htmlLang: 'vi',
    ogLocale: 'vi_VN',
    hreflang: 'vi',
    homeHref: '/vi/',
  },
  {
    path: 'fr',
    htmlLang: 'fr',
    ogLocale: 'fr_FR',
    hreflang: 'fr',
    homeHref: '/fr/',
  },
] as const;

export const defaultLocalePath: LocalePath = 'en';

export function isLocalePath(value: string): value is LocalePath {
  return (localePaths as readonly string[]).includes(value);
}

export function getLocale(path: LocalePath): LocaleDefinition {
  const match = locales.find((locale) => locale.path === path);
  if (!match) {
    throw new Error(`Unknown locale path: ${path}`);
  }
  return match;
}

export function localeFromPathname(pathname: string): LocalePath {
  const segment = pathname.replace(/^\/+|\/+$/g, '').split('/')[0] ?? '';
  if (isLocalePath(segment) && segment !== 'en') {
    return segment;
  }
  return 'en';
}

/**
 * Negotiates Accept-Language against supported locales.
 * Returns the locale path to redirect to, or null when English should stay on /.
 */
export function negotiateLocale(
  acceptLanguage: string | null,
  cookieLocale: string | null
): LocalePath | null {
  if (cookieLocale && isLocalePath(cookieLocale)) {
    return cookieLocale === 'en' ? null : cookieLocale;
  }

  if (!acceptLanguage) {
    return null;
  }

  const candidates = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const qParam = params.find((param) => param.trim().startsWith('q='));
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
      return {tag: (tag ?? '').toLowerCase(), q: Number.isFinite(q) ? q : 0};
    })
    .filter((entry) => entry.tag.length > 0)
    .sort((a, b) => b.q - a.q);

  for (const {tag} of candidates) {
    const mapped = mapLanguageTag(tag);
    if (mapped) {
      return mapped === 'en' ? null : mapped;
    }
  }

  return null;
}

function mapLanguageTag(tag: string): LocalePath | null {
  if (tag === 'yue' || tag.startsWith('yue-') || tag === 'zh-hk') {
    return 'yue';
  }
  if (
    tag === 'zh-cn' ||
    tag === 'zh-sg' ||
    tag === 'zh-hans' ||
    tag.startsWith('zh-hans')
  ) {
    return 'zh-hans';
  }
  if (
    tag === 'zh-tw' ||
    tag === 'zh-mo' ||
    tag === 'zh-hant' ||
    tag.startsWith('zh-hant')
  ) {
    return 'zh-hant';
  }
  if (tag === 'zh' || tag.startsWith('zh-')) {
    return 'zh-hans';
  }
  if (tag === 'vi' || tag.startsWith('vi-')) {
    return 'vi';
  }
  if (tag === 'fr' || tag.startsWith('fr-')) {
    return 'fr';
  }
  if (tag === 'en' || tag.startsWith('en-')) {
    return 'en';
  }
  return null;
}

export function isLikelyBot(userAgent: string | null): boolean {
  if (!userAgent) {
    return false;
  }
  return /bot|crawl|spider|slurp|facebookexternalhit|preview|bingpreview|linkedinbot|embedly|quora|pinterest|redditbot|whatsapp|telegram/i.test(
    userAgent
  );
}
