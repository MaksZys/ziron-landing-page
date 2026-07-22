import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../atoms/ziron-brand';
import '../molecules/ziron-navigation';
import type { NavigationLink } from '../molecules/ziron-navigation';

@customElement('ziron-site-header')
export class ZironSiteHeader extends LitElement {
  @property({ attribute: false })
  links: NavigationLink[] = [];

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    return html`
      <header class="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
        <div class="mx-auto flex max-w-content items-center justify-between px-4 sm:px-6 lg:px-8">
          <ziron-brand></ziron-brand>
          <ziron-navigation .links=${this.links}></ziron-navigation>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ziron-site-header': ZironSiteHeader;
  }
}
