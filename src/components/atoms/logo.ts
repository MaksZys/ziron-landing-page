import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { msg } from '@lit/localize';

const FULL_LOGO_URL = new URL('../../../assets/ziron-logo-big.png', import.meta.url).href;
const MARK_LOGO_URL = new URL('../../../assets/ziron.jpg', import.meta.url).href;

@customElement('brand-logo')
export class BrandLogo extends LitElement {
  @property({ reflect: true })
  variant: 'full' | 'mark' = 'full';

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    const isMark = this.variant === 'mark';

    return html`
      <img
        class=${isMark ? 'block size-8 object-cover' : 'block w-full object-contain'}
        src=${isMark ? MARK_LOGO_URL : FULL_LOGO_URL}
        alt=${isMark ? '' : msg('ZIRON — We create what others talk about', { id: 'brand.fullLogo' })}
        aria-hidden=${isMark ? 'true' : 'false'}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'brand-logo': BrandLogo;
  }
}
