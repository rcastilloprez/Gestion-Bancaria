# Arquitectura — GestiónBancaria Vanilla JS

## ¿Por qué esta arquitectura?

Este proyecto usa **Vanilla JS puro** (sin React, Vue, Angular ni ningún framework).
La arquitectura está diseñada bajo tres principios:

1. **Sin gestión de estados** — no hay stores, no hay `setState`, no hay observadores reactivos.
   Cada vez que necesitas actualizar la UI, simplemente vuelves a renderizar la pieza que cambió.
2. **Escalable** — agregar una nueva funcionalidad (ej.: préstamos, tarjetas) siempre sigue
   el mismo patrón: un service + una page + registrar la ruta. Nada más.
3. **Capas con responsabilidades claras** — cada archivo sabe exactamente qué hace
   y con quién puede hablar.

---

## Estructura de carpetas

```
GestionBancariaVanillaJS/
├── index.html                    ← único HTML de toda la app
├── config/
│   └── constants.js              ← valores globales (URLs, rutas, etc.)
├── assets/
│   └── css/
│       └── main.css              ← estilos globales
└── src/
    ├── app.js                    ← punto de entrada, arranca todo
    ├── router.js                 ← enrutador SPA basado en hash
    ├── events/
    │   └── EventBus.js           ← canal de comunicación desacoplada
    ├── api/
    │   └── client.js             ← wrapper de fetch (HTTP)
    ├── services/
    │   ├── accountService.js     ← lógica de negocio: cuentas
    │   └── transactionService.js ← lógica de negocio: transacciones
    ├── components/
    │   ├── Navbar/
    │   │   └── Navbar.js         ← barra de navegación
    │   ├── Modal/
    │   │   └── Modal.js          ← ventana de diálogo reutilizable
    │   └── Table/
    │       └── Table.js          ← tabla dinámica reutilizable
    ├── pages/
    │   ├── Dashboard/
    │   │   └── DashboardPage.js
    │   ├── Accounts/
    │   │   └── AccountsPage.js
    │   └── Transactions/
    │       └── TransactionsPage.js
    └── utils/
        ├── formatter.js          ← funciones de formato (moneda, fecha…)
        ├── validator.js          ← validaciones de formularios
        └── dom.js                ← helpers del DOM
```

---

## Diagrama de capas

```
┌─────────────────────────────────────────────────┐
│                   index.html                    │  ← único punto de entrada HTML
└───────────────────────┬─────────────────────────┘
                        │ carga (type="module")
                        ▼
┌─────────────────────────────────────────────────┐
│                    src/app.js                   │  ← orquestador principal
│  · monta Navbar                                 │
│  · registra rutas en el Router                  │
│  · llama a Router.start()                       │
└───────┬──────────────────────────┬──────────────┘
        │                          │
        ▼                          ▼
┌──────────────┐        ┌──────────────────────┐
│   router.js  │        │  components/Navbar   │
│  (SPA hash)  │        └──────────────────────┘
└──────┬───────┘
       │ inyecta según ruta activa
       ▼
┌──────────────────────────────────────────┐
│                  Pages                   │
│  DashboardPage / AccountsPage / ...      │
│  · piden datos a los Services            │
│  · usan Components para mostrar la UI    │
└──────┬───────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│                 Services                 │
│  accountService / transactionService     │
│  · contienen la lógica de negocio        │
│  · llaman a ApiClient para el backend    │
│  · emiten eventos al EventBus            │
└──────┬──────────────────────┬────────────┘
       │                      │
       ▼                      ▼
┌─────────────┐      ┌─────────────────────┐
│  api/client │      │  events/EventBus    │
│  (fetch)    │      │  (pub/sub)          │
└──────┬──────┘      └─────────────────────┘
       │
       ▼
  Backend API
```

**Regla de oro:** las dependencias solo van hacia abajo.
Una Page puede llamar a un Service. Un Service NO puede llamar a una Page.

---

## Explicación de cada pieza

---

### `index.html`

El único archivo HTML del proyecto. No tiene lógica.
Su único trabajo es definir el esqueleto visual:

```html
<header id="navbar"></header>   <!-- aquí vive la barra de navegación -->
<main id="app"></main>           <!-- aquí el Router inyecta la página activa -->
<script type="module" src="src/app.js"></script>
```

`type="module"` es obligatorio para poder usar `import/export` en el navegador
sin necesidad de Webpack, Vite ni ningún bundler.

---

### `config/constants.js`

Centraliza todos los valores que se usan en varios archivos:
rutas, URL del backend, tipos de transacción, etc.

**¿Por qué?**
Si mañana cambias la URL del backend, lo cambias en UN solo lugar.
Si añades una ruta nueva, primero la declaras aquí y luego la usas en el Router.

```js
export const ROUTES = {
  DASHBOARD:    '/dashboard',
  ACCOUNTS:     '/accounts',
  TRANSACTIONS: '/transactions',
};
```

---

### `src/app.js` — El punto de entrada

Es el primero en ejecutarse. Su trabajo es:
1. Montar los componentes globales (Navbar).
2. Registrar cada ruta con su página correspondiente.
3. Arrancar el Router.

No contiene lógica de negocio. Solo une las piezas.

```
app.js arranca
  → monta Navbar
  → registra rutas
  → Router.start() lee el hash de la URL y renderiza la primera página
```

---

### `src/router.js` — El enrutador SPA

Una SPA (Single Page Application) es una web que nunca recarga la página completa.
En vez de eso, cambia solo el contenido del `<main id="app">`.

Este Router usa el **hash de la URL** (`#/dashboard`, `#/accounts`…) para saber
qué página mostrar. El hash no provoca recarga del navegador, lo que lo hace
perfecto para SPAs sin servidor.

**¿Cómo funciona?**

```
URL en el navegador: http://localhost/#/accounts
                                          ↑
                                    esto es el hash
```

1. El usuario hace clic en un enlace `<a href="#/accounts">`.
2. El navegador dispara el evento `hashchange`.
3. El Router escucha ese evento, lee el hash (`/accounts`),
   busca la función registrada para esa ruta y la ejecuta
   pasándole el `<main id="app">` como contenedor.
4. La página limpia el contenedor e inyecta su HTML.

**Para agregar una ruta nueva:**
```js
// En app.js:
import LoanPage from './pages/Loans/LoanPage.js';
Router.add('/loans', LoanPage.render);
```
Eso es todo. No tocas nada más.

---

### `src/events/EventBus.js` — Comunicación desacoplada

El EventBus es un canal de mensajes. Cualquier módulo puede:
- **Publicar** (emit): "ocurrió algo importante".
- **Suscribirse** (on): "avísame cuando ocurra algo importante".

**¿Por qué es necesario?**

Sin EventBus, para que la Navbar sepa que el usuario creó una cuenta,
tendrías que pasarle una referencia de la Navbar al servicio de cuentas.
Eso crea dependencias directas entre módulos que no deberían conocerse.

Con EventBus:
```
accountService → EventBus.emit('account:created', newAccount)
Navbar         → EventBus.on('account:created', (account) => { ... })
```
El servicio y la Navbar no se conocen entre sí. Solo hablan a través del bus.

**API del EventBus:**

| Método | Para qué sirve |
|--------|---------------|
| `on(evento, callback)` | Suscribirse a un evento. Retorna función para desuscribirse. |
| `off(evento, callback)` | Desuscribirse manualmente. |
| `emit(evento, datos)` | Publicar un evento con datos opcionales. |
| `once(evento, callback)` | Igual que `on` pero se autodestruye tras el primer disparo. |

**Convención de nombres de eventos:**
Usa el formato `entidad:accion` para que sea fácil de buscar:
- `account:created`
- `account:deleted`
- `transaction:created`
- `router:afterNavigate`

---

### `src/api/client.js` — El cliente HTTP

Todos los pedidos al backend pasan por aquí. **Nunca uses `fetch` directamente
en un servicio o página.**

**¿Por qué centralizarlo?**

