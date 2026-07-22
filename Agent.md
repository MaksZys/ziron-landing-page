# ZIRON Landing Page — Agent Guidance

> Direction: build a mobile-first portfolio demo from small, reusable Lit components. Use Tailwind CSS and DaisyUI through one shared theme, keep every implementation choice compatible with static GitHub Pages hosting, and treat the demo as a source of components that may later move into the production project.

## 1. Purpose

Create a polished portfolio landing page for **ZIRON**, a company presented through automotive, motorcycle, machinery, and engineering imagery.

This repository is a demo, but its components must be production-minded:

- Make components small, focused, and reusable.
- Keep content separate from presentation whenever practical.
- Avoid page-specific behavior inside reusable components.
- Prefer composition over large components with many modes.
- Do not add abstractions for hypothetical future requirements.
- Preserve static-site compatibility. The app must work without a server runtime.

## 2. Required Technology

- Use **Lit** and TypeScript for reusable web components.
- Use **Tailwind CSS** for utility styling.
- Use **DaisyUI** for suitable primitives and theme integration.
- Use **npm** as the package manager.
- Use the repository's existing build tool and scripts when present. If no build tool exists, prefer Vite because it supports Lit and static builds cleanly.
- Do not introduce a second component framework or styling system.
- Do not replace a DaisyUI primitive with a custom implementation unless the required behavior cannot be achieved accessibly with that primitive.

Before using a package API, verify it against the installed package version or official documentation. Do not invent dependencies, configuration keys, component APIs, or scripts.

## 3. Project Structure

All new UI components must live under `src/components/` in exactly one Atomic Design category:

```text
src/
  components/
    atoms/
    molecules/
    organisms/
  views/
  content/
  styles/
  assets/
```

If the established source root differs, preserve it but keep the same relative organization.

### Atoms

Atoms are the smallest useful visual or interactive units. They must not depend on molecules, organisms, or views.

Examples:

- Brand mark
- Icon button
- Text link
- Section eyebrow
- Heading
- Image
- Badge
- Divider
- Pagination dot

### Molecules

Molecules combine a small number of atoms into one focused control or content unit. They may depend on atoms, but never on organisms or views.

Examples:

- Navigation link group
- Project summary card
- Gallery thumbnail
- Image controls
- Contact link group
- Metric or capability item

### Organisms

Organisms combine molecules and atoms into complete page sections. They must remain reusable and receive content through properties or structured data rather than importing view-specific copy.

Examples:

- Site header
- Hero section
- Portfolio gallery
- Project showcase
- Capabilities section
- About section
- Contact section
- Site footer
- Image lightbox

### Views

Place page-level composition in `src/views/`.

Views may:

- Arrange organisms into a complete page.
- Own page-level content selection and routing state.
- Coordinate transitions between page sections or routes.

Views must not:

- Reimplement atoms, molecules, or organisms.
- Contain large reusable UI fragments.
- Hide reusable business or interaction logic in the page template.

Dependency direction is one-way:

```text
views -> organisms -> molecules -> atoms
```

Never import upward or create circular dependencies.

## 4. Component Rules

- Create one primary Lit component per file.
- Name files and custom element tags after their responsibility.
- Prefix custom element tags consistently, for example `ziron-button` and `ziron-gallery`.
- Use named class exports unless an established local convention requires otherwise.
- Define properties and events as typed public APIs.
- Keep internal reactive state private.
- Use properties for parent-to-child input and custom events for child-to-parent communication.
- Custom events must use stable, domain-specific names and include typed detail objects when carrying data.
- Components must not query or mutate unrelated global DOM.
- Keep rendering and interaction in components; move substantial transformation or state-machine logic into focused modules.
- Do not place application copy, project records, or image lists directly inside reusable components.
- Prefer slots for flexible presentational content and typed properties for structured behavior.
- Avoid boolean combinations that permit contradictory states. Use a discriminated state or explicit variant when necessary.
- Do not add a property or variant until a real call site needs it.
- Preserve native HTML semantics inside components.

### Styling Lit Components

Tailwind and DaisyUI utilities must be able to reach rendered markup. Follow the project's established Lit styling strategy. If none exists, render presentational components into the light DOM so the single compiled Tailwind/DaisyUI stylesheet applies consistently.

When using light DOM:

- Keep selectors scoped through component markup and class names.
- Do not rely on global element selectors for component-specific styling.
- Avoid component internals that can be accidentally selected by unrelated page CSS.

