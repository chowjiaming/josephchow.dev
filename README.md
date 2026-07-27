# josephchow.dev

Personal one-page site for [Joseph Chow](https://josephchow.dev).

Source lives in the GitHub repo [`chowjiaming/one-page-splash`](https://github.com/chowjiaming/one-page-splash) (package name `josephchow-dev`).

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
- `pnpm test:a11y` — axe-core against `dist/index.html` (requires a prior build)
- `pnpm test:lhci` — Lighthouse CI budgets against `dist/` (requires a prior build)
- `pnpm lint` — Biome check (lint + format)
- `pnpm format` — Biome check with `--write`

## Deploy

Netlify: build `pnpm build`, publish `dist` (see `netlify.toml`). Security headers and CSP are configured there.

Astro telemetry is disabled in Netlify and CI via `ASTRO_TELEMETRY_DISABLED=1`. Locally you can export the same variable.

## Notes

- TypeScript is pinned to 5.9.x because `astro check` does not yet support TypeScript 7's compiler API.
- CI runs lint, typecheck, smoke tests, axe, and Lighthouse on every PR.
- Pre-commit runs Biome on staged files via lint-staged, then `astro check`. Commit messages are linted with commitlint (conventional commits).
- `pnpm-workspace.yaml` only configures `allowBuilds` for packages that need install scripts (for example `esbuild`, `sharp`).
- See [CONTRIBUTING.md](./CONTRIBUTING.md) for local setup and PR expectations.
