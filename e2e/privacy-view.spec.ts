import { expect, test } from '@playwright/test';

test('Contact form links to the ZIRON privacy policy', async ({ page }) => {
  await page.goto('/?view=contact');

  await expect(page.getByRole('link', { name: 'terms and conditions' })).toHaveAttribute(
    'href',
    '?view=privacy&lang=en',
  );
});

test('Privacy page keeps the primary navigation and copied ZIRON policy text', async ({ page }) => {
  await page.goto('/?view=privacy');

  await expect(page.locator('site-header')).toHaveCount(1);
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })
    .getByRole('link')).toHaveText(['Work', 'About', 'Contact']);
  await expect(page.getByRole('heading', { name: '🔐 Polityka prywatności – ZIRON' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '1. Informacje ogólne' })).toBeVisible();
  await expect(page.locator('privacy-view')).not.toContainText('ZION');
  await expect(page.locator('privacy-view form')).toHaveCount(0);
});
