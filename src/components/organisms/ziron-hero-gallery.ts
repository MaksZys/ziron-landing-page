import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { NavigationLink } from '../molecules/ziron-navigation';
import type { PortfolioSlide } from '../../content/portfolio';
import '../atoms/ziron-logo';
import '../molecules/ziron-gallery-navigation';

const MOBILE_MEDIA_QUERY = '(max-width: 47.999rem)';
const SWIPE_DISTANCE_PX = 48;

@customElement('ziron-hero-gallery')
export class ZironHeroGallery extends LitElement {
  @property({ attribute: false })
  links: NavigationLink[] = [];

  @property({ attribute: false })
  slides: PortfolioSlide[] = [];

  @state()
  private activeIndex = 0;

  @state()
  private menuOpen = false;

  private touchStartX: number | null = null;
  private touchStartY: number | null = null;

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    const activeSlide = this.slides[this.activeIndex];

    if (!activeSlide) {
      return html`<section class="hero-gallery hero-gallery-empty">Portfolio media is unavailable.</section>`;
    }

    return html`
      <section
        id="work"
        class="hero-gallery"
        aria-roledescription="carousel"
        aria-label="Selected ZIRON work"
        tabindex="0"
        @keydown=${this.handleKeyDown}
        @touchstart=${this.handleTouchStart}
        @touchend=${this.handleTouchEnd}
      >
        <div class="hero-gallery-media" aria-live="polite">
          ${this.slides.map((slide, index) => this.renderSlide(slide, index))}
        </div>
        <div class="hero-gallery-scrim" aria-hidden="true"></div>
        <div class="hero-gallery-frame" aria-hidden="true"></div>

        <header class="hero-gallery-header">
          <span class="hero-gallery-kicker">ZIRON / Visual engineering</span>
          <span class="hero-gallery-category">${activeSlide.category}</span>
        </header>

        <div class="hero-gallery-identity">
          <p class="hero-gallery-title">${activeSlide.title}</p>
          <ziron-logo></ziron-logo>
        </div>

        <a
          class="hero-gallery-credit"
          href=${activeSlide.photographerProfileUrl}
          target="_blank"
          rel="noreferrer"
        >
          Photo: ${activeSlide.photographerName} / Unsplash
        </a>

        <ziron-gallery-navigation
          .activeIndex=${this.activeIndex}
          .links=${this.links}
          .menuOpen=${this.menuOpen}
          .slideCount=${this.slides.length}
          @gallery-next=${this.showNext}
          @gallery-previous=${this.showPrevious}
          @menu-toggle=${this.toggleMenu}
        ></ziron-gallery-navigation>
      </section>
    `;
  }

  private renderSlide(slide: PortfolioSlide, index: number) {
    const isActive = index === this.activeIndex;

    if (slide.videoUrl && isActive) {
      return html`
        <video
          class="hero-gallery-slide hero-gallery-slide-active"
          src=${slide.videoUrl}
          poster=${slide.imageUrl}
          autoplay
          muted
          loop
          playsinline
          aria-label=${slide.alt}
        ></video>
      `;
    }

    return html`
      <img
        class=${isActive ? 'hero-gallery-slide hero-gallery-slide-active' : 'hero-gallery-slide'}
        src=${slide.imageUrl}
        alt=${isActive ? slide.alt : ''}
        aria-hidden=${String(!isActive)}
        loading=${index === 0 ? 'eager' : 'lazy'}
      />
    `;
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.showPrevious();
    }

    if (event.key === 'ArrowRight') {
      this.showNext();
    }
  }

  private handleTouchStart(event: TouchEvent) {
    if (!window.matchMedia(MOBILE_MEDIA_QUERY).matches) {
      return;
    }

    const touch = event.changedTouches[0];
    this.touchStartX = touch?.clientX ?? null;
    this.touchStartY = touch?.clientY ?? null;
  }

  private handleTouchEnd(event: TouchEvent) {
    if (this.touchStartX === null || this.touchStartY === null) {
      return;
    }

    const touch = event.changedTouches[0];
    const horizontalDistance = (touch?.clientX ?? this.touchStartX) - this.touchStartX;
    const verticalDistance = (touch?.clientY ?? this.touchStartY) - this.touchStartY;
    this.touchStartX = null;
    this.touchStartY = null;

    if (Math.abs(horizontalDistance) < SWIPE_DISTANCE_PX || Math.abs(horizontalDistance) <= Math.abs(verticalDistance)) {
      return;
    }

    if (horizontalDistance < 0) {
      this.showNext();
      return;
    }

    this.showPrevious();
  }

  private showPrevious() {
    this.activeIndex = (this.activeIndex - 1 + this.slides.length) % this.slides.length;
    this.menuOpen = false;
  }

  private showNext() {
    this.activeIndex = (this.activeIndex + 1) % this.slides.length;
    this.menuOpen = false;
  }

  private toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ziron-hero-gallery': ZironHeroGallery;
  }
}
