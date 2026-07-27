import type {Config, Context} from '@netlify/edge-functions';

const LOCALE_COOKIE = 'locale';
const localePaths = ['en', 'zh-hans', 'zh-hant', 'yue', 'vi', 'fr'] as const;
type LocalePath = (typeof localePaths)[number];

function isLocalePath(value: string): value is LocalePath {
  return (localePaths as readonly string[]).includes(value);
}

function isLikelyBot(userAgent: string | null): boolean {
  if (!userAgent) {
    return false;
  }
  return /bot|crawl|spider|slurp|facebookexternalhit|preview|bingpreview|linkedinbot|embedly|quora|pinterest|redditbot|whatsapp|telegram/i.test(
    userAgent
  );
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

function negotiateLocale(
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

export default async (request: Request, _context: Context) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return;
  }

  const url = new URL(request.url);
  if (url.pathname !== '/') {
    return;
  }

  if (isLikelyBot(request.headers.get('user-agent'))) {
    return;
  }

  const cookieHeader = request.headers.get('cookie') ?? '';
  const cookieMatch = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${LOCALE_COOKIE}=`));
  const rawCookie = cookieMatch
    ? decodeURIComponent(cookieMatch.slice(LOCALE_COOKIE.length + 1))
    : null;
  const cookieLocale = rawCookie && isLocalePath(rawCookie) ? rawCookie : null;

  const target = negotiateLocale(
    request.headers.get('accept-language'),
    cookieLocale
  );

  if (!target) {
    return;
  }

  const headers = new Headers({
    Location: new URL(`/${target}/`, url.origin).toString(),
    'Cache-Control': 'no-store',
  });

  if (!cookieLocale) {
    headers.append(
      'Set-Cookie',
      `${LOCALE_COOKIE}=${encodeURIComponent(target)}; Path=/; Max-Age=31536000; SameSite=Lax`
    );
  }

  return new Response(null, {status: 302, headers});
};

export const config: Config = {
  path: '/',
  method: 'GET',
  onError: 'bypass',
};
