import { render } from 'lit';

import './styles/index.css';
import { renderHomeView } from './views/home-view';

const appRoot = document.querySelector<HTMLElement>('#app');

if (!appRoot) {
  throw new Error('Unable to start ZIRON: the #app root element is missing.');
}

render(renderHomeView(), appRoot);
