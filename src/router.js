// src/router.js — enrutador SPA basado en hash (#/ruta)
// Uso: Router.add('/dashboard', DashboardPage.render)  |  Router.start(root)

import EventBus from './events/EventBus.js';
import { ROUTES } from '../config/constants.js';

// Importa las páginas aquí cuando las crees:
// import DashboardPage    from './pages/Dashboard/DashboardPage.js';
// import AccountsPage     from './pages/Accounts/AccountsPage.js';
// import TransactionsPage from './pages/Transactions/TransactionsPage.js';

const Router = (() => {
  const routes = {};
  let root = null;

  const add      = (path, renderFn) => { /* TODO: guardar renderFn en routes[path] */ };
  const navigate = (path) => { /* TODO: window.location.hash = path */ };
  const resolve  = async () => { /* TODO: leer hash, buscar en routes y llamar renderFn(root) */ };
  const start    = (rootEl) => { /* TODO: guardar rootEl, escuchar hashchange, llamar resolve() */ };
  const getCurrentPath = () => window.location.hash.slice(1) || ROUTES.DASHBOARD;

  return { add, navigate, start, getCurrentPath };
})();

export default Router;
