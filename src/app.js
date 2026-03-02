// src/app.js — punto de entrada de la aplicación
// Se importa desde index.html como <script type="module" src="src/app.js">

import Router          from './router.js';
import Navbar          from './components/Navbar/Navbar.js';
import { ROUTES }      from '../config/constants.js';

import DashboardPage    from './pages/Dashboard/DashboardPage.js';
import AccountsPage     from './pages/Accounts/AccountsPage.js';
import TransactionsPage from './pages/Transactions/TransactionsPage.js';

// 1. Montar componentes globales
Navbar.mount(document.getElementById('navbar'));

// 2. Registrar rutas
Router.add(ROUTES.DASHBOARD,    DashboardPage.render);
Router.add(ROUTES.ACCOUNTS,     AccountsPage.render);
Router.add(ROUTES.TRANSACTIONS, TransactionsPage.render);

// 3. Arrancar la app
Router.start(document.getElementById('app'));
