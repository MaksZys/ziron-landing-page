import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './arrow-button.module.css';

@customElement('gallery-arrow')
export class GalleryArrow extends LitElement {
  @property()
  direction: 'next' | 'previous' = 'next';

  @property()
  label = 'Next project';

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    const isPrevious = this.direction === 'previous';

    return html`
      <button
        class=${`btn btn-ghost btn-square btn-sm ${styles.button}`}
        type="button"
        aria-label=${this.label}
      >
        <svg
          class=${isPrevious ? 'size-4 rotate-180' : 'size-4'}
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gallery-arrow': GalleryArrow;
  }
}
