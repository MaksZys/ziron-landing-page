import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

import '../components/organisms/site-header';
import '../components/organisms/site-footer';
import { getPrimaryNavigation } from '../content/navigation';
import { FEATURED_PROJECT } from '../content/portfolio.generated';
import { localizedViewUrl } from '../localization';
import styles from './home-view.module.css';

@customElement('home-view')
export class HomeView extends LitElement {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    const workImages = FEATURED_PROJECT.images.slice(0, 3);
    const heroImage = workImages[1] ?? workImages[0];

    return html`
      <main class=${styles.homeView}>
        <site-header .links=${getPrimaryNavigation()}></site-header>

        <section class=${styles.hero} aria-labelledby="home-title">
          ${heroImage
            ? html`<img
                class=${styles.heroImage}
                src=${heroImage.imageUrl}
                alt=${heroImage.alt}
                fetchpriority="high"
              />`
            : html`<div class=${styles.heroFallback}>
                ${msg('Portfolio media is unavailable.', { id: 'home.mediaUnavailable' })}
              </div>`}
          <div class=${styles.heroShade} aria-hidden="true"></div>

          <div class=${styles.heroContent}>
            <p class=${styles.fieldNote}>
              ${msg('FIELD NOTE / 01', { id: 'home.fieldNote' })}
            </p>
            <h1 id="home-title" class=${styles.title}>
              ${msg('FILM THE WORK', { id: 'home.titleFirst' })}<br />
              ${msg('PEOPLE TRUST YOU TO DO.', { id: 'home.titleSecond' })}
            </h1>
            <p class=${styles.summary}>
              ${msg(
                'Film, photography, drone and social content for agricultural, industrial and technical brands.',
                { id: 'home.summary' },
              )}
            </p>
            <div class=${styles.actions}>
              <a class=${styles.primaryAction} href=${localizedViewUrl('contact')}>
                ${msg('Plan a shoot', { id: 'home.contactAction' })}
                <span aria-hidden="true">↗</span>
              </a>
              <a class=${styles.workAction} href="#selected-work">
                ${msg('See selected work', { id: 'home.workAction' })}
              </a>
            </div>
          </div>

          <div class=${styles.proofRail} aria-label=${msg('How we build proof', { id: 'home.proofLabel' })}>
            <p>${msg('Proof frame by frame', { id: 'home.proofTitle' })}</p>
            <ol>
              <li>${msg('Field', { id: 'home.proofField' })}</li>
              <li>${msg('Detail', { id: 'home.proofDetail' })}</li>
              <li>${msg('People', { id: 'home.proofPeople' })}</li>
              <li>${msg('Scale', { id: 'home.proofScale' })}</li>
            </ol>
          </div>
        </section>

        <section class=${styles.outcomes} aria-labelledby="outcomes-title">
          <div>
            <p class=${styles.sectionLabel}>
              ${msg('One shoot. More ways to use it.', { id: 'home.outcomesEyebrow' })}
            </p>
            <h2 id="outcomes-title">
              ${msg('MAKE THE WORK EASY TO UNDERSTAND.', { id: 'home.outcomesTitle' })}
            </h2>
          </div>
          <div class=${styles.outcomeList}>
            <p>${msg('Explain a process', { id: 'home.outcomeExplain' })}</p>
            <p>${msg('Show the scale', { id: 'home.outcomeScale' })}</p>
            <p>${msg('Give sales usable assets', { id: 'home.outcomeSales' })}</p>
            <p>${msg('Keep social moving', { id: 'home.outcomeSocial' })}</p>
          </div>
        </section>

        <section id="selected-work" class=${styles.work} aria-labelledby="work-title">
          <div class=${styles.sectionHeading}>
            <p class=${styles.sectionLabel}>
              ${msg('Selected work', { id: 'home.workEyebrow' })}
            </p>
            <h2 id="work-title">${msg('PROOF WITH A JOB TO DO.', { id: 'home.workTitle' })}</h2>
            <p class=${styles.workSummary}>
              ${msg(
                'Show buyers how the product, process and people behind it actually work.',
                { id: 'home.workSummary' },
              )}
            </p>
          </div>
          <div class=${styles.workGrid}>
            ${workImages.map((image, index) => this.renderWorkCard(image, index))}
          </div>
        </section>

        <section class=${styles.process} aria-labelledby="process-title">
          <div class=${styles.processIntro}>
            <p class=${styles.sectionLabel}>
              ${msg('One small crew. Full ownership.', { id: 'home.processEyebrow' })}
            </p>
            <h2 id="process-title">${msg('FROM BRIEF TO BUYER-READY.', { id: 'home.processTitle' })}</h2>
          </div>
          <ol class=${styles.processSteps}>
            <li><span>01</span>${msg('Brief', { id: 'home.processBrief' })}</li>
            <li><span>02</span>${msg('Field day', { id: 'home.processFieldDay' })}</li>
            <li><span>03</span>${msg('Edit', { id: 'home.processEdit' })}</li>
            <li><span>04</span>${msg('Delivery', { id: 'home.processDelivery' })}</li>
          </ol>
        </section>

        <section class=${styles.contact} aria-labelledby="contact-title">
          <p class=${styles.sectionLabel}>
            ${msg('Start with the hard-to-explain part.', { id: 'home.contactEyebrow' })}
          </p>
          <h2 id="contact-title">${msg('BRING US THE WORK.', { id: 'home.contactTitle' })}</h2>
          <p>
            ${msg(
              'Tell us what needs to be seen. We will come back with a clear direction for the shoot.',
              { id: 'home.contactSummary' },
            )}
          </p>
          <a class=${styles.primaryAction} href=${localizedViewUrl('contact')}>
            ${msg('Plan a shoot', { id: 'home.contactAction' })}
            <span aria-hidden="true">↗</span>
          </a>
        </section>
        <site-footer></site-footer>
      </main>
    `;
  }

  private renderWorkCard(
    image: (typeof FEATURED_PROJECT.images)[number],
    index: number,
  ) {
    const labels = [
      msg('Machinery in motion', { id: 'home.workCardOne' }),
      msg('Process, made visible', { id: 'home.workCardTwo' }),
      msg('Scale behind the work', { id: 'home.workCardThree' }),
    ];

    return html`
      <a class=${styles.workCard} href=${localizedViewUrl('project')}>
        <img src=${image.imageUrl} alt=${image.alt} loading="lazy" />
        <span>${String(index + 1).padStart(2, '0')}</span>
        <strong>${labels[index]}</strong>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-view': HomeView;
  }
}
