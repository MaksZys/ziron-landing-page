import { expect, test } from '@playwright/test';

const VIEWS = ['', 'project', 'about', 'contact', 'privacy'];
const LOCALES = ['en', 'pl', 'de'];

test('visible text stays within its mobile container on every page', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile contract');
  await page.setViewportSize({ width: 320, height: 568 });
  const overflowingText: string[] = [];

  for (const view of VIEWS) {
    for (const locale of LOCALES) {
      const search = new URLSearchParams({ lang: locale });

      if (view) {
        search.set('view', view);
      }

      await page.goto(`/?${search}`);

      const pageOverflowingText = await page.locator('main :is(h1, h2, h3, p, li, a, button, span)').evaluateAll(
        (elements) =>
          elements.flatMap((element) => {
            const styles = window.getComputedStyle(element);
            const text = element.textContent?.trim();
            const bounds = element.getBoundingClientRect();

            if (
              !text ||
              styles.display === 'none' ||
              styles.visibility === 'hidden' ||
              (styles.position === 'absolute' && bounds.width <= 1 && bounds.height <= 1) ||
              element.clientWidth === 0
            ) {
              return [];
            }

            const exceedsContainer = element.scrollWidth > element.clientWidth + 1;
            const exceedsViewport = bounds.left < -1 || bounds.right > window.innerWidth + 1;

            return exceedsContainer || exceedsViewport
              ? [`${element.tagName.toLowerCase()}: ${text}`]
              : [];
          }),
      );

      overflowingText.push(
        ...pageOverflowingText.map((text) => `${view || 'home'} / ${locale}: ${text}`),
      );
    }
  }

  expect(overflowingText).toEqual([]);
});
