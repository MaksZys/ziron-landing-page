import tailwindcss from '@tailwindcss/vite';
import { localeTransformers } from '@lit/localize-tools/lib/rollup.js';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'vite';

const SUPPORTED_LOCALES = new Set(['en', 'pl', 'de']);

export default defineConfig(({ mode }) => {
  const locale = SUPPORTED_LOCALES.has(mode) ? mode : 'en';
  const localeTransformer = localeTransformers().find(
    (transformer) => transformer.locale === locale,
  );

  if (!localeTransformer) {
    throw new Error(`No Lit localization transformer is configured for ${locale}.`);
  }

  return {
    base: './',
    plugins: [
      tailwindcss(),
      typescript({
        transformers: { before: [localeTransformer.localeTransformer] },
      }),
    ],
    build: {
      outDir: locale === 'en' ? 'dist' : `dist/${locale}`,
    },
  };
});
