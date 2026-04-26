# MovieApp - Gemini Context

Modern React/TanStack project.

## Tech Stack
- **Framework:** React 19 (Hooks, Functional components).
- **Routing:** TanStack Router (File-based).
- **Data Fetching:** TanStack Query & Router Loaders.
- **Build:** Vite.
- **Styles:** Tailwind CSS.
- **API:** TMDB API v3.
- **E2E:** Playwright.

## Key Directories
- `src/components/`: Presentational and functional components.
- `src/context/`: React Context (e.g., Favourites).
- `src/routes/`: TanStack Router routes.
- `src/utils/`: Shared utilities (e.g., TMDB fetching).
- `tests/e2e/`: Playwright E2E tests and fixtures.

## Dev Workflow
- `pnpm install`: Install dependencies.
- `pnpm run dev`: Start Vite dev server on `:5173`.
- `pnpm run build`: Build production bundle.
- `pnpm run test:e2e`: Run Playwright tests.

## Config
- `.env`: Requires `VITE_TMDB_BEARER_TOKEN`.
