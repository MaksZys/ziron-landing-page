import { expect, test } from '@playwright/test';

const CONTACT_EMAIL = 'kontakt@ziron.pl';
const CONTACT_DRAFT_STORAGE_KEY = 'ziron.contact-draft';

const localizedContent = {
  en: {
    fallback: 'If your email app does not open, email us directly at kontakt@ziron.pl.',
    privacyNotice:
      'By sending us a message, you consent to the processing of your personal data as described in our privacy policy.',
    privacyLink: 'privacy policy',
    subject: 'New project enquiry',
    nameLabel: 'Name',
    emailLabel: 'Email',
  },
  pl: {
    fallback: 'Jeśli aplikacja pocztowa się nie otworzy, napisz bezpośrednio na adres kontakt@ziron.pl.',
    privacyNotice:
      'Wysyłając do nas wiadomość, wyrażasz zgodę na przetwarzanie swoich danych osobowych zgodnie z naszą polityką prywatności.',
    privacyLink: 'polityką prywatności',
    subject: 'Nowe zapytanie dotyczące projektu',
    nameLabel: 'Imię i nazwisko',
    emailLabel: 'E-mail',
  },
  de: {
    fallback: 'Wenn sich deine E-Mail-App nicht öffnet, schreibe uns direkt an kontakt@ziron.pl.',
    privacyNotice:
      'Mit dem Senden einer Nachricht stimmst du der Verarbeitung deiner personenbezogenen Daten gemäß unserer Datenschutzrichtlinie zu.',
    privacyLink: 'Datenschutzrichtlinie',
    subject: 'Neue Projektanfrage',
    nameLabel: 'Name',
    emailLabel: 'E-Mail',
  },
} as const;

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
  await expect(page.locator(`contact-view a[href="mailto:${CONTACT_EMAIL}"]`).first()).toHaveAttribute(
    'href',
    'mailto:kontakt@ziron.pl',
  );
  await expect(page.getByRole('link', { name: '+48 694 986 722' })).toHaveAttribute(
    'href',
    'tel:+48694986722',
  );

  await expect(form.getByText(localizedContent.en.fallback)).toBeVisible();
  await expect(form.getByRole('link', { name: CONTACT_EMAIL })).toHaveAttribute(
    'href',
    `mailto:${CONTACT_EMAIL}`,
  );

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );

  if (page.viewportSize()?.width && page.viewportSize()!.width < 768) {
    expect(
      await page.locator('contact-view form > div:first-child').evaluate((grid) => {
        return getComputedStyle(grid).gridTemplateColumns.split(' ').length;
      }),
    ).toBe(1);
  }
});

test('Contact page localizes the fallback and privacy consent', async ({ page }) => {
  for (const [locale, content] of Object.entries(localizedContent)) {
    await page.goto(`/?view=contact&lang=${locale}`);

    const form = page.locator('contact-view form');
    await expect(form.locator('p').nth(1)).toHaveText(content.fallback);
    expect(
      await form.locator('p').nth(2).evaluate((paragraph) => paragraph.textContent?.replace(/\s+/g, ' ').trim()),
    ).toBe(content.privacyNotice);
    await expect(form.getByRole('link', { name: CONTACT_EMAIL })).toHaveAttribute(
      'href',
      `mailto:${CONTACT_EMAIL}`,
    );
    await expect(form.getByRole('link', { name: content.privacyLink })).toHaveAttribute(
      'href',
      `?view=privacy&lang=${locale}`,
    );
  }
});

test('Contact page hands valid localized form data to an email draft', async ({ page }) => {
  for (const [locale, content] of Object.entries(localizedContent)) {
    await page.goto(`/?view=contact&lang=${locale}`);
    await page.evaluate(() => {
      const OriginalUrl = URL;

      Object.defineProperty(window, 'URL', {
        configurable: true,
        value: class extends OriginalUrl {
          get href() {
            const handoff = super.href;
            document.body.dataset.emailHandoff = handoff;
            return handoff;
          }
        },
      });
    });

    const form = page.locator('contact-view form');
    await form.locator('[name="firstName"]').fill('Ada');
    await form.getByRole('button').click();
    await expect(page.locator('body')).not.toHaveAttribute('data-email-handoff');
    expect(await page.evaluate((key) => localStorage.getItem(key), CONTACT_DRAFT_STORAGE_KEY)).not.toBeNull();

    await form.locator('[name="lastName"]').fill('Lovelace');
    await form.locator('[name="email"]').fill('ada@example.com');
    await form.locator('[name="message"]').fill('A sample project message.');
    await form.getByRole('button').click();

    const handoff = await page.locator('body').getAttribute('data-email-handoff');
    const emailUrl = new URL(handoff ?? '');

    expect(emailUrl.protocol).toBe('mailto:');
    expect(emailUrl.pathname).toBe(CONTACT_EMAIL);
    expect(emailUrl.searchParams.get('subject')).toBe(content.subject);
    expect(emailUrl.searchParams.get('body')).toBe(
      `${content.nameLabel}: Ada Lovelace\n${content.emailLabel}: ada@example.com\n\nA sample project message.`,
    );
    expect(await page.evaluate((key) => localStorage.getItem(key), CONTACT_DRAFT_STORAGE_KEY)).toBeNull();
  }
});

test('Contact page restores and clears an unsent draft', async ({ page }) => {
  await page.goto('/?view=contact');

  const form = page.locator('contact-view form');
  await form.locator('[name="firstName"]').fill('Ada');
  await form.locator('[name="lastName"]').fill('Lovelace');
  await form.locator('[name="email"]').fill('ada@example.com');
  await form.locator('[name="message"]').fill('A saved project message.');

  await page.reload();

  const restoredForm = page.locator('contact-view form');
  await expect(restoredForm.locator('[name="firstName"]')).toHaveValue('Ada');
  await expect(restoredForm.locator('[name="lastName"]')).toHaveValue('Lovelace');
  await expect(restoredForm.locator('[name="email"]')).toHaveValue('ada@example.com');
  await expect(restoredForm.locator('[name="message"]')).toHaveValue('A saved project message.');
  await expect(restoredForm.getByRole('button', { name: 'Clear saved draft' })).toBeVisible();

  await restoredForm.getByRole('button', { name: 'Clear saved draft' }).click();

  await expect(restoredForm.locator('[name="firstName"]')).toHaveValue('');
  await expect(restoredForm.locator('[name="lastName"]')).toHaveValue('');
  await expect(restoredForm.locator('[name="email"]')).toHaveValue('');
  await expect(restoredForm.locator('[name="message"]')).toHaveValue('');
  await expect(restoredForm.getByRole('button', { name: 'Clear saved draft' })).toHaveCount(0);
  expect(await page.evaluate((key) => localStorage.getItem(key), CONTACT_DRAFT_STORAGE_KEY)).toBeNull();
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
