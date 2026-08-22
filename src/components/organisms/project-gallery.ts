import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';
import { msg } from '@lit/localize';

import type { UnsplashImage } from '../../content/portfolio';
import '../atoms/arrow-button';
import styles from './project-gallery.module.css';

const SWIPE_DISTANCE_PX = 48;
const PREVIEW_TRANSITION_DURATION_MS = 480;

@customElement('project-gallery')
export class ProjectGallery extends LitElement {
  @property({ attribute: false })
  images: UnsplashImage[] = [];

  @state()
  private activeIndex: number | null = null;

  @state()
  private navigationDirection: 'backward' | 'forward' = 'forward';

  private lastFocusedElement: HTMLElement | null = null;
  private isAnimating = false;
  private previousBodyOverflow = '';
  private touchStartX: number | null = null;
  private touchStartY: number | null = null;

  protected override createRenderRoot() {
    return this;
  }

  protected override render() {
    const activeImage =
      this.activeIndex === null ? undefined : this.images[this.activeIndex];

    return html`
      <section
        class=${styles.gallery}
        aria-label=${msg('Project gallery', { id: 'gallery.label' })}
      >
        ${this.images.map(
          (image, index) => html`
            <figure class=${`${styles.figure} ${styles[`image${index + 1}`] ?? ''}`}>
              <button
                class=${styles.openButton}
                type="button"
                data-gallery-index=${index}
                aria-label=${`${msg('Open image', { id: 'gallery.openImage' })} ${index + 1}: ${image.alt}`}
                @click=${(event: MouseEvent) => this.openImage(index, event)}
              >
                <img
                  class=${styles.image}
                  src=${image.imageUrl}
                  alt=${image.alt}
                  loading=${index < 2 ? 'eager' : 'lazy'}
                />
              </button>
              <figcaption class=${styles.credit}>
                <a href=${image.sourceUrl} target="_blank" rel="noreferrer">
                  ${msg('Photo', { id: 'gallery.photo' })}: ${image.photographerName} / Unsplash
                </a>
              </figcaption>
            </figure>
          `,
        )}
      </section>

      <dialog
        class=${styles.lightbox}
        aria-label=${msg('Image preview', { id: 'gallery.preview' })}
        @cancel=${this.handleCancel}
        @click=${this.handleBackdropClick}
        @keydown=${this.handleKeyDown}
        @pointerdown=${this.handlePointerDown}
        @pointerup=${this.handlePointerUp}
      >
        ${activeImage && this.activeIndex !== null
          ? html`
              <div class=${styles.preview}>
                ${keyed(
                  activeImage.id,
                  html`
                    <img
                      class=${`${styles.previewImage} ${
                        this.navigationDirection === 'forward'
                          ? styles.previewForward
                          : styles.previewBackward
                      }`}
                      src=${activeImage.imageUrl}
                      alt=${activeImage.alt}
                    />
                  `,
                )}

                <div class=${styles.previewMeta}>
                  <span aria-live="polite">
                    ${String(this.activeIndex + 1).padStart(2, '0')} /
                    ${String(this.images.length).padStart(2, '0')}
                  </span>
                  <a href=${activeImage.sourceUrl} target="_blank" rel="noreferrer">
                    ${activeImage.photographerName} / Unsplash
                  </a>
                </div>
              </div>

              <button
                class=${styles.closeButton}
                type="button"
                aria-label=${msg('Close image preview', { id: 'gallery.closePreview' })}
                @click=${this.closeImage}
              >
                <span aria-hidden="true"></span>
              </button>

              <gallery-arrow
                class=${`${styles.galleryButton} ${styles.previousButton}`}
                direction="previous"
                label=${msg('Previous image', { id: 'gallery.previousImage' })}
                @click=${this.handlePreviousClick}
              ></gallery-arrow>
              <gallery-arrow
                class=${`${styles.galleryButton} ${styles.nextButton}`}
                label=${msg('Next image', { id: 'gallery.nextImage' })}
                @click=${this.handleNextClick}
              ></gallery-arrow>
            `
          : ''}
      </dialog>
    `;
  }

