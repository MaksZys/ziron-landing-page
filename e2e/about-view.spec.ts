import { expect, test } from '@playwright/test';

test('About page keeps its navigation, CTA, and media self-contained', async ({
  page,
}) => {
  await page.goto('/?view=about');

  const navigation = page.getByRole('navigation', {
    name: 'Primary navigation',
  });
  await expect(navigation.getByRole('link')).toHaveText([
    'Home',
    'Work',
    'About',
    'Contact',
  ]);
  await expect(navigation.getByRole('link', { name: 'About' })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await expect(page.getByRole('link', { name: /Napisz do nas/i })).toHaveAttribute(
    'href',
    'mailto:kontakt@ziron.pl',
  );

  const imageSources = await page.locator('main img').evaluateAll((images) => {
    return images.map((image) => image.src);
  });
  expect(imageSources).toHaveLength(3);
  expect(imageSources.every((source) => /^https?:\/\//.test(source))).toBe(true);
  expect(
    imageSources.every((source) => !source.includes('assets.zyrosite.com')),
  ).toBe(true);
  expect(imageSources[0]).toContain('photo-1542248311-c6111015e3de');

  const firstTeamProfile = page
    .locator('section[aria-labelledby="team-title"] article')
    .first();
  await firstTeamProfile.scrollIntoViewIfNeeded();
  await expect(firstTeamProfile).toHaveClass(/profileInView/);
});
