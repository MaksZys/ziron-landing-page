import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { tmpdir } from 'node:os';

import { generateTranslations, translationsFromCsv } from './generate-translations.mjs';

const HEADER = '###,>>>,>>>,en,pl,de\n';

test('parses Babelsheet-style paths into stable message IDs', () => {
  assert.deepEqual(
    translationsFromCsv(`${HEADER},nav,home,Home,Strona główna,Startseite\n,,work,Work,Praca,Arbeiten\n`),
    [
      {
        id: 'nav.home',
        values: { en: 'Home', pl: 'Strona główna', de: 'Startseite' },
      },
      {
        id: 'nav.work',
        values: { en: 'Work', pl: 'Praca', de: 'Arbeiten' },
      },
    ],
  );
});

test('rejects malformed, duplicate, and incomplete translations', () => {
  assert.throws(() => translationsFromCsv('en,pl,de\nHome,Strona główna,Startseite\n'), /header row/);
  assert.throws(
    () => translationsFromCsv(`${HEADER},nav,home,Home,Strona główna,Startseite\n,nav,home,Home,Strona główna,Startseite\n`),
    /duplicate message ID/,
  );
  assert.throws(
    () => translationsFromCsv(`${HEADER},nav,home,Home,,Startseite\n`),
    /missing pl text/,
  );
});

test('rejects CSV keys that do not match extracted Lit messages', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'ziron-translations-'));
  const xliffDirectory = join(directory, 'xliff');

  try {
    await mkdir(xliffDirectory);
    await writeFile(join(directory, 'translations.csv'), `${HEADER},nav,home,Home,Strona główna,Startseite\n`);
    await writeFile(
      join(xliffDirectory, 'pl.xlf'),
      '<xliff><file><body><trans-unit id="nav.missing" /></body></file></xliff>',
    );

    await assert.rejects(
      generateTranslations({
        csvPath: join(directory, 'translations.csv'),
        xliffDirectory,
      }),
      /missing the Lit message ID: nav.missing/,
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