  override disconnectedCallback() {
    this.restoreBodyOverflow();
    super.disconnectedCallback();
  }

  private async openImage(index: number, event: MouseEvent) {
    if (this.isAnimating) {
      return;
    }

    const source =
      event.currentTarget instanceof HTMLElement ? event.currentTarget : null;

    if (!source) {
      return;
    }

    this.isAnimating = true;
    this.lastFocusedElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this.navigationDirection = 'forward';
    const sourceRect = source.getBoundingClientRect();

    this.activeIndex = index;
    await this.updateComplete;

    const dialog = this.querySelector<HTMLDialogElement>(`.${styles.lightbox}`);

    if (dialog && !dialog.open) {
      this.previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      await this.animatePreview(sourceRect, false);
    }

    this.isAnimating = false;
  }

  private async closeImage() {
    if (this.activeIndex === null || this.isAnimating) {
      return;
    }

    this.isAnimating = true;
    const target = this.querySelector<HTMLElement>(
      `[data-gallery-index="${this.activeIndex}"]`,
    );

    if (target) {
      const targetImage = target.querySelector<HTMLImageElement>('img');
      await this.animatePreview(
        targetImage?.getBoundingClientRect() ?? target.getBoundingClientRect(),
        true,
      );
    }

    const dialog = this.querySelector<HTMLDialogElement>(`.${styles.lightbox}`);
    dialog?.close();
    dialog?.style.removeProperty('background-color');
    this.activeIndex = null;
    await this.updateComplete;
    this.restoreBodyOverflow();
    this.lastFocusedElement?.focus();
    this.lastFocusedElement = null;
    this.isAnimating = false;
  }

  private showPrevious() {
    this.showImageAtOffset(-1);
  }

  private showNext() {
    this.showImageAtOffset(1);
  }

  private showImageAtOffset(offset: number) {
    if (this.activeIndex === null || this.images.length === 0) {
      return;
    }

    this.navigationDirection = offset > 0 ? 'forward' : 'backward';
    this.activeIndex =
      (this.activeIndex + offset + this.images.length) % this.images.length;
  }

  private handleCancel(event: Event) {
    event.preventDefault();
    this.closeImage();
  }

