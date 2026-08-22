import { expect, test } from '@playwright/test';

test('loads a locale from the URL before rendering', async ({ page }) => {
  await page.goto('/?view=about&lang=pl');

  await expect(page.locator('#about-title')).toHaveText('TWORZYMYWE DWOJE');
  await expect(
    page.getByRole('navigation', { name: 'Nawigacja główna' }),
  ).toBeVisible();
});

test('changes the locale without leaving the current page', async ({ page }) => {
  await page.goto('/?view=about#contact');

  const languageSelect = page.locator('site-header select');
  await languageSelect.selectOption('pl');

  await expect(page).toHaveURL(/\?view=about&lang=pl#contact$/);
  await expect(page.locator('#about-title')).toHaveText('TWORZYMYWE DWOJE');
  await expect(languageSelect).toHaveValue('pl');

  await languageSelect.selectOption('de');

  await expect(page).toHaveURL(/\?view=about&lang=de#contact$/);
  await expect(page.locator('#about-title')).toHaveText('WIR SCHAFFENZU ZWEIT');
  await expect(languageSelect).toHaveValue('de');
});

test('uses English for an invalid locale', async ({ page }) => {
  await page.goto('/?view=about&lang=fr');

  await expect(page.locator('#about-title')).toHaveText('WE CREATEAS TWO');
});

test('keeps the current locale when a translation module fails to load', async ({ page }) => {
  await page.route('**/src/generated/locales/pl.ts*', (route) => route.abort());
  await page.goto('/?view=about');

  const languageSelect = page.locator('site-header select');
  await languageSelect.selectOption('pl');

  await expect(languageSelect).toHaveValue('en');
  await expect(page).toHaveURL(/\?view=about$/);
  await expect(page.getByRole('status')).toHaveText('Unable to change language.');
});

test('disables the selector while loading a translation module', async ({ page }) => {
  let releaseRoute: (() => void) | undefined;
  let resolveRouteStarted = () => {};
  const routeStarted = new Promise<void>((resolve) => {
    resolveRouteStarted = resolve;
  });
  await page.route('**/src/generated/locales/pl.ts*', async (route) => {
    resolveRouteStarted();
    await new Promise<void>((release) => {
      releaseRoute = release;
    });
    await route.continue();
  });
  await page.goto('/?view=about');

  const languageSelect = page.locator('site-header select');
  const selectLocale = languageSelect.selectOption('pl');
  await routeStarted;
  await expect(languageSelect).toBeDisabled();

  if (!releaseRoute) {
    throw new Error('The Polish locale module did not begin loading.');
  }

  releaseRoute();
  await selectLocale;
  await expect(languageSelect).toHaveValue('pl');
});
