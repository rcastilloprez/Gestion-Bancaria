# GUIA COMPLETA PARA ENTENDER ESTE PROYECTO (VANILLA JS)

## 1) Objetivo de esta guia

Esta guia esta pensada para que no te pierdas al codificar.
El objetivo es responder de forma practica estas preguntas:

- Que archivo toca cada responsabilidad.
- Cuando debo usar EventBus y cuando NO.
- Como fluye una accion desde el click del usuario hasta la API.
- Como agregar funcionalidades nuevas sin romper arquitectura.
- Errores tipicos que desordenan el proyecto.

Si te quedas con una sola idea, que sea esta:

> Cada capa tiene una responsabilidad. Si respetas eso, el proyecto escala; si lo mezclas, se vuelve dificil de mantener.

---

## 2) Mapa mental rapido del proyecto

Arquitectura en una linea:

UI (Pages + Components) -> Services (reglas de negocio) -> Repositories (acceso datos) -> ApiClient (HTTP)

EventBus cruza de forma desacoplada para notificar eventos importantes.

Capas reales en este repo:

- `index.html`: cascaron unico de la SPA.
- `src/app.js`: arranque y orquestacion principal.
- `src/router.js`: navegacion por hash (`#/ruta`).
- `src/pages/*`: pantallas por modulo.
- `src/components/*`: piezas reutilizables de UI.
- `src/services/*`: reglas de negocio.
- `src/repositories/*`: CRUD y endpoints.
- `src/api/client.js`: wrapper de `fetch` y manejo de errores.
- `src/events/EventBus.js`: pub/sub desacoplado.
- `src/utils/*`: helpers puros (formato, validacion, DOM).
- `config/constants.js`: constantes globales.
- `db.json`: datos simulados para `json-server`.

---

## 3) Flujo real de vida de la app

### 3.1 Arranque inicial

1. `index.html` carga `src/app.js` como modulo.
2. `app.js` monta `Navbar` en `#navbar`.
3. `app.js` registra rutas en `Router`.
4. `app.js` llama `Router.start(#app)`.
5. `Router` resuelve la ruta actual y renderiza la pagina correspondiente dentro de `#app`.

### 3.2 Cambio de ruta

1. Usuario hace click en enlace `href="#/accounts"`.
2. Cambia el hash de URL.
3. `router.js` escucha `hashchange`.
4. Limpia contenedor principal y ejecuta render de la pagina.
5. Emite eventos `router:beforeNavigate` y `router:afterNavigate`.
6. `Navbar` escucha `router:afterNavigate` y marca link activo.

### 3.3 Caso de uso CRUD (cuentas)

Ejemplo: crear cuenta

1. Usuario abre modal y confirma formulario en `AccountsPage`.
2. `AccountsPage` valida inputs con `validator.js`.
3. Si todo ok, llama `AccountService.create(data)`.
4. `AccountService` llama `AccountRepository.create(data)`.
5. `AccountRepository` llama `ApiClient.post('/accounts', data)`.
6. API responde cuenta creada.
7. `AccountService` emite `account:created`.
8. `AccountsPage` recarga tabla (`_loadAccounts`) para reflejar cambios.

---

## 4) Regla principal para no perderte: "quien hace que"

### 4.1 Page

Responsable de:

- Renderizar HTML de la pantalla.
- Escuchar eventos del DOM (click, submit, etc).
- Tomar datos de formularios.
- Hacer validacion de entrada de UI.
- Llamar al Service.
- Refrescar UI (tabla, mensajes, estados de carga/error).

No debe:

- Hacer `fetch` directo.
- Conocer endpoints HTTP.
- Aplicar reglas de negocio complejas.

### 4.2 Service

Responsable de:

- Reglas de negocio y decisiones del dominio.
- Validaciones de negocio (fondos insuficientes, montos > 0, etc).
- Coordinar multiples repositorios en una misma operacion.
- Emitir eventos de negocio (`account:updated`, `transaction:created`).

No debe:

- Renderizar HTML.
- Manipular DOM.
- Conocer detalles visuales.

### 4.3 Repository

Responsable de:

- Traducir operaciones de negocio a llamadas API.
- Definir rutas REST (`/accounts`, `/transactions/:id`, etc).

