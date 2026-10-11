# Repository Guidelines

## Project Structure & Module Organization

This repo uses pnpm workspaces. The workspace is `packages/hono-drizzle`, as configured in `pnpm-workspace.yaml`. Its source code lives in `src/`, with tests in `__tests__/` directories alongside the relevant modules (example: `packages/hono-drizzle/src/entryPoint/primary/shopping/web/__tests__/server.test.ts`). Shared tooling and configs sit at the root (for example `mise.toml`, `eslint.config.mjs`, `tsconfig.json`, `.prettierrc.mjs`).

## Build, Test, and Development Commands

Use mise to manage Node.js and pnpm. Their exact versions are defined only in the root `mise.toml`; do not add `.node-version` files or a `packageManager` field as another version source. GitHub Actions also installs these tools through mise.

Run package commands through mise monorepo tasks so they use the configured versions without requiring shell activation. The root `mise.toml` declares the monorepo and the `hono-drizzle` path alias; tasks are defined in `packages/hono-drizzle/mise.toml` and call the existing package scripts. On first setup, run `mise trust` and `mise install` at the repo root.

- `mise exec -- pnpm install --frozen-lockfile` installs workspace dependencies.
- `mise run //hono-drizzle:build` builds the package.
- `mise run //hono-drizzle:lint` and `mise run //hono-drizzle:format` check linting and formatting.
- `mise run //hono-drizzle:test` runs unit tests once; `mise run //hono-drizzle:test:watch` starts watch mode.
- `mise run //hono-drizzle:test:db` runs DB tests (requires `.env.test.db` and a running test database).

Absolute task names such as `//hono-drizzle:lint` work anywhere in the repository. Inside `packages/hono-drizzle`, `mise run :lint` targets the same package. Use `mise tasks --all` to list all tasks. The root `package.json` does not define build, lint, format, or test scripts; use the tasks above.

## Coding Style & Naming Conventions

This project is TypeScript-first with ESLint + Prettier. Follow the root `eslint.config.mjs` and `.prettierrc.mjs` rules; prefer type-only imports and consistent type imports, and keep array types in generic form (for example `Array<Foo>`). File and test naming follows `*.test.ts` under `__tests__/` or `test/`.

## Testing Guidelines

The `hono-drizzle` workspace uses Vitest. The test and coverage tasks include `--run` for non-interactive runs. Run coverage with `mise run //hono-drizzle:test:cov`.

## Commit & Pull Request Guidelines

Recent history uses short, conventional prefixes (for example `fix: ...`) and GitHub merge commits (`Merge pull request #...`). Keep commit subjects concise and action-oriented. For pull requests, include a short summary, the tests you ran (command and result), and link any related issues. Attach screenshots only when changes affect UI or docs rendering.

## Configuration Tips

Use mise for tool versions; keep environment-variable loading in the existing package commands via dotenv or Node.js `--env-file`. In `packages/hono-drizzle`, `.env.local` is for local runs and DB operations, `.env.test` is for unit tests, and `.env.test.db` is for DB tests and test DB operations. Do not load these files into mise's shared `[env]`, as development values could leak into tests and take precedence over test-file values. Keep secrets out of Git and document any required keys in your PR description. See `README.md` for setup and environment-variable usage.
