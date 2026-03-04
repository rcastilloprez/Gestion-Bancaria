# Primer Flujo — Lista de cuentas y crear cuenta nueva

Flujo elegido porque toca todas las capas de la arquitectura de principio a fin.

---

## Tareas

- [ ] **1. `index.html`** — Agrega los contenedores `#navbar`, `#app`, el bloque HTML del modal y carga `app.js` como módulo.

- [ ] **2. `config/constants.js`** — Declara la URL base del backend, las rutas de la app y los tipos de cuenta disponibles.

- [ ] **3. `utils/formatter.js`** — Implementa funciones para formatear moneda y fecha.

- [ ] **4. `utils/validator.js`** — Implementa funciones para validar campos requeridos y montos positivos.

- [ ] **5. `utils/dom.js`** — Implementa helpers para seleccionar elementos, limpiar contenedores y alternar visibilidad.

- [x] **6. `events/EventBus.js`** — Implementa el canal pub/sub con los métodos `on`, `off`, `emit` y `once`.

- [ ] **7. `api/client.js`** — Implementa un wrapper de `fetch` que centralice los headers, el token y el manejo de errores HTTP para los cuatro métodos (GET, POST, PUT, DELETE).

- [ ] **8. `services/accountService.js`** — Implementa las operaciones CRUD de cuentas usando el ApiClient y emitiendo eventos al EventBus en cada operación.

- [ ] **9. `components/Table/Table.js`** — Implementa un componente que reciba columnas y datos y renderice una tabla HTML genérica.

- [ ] **10. `components/Modal/Modal.js`** — Implementa un componente de diálogo con soporte para título, contenido dinámico y callbacks de confirmar/cancelar.

- [ ] **11. `components/Navbar/Navbar.js`** — Implementa la barra de navegación que escucha el evento `router:afterNavigate` para marcar el enlace activo.

- [ ] **12. `router.js`** — Implementa el enrutador basado en hash que limpia el contenedor, llama al handler registrado y emite los eventos `router:beforeNavigate` y `router:afterNavigate`.

- [ ] **13. `pages/Accounts/AccountsPage.js`** — Implementa la página que carga y muestra la tabla de cuentas, abre el modal al pulsar "Nueva Cuenta", valida el formulario y actualiza la lista tras crear una cuenta.

- [ ] **14. `app.js`** — Monta la Navbar, registra la ruta `/accounts` con su página y arranca el Router.

---

## Verificación final

- [ ] La app carga sin errores en consola.
- [ ] La tabla muestra las cuentas con el saldo formateado.
- [ ] El modal valida los campos antes de enviar.
- [ ] Al confirmar, la lista se actualiza con la cuenta nueva.
- [ ] El enlace activo en la Navbar cambia al navegar.
