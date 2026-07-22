import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../atoms/ziron-nav-link';

export type NavigationLink = {
  href: string;
  label: string;
};

@customElement('ziron-navigation')
export class ZironNavigation extends LitElement {
  @property({ attribute: false })
  links: NavigationLink[] = [];

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    return html`
      <nav aria-label="Primary navigation">
        <ul class="flex items-center gap-1">
          ${this.links.map(
            (link) => html`
              <li>
                <ziron-nav-link .href=${link.href} .label=${link.label}></ziron-nav-link>
              </li>
            `,
          )}
        </ul>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ziron-navigation': ZironNavigation;
  }
}
