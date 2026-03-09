# Segundo Flujo — Editar/Eliminar cuenta y Dashboard con resumen

Flujo que completa el CRUD de cuentas y da vida al Dashboard usando los eventos
que ya emite `accountService` pero aún no tienen listener.

---

## Tareas

- [ ] **1. `components/Table/Table.js`** — Añade soporte para columna de acciones: si `columns` incluye una entrada con `key: 'actions'`, renderiza los botones que defina su función `render(item)`. Usa `data-id` en los botones para poder aplicar delegación de eventos desde la página.

- [ ] **2. `pages/Accounts/AccountsPage.js`** — Añade botones de Editar y Eliminar en la tabla usando la nueva columna de acciones. Aplica delegación de eventos en el contenedor `#accounts-table` para manejar ambos clics con un solo listener.

- [ ] **3. `pages/Accounts/AccountsPage.js`** — Implementa `_openEditModal(account, container)`: abre el Modal con los campos pre-rellenos con los datos de la cuenta y llama a `AccountService.update` al confirmar.

- [ ] **4. `pages/Accounts/AccountsPage.js`** — Implementa `_confirmDelete(account, container)`: abre el Modal en modo confirmación (sin formulario, solo mensaje) y llama a `AccountService.remove` al confirmar.

- [ ] **5. `pages/Accounts/AccountsPage.js`** — Sustituye las llamadas manuales a `_loadAccounts` tras crear/editar/eliminar por `EventBus.on` que escuche `account:created`, `account:updated` y `account:deleted` para refrescar la tabla automáticamente. Registra los listeners al entrar a la página y usa `EventBus.off` en `router:beforeNavigate` para evitar acumulación al navegar.

- [ ] **6. `pages/Dashboard/DashboardPage.js`** — Carga todas las cuentas con `AccountService.getAll` y muestra tarjetas con: número total de cuentas, saldo total formateado y saldo desglosado por tipo (`Ahorro`, `Corriente`, `Inversión`). Escucha `account:created`, `account:updated` y `account:deleted` para refrescar los totales en tiempo real (con `off` en `router:beforeNavigate`).

---

## Verificación final

- [ ] Al pulsar Editar, el modal se abre con los datos actuales de la cuenta.
- [ ] Al confirmar edición, la tabla se actualiza sin recargar la página.
- [ ] Al pulsar Eliminar, aparece un modal de confirmación con el nombre de la cuenta.
- [ ] Al confirmar eliminación, la fila desaparece de la tabla.
- [ ] El Dashboard muestra el número real de cuentas y el saldo total formateado.
- [ ] El Dashboard se actualiza automáticamente al crear, editar o eliminar una cuenta desde la página de Cuentas.
- [ ] Al navegar entre páginas varias veces, los handlers no se duplican (verificar en consola que `total listeners` no crece).
