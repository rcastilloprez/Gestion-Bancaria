# Fase 6: Documentación
## Documentar el proyecto para usuarios y desarrolladores

**Duración estimada:** Continuo + 2-3 días intensivos pre-release
**Prerequisito:** Código funcional (Fase 4) y testeado (Fase 5)
**Cuándo usar:** Durante todo el desarrollo + consolidación final

---

## 🎯 Objetivo de esta fase
Crear documentación clara y útil para:
- **Usuarios:** Cómo usar la aplicación
- **Desarrolladores:** Cómo entender, modificar y extender el código
- **Tu yo futuro:** Entender decisiones y contexto en 6 meses

**Regla de oro:** Si no está documentado, no existe. Código sin contexto es código perdido.

---

## 📋 Tipos de Documentación

### Matriz de Documentación

```markdown
| Documento | Audiencia | Cuándo | Esfuerzo |
|-----------|-----------|--------|----------|
| README.md | Usuario/Dev | Continuo | Alto |
| USER_GUIDE.md | Usuario | Pre-release | Medio |
| API.md | Developer | Pre-release | Alto |
| ARCHITECTURE.md | Developer | Fase 3 | Alto |
| CHANGELOG.md | Usuario/Dev | Continuo | Bajo |
| CONTRIBUTING.md | Contributor | Opcional | Medio |
| CODE_COMMENTS | Developer | Durante código | Bajo |
| KNOWN_ISSUES.md | Usuario/Dev | Pre-release | Bajo |
| FAQ.md | Usuario | Post-release | Medio |
```

---

## 📄 Documentos Esenciales

### 1. README.md (El más importante)

**Propósito:** Primera impresión del proyecto
**Audiencia:** Todos (usuarios, devs, reclutadores)
**Actualizar:** Continuo

```markdown
# Gestión Bancaria

> Aplicación web para gestionar cuentas bancarias y transacciones personales

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/usuario/repo)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 🌟 Features

- ✅ Gestión de múltiples cuentas (ahorro, corriente, inversión)
- ✅ Registro de transacciones (depósitos, retiros, transferencias)
- ✅ Visualización de historial completo
- ✅ Cálculo automático de balances
- ✅ Filtrado de transacciones
- ✅ Interfaz simple e intuitiva
- ✅ 100% privado (datos almacenados localmente)

---

## 🚀 Demo

**[Ver Demo en Vivo](https://usuario.github.io/gestion-bancaria)**

### Screenshots

![Dashboard](docs/images/screenshot-dashboard.png)
![Transacciones](docs/images/screenshot-transactions.png)

---

## 🎯 Casos de Uso

### Para quién es esta aplicación:
- ✅ Personas que manejan múltiples cuentas bancarias
- ✅ Usuarios que quieren privacidad (sin apps comerciales)
- ✅ Quienes prefieren simplicity sobre features complejas

### Qué NO es:
- ❌ No se conecta con bancos reales
- ❌ No es para múltiples usuarios
- ❌ No tiene features de presupuesto/inversión (aún)

---

## 🏁 Inicio Rápido

### Prerequisites

- Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+)
- Node.js 18+ (solo para desarrollo)

### Instalación

#### Opción 1: Usar directamente (no requiere instalación)
```bash
# Descargar y abrir index.html en navegador
```

#### Opción 2: Para desarrollo
```bash
# Clonar repositorio
git clone https://github.com/usuario/gestion-bancaria.git
cd gestion-bancaria

# Instalar dependencias
npm install

# Levantar servidor de desarrollo
npm run dev

