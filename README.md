# ZIRON Landing Page

Mobile-first portfolio demo built with Lit, TypeScript, Tailwind CSS, DaisyUI, and Vite 8.

## Requirements

- Node.js 20.19 or newer
- npm

## Start development

```sh
npm install
npm run dev
```

## Available checks

```sh
npm run typecheck
npm run lint
npm run build
```

Use `npm run preview` to inspect the production build locally after running `npm run build`.

## Unsplash credentials

Copy `.env.example` to `.env` and populate these keys locally:

- `UNSPLASH_APP_ID`
- `UNSPLASH_ACCESS_KEY`
- `UNSPLASH_SECRET_KEY`

Never expose or commit their values. Unsplash API calls are limited to trusted content preparation. The deployed site uses persisted direct image CDN URLs and does not call the API at runtime. See `Agent.md` for the complete asset policy.

## GitHub Pages

The Vite build uses relative asset paths so it can be hosted from a GitHub Pages project subdirectory. The deployment workflow builds and publishes `dist` when changes reach `main`.

In the GitHub repository settings, select **GitHub Actions** as the Pages source.
