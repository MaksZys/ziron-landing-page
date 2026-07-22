import { html } from 'lit';

import '../components/organisms/ziron-hero-gallery';
import { PRIMARY_NAVIGATION } from '../content/navigation';
import { PORTFOLIO_SLIDES } from '../content/portfolio.generated';

export function renderHomeView() {
  return html`
    <div id="top" class="bg-base-100 text-base-content">
      <main>
        <ziron-hero-gallery .links=${PRIMARY_NAVIGATION} .slides=${PORTFOLIO_SLIDES}></ziron-hero-gallery>

        <section id="about" class="homepage-section" aria-labelledby="about-title">
          <p class="homepage-section-kicker">About ZIRON</p>
          <h2 id="about-title" class="homepage-section-title">Stories shaped by speed, craft and precision.</h2>
        </section>

        <section id="contact" class="homepage-section homepage-section-primary" aria-labelledby="contact-title">
          <p class="homepage-section-kicker">Start a project</p>
          <h2 id="contact-title" class="homepage-section-title">Bring the machine. We’ll find its motion.</h2>
        </section>
      </main>
    </div>
  `;
}