# Abrir en navegador
# http://localhost:3000
```

---

## 📖 Guía de Uso

### Crear tu primera cuenta

1. Abrir la aplicación
2. Navegar a **Cuentas**
3. Click en **"Nueva Cuenta"**
4. Llenar formulario:
   - Nombre: ej. "Ahorro Principal"
   - Tipo: Ahorro / Corriente / Inversión
   - Balance inicial: ej. 1000
5. Click en **"Guardar"**

### Registrar una transacción

#### Depósito
1. Ir a **Transacciones**
2. Click **"Nuevo Depósito"**
3. Seleccionar cuenta
4. Ingresar monto y descripción
5. Guardar

#### Retiro
Similar a depósito, pero con validación de saldo suficiente.

#### Transferencia
1. Click **"Nueva Transferencia"**
2. Seleccionar cuenta origen
3. Seleccionar cuenta destino
4. Ingresar monto
5. Guardar (actualiza ambas cuentas)

---

## 🛠️ Stack Tecnológico

### Frontend
- **Vanilla JavaScript** (ES6+) - Sin frameworks
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos

### Datos
- **JSON File** (desarrollo) - db.json
- **LocalStorage** (alternativa) - Para persistencia client-side

### Tools
- **Vite** - Dev server y build tool
- **ESLint** - Linting
- **Prettier** - Code formatting

### Deployment
- **Netlify/Vercel** - Hosting

---

## 📁 Estructura del Proyecto

```
gestion-bancaria/
├── docs/                  # Documentación
│   ├── ciclo-vida/       # Guías de proceso
│   ├── user-stories/     # Especificaciones
│   └── images/           # Screenshots
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── Table/
│   │   ├── Button/
│   │   └── Modal/
│   ├── pages/            # Páginas
│   │   ├── Accounts/
│   │   ├── Transactions/
│   │   └── Dashboard/
│   ├── services/         # Lógica de negocio
│   │   ├── accountService.js
│   │   └── transactionService.js
│   ├── repositories/     # Acceso a datos
│   ├── utils/            # Utilidades
│   ├── router.js         # Routing
│   └── main.js           # Entry point
├── public/
│   └── index.html
├── db.json               # Base de datos (dev)
├── package.json
└── README.md             # Este archivo
```

---

## 🧪 Testing

### Manual Testing
```bash
# Abrir en browser y probar manualmente
npm run dev
```

### Automated Tests (futuro)
```bash
npm test              # Unit tests
npm run test:e2e      # E2E tests
npm run coverage      # Coverage report
```

---

## 📝 Scripts Disponibles

```bash
npm run dev           # Levantar dev server
npm run build         # Build para producción
npm run preview       # Preview del build
npm run lint          # Linting
npm run format        # Formatear código
```

---

## 🗺️ Roadmap

### v1.0 (Actual) - MVP
- [x] Gestión de cuentas
- [x] Transacciones básicas
- [x] Visualización de historial

### v1.1 (Próximo mes)
- [ ] Categorización de gastos
- [ ] Reportes mensuales
- [ ] Exportar a CSV

### v1.2 (Trimestre Q2)
- [ ] Gráficas de ingresos/gastos
- [ ] Presupuestos
- [ ] Dark mode

### v2.0 (Futuro)
- [ ] Backend real con API
- [ ] Multi-usuario
- [ ] App móvil

---

## 🤝 Contribuir

**Este es un proyecto educativo personal**, pero si quieres contribuir:

1. Fork el repositorio
2. Crea branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para más detalles.

---

## 📄 Licencia

Distribuido bajo licencia MIT. Ver `LICENSE` para más información.

---

## 👤 Autor

**Roberto Carlos**

- GitHub: [@usuario](https://github.com/usuario)
- LinkedIn: [Roberto Carlos](https://linkedin.com/in/usuario)
- Email: email@example.com

---

## 🙏 Agradecimientos

- [Excalidraw](https://excalidraw.com) - Para wireframes
- [MDN Web Docs](https://developer.mozilla.org/) - Referencia JS
- [Claude Code](https://claude.com/claude-code) - Asistente de desarrollo

---

## 🐛 Reportar Bugs

Si encuentras un bug:

1. Verificar que no esté ya reportado en [Issues](https://github.com/usuario/repo/issues)
2. Crear issue con detalles:
   - Descripción clara
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots si aplica

---

## ❓ FAQ

### ¿Es gratis?
Sí, 100% gratis y open source.

### ¿Mis datos están seguros?
Tus datos se almacenan localmente en tu dispositivo. Nadie más tiene acceso.

### ¿Puedo usarlo en móvil?
Sí, la interfaz es responsive. Versión native móvil planificada para v2.0.

### ¿Se conecta con mi banco?
No. Es entrada manual de transacciones. Conexión bancaria requeriría APIs específicas de cada banco.

---

## 📊 Estado del Proyecto

![GitHub last commit](https://img.shields.io/github/last-commit/usuario/repo)
![GitHub issues](https://img.shields.io/github/issues/usuario/repo)
![GitHub pull requests](https://img.shields.io/github/issues-pr/usuario/repo)

---

**Hecho con ❤️ y JavaScript**
```

---

### 2. USER_GUIDE.md (Guía del Usuario)

**Propósito:** Tutorial paso a paso
**Audiencia:** Usuarios finales
**Actualizar:** Pre-release

```markdown
# Guía del Usuario - Gestión Bancaria

**Versión:** 1.0.0
**Última actualización:** 2026-03-20

---

## 📚 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Primeros Pasos](#primeros-pasos)
3. [Gestión de Cuentas](#gestión-de-cuentas)
4. [Transacciones](#transacciones)
5. [Visualización y Reportes](#visualización-y-reportes)
6. [Consejos y Trucos](#consejos-y-trucos)
7. [Solución de Problemas](#solución-de-problemas)

---

## Introducción

### ¿Qué es Gestión Bancaria?

Gestión Bancaria es una aplicación web que te permite:
- Llevar control de múltiples cuentas bancarias
- Registrar todas tus transacciones (depósitos, retiros, transferencias)
- Ver tu balance total actualizado en tiempo real
- Mantener un historial completo de movimientos

### ¿Por qué usarla?

- **Privacidad:** Tus datos nunca salen de tu dispositivo
- **Simplicidad:** Sin features innecesarias, solo lo esencial
- **Gratuita:** Sin costos ocultos ni suscripciones
- **Multi-cuenta:** Consolida todas tus cuentas en un solo lugar

---

## Primeros Pasos

### Acceder a la Aplicación

1. Abrir navegador (Chrome, Firefox, Safari, Edge)
2. Navegar a `https://tu-app.netlify.app` (o abrir `index.html` localmente)
3. La aplicación carga automáticamente

### Interfaz Principal

La aplicación tiene 3 secciones principales:

```
┌─────────────────────────────────────┐
│  [Dashboard] [Cuentas] [Transacc.] │
└─────────────────────────────────────┘
```

- **Dashboard:** Vista general de tus finanzas
- **Cuentas:** Gestionar tus cuentas bancarias
- **Transacciones:** Ver y registrar movimientos

---

## Gestión de Cuentas

### Crear una Cuenta

**Paso 1:** Ir a la sección **Cuentas**

**Paso 2:** Click en botón **"+ Nueva Cuenta"**

**Paso 3:** Llenar el formulario

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **Nombre** | Nombre descriptivo de la cuenta | "Ahorro Emergencias" |
| **Tipo** | Tipo de cuenta | Ahorro / Corriente / Inversión |
| **Balance Inicial** | Dinero que tienes actualmente | 5000 |
| **Moneda** | Opcional (default: MXN) | MXN, USD, EUR |

**Paso 4:** Click **"Guardar"**

✅ **Resultado:** Tu cuenta aparece en la lista con el balance registrado.

---

### Editar una Cuenta

1. En la lista de cuentas, click en el **ícono de editar** (✏️)
2. Modificar los campos que desees
3. Click **"Guardar Cambios"**

⚠️ **Nota:** No puedes editar el balance directamente (solo via transacciones).

---

### Eliminar una Cuenta

1. Click en **ícono de eliminar** (🗑️)
2. Confirmar la acción

⚠️ **Advertencia:**
- Solo puedes eliminar cuentas sin transacciones
- Si tiene transacciones, primero elimina las transacciones (o implementamos cascade delete)

---

## Transacciones

### Tipos de Transacciones

#### 1. Depósito (Entrada de dinero)
**Cuándo usar:** Cuando recibes dinero (salario, venta, ingreso)

