import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import styles from './site-footer.module.css';

const SOCIAL_LINKS = [
  { icon: 'facebook', label: 'Facebook', href: 'https://facebook.com/designpwoteam' },
  { icon: 'instagram', label: 'Instagram', href: 'https://instagram.com/ziron.agroagency' },
  { icon: 'tiktok', label: 'TikTok', href: 'https://tiktok.com/@kulas.mgm' },
  { icon: 'youtube', label: 'YouTube', href: 'https://youtube.com/@RadKen' },
] as const;

@customElement('site-footer')
export class SiteFooter extends LitElement {
  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    return html`
      <footer class=${styles.footer}>
        <nav aria-label="Social media">
          <ul class=${styles.socialLinks}>
            ${SOCIAL_LINKS.map(
              ({ icon, label, href }) => html`
                <li>
                  <a href=${href} target="_blank" rel="noopener noreferrer">
                    ${this.renderIcon(icon)}
                    <span>${label}</span>
                  </a>
                </li>
              `,
            )}
          </ul>
        </nav>
      </footer>
    `;
  }

  private renderIcon(icon: (typeof SOCIAL_LINKS)[number]['icon']) {
    switch (icon) {
      case 'facebook':
        return html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6h1.8V3.8c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5V10H7v3h3v8h3.5Z" /></svg>`;
      case 'instagram':
        return html`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>`;
      case 'tiktok':
        return html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3c.4 2.7 1.9 4.3 4.5 4.7v3.1c-1.7 0-3.2-.5-4.5-1.5v6.2a5.5 5.5 0 1 1-4.7-5.4v3.2a2.4 2.4 0 1 0 1.5 2.2V3H15Z" /></svg>`;
      case 'youtube':
        return html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.6.4a2.8 2.8 0 0 0-2 2A29.2 29.2 0 0 0 2 12a29.2 29.2 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.7.4 7.6.4 7.6.4s5.9 0 7.6-.4a2.8 2.8 0 0 0 2-2A29.2 29.2 0 0 0 22 12a29.2 29.2 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" /></svg>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'site-footer': SiteFooter;
  }
}
