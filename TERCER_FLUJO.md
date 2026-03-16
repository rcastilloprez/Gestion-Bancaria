# Tercer Flujo — Registrar transacciones y reflejar impacto en saldos

Flujo para completar el módulo de Transacciones y conectar su efecto en Cuentas y Dashboard.

---

## Tareas

- [ ] **1. `config/constants.js`** — Declara `TRANSACTION_TYPES` (por ejemplo: `deposito`, `retiro`, `transferencia`) para reutilizar los tipos en formularios, validaciones y tablas sin hardcodear strings.

- [ ] **2. `src/services/transactionService.js`** — Implementa `getAll`, `getByAccount`, `deposit`, `withdraw` y `transfer` usando `ApiClient`. Cada operación debe crear registros en `/transactions`, actualizar el/los saldo(s) en `/accounts` y emitir eventos (`transaction:created` y `account:updated`) para mantener la UI sincronizada.

- [ ] **3. `src/services/transactionService.js`** — Añade validaciones de negocio antes de persistir: monto mayor a cero, cuenta origen y destino distintas en transferencias, y fondos suficientes para retiros/transferencias.

- [ ] **4. `src/pages/Transactions/TransactionsPage.js`** — Reemplaza el placeholder por una vista real con:
  - selector de cuenta (incluye opción “Todas”),
  - botón “+ Nueva Transacción”,
  - tabla reutilizable con fecha, cuenta, tipo, descripción y monto formateado.

- [ ] **5. `src/pages/Transactions/TransactionsPage.js`** — Implementa modal de creación de transacción con formulario dinámico por tipo:
  - Depósito: cuenta destino + monto + descripción.
  - Retiro: cuenta origen + monto + descripción.
  - Transferencia: cuenta origen + cuenta destino + monto + descripción.

- [ ] **6. `src/pages/Transactions/TransactionsPage.js`** — Valida formulario con `required`, `positiveAmount` y reglas de negocio; muestra errores en línea y evita cerrar el modal cuando haya errores.

- [ ] **7. `src/pages/Transactions/TransactionsPage.js`** — Al confirmar, llama a `TransactionService` según el tipo, cierra modal, recarga tabla de transacciones y conserva el filtro de cuenta activo.

- [ ] **8. `src/pages/Dashboard/DashboardPage.js`** — Implementa tarjetas de resumen real (total de cuentas, saldo total y saldo por tipo) y refresca al escuchar `account:created`, `account:updated`, `account:deleted` y `transaction:created`.

- [ ] **9. `src/pages/Accounts/AccountsPage.js`** — Asegura refresco reactivo de la tabla cuando cambien saldos por transacciones (escuchar `account:updated` o `transaction:created`), evitando listeners duplicados al navegar.

- [ ] **10. `src/components/Table/Table.js`** — (Opcional) añade soporte para estilos condicionales por celda en columna monto (ejemplo: verde para depósitos, rojo para retiros) sin romper su reutilización en otras páginas.

---

## Verificación final

- [ ] Se pueden registrar depósitos, retiros y transferencias desde la página de Transacciones.
- [ ] Un retiro no permite monto mayor al saldo disponible.
- [ ] Una transferencia no permite misma cuenta origen/destino.
- [ ] Al crear una transacción, el saldo de la(s) cuenta(s) se actualiza correctamente en backend.
- [ ] La tabla de Cuentas refleja el nuevo saldo sin recargar la página.
- [ ] El Dashboard actualiza métricas automáticamente tras cada transacción.
- [ ] El filtro por cuenta en Transacciones funciona y se mantiene tras crear una operación.
- [ ] Al navegar entre rutas varias veces no se duplican listeners ni renders.
