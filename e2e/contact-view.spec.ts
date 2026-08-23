import { expect, test } from '@playwright/test';

test('Contact page provides an accessible, validated email handoff form', async ({ page }) => {
  await page.goto('/?view=contact');

  await expect(page.locator('contact-view')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'LET’S TALK.' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })
    .getByRole('link', { name: 'Contact' })).toHaveAttribute('aria-current', 'page');

  const form = page.locator('contact-view form');
  await expect(form.getByRole('textbox', { name: 'First name' })).toHaveAttribute('required', '');
  await expect(form.getByRole('textbox', { name: 'Email address' })).toHaveAttribute('type', 'email');
  await expect(form.getByRole('textbox', { name: 'Message' })).toHaveAttribute('required', '');
  await expect(page.getByRole('link', { name: 'kontakt@ziron.pl' })).toHaveAttribute(
    'href',
    'mailto:kontakt@ziron.pl',
  );
  await expect(page.getByRole('link', { name: '+48 694 986 722' })).toHaveAttribute(
    'href',
    'tel:+48694986722',
  );

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );

  if (page.viewportSize()?.width && page.viewportSize()!.width >= 768) {
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);

    expect(pageHeight).toBeLessThanOrEqual(page.viewportSize()!.height);
  }

  if (page.viewportSize()?.width && page.viewportSize()!.width < 768) {
    expect(
      await page.locator('contact-view form > div').evaluate((grid) => {
        return getComputedStyle(grid).gridTemplateColumns.split(' ').length;
      }),
    ).toBe(1);
  }
});

test('Contact page keeps every locale within the mobile viewport', async ({ page }) => {
  test.skip(page.viewportSize()?.width !== 390, 'Mobile-only viewport assertion');
  await page.setViewportSize({ width: 320, height: 568 });

  for (const locale of ['en', 'pl', 'de']) {
    await page.goto(`/?view=contact&lang=${locale}`);

    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      `${locale} contact page should not overflow horizontally`,
    ).toBe(true);

    expect(
      await page.locator('site-header a, contact-view h1, contact-view p, contact-view a, contact-view button').evaluateAll(
        (elements) => {
          return elements
            .filter((element) => element.checkVisibility())
            .map((element) => ({
              text: element.textContent?.trim(),
              overflow: element.scrollWidth > element.clientWidth,
            }))
            .filter((element) => element.overflow);
        },
      ),
      `${locale} contact text should wrap within its container`,
    ).toEqual([]);
  }
});
