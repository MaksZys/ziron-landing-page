import { expect, test } from '@playwright/test';

const localizedContent = {
  en: {
    title: 'FILM THE WORK PEOPLE TRUST YOU TO DO.',
    contactAction: 'Plan a shoot',
    proof: 'Proof frame by frame',
  },
  pl: {
    title: 'POKAŻCIE JAK DZIAŁA WASZA FIRMA.',
    contactAction: 'Porozmawiajmy o realizacji',
    proof: 'Dowód klatka po klatce',
  },
  de: {
    title: 'ZEIGEN SIE WIE IHR UNTERNEHMEN ARBEITET.',
    contactAction: 'Ein Dreh planen',
    proof: 'Beweis Bild für Bild',
  },
} as const;

test('Home page makes the offer and project contact action clear in every locale', async ({ page }) => {
  for (const [locale, content] of Object.entries(localizedContent)) {
    await page.goto(`/?lang=${locale}`);

    await expect(page.getByRole('heading', { name: content.title })).toBeVisible();
    await expect(page.getByText(content.proof)).toBeVisible();
    await expect(page.getByRole('link', { name: content.contactAction }).first()).toHaveAttribute(
      'href',
      `?view=contact&lang=${locale}`,
    );
  }
});

test('Home page keeps its decision copy inside the mobile viewport', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile contract');
  await page.setViewportSize({ width: 320, height: 568 });

  for (const locale of ['en', 'pl', 'de']) {
    await page.goto(`/?lang=${locale}`);

    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      `${locale} home page should not overflow horizontally`,
    ).toBe(true);

    expect(
      await page.locator('home-view h1, home-view p, home-view a').evaluateAll((elements) => {
        return elements
          .filter((element) => element.checkVisibility())
          .map((element) => element.scrollWidth > element.clientWidth)
          .some(Boolean);
      }),
      `${locale} home copy should not overflow`,
    ).toBe(false);

    expect(
      await page.locator('home-view .hero').evaluate((hero) => {
        const actions = hero.querySelector('[class*="actions"]')?.getBoundingClientRect();
        const proofRail = hero.querySelector('[class*="proofRail"]')?.getBoundingClientRect();
        const heroBounds = hero.getBoundingClientRect();

        return (
          heroBounds.height >= window.innerHeight &&
          (!proofRail || Math.round(proofRail.left) === Math.round(heroBounds.left + 20)) &&
          (!actions || !proofRail || proofRail.top - actions.bottom >= 40)
        );
      }),
      `${locale} mobile hero should reserve space for the left-aligned proof rail`,
    ).toBe(true);
  }
});

test('Home page keeps the desktop hero and localized sections inside their bounds', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop contract');

  for (const locale of ['en', 'pl', 'de']) {
    await page.goto(`/?lang=${locale}`);

    expect(
      await page.locator('home-view').evaluate((homeView) => {
        const header = homeView.querySelector('site-header header');
        const hero = homeView.querySelector('section');

        if (!header || !hero) {
          return false;
        }

        return Math.round(hero.getBoundingClientRect().height) === Math.round(window.innerHeight - header.getBoundingClientRect().height);
      }),
      `${locale} hero should fill the viewport below the topbar`,
    ).toBe(true);

    expect(
      await page.locator('home-view section h1, home-view section h2, home-view section p, home-view section a, home-view section strong').evaluateAll((elements) => {
        return elements
          .filter((element) => element.checkVisibility())
          .some((element) => {
            const bounds = element.getBoundingClientRect();
            const section = element.closest('section');
            const sectionBounds = section?.getBoundingClientRect();

            return !sectionBounds || bounds.left < sectionBounds.left || bounds.right > sectionBounds.right;
          });
      }),
      `${locale} desktop copy should remain inside its section`,
    ).toBe(false);

    expect(
      await page.locator('home-view .hero').evaluate((hero) => {
        const content = hero.querySelector('[class*="heroContent"]')?.getBoundingClientRect();
        const proofRail = hero.querySelector('[class*="proofRail"]')?.getBoundingClientRect();

        return !content || !proofRail || content.right <= proofRail.left || content.bottom <= proofRail.top;
      }),
      `${locale} hero copy should not overlap the proof rail`,
    ).toBe(true);

    expect(
      await page.locator('home-view .sectionHeading').evaluate((heading) => {
        const title = heading.querySelector('h2')?.getBoundingClientRect();
        const label = heading.querySelector('p:first-child')?.getBoundingClientRect();
        const summary = heading.querySelector('p:last-child')?.getBoundingClientRect();

        const titleDoesNotOverlap = !title || !summary || title.right <= summary.left || title.bottom <= summary.top;
        const labelDoesNotOverlap = !label || !summary || label.right <= summary.left || label.bottom <= summary.top;

        return titleDoesNotOverlap && labelDoesNotOverlap;
      }),
      `${locale} work heading copy should not overlap`,
    ).toBe(true);

    expect(
      await page.locator('home-view .processIntro').evaluate((intro) => {
        const title = intro.querySelector('h2')?.getBoundingClientRect();
        const bounds = intro.getBoundingClientRect();

        return !title || title.right <= bounds.right;
      }),
      `${locale} process title should remain inside its column`,
    ).toBe(true);
  }
});
