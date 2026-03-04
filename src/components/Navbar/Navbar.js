// src/components/Navbar/Navbar.js

import { ROUTES } from '../../../config/constants.js';
import EventBus  from '../../events/EventBus.js';

const Navbar = (() => {
  const mount = (container) => {
    container.innerHTML = `
      <nav class="navbar">
        <span class="navbar__brand">GestiónBancaria</span>
        <ul class="navbar__links">
          <li><a class="nav__link" href="#${ROUTES.DASHBOARD}">Dashboard</a></li>
          <li><a class="nav__link" href="#${ROUTES.ACCOUNTS}">Cuentas</a></li>
          <li><a class="nav__link" href="#${ROUTES.TRANSACTIONS}">Transacciones</a></li>
        </ul>
      </nav>
    `;

    // Marcar el enlace activo cuando el router navega
    EventBus.on('router:afterNavigate', ({ path }) => {
      container.querySelectorAll('.nav__link').forEach((link) => {
        const linkPath = link.getAttribute('href').slice(1); // quita el '#'
        link.classList.toggle('nav__link--active', linkPath === path);
      });
    });
  };

  return { mount };
})();

export default Navbar;
