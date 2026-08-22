import { expect, test, type Page } from '@playwright/test';

const FIXTURE_IMAGE = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000">
    <rect width="1600" height="1000" fill="#1b2023"/>
    <path d="M0 780L1600 260V1000H0Z" fill="#273337"/>
    <path d="M0 825L1600 305" stroke="#71d9ed" stroke-width="10"/>
  </svg>
`;

async function openProject(page: Page) {
  await page.route('https://images.unsplash.com/**', async (route) => {
    await route.fulfill({
      body: FIXTURE_IMAGE,
      contentType: 'image/svg+xml',
    });
  });
  await page.goto('/?view=project');
}

async function openFirstPreview(page: Page) {
  await page
    .getByRole('button', {
      name: 'Open image 1: a tractor is parked in the snow at night',
    })
    .click();

  const dialog = page.getByRole('dialog', { name: 'Image preview' });
  await expect(dialog).toBeVisible();
  await page.evaluate(async () => {
    await Promise.all(
      document.getAnimations().map((animation) => animation.finished),
    );
  });
  return dialog;
}

test('approved project layout remains unchanged', async ({ page }) => {
  await openProject(page);

  await expect(page).toHaveScreenshot('project-view.png', {
    animations: 'disabled',
    fullPage: true,
    maxDiffPixels: 200,
  });
});

test('project navigation uses the brand mark as the home link', async ({
  page,
}) => {
  await openProject(page);

  const navigation = page.getByRole('navigation', {
    name: 'Primary navigation',
  });
  await expect(page.locator('site-header')).toHaveCount(1);
  await expect(navigation.getByRole('link')).toHaveText(['Work', 'About', 'Contact']);
  const homeLink = page.getByRole('link', { name: 'ZIRON home' });
  await expect(homeLink).toHaveAttribute(
    'href',
    '?lang=en',
  );
  await expect(homeLink).toHaveCSS('background-color', 'rgb(247, 250, 250)');
});

test('Project navigation remains at the top of the viewport while scrolling', async ({
  page,
}) => {
  await openProject(page);

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  await expect.poll(async () => {
    return page.locator('site-header').evaluate((header) => {
      return Math.round(header.getBoundingClientRect().top);
    });
  }).toBe(0);
});

test('mobile navigation reserves a compact language-control bay', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile contract');
  await openProject(page);

  const header = page.locator('site-header header');
  const homeLink = page.getByRole('link', { name: 'ZIRON home' });
  const navigation = page.getByRole('navigation', {
    name: 'Primary navigation',
  });

  await expect(header).toHaveCSS('min-height', '48px');
  await expect(header).toHaveCSS('background-color', 'rgb(8, 10, 12)');
  await expect(homeLink).toHaveCSS('width', '48px');
  await expect(navigation).toHaveCSS('width', '294px');
});

test('desktop navigation sits at the edge and uses cyan hover feedback', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop contract');
  await openProject(page);

  const languageSelect = page.locator('site-header select');
  const header = page.locator('site-header header');
  const languageBounds = await languageSelect.boundingBox();

  if (!languageBounds) {
    throw new Error('The language selector has no visible bounds.');
  }

  expect(languageBounds.x + languageBounds.width).toBe(1264);

  await expect(header).toHaveCSS('background-color', 'rgba(8, 10, 12, 0.82)');
  await header.hover();
  await expect(header).toHaveCSS('background-color', 'rgb(8, 10, 12)');

  const aboutLink = page.getByRole('link', { name: 'About' });
  await aboutLink.hover();
  await expect(aboutLink).toHaveCSS('color', 'rgb(113, 217, 237)');
});

test('mobile backdrop tap closes the image preview', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile contract');
  await openProject(page);
  const dialog = await openFirstPreview(page);
  const dialogBounds = await dialog.boundingBox();

  if (!dialogBounds) {
    throw new Error('The image preview has no visible bounds.');
  }

  const backdropPoint = {
    x: dialogBounds.x + 20,
    y: dialogBounds.y + 200,
  };
  const backdropHitTarget = await page.evaluate(({ x, y }) => {
    return document.elementFromPoint(x, y)?.tagName ?? null;
  }, backdropPoint);
  expect(backdropHitTarget).toBe('DIALOG');

  await page.touchscreen.tap(backdropPoint.x, backdropPoint.y);

  await expect(dialog).not.toBeVisible();
});

test('mobile image tap keeps the preview open', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile contract');
  await openProject(page);
  const dialog = await openFirstPreview(page);

  await dialog
    .getByRole('img', {
      name: 'a tractor is parked in the snow at night',
    })
    .click();

  await expect(dialog).toBeVisible();
});

test('mobile arrow advances without closing the preview', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile contract');
  await openProject(page);
  const dialog = await openFirstPreview(page);

  await dialog.getByRole('button', { name: 'Next image' }).click();

  await expect(dialog).toContainText('02 / 08');
});

test('mobile horizontal swipe advances the preview', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile contract');
  await openProject(page);
  const dialog = await openFirstPreview(page);
  const image = dialog.getByRole('img', {
    name: 'a tractor is parked in the snow at night',
  });
  const imageBounds = await image.boundingBox();

  if (!imageBounds) {
    throw new Error('The preview image has no visible bounds.');
  }

  const swipeY = imageBounds.y + imageBounds.height / 2;
  const swipeStartX = imageBounds.x + imageBounds.width * 0.75;
  const swipeEndX = imageBounds.x + imageBounds.width * 0.25;
  const browserSession = await page.context().newCDPSession(page);

  try {
    await browserSession.send('Input.dispatchTouchEvent', {
      touchPoints: [{ id: 1, x: swipeStartX, y: swipeY }],
      type: 'touchStart',
    });

    for (let step = 1; step <= 8; step += 1) {
      const progress = step / 8;
      await browserSession.send('Input.dispatchTouchEvent', {
        touchPoints: [
          {
            id: 1,
            x: swipeStartX + (swipeEndX - swipeStartX) * progress,
            y: swipeY,
          },
        ],
        type: 'touchMove',
      });
    }

    await browserSession.send('Input.dispatchTouchEvent', {
      touchPoints: [],
      type: 'touchEnd',
    });
  } finally {
    await browserSession.detach();
  }

  await expect(dialog).toContainText('02 / 08');
});

test('desktop keyboard navigation advances and closes the preview', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop contract');
  await openProject(page);
  const dialog = await openFirstPreview(page);

  await page.keyboard.press('ArrowRight');
  await expect(dialog).toContainText('02 / 08');

  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
});
