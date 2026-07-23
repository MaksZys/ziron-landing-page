import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { UnsplashImage } from '../../content/portfolio';
import styles from './project-gallery.module.css';

@customElement('project-gallery')
export class ProjectGallery extends LitElement {
  @property({ attribute: false })
  images: UnsplashImage[] = [];

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    return html`
      <section class=${styles.gallery} aria-label="Project gallery">
        ${this.images.map(
          (image, index) => html`
            <figure class=${`${styles.figure} ${styles[`image${index + 1}`] ?? ''}`}>
              <img
                class=${styles.image}
                src=${image.imageUrl}
                alt=${image.alt}
                loading=${index < 2 ? 'eager' : 'lazy'}
              />
              <figcaption class=${styles.credit}>
                <a href=${image.sourceUrl} target="_blank" rel="noreferrer">
                  Photo: ${image.photographerName} / Unsplash
                </a>
              </figcaption>
            </figure>
          `,
        )}
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'project-gallery': ProjectGallery;
  }
}
