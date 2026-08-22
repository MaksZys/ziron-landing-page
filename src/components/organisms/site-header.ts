import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

import '../atoms/logo';
import type { NavigationLink } from '../molecules/navigation';
import {
  getLocale,
  LOCALES,
  localizedHomeUrl,
  localizedUrl,
  setLocale,
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

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  protected override createRenderRoot() {
    return this;
  }

  private get activeLocale(): Locale {
    return getLocale() as Locale;
  }

  private async changeLanguage(event: Event) {
    const languageSelect = event.currentTarget as HTMLSelectElement;
    const locale = languageSelect.value as Locale;
    const previousLocale = this.activeLocale;

    if (locale === previousLocale) {
      return;
    }

    this.isLanguageLoading = true;
    this.languageError = '';

    try {
      await setLocale(locale);
      window.history.replaceState(null, '', localizedUrl(locale));
    } catch (error) {
      console.error(`Unable to load ${locale} translations.`, error);
      languageSelect.value = previousLocale;
      this.languageError = msg('Unable to change language.', { id: 'language.loadFailed' });
    } finally {
      this.isLanguageLoading = false;
    }
  }

  protected override render() {
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
              const linkView = link.href.startsWith('?')
                ? new URLSearchParams(link.href).get('view')
                : null;
              const currentView = new URLSearchParams(window.location.search).get('view');
              const isCurrent = linkView !== null && linkView === currentView;

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
              .value=${this.activeLocale}
              @change=${this.changeLanguage}
            >
              ${LOCALES.map(
                (locale) => html`<option value=${locale}>${locale.toUpperCase()}</option>`,
              )}
            </select>
          </label>
          <span class=${styles.visuallyHidden} role="status" aria-live="polite">
            ${this.isLanguageLoading
              ? msg('Changing language…', { id: 'language.loading' })
              : this.languageError}
          </span>
        </nav>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'site-header': SiteHeader;
  }
}
