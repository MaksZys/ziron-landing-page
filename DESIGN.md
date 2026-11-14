# Design System: ZIRON

Strict visual reference for every new ZIRON screen. Engineering, component, and accessibility rules stay in `Agent.md`. If a color, type, layout, or motion choice in `Agent.md` disagrees with this file, this file wins.

ZIRON is a two-person studio. Mateusz Kulesza and Mateusz Radkiewicz film, photograph, and finish marketing material for businesses that run machines - agriculture first, then technical and industrial work. The page’s job is to show that work with the same precision as the equipment, and to make contact the obvious next step.

The audience is an owner or marketing lead at a machinery company. They should recognize their own world in the first screen: a machine, a field, a workshop, a nameplate. They should not recognize a software template.

## 1. Visual Theme & Atmosphere

A machine nameplate, not a campaign site. Density sits in the middle: photographs get air, type is packed. Layouts are offset and split, never centered and never chaotic. Motion is almost still. A control may shift. A photograph may settle. Nothing pulses, floats, or types itself on.

Scores, so later work does not drift:

- Density: 5. One strong frame, then quiet sections.
- Variance: 7. Asymmetric splits. The photograph and the headline occupy different cells.
- Motion: 3. Restrained. One easing curve, no spring, no perpetual loop.

The signature is the nameplate. A display line set in Blinker at weight 700, uppercase, tracking `-0.025rem`, line-height `1`, sitting on Carbon or Ceramic in its own cell. Beside it, one full-height photograph of a machine or a site, desaturated. Instrument Cyan appears on a strict budget. That pairing - stamped metal type next to a quiet photograph - is the only memorable device. Do not add a second one.

Material reference: carbon steel, ceramic instrument housings, engraved serial plates, and the single cyan spark already cut into the ZIRON mark. Not a studio loft, not a newspaper, not a startup dashboard.

## 2. Color Palette & Roles

One cool gray axis. No warm gray mixed into cool gray. No second accent. No pure black. No pure white.

### Principal colors

- **Carbon Ground** (`#080A0C`) - page background, text on Ceramic and on Instrument Cyan, the header rail. Token: `--color-brand-carbon`.
- **Machine Metal** (`#171B1E`) - the panel beside a carbon panel, image fallbacks, quiet alternate sections. Token: `--color-brand-metal`.
- **Ceramic** (`#F7FAFA`) - light section ground, primary text on Carbon, the logo chamber. Token: `--color-brand-ceramic`.
- **Soft White** (`#E9EDEE`) - secondary text on Carbon, the current navigation label. Dimmer than Ceramic so a headline can outrank a label. Token: `--color-brand-soft-white`.
- **Steel** (`#929CA3`) - inactive navigation, captions, helper text, timestamps. Never body paragraphs. Token: `--color-brand-steel`.
- **Instrument Cyan** (`#71D9ED`) - the only accent. Saturation stays under 80%. Token: `--color-brand-cyan`. Map DaisyUI `secondary` to this value. Do not introduce another chromatic color.

### Structural tints

These are mixes of the principal colors for rules and for text that sits on a light or cyan field. They are not a second palette.

- **Cyan Ink** (`#34535E`) - utility labels on an Instrument Cyan field. Token: `--color-brand-cyan-ink`.
- **Field Ink** (`#4A646D`) - utility labels on Ceramic. Token: `--color-brand-field-ink`.
- **Ceramic Seam** (`#A6B0B3`) - 1px rules on Ceramic. Token: `--color-brand-ceramic-seam`.
- **Metal Seam** (`#516066`) - 1px rules on Carbon or Machine Metal, including form underlines. Token: `--color-brand-metal-seam`.
- **Cyan Wash** (`rgb(113 217 237 / 8%)`) - focused field background only. Token: `--color-brand-cyan-wash`.

### Reserved

- **Mark Spark** (`#8CEDFF`) - the cyan path inside `assets/ziron-mark.svg` only. Never a button, headline, border, or hover.

### Banned colors

DaisyUI `primary` blue and `accent` ochre are not part of this system. Do not paint UI with them. Focus on editorial pages uses `currentColor` or Instrument Cyan.

Do not use `#000000`, `#FFFFFF`, `#0A0B0C`, `#F2F4F3`, `#9CA7AA`, or any near-duplicate of the tokens above. Those values already appeared as per-view copies. New work uses the tokens.

