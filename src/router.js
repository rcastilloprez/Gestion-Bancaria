// src/router.js — enrutador SPA basado en hash (#/ruta)

import EventBus  from './events/EventBus.js';
import { ROUTES } from '../config/constants.js';

const Router = (() => {
  const routes = {};
  let root = null;

  const add = (path, renderFn) => {
    routes[path] = renderFn;
  };

  const navigate = (path) => {
    window.location.hash = path;
  };

  const resolve = async () => {
    const path = window.location.hash.slice(1) || ROUTES.DASHBOARD;

    EventBus.emit('router:beforeNavigate', { path });
    root.innerHTML = '';

    const handler = routes[path];
    if (handler) {
      await handler(root);
    } else {
      root.innerHTML = `<div style="padding:2rem"><h2>Página no encontrada: ${path}</h2></div>`;
    }

    EventBus.emit('router:afterNavigate', { path });
  };

  const start = (rootEl) => {
    root = rootEl;
    window.addEventListener('hashchange', () => resolve());
    resolve();
  };

  const getCurrentPath = () => window.location.hash.slice(1) || ROUTES.DASHBOARD;

  return { add, navigate, start, getCurrentPath };
})();

export default Router;
