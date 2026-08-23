import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

import '../components/organisms/site-header';
import '../components/organisms/site-footer';
import { FEATURED_PROJECT } from '../content/portfolio.generated';
import { getPrimaryNavigation } from '../content/navigation';
import { localizedViewUrl } from '../localization';
import '../components/molecules/project-intro';
import '../components/organisms/project-gallery';
import styles from './project-view.module.css';

@customElement('project-view')
export class ProjectView extends LitElement {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    const heroImage = FEATURED_PROJECT.images[0];

    return html`
      <main class=${styles.projectView}>
        <site-header .links=${getPrimaryNavigation()}></site-header>

        <section class=${styles.hero}>
          ${heroImage
            ? html`
                <img
                  class=${styles.heroImage}
                  src=${heroImage.imageUrl}
                  alt=${heroImage.alt}
                  fetchpriority="high"
                />
              `
            : html`<div class=${styles.heroFallback}>
                ${msg('Project media is unavailable.', { id: 'project.mediaUnavailable' })}
              </div>`}

          <project-intro
            .category=${msg('Film production / Campaign 2026', {
              id: 'project.category',
            })}
            .summary=${msg(
              'Machines do not pose. They work. We showed their strength where it is most real — in dust, snow, rain, and at full speed.',
              { id: 'project.summary' },
            )}
            .title=${msg('Strength in motion', { id: 'project.title' })}
          ></project-intro>
        </section>

        <project-gallery .images=${FEATURED_PROJECT.images}></project-gallery>

        <section class=${styles.contact} aria-labelledby="project-contact-title">
          <p class=${styles.contactEyebrow}>
            ${msg('Your next realization starts here.', { id: 'project.contactEyebrow' })}
          </p>
          <h2 id="project-contact-title">
            ${msg('LET’S MAKE YOUR WORK', { id: 'project.contactTitleFirst' })}<br />
            ${msg('IMPOSSIBLE TO MISS.', { id: 'project.contactTitleSecond' })}
          </h2>
          <p class=${styles.contactSummary}>
            ${msg(
              'Tell us what you want to show. We will come back with a clear direction for the realization.',
              { id: 'project.contactSummary' },
            )}
          </p>
          <a class=${styles.contactAction} href=${localizedViewUrl('contact')}>
            ${msg('Plan your realization', { id: 'project.contactAction' })}
            <span aria-hidden="true">↗</span>
          </a>
        </section>
        <site-footer></site-footer>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'project-view': ProjectView;
  }
}
