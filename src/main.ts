import { html, render } from 'lit';

import './styles/index.css';
import './views/home-view';
import './views/project-view';
import './views/about-view';

const appRoot = document.querySelector<HTMLElement>('#app');

if (!appRoot) {
  throw new Error('Unable to start ZIRON: the #app root element is missing.');
}

const requestedView = new URLSearchParams(window.location.search).get('view');

render(
  requestedView === 'project'
    ? html`<project-view></project-view>`
    : requestedView === 'about'
      ? html`<about-view></about-view>`
      : html`<home-view></home-view>`,
  appRoot,
);
