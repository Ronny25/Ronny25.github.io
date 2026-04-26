# MovieApp - Gemini Context

Legacy React/Redux portfolio project (circa 2017) using The Movie Database (TMDB) API.

## Tech Stack & Constraints
- **Frameworks:** React 15.4 (Class components), Redux 3.6 (Thunk), React Router 3 (Hash history).
- **Build:** Webpack 1 (Legacy `loaders` syntax), Babel 6 (`stage-0`), SCSS.
- **API:** TMDB API v3. **Key Location:** `app/redux/constants/ApiKey.js`.
- **Persistence:** Direct `localStorage` manipulation in both components and actions.

## Key Directories
- `app/components/containers/`: Redux-connected "Smart" components.
- `app/components/modules/`: Presentational "Dumb" components.
- `app/redux/`: Standard Action/Reducer/Store structure.
- `app/scss/`: Component-scoped styles.

## Critical Patterns for AI
- **Lifecycle:** Uses `componentWillMount` and `componentWillReceiveProps` (deprecated in modern React).
- **Routing:** Routes defined in `app/routes.js` using `<Route>`/`<IndexRoute>`.
- **Redux:** Uses `connect` and `bindActionCreators`.
- **Persistence:** Favourites logic is duplicated across `MoviePage.js`, `MovieCard.js`, and `FavouritesActions.js`.

## Dev Workflow
- `npm start`: Webpack dev server on `:9999` with HMR.
- `npm run build`: Production bundle to `app/build/`.
- **Linting:** Integrated into Webpack via `eslint-loader`.
