# AGENTS.md

This file guides agentic coding tools working in this repo. It reflects the current
Next.js + React + Tailwind setup and the conventions visible in the codebase.

## Repo quick facts
- Framework: Next.js 15 (App Router) + React 19
- Language: JavaScript (no TypeScript in this repo)
- Styling: Tailwind CSS 4 + custom CSS in `src/app/globals.css`
- Linting: ESLint via `next/core-web-vitals`
- 3D/Unity: React Three Fiber + Unity WebGL assets in `public/unity/`

## Setup
- Node: 18+ (per README)
- Install deps: `npm install`

## Commands (build/lint/test)
- Dev server: `npm run dev`
- Production build: `npm run build`
- Start prod server: `npm run start`
- Lint: `npm run lint`

Tests
- There is no test runner configured in `package.json`.
- If you add tests, add scripts for `test` and `test:watch` and document them here.
- Single test: not currently available (no test framework present).

## Project structure
- App Router entry: `src/app/layout.js`, `src/app/page.js`
- Components: `src/components/*`
- Global styles: `src/app/globals.css`
- Public assets: `public/` (3D models, Unity builds, images)

## Code style and conventions
### Imports
- Use ES module imports (no CommonJS).
- Keep imports grouped and sorted:
  1) React/Next imports
  2) Third-party libs
  3) Local components and styles
- Prefer `@/` alias for app-local imports when adding new files (see `jsconfig.json`).
- Keep import style consistent with file (double quotes are common in app files).

### Formatting
- Follow existing formatting style: 2-space indentation, trailing commas, semicolons.
- Use double quotes in JS/JSX where the file already does.
- Keep JSX props on multiple lines when long or complex.
- Prefer `const` for values that do not change, `let` otherwise.

### Components and hooks
- App Router pages/layouts are default server components unless marked with
  `"use client"` (e.g., `src/app/page.js`).
- Add `"use client"` only when required (state, effects, browser APIs).
- Keep React hooks at top level, before returns.
- Use `useEffect` for browser-only logic (window, document), and guard with
  `typeof window !== "undefined"` when needed.

### State and behavior
- Keep state co-located in the component that owns the UI.
- For animation/timers, always clean up listeners and intervals in `useEffect`.
- Avoid heavy computations in render; prefer memoization or refs if needed.

### Naming
- Components: PascalCase (e.g., `ThreeModel`, `UnityEmbed`).
- Files: PascalCase for components, lowercase for app entry files.
- Variables/functions: camelCase; booleans start with `is/has/should`.
- Constants: SCREAMING_SNAKE_CASE for static maps/config (see `SPEECH_TEXT`).

### Types
- This repo is JavaScript only; do not introduce TypeScript unless requested.
- If adding complex objects, document shapes with clear naming and defaults.

### Error handling
- Use early returns for invalid states (e.g., `if (!gameStarted) return`).
- Log errors for runtime failures that are hard to surface in UI.
- For user-facing errors, show inline messaging (see `UnityEmbed`).

### Styling
- Prefer Tailwind utility classes for layout and spacing.
- Global or complex effects live in `src/app/globals.css`.
- Keep animation keyframes and complex UI effects in CSS, not inline JS.
- Respect the cyberpunk theme and existing color variables in `:root`.

### Assets and public files
- Place 3D models in `public/models/`.
- Unity WebGL builds live in `public/unity/`.
- If using Brotli/Gzip Unity builds, keep headers in `next.config.mjs` in sync.

## Linting details
- ESLint config is in `eslint.config.mjs` and extends `next/core-web-vitals`.
- Run `npm run lint` before shipping changes.

## Notes for agentic changes
- Avoid large refactors; keep changes scoped to the task.
- Do not add new tooling without user request.
- Keep CSS/JS changes consistent with existing patterns (cyberpunk theme).

## Cursor/Copilot rules
- No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` files
  were found in this repository at time of writing.
