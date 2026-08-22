import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

import '../components/organisms/site-header';
import { FEATURED_PROJECT } from '../content/portfolio.generated';
import { getPrimaryNavigation } from '../content/navigation';
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
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'project-view': ProjectView;
  }
}
