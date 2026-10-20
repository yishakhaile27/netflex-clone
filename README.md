# Netflix UI Clone

A responsive React movie-streaming interface inspired by Netflix. Browse featured
movies and TV shows, search titles, view title details and trailers, create an
account, and keep a personal list.

## Features

- Responsive movie home page with featured titles and category rows
- Search movies and TV shows by title
- Title details, cast, crew, media, and trailers
- Firebase email/password authentication and profile settings
- Save and remove movies and TV shows from My List
- Responsive layouts for desktop, tablet, and mobile

## Requirements

- Node.js and npm
- A Firebase project with Authentication (Email/Password) and Cloud Firestore enabled
- A TMDB API key for movie and TV data
- An OMDb API key is optional and enables IMDb ratings

## Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the values from your Firebase,
   TMDB, and (optionally) OMDb accounts.

   Windows PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

   macOS/Linux:

   ```sh
   cp .env.example .env
   ```

   Required settings:

   - `REACT_APP_FIREBASE_API_KEY`
   - `REACT_APP_FIREBASE_AUTH_DOMAIN`
   - `REACT_APP_FIREBASE_PROJECT_ID`
   - `REACT_APP_FIREBASE_STORAGE_BUCKET`
   - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
   - `REACT_APP_FIREBASE_APP_ID`
   - `REACT_APP_TMDB_API_KEY`

   Optional settings:

   - `REACT_APP_FIREBASE_MEASUREMENT_ID`
   - `REACT_APP_OMDB_API_KEY`

3. Start the development server:

   ```sh
   npm start
   ```

   The app opens at [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the development server |
| `npm test -- --watchAll=false` | Run the Jest test suite once |
| `npm run build` | Create an optimized production build |

The test suite currently covers the TMDB API client configuration.

## API key and Firebase notes

Create your own API keys and Firebase project; do not commit your `.env` file.
Firebase configuration and `REACT_APP_*` values are included in the browser
bundle by Create React App. They are not server-side secrets. Restrict API keys
to the necessary APIs and allowed domains, configure Firebase Authentication
authorized domains and Firestore security rules, and use a backend proxy for
any key that must remain confidential.

## Project structure

- `src/Pages/` — route-level pages
- `src/components/` — shared navigation, movie rows, banners, and UI components
- `src/Api/` — API requests and Axios client
- `src/Context/` — authentication and signup context
- `src/Router/` — application routes and protected routes
- `src/Services/` — Firebase initialization