Porque hay cosas que todas las peticiones necesitan:
- El header `Authorization: Bearer <token>` para autenticación.
- El header `Content-Type: application/json`.
- Manejo uniforme de errores (si el servidor devuelve 401, 404, 500…).

Si mañana añades un spinner de carga global, lo pones aquí una vez
y aplica a todas las peticiones automáticamente.

**API:**
```js
ApiClient.get('/accounts')               // GET  /accounts
ApiClient.post('/accounts', datos)       // POST /accounts
ApiClient.put('/accounts/1', datos)      // PUT  /accounts/1
ApiClient.delete('/accounts/1')          // DELETE /accounts/1
```

---

### `src/services/` — La lógica de negocio

Hay un service por cada "entidad" del dominio (cuentas, transacciones…).

**Responsabilidades:**
- Saber a qué endpoint del backend llamar.
- Transformar los datos si es necesario antes de usarlos.
- Emitir eventos al EventBus cuando algo cambia.
- **No saber nada de HTML ni del DOM.**

**Ejemplo de flujo al crear una cuenta:**
```
AccountsPage → AccountService.create(datos)
                  → ApiClient.post('/accounts', datos)   [llama al backend]
                  → EventBus.emit('account:created', nueva)  [avisa a quien escuche]
                  → retorna la cuenta creada
AccountsPage  ← recibe la cuenta y actualiza la UI
```

**Para agregar un servicio nuevo** (ej.: préstamos):
1. Crea `src/services/loanService.js`.
2. Copia la estructura de `accountService.js`.
3. Cambia los endpoints y los eventos.
4. Úsalo desde tu página.

---

### `src/pages/` — Las vistas

Cada página corresponde a una ruta del Router.
Una página es simplemente **una función `render(container)`** que:
1. Recibe el `<main id="app">` como argumento.
2. Construye el HTML de esa vista.
3. Lo inyecta en el contenedor.
4. Agrega los event listeners necesarios (clicks en botones, submit de formularios…).

```js
const AccountsPage = {
  render: async (container) => {
    const accounts = await AccountService.getAll();
    container.innerHTML = `<h1>Mis Cuentas</h1>`;
    Table.render(container.querySelector('.tabla'), { ... });
  }
};
```

**Reglas de las páginas:**
- Solo renderizan, no tienen lógica de negocio.
- Pueden usar cualquier componente (Modal, Table, etc.).
- Llaman a servicios para obtener/modificar datos.
- Nunca llaman a `fetch` directamente.

**Para agregar una página nueva:**
1. Crea la carpeta `src/pages/MiModulo/`.
2. Crea `MiModuloPage.js` con la función `render`.
3. Regístrala en `app.js` con `Router.add('/mi-modulo', MiModuloPage.render)`.
4. Añade la ruta en `config/constants.js`.

---

### `src/components/` — Piezas de UI reutilizables

Un componente es una pieza de interfaz que se puede usar en cualquier página.
La diferencia con una página es que **no sabe en qué página está**.

**Componentes incluidos:**

#### `Navbar`
La barra de navegación principal. Se monta una sola vez en `app.js`.
Escucha el evento `router:afterNavigate` del EventBus para marcar
el enlace activo automáticamente.

#### `Modal`
Una ventana de diálogo que se puede abrir desde cualquier página:
```js
Modal.open({
  title: '¿Eliminar cuenta?',
  content: '<p>Esta acción no se puede deshacer.</p>',
  onConfirm: () => AccountService.remove(id),
});
```

#### `Table`
Renderiza una tabla dinámica a partir de una configuración de columnas y datos:
```js
Table.render(contenedor, {
  columns: [
    { key: 'date',    label: 'Fecha',  render: (v) => formatDate(v) },
    { key: 'amount',  label: 'Monto',  render: (v) => formatCurrency(v) },
    { key: 'type',    label: 'Tipo' },
  ],
  data: transacciones,
  emptyMessage: 'No hay transacciones.',
});
```