No debe:

- Tener reglas de negocio.
- Emitir eventos.
- Acceder al DOM.

### 4.4 ApiClient

Responsable de:

- Encabezados comunes (JSON, token).
- Manejo uniforme de errores HTTP.
- Exponer metodos `get/post/put/delete`.

No debe:

- Conocer entidades (`accounts`, `transactions`) a nivel de negocio.

### 4.5 EventBus

Responsable de:

- Comunicar eventos entre modulos sin acoplarlos por import directo.

No debe:

- Reemplazar llamadas directas de flujo principal.
- Ser usado para pasar datos temporales simples entre funciones del mismo modulo.

---

## 5) EventBus: cuando usarlo y cuando no

Esta es la parte clave para tu duda.

### 5.1 Usa EventBus cuando...

- El evento es relevante para varios modulos.
- El emisor no debe conocer a los receptores.
- Quieres desacoplar capa de negocio de capa visual.
- Es un evento de dominio o app-wide.

Ejemplos buenos:

- `account:created`, `account:updated`, `account:deleted`
- `transaction:created`
- `router:afterNavigate`

### 5.2 NO uses EventBus cuando...

- Solo necesitas reaccionar dentro del mismo archivo.
- Es un flujo lineal de una sola pantalla.
- Puedes resolverlo con una llamada directa y clara.

Ejemplo:

- En `AccountsPage`, despues de `await AccountService.create(...)`, recargar tabla con `_loadAccounts` esta perfecto. No hace falta un evento para eso si solo esa pagina lo requiere.

### 5.3 Regla practica de decision (checklist)

Antes de crear un evento, responde:

1. Lo necesita mas de un modulo/pantalla?
2. Quiero que el emisor no sepa quien escucha?
3. Es un suceso del dominio (no solo de UI local)?

Si 2 o mas respuestas son "si", EventBus suele ser buena opcion.
Si casi todas son "no", usa llamada directa.

### 5.4 Nomenclatura recomendada de eventos

Formato:

`entidad:accion`

Ejemplos:

- `loan:approved`
- `user:loggedIn`
- `report:generated`

Evita nombres ambiguos como:

- `update`
- `change`
- `done`

---

## 6) Explicacion detallada archivo por archivo

## 6.1 Entrada y navegacion

### `index.html`

- Define contenedores globales:
  - `#navbar`
  - `#app`
  - `#modal-overlay`
- Carga estilos globales.
- Carga `src/app.js`.

### `src/app.js`

- Monta `Navbar`.
- Registra rutas a paginas:
  - dashboard
  - accounts
  - transactions
- Arranca Router.

Piensalo como el `main()` de la app.

### `src/router.js`

- Mantiene un mapa `path -> renderFn`.
- `add(path, renderFn)`: registra ruta.
- `navigate(path)`: cambia hash.
- `resolve()`: determina pagina a renderizar.
- `start(rootEl)`: inicia listener de `hashchange` y primera resolucion.
- `getCurrentPath()`: ruta actual.

Patron importante:

- Emite `router:beforeNavigate` antes de render.
- Emite `router:afterNavigate` despues de render.

Esto habilita comportamiento global (ejemplo navbar activa) sin mezclar logica dentro del router.

---

## 6.2 Capa de eventos

### `src/events/EventBus.js`

API:

- `on(event, cb)`: suscribe callback.
- `off(event, cb)`: elimina callback.
- `emit(event, data)`: publica evento.
- `once(event, cb)`: suscripcion de un solo uso.

Nota actual:

- Tiene logs por consola para debug, utiles al aprender flujo.

Riesgos comunes:

- Suscripciones duplicadas si montas varias veces un modulo sin limpiar.
- Fugas de memoria si no haces `off` cuando corresponde.

---

## 6.3 Capa API

### `src/api/client.js`

- Construye headers comunes.
- Agrega `Authorization` si hay token en localStorage.
- Unifica control de errores (`response.ok`).
- Devuelve JSON.

Beneficio:

- Si cambias auth o manejo de errores, cambias un solo archivo.

---

## 6.4 Repositories

### `src/repositories/accountRepository.js`

CRUD de cuentas:

- `getAll`
- `getById`
- `create`
- `update`
- `remove`

### `src/repositories/transactionRepository.js`

