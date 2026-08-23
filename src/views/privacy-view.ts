import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

import '../components/organisms/site-header';
import '../components/organisms/site-footer';
import { getPrimaryNavigation } from '../content/navigation';
import styles from './privacy-view.module.css';

@customElement('privacy-view')
export class PrivacyView extends LitElement {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    return html`
      <main class=${styles.privacyView}>
        <site-header .links=${getPrimaryNavigation()}></site-header>

        <article class=${styles.policy} aria-labelledby="privacy-title">
          <header class=${styles.intro}>
            <p>${msg('LEGAL / ZIRON', { id: 'privacy.eyebrow' })}</p>
            <h1 id="privacy-title">${msg('Privacy policy', { id: 'privacy.title' })}</h1>
          </header>

          <section>
            <h2>${msg('1. General information', { id: 'privacy.general.heading' })}</h2>
            <p>
              <strong>${msg('ZIRON', { id: 'privacy.general.brand' })}</strong>
              ${msg(
                'is the controller of personal data and provides mobile washing services for machinery, vehicles and equipment.',
                { id: 'privacy.general.controller' },
              )}
            </p>
            <p>
              ${msg(
                'You can contact the controller using the contact form or the telephone number shown in advertisements.',
                { id: 'privacy.general.contact' },
              )}
            </p>
          </section>

          <section>
            <h2>${msg('2. Scope of collected data', { id: 'privacy.scope.heading' })}</h2>
            <p>${msg('The following data may be collected through Meta (Facebook / Instagram) advertising forms:', { id: 'privacy.scope.summary' })}</p>
            <ul>
              <li>${msg('first and last name,', { id: 'privacy.scope.name' })}</li>
              <li>${msg('telephone number,', { id: 'privacy.scope.phone' })}</li>
              <li>${msg('email address,', { id: 'privacy.scope.email' })}</li>
              <li>${msg('other information voluntarily provided in the submission.', { id: 'privacy.scope.other' })}</li>
            </ul>
          </section>

          <section>
            <h2>${msg('3. Purpose of data processing', { id: 'privacy.purpose.heading' })}</h2>
            <p>${msg('Personal data is processed solely to:', { id: 'privacy.purpose.summary' })}</p>
            <ul>
              <li>${msg('contact the person who submitted the form,', { id: 'privacy.purpose.contact' })}</li>
              <li>${msg('prepare an offer and provide services,', { id: 'privacy.purpose.service' })}</li>
              <li>${msg('respond to an enquiry.', { id: 'privacy.purpose.response' })}</li>
            </ul>
          </section>

          <section>
            <h2>${msg('4. Legal basis for processing', { id: 'privacy.legalBasis.heading' })}</h2>
            <p>${msg('Data is processed on the basis of:', { id: 'privacy.legalBasis.summary' })}</p>
            <ul>
              <li>${msg('Article 6(1)(a) GDPR – the user’s consent,', { id: 'privacy.legalBasis.consent' })}</li>
              <li>${msg('Article 6(1)(b) GDPR – steps taken to conclude a contract.', { id: 'privacy.legalBasis.contract' })}</li>
            </ul>
          </section>

          <section>
            <h2>${msg('5. Data sharing', { id: 'privacy.sharing.heading' })}</h2>
            <p>
              ${msg(
                'Personal data is not shared with third parties, except entities supporting advertising services (Meta Platforms Inc.) and only to the extent required for the forms to operate.',
                { id: 'privacy.sharing.summary' },
              )}
            </p>
          </section>

          <section>
            <h2>${msg('6. Data retention period', { id: 'privacy.retention.heading' })}</h2>
            <p>
              ${msg(
                'Data is retained for the period necessary to handle contact and prepare an offer, then may be deleted or anonymised.',
                { id: 'privacy.retention.summary' },
              )}
            </p>
          </section>

          <section>
            <h2>${msg('7. Your rights', { id: 'privacy.rights.heading' })}</h2>
            <p>${msg('Every data subject has the right to:', { id: 'privacy.rights.summary' })}</p>
            <ul>
              <li>${msg('access their data,', { id: 'privacy.rights.access' })}</li>
              <li>${msg('correct it,', { id: 'privacy.rights.correction' })}</li>
              <li>${msg('have it deleted,', { id: 'privacy.rights.deletion' })}</li>
              <li>${msg('restrict its processing,', { id: 'privacy.rights.restriction' })}</li>
              <li>${msg('withdraw consent at any time.', { id: 'privacy.rights.withdrawal' })}</li>
            </ul>
          </section>

          <section>
            <h2>${msg('8. Cookies', { id: 'privacy.cookies.heading' })}</h2>
            <p>
              ${msg(
                'The website may use cookies for technical and statistical purposes, in accordance with Meta platform rules.',
                { id: 'privacy.cookies.summary' },
              )}
            </p>
          </section>

          <section>
            <h2>${msg('9. Changes to this privacy policy', { id: 'privacy.changes.heading' })}</h2>
            <p>
              ${msg(
                'The controller reserves the right to make changes to this privacy policy.',
                { id: 'privacy.changes.summary' },
              )}
            </p>
          </section>

          <section>
            <h2>${msg('10. Contact', { id: 'privacy.contact.heading' })}</h2>
            <p>
              ${msg(
                'For matters relating to personal data protection, please contact us using the form or telephone.',
                { id: 'privacy.contact.summary' },
              )}
            </p>
          </section>
        </article>
        <site-footer></site-footer>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'privacy-view': PrivacyView;
  }
}
