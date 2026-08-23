import { expect, test } from '@playwright/test';

const SOCIAL_LINKS = [
  ['Facebook', 'https://facebook.com/designpwoteam'],
  ['Instagram', 'https://instagram.com/ziron.agroagency'],
  ['TikTok', 'https://tiktok.com/@kulas.mgm'],
  ['YouTube', 'https://youtube.com/@RadKen'],
] as const;

test('Every page footer links to the official social channels', async ({ page }) => {
  for (const view of ['', 'project', 'about', 'contact', 'privacy']) {
    await page.goto(view ? `/?view=${view}` : '/');

    const footer = page.locator('site-footer');
    await expect(footer).toHaveCount(1);

    for (const [label, href] of SOCIAL_LINKS) {
      await expect(footer.getByRole('link', { name: label })).toHaveAttribute('href', href);
      await expect(footer.getByRole('link', { name: label })).toHaveAttribute('rel', 'noopener noreferrer');
      await expect(footer.getByRole('link', { name: label }).locator('svg')).toHaveAttribute(
        'aria-hidden',
        'true',
      );
    }
  }
});