  private handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeImage();
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.showPrevious();
    }

    if (event.key === 'ArrowRight') {
      this.showNext();
    }
  }

  private handlePointerDown(event: PointerEvent) {
    const isControl = event
      .composedPath()
      .some(
        (target) =>
          target instanceof Element &&
          target.matches('button, a, gallery-arrow'),
      );

    if (
      isControl ||
      !event.isPrimary ||
      (event.pointerType === 'mouse' && event.button !== 0)
    ) {
      this.touchStartX = null;
      this.touchStartY = null;
      return;
    }

    this.touchStartX = event.clientX;
    this.touchStartY = event.clientY;

    if (event.currentTarget instanceof Element) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  }

  private handlePointerUp(event: PointerEvent) {
    if (this.touchStartX === null || this.touchStartY === null) {
      return;
    }

    const horizontalDistance = event.clientX - this.touchStartX;
    const verticalDistance = event.clientY - this.touchStartY;
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

  private handlePreviousClick(event: Event) {
    event.stopPropagation();
    this.showPrevious();
  }

  private handleNextClick(event: Event) {
    event.stopPropagation();
    this.showNext();
  }

  private async animatePreview(targetRect: DOMRect, isClosing: boolean) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const dialog = this.querySelector<HTMLDialogElement>(`.${styles.lightbox}`);
    const previewImage = this.querySelector<HTMLImageElement>(
      `.${styles.previewImage}`,
    );

    if (!dialog || !previewImage) {
      return;
    }

    if (isClosing) {
      await this.animateClosingPreview(dialog, previewImage, targetRect);
      return;
    }

    const previewRect = previewImage.getBoundingClientRect();
    const horizontalOffset =
      targetRect.left +
      targetRect.width / 2 -
      (previewRect.left + previewRect.width / 2);
    const verticalOffset =
      targetRect.top +
      targetRect.height / 2 -
      (previewRect.top + previewRect.height / 2);
    const horizontalScale = targetRect.width / previewRect.width;
    const verticalScale = targetRect.height / previewRect.height;
    const thumbnailTransform = `translate(${horizontalOffset}px, ${verticalOffset}px) scale(${horizontalScale}, ${verticalScale})`;
    const imageFrames = [
      { transform: thumbnailTransform },
      { transform: 'none' },
    ];
    const dialogFrames = [{ opacity: 0 }, { opacity: 1 }];
    const timing = {
      duration: PREVIEW_TRANSITION_DURATION_MS,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'forwards' as const,
    };

    const imageAnimation = previewImage.animate(imageFrames, timing);
    const dialogAnimation = dialog.animate(dialogFrames, {
      ...timing,
      duration: Math.round(PREVIEW_TRANSITION_DURATION_MS * 0.65),
    });

    await Promise.all([imageAnimation.finished, dialogAnimation.finished]);
  }

  private async animateClosingPreview(
    dialog: HTMLDialogElement,
    previewImage: HTMLImageElement,
    targetRect: DOMRect,
  ) {
    const previewRect = previewImage.getBoundingClientRect();
    const horizontalOffset =
      targetRect.left +
      targetRect.width / 2 -
      (previewRect.left + previewRect.width / 2);
    const verticalOffset =
      targetRect.top +
      targetRect.height / 2 -
      (previewRect.top + previewRect.height / 2);
    const horizontalScale = targetRect.width / previewRect.width;
    const verticalScale = targetRect.height / previewRect.height;
    const transitionImage = previewImage.cloneNode(true) as HTMLImageElement;
    transitionImage.className = styles.transitionImage;
    transitionImage.setAttribute('aria-hidden', 'true');
    Object.assign(transitionImage.style, {
      left: `${previewRect.left}px`,
      top: `${previewRect.top}px`,
      width: `${previewRect.width}px`,
      height: `${previewRect.height}px`,
    });
    dialog.append(transitionImage);
    previewImage.style.visibility = 'hidden';

    const closingTransform = `translate3d(${horizontalOffset}px, ${verticalOffset}px, 0) scale(${horizontalScale}, ${verticalScale})`;
    const timing = {
      duration: PREVIEW_TRANSITION_DURATION_MS,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards' as const,
    };
    const imageAnimation = transitionImage.animate(
      [{ transform: 'translate3d(0, 0, 0) scale(1)' }, { transform: closingTransform }],
      timing,
    );
    const backgroundAnimation = dialog.animate(
      [
        { backgroundColor: getComputedStyle(dialog).backgroundColor },
        { backgroundColor: 'transparent' },
      ],
      timing,
    );
    const interfaceAnimations = [
      ...dialog.querySelectorAll<HTMLElement>(
        `.${styles.previewMeta}, .${styles.closeButton}, .${styles.galleryButton}`,
      ),
    ].map((element) =>
      element.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: Math.round(PREVIEW_TRANSITION_DURATION_MS * 0.35),
        easing: 'linear',
        fill: 'forwards',
      }),
    );
    let didFinish = false;

    try {
      await Promise.all([
        imageAnimation.finished,
        backgroundAnimation.finished,
        ...interfaceAnimations.map((animation) => animation.finished),
      ]);
      didFinish = true;
    } finally {
      if (didFinish) {
        dialog.style.backgroundColor = 'transparent';
      } else {
        interfaceAnimations.forEach((animation) => animation.cancel());
      }

      backgroundAnimation.cancel();
      previewImage.style.visibility = '';
      transitionImage.remove();
    }
  }

  private restoreBodyOverflow() {
    document.body.style.overflow = this.previousBodyOverflow;
    this.previousBodyOverflow = '';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'project-gallery': ProjectGallery;
  }
}
