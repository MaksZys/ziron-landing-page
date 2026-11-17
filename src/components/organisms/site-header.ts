import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { Menu, X } from 'lucide';

import { icon } from '../atoms/icon';
import '../atoms/logo';
import type { NavigationLink } from '../molecules/navigation';
import {
  applyLocaleFromUrl,
  LOCALES,
  localeFromUrl,
  localizedHomeUrl,
  localizedUrl,
  type Locale,
} from '../../localization';
import styles from './site-header.module.css';

@customElement('site-header')
export class SiteHeader extends LitElement {
  @property({ attribute: false })
  links: NavigationLink[] = [];

  @state()
  private isLanguageLoading = false;

  @state()
  private languageError = '';

  @state()
  private isMobileMenuOpen = false;

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  protected override createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('resize', this.handleViewportResize);
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('resize', this.handleViewportResize);
    document.body.removeAttribute('data-mobile-menu-open');
    super.disconnectedCallback();
  }

  protected override updated(changedProperties: Map<string, unknown>) {
    if (!changedProperties.has('isMobileMenuOpen')) {
      return;
    }

    document.body.toggleAttribute('data-mobile-menu-open', this.isMobileMenuOpen);

    if (changedProperties.get('isMobileMenuOpen') === undefined) {
      return;
    }

    const focusTarget = this.isMobileMenuOpen
      ? this.querySelector<HTMLElement>(`#mobile-navigation a`)
      : this.querySelector<HTMLButtonElement>('[data-mobile-menu-toggle]');
    focusTarget?.focus();
  }

  private get activeLocale(): Locale {
    return localeFromUrl();
  }

  private toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  private closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  private handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  };

  private handleViewportResize = () => {
    if (window.matchMedia('(min-width: 48rem)').matches) {
      this.closeMobileMenu();
    }
  };

  private async changeLanguage(event: Event) {
    const languageSelect = event.currentTarget as HTMLSelectElement;
    const locale = languageSelect.value as Locale;
    const previousLocale = this.activeLocale;

    if (locale === previousLocale) {
      return;
    }

    this.isLanguageLoading = true;
    this.languageError = '';
    window.history.replaceState(null, '', localizedUrl(locale));

    try {
      await applyLocaleFromUrl();
    } catch (error) {
      console.error(`Unable to load ${locale} translations.`, error);
      window.history.replaceState(null, '', localizedUrl(previousLocale));
      this.languageError = msg('Unable to change language.', { id: 'language.loadFailed' });
    } finally {
      this.isLanguageLoading = false;
    }
  }

  protected override render() {
    const currentView = new URLSearchParams(window.location.search).get('view');
    const mobileLinks: NavigationLink[] = [
      {
        href: 'https://ziron.erli.pl/',
        label: msg('Shop', { id: 'nav.shop' }),
      },
      ...this.links,
    ];

    return html`
      <header class=${styles.header}>
        <a
          class=${styles.homeLink}
          href=${localizedHomeUrl()}
          aria-label=${msg('ZIRON home', { id: 'brand.homeLink' })}
        >
          <brand-logo variant="mark"></brand-logo>
        </a>
        <nav class=${styles.navigation} aria-label=${msg('Primary navigation', { id: 'nav.primary' })}>
          <ul class=${styles.navigationList}>
            ${this.links.map((link) => {
              const linkView = new URLSearchParams(link.href).get('view');
              const isCurrent = linkView === currentView;

              return html`
                <li>
                  <a
                    class=${styles.navigationLink}
                    href=${link.href}
                    aria-current=${isCurrent ? 'page' : nothing}
                  >
                    ${link.label}
                  </a>
                </li>
              `;
            })}
          </ul>
          <label class=${styles.languageControl}>
            <span class=${styles.visuallyHidden}>
              ${msg('Language', { id: 'language.label' })}
            </span>
            <select
              class=${styles.languageSelect}
              aria-label=${msg('Language', { id: 'language.label' })}
              aria-busy=${String(this.isLanguageLoading)}
              ?disabled=${this.isLanguageLoading}
              @change=${this.changeLanguage}
            >
              ${LOCALES.map(
                (locale) => html`
                  <option value=${locale} ?selected=${locale === this.activeLocale}>
                    ${locale.toUpperCase()}
                  </option>
                `,
              )}
            </select>
          </label>
          <button
            class=${styles.mobileMenuToggle}
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded=${String(this.isMobileMenuOpen)}
            aria-label=${this.isMobileMenuOpen
              ? msg('Close navigation', { id: 'nav.close' })
              : msg('Open navigation', { id: 'nav.open' })}
            data-mobile-menu-toggle
            @click=${this.toggleMobileMenu}
          >
            ${icon(this.isMobileMenuOpen ? X : Menu, 'size-6')}
          </button>
          <span class=${styles.visuallyHidden} role="status" aria-live="polite">
            ${this.isLanguageLoading
              ? msg('Changing language…', { id: 'language.loading' })
              : this.languageError}
          </span>
        </nav>
      </header>
      <button
        class=${`${styles.mobileMenuBackdrop} ${this.isMobileMenuOpen ? styles.mobileMenuBackdropOpen : ''}`}
        type="button"
        tabindex=${this.isMobileMenuOpen ? '0' : '-1'}
        aria-label=${msg('Close navigation', { id: 'nav.close' })}
        @click=${this.closeMobileMenu}
      ></button>
      <nav
        id="mobile-navigation"
        class=${`${styles.mobileMenu} ${this.isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
        aria-label=${msg('Primary navigation', { id: 'nav.primary' })}
        aria-hidden=${String(!this.isMobileMenuOpen)}
      >
        <ul class=${styles.mobileMenuList}>
          ${mobileLinks.map((link) => {
            const linkView = new URLSearchParams(link.href).get('view');
            const isCurrent = !link.href.startsWith('https://') && linkView === currentView;

            return html`
              <li>
                <a
                  class=${styles.mobileMenuLink}
                  href=${link.href}
                  aria-current=${isCurrent ? 'page' : nothing}
                  @click=${this.closeMobileMenu}
                >
                  ${link.label}
                </a>
              </li>
            `;
          })}
        </ul>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'site-header': SiteHeader;
  }
}
