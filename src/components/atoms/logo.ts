import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import markSvg from '../../../assets/ziron-mark.svg?raw';

const FULL_LOGO_URL = new URL('../../../assets/ziron-logo-big.png', import.meta.url).href;
const MARK_SVG = markSvg.replace(
  '<svg ',
  '<svg class="block size-8" aria-hidden="true" ',
);

@customElement('brand-logo')
export class BrandLogo extends LitElement {
  @property({ reflect: true })
  variant: 'full' | 'mark' = 'full';

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    if (this.variant === 'mark') {
      return html`${unsafeSVG(MARK_SVG)}`;
    }

    return html`
      <img
        class="block w-full object-contain"
        src=${FULL_LOGO_URL}
        alt=${msg('ZIRON - We create what others talk about', { id: 'brand.fullLogo' })}
        aria-hidden="false"
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'brand-logo': BrandLogo;
  }
}