### Cyan budget

Instrument Cyan may play at most two roles on a single view. Roles are:

1. One display headline.
2. The single primary button.
3. Utility labels or index numbers.
4. One full-bleed closing band.
5. 1px seams, underlines, and focus rings. This role is free and does not count.

If the view uses a cyan closing band, headlines and buttons inside that band are Carbon on cyan. Ceramic text on cyan fails contrast. Do not stack a cyan headline, a cyan button, and a cyan band in the same view.

Cyan is never a gradient, a glow, a shadow, an icon fill, a hover wash, or a bar thicker than 1px.

### Contrast pairs that are allowed

- Ceramic or Soft White on Carbon Ground.
- Carbon Ground on Ceramic.
- Carbon Ground on Instrument Cyan.
- Cyan Ink on Instrument Cyan, for utility labels only.
- Field Ink on Ceramic, for utility labels only.
- Steel on Carbon, for utility labels and captions only.

Do not communicate state by color alone. The current navigation item is Soft White and is also marked in the accessibility tree. Errors use the theme error color plus a sentence.

## 3. Typography Rules

Two families. No third.

- **Primary, titles and other large text:** Blinker via `--font-sans`. Display uses weight 700. Do not load other Blinker weights.
- **Secondary, descriptions, lists, and controls:** Exo 2 via `--font-body`. `--font-mono` is the same face, kept so existing label selectors stay on the secondary font. The site navigation uses Blinker, same as the titles.

Load only the weights in use: Blinker at 700; Exo 2 at 400, 500, and 700. Do not add a third family. Do not substitute Inter, Geist, Satoshi, Outfit, Cabinet Grotesk, Helvetica, or any serif.

### Roles

| Role | Size | Weight | Tracking | Leading | Case | Face |
| --- | --- | --- | --- | --- | --- | --- |
| Display XL | `clamp(3.5rem, 6.2vw, 8.5rem)` | 700 | `-0.025rem` | 1 | Uppercase | Blinker |
| Display L | `clamp(3rem, 5.7vw, 7rem)` | 700 | `-0.025rem` | 1 | Uppercase | Blinker |
| Display S | `clamp(1.6rem, 2.4vw, 3.4rem)` | 700 | `calc(0.04 * size)` | 1 | Uppercase | Blinker |
| Body | `clamp(1.05rem, 1.55vw, 1.35rem)` | 500 | `calc(-0.025 * size)` | 1.42 | Sentence | Exo 2 |
| Utility | `0.75rem` | 700 | `0.0825rem` | 1.4 | Uppercase | Exo 2 |
| Button | `0.75rem` | 700 | `0.0675rem` | 1 | Uppercase | Exo 2 |
| Site navigation | `0.75rem` | 700 | `0.075rem` | 1 | Uppercase | Blinker |

Mobile display, below `48rem`:

- Display XL: `clamp(2.4rem, 10.6vw, 4.25rem)`
- Display L: `clamp(2rem, 10vw, 3rem)`

Body stays at least `1rem`. Do not set a paragraph below that.

### Measure

- Body max-width: `35rem`. Hard stop: `65ch`.
- A display line is a nameplate, not a sentence. Keep it to a few words. When a line must stay short, cap it near `8ch` to `11ch` and let the body carry the rest.
- Utility text is one line: an eyebrow, a button, a nav label, a caption, an index. Do not set paragraphs in that uppercase label style.

### Language

English, Polish, and German ship together. Size every display line against the longest of the three. Keep large-headline tracking at `-0.025rem` and leading at `1`. Smaller display lines stay at 4% of the font size, in rem, so Polish and German diacritics do not touch the next glyph or the line below. If a translation overflows, lower the clamp ceiling. Do not tighten tracking, hyphenate a display word, or truncate the label. The header may drop nav type to `0.62rem` and tracking to `0.0186rem` below `48rem`, and to `0.0112rem` below `23.5rem`, only so Homepage, Work, About, and Contact still fit. That exception is the header rail, not a new style.

### Hierarchy

Hierarchy comes from size, weight, and placement. Do not add a third color to create it. Keep large-headline tracking at `-0.025rem`. Smaller display lines stay at 4% of the font size, in rem. Do not letter-space body text.

## 4. Component Stylings

