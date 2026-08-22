import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { msg } from '@lit/localize';

@customElement('brand-name')
export class BrandName extends LitElement {
  @property()
  href = '#top';

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    return html`
      <a
        class="inline-flex min-h-12 items-center text-xl font-black tracking-widest text-base-content transition-colors hover:text-primary"
        href=${this.href}
        aria-label=${msg('ZIRON home', { id: 'brand.homeLink' })}
      >
        ZIRON
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'brand-name': BrandName;
  }
}
