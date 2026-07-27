# josephchow.dev

Personal calling card for [Joseph Chow](https://josephchow.dev): a static one-page site built with Astro.

**Live:** [https://josephchow.dev](https://josephchow.dev)  
**Repo:** [`chowjiaming/josephchow.dev`](https://github.com/chowjiaming/josephchow.dev) (npm package name `josephchow-dev`)

## Requirements

- Node.js **24+** (LTS)
- [pnpm](https://pnpm.io) **11+** (version pinned via `packageManager` in `package.json`)

## Quick start

```bash
git clone https://github.com/chowjiaming/josephchow.dev.git
cd josephchow.dev
pnpm install
pnpm dev
```

Open the URL printed by Astro (usually `http://localhost:4321`).

## Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Local development server |
| `pnpm compile:i18n` | Compile Paraglide messages into `src/paraglide` |
| `pnpm generate:og` | Build per-locale Open Graph PNGs into `public/og/` |
| `pnpm build` | Compile i18n + OG images + typecheck + production build → `dist/` |
| `pnpm preview` | Preview the production build |
| `pnpm typecheck` | Compile i18n, then `astro check` |
| `pnpm lint` / `pnpm format` | Biome check / write |
| `pnpm test:build` | Build + smoke tests (pages, OG, locale negotiation) |
| `pnpm test:a11y` | axe-core against English and Simplified Chinese builds |
| `pnpm test:lhci` | Lighthouse CI budgets against `dist/` (build first) |

## Locales

| Path | Language |
| --- | --- |
| `/` | English (default) |
| `/zh-hans/` | Mandarin, Simplified |
| `/zh-hant/` | Mandarin, Traditional |
| `/yue/` | Cantonese |
| `/vi/` | Vietnamese |
| `/fr/` | French |

Copy lives in `messages/{locale}.json` and is compiled by [Paraglide JS](https://paraglidejs.com/). After editing JSON, run `pnpm compile:i18n` (or `pnpm build`).

### Accept-Language redirect

A Netlify Edge Function on `GET /` may `302` first-time visitors to a matching locale:

- Skips known crawler/bot user agents (English `/` stays the SEO default).
- Honors a `locale` cookie set by the on-page language switcher.
- Otherwise negotiates `Accept-Language` (`zh-CN` → `zh-hans`, `zh-TW` → `zh-hant`, `zh-HK`/`yue` → `yue`, etc.).

## Theme

- Defaults to **system** (`prefers-color-scheme`).
- Light / Dark / System control persists to `localStorage` key `theme`.
- A tiny inline script sets `data-theme` before paint to avoid a flash.

## Stack

- [Astro](https://astro.build) 7 (static output) with built-in i18n routing
- [Paraglide JS](https://paraglidejs.com/) for typed messages
- TypeScript (pinned to 5.9.x: `astro check` does not yet support TypeScript 7)
- [Biome](https://biomejs.dev) for lint and format
- Self-hosted [Fira Code](https://fontsource.org/fonts/fira-code) with system CJK fallbacks
- Deployed on [Netlify](https://www.netlify.com) (Edge Function for locale redirect)

## Layout

```
messages/                 # Paraglide message JSON per locale
project.inlang/           # Paraglide project settings
src/
  i18n/                   # locale metadata + message helpers
  paraglide/              # generated message modules (compile output)
  pages/                  # locale routes + 404
  layouts/                # document shell, hreflang, JSON-LD
  components/             # CallingCard, switchers, ExternalLink
  styles/                 # global (incl. dark tokens), page, chrome
netlify/edge-functions/   # Accept-Language redirect
public/og/                # per-locale Open Graph PNGs
tests/                    # build + negotiation tests
scripts/                  # axe runner, OG generator
```

## Deploy

Netlify builds with `pnpm build` and publishes `dist/` (see `netlify.toml`). Security headers and CSP are set there. Edge functions live under `netlify/edge-functions/`.

Astro telemetry is disabled in Netlify and CI via `ASTRO_TELEMETRY_DISABLED=1`. Locally you can export the same variable.

## Quality gates

- **CI:** lint, typecheck, smoke tests, axe, and Lighthouse on every PR
- **Pre-commit:** Biome on staged files (lint-staged), then `astro check`
- **Commit messages:** [Conventional Commits](https://www.conventionalcommits.org/) via commitlint
- **`pnpm-workspace.yaml`:** only configures `allowBuilds` for packages that need install scripts (e.g. `esbuild`, `sharp`)

## Source & contributions

This repo is public for transparency and portfolio. It is not an actively maintained open-source project — unsolicited large PRs are unlikely to merge.

Small fixes (typos, broken links, accessibility) are welcome: open an issue first, then a PR if it makes sense. Before opening a PR, run `pnpm lint`, `pnpm typecheck`, and `pnpm test:build`. Commits use [Conventional Commits](https://www.conventionalcommits.org/). Changes go live via Netlify when merged to `main`.

Be respectful. For concerns, email [contact@josephchow.dev](mailto:contact@josephchow.dev).

Security reports: [SECURITY.md](./SECURITY.md).

## License

[MIT](./LICENSE) © Joseph Chow
