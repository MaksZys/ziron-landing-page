import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../atoms/logo';
import type { NavigationLink } from '../molecules/navigation';
import styles from './site-header.module.css';

@customElement('site-header')
export class SiteHeader extends LitElement {
  @property({ attribute: false })
  links: NavigationLink[] = [];

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    return html`
      <header class=${styles.header}>
        <a class=${styles.homeLink} href="./" aria-label="ZIRON home">
          <brand-logo variant="mark"></brand-logo>
        </a>
        <nav class=${styles.navigation} aria-label="Primary navigation">
          <ul class=${styles.navigationList}>
            ${this.links.map((link) => {
              const isCurrent = link.href === (window.location.search || './');

              return html`
                <li>
                  <a
                    class=${styles.navigationLink}
                    href=${link.href}
                    aria-current=${isCurrent ? 'page' : nothing}
                  >
                    ${link.label}
                  </a>
                </li>
              `;
            })}
          </ul>
        </nav>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'site-header': SiteHeader;
  }
}
