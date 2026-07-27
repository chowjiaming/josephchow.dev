# josephchow.dev

Personal one-page site for [Joseph Chow](https://josephchow.dev).

## Stack

- [Astro](https://astro.build) (static)
- TypeScript
- pnpm

## Scripts

- `pnpm dev` — local dev server
- `pnpm build` — typecheck + production build to `dist/`
- `pnpm preview` — preview the production build
- `pnpm typecheck` — `astro check`
- `pnpm test:build` — build, then smoke-test `dist/index.html`

## Deploy

Netlify: build `pnpm build`, publish `dist` (see `netlify.toml`).
