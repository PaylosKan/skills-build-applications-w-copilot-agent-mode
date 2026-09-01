# OctoFit Tracker Frontend

This React 19 + Vite app serves the OctoFit Tracker presentation tier.

## Required environment variable

The frontend calls the backend using a Codespaces-aware URL. Define `VITE_CODESPACE_NAME` in a local environment file such as `.env.local` before running the app:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, the app uses:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When the variable is unset, the app falls back to `http://localhost:8000/api/[component]/` to avoid invalid `https://undefined-8000...` URLs.

## Local development

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```

The API routes are loaded from the backend service on port 8000 and support both array responses and paginated responses.
