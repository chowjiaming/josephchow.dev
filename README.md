# josephchow.dev

Personal calling card for [Joseph Chow](https://josephchow.dev) — a static one-page site built with Astro.

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
| `pnpm build` | Typecheck + production build → `dist/` |
| `pnpm preview` | Preview the production build |
| `pnpm typecheck` | `astro check` |
| `pnpm lint` / `pnpm format` | Biome check / write |
| `pnpm test:build` | Build + smoke tests on `dist/index.html` |
| `pnpm test:a11y` | axe-core against `dist/` (run `pnpm build` first) |
| `pnpm test:lhci` | Lighthouse CI budgets against `dist/` (build first) |

## Stack

- [Astro](https://astro.build) 7 (static output)
- TypeScript (pinned to 5.9.x — `astro check` does not yet support TypeScript 7)
- [Biome](https://biomejs.dev) for lint and format
- Deployed on [Netlify](https://www.netlify.com)

## Layout

```
src/
  pages/          # index + 404
  layouts/        # document shell, meta, JSON-LD
  components/     # ExternalLink
  styles/         # global, page, link styles
public/           # favicon, OG image, robots.txt, icons
tests/            # build smoke tests
scripts/          # axe runner
```

## Deploy

Netlify builds with `pnpm build` and publishes `dist/` (see `netlify.toml`). Security headers and CSP are set there.

Astro telemetry is disabled in Netlify and CI via `ASTRO_TELEMETRY_DISABLED=1`. Locally you can export the same variable.

## Quality gates

- **CI:** lint, typecheck, smoke tests, axe, and Lighthouse on every PR
- **Pre-commit:** Biome on staged files (lint-staged), then `astro check`
- **Commit messages:** [Conventional Commits](https://www.conventionalcommits.org/) via commitlint
- **`pnpm-workspace.yaml`:** only configures `allowBuilds` for packages that need install scripts (e.g. `esbuild`, `sharp`)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). By participating, you agree to the [Code of Conduct](./CODE_OF_CONDUCT.md).

Security reports: [SECURITY.md](./SECURITY.md).

## License

[MIT](./LICENSE) © Joseph Chow