Square geometry. Flat surfaces. Radius is `0` on editorial buttons, fields, frames, and sections. Do not import DaisyUI’s pill selector radius into marketing UI. The gallery rail stays square and uses `--stage-control-size` (`4rem`).

Shadows are off, except `--shadow-stage` where a control must separate from a changing photograph. No glass, no noise, no clipped polygons, no nested cards.

### Buttons

One primary button per view. It is the action that continues the job: contact, send, open the piece of work.

- Min-height `3.5rem`. Padding `0.9rem 1rem 0.9rem 1.25rem`. Gap `2rem` between the label and a single arrow glyph (`→`).
- Fill: Instrument Cyan. Label: Carbon Ground. Utility type.
- Hover, only inside `@media (hover: hover) and (pointer: fine)`: fill becomes Ceramic. Transform `translate(0.2rem, -0.2rem)`. Duration `220ms`, easing `--ease-brand`.
- Active: `translate(0.1rem, -0.1rem)`. No glow.
- On a cyan band: fill Carbon, label Ceramic. Hover: fill Ceramic, label Carbon.
- Focus: `2px solid currentColor`, offset `0.3rem`.

The second action is a text link, not a second button. Utility type, Ceramic on Carbon, underline Instrument Cyan at `1px`, offset `0.35rem`. Hover color Instrument Cyan. Pressed and selected controls do not change hue unexpectedly.

Touch targets are at least `44px`. The rail uses `4rem`.

### Text links and navigation

Header labels use the button-and-nav style. Inactive labels are Steel. The current page is Soft White, with `aria-current="page"`. Hover, on a fine pointer only, may turn a resting label Instrument Cyan. Touch must not leave a sticky hover color.

The header is a single rail: mark chamber at `--stage-control-size`, then links aligned to the end. The chamber is square and equal to the rail height. Do not add a wordmark into the hero.

### Rules, lists, and seams

Grouping is spacing plus a 1px rule. Do not add a rule when contrast and space already separate the groups.

- On Ceramic: Ceramic Seam.
- On Carbon or Machine Metal: Metal Seam.
- A photographic contact sheet may use a `1px` Instrument Cyan gap between images. That is a registration seam, not a card border.

Bars thicker than 1px are banned, including a vertical cyan stripe beside a headline.

### Work frames

A frame is a photograph with its caption, not a card.

- Image fills the cell with `object-fit: cover`.
- Treatment, locked: `saturate(0.62) contrast(1.08)`.
- Hover, fine pointer only: `saturate(0.9) contrast(1.04)` and `scale(1.045)` over `700ms`.
- The title sits in the cell’s own solid Carbon or Ceramic padding, or in a solid bar under the image. It does not sit on the photograph.
- A one-line utility caption may sit in the corner of the photograph, padded at least `1rem` from the edges, only when the caption remains readable on that image. If it does not, move the caption out of the image.

Do not build a row of three equal cards with an icon, a title, and a paragraph. Two founder portraits may sit in a 2-up seam, because the studio is two people. A contact sheet of real project photographs may be two or three cells. On viewports below `48rem` every multi-column frame becomes one column.

### Inputs

- Label above the field, utility style, Steel.
- Field: transparent, radius `0`, bottom border `1px` Metal Seam, padding `0.85rem 0`, body type, Ceramic text.
- Focus: border Instrument Cyan, background Cyan Wash. No floating label.
- Error text below the field, in the theme error color, stating what failed and how to correct it.
- Helper text is optional and uses Steel at body size `0.8rem` minimum, sentence case, in Exo 2.
- Textareas start at `min-height: 9rem`.

### Header, footer, logo

- Header background on editorial pages: Carbon at about 82% over scrolling content, solid Carbon on hover, focus-within, and below `48rem`.
- Footer: Carbon, 1px top border at Soft White 20% opacity, utility links. Underline color Instrument Cyan. Hover color Instrument Cyan.
- The mark uses `currentColor` for the metal path (Ceramic in the header) and Mark Spark only for the spark path. Do not recolor it. Do not redraw it. Do not add a second monogram.

### Loading, empty, and error

- Loading a photograph: the cell is Machine Metal at the final aspect ratio. No circular spinner.
- Empty work: one sentence that says no project is selected, plus the primary action that leads to contact. No illustration kit.
- A failed send or a missing image: say what happened and what to do next, in the interface’s voice. Do not apologize, and do not hide the failure behind a toast only.

