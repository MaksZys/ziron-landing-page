import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { NavigationLink } from './navigation';
import '../atoms/arrow-button';
import '../atoms/logo';
import styles from './gallery-navigation.module.css';

@customElement('gallery-navigation')
export class GalleryNavigation extends LitElement {
  @property({ attribute: false })
  links: NavigationLink[] = [];

  @property({ type: Boolean })
  menuOpen = false;

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    const dockClass = this.menuOpen ? `${styles.dock} ${styles.dockOpen}` : styles.dock;
    const menuClass = this.menuOpen ? `${styles.menu} ${styles.menuOpen}` : styles.menu;

    return html`
      <div class=${dockClass}>
        <nav
          id="gallery-menu"
          class=${menuClass}
          aria-label="Primary navigation"
          aria-hidden=${String(!this.menuOpen)}
        >
          ${this.links.map(
            (link) => html`<a class=${styles.menuLink} href=${link.href} @click=${this.closeMenu}>${link.label}</a>`,
          )}
        </nav>

        <div class=${styles.toolbar}>
          <a class=${styles.homeLink} href="#top" aria-label="ZIRON home">
            <brand-logo variant="mark"></brand-logo>
          </a>
          <button
            class=${styles.menuToggle}
            type="button"
            aria-expanded=${String(this.menuOpen)}
            aria-controls="gallery-menu"
            @click=${this.toggleMenu}
          >
            <span>${this.menuOpen ? 'Close' : 'Explore'}</span>
            <span class=${styles.menuState} aria-hidden="true">${this.menuOpen ? 'Open' : 'Menu'}</span>
          </button>

          <nav class=${styles.desktopLinks} aria-label="Primary navigation">
            ${this.links.map((link) => html`<a class=${styles.desktopLink} href=${link.href}>${link.label}</a>`)}
          </nav>

          <div class=${styles.arrows}>
            <gallery-arrow
              direction="previous"
              label="Previous project"
              @click=${this.showPrevious}
            ></gallery-arrow>
            <gallery-arrow label="Next project" @click=${this.showNext}></gallery-arrow>
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
    'gallery-navigation': GalleryNavigation;
  }
}
