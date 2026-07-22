import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../atoms/navigation-link';

export type NavigationLink = {
  href: string;
  label: string;
};

@customElement('primary-navigation')
export class PrimaryNavigation extends LitElement {
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
                <navigation-link .href=${link.href} .label=${link.label}></navigation-link>
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
    'primary-navigation': PrimaryNavigation;
  }
}