**Pasos:**
1. Ir a **Transacciones**
2. Click **"Nuevo Depósito"**
3. Llenar formulario:
   - **Cuenta:** Donde depositas
   - **Monto:** Cantidad (ej: 1500)
   - **Descripción:** Opcional (ej: "Salario quincenal")
   - **Fecha:** Seleccionar (default: hoy)
4. Click **"Registrar"**

✅ **Efecto:** Balance de la cuenta aumenta.

---

#### 2. Retiro (Salida de dinero)
**Cuándo usar:** Cuando gastas dinero

**Pasos:**
1. Click **"Nuevo Retiro"**
2. Llenar formulario:
   - **Cuenta:** De donde sale el dinero
   - **Monto:** Cantidad
   - **Descripción:** Ej: "Compras supermercado"
3. Click **"Registrar"**

✅ **Efecto:** Balance de la cuenta disminuye.

⚠️ **Validación:** No puedes retirar más dinero del que tienes.

---

#### 3. Transferencia (Mover entre cuentas)
**Cuándo usar:** Cuando mueves dinero de una cuenta tuya a otra

**Pasos:**
1. Click **"Nueva Transferencia"**
2. Llenar formulario:
   - **Cuenta Origen:** De donde sale
   - **Cuenta Destino:** A donde va
   - **Monto:** Cantidad
   - **Descripción:** Opcional
3. Click **"Transferir"**

✅ **Efecto:**
- Cuenta origen: balance disminuye
- Cuenta destino: balance aumenta
- Balance total: sin cambios

⚠️ **Validaciones:**
- No puedes transferir a la misma cuenta
- Cuenta origen debe tener saldo suficiente

---

### Ver Historial de Transacciones

**Ubicación:** Sección **Transacciones**

**Información mostrada:**
- Fecha
- Tipo (Depósito / Retiro / Transferencia)
- Cuenta(s) involucrada(s)
- Monto
- Descripción
- Balance resultante

**Ordenamiento:** Más recientes primero (por defecto)

---

### Filtrar Transacciones

**Para encontrar transacciones específicas:**

1. Usar dropdown **"Tipo"**
   - Todas
   - Solo Depósitos
   - Solo Retiros
   - Solo Transferencias

2. Usar búsqueda por descripción (si implementado)
   - Escribir términos en buscador
   - Resultados se filtran automáticamente

---

## Visualización y Reportes

### Dashboard

**Ubicación:** Pantalla principal

**Información:**
- **Balance Total:** Suma de todas tus cuentas
- **Resumen por Cuenta:** Balance individual
- **Últimas Transacciones:** Últimos 5-10 movimientos

**Uso:**
Dashboard es tu "vista rápida" para saber tu situación financiera en segundos.

---

### Ver Detalle de Cuenta

1. En **Cuentas**, click en nombre de cuenta
2. Ve detalle con:
   - Balance actual
   - Todas las transacciones de esa cuenta
   - Gráficas (si implementado en v1.1)

---

## Consejos y Trucos

### 💡 Tip 1: Registra transacciones diariamente
No esperes a fin de mes. Registra cada movimiento el mismo día para mantener precisión.

### 💡 Tip 2: Usa descripciones claras
En lugar de "Compra", escribe "Súper Walmart - Despensa semanal"
Así encontrarás transacciones fácilmente después.

### 💡 Tip 3: Separa tus cuentas por propósito
- Cuenta 1: Gastos diarios
- Cuenta 2: Ahorro emergencias
- Cuenta 3: Ahorro objetivos

### 💡 Tip 4: Revisa tu dashboard semanalmente
Dedica 5 minutos cada domingo para revisar tus finanzas.

### 💡 Tip 5: Backup de datos
Exporta tus datos regularmente (v1.1 tendrá feature de export)

---

## Solución de Problemas

### ❓ La app no carga

**Posibles causas:**
- Navegador muy viejo
- JavaScript deshabilitado
- Problema de conectividad (si está hosted)

**Solución:**
1. Actualizar navegador a última versión
2. Verificar que JavaScript esté habilitado
3. Intentar en navegador diferente
4. Limpiar caché: `Ctrl + Shift + Delete`

---

### ❓ Mis datos desaparecieron

**Posibles causas:**
- Limpiaste caché del navegador
- Usaste modo incognito (datos no persisten)
- Cambiaste de dispositivo

**Prevención:**
- Exportar datos regularmente (feature coming en v1.1)
- No usar modo incognito
- No limpiar storage del navegador

**Si ya perdiste datos:**
- No hay forma de recuperarlos (datos locales)
- Empezar de nuevo

---

### ❓ No puedo registrar un retiro

**Error:** "Saldo insuficiente"

**Causa:** Intentas retirar más dinero del que tienes en la cuenta

**Solución:**
- Verificar balance de la cuenta
- Reducir monto del retiro
- O hacer depósito primero

---

### ❓ El balance no se actualiza

**Pasos:**
1. Refresh la página (`F5`)
2. Verificar consola de DevTools (`F12`) por errores
3. Verificar que la transacción se registró
4. Si problema persiste, reportar bug

---

### ❓ ¿Cómo reportar un problema?

