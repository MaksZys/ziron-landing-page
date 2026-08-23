import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

import '../components/organisms/site-header';
import '../components/organisms/site-footer';
import { getFeaturedWorkSections } from '../content/featured-work';
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
    const workSections = getFeaturedWorkSections();

    return html`
      <main class=${styles.projectView}>
        <site-header .links=${getPrimaryNavigation()}></site-header>

        ${workSections.map((section, index) => this.renderProjectSection(section, index))}

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

  private renderProjectSection(
    section: ReturnType<typeof getFeaturedWorkSections>[number],
    index: number,
  ) {
    const headingId = `${section.anchor}-title`;

    return html`
      <section id=${section.anchor} class=${styles.projectSection} aria-labelledby=${headingId}>
        <div class=${styles.hero}>
          ${section.image
            ? html`
                <img
                  class=${styles.heroImage}
                  src=${section.image.imageUrl}
                  alt=${section.image.alt}
                  fetchpriority=${index === 0 ? 'high' : 'auto'}
                />
              `
            : html`<div class=${styles.heroFallback}>
                ${msg('Project media is unavailable.', { id: 'project.mediaUnavailable' })}
              </div>`}

          <project-intro
            .category=${msg('Film production / Campaign 2026', {
              id: 'project.category',
            })}
            .headingId=${headingId}
            .headingLevel=${index === 0 ? 1 : 2}
            .summary=${section.summary}
            .title=${section.title}
          ></project-intro>
        </div>

        <project-gallery .images=${section.galleryImages}></project-gallery>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'project-view': ProjectView;
  }
}
