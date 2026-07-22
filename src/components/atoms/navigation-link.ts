import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('navigation-link')
export class NavigationLinkElement extends LitElement {
  @property()
  href = '#';

  @property()
  label = '';

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    return html`
      <a
        class="inline-flex min-h-12 items-center px-2 text-sm font-semibold text-base-content/70 transition-colors hover:text-primary"
        href=${this.href}
      >
        ${this.label}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'navigation-link': NavigationLinkElement;
  }
}
