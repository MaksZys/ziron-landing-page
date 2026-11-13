import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

const FULL_LOGO_URL = new URL('../../../assets/ziron-logo-big.png', import.meta.url).href;
const MARK_LOGO_URL = new URL('../../../assets/ziron.jpg', import.meta.url).href;
const BLACK_LOGO_URL = new URL('../../../assets/ziron-black.jpg', import.meta.url).href;

@customElement('brand-logo')
export class BrandLogo extends LitElement {
  @property({ reflect: true })
  variant: 'full' | 'mark' | 'black' = 'full';

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    const isCompactLogo = this.variant === 'mark' || this.variant === 'black';
    const source = this.variant === 'full'
      ? FULL_LOGO_URL
      : this.variant === 'black'
        ? BLACK_LOGO_URL
        : MARK_LOGO_URL;

    return html`
      <img
        class=${this.variant === 'black'
          ? 'block h-full w-full object-cover'
          : isCompactLogo
            ? 'block size-8 object-cover'
            : 'block w-full object-contain'}
        src=${source}
        alt=${isCompactLogo ? '' : msg('ZIRON — We create what others talk about', { id: 'brand.fullLogo' })}
        aria-hidden=${isCompactLogo ? 'true' : 'false'}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'brand-logo': BrandLogo;
  }
}
