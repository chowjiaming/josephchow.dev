import * as m from '../paraglide/messages.js';
import type {LocalePath} from './locales';

type MsgOptions = {locale: LocalePath};

export function messagesFor(locale: LocalePath) {
  const options: MsgOptions = {locale};
  return {
    siteTitle: () => m.site_title({}, options),
    metaDescription: () => m.meta_description({}, options),
    ogImageAlt: () => m.og_image_alt({}, options),
    greeting: () => m.greeting({}, options),
    nameLine: () => m.name_line({}, options),
    workBody: () => m.work_body({}, options),
    recentBefore: () => m.recent_before({}, options),
    recentLinkLabel: () => m.recent_link_label({}, options),
    recentAfter: () => m.recent_after({}, options),
    craftBody: () => m.craft_body({}, options),
    languagesBody: () => m.languages_body({}, options),
    contactBefore: () => m.contact_before({}, options),
    contactGithub: () => m.contact_github({}, options),
    contactLinkedin: () => m.contact_linkedin({}, options),
    contactOrAt: () => m.contact_or_at({}, options),
    localeNavLabel: () => m.locale_nav_label({}, options),
    localeEn: () => m.locale_en({}, options),
    localeZhHans: () => m.locale_zh_hans({}, options),
    localeZhHant: () => m.locale_zh_hant({}, options),
    localeYue: () => m.locale_yue({}, options),
    localeVi: () => m.locale_vi({}, options),
    localeFr: () => m.locale_fr({}, options),
    themeNavLabel: () => m.theme_nav_label({}, options),
    themeLight: () => m.theme_light({}, options),
    themeDark: () => m.theme_dark({}, options),
    themeSystem: () => m.theme_system({}, options),
    notFoundTitle: () => m.not_found_title({}, options),
    notFoundBody: () => m.not_found_body({}, options),
    notFoundHome: () => m.not_found_home({}, options),
    notFoundMeta: () => m.not_found_meta({}, options),
    ogTagline: () => m.og_tagline({}, options),
  };
}

export type Messages = ReturnType<typeof messagesFor>;
