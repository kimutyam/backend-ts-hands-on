# Repository Guidelines

## Project Structure & Module Organization
This repo is a Yarn workspaces monorepo. Package code lives under `packages/` with focused modules such as `packages/book`, `packages/fp`, `packages/fp-zod`, `packages/pure`, `packages/nest-sample`, and `packages/hono-drizzle`. Each package keeps source code in `src/` and tests in `test/` or `__tests__/` directories (example: `packages/book/src/6/ex401/__tests__/employeeSchema.test.ts`). Shared tooling and configs sit at the root (for example `eslint.config.mjs`, `tsconfig.json`, `.prettierrc.mjs`).

## Build, Test, and Development Commands
Use pnpm at the repo root.
- `pnpm install` installs dependencies for all workspaces.
- `pnpm build` runs builds for buildable packages; run a single package with `pnpm --filter <pkg> build`.
- `pnpm lint` and `pnpm format` run linting and formatting across packages.
- `pnpm test` runs workspace tests; run a specific package with `pnpm --filter <pkg> test`.
- `packages/hono-drizzle` includes DB scripts such as `pnpm --filter hono-drizzle test:db` (requires `.env.test.db`).

## Coding Style & Naming Conventions
This project is TypeScript-first with ESLint + Prettier. Follow the root `eslint.config.mjs` and `.prettierrc.mjs` rules; prefer type-only imports and consistent type imports, and keep array types in generic form (for example `Array<Foo>`). File and test naming follows `*.test.ts` under `__tests__/` or `test/`.

## Testing Guidelines
Jest is used in `fp`, `fp-zod`, `pure`, and `nest-sample`; Vitest is used in `book` and `hono-drizzle`. Run coverage where available using `pnpm --filter <pkg> test:cov`. For `nest-sample`, end-to-end tests live under `packages/nest-sample/test` and run with `pnpm --filter nest-sample test:e2e`.

## Commit & Pull Request Guidelines
Recent history uses short, conventional prefixes (for example `fix: ...`) and GitHub merge commits (`Merge pull request #...`). Keep commit subjects concise and action-oriented. For pull requests, include a short summary, the tests you ran (command and result), and link any related issues. Attach screenshots only when changes affect UI or docs rendering.

## Configuration Tips
Some packages rely on environment files. For example, `packages/hono-drizzle` uses `.env.local` for local runs and `.env.test.db` for database tests; keep secrets out of Git and document any required keys in your PR description.