### Focus

Editorial controls: `2px solid currentColor`, offset `0.3rem`.
Gallery rail controls: an inset ring, because an outer outline is clipped by the rail. Use `box-shadow: inset 0 0 0 var(--spacing-1) var(--color-brand-ceramic)` on Carbon, and the inverse on Ceramic.

## 5. Layout Principles

CSS Grid for the page. Flexbox for a single row of links, a button’s label and arrow, or a footer line. No `calc()` percentage hacks for columns. No `position: absolute` for layout.

Absolute positioning is allowed only for:

- media filling a grid cell (`inset: 0`, `object-fit: cover`)
- a one-line caption pinned inside its own media cell
- visually hidden text
- the full-viewport gallery shade described below

Text blocks are never placed on top of a photograph. The home hero that fades a photograph and sets the headline on the fade is legacy. New heroes do not copy it.

### Page frame

- Minimum width: `--container-minimum` (`20rem`).
- Content max: `--container-content` (`80rem`) when a section must be contained. Full-bleed color bands run edge to edge; the type inside them uses the gutter.
- Copy max: `--container-copy` (`42rem`) for long text. Body lines still stop at `35rem`.
- Gutter: `clamp(1.25rem, 6vw, 7rem)`.
- Section padding block: `clamp(5rem, 10vw, 10rem)`.
- Split gap: `clamp(3rem, 10vw, 11rem)`.
- Full-height sections: `min-height: 100dvh`, or `calc(100dvh - var(--stage-control-size))` when the rail is in the flow. Never `100vh`. Never `h-screen`.

Breakpoints, already tokenized: `40rem`, `48rem`, `64rem`, `80rem`.

- Below `48rem`: one column. No horizontal scroll. No scaled-down desktop row.
- Below `64rem`: editorial splits that were two columns become stacked blocks. The photograph follows the type, or precedes it when the photograph is the subject of that section. Pick one per page and keep it.
- Primary labels stay complete. Drop secondary copy before shrinking a primary label or a touch target.

### Allowed heroes

Split, left type. This is the default.

```text
+---------------------------+---------------------------+
|  utility label            |                           |
|                           |                           |
|  DISPLAY LINE             |      photograph           |
|  DISPLAY LINE             |      of a machine         |
|                           |                           |
|  One or two body lines.   |                           |
|                           |                     slate |
|  [ Primary action ]       |                           |
+---------------------------+---------------------------+
```

The type cell is Carbon Ground or Machine Metal. The photograph cell has no gradient over it. The utility label is Steel. The display line is Ceramic or, if this view spends a cyan role on the headline, Instrument Cyan. One primary action. No second button. No “learn more”.

A contact hero may reverse the weights: a narrower type column (`minmax(16rem, 0.9fr)`) and a wider form column. The form is still a column of fields, not a floating card.

A closing band is a full-bleed Instrument Cyan field, type in Carbon, one primary button in Carbon with a Ceramic label. It is the last section, not a card in the middle of the page.

### Banned layouts

- Centered hero, with or without a gradient.
- Headline with photographs set between the words.
- Text overlapping an image, including a bottom-weighted scrim used as a place to put a title.
- Three equal feature cards.
- A row of icon plus statistic.
- Dashboard metric strips, “by the numbers”, or fabricated performance figures.
- Sticky sidebars, overlapping panels, and absolute-positioned type.

### Gallery stage

The full-viewport gallery is the one place where a photograph fills the screen and interface sits on it. Only the mark and the navigation rail are foreground. Preserve that composition when the work is the gallery itself. Do not reuse the gallery’s overlay treatment on About, Contact, or new editorial sections.

Rail rules that remain in force:

- Carbon surfaces, Ceramic and Soft White labels, Steel for quiet hover on the rail.
- Square controls. The logo chamber matches `--stage-control-size`. Arrows sit flush to the rail end.
- Mobile rail: mark, the full word Explore or Close, previous, next. Desktop: links in the rail, no Explore control.
- One expansion transition. No staggered link entrances.
- Inset focus. Hover styles only for a fine pointer.

## 6. Motion & Interaction

One curve: `--ease-brand`, `cubic-bezier(0.22, 1, 0.36, 1)`. It settles. It does not bounce. Do not replace it with a spring.

