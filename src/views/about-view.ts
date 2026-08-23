import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

import '../components/organisms/site-header';
import '../components/organisms/site-footer';
import { ABOUT_HERO_IMAGE, getAboutProfiles } from '../content/about';
import { getPrimaryNavigation } from '../content/navigation';
import styles from './about-view.module.css';

@customElement('about-view')
export class AboutView extends LitElement {
  #profileObserver?: IntersectionObserver;

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  protected override createRenderRoot() {
    return this;
  }

  protected override firstUpdated() {
    this.#profileObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.parentElement?.classList.toggle(
          styles.profileInView,
          entry.isIntersecting,
        );
      });
    }, { threshold: 0.5 });

    this.querySelectorAll<HTMLElement>(`.${styles.profileMedia}`).forEach((media) => {
      this.#profileObserver?.observe(media);
    });
  }

  disconnectedCallback() {
    this.#profileObserver?.disconnect();
    super.disconnectedCallback();
  }

  protected override render() {
    return html`
      <main class=${styles.aboutView}>
        <site-header .links=${getPrimaryNavigation()}></site-header>

        <section class=${styles.hero} aria-labelledby="about-title">
          <div class=${styles.heroCopy}>
            <p class=${styles.eyebrow}>${msg('ZIRON / WHO WE ARE', { id: 'about.heroEyebrow' })}</p>
            <h1 id="about-title" class=${styles.title}>
              ${msg('WE CREATE', { id: 'about.heroTitleFirst' })}<br />${msg('AS TWO', {
                id: 'about.heroTitleSecond',
              })}
            </h1>
            <p class=${styles.heroSummary}>
              ${msg(
                'Film. Photography. Movement. From idea to finished material — we lead the entire process.',
                { id: 'about.heroSummary' },
              )}
            </p>
            <span class=${styles.heroIndex} aria-hidden="true"
              >${msg('ABOUT / 01', { id: 'about.heroIndex' })}</span
            >
          </div>
          <div class=${styles.heroMedia}>
            <img
              src=${ABOUT_HERO_IMAGE}
              alt=${msg('Two men standing together on a rooftop at sunset', {
                id: 'about.heroImageAlt',
              })}
              fetchpriority="high"
            />
            <span class=${styles.heroCaption}
              >${msg('PRODUCTION / MOTION', { id: 'about.heroCaption' })}</span
            >
          </div>
        </section>

        <section class=${styles.profiles} aria-labelledby="team-title">
          <div class=${styles.sectionIntro}>
            <p class=${styles.eyebrow}>${msg('02 / TEAM', { id: 'about.teamEyebrow' })}</p>
            <h2 id="team-title">
              ${msg('TWO POINTS', { id: 'about.teamTitleFirst' })}<br />${msg('OF VIEW.', {
                id: 'about.teamTitleSecond',
              })}
            </h2>
            <p>
              ${msg(
                'Our shared work and similar approach to creating images brought us together. Our skills complement each other, but we take responsibility for every project together.',
                { id: 'about.teamSummary' },
              )}
            </p>
          </div>

          <div class=${styles.profileGrid}>
            ${getAboutProfiles().map(
              (profile, index) => html`
                <article class=${styles.profile}>
                  <div class=${styles.profileMedia}>
                    <span class=${styles.profileNumber}>0${index + 1}</span>
                    <img src=${profile.imageUrl} alt=${profile.imageAlt} loading="lazy" />
                  </div>
                  <div class=${styles.profileMeta}>
                    <h3>${profile.name}</h3>
                    <p>${profile.nickname}</p>
                    <span>${profile.role}</span>
                  </div>
                </article>
              `,
            )}
          </div>
        </section>

        <section class=${styles.manifesto} aria-labelledby="manifesto-title">
          <div class=${styles.manifestoRule} aria-hidden="true"></div>
          <p class=${styles.eyebrow}>${msg('03 / HOW WE WORK', { id: 'about.methodEyebrow' })}</p>
          <h2 id="manifesto-title">
            ${msg('WE DO MORE THAN', { id: 'about.methodTitleFirst' })}<br /><span
              >${msg('RECORD.', { id: 'about.methodTitleSecond' })}</span
            >
          </h2>
          <div class=${styles.manifestoBody}>
            <p>
              ${msg(
                'We began by filming out of a genuine love for the craft and for visual storytelling. Today, we create professional materials for companies in technical and industrial sectors and wherever real work matters.',
                { id: 'about.methodSummary' },
              )}
            </p>
            <ul>
              <li>${msg('Industry expertise', { id: 'about.methodExpertise' })}</li>
              <li>${msg('Full production process', { id: 'about.methodProduction' })}</li>
              <li>${msg('No shortcuts on quality', { id: 'about.methodQuality' })}</li>
            </ul>
          </div>
        </section>

        <section id="contact" class=${styles.contact} aria-labelledby="contact-title">
          <div>
            <p class=${styles.eyebrow}>${msg('04 / CONTACT', { id: 'about.contactEyebrow' })}</p>
            <h2 id="contact-title">
              ${msg("LET'S START", { id: 'about.contactTitleFirst' })}<br />${msg('WITH THE IMAGE.', {
                id: 'about.contactTitleSecond',
              })}
            </h2>
          </div>
          <div class=${styles.contactDetails}>
            <p>${msg('Tell us what you need. We’ll put together the brief and take care of the production.', { id: 'about.contactSummary' })}</p>
            <a class=${styles.contactAction} href="mailto:kontakt@ziron.pl">
              ${msg('Write to us', { id: 'about.contactAction' })}
              <span aria-hidden="true">→</span>
            </a>
            <a class=${styles.contactLink} href="mailto:kontakt@ziron.pl">kontakt@ziron.pl</a>
            <a class=${styles.contactLink} href="tel:+48694986722">+48 694 986 722</a>
          </div>
        </section>
        <site-footer></site-footer>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'about-view': AboutView;
  }
}
