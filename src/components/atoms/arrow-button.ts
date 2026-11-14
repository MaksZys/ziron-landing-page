import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ArrowLeft, ArrowRight } from 'lucide';

import { icon } from './icon';
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
        ${icon(isPrevious ? ArrowLeft : ArrowRight, 'size-5')}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gallery-arrow': GalleryArrow;
  }
}
