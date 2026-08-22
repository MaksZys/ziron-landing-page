import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { msg } from '@lit/localize';

import type { PortfolioSlide } from "../content/portfolio";
import { PRIMARY_NAVIGATION } from "../content/navigation";
import { PORTFOLIO_SLIDES } from "../content/portfolio.generated";
import "../components/atoms/logo";
import "../components/molecules/gallery-navigation";
import styles from "./home-view.module.css";

const MOBILE_MEDIA_QUERY = "(max-width: 47.999rem)";
const SWIPE_DISTANCE_PX = 48;

@customElement("home-view")
export class HomeView extends LitElement {
  @state()
  private activeIndex = 0;

  @state()
  private isMenuOpen = false;

  private touchStartX: number | null = null;
  private touchStartY: number | null = null;

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    const activeSlide = PORTFOLIO_SLIDES[this.activeIndex];

    if (!activeSlide) {
      return html`<main class=${`${styles.homeView} ${styles.empty}`}>
        ${msg('Portfolio media is unavailable.', { id: 'home.mediaUnavailable' })}
      </main>`;
    }

    return html`
      <main
        id="top"
        class=${styles.homeView}
        aria-roledescription="carousel"
        aria-label=${msg('Selected ZIRON work', { id: 'home.selectedWork' })}
        tabindex="0"
        @keydown=${this.handleKeyDown}
        @touchstart=${this.handleTouchStart}
        @touchend=${this.handleTouchEnd}
      >
        <div class=${styles.media} aria-live="polite">
          ${PORTFOLIO_SLIDES.map((slide, index) =>
            this.renderSlide(slide, index),
          )}
        </div>
        <div class=${styles.scrim} aria-hidden="true"></div>

        <div class=${styles.controls}>
          <brand-logo class=${styles.identity}></brand-logo>

          <gallery-navigation
            class=${styles.navigation}
            .links=${PRIMARY_NAVIGATION}
            .menuOpen=${this.isMenuOpen}
            @gallery-next=${this.showNext}
            @gallery-previous=${this.showPrevious}
            @menu-toggle=${this.toggleMenu}
          ></gallery-navigation>
        </div>
      </main>
    `;
  }

  private renderSlide(slide: PortfolioSlide, index: number) {
    const isActive = index === this.activeIndex;
    const slideClass = isActive
      ? `${styles.slide} ${styles.slideActive}`
      : styles.slide;

    if (slide.videoUrl && isActive) {
      return html`
        <video
          class=${slideClass}
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
        class=${slideClass}
        src=${slide.imageUrl}
        alt=${isActive ? slide.alt : ""}
        aria-hidden=${String(!isActive)}
        loading=${index === 0 ? "eager" : "lazy"}
      />
    `;
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowLeft") {
      this.showPrevious();
    }

    if (event.key === "ArrowRight") {
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
    const horizontalDistance =
      (touch?.clientX ?? this.touchStartX) - this.touchStartX;
    const verticalDistance =
      (touch?.clientY ?? this.touchStartY) - this.touchStartY;
    this.touchStartX = null;
    this.touchStartY = null;

    if (
      Math.abs(horizontalDistance) < SWIPE_DISTANCE_PX ||
      Math.abs(horizontalDistance) <= Math.abs(verticalDistance)
    ) {
      return;
    }

    if (horizontalDistance < 0) {
      this.showNext();
      return;
    }

    this.showPrevious();
  }

  private showPrevious() {
    this.activeIndex =
      (this.activeIndex - 1 + PORTFOLIO_SLIDES.length) %
      PORTFOLIO_SLIDES.length;
    this.isMenuOpen = false;
  }

  private showNext() {
    this.activeIndex = (this.activeIndex + 1) % PORTFOLIO_SLIDES.length;
    this.isMenuOpen = false;
  }

  private toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "home-view": HomeView;
  }
}
