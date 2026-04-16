# AGENTS

- Always define functions as function and NOT const
- Only create an abstract if it's actually needed
- Prefer clean function/variable names over inline comments
- Avoid helper functions when a simple inline expression would suffice
- Don't use emojis
- Use {packageName}@latest when installing deps always unless the user has specified a specific version.
- Before implementing anything, review the skills you have available and apply the valid skill to the execution
- Always verify findings against the current code before making changes
- If you notice being asked to do the same thing repeatedly, suggest adding it to this file

## Project

- pnpm workspaces monorepo
- `packages/beam` — the `@andabove/gum-beam` Vue 3 + Nuxt library
- `apps/demo` — Nuxt 3 demo app that registers the module and exercises all three sizes
- Run `pnpm install` at the root to install all workspaces
- Run `pnpm build` to build `packages/beam` (uses `@nuxt/module-builder`)
- Run `pnpm dev` to start both the beam watcher and the demo dev server in parallel
- Run `pnpm --filter demo dev` to start only the demo
- Run `pnpm --filter @andabove/gum-beam run prepare` to stub the build for local dev
- Run `pnpm fix` to lint with Oxlint
- Run `pnpm typecheck` to type-check all packages

## Typescript

- Always use explicit types for function parameters and return types.
- Don't cast to `any`
- Prefer `interface` over `type` for object shapes unless unions or intersections are needed.
