import { html, render } from 'lit';

import './styles/index.css';
import './views/home-view';
import './views/project-view';
import './views/about-view';
import './views/contact-view';
import './views/privacy-view';
import { applyLocaleFromUrl, canonicalizeLocaleInUrl } from './localization';

const appRoot = document.querySelector<HTMLElement>('#app');

if (!appRoot) {
  throw new Error('Unable to start ZIRON: the #app root element is missing.');
}

const root = appRoot;

async function start() {
  canonicalizeLocaleInUrl();
  await applyLocaleFromUrl();

  const requestedView = new URLSearchParams(window.location.search).get('view');

  render(
    requestedView === 'project'
      ? html`<project-view></project-view>`
      : requestedView === 'about'
        ? html`<about-view></about-view>`
        : requestedView === 'contact'
          ? html`<contact-view></contact-view>`
          : requestedView === 'privacy'
            ? html`<privacy-view></privacy-view>`
          : html`<home-view></home-view>`,
    root,
  );
}

window.addEventListener('popstate', () => {
  canonicalizeLocaleInUrl();
  void applyLocaleFromUrl();
});

void start();