Operaciones de transacciones:

- `getAll`
- `getById`
- `create`
- `deleteById`

Estos archivos deben permanecer "tontos": solo adaptadores a endpoints.

---

## 6.5 Services (corazon de negocio)

### `src/services/accountService.js`

Metodos:

- `getAll`, `getById`
- `create`: persiste y emite `account:created`
- `update`: persiste y emite `account:updated`
- `remove`: elimina y emite `account:deleted`

Punto clave:

- El service publica eventos de dominio.
- La UI no depende de como se guardan los datos.

### `src/services/transactionService.js`

Metodos:

- `getAll`, `getById`, `deleteById`
- `deposit(accountId, payload)`
- `withdraw(accountId, payload)`
- `transfer(payload)`

Reglas implementadas:

- Monto > 0.
- Fondos suficientes para retiro/transferencia.
- En transferencias: origen != destino.

En cada operacion exitosa:

- crea transaccion.
- actualiza balances de cuenta(s).
- emite `transaction:created`.
- emite `account:updated` para cuentas afectadas.

Nota actual del estado del proyecto:

- `deleteById` elimina en repositorio pero actualmente no emite evento de dominio al borrar transaccion.
- La pagina de transacciones hoy lista y elimina; no hay formulario de deposito/retiro/transferencia en UI, aunque el service ya soporta esa logica.

---

## 6.6 Pages (pantallas)

### `src/pages/Dashboard/DashboardPage.js`

- Render simple de bienvenida.

### `src/pages/Accounts/AccountsPage.js`

Responsabilidades:

- Render de pantalla y boton crear cuenta.
- Carga datos con `AccountService.getAll()`.
- Renderiza tabla con `Table.render`.
- Abre modales de crear/editar via `Modal.open`.
- Ejecuta validacion de campos (`required`, `validate`).
- Elimina cuentas con confirmacion.

Patrones buenos presentes:

- Estados de carga/error.
- Delegacion de eventos en contenedor de tabla.
- Reuso de componente Table.

### `src/pages/Transactions/TransactionsPage.js`

Responsabilidades:

- Renderiza 3 bloques: depositos, retiros, transferencias.
- Carga transacciones con `TransactionService.getAll()`.
- Filtra por tipo (`TRANSACTION_TYPES`).
- Usa columnas base y columnas especificas de transferencias.
- Permite eliminar transaccion.

Nota tecnica:

- Esta pagina consume datos ya creados (de `db.json`) y soporta borrado.
- Aun no expone formularios para crear deposito/retiro/transferencia desde UI.

---

## 6.7 Components reutilizables

### `src/components/Navbar/Navbar.js`

- Renderiza links de navegacion.
- Se suscribe a `router:afterNavigate` para destacar ruta activa.

### `src/components/Modal/Modal.js`

- Abre/cierra modal reutilizable.
- Inyecta titulo/cuerpo dinamico.
- Permite callback async en confirmar.
- Reemplaza boton confirmar para evitar listeners acumulados.

### `src/components/Table/Table.js`

- Recibe configuracion de columnas + datos.
- Soporta columna `actions` con render personalizado.
- Soporta render custom por columna (`render(value, item)`).
- Maneja estado vacio (`emptyMessage`).

---

## 6.8 Utils

### `src/utils/validator.js`

- Reglas reutilizables:
  - `required`
  - `positiveAmount`
  - `isEmail`
  - `minLength`
- `validate(value, rules)` retorna primer error o `null`.

### `src/utils/formatter.js`

- Formato monetario (`formatCurrency`).
- Formato de fecha (`formatDate`, `formatDateTime`).
- Capitalizacion (`capitalize`).

### `src/utils/dom.js`

- Selectores (`$`, `$$`).
- Crear elemento (`createElement`).
- Mostrar/ocultar (`toggleVisibility`).
- Limpiar contenido (`clearElement`).

---

## 7) Como decidir donde escribir codigo nuevo

Usa este arbol de decision rapido:

1. Es logica visual (HTML, botones, clases CSS, UI state)?
   -> `pages/*` o `components/*`

2. Es regla de negocio (validar fondos, calcular saldo, reglas de dominio)?
   -> `services/*`