1. Ir a [GitHub Issues](https://github.com/usuario/repo/issues)
2. Click **"New Issue"**
3. Describir problema con:
   - Qué estabas haciendo
   - Qué esperabas
   - Qué pasó realmente
   - Screenshots si es posible
4. Submit

---

## Glosario

**Balance:** Cantidad total de dinero en una cuenta

**Transacción:** Cualquier movimiento de dinero (depósito, retiro, transferencia)

**Cuenta Origen:** En transferencias, la cuenta de donde sale el dinero

**Cuenta Destino:** En transferencias, la cuenta a donde llega el dinero

**Balance Total:** Suma de dinero en todas las cuentas

---

## Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Alt + 1` | Ir a Dashboard |
| `Alt + 2` | Ir a Cuentas |
| `Alt + 3` | Ir a Transacciones |
| `Ctrl + N` | Nueva cuenta (en página Cuentas) |
| `Ctrl + T` | Nueva transacción (en página Transacciones) |
| `Esc` | Cerrar modal |
| `/` | Focus en búsqueda |

---

## Contacto y Soporte

¿Tienes preguntas? ¿Encontraste un bug? ¿Sugerencias?

- **Email:** soporte@ejemplo.com
- **GitHub Issues:** [Reportar aquí](https://github.com/usuario/repo/issues)
- **Twitter:** [@usuario](https://twitter.com/usuario)

**Tiempo de respuesta:** 24-48 horas

---

## Changelog

### v1.0.0 (2026-03-25)
- Release inicial
- Gestión de cuentas
- Transacciones (depósito, retiro, transferencia)
- Visualización de historial

Para ver todos los cambios, consultar [CHANGELOG.md](../CHANGELOG.md)

---

**¡Gracias por usar Gestión Bancaria!** 💰
```

---

### 3. CHANGELOG.md (Historial de Cambios)

**Propósito:** Track de qué cambió en cada versión
**Audiencia:** Usuarios y developers
**Actualizar:** Con cada feature/fix

```markdown
# Changelog

Todos los cambios notables del proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto usa [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Categorización de transacciones (en desarrollo)

### Changed
- Ninguno

### Fixed
- Ninguno

---

## [1.0.0] - 2026-03-25

### Added
- ✨ Gestión completa de cuentas (crear, editar, eliminar, listar)
- ✨ Registro de depósitos con actualización automática de balance
- ✨ Registro de retiros con validación de saldo suficiente
- ✨ Transferencias entre cuentas con actualización atómica
- ✨ Visualización de historial de transacciones
- ✨ Filtrado de transacciones por tipo
- ✨ Dashboard con balance total
- ✨ Diseño responsive (desktop y mobile)
- 📝 Documentación completa (README, USER_GUIDE)
- 🧪 Testing exhaustivo manual

### Fixed
- 🐛 Error al crear cuenta sin balance inicial (ahora default a 0)
- 🐛 Balance negativo permitido en ciertas condiciones (validación agregada)
- 🐛 Interfaz rota en mobile (responsive mejorado)

---

## [0.3.0] - 2026-03-18

### Added
- Página de transacciones con tabla
- Filtros básicos

### Changed
- Mejorado rendimiento de carga de datos

### Fixed
- Error de carga cuando db.json está vacío

---

## [0.2.0] - 2026-03-10

### Added
- Página de cuentas
- CRUD básico de cuentas
- Componente Table reutilizable

---

## [0.1.0] - 2026-03-01

### Added
- Setup inicial del proyecto
- Estructura de carpetas
- Router básico
- Landing page

---

## Tipos de Cambios

- `Added` para funcionalidades nuevas
- `Changed` para cambios en funcionalidades existentes
- `Deprecated` para features que serán removidas
- `Removed` para features removidas
- `Fixed` para correcciones de bugs
- `Security` para vulnerabilidades

---

[Unreleased]: https://github.com/usuario/repo/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/usuario/repo/compare/v0.3.0...v1.0.0
[0.3.0]: https://github.com/usuario/repo/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/usuario/repo/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/usuario/repo/releases/tag/v0.1.0
```

---

### 4. API.md (Documentación Técnica)

**Propósito:** Documentar servicios y métodos
**Audiencia:** Developers
**Actualizar:** Con cada service nuevo/modificado

```markdown
# API Documentation

**Versión:** 1.0.0
**Última actualización:** 2026-03-20

Esta documentación describe los servicios disponibles y sus métodos.

---

## Tabla de Contenidos

1. [AccountService](#accountservice)
2. [TransactionService](#transactionservice)
3. [ValidationService](#validationservice)
4. [Errores](#errores)
5. [Tipos de Datos](#tipos-de-datos)

---

## AccountService

Servicio para gestionar cuentas bancarias.

### getAll()

Obtiene todas las cuentas del usuario.

**Signature:**
```javascript
async getAll(): Promise<Account[]>
```

**Parámetros:** Ninguno

**Retorna:** Array de cuentas

**Errores:**
- `NetworkError`: Si no puede conectar a la fuente de datos

**Ejemplo:**
```javascript
const accounts = await AccountService.getAll();
console.log(accounts);
// [
//   { id: 'uuid1', name: 'Ahorro', type: 'ahorro', balance: 1000, ... },
//   { id: 'uuid2', name: 'Corriente', type: 'corriente', balance: 500, ... }
// ]
```

---

### getById(id)

Obtiene una cuenta específica por su ID.

**Signature:**
```javascript
async getById(id: string): Promise<Account>
```

**Parámetros:**
- `id` (string): UUID de la cuenta

**Retorna:** Objeto Account

**Errores:**
- `ValidationError`: Si ID no es UUID válido
- `NotFoundError`: Si cuenta no existe
- `NetworkError`: Si hay error de conexión

**Ejemplo:**
```javascript
try {
  const account = await AccountService.getById('uuid1');
  console.log(account.name); // "Ahorro"
} catch (error) {
  if (error instanceof NotFoundError) {
    console.log('Cuenta no existe');
  }
}
```

---

### create(data)

Crea una nueva cuenta.

**Signature:**
```javascript
async create(data: AccountCreateDTO): Promise<Account>
```

**Parámetros:**
- `data` (Object):
  - `name` (string, requerido): Nombre de la cuenta (3-50 caracteres)
  - `type` (string, requerido): Tipo de cuenta ('ahorro' | 'corriente' | 'inversion')
  - `balance` (number, opcional): Balance inicial (>= 0, default: 0)
  - `currency` (string, opcional): Código de moneda (default: 'MXN')

**Retorna:** Account creada con ID y timestamps generados

**Errores:**
- `ValidationError`: Si datos son inválidos (con detalles por campo)
- `NetworkError`: Si no puede guardar

**Ejemplo:**
```javascript
const newAccount = await AccountService.create({
  name: 'Ahorro Vacaciones',
  type: 'ahorro',
  balance: 5000
});

console.log(newAccount.id); // UUID generado
```

**Validaciones:**
| Campo | Validación | Error Message |
|-------|------------|---------------|
| name | Requerido, 3-50 chars | "Name must be between 3 and 50 characters" |
| type | Enum válido | "Type must be: ahorro, corriente, or inversion" |
| balance | >= 0 | "Balance cannot be negative" |
| currency | ISO 4217 (3 letras) | "Currency must be 3 uppercase letters" |

---

### update(id, data)

Actualiza una cuenta existente.

**Signature:**
```javascript
async update(id: string, data: AccountUpdateDTO): Promise<Account>
```

**Parámetros:**
- `id` (string): UUID de la cuenta
- `data` (Object, todos opcionales):
  - `name` (string): Nuevo nombre
  - `type` (string): Nuevo tipo
  - `currency` (string): Nueva moneda

**⚠️ Nota:** NO se puede actualizar `balance` directamente (solo via transacciones)

**Retorna:** Account actualizada

**Errores:**
- `NotFoundError`: Cuenta no existe
- `ValidationError`: Datos inválidos
- `BusinessRuleError`: Si intenta cambiar balance

**Ejemplo:**
```javascript
const updated = await AccountService.update('uuid1', {
  name: 'Ahorro Principal'
});
```

---

### delete(id)

Elimina una cuenta.

**Signature:**
```javascript
async delete(id: string): Promise<void>
```

**Parámetros:**
- `id` (string): UUID de la cuenta

**Retorna:** void (sin retorno si éxito)

**Errores:**
- `NotFoundError`: Cuenta no existe
- `BusinessRuleError`: Cuenta tiene transacciones asociadas

**Ejemplo:**
```javascript
try {
  await AccountService.delete('uuid1');
  console.log('Cuenta eliminada');
} catch (error) {
  if (error instanceof BusinessRuleError) {
    console.log('No se puede eliminar: tiene transacciones');
  }
}
```

---

## TransactionService

Servicio para gestionar transacciones.

### getAll()

Obtiene todas las transacciones.

**Signature:**
```javascript
async getAll(): Promise<Transaction[]>
```

**Retorna:** Array de transacciones ordenadas por fecha DESC

---

### getByAccountId(accountId)

Obtiene transacciones de una cuenta específica.

**Signature:**
```javascript
async getByAccountId(accountId: string): Promise<Transaction[]>
```

**Parámetros:**
- `accountId` (string): UUID de la cuenta

**Retorna:** Transacciones donde la cuenta es origen O destino

---

### deposit(accountId, amount, description)

Registra un depósito.

**Signature:**
```javascript
async deposit(
  accountId: string,
  amount: number,
  description?: string
): Promise<Transaction>
```

**Parámetros:**
- `accountId` (string): UUID de la cuenta
- `amount` (number): Monto a depositar (> 0)
- `description` (string, opcional): Descripción de la transacción

**Retorna:** Transacción creada

**Side Effects:**
- Incrementa `account.balance` en `amount`
- Actualiza `account.updatedAt`

**Errores:**
- `ValidationError`: amount <= 0
- `NotFoundError`: Cuenta no existe

**Ejemplo:**
```javascript
const transaction = await TransactionService.deposit(
  'uuid1',
  1000,
  'Salario marzo'
);

console.log(transaction.type); // 'deposito'
// Balance de cuenta aumentó en 1000
```

---

### withdraw(accountId, amount, description)

Registra un retiro.

**Signature:**
```javascript
async withdraw(
  accountId: string,
  amount: number,
  description?: string
): Promise<Transaction>
```

**Parámetros:** Similar a deposit()

**Retorna:** Transacción creada

**Side Effects:**
- Disminuye `account.balance` en `amount`

**Errores:**
- `ValidationError`: amount <= 0
- `NotFoundError`: Cuenta no existe
- `InsufficientFundsError`: Saldo insuficiente

**Ejemplo:**
```javascript
try {
  const transaction = await TransactionService.withdraw(
    'uuid1',
    500,
    'Pago tarjeta'
  );
} catch (error) {
  if (error instanceof InsufficientFundsError) {
    alert('No tienes suficiente saldo');
  }
}
```

---

### transfer(fromAccountId, toAccountId, amount, description)

Transfiere dinero entre cuentas.

**Signature:**
```javascript
async transfer(
  fromAccountId: string,
  toAccountId: string,
  amount: number,
  description?: string
): Promise<Transaction>
```

**Parámetros:**
- `fromAccountId` (string): UUID cuenta origen
- `toAccountId` (string): UUID cuenta destino
- `amount` (number): Monto a transferir (> 0)
- `description` (string, opcional): Descripción

**Retorna:** Transacción creada

**Side Effects:**
- Disminuye balance de cuenta origen
- Aumenta balance de cuenta destino
- Ambas actualizaciones son atómicas (todo o nada)

**Errores:**
- `ValidationError`: amount <= 0 o fromAccountId === toAccountId
- `NotFoundError`: Alguna cuenta no existe
- `InsufficientFundsError`: Saldo insuficiente en origen

**Ejemplo:**
```javascript
const transaction = await TransactionService.transfer(
  'uuid1', // De Ahorro
  'uuid2', // A Corriente
  300,
  'Mover para gastos'
);

console.log(transaction.type); // 'transferencia'
console.log(transaction.accountId); // 'uuid1' (origen)
console.log(transaction.toAccountId); // 'uuid2' (destino)
```

---

### filterByType(transactions, type)

Filtra transacciones por tipo.

**Signature:**
```javascript
filterByType(
  transactions: Transaction[],
  type: 'todos' | TransactionType
): Transaction[]
```

**⚠️ Nota:** Función pura (no async, no modifica datos)

**Parámetros:**
- `transactions` (Array): Transacciones a filtrar
- `type` (string): Tipo a filtrar ('todos', 'deposito', 'retiro', 'transferencia')

**Retorna:** Array filtrado

**Ejemplo:**
```javascript
const allTransactions = await TransactionService.getAll();
const deposits = TransactionService.filterByType(allTransactions, 'deposito');
```

---

## ValidationService

Servicio para validaciones.

### validateAccount(data)

Valida datos de cuenta.

**Signature:**
```javascript
validateAccount(data: Object): ValidationResult
```

**Retorna:**
```javascript
{
  valid: boolean,
  errors: {
    field1: "error message",
    field2: "error message"
  }
}
```

---

## Errores

### Error Hierarchy

```
Error (nativo)
  ├── ValidationError
  ├── NotFoundError
  ├── BusinessRuleError
  ├── InsufficientFundsError
  └── NetworkError
```

### ValidationError

**Cuándo:** Datos de input son inválidos

**Propiedades:**
- `name`: 'ValidationError'
- `message`: Descripción general
- `fields`: Object con errores por campo

**Ejemplo:**
```javascript
{
  name: 'ValidationError',
  message: 'Validation failed',
  fields: {
    name: 'Name must be at least 3 characters',
    balance: 'Balance cannot be negative'
  }
}
```

---

### NotFoundError

**Cuándo:** Recurso no existe

**Propiedades:**
- `name`: 'NotFoundError'
- `message`: "Resource with id X not found"
- `resourceType`: (Account, Transaction, etc.)
- `resourceId`: ID del recurso

---

### InsufficientFundsError

**Cuándo:** Intentas retirar/transferir más dinero del disponible

**Propiedades:**
- `name`: 'InsufficientFundsError'
- `message`: "Insufficient funds"
- `available`: Balance disponible
- `requested`: Monto solicitado

---

## Tipos de Datos

### Account

```typescript
interface Account {
  id: string;               // UUID v4
  name: string;             // 3-50 caracteres
  type: AccountType;        // 'ahorro' | 'corriente' | 'inversion'
  balance: number;          // >= 0, 2 decimales
  currency: string;         // ISO 4217 (ej: 'MXN', 'USD')
  createdAt: string;        // ISO 8601 date
  updatedAt: string;        // ISO 8601 date
}

type AccountType = 'ahorro' | 'corriente' | 'inversion';
```

---

### Transaction

```typescript
interface Transaction {
  id: string;               // UUID v4
  accountId: string;        // UUID, cuenta origen
  toAccountId: string | null; // UUID, cuenta destino (solo transferencias)
  type: TransactionType;    // Tipo de transacción
  amount: number;           // > 0, 2 decimales
  description: string;      // 0-200 caracteres
  date: string;             // ISO 8601 date
  status: TransactionStatus; // Estado
  createdAt: string;        // ISO 8601 date
}

type TransactionType = 'deposito' | 'retiro' | 'transferencia';
type TransactionStatus = 'completada' | 'pendiente' | 'fallida';
```

---

## Ejemplos Completos

### Flujo Completo: Crear cuenta y hacer depósito

```javascript
// 1. Crear cuenta
const account = await AccountService.create({
  name: 'Ahorro',
  type: 'ahorro',
  balance: 1000
});

console.log(`Cuenta creada: ${account.id}`);
// Balance actual: 1000

// 2. Hacer depósito
const transaction = await TransactionService.deposit(
  account.id,
  500,
  'Freelance pago'
);

console.log(`Depósito registrado: ${transaction.id}`);

// 3. Verificar nuevo balance
const updatedAccount = await AccountService.getById(account.id);
console.log(`Nuevo balance: ${updatedAccount.balance}`);
// 1500
```

---

### Flujo Completo: Transferencia

```javascript
// Setup: 2 cuentas
const savings = await AccountService.create({
  name: 'Ahorro',
  type: 'ahorro',
  balance: 5000
});

const checking = await AccountService.create({
  name: 'Corriente',
  type: 'corriente',
  balance: 1000
});

// Transferir $2000 de ahorro a corriente
try {
  const transfer = await TransactionService.transfer(
    savings.id,
    checking.id,
    2000,
    'Mover para gastos mensuales'
  );

  console.log('Transferencia exitosa');

  // Verificar balances
  const newSavings = await AccountService.getById(savings.id);
  const newChecking = await AccountService.getById(checking.id);

  console.log(`Ahorro: ${newSavings.balance}`);    // 3000
  console.log(`Corriente: ${newChecking.balance}`); // 3000

} catch (error) {
  if (error instanceof InsufficientFundsError) {
    console.error('No tienes suficiente dinero');
  }
}
```

---

## Notas de Implementación

### Atomicidad de Transferencias

En MVP (con db.json), la atomicidad es "best effort":
```javascript
// Si falla actualización de cuenta destino,
// cuenta origen ya se modificó (potencial inconsistencia)
```

En versión futura con BD real:
```javascript
// Usar transacciones de BD
await db.transaction(async (trx) => {
  await updateAccount1(trx);
  await updateAccount2(trx);
  await createTransaction(trx);
});
// O todo pasa o nada pasa (atomicidad garantizada)
```

---

## Versionado de API

Esta API usa Semantic Versioning:
- **Major (1.x.x):** Cambios que rompen compatibilidad
- **Minor (x.1.x):** Nuevas features compatibles
- **Patch (x.x.1):** Bug fixes compatibles

Versión actual: **1.0.0**

---

## Soporte

¿Preguntas sobre la API?
- Crear issue en GitHub
- Email: dev@ejemplo.com
```

---

### 5. CONTRIBUTING.md (Guía para Contribuidores)

```markdown
# Guía de Contribución

¡Gracias por tu interés en contribuir a Gestión Bancaria! 🎉

---

## Código de Conducta

Este proyecto se adhiere a un Código de Conducta. Al participar, te comprometes a mantener un ambiente respetuoso y profesional.

---

## ¿Cómo Contribuir?

### Reportar Bugs

**Antes de crear un issue:**
1. Busca si el bug ya está reportado
2. Verifica que estés usando la última versión

**Al crear el issue:**
Usa el template de bug report e incluye:
- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Versión de la app y browser
- Screenshots si aplica

---

### Sugerir Features

1. Abre issue con tag `enhancement`
2. Describe la feature:
   - ¿Qué problema resuelve?
   - ¿Qué propones?
   - ¿Por qué es valioso para usuarios?
3. Espera feedback antes de implementar

---

### Pull Requests

#### 1. Fork y Setup

```bash
# Fork en GitHub
# Clonar tu fork
git clone https://github.com/TU-USUARIO/gestion-bancaria.git
cd gestion-bancaria

# Crear branch
git checkout -b feature/amazing-feature

# Instalar dependencias
npm install
```

---

#### 2. Desarrollo

**Seguir convenciones:**
- Leer `docs/CONVENTIONS.md`
- Commits atómicos con mensajes descriptivos
- Testing manual exhaustivo

**Asegurarte que:**
- [ ] Código sigue estilo del proyecto
- [ ] No hay console.logs de debugging
- [ ] Funciona en Chrome y Firefox mínimo
- [ ] Responsive (desktop y mobile)

---

#### 3. Commit

**Formato de commits:**
```
<type>: <description>

[body opcional]
```

**Types:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Solo documentación
- `style`: Formato (sin cambio de lógica)
- `refactor`: Refactorización
- `test`: Agregar tests
- `chore`: Mantenimiento

**Ejemplo:**
```bash
git commit -m "feat: add export to CSV feature"
```

---

#### 4. Push y PR

```bash
# Push a tu fork
git push origin feature/amazing-feature

# En GitHub, crear Pull Request
```

**En la descripción del PR:**
- Describe qué hace el cambio
- Referencia issue relacionado (`Closes #123`)
- Screenshots si hay cambios visuales
- Checklist:
  - [ ] Probado manualmente
  - [ ] Sin errores en consola
  - [ ] Documentación actualizada
  - [ ] CHANGELOG.md actualizado

---

#### 5. Code Review

- Responde a comentarios constructivamente
- Haz cambios solicitados en commits adicionales
- Una vez aprobado, será merged

---

## Convenciones

### Estructura de Archivos

```
src/
  components/    # PascalCase.js
  pages/         # PascalCasePage.js
  services/      # camelCase.js
  utils/         # camelCase.js
```

### Nomenclatura

**JavaScript:**
```javascript
// Variables y funciones: camelCase
const accountBalance = 1000;
function calculateTotal() {}

// Constantes: UPPER_SNAKE_CASE
const MAX_AMOUNT = 10000;

// Classes/Components: PascalCase
class AccountService {}
const Button = { ... };

// Funciones privadas: _ prefijo
function _privateHelper() {}
```

---

### Código

**Formato:**
- Indentación: 2 espacios
- Comillas: simples `'string'`
- Punto y coma: siempre
- Llaves: mismo renglón (K&R style)

**Ejemplo:**
```javascript
// ✅ Correcto
function example(param) {
  const result = doSomething(param);
  return result;
}

// ❌ Incorrecto
function example(param)
{
  const result = doSomething(param)
  return result
}
```

---

## Testing

**Antes de PR:**
- [ ] Probar manualmente en Chrome
- [ ] Probar en Firefox
- [ ] Probar responsive (mobile)
- [ ] Probar casos edge documentados
- [ ] No hay errores en consola

---

## Proceso de Review

1. **Automatic checks:** Linting, formato
2. **Manual review:** Maintainer revisa código
3. **Feedback:** Sugerencias de cambios
4. **Iteración:** Hacer ajustes solicitados
5. **Approval:** Una vez aprobado
6. **Merge:** Maintainer hace merge

**Tiempo estimado:** 1-3 días para review

---

## Prioridades

**Alta prioridad:**
- Bugs críticos
- Security vulnerabilities
- Features Must Have del roadmap

**Media prioridad:**
- Mejoras de UX
- Performance optimizations
- Features Should Have

**Baja prioridad:**
- Features Could Have
- Refactorings no urgentes

---

## Preguntas

¿Dudas sobre cómo contribuir?
- Abrir issue con tag `question`
- Email: dev@ejemplo.com

---

**¡Gracias por contribuir!** 🙏
```

---

### 6. Comentarios en Código (Inline Documentation)

**Propósito:** Explicar código complejo
**Audiencia:** Developers
**Actualizar:** Al escribir código

```javascript
// ✅ Buenos comentarios

/**
 * Calcula el balance disponible considerando transacciones pendientes.
 *
 * El balance "disponible" es diferente del balance "registrado" porque
 * restamos transacciones pendientes que aún no se han completado pero
 * ya están autorizadas.
 *
 * @param {Account} account - Cuenta a calcular
 * @returns {number} Balance disponible
 */
function calculateAvailableBalance(account) {
  const pendingAmount = _getPendingTransactionsAmount(account.id);

  // Restamos pending porque aunque no estén completadas,
  // el dinero ya está "comprometido"
  return account.balance - pendingAmount;
}

// Usamos setTimeout(0) para permitir que el DOM se actualice completamente
// antes de calcular la altura. Sin esto, la altura siempre es 0.
// Ref: https://stackoverflow.com/questions/779379
setTimeout(() => {
  const height = element.offsetHeight;
  adjustLayout(height);
}, 0);

// TODO(#42): Optimizar este loop para arrays > 1000 elementos
// Priority: Medium
// Considerar: virtualization o paginación
items.forEach(item => renderItem(item));

// HACK: Workaround temporal para bug en Safari con crypto.randomUUID()
// Safari < 15.4 no tiene crypto.randomUUID() disponible en contextos no-secure
// Remover cuando actualicemos requisito mínimo a Safari 15.4+
const generateId = () => {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback UUID v4 generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
```

```javascript
// ❌ Malos comentarios (obvios, redundantes, o desactualizados)

// Incrementa el contador en 1
counter++;

// Esta función obtiene todas las cuentas
function getAll() {
  return accounts;
}

// Loop through items
items.forEach(item => {
  // Process item
  processItem(item);
});

// TODO: fix this
// ← Sin contexto, sin prioridad, sin tracking
```

---

## 🎯 Checklist de Documentación Pre-Release

```markdown
# Documentation Checklist - v1.0.0

## Documentos Esenciales
- [ ] README.md actualizado con:
  - [ ] Features completas del MVP
  - [ ] Screenshots actuales
  - [ ] Instrucciones de instalación verificadas
  - [ ] Links funcionando
  - [ ] Badges actualizados

- [ ] USER_GUIDE.md creado con:
  - [ ] Guía paso a paso de cada funcionalidad
  - [ ] Screenshots de flujos principales
  - [ ] Sección de troubleshooting
  - [ ] FAQ con preguntas comunes

- [ ] CHANGELOG.md actualizado con:
  - [ ] Todas las features de v1.0.0
  - [ ] Todos los bugs arreglados
  - [ ] Links a commits/PRs

- [ ] API.md (si aplica) con:
  - [ ] Todos los servicios documentados
  - [ ] Ejemplos de uso para cada método
  - [ ] Errores posibles
  - [ ] Tipos de datos

- [ ] CONTRIBUTING.md (si es open source)

## Documentos Opcionales
- [ ] ARCHITECTURE.md actualizado con estado final
- [ ] DEPLOYMENT.md con instrucciones de deploy
- [ ] KNOWN_ISSUES.md si hay bugs conocidos no críticos

## Código
- [ ] Comentarios en código complejo actualizados
- [ ] TODOs pendientes documentados o removidos
- [ ] Código muerto/comentado eliminado

## Multimedia
- [ ] Screenshots actuales (no de versión vieja)
- [ ] Demo GIF o video (opcional pero recomendado)
- [ ] Logo/favicon (si existe)

## Links
- [ ] Todos los links internos funcionan
- [ ] Links externos verificados
- [ ] Link a demo live (si está deployed)

## Consistencia
- [ ] Versión consistente en todos los docs (1.0.0)
- [ ] Nombres de features consistentes
- [ ] Formato consistente (markdown, headers, etc.)

---

**Documentación completada:** [Fecha]
**Revisado por:** [Nombre]
**Status:** ✅ READY / ⚠️ PENDING
```

---

## 💡 Tips para Documentación Efectiva

### Tip 1: Escribe para tu yo del futuro

En 6 meses olvidarás:
- Por qué tomaste una decisión
- Cómo funciona código complejo
- Dónde está cada cosa

Documenta ahora para tu yo del futuro.

---

### Tip 2: Ejemplos > Explicaciones

```markdown
❌ Malo:
"El método create acepta un objeto con propiedades name, type y balance"

✅ Bueno:
```javascript
const account = await AccountService.create({
  name: 'Ahorro',
  type: 'ahorro',
  balance: 1000
});
```
```

---

### Tip 3: Mantén docs cerca del código

```
src/
  components/
    Button/
      Button.js
      Button.md       ← Docs del componente
      styles.css
```

Docs actualizados = docs cerca del código que documentan.

---

### Tip 4: Documenta el "porqué", no el "qué"

```javascript
// ❌ El "qué" (obvio del código)
// Loop through accounts
accounts.forEach(a => process(a));

// ✅ El "porqué" (contexto valioso)
// Procesamos cuentas en order específico (ahorro, corriente, inversión)
// porque los cálculos de ahorro dependen de inversión
accounts
  .sort((a, b) => TYPE_ORDER[a.type] - TYPE_ORDER[b.type])
  .forEach(a => process(a));
```

---

### Tip 5: README es tu única oportunidad

El 80% de visitantes solo leerán el README.

Si no está ahí, no existe para ellos.

Invierte tiempo en un README excelente.

---

## 🎯 Entregables de la Fase 6

### Documentos creados/actualizados:
- [x] README.md (completo y pulido)
- [x] USER_GUIDE.md (tutorial paso a paso)
- [x] CHANGELOG.md (v1.0.0 completo)
- [x] API.md (todos los servicios documentados)
- [x] CONTRIBUTING.md (si es open source)
- [x] Comentarios en código (solo donde es necesario)

### Multimedia:
- [x] Screenshots actuales (mínimo 2-3)
- [x] Demo GIF o video (recomendado)

### Validación:
- [x] Todos los links funcionan
- [x] Ejemplos en docs ejecutables y correctos
- [x] Typos corregidos (spell check)
- [x] Formato consistente

### Review:
- [x] Auto-review de contenido
- [x] Alguien más leyó y entendió (si posible)

---

## 🚦 Criterios de Salida (documentación completa)

Estás listo para Release cuando:

**Completitud:**
- [x] README tiene todas las secciones esenciales
- [x] USER_GUIDE cubre todas las features del MVP
- [x] CHANGELOG está completo para v1.0.0
- [x] API docs tienen todos los métodos públicos

**Calidad:**
- [x] Docs son claros (alguien sin contexto puede seguirlos)
- [x] Ejemplos son ejecutables y correctos
- [x] Sin typos mayores
- [x] Capturas de pantalla actuales (no de versión vieja)

**Accesibilidad:**
- [x] Fácil encontrar información (table of contents, search)
- [x] Formato consistente y legible
- [x] Links no rotos

**Mantenibilidad:**
- [x] Process documentado para actualizar docs
- [x] Templates creados para futuras versiones

---

## 🎬 Conclusión de la Fase 6

### ¿Qué produces?
- ✅ Documentación clara y completa
- ✅ Proyecto presentable a cualquier audiencia
- ✅ Futuras actualizaciones serán más fáciles

### Señales de documentación suficiente:
- Un nuevo usuario puede empezar a usar sin ayuda (USER_GUIDE)
- Un nuevo developer puede entender arquitectura (ARCHITECTURE, API)
- Cualquiera puede instalar y correr el proyecto (README)
- Tu yo en 6 meses entenderá decisiones (comments, ADRs)

### Siguiente paso:
➡️ **Fase 7: Despliegue** (publicar la aplicación)

---

**Recuerda:**
> "Código sin documentación es código que no existe."
> "Documentar no es opcional, es parte del trabajo."
> "README excelente = primera impresión excelente."

La documentación es lo que hace tu proyecto accesible al mundo.