**Para agregar un componente nuevo:**
1. Crea `src/components/MiComponente/MiComponente.js`.
2. Expórtalo como objeto con sus métodos (`mount`, `render`, `open`, etc.).
3. Importalo en cualquier página que lo necesite.

---

### `src/utils/` — Funciones de apoyo

Son funciones puras: reciben argumentos y devuelven un resultado.
**No modifican el DOM, no tienen efectos secundarios, no importan otros módulos propios.**

#### `formatter.js`
Convierte valores a texto legible para humanos:
```js
formatCurrency(1234.5)  → "$1,234.50"
formatDate('2026-03-02') → "2 de marzo de 2026"
capitalize('hola')       → "Hola"
```

#### `validator.js`
Valida campos de formularios antes de enviarlos:
```js
// Uso individual:
const resultado = positiveAmount(-50);
// → { valid: false, message: 'Monto inválido.' }

// Uso con varias reglas encadenadas:
const error = validate(monto, [required, positiveAmount]);
if (error) mostrarError(error); // "Monto inválido."
```

#### `dom.js`
Helpers para no repetir código del DOM:
```js
const btn   = $('.btn-guardar', formulario);  // querySelector con error claro
const items = $$('.item');                    // querySelectorAll → Array
toggleVisibility(spinner, true);              // agrega/quita clase 'hidden'
clearElement(contenedor);                     // limpia innerHTML
```

---

## Flujo completo de ejemplo: crear una cuenta

```
1. Usuario hace clic en "Nueva Cuenta" en AccountsPage
        ↓
2. AccountsPage abre Modal con un formulario
        ↓
3. Usuario llena el formulario y hace clic en "Confirmar"
        ↓
4. AccountsPage valida los campos con validator.js
   · Si hay errores → muestra mensajes, no continúa
        ↓
5. AccountsPage llama a AccountService.create(datos)
        ↓
6. AccountService llama a ApiClient.post('/accounts', datos)
        ↓
7. ApiClient hace fetch al backend y retorna la cuenta creada
        ↓
8. AccountService emite EventBus.emit('account:created', cuenta)
        ↓
9. AccountService retorna la cuenta a AccountsPage
        ↓
10. AccountsPage cierra el Modal y vuelve a renderizar la lista de cuentas
    (llama a AccountService.getAll() y a Table.render())
```

---

## Cómo escalar el proyecto

### Agregar un módulo nuevo (ej.: Préstamos)

```
1. config/constants.js      → añadir ROUTES.LOANS = '/loans'
2. src/services/loanService.js  → crear con getAll, create, update, remove
3. src/pages/Loans/
   └── LoansPage.js         → crear con render()
4. src/app.js               → Router.add(ROUTES.LOANS, LoansPage.render)
                            → añadir enlace en Navbar
```

### Agregar un componente nuevo (ej.: Gráfica)

```
1. src/components/Chart/
   └── Chart.js             → crear con render(container, { data, ... })
2. Importarlo en cualquier página que lo necesite
```

### Agregar una utilidad nueva (ej.: storage)

```
1. src/utils/storage.js     → funciones para localStorage/sessionStorage
2. Importarlo donde se necesite
```

---

## Módulos ES (`import`/`export`)

Este proyecto usa módulos nativos del navegador.
No necesita Webpack, Vite, Babel ni ningún bundler.

**Reglas:**
- Siempre usa rutas relativas con extensión `.js`: `'./services/accountService.js'`
- El `index.html` carga `app.js` con `type="module"`.
- Por esto necesitas servir el proyecto desde un servidor local
  (no abrir `index.html` directamente con doble clic).

**Para servir localmente** puedes usar cualquiera de estas opciones:
- Extensión **Live Server** en VS Code (recomendado).
- `npx serve .` en la terminal.
- `python -m http.server` en la terminal.

---

## Resumen de la regla de dependencias

```
Pages
  ↓ puede usar
Components + Services + Utils
            ↓ puede usar
          ApiClient + EventBus + Utils
                    ↓ puede usar
                  config/constants
```

**Ninguna capa inferior puede importar de una capa superior.**
Eso garantiza que el código sea predecible y fácil de mantener.