3. Es llamada HTTP/endpoints?
   -> `repositories/*` (usando `api/client.js`)

4. Es una constante compartida?
   -> `config/constants.js`

5. Es formato o helper puro reutilizable?
   -> `utils/*`

6. Quieres notificar algo importante entre modulos desacoplados?
   -> `EventBus.emit(...)` + `EventBus.on(...)`

---

## 8) Ejemplo completo: agregar modulo "Prestamos"

Objetivo:

- Nueva ruta `#/loans`
- Tabla de prestamos
- Crear prestamo
- Emitir evento `loan:created`

Pasos minimos ordenados:

1. Definir constante de ruta en `config/constants.js`.
2. Crear `src/repositories/loanRepository.js` con CRUD.
3. Crear `src/services/loanService.js` con reglas de negocio.
4. Crear `src/pages/Loans/LoansPage.js` para UI.
5. Registrar ruta en `src/app.js`.
6. Agregar link en `Navbar`.
7. Si otra parte debe reaccionar, emitir/escuchar eventos `loan:*`.

Pregunta clave en cada paso:

- Esto es UI, negocio o datos?

Esa pregunta evita mezclar capas.

---

## 9) Convenciones recomendadas para mantener calidad

## 9.1 Nombres

- Services: `entidadService.js`
- Repositories: `entidadRepository.js`
- Eventos: `entidad:accion`
- Paginas: `XxxPage.js`
- Componentes: `Xxx.js` dentro de carpeta `Xxx/`

## 9.2 Manejo de errores

En Page:

- Mostrar mensaje amigable al usuario.

En Service:

- Lanzar error con mensaje de negocio claro.

En ApiClient:

- Normalizar errores HTTP y status.

## 9.3 Validaciones

- Validacion de forma (campos obligatorios): en Page + utils validator.
- Validacion de reglas de dominio: en Service.

## 9.4 Eventos

- No emitir eventos por todo.
- Emite solo eventos con sentido de dominio o app-wide.
- Mantener catalogo claro de eventos usados.

---

## 10) Estado actual observado (resumen tecnico)

Lo que ya esta bien estructurado:

- Separacion clara por capas.
- Router simple y efectivo para SPA.
- Reuso de componentes (Table, Modal).
- Services con reglas de negocio importantes en transacciones.
- Uso real de EventBus en router y servicios.

Huecos funcionales actuales (normales en desarrollo iterativo):

- UI de transacciones aun no crea depositos/retiros/transferencias, solo lista y elimina.
- Borrado de transaccion no emite evento de dominio (si quieres consistencia completa de eventos, conviene agregarlo).

---

## 11) Checklist rapido antes de hacer commit

1. El codigo nuevo esta en la capa correcta?
2. Evite `fetch` fuera de `api/client.js` y `repositories`?
3. Evite meter reglas de negocio en Page?
4. Si use EventBus, realmente era necesario?
5. Mostre estado de carga/error en UI?
6. Reuse componentes y utils existentes en lugar de duplicar?

Si respondes "si" a todo, vas por muy buen camino.

---

## 12) Mini guia anti-confusion (version ultra corta)

- "Tengo que pintar algo en pantalla" -> Page/Component.
- "Tengo que validar una regla del negocio" -> Service.
- "Tengo que pegarle al backend" -> Repository (via ApiClient).
- "Tengo que avisar algo a modulos desacoplados" -> EventBus.
- "Tengo un valor fijo global" -> constants.
- "Tengo una funcion util reutilizable y pura" -> utils.

---

## 13) Comandos utiles para correr el proyecto

Instalar dependencias:

```bash
npm install
```

Levantar API fake:

```bash
npm run api
```

Luego abrir `index.html` con un servidor estatico (por ejemplo Live Server) para que la app consuma `http://localhost:3000`.

---

## 14) Cierre

Este proyecto ya tiene una base arquitectonica correcta.
La clave para que no te pierdas es pensar siempre en capas y responsabilidad unica.

Si quieres evolucionarlo sin dolor:

- agrega features repitiendo el patron Page -> Service -> Repository;
- usa EventBus solo para sucesos desacoplados y relevantes;
- manten Services como el lugar de la verdad de negocio.

Con ese marco, tu codificacion va a ser consistente y mucho mas facil de mantener.
