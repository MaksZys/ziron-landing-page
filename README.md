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

## Local translations

The committed [translations/translations.csv](translations/translations.csv) is the source of truth for all UI copy. It uses Babelsheet-style hierarchy columns, requires no Google credentials, and generates Lit-compatible XLIFF locally.

### Everyday workflow

1. Edit English, Polish, and German text in `translations/translations.csv`.
2. Run the single build command:

```sh
npm run build
```

`npm run build` extracts Lit messages, validates the CSV, regenerates XLIFF and runtime locale modules, type-checks the project, and builds one application in `dist/`.

To validate and regenerate XLIFF without building the site, use:

```sh
npm run locales:sync
```

Never edit files in `translations/xliff/` or `src/generated/locales/` by hand; they are generated from the CSV. Commit them with the CSV when translations change.

### Add a new message

1. Add `msg()` at the user-facing string, with a stable ID. Import it from `@lit/localize` when necessary.

   ```ts
   import { msg } from '@lit/localize';

   html`<button aria-label=${msg('Close', { id: 'menu.close' })}>…</button>`;
   ```

   IDs use dot-separated namespaces such as `menu.close` or `project.mediaUnavailable`. Do not use the English text as an ID: copy can change, while the ID must remain stable.

2. Add the same ID and all three translations to `translations/translations.csv`. Its header is:

   ```csv
   ###,>>>,>>>,en,pl,de
   ```

   The two `>>>` columns form the ID path; the remaining columns are English, Polish, and German. For example:

   ```csv
   ,menu,close,Close,Zamknij,Schließen
   ,,explore,Explore,Odkrywaj,Entdecken
   ```

   The blank first path cell in the second row keeps the preceding `menu` parent, producing `menu.explore`. Start a new parent by filling the first path cell:

   ```csv
   ,home,selectedWork,Selected ZIRON work,Wybrane realizacje ZIRON,Ausgewählte ZIRON-Arbeiten
   ```

   Quote any field containing a comma, and escape a literal double quote as two double quotes, following normal CSV rules.

3. Run `npm run build`. If it succeeds, the new message is included in the lazy Polish and German runtime locale modules.

### Change or remove a message

- To change wording, keep the existing ID and update its `en`, `pl`, and `de` cells.
- To remove a message, remove both its `msg()` call and its CSV row. The validator deliberately fails if either side remains.
- To add a locale, update `TARGET_LOCALES` in [scripts/generate-translations.mjs](scripts/generate-translations.mjs), `targetLocales` in [lit-localize.json](lit-localize.json), the CSV header and values, and the dynamic locale loader in `src/localization.ts`. The current project intentionally supports only `en`, `pl`, and `de`.

### Switch locale locally

Run the normal development server, then use the header selector or a shareable URL:

```sh
npm run dev
```

- English: `?lang=en` (or no `lang` parameter)
- Polish About page: `?view=about&lang=pl`
- German Project page: `?view=project&lang=de`

The app loads Polish and German translation modules only when selected. `npm run preview` serves the same single production build after `npm run build`.

### Validation errors

The generator fails rather than producing a partial translation:

- `missing the Lit message ID`: a `msg()` ID has no CSV row; add it.
- `has no matching Lit message ID`: a CSV row is no longer used in code; remove it or restore the message.
- `duplicate message ID`: two hierarchy rows resolve to the same ID; make the path unique.
- `missing <locale> text`: every message must have English, Polish, and German text.

Run the generator's focused test suite with `npm run test:translations`.

## Unsplash credentials

Copy `.env.example` to `.env` and populate these keys locally:

- `UNSPLASH_APP_ID`
- `UNSPLASH_ACCESS_KEY`
- `UNSPLASH_SECRET_KEY`

Never expose or commit their values. Unsplash API calls are limited to trusted content preparation. The deployed site uses persisted direct image CDN URLs and does not call the API at runtime. See `Agent.md` for the complete asset policy.

## GitHub Pages

The Vite build uses relative asset paths so it can be hosted from a GitHub Pages project subdirectory. The deployment workflow builds and publishes `dist` when changes reach `main`.

In the GitHub repository settings, select **GitHub Actions** as the Pages source.
