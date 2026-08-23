import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

import '../components/organisms/site-header';
import { getPrimaryNavigation } from '../content/navigation';
import { localeFromUrl, localizedViewUrl } from '../localization';
import styles from './contact-view.module.css';

const CONTACT_EMAIL = 'kontakt@ziron.pl';
const CONTACT_DRAFT_STORAGE_KEY = 'ziron.contact-draft';

type ContactDraft = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

const isContactDraft = (value: unknown): value is ContactDraft => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const draft = value as Record<string, unknown>;

  return ['firstName', 'lastName', 'email', 'message'].every((field) => typeof draft[field] === 'string');
};

const hasDraftContent = (draft: ContactDraft) => Object.values(draft).some(Boolean);

@customElement('contact-view')
export class ContactView extends LitElement {
  private restoredDraft = this.readDraft();

  @state()
  private hasRestoredDraft = this.restoredDraft !== null;

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  protected override createRenderRoot() {
    return this;
  }

  protected override firstUpdated() {
    const draft = this.restoredDraft;

    if (!draft) {
      return;
    }

    const form = this.querySelector('form');

    if (!form) {
      return;
    }

    (form.elements.namedItem('firstName') as HTMLInputElement).value = draft.firstName;
    (form.elements.namedItem('lastName') as HTMLInputElement).value = draft.lastName;
    (form.elements.namedItem('email') as HTMLInputElement).value = draft.email;
    (form.elements.namedItem('message') as HTMLTextAreaElement).value = draft.message;
  }

  private readDraft() {
    try {
      const storedDraft = localStorage.getItem(CONTACT_DRAFT_STORAGE_KEY);

      if (!storedDraft) {
        return null;
      }

      const draft: unknown = JSON.parse(storedDraft);

      return isContactDraft(draft) && hasDraftContent(draft) ? draft : null;
    } catch {
      console.warn('Unable to restore the contact draft locally.');
      return null;
    }
  }

  private saveDraft(event: Event) {
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const draft = {
      firstName: String(formData.get('firstName') ?? ''),
      lastName: String(formData.get('lastName') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
    };

    try {
      if (hasDraftContent(draft)) {
        localStorage.setItem(CONTACT_DRAFT_STORAGE_KEY, JSON.stringify(draft));
      } else {
        localStorage.removeItem(CONTACT_DRAFT_STORAGE_KEY);
      }
    } catch {
      console.warn('Unable to save the contact draft locally.');
    }
  }

  private removeDraft() {
    try {
      localStorage.removeItem(CONTACT_DRAFT_STORAGE_KEY);
    } catch {
      console.warn('Unable to clear the contact draft locally.');
    }

    this.hasRestoredDraft = false;
  }

  private clearRestoredDraft() {
    (this.querySelector('form') as HTMLFormElement | null)?.reset();
    this.removeDraft();
  }

  private prepareEmail(event: SubmitEvent) {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const firstName = String(formData.get('firstName') ?? '').trim();
    const lastName = String(formData.get('lastName') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const senderName = [firstName, lastName].filter(Boolean).join(' ');
    const emailUrl = new URL(`mailto:${CONTACT_EMAIL}`);

    emailUrl.searchParams.set('subject', msg('New project enquiry', { id: 'contact.emailSubject' }));
    emailUrl.searchParams.set(
      'body',
      `${msg('Name', { id: 'contact.emailName' })}: ${senderName}\n${msg('Email', {
        id: 'contact.emailAddress',
      })}: ${email}\n\n${message}`,
    );

    this.removeDraft();
    window.location.assign(emailUrl.href);
  }

  protected override render() {
    return html`
      <main class=${styles.contactView}>
        <site-header .links=${getPrimaryNavigation()}></site-header>

        <section class=${styles.hero} aria-labelledby="contact-title">
          <div class=${styles.intro}>
            <p class=${styles.eyebrow}>${msg('ZIRON / CONTACT', { id: 'contact.eyebrow' })}</p>
            <h1 id="contact-title">${msg('LET’S TALK.', { id: 'contact.title' })}</h1>
            <p class=${styles.summary}>
              ${msg(
                'Tell us what you need and what you want people to see. We’ll put together the brief, plan the production and guide you through the whole process.',
                { id: 'contact.summary' },
              )}
            </p>
            <div class=${styles.directContact}>
              <a href="mailto:kontakt@ziron.pl">kontakt@ziron.pl</a>
              <a href="tel:+48694986722">+48 694 986 722</a>
            </div>
          </div>

          <form class=${styles.form} @submit=${this.prepareEmail} @input=${this.saveDraft}>
            <div class=${styles.fieldGrid}>
              <label>
                <span>${msg('First name', { id: 'contact.firstName' })}</span>
                <input name="firstName" autocomplete="given-name" required />
              </label>
              <label>
                <span>${msg('Last name', { id: 'contact.lastName' })}</span>
                <input name="lastName" autocomplete="family-name" />
              </label>
            </div>
            <label>
              <span>${msg('Email address', { id: 'contact.email' })}</span>
              <input name="email" type="email" autocomplete="email" required />
            </label>
            <label>
              <span>${msg('Message', { id: 'contact.message' })}</span>
              <textarea name="message" rows="6" required></textarea>
            </label>
            <div class=${styles.formActions}>
              <button type="submit">
                ${msg('Send enquiry', { id: 'contact.submit' })}
                <span aria-hidden="true">↗</span>
              </button>
              ${this.hasRestoredDraft
                ? html`
                    <button class=${styles.clearDraft} type="button" @click=${this.clearRestoredDraft}>
                      ${msg('Clear saved draft', { id: 'contact.clearDraft' })}
                    </button>
                  `
                : null}
            </div>
            <p class=${styles.formNote}>
              ${msg('Your email app will open with your message ready to send.', { id: 'contact.formNote' })}
            </p>
            <p class=${styles.termsNote}>
              ${msg('If your email app does not open, email us directly at', { id: 'contact.fallbackNotice' })}
              <a href=${`mailto:${CONTACT_EMAIL}`}>${CONTACT_EMAIL}</a>.
            </p>
            <p class=${styles.termsNote}>
              ${msg('By sending us a message, you consent to the processing of your personal data as described in our', {
                id: 'contact.termsNotice',
              })}
              ${' '}
              <a href=${localizedViewUrl('privacy')}>${msg('privacy policy', { id: 'contact.termsLink' })}</a>${
                localeFromUrl() === 'de' ? ' ' : ''
              }${msg('.', { id: 'contact.termsSuffix' })}
            </p>
          </form>
        </section>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'contact-view': ContactView;
  }
}
