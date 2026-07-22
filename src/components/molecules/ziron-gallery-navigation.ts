import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { NavigationLink } from './ziron-navigation';
import '../atoms/ziron-arrow-button';
import '../atoms/ziron-logo';

@customElement('ziron-gallery-navigation')
export class ZironGalleryNavigation extends LitElement {
  @property({ attribute: false })
  links: NavigationLink[] = [];

  @property({ type: Boolean })
  menuOpen = false;

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    return html`
      <div class="gallery-dock">
        <nav
          id="gallery-menu"
          class=${this.menuOpen ? 'gallery-menu gallery-menu-open' : 'gallery-menu'}
          aria-label="Primary navigation"
          aria-hidden=${String(!this.menuOpen)}
        >
          ${this.links.map(
            (link) => html`<a class="gallery-menu-link" href=${link.href} @click=${this.closeMenu}>${link.label}</a>`,
          )}
        </nav>

        <div class="gallery-toolbar">
          <a class="gallery-home-link" href="#top" aria-label="ZIRON home">
            <ziron-logo variant="mark"></ziron-logo>
          </a>
          <button
            class="gallery-menu-toggle"
            type="button"
            aria-expanded=${String(this.menuOpen)}
            aria-controls="gallery-menu"
            @click=${this.toggleMenu}
          >
            <ziron-logo variant="mark"></ziron-logo>
            <span>${this.menuOpen ? 'Close' : 'Click for more'}</span>
          </button>

          <div class="gallery-desktop-links" aria-label="Primary navigation">
            ${this.links.map(
              (link) => html`<a class="gallery-desktop-link" href=${link.href}>${link.label}</a>`,
            )}
          </div>

          <div class="gallery-arrows">
            <ziron-arrow-button
              direction="previous"
              label="Previous project"
              @click=${this.showPrevious}
            ></ziron-arrow-button>
            <ziron-arrow-button label="Next project" @click=${this.showNext}></ziron-arrow-button>
          </div>
        </div>
      </div>
    `;
  }

  private toggleMenu() {
    this.dispatchEvent(new CustomEvent('menu-toggle', { bubbles: true, composed: true }));
  }

  private closeMenu() {
    if (this.menuOpen) {
      this.toggleMenu();
    }
  }

  private showPrevious() {
    this.dispatchEvent(new CustomEvent('gallery-previous', { bubbles: true, composed: true }));
  }

  private showNext() {
    this.dispatchEvent(new CustomEvent('gallery-next', { bubbles: true, composed: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ziron-gallery-navigation': ZironGalleryNavigation;
  }
}
