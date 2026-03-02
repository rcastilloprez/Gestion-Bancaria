// src/components/Navbar/Navbar.js
// Uso: Navbar.mount(document.getElementById('navbar'))

import { ROUTES } from '../../../config/constants.js';
import Router    from '../../router.js';
import EventBus  from '../../events/EventBus.js';

const Navbar = (() => {
  const mount = (container) => {
    // TODO: insertar el HTML de la barra de navegación con los enlaces de ROUTES
    // TODO: marcar el enlace activo según Router.getCurrentPath()
    // TODO: EventBus.on('router:afterNavigate', ...) para actualizar el enlace activo
  };

  return { mount };
})();

export default Navbar;
