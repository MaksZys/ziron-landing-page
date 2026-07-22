import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../atoms/brand';
import '../molecules/navigation';
import type { NavigationLink } from '../molecules/navigation';

@customElement('site-header')
export class SiteHeader extends LitElement {
  @property({ attribute: false })
  links: NavigationLink[] = [];

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    return html`
      <header class="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
        <div class="mx-auto flex max-w-content items-center justify-between px-4 sm:px-6 lg:px-8">
          <brand-name></brand-name>
          <primary-navigation .links=${this.links}></primary-navigation>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'site-header': SiteHeader;
  }
}
