import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const FULL_LOGO_URL = new URL('../../../assets/ziron-logo-big.png', import.meta.url).href;
const MARK_LOGO_URL = new URL('../../../assets/ziron.jpg', import.meta.url).href;

@customElement('ziron-logo')
export class ZironLogo extends LitElement {
  @property({ reflect: true })
  variant: 'full' | 'mark' = 'full';

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    const isMark = this.variant === 'mark';

    return html`
      <img
        class=${isMark ? 'block size-8 rounded-field object-cover' : 'block w-full object-contain'}
        src=${isMark ? MARK_LOGO_URL : FULL_LOGO_URL}
        alt=${isMark ? '' : 'ZIRON — Tworzymy to, o czym inni mówią'}
        aria-hidden=${isMark ? 'true' : 'false'}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ziron-logo': ZironLogo;
  }
}
