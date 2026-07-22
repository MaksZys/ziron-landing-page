import { html, render } from 'lit';

import './styles/index.css';
import './views/home-view';

const appRoot = document.querySelector<HTMLElement>('#app');

if (!appRoot) {
  throw new Error('Unable to start ZIRON: the #app root element is missing.');
}

render(html`<home-view></home-view>`, appRoot);