- UI color and transform: `--default-transition-duration` (`220ms`).
- Photograph scale and gallery changes: `--duration-gallery` (`700ms`).
- Reduced motion: `--duration-reduced` (`1ms`), one iteration, `scroll-behavior: auto`. Remove the transform. A state change may fade, or it may be instant.

Animate `transform` and `opacity` only. Never `top`, `left`, `width`, or `height`.

Do not orchestrate a page-load sequence. Do not stagger lists. Do not loop a pulse, shimmer, float, or typewriter. The studio’s pictures are the motion. The interface stays put until someone uses it.

Hover rules live inside `@media (hover: hover) and (pointer: fine)`. A tap must not leave a control in the hover color.

## 7. Photography & Copy

### Photographs

Show machines, fields, workshops, sites, and aerial views of that work. People appear when they are the two founders or when they belong to a real, permitted project.

- Source new photographs through the project’s Unsplash rules in `Agent.md`. Attribute the photographer.
- Every informative image has alternative text that names what is in the frame.
- Reserve width and height, or a stable aspect ratio, so the page does not jump.
- Do not use office stock, abstract gradients, `picsum.photos`, or a scraped page URL.
- Do not manufacture a client logo wall. No client is shown until the project has permission and a real caption: who, what was made, and what changed.

### Copy

Write from the reader’s side. Name the deliverable: a film, a set of photographs, aerial footage, the finished cut. Use active verbs. A button says the same thing the result says: Send, then Sent.

The register is plain and specific. Sentence case in body. Uppercase is a property of display and utility type, not a way to make copy sound louder.

Real facts that may be stated, because they are published:

- Mateusz Kulesza (KulasMGM) - film, photography, editing.
- Mateusz Radkiewicz (Radken) - film, drone, post-production.
- `kontakt@ziron.pl`, `+48 694 986 722`.
- Telephone hours 08:00–18:00, reply within 24 hours.

Do not invent prices, package counts, revision rounds, view counts, growth percentages, or client totals. If a number is not in the source, leave it out. Do not fill the gap with `[metric]`.

Banned wording: elevate, seamless, unleash, next-gen, cutting-edge, solutions, synergy, unlock, scroll to explore, swipe down. No emoji. No `Label // 2026` eyebrows. An eyebrow names the section in words: Work, About, Contact.

## 8. Anti-Patterns

These are failures, not suggestions.

- A second accent, a blue focus glow, an ochre highlight, or any use of Mark Spark outside the logo file.
- Per-view copies of the palette (`--about-cyan`, `--contact-ink`, raw hex in a module).
- Pure black, pure white, neon glow, gradient text, glass, noise, or a custom cursor.
- A third typeface, or a substitute for Exo 2 and Blinker.
- Centered heroes, photographs set inside a headline, and text placed on an image.
- Three equal feature cards, icon rows, and invented statistics.
- More than one primary button on a view, or a “Learn more” beside the real action.
- Thick decorative bars, ornamental borders, badges, and clipped shapes.
- Perpetual animation, staggered entrances, spring overshoot, and scroll-jacking.
- `100vh` for a full-height section.
- Uppercase paragraphs. Descriptions and bullet lists stay in Exo 2, sentence case.
- Placeholder names, lorem ipsum, or a fake client.
- Large-headline tracking other than `-0.025rem`, smaller display tracking tighter than 4% of the font size, or utility tracking used on body text. Use `rem` for tracking. Do not use `em`.
- Hover styles that stick after a touch.
- A new visual device - color, shape, icon, shadow, or animation - added while spacing, type, or the mark would have done the job.

## 9. Check before shipping a screen

1. The headline is a nameplate in its own cell, and the photograph is in another.
2. Instrument Cyan plays at most two roles, and none of them is a glow, a gradient, or a thick bar.
3. Every color and every duration comes from the shared theme tokens.
4. Body copy is sentence case, under `35rem`, and readable in English, Polish, and German.
5. There is one primary action, and its label matches the outcome.
6. Below `48rem` the layout is a single column and nothing scrolls sideways.
7. Focus is visible, targets are at least `44px`, and reduced motion removes the movement.
8. Photographs are desaturated with the locked treatment, described in alt text, and attributed.
9. No number, client, or claim was invented to fill a layout.
