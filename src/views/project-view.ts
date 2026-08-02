import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../components/organisms/site-header';
import { FEATURED_PROJECT } from '../content/portfolio.generated';
import { PRIMARY_NAVIGATION } from '../content/navigation';
import '../components/molecules/project-intro';
import '../components/organisms/project-gallery';
import styles from './project-view.module.css';

@customElement('project-view')
export class ProjectView extends LitElement {
  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    const heroImage = FEATURED_PROJECT.images[0];

    return html`
      <main class=${styles.projectView}>
        <site-header .links=${PRIMARY_NAVIGATION}></site-header>

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
            : html`<div class=${styles.heroFallback}>Project media is unavailable.</div>`}

          <project-intro
            .category=${FEATURED_PROJECT.category}
            .summary=${FEATURED_PROJECT.summary}
            .title=${FEATURED_PROJECT.title}
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
