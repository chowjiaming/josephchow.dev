# Contributing

Thanks for your interest in improving [josephchow.dev](https://josephchow.dev). This is a personal site; small fixes and suggestions are welcome.

## Setup

```bash
git clone https://github.com/chowjiaming/josephchow.dev.git
cd josephchow.dev
pnpm install
pnpm dev
```

Node.js 24+ and pnpm 11+ are required (`packageManager` is pinned in `package.json`).

## Scripts

| Command | Purpose |
| --- | --- |
| `pnpm lint` / `pnpm format` | Biome check / write |
| `pnpm typecheck` | Compile i18n, then `astro check` |
| `pnpm compile:i18n` | Compile Paraglide messages |
| `pnpm test:build` | Production build + smoke tests |
| `pnpm test:a11y` | axe against `dist/` (build first) |
| `pnpm preview` | Preview the production build |

Edit copy in `messages/{locale}.json`, then run `pnpm compile:i18n` (or `pnpm build`).

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/) (enforced by commitlint), for example:

- `feat: …`
- `fix: …`
- `chore: …`
- `docs: …`

## Pull requests

1. Branch from `main` (or the active feature branch for ongoing work).
2. Ensure `pnpm lint`, `pnpm typecheck`, and `pnpm test:build` pass.
3. Fill out the PR template.

There is **no release cadence** or versioned changelog for this site; changes go live via Netlify when merged to the default branch.

## Code of conduct

See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).