Do not mix light-DOM and shadow-DOM styling strategies without documenting the reason. If a component requires Shadow DOM, provide its styles through a verified shared stylesheet strategy rather than assuming global Tailwind classes cross the shadow boundary.

## 5. Theme and Design Tokens

Create one named ZIRON theme and reuse it everywhere. Configure shared values in the Tailwind/DaisyUI theme layer and, where runtime access is needed, expose matching CSS custom properties.

The theme must define all reusable design decisions:

- Brand, surface, content, accent, neutral, success, warning, and error colors
- Typography families, weights, sizes, and line heights
- Spacing scale
- Container widths and horizontal gutters
- Border widths
- Corner radii
- Shadows
- Opacity levels
- Breakpoints
- Z-index layers
- Transition durations
- Transition timing functions
- Motion distances
- Image aspect ratios used by the portfolio

### No Random Values

Never add arbitrary visual values in templates or styles. This includes:

- Tailwind arbitrary values such as `w-[37px]`, `text-[#123456]`, or `duration-[275ms]`
- One-off hex, RGB, HSL, or OKLCH colors
- Unregistered pixel sizes
- Unregistered shadows, radii, opacity, z-index, transition, or easing values
- Inline style values used only to bypass the theme

If the design needs a value that does not exist, add a semantically named token to the shared theme first, then use that token. A value should represent a repeatable design decision, not a single screenshot measurement.

Exceptions are limited to values that are inherently data-driven, such as a calculated swipe transform or image focal position. Keep those values in typed component logic or CSS custom properties and derive them from interaction state, not visual guesswork.

Prefer semantic DaisyUI theme roles such as `primary`, `secondary`, `accent`, `base-*`, and their content colors over raw palette colors.

## 6. Visual Direction

The site should feel precise, engineered, and premium rather than like a generic template.

- Let portfolio imagery carry the visual weight.
- Use strong editorial typography and deliberate spacing.
- Keep decorative elements purposeful and theme-driven.
- Maintain clear contrast between content, controls, and backgrounds.
- Use a consistent image treatment across projects.
- Avoid ornamental cards, gradients, glows, or badges unless they support the chosen design direction.
- Use DaisyUI components as accessible foundations, then apply the ZIRON theme consistently.

Do not use placeholder text in completed sections. Example portfolio content may be fictional, but it should be credible and clearly presented as demonstration content where ambiguity matters.

## 7. Responsive and Mobile-First Behavior

Start every component with the smallest supported viewport. Add larger breakpoint behavior only when the content needs it.

- Do not build a desktop layout and patch it for mobile.
- Ensure the page works at narrow phone widths without horizontal overflow.
- Use responsive type, spacing, grids, and media sizes from theme tokens.
- Keep primary actions reachable and readable on touch devices.
- Give interactive targets an accessible touch size defined by the theme.
- Use `srcset`, `sizes`, or equivalent responsive image behavior where available.
- Reserve image dimensions or aspect ratios to prevent layout shift.
- Test long headings, short headings, missing optional copy, and different image orientations.
- Navigation must remain keyboard accessible and usable without hover.
- Hover may enhance an interaction but must never be required to discover or operate it.

## 8. Portfolio Images and Content

Use free and open-source or permissively licensed imagery related to:

- Cars and automotive design
- Motorcycles and motorsport
- Engines, mechanical components, and workshops
- Industrial machines and precision manufacturing

Rules for assets:

