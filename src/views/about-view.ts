import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { ABOUT_HERO_IMAGE, ABOUT_PROFILES } from '../content/about';
import { PRIMARY_NAVIGATION } from '../content/navigation';
import styles from './about-view.module.css';

@customElement('about-view')
export class AboutView extends LitElement {
  #profileObserver?: IntersectionObserver;

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
    const currentPath = window.location.search || './';

    return html`
      <main class=${styles.aboutView}>
        <header class=${styles.header}>
          <nav aria-label="Primary navigation">
            <ul class=${styles.navigation}>
              ${[{ href: './', label: 'Home' }, ...PRIMARY_NAVIGATION].map(
                (link) => html`
                  <li>
                    <a
                      href=${link.href}
                      aria-current=${link.href === currentPath ? 'page' : 'false'}
                    >
                      ${link.label}
                    </a>
                  </li>
                `,
              )}
            </ul>
          </nav>
        </header>

        <section class=${styles.hero} aria-labelledby="about-title">
          <div class=${styles.heroCopy}>
            <p class=${styles.eyebrow}>ZIRON / KIM JESTEŚMY</p>
            <h1 id="about-title" class=${styles.title}>TWORZYMY<br />WE DWOJE</h1>
            <p class=${styles.heroSummary}>
              Film. Fotografia. Ruch. Od pomysłu do gotowego materiału —
              prowadzimy cały proces.
            </p>
            <span class=${styles.heroIndex} aria-hidden="true">ABOUT / 01</span>
          </div>
          <div class=${styles.heroMedia}>
            <img
              src=${ABOUT_HERO_IMAGE}
              alt="Dwóch mężczyzn stojących razem na dachu o zachodzie słońca"
              fetchpriority="high"
            />
            <span class=${styles.heroCaption}>PRODUCTION / MOTION</span>
          </div>
        </section>

        <section class=${styles.profiles} aria-labelledby="team-title">
          <div class=${styles.sectionIntro}>
            <p class=${styles.eyebrow}>02 / ZESPÓŁ</p>
            <h2 id="team-title">DWA PUNKTY<br />WIDZENIA.</h2>
            <p>
              Połączyła nas wspólna praca i podobne podejście do tworzenia
              obrazów. Uzupełniamy się umiejętnościami, ale za każdą realizację
              odpowiadamy razem.
            </p>
          </div>

          <div class=${styles.profileGrid}>
            ${ABOUT_PROFILES.map(
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
          <p class=${styles.eyebrow}>03 / SPOSÓB PRACY</p>
          <h2 id="manifesto-title">NIE TYLKO<br /><span>REJESTRUJEMY.</span></h2>
          <div class=${styles.manifestoBody}>
            <p>
              Zaczynaliśmy amatorsko, z pasji do nagrywania i opowiadania
              historii obrazem. Dziś tworzymy profesjonalne materiały dla firm
              z branż technicznych, przemysłowych i wszędzie tam, gdzie liczy
              się prawdziwa praca.
            </p>
            <ul>
              <li>Znajomość branży</li>
              <li>Pełny proces produkcji</li>
              <li>Jakość bez skrótów</li>
            </ul>
          </div>
        </section>

        <section id="contact" class=${styles.contact} aria-labelledby="contact-title">
          <div>
            <p class=${styles.eyebrow}>04 / KONTAKT</p>
            <h2 id="contact-title">ZACZNIJMY<br />OD OBRAZU.</h2>
          </div>
          <div class=${styles.contactDetails}>
            <p>Opowiedz nam, co chcesz pokazać.</p>
            <a class=${styles.contactAction} href="mailto:kontakt@ziron.pl">
              Napisz do nas <span aria-hidden="true">→</span>
            </a>
            <a class=${styles.contactLink} href="mailto:kontakt@ziron.pl">kontakt@ziron.pl</a>
            <a class=${styles.contactLink} href="tel:+48694986722">+48 694 986 722</a>
          </div>
        </section>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'about-view': AboutView;
  }
}
