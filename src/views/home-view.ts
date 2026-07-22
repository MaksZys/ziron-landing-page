import { html } from 'lit';

import '../components/organisms/ziron-hero-gallery';
import { PRIMARY_NAVIGATION } from '../content/navigation';
import { PORTFOLIO_SLIDES } from '../content/portfolio.generated';

export function renderHomeView() {
  return html`
    <main id="top" class="homepage-shell">
      <ziron-hero-gallery .links=${PRIMARY_NAVIGATION} .slides=${PORTFOLIO_SLIDES}></ziron-hero-gallery>
    </main>
  `;
}
