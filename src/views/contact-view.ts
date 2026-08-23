import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

import '../components/organisms/site-header';
import { getPrimaryNavigation } from '../content/navigation';
import { localeFromUrl, localizedViewUrl } from '../localization';
import styles from './contact-view.module.css';

const CONTACT_EMAIL = 'kontakt@ziron.pl';

@customElement('contact-view')
export class ContactView extends LitElement {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  protected override createRenderRoot() {
    return this;
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
                'Tell us what you want to show. We will turn it into a clear, memorable image.',
                { id: 'contact.summary' },
              )}
            </p>
            <div class=${styles.directContact}>
              <a href="mailto:kontakt@ziron.pl">kontakt@ziron.pl</a>
              <a href="tel:+48694986722">+48 694 986 722</a>
            </div>
          </div>

          <form class=${styles.form} @submit=${this.prepareEmail}>
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
            <button type="submit">
              ${msg('Send enquiry', { id: 'contact.submit' })}
              <span aria-hidden="true">↗</span>
            </button>
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
