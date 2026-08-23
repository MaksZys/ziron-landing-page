import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../atoms/logo';
import styles from './project-intro.module.css';

@customElement('project-intro')
export class ProjectIntro extends LitElement {
  @property()
  category = '';

  @property()
  headingId = '';

  @property({ type: Number })
  headingLevel = 2;

  @property()
  summary = '';

  @property()
  title = '';

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    return html`
      <section class=${styles.intro} aria-labelledby=${this.headingId}>
        <div class=${styles.rail} aria-hidden="true"></div>
        <div class=${styles.projectMark} aria-hidden="true">
          <brand-logo variant="mark"></brand-logo>
        </div>
        ${this.headingLevel === 1
          ? html`<h1 id=${this.headingId} class=${styles.title}>${this.title}</h1>`
          : html`<h2 id=${this.headingId} class=${styles.title}>${this.title}</h2>`}
        <p class=${styles.summary}>${this.summary}</p>
        <p class=${styles.category}>${this.category}</p>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'project-intro': ProjectIntro;
  }
}
