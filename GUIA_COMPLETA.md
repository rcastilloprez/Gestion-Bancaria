# Guía Completa de la Arquitectura — GestiónBancaria Vanilla JS

---

## Índice

1. [¿Qué es esta arquitectura y por qué existe?](#1-qué-es-esta-arquitectura-y-por-qué-existe)
2. [El problema que resuelve cada decisión](#2-el-problema-que-resuelve-cada-decisión)
3. [Estructura de carpetas explicada al detalle](#3-estructura-de-carpetas-explicada-al-detalle)
4. [Módulos ES nativos del navegador](#4-módulos-es-nativos-del-navegador)
5. [index.html — el único HTML](#5-indexhtml--el-único-html)
6. [config/constants.js — la fuente de verdad](#6-configconstantsjs--la-fuente-de-verdad)
7. [src/app.js — el director de orquesta](#7-srcappjs--el-director-de-orquesta)
8. [src/router.js — cómo funciona una SPA](#8-srcrouterjs--cómo-funciona-una-spa)
9. [src/events/EventBus.js — comunicación sin dependencias directas](#9-srceventsevantbusjs--comunicación-sin-dependencias-directas)
10. [src/api/client.js — la capa de red](#10-srcapiclientjs--la-capa-de-red)
11. [src/services/ — la lógica de negocio](#11-srcservices--la-lógica-de-negocio)
12. [src/pages/ — las vistas](#12-srcpages--las-vistas)
13. [src/components/ — piezas reutilizables de UI](#13-srccomponents--piezas-reutilizables-de-ui)
14. [src/utils/ — funciones de apoyo](#14-srcutils--funciones-de-apoyo)
15. [El patrón IIFE y por qué lo usamos](#15-el-patrón-iife-y-por-qué-lo-usamos)
16. [Flujos completos de ejemplo](#16-flujos-completos-de-ejemplo)
17. [Reglas de dependencias entre capas](#17-reglas-de-dependencias-entre-capas)
18. [Cómo escalar el proyecto paso a paso](#18-cómo-escalar-el-proyecto-paso-a-paso)
19. [Errores comunes y cómo evitarlos](#19-errores-comunes-y-cómo-evitarlos)
20. [Glosario de términos](#20-glosario-de-términos)

---

## 1. ¿Qué es esta arquitectura y por qué existe?

### El punto de partida

Cuando empiezas un proyecto en Vanilla JS sin ninguna estructura,
normalmente terminas con algo parecido a esto:

```
proyecto/
├── index.html
├── style.css
└── main.js   ← un archivo de 2000 líneas donde está TODO
```

Al principio parece sencillo. Pero a medida que el proyecto crece,
`main.js` se convierte en un desastre:

- No sabes dónde está el código que maneja las cuentas.
- Una función de mostrar datos también llama al backend.
- Cambiar algo en un lugar rompe otra cosa en otro lugar.
- Agregar una funcionalidad nueva da miedo porque no sabes qué vas a romper.

### La solución: separación de responsabilidades

Esta arquitectura divide el código en **capas**. Cada capa tiene una sola
responsabilidad y reglas claras de con quién puede hablar.

El resultado es un proyecto donde:
- Sabes exactamente dónde buscar cualquier tipo de código.
- Puedes añadir funcionalidades nuevas sin tocar lo que ya funciona.
- Puedes cambiar cómo se muestra algo (UI) sin afectar la lógica de negocio.
- Puedes cambiar el backend sin tocar la interfaz.

### Lo que NO hace esta arquitectura

- **No usa gestión de estados** — no hay stores, no hay `setState`,
  no hay variables reactivas. Si quieres actualizar la UI, simplemente
  vuelves a llamar la función que renderiza esa parte. Eso es todo.

- **No necesita un bundler** — sin Webpack, sin Vite, sin Babel.
  Usa los módulos nativos del navegador moderno (`import`/`export`).

- **No tiene dependencias externas** — cero `npm install`. Todo es
  JavaScript puro del navegador.

---

## 2. El problema que resuelve cada decisión

Esta sección explica el "¿por qué?" detrás de cada pieza.

### ¿Por qué un Router?

Sin un router, para navegar entre páginas tendrías dos opciones malas:
1. Múltiples archivos HTML (recarga completa del navegador al navegar).
2. Mostrar/ocultar `<div>` con CSS, lo que termina siendo un spaghetti.

Con el Router basado en hash:
- El navegador **nunca recarga** la página completa.
- La URL cambia (de `/#/dashboard` a `/#/accounts`), así que el botón
  atrás del navegador funciona.
- El Router limpia la vista anterior y renderiza la nueva automáticamente.

### ¿Por qué un EventBus?

Sin EventBus, cuando un módulo A necesita notificar algo al módulo B,
tienes que pasar referencias entre ellos:

```js
// SIN EventBus — acoplamiento directo (MAL)
const navbar = new Navbar();
const accounts = new AccountService(navbar); // AccountService conoce Navbar
accounts.create(datos); // llama navbar.refresh() internamente
```

Esto crea dependencias imposibles de mantener.
Si mañana también necesitas actualizar un Dashboard y un contador,
tienes que pasarles todos al servicio.

Con EventBus:
```js
// CON EventBus — desacoplado (BIEN)
AccountService.create(datos);
// AccountService solo hace: EventBus.emit('account:created', cuenta)
// Navbar, Dashboard, contador... cada uno decide si le interesa escuchar
```

Cada módulo es independiente. Puedes añadir o quitar listeners sin
tocar el módulo que emite el evento.

### ¿Por qué centralizar los fetch en ApiClient?

Imagina que tienes 15 servicios y cada uno hace su propio `fetch`.
De repente tienes que añadir un token de autorización a todas las peticiones.
Tendrías que cambiar 15 archivos.

Con ApiClient:
- Cambias el encabezado en UN lugar.
- El manejo de errores HTTP (401, 404, 500) está en UN lugar.
- Si mañana quieres añadir un interceptor de carga (spinner global),
  lo añades en UN lugar.

### ¿Por qué separar Services de Pages?

Supón que en `AccountsPage` tienes el código para llamar a la API
y también el código para renderizar la UI. ¿Qué pasa cuando:

- Quieres mostrar las cuentas también en el Dashboard?
  → Duplicas el código de fetch.
- Quieres cambiar el endpoint de `/accounts` a `/user/accounts`?
  → Tienes que buscarlo en cada página que lo usa.

Con Services:
- La lógica de negocio vive en un solo lugar.
- Las páginas son "tontas": piden datos y los muestran, sin saber
  cómo se obtienen.

---

## 3. Estructura de carpetas explicada al detalle

```
GestionBancariaVanillaJS/
│
├── index.html                    ── único HTML de toda la app
│
├── ARQUITECTURA.md               ── resumen de la arquitectura
│
├── config/
│   └── constants.js              ── valores globales: ROUTES, API_BASE_URL, etc.
│
├── assets/
│   └── css/
│       ├── main.css              ── estilos globales y utilidades (ej: .hidden)
│       └── components/           ── un CSS por componente (opcional, para organizar)
│           ├── navbar.css
│           ├── modal.css
│           └── table.css
│
└── src/
    │
    ├── app.js                    ── punto de entrada JS: monta navbar, registra rutas
    ├── router.js                 ── SPA hash router
    │
    ├── events/
    │   └── EventBus.js           ── canal de comunicación pub/sub
    │
    ├── api/
    │   └── client.js             ── wrapper de fetch con headers, errores y base URL
    │
    ├── services/                 ── un archivo por entidad del dominio
    │   ├── accountService.js     ── CRUD de cuentas + emite eventos
    │   └── transactionService.js ── operaciones de transacciones + emite eventos
    │
    ├── components/               ── piezas de UI reutilizables entre páginas
    │   ├── Navbar/
    │   │   └── Navbar.js
    │   ├── Modal/
    │   │   └── Modal.js
    │   └── Table/
    │       └── Table.js
    │
    ├── pages/                    ── una carpeta por ruta de la app
    │   ├── Dashboard/
    │   │   └── DashboardPage.js
    │   ├── Accounts/
    │   │   └── AccountsPage.js
    │   └── Transactions/
    │       └── TransactionsPage.js
    │
    └── utils/                    ── funciones puras de apoyo
        ├── formatter.js          ── formatCurrency, formatDate, capitalize…
        ├── validator.js          ── required, positiveAmount, isEmail, validate…
        └── dom.js                ── $, $$, createElement, toggleVisibility…
```

### ¿Por qué cada componente tiene su propia carpeta?

```
components/
├── Navbar/
│   └── Navbar.js
```

en vez de:

```
components/
└── Navbar.js
```

Porque cuando el componente crece, puede necesitar:
- Su propio CSS: `Navbar/navbar.css`
- Subcomponentes: `Navbar/NavItem.js`
- Tests: `Navbar/Navbar.test.js`

Si está en una carpeta propia, todo lo relacionado con Navbar está junto.
Lo mismo aplica para Pages.

---

## 4. Módulos ES nativos del navegador

### ¿Qué son los módulos ES?

Son la forma oficial y nativa de dividir JavaScript en archivos
que pueden importarse unos a otros.

```js
// archivo A exporta
export const saludar = (nombre) => `Hola, ${nombre}`;

// archivo B importa
import { saludar } from './A.js';
```

### ¿Por qué `type="module"` en el HTML?

```html
<script type="module" src="src/app.js"></script>
```

Sin `type="module"`, el navegador trata el script como JavaScript clásico
y no entiende la sintaxis `import`/`export`.

Con `type="module"`:
- Puedes usar `import`/`export`.
- El script se ejecuta en modo estricto automáticamente.
- Cada módulo tiene su propio scope (no contamina el scope global).
- El navegador solo carga cada módulo una vez, aunque sea importado
  desde múltiples archivos.

### La regla de las rutas relativas

Cuando importas, **siempre debes poner la ruta relativa completa con `.js`**:

```js
// CORRECTO
import Router from './router.js';
import AccountService from '../services/accountService.js';
import { ROUTES } from '../../config/constants.js';

// INCORRECTO — el navegador no sabe qué extensión buscar
import Router from './router';
import AccountService from '../services/accountService';
```

### ¿Por qué no necesitas Webpack ni Vite?

Webpack y Vite resuelven el problema de que los navegadores antiguos no
soportaban módulos ES. Hoy en día, todos los navegadores modernos los soportan.

Para un proyecto de práctica o un proyecto interno donde controlas
el navegador, los módulos nativos son perfectamente válidos.

### Requisito: debes usar un servidor local

Los módulos ES **no funcionan abriendo el HTML directamente** con doble clic
(protocolo `file://`). Necesitas un servidor local (protocolo `http://`).

Opciones para servirlo:
- **VS Code** → instala la extensión "Live Server" → botón "Go Live"
- **Terminal** → `npx serve .` (necesita Node.js instalado)
- **Terminal** → `python -m http.server 3000`

---

## 5. `index.html` — el único HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Gestión Bancaria</title>
  <link rel="stylesheet" href="assets/css/main.css" />
</head>
<body>
  <header id="navbar"></header>
  <main id="app"></main>
  <script type="module" src="src/app.js"></script>
</body>
</html>
```

### Cada línea importa

**`<header id="navbar">`**
El componente Navbar inyectará su HTML aquí cuando se monte.
El ID `navbar` es el "gancho" que usa `app.js` para encontrarlo:
```js
Navbar.mount(document.getElementById('navbar'));
```

**`<main id="app">`**
Aquí el Router inyecta la página activa. Cada vez que navegas,
el Router limpia este `<main>` y renderiza la nueva página adentro.

**`<script type="module" src="src/app.js">`**
Solo se carga `app.js`. Desde ahí, gracias a los `import`, el navegador
carga todos los demás archivos automáticamente según se necesiten.
No necesitas declarar múltiples `<script>` tags.

### ¿Por qué un solo HTML?

Porque esta es una SPA (Single Page Application).
"Single Page" no significa que solo haya una pantalla, sino que
solo hay un archivo HTML. Las diferentes "páginas" son vistas
que se intercambian dinámicamente en el `<main id="app">`.

---

## 6. `config/constants.js` — la fuente de verdad

```js
export const API_BASE_URL = 'http://localhost:3000/api';

export const ROUTES = {
  DASHBOARD:    '/dashboard',
  ACCOUNTS:     '/accounts',
  TRANSACTIONS: '/transactions',
};
```

### ¿Por qué dedicar un archivo solo a esto?

**Problema sin constants.js:**
```js
// En router.js
Router.add('/accounts', AccountsPage.render);

// En Navbar.js
{ label: 'Cuentas', href: '#/accounts' }

// En algún botón de DashboardPage.js
Router.navigate('/accounts');
```

El string `'/accounts'` aparece en 3 lugares diferentes.
Si algún día cambias la ruta a `/mis-cuentas`, tienes que buscarlo
en todos los archivos.

**Con constants.js:**
```js
// En todos los archivos
import { ROUTES } from '../../config/constants.js';
Router.add(ROUTES.ACCOUNTS, AccountsPage.render);
```

Cambias la ruta una vez en `constants.js` y se actualiza en todas partes.

### ¿Qué debe ir en constants.js?

- URLs del backend (`API_BASE_URL`)
- Nombres de rutas (`ROUTES`)
- Tipos de datos fijos (`TRANSACTION_TYPES`, `ACCOUNT_TYPES`)
- Configuración de formato (`CURRENCY`, `DATE_LOCALE`)
- Códigos HTTP si los usas en múltiples lugares

### ¿Qué NO debe ir en constants.js?

- Lógica de negocio
- Funciones
- Variables que cambian durante la ejecución (esas no son constantes)

---

## 7. `src/app.js` — el director de orquesta

```js
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
```

### El rol de app.js

`app.js` es el único archivo que "conoce" todo: el Router, los componentes
globales y las páginas. Su trabajo es únicamente **conectar las piezas**.

No tiene lógica de negocio. No tiene HTML. No llama al backend.
Solo configura la aplicación y la arranca.

### ¿Por qué los imports de las páginas están aquí?

Porque el Router necesita saber qué función ejecutar para cada ruta.
`app.js` es el lugar central donde se hace ese mapeo.

Cuando añadas una página nueva, vendrás aquí a:
1. Importar la página.
2. Registrarla con `Router.add()`.

Es la única responsabilidad de `app.js` respecto a las páginas.

### Orden de ejecución al cargar la app

```
1. El navegador carga index.html
2. Encuentra <script type="module" src="src/app.js">
3. Ejecuta app.js:
   a. Hace todos los imports (el navegador descarga los módulos necesarios)
   b. Monta la Navbar en #navbar
   c. Registra las rutas en el Router
   d. Llama Router.start(#app)
4. Router.start() lee el hash de la URL actual
5. Si el hash es vacío → usa la ruta por defecto (/dashboard)
6. Busca DashboardPage y llama DashboardPage.render(document.getElementById('app'))
7. DashboardPage inyecta su HTML en #app
8. La app está lista
```

---

## 8. `src/router.js` — cómo funciona una SPA

### ¿Qué es una SPA?

Una Single Page Application es una web donde:
- Solo hay un archivo HTML.
- La navegación entre "páginas" no recarga el navegador.
- El contenido cambia dinámicamente con JavaScript.

### El hash de la URL

La URL del navegador tiene esta estructura:
```
https://miapp.com/ruta?params=valor#fragmento
                                    ↑
                              esto es el hash
```

El hash (todo lo que va después de `#`) tiene una propiedad especial:
**cambiar el hash no recarga la página**. Y cuando cambia, el navegador
dispara el evento `hashchange`.

El Router aprovecha esto:

```
URL: http://localhost:5500/#/accounts
                             ↑
                       hash = '/accounts'
```

### Ciclo de vida del Router

```
Router.start(root)
    │
    ├── guarda referencia al contenedor root (#app)
    ├── escucha el evento 'hashchange' del window
    └── llama resolve() para renderizar la ruta inicial

hashchange disparado (el usuario hizo clic en un enlace)
    │
    └── resolve()
            ├── lee window.location.hash y extrae la ruta
            ├── busca la función registrada para esa ruta
            ├── emite EventBus.emit('router:beforeNavigate')
            ├── limpia root.innerHTML = ''
            ├── llama await renderFn(root)
            └── emite EventBus.emit('router:afterNavigate')
```

### ¿Por qué `async/await` en resolve?

Las páginas pueden necesitar hacer peticiones al backend antes de
renderizar. Por eso `render` puede ser `async`:

```js
const AccountsPage = {
  render: async (container) => {
    const accounts = await AccountService.getAll(); // espera los datos
    container.innerHTML = `...`; // luego renderiza
  }
};
```

El Router espera con `await pageModule(root)` a que la página
termine de renderizarse.

### Navegación programática

Para navegar desde código (ej.: después de crear una cuenta,
redirigir a la lista):

```js
Router.navigate(ROUTES.ACCOUNTS); // cambia el hash → hashchange → resolve
```

### Ruta 404

Si el usuario navega a una ruta no registrada, el Router muestra
un mensaje de error en lugar de fallar silenciosamente.

---

## 9. `src/events/EventBus.js` — comunicación sin dependencias directas

### El patrón Pub/Sub (Publicar/Suscribir)

El EventBus implementa el patrón Publicador/Suscriptor:
- Quien emite un evento **no sabe quién lo escucha**.
- Quien escucha un evento **no sabe quién lo emite**.

Ambos solo conocen el nombre del evento y la forma de los datos.

### La estructura interna

```js
const listeners = {
  'account:created': [fn1, fn2, fn3],
  'transaction:created': [fn4],
  'router:afterNavigate': [fn5],
};
```

Es simplemente un objeto donde cada clave es un nombre de evento y
cada valor es un array de funciones (los callbacks de los que se suscribieron).

### `on` — suscribirse

```js
const unsubscribe = EventBus.on('account:created', (account) => {
  console.log('Nueva cuenta:', account.alias);
});

// Cuando ya no quieres escuchar:
unsubscribe(); // limpia el listener automáticamente
```

Retorna una función de limpieza. Esto es importante para evitar
**memory leaks**: si un componente se desmonta (el usuario navega a otra página)
pero no elimina sus listeners, esos listeners siguen activos en memoria
y pueden ejecutarse cuando ya no deberían.

### `emit` — publicar

```js
EventBus.emit('account:created', { id: 1, alias: 'Cuenta Principal' });
```

Ejecuta todos los callbacks suscritos a `'account:created'` pasándoles
el objeto como argumento.

### `once` — suscribirse solo una vez

```js
EventBus.once('router:afterNavigate', () => {
  // esto se ejecuta UNA sola vez, luego se elimina automáticamente
  scrollTo(0, 0);
});
```

Útil para acciones que solo deben ocurrir en la próxima navegación.

### Convención de nombres de eventos

Usa el formato `entidad:acción` en minúsculas:

```
account:created       ← se creó una cuenta
account:updated       ← se actualizó una cuenta
account:deleted       ← se eliminó una cuenta
transaction:created   ← se creó una transacción
router:beforeNavigate ← el router está a punto de cambiar de página
router:afterNavigate  ← el router terminó de renderizar la nueva página
auth:login            ← el usuario inició sesión
auth:logout           ← el usuario cerró sesión
```

Esta convención hace que cuando buscas en el código todos los lugares donde
se escucha `'account:created'`, puedas hacer una búsqueda por esa cadena exacta.

### Casos de uso del EventBus en este proyecto

| Quién emite | Evento | Quién escucha |
|-------------|--------|---------------|
| `accountService` | `account:created` | `AccountsPage` (re-renderiza la lista), `DashboardPage` (actualiza el resumen) |
| `transactionService` | `transaction:created` | `TransactionsPage`, `AccountsPage` (actualiza el saldo) |
| `Router` | `router:afterNavigate` | `Navbar` (actualiza el enlace activo) |

---

## 10. `src/api/client.js` — la capa de red

### ¿Qué resuelve?

Cuando usas `fetch` directamente en varios lugares, cada llamada necesita:
- Construir la URL completa.
- Agregar los headers correctos.
- Manejar que la respuesta puede ser un error HTTP.
- Parsear el JSON de la respuesta.

Sin ApiClient, cada service repetiría ese código.

### Estructura del cliente

```js
const ApiClient = (() => {

  const buildHeaders = () => {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('auth_token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  };

  const handleResponse = async (response) => {
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw { status: response.status, message: error.message || 'Error' };
    }
    return response.json();
  };

  const get  = (endpoint)       => fetch(`${API_BASE_URL}${endpoint}`, { method: 'GET',    headers: buildHeaders() }).then(handleResponse);
  const post = (endpoint, body) => fetch(`${API_BASE_URL}${endpoint}`, { method: 'POST',   headers: buildHeaders(), body: JSON.stringify(body) }).then(handleResponse);
  const put  = (endpoint, body) => fetch(`${API_BASE_URL}${endpoint}`, { method: 'PUT',    headers: buildHeaders(), body: JSON.stringify(body) }).then(handleResponse);
  const del  = (endpoint)       => fetch(`${API_BASE_URL}${endpoint}`, { method: 'DELETE', headers: buildHeaders() }).then(handleResponse);

  return { get, post, put, delete: del };
})();
```

### `buildHeaders` — construir cabeceras

Añade automáticamente:
- `Content-Type: application/json` — le dice al servidor que mandamos JSON.
- `Authorization: Bearer <token>` — si el usuario está autenticado.

El token se obtiene de `localStorage` (donde lo guardarás cuando el usuario
inicie sesión).

### `handleResponse` — manejar la respuesta

`fetch` **no lanza error automáticamente con un status 400 o 500**.
Solo lanza error si no pudo hacer la petición (sin internet, DNS falla, etc.).

Por eso `handleResponse` verifica `response.ok` (true si status es 200-299)
y si es false, lanza un error con el mensaje del servidor.

### Errores en los services

Los services usan `try/catch` para capturar los errores del ApiClient:

```js
const create = async (data) => {
  try {
    const account = await ApiClient.post('/accounts', data);
    EventBus.emit('account:created', account);
    return account;
  } catch (error) {
    // error = { status: 400, message: 'El alias ya existe' }
    throw error; // lo propaga a la página para que muestre el mensaje al usuario
  }
};
```

---

## 11. `src/services/` — la lógica de negocio

### ¿Qué es lógica de negocio?

Es el conocimiento específico del dominio de tu aplicación:
- Para crear una cuenta se necesita un tipo y un alias.
- No se puede retirar más de lo que hay en el saldo.
- Una transferencia afecta dos cuentas simultáneamente.

Esas reglas no son "de la UI" ni "del backend". Son del dominio.
Los services son su hogar.

### `accountService.js`

```js
const AccountService = (() => {
  const getAll  = ()         => ApiClient.get('/accounts');
  const getById = (id)       => ApiClient.get(`/accounts/${id}`);

  const create = async (data) => {
    const account = await ApiClient.post('/accounts', data);
    EventBus.emit('account:created', account);
    return account;
  };

  const update = async (id, data) => {
    const updated = await ApiClient.put(`/accounts/${id}`, data);
    EventBus.emit('account:updated', updated);
    return updated;
  };

  const remove = async (id) => {
    await ApiClient.delete(`/accounts/${id}`);
    EventBus.emit('account:deleted', { id });
  };

  return { getAll, getById, create, update, remove };
})();
```

### ¿Por qué los métodos que modifican datos emiten eventos?

Porque cuando creas una cuenta, puede que haya múltiples partes de la UI
que necesiten actualizarse:
- La lista de cuentas.
- El resumen del dashboard.
- Un selector de cuenta en el formulario de transferencias.

Sin EventBus, tendrías que pasar referencias a todos esos módulos.
Con EventBus, cada módulo decide si le importa el evento o no.

### `transactionService.js`

Sigue exactamente el mismo patrón que `accountService.js`.
Cada servicio es independiente y encapsula las operaciones de su entidad.

```js
const TransactionService = (() => {
  const getAll       = (params = {})        => ApiClient.get(`/transactions?${new URLSearchParams(params)}`);
  const getByAccount = (accountId, params)  => ApiClient.get(`/accounts/${accountId}/transactions`);
  const deposit      = async (accountId, payload) => { /* post + emit */ };
  const withdraw     = async (accountId, payload) => { /* post + emit */ };
  const transfer     = async (payload)            => { /* post + emit */ };

  return { getAll, getByAccount, deposit, withdraw, transfer };
})();
```

---

## 12. `src/pages/` — las vistas

### El contrato de una página

Cada página exporta un objeto con una función `render`:

```js
const MiPage = {
  render: async (container) => {
    // container = el <main id="app"> del HTML
    // Tu trabajo: inyectar HTML en container y agregar event listeners
  }
};

export default MiPage;
```

El Router llama esta función pasándole el contenedor.

### Anatomía de una página bien escrita

```js
import AccountService from '../../services/accountService.js';
import Modal          from '../../components/Modal/Modal.js';
import Table          from '../../components/Table/Table.js';
import { formatCurrency, formatDate } from '../../utils/formatter.js';

const AccountsPage = {
  render: async (container) => {

    // 1. ESTRUCTURA: inyectar el HTML base de la página
    container.innerHTML = `
      <div class="page">
        <div class="page__header">
          <h1>Mis Cuentas</h1>
          <button id="btn-nueva-cuenta" class="btn btn--primary">+ Nueva Cuenta</button>
        </div>
        <div id="tabla-cuentas"></div>
      </div>`;

    // 2. DATOS: pedir datos al servicio
    let accounts;
    try {
      accounts = await AccountService.getAll();
    } catch (error) {
      container.innerHTML = `<p class="error">Error al cargar las cuentas: ${error.message}</p>`;
      return;
    }

    // 3. RENDERIZAR COMPONENTES: usar componentes con los datos obtenidos
    Table.render(container.querySelector('#tabla-cuentas'), {
      columns: [
        { key: 'alias',   label: 'Alias' },
        { key: 'type',    label: 'Tipo' },
        { key: 'balance', label: 'Saldo', render: (v) => formatCurrency(v) },
      ],
      data: accounts,
      emptyMessage: 'No tienes cuentas aún.',
    });

    // 4. EVENTOS: agregar listeners a los botones del HTML
    container.querySelector('#btn-nueva-cuenta').addEventListener('click', () => {
      Modal.open({
        title: 'Nueva Cuenta',
        content: `<form id="form-cuenta">
                    <input name="alias" placeholder="Alias" />
                    <select name="type">
                      <option value="checking">Corriente</option>
                      <option value="savings">Ahorros</option>
                    </select>
                  </form>`,
        onConfirm: async () => {
          const form = document.querySelector('#form-cuenta');
          const data = Object.fromEntries(new FormData(form));
          await AccountService.create(data);
          AccountsPage.render(container); // re-renderiza la página
        },
      });
    });
  }
};

export default AccountsPage;
```

### Los 4 pasos de una página

Toda página bien escrita sigue este orden:
1. **Estructura** — inyecta el HTML base (contenedores vacíos, botones).
2. **Datos** — pide los datos a los services (dentro de try/catch).
3. **Renderizar componentes** — usa Table, Modal, etc. con los datos.
4. **Eventos** — agrega los `addEventListener` para los botones.

Este orden garantiza que el HTML existe antes de intentar añadirle listeners.

### ¿Cómo "actualizo" la página?

Sin gestión de estados, la respuesta es simple: **vuelves a llamar `render`**.

```js
// Después de crear una cuenta con éxito:
await AccountService.create(data);
AccountsPage.render(container); // re-renderiza toda la página con los datos actualizados
```

Esto es una decisión intencional. Para la mayoría de proyectos,
re-renderizar una sección es más simple y predecible que mantener
un estado sincronizado con la UI.

Si en el futuro necesitas actualizar solo una parte (optimización),
puedes hacerlo: en lugar de `render(container)`, llamas a una función
interna que actualiza solo el fragmento que cambió.

---

## 13. `src/components/` — piezas reutilizables de UI

La diferencia entre un componente y una página:
- **Página**: conoce su ruta, orquesta servicios, es específica de un contexto.
- **Componente**: no sabe en qué página está, recibe datos por parámetros, es genérico.

### `Navbar.js`

```js
const Navbar = (() => {
  const mount = (container) => {
    // Inyecta el HTML de la barra de navegación
    // Marca el enlace activo según la ruta actual
    // Escucha router:afterNavigate para actualizar el enlace activo
  };
  return { mount };
})();
```

Se monta **una sola vez** en `app.js` y se actualiza automáticamente
gracias al EventBus cada vez que el Router navega.

### `Modal.js`

```js
const Modal = (() => {
  const open  = ({ title, content, onConfirm }) => { /* muestra el modal */ };
  const close = () => { /* oculta el modal */ };
  return { open, close };
})();
```

El Modal existe como un singleton en el DOM (se añade al `<body>` la primera vez
que lo usas). Llamar `Modal.open()` desde cualquier página muestra el mismo modal.

El contenido es HTML que pasas como string en `content`:
```js
Modal.open({
  title: 'Confirmar eliminación',
  content: '<p>¿Estás seguro? Esta acción no se puede deshacer.</p>',
  onConfirm: () => AccountService.remove(accountId),
});
```

### `Table.js`

```js
const Table = (() => {
  const render = (container, { columns, data, emptyMessage }) => {
    // Construye y renderiza la tabla en container
  };
  return { render };
})();
```

La configuración de columnas es un array de objetos:
```js
{
  key: 'balance',  // nombre de la propiedad en el objeto de datos
  label: 'Saldo',  // texto de la cabecera de la columna
  render: (value, row) => formatCurrency(value), // opcional: función de formato
}
```

`render` recibe el valor de esa celda y el objeto completo de la fila,
lo que te permite construir columnas con datos de múltiples propiedades:
```js
{
  key: 'id',
  label: 'Acciones',
  render: (id, account) => `
    <button onclick="...">Editar ${account.alias}</button>
    <button onclick="...">Eliminar</button>
  `,
}
```

---

## 14. `src/utils/` — funciones de apoyo

### ¿Qué es una función pura?

Una función pura:
1. Dado el mismo input, siempre devuelve el mismo output.
2. No tiene efectos secundarios (no modifica el DOM, no llama APIs, no cambia variables externas).

Las utils son funciones puras. Eso las hace:
- Fáciles de probar (no necesitas simular el DOM ni el servidor).
- Fáciles de reutilizar en cualquier contexto.
- Predecibles (nunca te dan sorpresas).

### `formatter.js`

```js
formatCurrency(1234.567)    → "$1,234.57"
formatDate('2026-03-02')    → "2 de marzo de 2026"
formatDateTime('2026-03-02T14:30:00') → "02/03/2026, 14:30"
capitalize('corriente')     → "Corriente"
```

Usa las APIs nativas `Intl.NumberFormat` e `Intl.DateTimeFormat` del navegador,
que son multilenguaje y no necesitan librerías externas.

### `validator.js`

```js
// Validación individual:
required(null)         → { valid: false, message: 'Campo obligatorio.' }
required('hola')       → { valid: true,  message: 'Campo obligatorio.' }
positiveAmount(-50)    → { valid: false, message: 'Monto inválido.' }
isEmail('no-es-email') → { valid: false, message: 'Email inválido.' }

// Validación con múltiples reglas (retorna el primer error):
validate('', [required, (v) => minLength(v, 3)])
// → 'Campo obligatorio.'  (falla en la primera regla)

validate('hi', [required, (v) => minLength(v, 3)])
// → 'Mínimo 3 caracteres.'  (pasa la primera, falla la segunda)

validate('hola', [required, (v) => minLength(v, 3)])
// → null  (pasa todas las reglas)
```

Uso en una página:
```js
const aliasError  = validate(form.alias.value,  [required, (v) => minLength(v, 3)]);
const montoError  = validate(form.monto.value,  [required, positiveAmount]);

if (aliasError) { mostrarError('alias', aliasError); return; }
if (montoError) { mostrarError('monto', montoError); return; }

// Si llegamos aquí, los datos son válidos
await AccountService.create({ alias: form.alias.value, ... });
```

### `dom.js`

```js
// $ es equivalente a document.querySelector pero lanza un error descriptivo si no existe
const btn = $('#btn-guardar');

// $$ es equivalente a document.querySelectorAll pero retorna un Array real
const items = $$('.item'); // puedes usar .forEach, .map, .filter directamente

// toggleVisibility añade/quita la clase CSS 'hidden'
toggleVisibility(spinner, true);   // spinner visible
toggleVisibility(spinner, false);  // spinner oculto (tiene clase 'hidden')

// clearElement limpia el innerHTML
clearElement(container);
```

---

## 15. El patrón IIFE y por qué lo usamos

### ¿Qué es un IIFE?

IIFE = Immediately Invoked Function Expression (Función que se invoca inmediatamente).

```js
const MiModulo = (() => {
  // variables privadas — nadie de afuera puede acceder a ellas
  const privado = 'solo visible aquí';

  // funciones públicas — lo que retornamos es accesible desde afuera
  const publico = () => { ... };

  return { publico };
})(); // ← los paréntesis del final la invocan inmediatamente
```

### ¿Por qué lo usamos?

En los módulos ES, todas las variables de un módulo ya son privadas por defecto
(no contaminan el scope global). Pero el IIFE añade una capa extra:
permite tener **variables privadas dentro del módulo** que solo las funciones
del mismo módulo pueden ver.

Ejemplo en el Router:
```js
const Router = (() => {
  const routes = {};     // privado: ningún código externo puede modificar routes directamente
  let root = null;       // privado: solo las funciones internas alteran root

  const add = (path, fn) => { routes[path] = fn; };   // público
  const start = (rootEl) => { root = rootEl; ... };   // público

  return { add, start }; // solo exponemos add y start
})();

// Desde afuera:
Router.add('/dashboard', fn);   // correcto
Router.routes['/dashboard'];    // undefined — routes es privado
```

### Alternativa: Class

Podrías usar `class` en lugar de IIFE. Son equivalentes en funcionalidad:
```js
class RouterClass {
  #routes = {};  // campo privado de class
  #root = null;

  add(path, fn) { this.#routes[path] = fn; }
  start(rootEl) { this.#root = rootEl; }
}
const Router = new RouterClass();
```

El IIFE es más tradicional en Vanilla JS y no requiere instanciar con `new`.
El `class` es más moderno y familiar si vienes de otros lenguajes.
Ambos son válidos. Este proyecto usa IIFE por consistencia.

---

## 16. Flujos completos de ejemplo

### Flujo 1: Cargar la lista de cuentas

```
1. Usuario abre la app en el navegador
2. URL: http://localhost:5500/#/accounts

3. app.js se ejecuta:
   - Monta Navbar en #navbar
   - Registra Router.add('/accounts', AccountsPage.render)
   - Llama Router.start(#app)

4. Router.start():
   - Lee el hash: '/accounts'
   - Llama AccountsPage.render(document.getElementById('app'))

5. AccountsPage.render(container):
   a. Inyecta HTML base en container (encabezado + div vacío para la tabla)
   b. Llama await AccountService.getAll()

6. AccountService.getAll():
   - Llama ApiClient.get('/accounts')

7. ApiClient.get('/accounts'):
   - Construye headers (con token si existe)
   - Hace fetch('http://localhost:3000/api/accounts', { GET, headers })
   - Espera respuesta del servidor
   - handleResponse() verifica que sea 200 OK
   - Retorna el array de cuentas parseado como JSON

8. AccountService.getAll() retorna el array a AccountsPage

9. AccountsPage.render() continúa:
   c. Llama Table.render(container.querySelector('#tabla-cuentas'), { columns, data: accounts })

10. Table.render():
    - Construye el HTML de la tabla con las cuentas
    - Aplica formatCurrency() a los saldos
    - Inyecta la tabla en el div #tabla-cuentas

11. AccountsPage.render() agrega los event listeners a los botones

12. La lista de cuentas está visible en pantalla
```

### Flujo 2: Crear una cuenta nueva

```
1. Usuario hace clic en botón "+ Nueva Cuenta"

2. AccountsPage (listener del botón):
   - Llama Modal.open({ title, content: formulario HTML, onConfirm: ... })

3. Modal.open():
   - Inyecta el formulario en el modal
   - Muestra el overlay del modal
   - Registra el callback de onConfirm en el botón "Confirmar"

4. Usuario llena el formulario y hace clic en "Confirmar"

5. onConfirm() se ejecuta:
   a. Lee los valores del formulario con FormData
   b. Valida con validator.js (alias requerido, tipo requerido)
   c. Si hay errores → muestra mensajes y NO continúa
   d. Si todo ok → llama await AccountService.create(data)
   e. Modal.close() cierra el modal

6. AccountService.create(data):
   - Llama ApiClient.post('/accounts', data)
   - Recibe la cuenta creada del servidor
   - Llama EventBus.emit('account:created', nuevaCuenta)
   - Retorna la cuenta creada

7. EventBus.emit('account:created') notifica a todos los listeners:
   - DashboardPage (si está escuchando) actualiza el resumen

8. onConfirm() recibe la cuenta y llama AccountsPage.render(container)

9. AccountsPage.render() se vuelve a ejecutar:
   - Pide las cuentas (ahora incluye la nueva)
   - Re-renderiza la tabla
   - La nueva cuenta aparece en la lista
```

### Flujo 3: Navegar entre páginas

```
1. Usuario hace clic en el enlace "Transacciones" en la Navbar

2. El anchor <a href="#/transactions"> cambia el hash de la URL
   URL: http://localhost:5500/#/transactions

3. El navegador dispara el evento 'hashchange'

4. Router escuchando hashchange → llama resolve()

5. Router.resolve():
   a. Lee hash: '/transactions'
   b. EventBus.emit('router:beforeNavigate', { path: '/transactions' })
   c. Limpia: root.innerHTML = '' (elimina la página anterior del DOM)
   d. Busca la función registrada: TransactionsPage.render
   e. Llama await TransactionsPage.render(root)
   f. EventBus.emit('router:afterNavigate', { path: '/transactions' })

6. Navbar escucha 'router:afterNavigate':
   - Elimina la clase 'nav__link--active' de todos los enlaces
   - Añade 'nav__link--active' al enlace de '/transactions'

7. TransactionsPage.render() se ejecuta (como en el Flujo 1)

8. La página de transacciones está visible y el enlace activo cambió
```

---

## 17. Reglas de dependencias entre capas

Esto es lo más importante de mantener para que la arquitectura se conserve.

### Las capas y su jerarquía

```
┌─────────────────────────────┐  Nivel más alto
│          Pages              │  ← Las páginas pueden usar todo lo de abajo
├─────────────────────────────┤
│        Components           │  ← Los componentes pueden usar Services, Utils, EventBus
├─────────────────────────────┤
│         Services            │  ← Los servicios pueden usar ApiClient, EventBus, Utils
├─────────────────────────────┤
│    ApiClient + EventBus     │  ← Solo usan constants y módulos externos
├─────────────────────────────┤
│    Utils + Constants        │  ← No importan nada del propio proyecto
└─────────────────────────────┘  Nivel más bajo
```

### La regla: las dependencias solo van hacia abajo

| ¿Puede importar? | Sí | No |
|------------------|----|----|
| **Page** | Services, Components, Utils, EventBus, Constants | Otras Pages |
| **Component** | Utils, EventBus, Constants | Pages, Services (excepto Navbar) |
| **Service** | ApiClient, EventBus, Utils, Constants | Pages, Components |
| **ApiClient** | Constants | Nada más del proyecto |
| **EventBus** | nada | Nada |
| **Utils** | Constants | Nada más del proyecto |

### ¿Por qué los Components no deben importar Services (en general)?

Un componente como `Table` o `Modal` no sabe nada del dominio bancario.
Le pasas datos y los muestra. Si `Table` importara `AccountService`,
dejaría de ser reutilizable en otros contextos.

La excepción es `Navbar`, que escucha eventos del Router.
Pero incluso ahí, no llama a servicios directamente.

### ¿Por qué las Pages no deben importar otras Pages?

Porque si `AccountsPage` importa `DashboardPage`, creamos una cadena de
dependencias que vuelve el código difícil de mantener.
La comunicación entre páginas se hace a través del Router (navegar)
o del EventBus (notificar).

### Señales de que estás rompiendo la arquitectura

- Un Service tiene `container.innerHTML = ...` → está haciendo trabajo de UI.
- Una Page tiene `fetch(...)` directamente → está saltándose la capa de Services.
- Un componente genérico (Table, Modal) importa un Service → acoplamiento incorrecto.
- Un Service importa otro Service → puede estar bien, pero evalúa si hay una
  abstracción mejor (ej.: moverlo a un tercer service o a utils).

---

## 18. Cómo escalar el proyecto paso a paso

### Añadir un nuevo módulo de negocio (ej.: Préstamos)

**Paso 1: Declarar la ruta en constants.js**
```js
export const ROUTES = {
  DASHBOARD:    '/dashboard',
  ACCOUNTS:     '/accounts',
  TRANSACTIONS: '/transactions',
  LOANS:        '/loans',           // ← añadir aquí
};
```

**Paso 2: Crear el servicio**
Crea `src/services/loanService.js` copiando la estructura de `accountService.js`:
```js
import ApiClient from '../api/client.js';
import EventBus  from '../events/EventBus.js';

const LoanService = (() => {
  const getAll  = ()        => ApiClient.get('/loans');
  const create  = (data)    => { /* ... */ };
  // ...
  return { getAll, create, ... };
})();

export default LoanService;
```

**Paso 3: Crear la página**
Crea `src/pages/Loans/LoansPage.js`:
```js
import LoanService from '../../services/loanService.js';

const LoansPage = {
  render: async (container) => {
    // ...
  }
};

export default LoansPage;
```

**Paso 4: Registrar en app.js**
```js
import LoansPage from './pages/Loans/LoansPage.js';
Router.add(ROUTES.LOANS, LoansPage.render);
```

**Paso 5: Añadir el enlace en Navbar**
En `Navbar.js`, añade el nuevo enlace al array de `navLinks`:
```js
const navLinks = [
  { label: 'Dashboard',     path: ROUTES.DASHBOARD },
  { label: 'Cuentas',       path: ROUTES.ACCOUNTS },
  { label: 'Transacciones', path: ROUTES.TRANSACTIONS },
  { label: 'Préstamos',     path: ROUTES.LOANS },  // ← añadir
];
```

Eso es todo. Sin tocar nada más.

### Añadir un componente nuevo (ej.: tarjeta de resumen)

Crea `src/components/SummaryCard/SummaryCard.js`:
```js
const SummaryCard = (() => {
  const render = (container, { title, value, icon }) => {
    container.innerHTML = `
      <div class="summary-card">
        <span class="summary-card__icon">${icon}</span>
        <div>
          <p class="summary-card__title">${title}</p>
          <p class="summary-card__value">${value}</p>
        </div>
      </div>`;
  };
  return { render };
})();

export default SummaryCard;
```

Úsalo en cualquier página:
```js
import SummaryCard from '../../components/SummaryCard/SummaryCard.js';

SummaryCard.render(container.querySelector('#resumen-saldo'), {
  title: 'Saldo Total',
  value: formatCurrency(totalBalance),
  icon: '💰',
});
```

### Añadir autenticación

**Paso 1:** Crea `src/services/authService.js` con `login`, `logout`, `getToken`.
**Paso 2:** Crea `src/pages/Login/LoginPage.js`.
**Paso 3:** Registra la ruta `/login` en `app.js`.
**Paso 4:** En `Router.resolve()`, antes de renderizar cualquier página,
verifica si hay token. Si no hay → redirige a `/login`.
**Paso 5:** `authService.login()` guarda el token en `localStorage`.
`authService.logout()` lo elimina y navega a `/login`.

### Añadir paginación

En el service, acepta parámetros:
```js
const getAll = ({ page = 1, limit = 10 } = {}) =>
  ApiClient.get(`/transactions?page=${page}&limit=${limit}`);
```

En la página, guarda la página actual en una variable local y
recarga cuando el usuario hace clic en "siguiente":
```js
let currentPage = 1;

const loadPage = async (page) => {
  const { data, total } = await TransactionService.getAll({ page, limit: 10 });
  Table.render(tableContainer, { columns, data });
  renderPagination(paginationContainer, { page, total, onPageChange: loadPage });
};

loadPage(1);
```

---

## 19. Errores comunes y cómo evitarlos

### Error 1: Agregar event listeners sin limpiarlos

**Problema:**
```js
// Cada vez que render() se ejecuta, agrega un nuevo listener al mismo botón
container.innerHTML = `<button id="btn">Click</button>`;
document.getElementById('btn').addEventListener('click', handler);
// Si render() se llama 5 veces → el handler se ejecuta 5 veces por click
```

**Solución:**
Agrega los listeners al HTML recién creado, no a elementos persistentes:
```js
container.innerHTML = `<button id="btn">Click</button>`;
// Aquí #btn es nuevo, así que tiene 0 listeners previos
container.querySelector('#btn').addEventListener('click', handler);
```

O usa event delegation:
```js
container.addEventListener('click', (e) => {
  if (e.target.matches('#btn')) handler(e);
});
```

### Error 2: Olvidar `await` en operaciones asíncronas

**Problema:**
```js
const create = (data) => {  // ← olvidó async
  const account = ApiClient.post('/accounts', data); // ← account es una Promise, no datos
  EventBus.emit('account:created', account); // emite una Promise, no la cuenta
};
```

**Solución:**
```js
const create = async (data) => {
  const account = await ApiClient.post('/accounts', data); // await resuelve la Promise
  EventBus.emit('account:created', account);
};
```

### Error 3: No manejar errores en las páginas

**Problema:**
```js
render: async (container) => {
  const accounts = await AccountService.getAll(); // si falla, la app se rompe silenciosamente
  Table.render(...);
}
```

**Solución:**
```js
render: async (container) => {
  try {
    const accounts = await AccountService.getAll();
    Table.render(...);
  } catch (error) {
    container.innerHTML = `
      <div class="error">
        <p>No se pudieron cargar las cuentas.</p>
        <p>${error.message}</p>
        <button onclick="AccountsPage.render(this.closest('#app'))">Reintentar</button>
      </div>`;
  }
}
```

### Error 4: Usar `onclick="..."` en HTML para funciones de módulos

**Problema:**
```js
container.innerHTML = `<button onclick="AccountService.remove(${id})">Eliminar</button>`;
// AccountService no está en el scope global, esto falla
```

**Solución:**
Agrega los listeners después de inyectar el HTML:
```js
container.innerHTML = `<button class="btn-eliminar" data-id="${id}">Eliminar</button>`;
container.querySelectorAll('.btn-eliminar').forEach(btn => {
  btn.addEventListener('click', () => AccountService.remove(btn.dataset.id));
});
```

### Error 5: Rutas hardcodeadas como strings

**Problema:**
```js
Router.navigate('/accounts'); // string literal en múltiples archivos
```

**Solución:**
```js
import { ROUTES } from '../../config/constants.js';
Router.navigate(ROUTES.ACCOUNTS); // único lugar donde cambiarlo
```

### Error 6: Importar con rutas incorrectas

**Problema:**
```js
import AccountService from 'services/accountService'; // sin ./ y sin .js
```

**Solución:**
```js
import AccountService from '../services/accountService.js'; // ruta relativa + .js
```

---

## 20. Glosario de términos

**SPA (Single Page Application)**
Aplicación web que carga un único HTML y actualiza el contenido dinámicamente
con JavaScript, sin recargar la página al navegar.

**Módulo ES (ES Module)**
Sistema nativo del navegador y Node.js para dividir JavaScript en archivos
que pueden exportar e importar entre sí con la sintaxis `import`/`export`.

**Hash (fragmento de URL)**
La parte de la URL que comienza con `#`. Cambiar el hash no recarga la página.
El evento `hashchange` se dispara cuando cambia.

**IIFE (Immediately Invoked Function Expression)**
Función que se define y se ejecuta inmediatamente. Se usa en este proyecto
para crear módulos con variables privadas.

**Patrón Pub/Sub (Publicador/Suscriptor)**
Patrón de diseño donde un módulo publica eventos sin saber quién los escucha,
y otros módulos se suscriben a eventos sin saber quién los publica.
El EventBus implementa este patrón.

**Función pura**
Función que dado el mismo input siempre retorna el mismo output y no tiene
efectos secundarios (no modifica variables externas, no llama APIs, no toca el DOM).

**Lógica de negocio**
Reglas específicas del dominio de la aplicación (bancario, en este caso):
qué datos necesita una cuenta, cómo se calcula un saldo, qué validaciones
tiene una transferencia.

**Capa**
Agrupación de código con una responsabilidad específica. Las capas de este
proyecto son: Pages, Components, Services, ApiClient, EventBus, Utils.

**Escalabilidad**
La capacidad de hacer crecer el proyecto añadiendo funcionalidades nuevas
sin tener que reescribir o restructurar lo que ya existe.

**Memory leak (fuga de memoria)**
Cuando un objeto o función permanece en memoria aunque ya no sea necesario.
En este proyecto puede ocurrir si los listeners del EventBus no se eliminan
cuando una página se desmonta.

**Singleton**
Patrón donde solo existe una instancia de un objeto en toda la aplicación.
En este proyecto, `Router`, `EventBus`, `ApiClient`, `Modal` son singletons:
solo hay uno de cada uno.

**Delegación de eventos (Event delegation)**
Técnica donde en lugar de poner un listener en cada elemento hijo,
se pone un listener en el elemento padre y se usa `event.target` para
saber en cuál hijo se hizo clic. Útil cuando los hijos son dinámicos.

**`async`/`await`**
Sintaxis de JavaScript para manejar operaciones asíncronas (como peticiones
a una API) de forma que el código se lea de manera secuencial.

**`FormData`**
API del navegador para leer automáticamente todos los campos de un formulario
HTML como pares clave-valor. `Object.fromEntries(new FormData(form))` convierte
el formulario en un objeto plano.

---

*Última actualización: Marzo 2026*
