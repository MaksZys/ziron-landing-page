import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SOURCE_LOCALE = 'en';
const TARGET_LOCALES = ['pl', 'de'];
const REQUIRED_LOCALES = [SOURCE_LOCALE, ...TARGET_LOCALES];

export function parseCsv(csv) {
  const rows = [[]];
  let value = '';
  let isQuoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];
    const nextCharacter = csv[index + 1];

    if (character === '"') {
      if (isQuoted && nextCharacter === '"') {
        value += '"';
        index += 1;
      } else {
        isQuoted = !isQuoted;
      }
      continue;
    }

    if (!isQuoted && character === ',') {
      rows.at(-1).push(value.trim());
      value = '';
      continue;
    }

    if (!isQuoted && (character === '\n' || character === '\r')) {
      if (character === '\r' && nextCharacter === '\n') {
        index += 1;
      }
      rows.at(-1).push(value.trim());
      rows.push([]);
      value = '';
      continue;
    }

    value += character;
  }

  if (isQuoted) {
    throw new Error('translations.csv contains an unterminated quoted value.');
  }

  rows.at(-1).push(value.trim());
  return rows.filter((row) => row.some((cell) => cell !== ''));
}

export function translationsFromCsv(csv) {
  const rows = parseCsv(csv);
  const headerIndex = rows.findIndex((row) => row[0] === '###');

  if (headerIndex === -1) {
    throw new Error('translations.csv must contain a header row beginning with ###.');
  }

  const header = rows[headerIndex];
  const pathLength = header.filter((cell) => cell === '>>>').length;
  const languages = header.slice(pathLength + 1);
  const languageIndexes = new Map(languages.map((language, index) => [language, index]));

  for (const locale of REQUIRED_LOCALES) {
    if (!languageIndexes.has(locale)) {
      throw new Error(`translations.csv is missing the ${locale} language column.`);
    }
  }

  const translations = [];
  const ids = new Set();
  let path = [];

  for (const row of rows.slice(headerIndex + 1)) {
    const pathCells = Array.from({ length: pathLength }, (_, index) => row[index + 1] ?? '');
    const firstPathSegment = pathCells.findIndex((cell) => cell !== '');

    if (firstPathSegment === -1) {
      continue;
    }

    path = [...path.slice(0, firstPathSegment), ...pathCells.slice(firstPathSegment)].filter(Boolean);
    const id = path.join('.');

    if (ids.has(id)) {
      throw new Error(`translations.csv contains a duplicate message ID: ${id}.`);
    }

    const values = Object.fromEntries(
      REQUIRED_LOCALES.map((locale) => [
        locale,
        row[pathLength + 1 + languageIndexes.get(locale)] ?? '',
      ]),
    );

    for (const locale of REQUIRED_LOCALES) {
      if (!values[locale]) {
        throw new Error(`translations.csv is missing ${locale} text for ${id}.`);
      }
    }

    ids.add(id);
    translations.push({ id, values });
  }

  return translations;
}

const escapeXml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

function createXliff(locale, translations) {
  const units = translations
    .map(
      ({ id, values }) => `      <trans-unit id="${escapeXml(id)}">
        <source>${escapeXml(values[SOURCE_LOCALE])}</source>
        <target>${escapeXml(values[locale])}</target>
      </trans-unit>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2">
  <file source-language="${SOURCE_LOCALE}" target-language="${locale}" datatype="plaintext" original="messages">
    <body>
${units}
    </body>
  </file>
</xliff>
`;
}

async function extractedMessageIds(xliffDirectory) {
  const xliff = await readFile(join(xliffDirectory, 'pl.xlf'), 'utf8');
  return new Set([...xliff.matchAll(/<trans-unit id="([^"]+)"/g)].map((match) => match[1]));
}

export async function generateTranslations({
  csvPath = 'translations/translations.csv',
  xliffDirectory = 'translations/xliff',
} = {}) {
  const translations = translationsFromCsv(await readFile(csvPath, 'utf8'));
  const csvIds = new Set(translations.map(({ id }) => id));
  const extractedIds = await extractedMessageIds(xliffDirectory);

  for (const id of extractedIds) {
    if (!csvIds.has(id)) {
      throw new Error(`translations.csv is missing the Lit message ID: ${id}.`);
    }
  }

  for (const id of csvIds) {
    if (!extractedIds.has(id)) {
      throw new Error(`translations.csv has no matching Lit message ID: ${id}.`);
    }
  }

  await mkdir(xliffDirectory, { recursive: true });
  await Promise.all(
    REQUIRED_LOCALES.map((locale) =>
      writeFile(join(xliffDirectory, `${locale}.xlf`), createXliff(locale, translations)),
    ),
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  generateTranslations().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
