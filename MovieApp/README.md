# MovieApp

A modern, single-page application for browsing and managing movies, powered by [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api).

## Features

- **Popular Movies**: Explore a curated list of trending films on the home page.
- **Search**: Quickly find movies using the integrated search bar.
- **Movie Details**: View comprehensive information for each movie, including descriptions, ratings, and cast.
- **Recommendations**: Discover similar and recommended films tailored to your interests.
- **Favorites Management**: Save movies to your personal favorites list. Data is persisted locally via `localStorage`.
- **Responsive Design**: Fully optimized for various screen sizes using Tailwind CSS.

## Tech Stack

- **Framework**: [React 19](https://react.dev/) (Functional components, Hooks)
- **Routing**: [TanStack Router](https://tanstack.com/router) (File-based routing)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Testing**: [Playwright](https://playwright.dev/) (E2E)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [pnpm](https://pnpm.io/) (Preferred package manager)

### Installation

1. Clone the repository and navigate to the `MovieApp` directory:
   ```bash
   cd MovieApp
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `MovieApp` root and add your TMDB Bearer Token:
   ```env
   VITE_TMDB_BEARER_TOKEN=your_token_here
   ```

### Available Scripts

- **`pnpm run dev`**: Starts the Vite development server (usually at `http://localhost:5173`).
- **`pnpm run build`**: Compiles the application for production.
- **`pnpm run preview`**: Locally previews the production build.
- **`pnpm run type-check`**: Runs the TypeScript compiler check.
- **`pnpm run lint`**: Runs ESLint to identify code quality issues.
- **`pnpm run test:e2e`**: Executes Playwright end-to-end tests.

## License

This project is licensed under the MIT License.
