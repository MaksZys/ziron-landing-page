import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { PRIMARY_NAVIGATION } from '../../content/navigation';
import styles from './project-header.module.css';

@customElement('project-header')
export class ProjectHeader extends LitElement {
  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    return html`
      <header class=${styles.header}>
        <nav aria-label="Primary navigation">
          <ul class=${styles.navigation}>
            ${[{ href: './', label: 'Home' }, ...PRIMARY_NAVIGATION].map(
              (link) => html`
                <li>
                  <a
                    class=${styles.navigationLink}
                    href=${link.href}
                    aria-current=${link.href === '?view=project' ? 'page' : 'false'}
                  >
                    ${link.label}
                  </a>
                </li>
              `,
            )}
          </ul>
        </nav>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'project-header': ProjectHeader;
  }
}
