import { route } from './router.js';
import { menu } from './src/views/menu.js';

// https://en.wikipedia.org/wiki/Domino_Tiles

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('menu').innerHTML = menu();

  route(window.location.hash);

  window.addEventListener('hashchange', () => {
    route(window.location.hash);
  });
});