- When the project needs a photograph, source it through the official Unsplash API. Do not substitute an unrelated image provider or scrape Unsplash pages.
- Follow the current [Unsplash API documentation](https://unsplash.com/documentation), API terms, and API guidelines at implementation time.
- Use the Unsplash API only while selecting or preparing portfolio content. Copy the chosen photo's direct CDN URL from the API response under `photo.urls` into the typed static content record; do not construct an image URL from a photo-page URL, download the file, or rehost it. Preserve the returned `ixid` parameter when resizing or transforming the CDN URL.
- The deployed GitHub Pages application must render the persisted direct image URLs and must not call `api.unsplash.com` at page load or during user interaction.
- Attribute both Unsplash and the photographer wherever an Unsplash image is displayed, with links to the photographer's Unsplash profile and the image page as required by the current guidelines.
- The portfolio's normal image display, gallery navigation, and lightbox behavior are not runtime API operations. If a future interaction counts as a download or comparable selection under the current Unsplash guidelines, it cannot be added to this static deployment until its required tracking call is supported without violating the no-runtime-API requirement.
- Persist only the API response fields required by the UI, including the photo ID, responsive image URLs, dimensions, description/alt text, photographer name, photographer profile URL, image page URL, and download-location URL when applicable.
- Optimize images for the web and generate only the sizes the design needs.
- Request suitable responsive dimensions and browser-supported formats through the parameters supported by Unsplash's image CDN.
- Supply meaningful alternative text for informative images.
- Use empty alternative text only for genuinely decorative images.
- Do not use copyrighted manufacturer marketing assets without a compatible license.

### Unsplash Environment Variables

The local `.env` file contains these required variables:

- `UNSPLASH_APP_ID`
- `UNSPLASH_ACCESS_KEY`
- `UNSPLASH_SECRET_KEY`

Agents and tools must follow these rules:

- Code may reference these exact environment-variable names and allow the runtime or build tooling to resolve their values.
- Never open, read, print, echo, log, copy, summarize, or expose the values from `.env`.
- Never commit `.env` or place any of its values in source code, generated static assets, test fixtures, screenshots, documentation, URLs, or command output.
- Never pass credential values directly in a shell command. Let application code read them from its environment.
- Validate that required variables exist without including their values in an error message.
- `UNSPLASH_SECRET_KEY` is confidential and must never be included in browser code or a GitHub Pages bundle.
- Do not expose `UNSPLASH_APP_ID` or `UNSPLASH_ACCESS_KEY` through a client-prefixed build variable merely to make it accessible in the browser.
- Because GitHub Pages is a public static host, use the API in a local or trusted content-preparation step, then store only the chosen photos' returned public CDN URLs and attribution metadata in typed content committed with the application.
- Do not add runtime Unsplash search, random-photo loading, API refreshes, or any other request to `api.unsplash.com`. Changing the selected photos requires rerunning the trusted content-preparation step and rebuilding the static site.
- If a future feature genuinely requires authenticated runtime API requests or OAuth, it requires a separate server-side proxy or backend. Do not weaken this boundary to keep the site static.
- Handle missing credentials and Unsplash API failures explicitly. Do not silently fall back to unapproved image sources.

Keep portfolio records in a typed content module under `src/content/`. A record may include only fields required by actual UI, such as title, category, summary, images, alt text, attribution, and optional project link.

## 9. Interaction and Motion

Motion must communicate navigation, selection, expansion, or continuity. Do not animate merely to decorate the page.

All duration, easing, opacity, distance, and scale values must come from theme tokens.

### Swipe Gallery

- Support touch and pointer gestures.
- Support previous/next buttons so swiping is never the only control.
- Support keyboard navigation when the gallery has focus.
- Use an intentional swipe threshold derived from component dimensions or a theme token.
- Distinguish horizontal gallery gestures from normal vertical page scrolling.
- Do not block vertical scrolling before horizontal intent is established.
- Clamp or loop gallery navigation according to an explicit component API.
- Announce the current slide and total slide count accessibly.
- Keep the active image state owned by the smallest component that coordinates the gallery.

### Image Maximization / Lightbox

- Open the selected image when its interactive preview is activated.
- Use a real button for the preview action or provide equivalent semantic button behavior.
- Provide a visible close control.
- Close on `Escape`.
- Trap focus while the modal is open and restore focus to the opener on close.
- Prevent background interaction and scrolling while open.
- Provide accessible dialog labeling.
- Preserve the selected image and caption when moving between gallery and lightbox.
- Allow next/previous navigation in the lightbox when multiple images belong to the project.

### Page and View Transitions

- Prefer progressive enhancement with the View Transitions API when it fits the chosen navigation model.
- Provide a non-animated fallback when the API is unavailable.
- Do not require client-side routing for a single-page landing page.
- If multiple routes are introduced, ensure direct URL loads and refreshes work on GitHub Pages, or use a hash-based strategy that does not require server rewrites.
- Keep transitions interruptible and avoid delaying navigation for decorative motion.

### Reduced Motion

Respect `prefers-reduced-motion: reduce` everywhere.

- Remove non-essential motion.
- Replace movement-heavy transitions with an immediate state change or short opacity change from the theme.
- Do not autoplay motion that cannot be stopped.

Clean up all pointer listeners, keyboard listeners, timers, animation handles, and observers when a component disconnects.

## 10. Accessibility

Accessibility is part of component correctness.

- Use semantic landmarks: `header`, `nav`, `main`, `section`, and `footer`.
- Maintain a logical heading hierarchy.
- Use buttons for actions and anchors for navigation.
- Provide visible focus states using theme tokens.
- Ensure the entire experience is operable by keyboard.
- Label icon-only controls.
- Associate form labels and messages correctly if a form is added.
- Do not communicate state through color alone.
- Maintain sufficient text, control, and focus contrast.
- Use ARIA only when native HTML cannot express the behavior.
- Announce relevant gallery and navigation changes without creating noisy live regions.
- Make focus order follow the visual and reading order.

## 11. Performance

- Keep the initial page lightweight.
- Lazy-load below-the-fold portfolio images.
- Do not lazy-load the primary hero image if it is the likely largest contentful paint element.
- Avoid layout shifts by declaring image dimensions or aspect ratios.
- Avoid shipping unused icon libraries, fonts, DaisyUI themes, or large animation libraries.
- Prefer CSS transitions and the platform's animation APIs for the required interactions.
- Do not add an animation dependency until native CSS and browser APIs are demonstrably insufficient.
- Pause or stop expensive offscreen work.
- Avoid unnecessary Lit updates; derive values during render unless state must persist.

## 12. GitHub Pages Deployment

The production build must be a static directory suitable for GitHub Pages.

- Configure the build base path for a project site hosted at `/<repository-name>/`.
- Do not hardcode root-relative asset paths such as `/assets/...` when they would bypass the repository base path.
- Use build-tool URL handling for imported images and other assets.
- Keep source paths and filename casing compatible with Linux hosts.
- Do not require server-side rendering, server functions, private environment variables, or rewrite rules.
- Ensure the production build works when served from a subdirectory, not only from `/`.
- Keep a deployment script or GitHub Actions workflow small and based on official GitHub Pages actions when deployment automation is added.
- Build before deployment and publish only the generated output directory.
- Do not commit secrets or deployment tokens. Prefer GitHub's built-in Pages permissions.

If routing is added, verify that direct navigation, refresh, asset loading, and browser history behave correctly on GitHub Pages.

## 13. npm and Dependency Discipline

- Use npm commands and preserve `package-lock.json`.
- Do not create or modify another package-manager lockfile.
- Reuse installed dependencies before adding new ones.
- Add a dependency only when it solves a current requirement better than the browser platform or existing packages.
- Put runtime packages in `dependencies` and build/test-only packages in `devDependencies`.
- Do not use CDN scripts for Lit, Tailwind, DaisyUI, or application code when the project has an npm build.
- Keep scripts explicit and conventional: development, build, preview, type checking, linting, and testing only when the corresponding tools exist.

## 14. Quality and Verification

Before declaring a change complete:

1. Confirm every new component is in `atoms`, `molecules`, or `organisms`.
2. Confirm dependency direction remains `views -> organisms -> molecules -> atoms`.
3. Confirm new visual values come from the shared theme.
4. Confirm behavior works at mobile size first and does not overflow.
5. Confirm controls work with keyboard and touch/pointer input.
6. Confirm motion honors reduced-motion preferences.
7. Confirm images have appropriate alt text, dimensions, optimization, and attribution.
8. Confirm the production build uses the GitHub Pages base path correctly.
9. Run the smallest relevant existing checks in this order: type check, lint, then targeted tests.
10. Run the production build for changes that affect components, styles, assets, routing, or deployment.

Use existing repository scripts. Do not suppress TypeScript, lint, accessibility, or test failures to force a pass. If a check cannot run or fails for an unrelated existing reason, report that precisely.

## 15. Scope Discipline

- Make the smallest safe change that satisfies the current task.
- Do not refactor unrelated components while adding a feature.
- Do not create generic `utils`, `helpers`, or `common` directories for a single function.
- Do not duplicate theme values in component files.
- Do not create a large universal component controlled by many unrelated properties.
- Do not add a router, state library, animation framework, carousel package, or icon package without a demonstrated need.
- Do not edit generated output by hand.
- Do not weaken accessibility or error handling for demo speed.
- Do not claim completion without performing the applicable verification.

When a requirement conflicts with an established repository pattern, preserve correctness and local consistency, then document the deliberate deviation in the change rationale.
