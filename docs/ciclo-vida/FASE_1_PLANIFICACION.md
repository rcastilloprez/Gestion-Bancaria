# Fase 1: Planificación
## Organizar y estructurar el trabajo

**Duración estimada:** 2-4 días (proyecto nuevo) | 2-4 horas (sprint nuevo)
**Prerequisito:** Fase 0 (Concepción) completada
**Cuándo usar:** Después de definir la visión, antes de diseñar detalles

---

## 🎯 Objetivo de esta fase
Convertir la visión en un plan de acción ejecutable:
- Crear el Product Backlog completo
- Priorizar funcionalidades
- Dividir trabajo en sprints/iteraciones
- Establecer estándares y procesos

**Regla de oro:** Al finalizar esta fase, debes saber exactamente qué construir en las próximas 2-4 semanas.

---

## 📋 Checklist Completa

### Paso 1: Crear Product Backlog (2-3 horas)

#### 1.1 Convertir features a User Stories

Toma cada funcionalidad identificada en Fase 0 y conviértela en User Story detallada.

**Formato estándar:**
```markdown
## US-[XXX]: [Título corto] (Tag: [Categoría])

**Como** [tipo de usuario]
**Quiero** [acción/funcionalidad]
**Para** [beneficio/objetivo]

### Prioridad
[Must / Should / Could / Won't Have]

### Estimación
[Puntos de historia: 1, 2, 3, 5, 8, 13]

### Criterios de Aceptación
- [ ] Escenario 1: Dado [contexto], cuando [acción], entonces [resultado]
- [ ] Escenario 2: ...
- [ ] Escenario 3: ...

### Notas Técnicas
- Archivos involucrados: ___
- Dependencias técnicas: ___
- Consideraciones especiales: ___

### Dependencias
- Requiere: [US-XXX, US-YYY]
- Bloqueado por: [US-ZZZ]

### Definición de Done
- [ ] Funcionalidad implementada
- [ ] Probada manualmente
- [ ] Sin errores en consola
- [ ] Documentación actualizada
- [ ] Commit realizado
```

**Ejemplo completo:**
```markdown
## US-001: Ver lista de cuentas bancarias (Tag: Cuentas)

**Como** usuario de la aplicación
**Quiero** ver una lista de todas mis cuentas bancarias
**Para** tener una visión rápida de mi situación financiera

### Prioridad
Must Have

### Estimación
2 puntos (2-4 horas)

### Criterios de Aceptación
- [ ] Dado que tengo 3 cuentas registradas, cuando accedo a /cuentas, entonces veo las 3 cuentas en una tabla
- [ ] Cada cuenta muestra: nombre, tipo, balance actual
- [ ] Dado que no tengo cuentas, cuando accedo a /cuentas, entonces veo mensaje "No tienes cuentas registradas" y botón "Crear cuenta"
- [ ] La carga de datos toma menos de 2 segundos
- [ ] Si hay error de carga, veo mensaje claro y opción de reintentar

### Notas Técnicas
- Archivos involucrados:
  - src/pages/Accounts/AccountsPage.js (crear)
  - src/services/accountService.js (usar)
  - src/components/Table/Table.js (reutilizar)
- Reutilizar componente Table existente
- Formato de moneda: usar formatter.js

### Dependencias
- Requiere: ninguna (es la base)
- Bloqueado por: ninguna

### Definición de Done
- [ ] Página renderiza correctamente
- [ ] Datos se cargan desde db.json
- [ ] Manejo de estado vacío implementado
- [ ] Manejo de errores implementado
- [ ] Ruta agregada al router
- [ ] Probado con 0, 1, 5+ cuentas
- [ ] Sin errores en consola
- [ ] Commit: "Add AccountsPage with list view"
```

#### 1.2 Crear BACKLOG.md completo

**Crear archivo:** `docs/BACKLOG.md`

**Estructura:**
```markdown
# Product Backlog - [Nombre del Proyecto]

**Última actualización:** [Fecha]

## Leyenda
- 🔴 Must Have
- 🟡 Should Have
- 🟢 Could Have
- ⚪ Won't Have (este release)

---

## Epic 1: [Nombre] (Estimación total: X puntos)

### US-001: [Título] 🔴
**Prioridad:** Must Have | **Puntos:** 2 | **Sprint:** 1 | **Estado:** ⬜ Todo

[Link al detalle completo en docs/user-stories/US-001.md]

**Resumen:** Como [usuario] quiero [acción] para [beneficio]

**AC principales:**
- Criterio 1
- Criterio 2

---

### US-002: [Título] 🔴
[Repetir estructura]

---

## Epic 2: [Nombre] (Estimación total: X puntos)
[Continuar...]

---

## Resumen

### Por Prioridad
- Must Have: ___ US (___ puntos)
- Should Have: ___ US (___ puntos)
- Could Have: ___ US (___ puntos)

### Por Sprint (tentativo)
- Sprint 1: US-001, US-002, US-003 (___ puntos)
- Sprint 2: US-004, US-005 (___ puntos)
- Sprint 3: US-006, US-007, US-008 (___ puntos)

### Velocidad estimada
___ puntos por sprint (basado en ___ horas disponibles/sprint)
```

**Ejemplo para tu proyecto:**
```markdown
# Product Backlog - Gestión Bancaria

## Epic 1: Gestión de Cuentas (20 puntos)

### US-001: Ver lista de cuentas 🔴
**Prioridad:** Must Have | **Puntos:** 2 | **Sprint:** 1 | **Estado:** ⬜ Todo
Como usuario quiero ver todas mis cuentas para conocer mi situación financiera.

### US-002: Crear nueva cuenta 🔴
**Prioridad:** Must Have | **Puntos:** 3 | **Sprint:** 1 | **Estado:** ⬜ Todo
Como usuario quiero crear una cuenta para empezar a registrar transacciones.

### US-003: Editar cuenta 🟡
**Prioridad:** Should Have | **Puntos:** 3 | **Sprint:** 2 | **Estado:** ⬜ Todo
Como usuario quiero editar el nombre de una cuenta para mantener información actualizada.

### US-004: Eliminar cuenta 🟡
**Prioridad:** Should Have | **Puntos:** 3 | **Sprint:** 2 | **Estado:** ⬜ Todo
Como usuario quiero eliminar cuentas no usadas para mantener mi lista limpia.

### US-005: Ver detalle de cuenta individual 🟢
**Prioridad:** Could Have | **Puntos:** 5 | **Sprint:** 3 | **Estado:** ⬜ Todo
Como usuario quiero ver una cuenta específica con solo sus transacciones.

---

## Epic 2: Transacciones (35 puntos)

### US-006: Ver lista de transacciones 🔴
**Prioridad:** Must Have | **Puntos:** 2 | **Sprint:** 1 | **Estado:** ✅ Done
Como usuario quiero ver todas mis transacciones para entender mi historial financiero.
**Completado:** 2026-03-20

### US-007: Registrar depósito 🔴
**Prioridad:** Must Have | **Puntos:** 5 | **Sprint:** 2 | **Estado:** ⬜ Todo
Como usuario quiero registrar ingresos para aumentar el balance de una cuenta.

### US-008: Registrar retiro 🔴
**Prioridad:** Must Have | **Puntos:** 5 | **Sprint:** 2 | **Estado:** ⬜ Todo
Como usuario quiero registrar gastos para disminuir el balance de una cuenta.

### US-009: Transferir entre cuentas 🔴
**Prioridad:** Must Have | **Puntos:** 8 | **Sprint:** 3 | **Estado:** ⬜ Todo
Como usuario quiero mover dinero entre mis cuentas para organizar mis finanzas.

### US-010: Filtrar transacciones 🟡
**Prioridad:** Should Have | **Puntos:** 3 | **Sprint:** 3 | **Estado:** ⬜ Todo
Como usuario quiero filtrar por tipo/fecha para encontrar transacciones específicas.

### US-011: Buscar transacciones 🟢
**Prioridad:** Could Have | **Puntos:** 2 | **Sprint:** 4 | **Estado:** ⬜ Todo
Como usuario quiero buscar por descripción para encontrar transacciones rápidamente.

### US-012: Editar transacción 🟢
**Prioridad:** Could Have | **Puntos:** 5 | **Sprint:** 5 | **Estado:** ⬜ Todo
Como usuario quiero corregir errores en transacciones registradas.

### US-013: Eliminar transacción ⚪
**Prioridad:** Won't Have | **Puntos:** 8 | **Sprint:** - | **Estado:** ⬜ Backlog
Como usuario quiero eliminar transacciones erróneas.
**Nota:** Muy complejo (recálculo de balances), posponer a v2.0

---

## Epic 3: Dashboard (15 puntos)

### US-014: Panel de resumen 🟡
**Prioridad:** Should Have | **Puntos:** 5 | **Sprint:** 4 | **Estado:** ⬜ Todo
Como usuario quiero ver un resumen de mis finanzas en la página principal.

### US-015: Balance total 🟡
**Prioridad:** Should Have | **Puntos:** 2 | **Sprint:** 4 | **Estado:** ⬜ Todo
Como usuario quiero ver la suma de todas mis cuentas.

### US-016: Últimas transacciones 🟢
**Prioridad:** Could Have | **Puntos:** 3 | **Sprint:** 4 | **Estado:** ⬜ Todo
Como usuario quiero ver mis últimas 5 transacciones en el dashboard.

### US-017: Gráficas de ingresos/gastos ⚪
**Prioridad:** Won't Have | **Puntos:** 13 | **Sprint:** - | **Estado:** ⬜ Backlog
Como usuario quiero ver visualizaciones de mis finanzas.
**Nota:** Posponer a v2.0

---

## Resumen

### Por Prioridad
- 🔴 Must Have: 6 US (25 puntos)
- 🟡 Should Have: 5 US (16 puntos)
- 🟢 Could Have: 4 US (15 puntos)
- ⚪ Won't Have: 2 US (21 puntos)

### Roadmap
- **v1.0 (MVP):** Must Have (25 puntos ≈ 4-5 semanas)
- **v1.1:** Should Have (16 puntos ≈ 2-3 semanas)
- **v1.2:** Could Have (15 puntos ≈ 2-3 semanas)
- **v2.0:** Won't Have + nuevas features

### Velocidad
Asumiendo 10-15 horas/semana:
- Sprint de 2 semanas = ~25 horas
- Velocidad estimada: 10-15 puntos por sprint
```

---

### Paso 2: Priorizar con método MoSCoW (30-45 min)

#### 2.1 Clasificación MoSCoW

**Must Have (Debe tener)** - Sin esto, el producto no funciona o no tiene sentido
- Pregunta clave: ¿Puedo lanzar el MVP sin esto? → NO = Must Have

**Should Have (Debería tener)** - Importante pero el MVP puede funcionar sin ello
- Pregunta clave: ¿Es muy importante pero hay workaround? → SÍ = Should Have

**Could Have (Podría tener)** - Deseable si hay tiempo/recursos
- Pregunta clave: ¿Mejora la experiencia pero no es necesario? → SÍ = Could Have

**Won't Have (No tendrá)** - Fuera de alcance para este release
- Pregunta clave: ¿Es para mucho después? → SÍ = Won't Have

#### 2.2 Matriz de priorización (Eisenhower adaptado)

```
        Alta Urgencia
             │
    Must    │   Should
    Have    │   Have
────────────┼────────────→ Alto Valor
    Won't   │   Could
    Have    │   Have
             │
        Baja Urgencia
```

**Ejercicio:**
Ubica cada User Story en el cuadrante correspondiente.

---

### Paso 3: Planificación de Sprints (1-2 horas)

#### 3.1 Definir duración del sprint

**Recomendaciones:**
- **Proyectos individuales:** 1-2 semanas
- **Equipos pequeños:** 2 semanas
- **Equipos grandes:** 2-4 semanas

**Para determinar tu duración:**
```
Tiempo disponible por semana: ___ horas
Complejidad del proyecto: Baja / Media / Alta
Duración sprint recomendada: ___

Ejemplo:
- 10 horas/semana + proyecto medio = Sprints de 2 semanas
- 20+ horas/semana + proyecto complejo = Sprints de 1 semana
```

#### 3.2 Calcular velocidad (capacity)

```
Velocidad = Horas disponibles × Factor de productividad

Factor de productividad:
- 0.5-0.6 para principiantes (mitad del tiempo es aprendizaje/debugging)
- 0.7-0.8 para intermedios
- 0.8-0.9 para avanzados

Ejemplo:
Sprint de 2 semanas = 10 horas/semana × 2 = 20 horas disponibles
Factor 0.6 (principiante) = 20 × 0.6 = 12 horas efectivas
Si 1 punto = 1 hora → Velocidad = 12 puntos por sprint
```

#### 3.3 Asignar User Stories a Sprints

**Criterios de asignación:**
1. Prioridad primero (Must Have antes que Should Have)
2. Dependencias (US-002 depende de US-001 → mismo sprint o consecutivos)
3. Capacidad del sprint (no exceder velocidad)
4. Balance (mezclar easy wins con funcionalidades complejas)

**Template:** `docs/SPRINTS.md`

```markdown
# Planificación de Sprints - [Proyecto]

## Sprint 0: Setup (1 semana)
**Fechas:** [inicio] - [fin]
**Objetivo:** Preparar el ambiente de desarrollo

### Tareas
- [ ] Setup de repositorio Git
- [ ] Estructura de carpetas
- [ ] Configuración de herramientas
- [ ] Implementar routing básico
- [ ] Setup de db.json

**Puntos:** 0 (no features, solo setup)

---

## Sprint 1: Fundación (2 semanas)
**Fechas:** [inicio] - [fin]
**Objetivo:** Implementar gestión básica de cuentas

### User Stories
- [ ] US-001: Ver lista de cuentas (2 pts)
- [ ] US-002: Crear nueva cuenta (3 pts)
- [ ] US-006: Ver lista de transacciones (2 pts)

**Total:** 7 puntos
**Capacity:** 12 puntos
**Buffer:** 5 puntos (para imprevistos)

### Criterios de Éxito
- Usuario puede crear cuentas y ver transacciones
- Sin bugs críticos
- Código commiteado y documentado

---

## Sprint 2: Transacciones Básicas (2 semanas)
**Fechas:** [inicio] - [fin]
**Objetivo:** Permitir depósitos y retiros

### User Stories
- [ ] US-007: Registrar depósito (5 pts)
- [ ] US-008: Registrar retiro (5 pts)
- [ ] US-003: Editar cuenta (3 pts)

**Total:** 13 puntos
**Capacity:** 12 puntos
**⚠️ Over capacity:** Mover US-003 a Sprint 3 si es necesario

---

## Sprint 3: Transferencias (2 semanas)
**Fechas:** [inicio] - [fin]
**Objetivo:** Implementar transferencias entre cuentas

### User Stories
- [ ] US-009: Transferir entre cuentas (8 pts)
- [ ] US-003: Editar cuenta (3 pts) [si no se hizo en Sprint 2]

**Total:** 8-11 puntos
**Capacity:** 12 puntos

---

## Sprint 4: Enhancements (2 semanas)
**Fechas:** [inicio] - [fin]
**Objetivo:** Mejorar UX y agregar utilidades

### User Stories
- [ ] US-010: Filtrar transacciones (3 pts)
- [ ] US-014: Panel de resumen (5 pts)
- [ ] US-015: Balance total (2 pts)

**Total:** 10 puntos
**Capacity:** 12 puntos

---

## Backlog (No asignado todavía)
- US-004: Eliminar cuenta
- US-005: Ver detalle de cuenta
- US-011: Buscar transacciones
- US-012: Editar transacción
- US-016: Últimas transacciones en dashboard

---

## Notas
- Ajustar sprints según velocidad real
- Revisar prioridades al inicio de cada sprint
- Buffer del 30-40% para imprevistos
```

---

### Paso 4: Definir Definition of Done (30 min)

#### 4.1 DoD Global (aplica a todas las US)

**Crear archivo:** `docs/DEFINITION_OF_DONE.md`

```markdown
# Definition of Done (DoD)

Una User Story está **COMPLETA** cuando cumple TODOS estos criterios:

## ✅ Funcionalidad
- [ ] Implementado según criterios de aceptación de la US
- [ ] Funciona el flujo happy path
- [ ] Maneja errores correctamente
- [ ] Validaciones implementadas
- [ ] Casos edge considerados y manejados

## ✅ Código
- [ ] Sin errores en consola del navegador
- [ ] Sin warnings importantes
- [ ] Sigue convenciones del proyecto (ver CONVENTIONS.md)
- [ ] Funciones con una sola responsabilidad
- [ ] Nombres claros y descriptivos
- [ ] Sin código comentado (eliminar, no comentar)
- [ ] Sin console.log de debugging
- [ ] DRY (sin duplicación de código)

## ✅ Pruebas
- [ ] Probado manualmente en navegador
- [ ] Happy path funciona
- [ ] Mínimo 2 casos edge probados
- [ ] Probado con diferentes tipos de datos
- [ ] Probado estado vacío (sin datos)
- [ ] Probado con errores (datos inválidos)
- [ ] No rompe funcionalidades existentes (regression check)

## ✅ UI/UX
- [ ] Responsive (funciona en móvil/tablet si aplica)
- [ ] Loading states implementados
- [ ] Error messages son claros y útiles
- [ ] Empty states con mensajes apropiados
- [ ] Accesible (navegable con teclado básico)

## ✅ Documentación
- [ ] Comentarios en lógica compleja (si aplica)
- [ ] CHANGELOG.md actualizado
- [ ] README.md actualizado (si cambió setup o features)

## ✅ Control de Versiones
- [ ] Commits atómicos realizados (1 commit por sub-funcionalidad)
- [ ] Mensajes de commit descriptivos
- [ ] Branch merged a main (o develop)
- [ ] Sin conflictos de merge

## ✅ Code Review
- [ ] Auto-review realizado con checklist
- [ ] Sin code smells obvios
- [ ] Patrones consistentes con el resto del código

---

## DoD Específicos por Tipo de Tarea

### Para Componentes UI:
- [ ] Componente renderiza sin errores
- [ ] Props validadas
- [ ] Responsive
- [ ] Reutilizable (no hardcoded)

### Para Services:
- [ ] Manejo de errores con try-catch
- [ ] Validaciones de input
- [ ] Retorna tipos consistentes (Promise)
- [ ] Sin side-effects inesperados

### Para Pages:
- [ ] Ruta configurada en router
- [ ] Title de la página correcto
- [ ] Navegación funciona (ir y volver)
- [ ] Loading state mientras carga datos

---

## Excepciones al DoD

En algunos casos, se puede liberar sin cumplir todo el DoD:

### Spike (investigación técnica):
- No requiere: tests exhaustivos, documentación completa
- Sí requiere: conclusiones documentadas, código de prueba eliminado

### Hotfix (corrección urgente):
- Puede saltar: algunos tests
- NO puede saltar: probar manualmente, regression check básico

### Prototipo/PoC:
- No requiere: código limpio, documentación, tests
- Sí requiere: demostrar viabilidad, documentar findings

---

## Revisión del DoD

Revisar y ajustar DoD cada 2-3 sprints:
- ¿Algún criterio es muy estricto?
- ¿Faltaron criterios que causaron bugs?
- ¿El equipo/yo lo seguimos consistentemente?
```

#### 4.2 DoD por niveles (opcional)

Si tu proyecto es largo, puedes tener DoD por madurez:

```markdown
## DoD - Nivel 1 (MVP básico)
- Funciona
- Sin errores críticos
- Commit realizado

## DoD - Nivel 2 (Producción básica)
- Nivel 1 +
- Documentado
- Probado exhaustivamente
- Code review

## DoD - Nivel 3 (Producción profesional)
- Nivel 2 +
- Tests automatizados
- Performance optimizado
- Accessible (WCAG AA)
```

---

### Paso 5: Establecer convenciones (1 hora)

#### 5.1 Coding conventions

**Crear archivo:** `docs/CONVENTIONS.md`

```markdown
# Convenciones de Código - [Proyecto]

## Nomenclatura

### Archivos
- **Componentes:** PascalCase.js (ej: Table.js, Button.js)
- **Páginas:** PascalCasePage.js (ej: AccountsPage.js)
- **Services:** camelCase.js (ej: accountService.js)
- **Utils:** camelCase.js (ej: formatter.js, validator.js)

### Variables y Funciones
```javascript
// Variables: camelCase
const accountBalance = 1000;
const userName = "Juan";

// Constantes: UPPER_SNAKE_CASE
const MAX_WITHDRAWAL = 10000;
const API_BASE_URL = "https://api.example.com";

// Funciones: camelCase
function calculateTotal() { }
function getUserById() { }

// Funciones privadas: _ prefijo
function _validateInput() { }  // No exportar

// Classes: PascalCase
class AccountService { }
class TransactionValidator { }

// Booleans: is/has/can prefijo
const isValid = true;
const hasPermission = false;
const canDelete = true;
```

### HTML/CSS
```javascript
// IDs: kebab-case
<div id="account-list"></div>

// Classes: kebab-case con BEM (opcional)
<div class="card"></div>
<div class="card__header"></div>
<div class="card__body"></div>
<div class="card--highlighted"></div>

// Data attributes: kebab-case
<button data-account-id="123"></button>
```

## Estructura de Archivos

### Componentes
```javascript
// src/components/Button/Button.js

const Button = {
  render: (container, config) => {
    // Implementation
  },

  _handleClick: (event) => {
    // Private methods with _ prefix
  }
};

export default Button;
```

### Services
```javascript
// src/services/accountService.js

const AccountService = {
  async getAll() {
    // Implementation
  },

  async getById(id) {
    // Implementation
  },

  _validateAccount(account) {
    // Private helper
  }
};

export default AccountService;
```

### Pages
```javascript
// src/pages/Accounts/AccountsPage.js

const AccountsPage = {
  render: async (container) => {
    // Setup HTML
    container.innerHTML = `...`;

    // Load data
    await AccountsPage._loadData(container);
  },

  _loadData: async (container) => {
    // Private method
  }
};

export default AccountsPage;
```

## Estilo de Código

### Formato general
```javascript
// Indentación: 2 espacios (no tabs)
function example() {
  if (condition) {
    doSomething();
  }
}

// Comillas: simples 'texto' (no dobles "texto")
const message = 'Hola mundo';

// Punto y coma: siempre al final de statement
const x = 10;
const y = 20;

// Llaves: mismo renglón (K&R style)
if (condition) {
  // code
} else {
  // code
}

// Espacios alrededor de operadores
const sum = a + b;  // ✅
const sum = a+b;    // ❌
```

### Funciones
```javascript
// Preferir arrow functions para callbacks
array.map(item => item.id);

// Usar async/await, no .then()
// ✅ Correcto
async function fetchData() {
  const data = await fetch(url);
  return data;
}

// ❌ Evitar
function fetchData() {
  return fetch(url).then(data => data);
}

// Funciones puras cuando sea posible
// ✅ Pure function
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ Impure (modifica estado externo)
let total = 0;
function calculateTotal(items) {
  total = items.reduce((sum, item) => sum + item.price, 0);
}
```

### Manejo de Errores
```javascript
// Siempre usar try-catch en async functions
async function loadAccounts() {
  try {
    const accounts = await AccountService.getAll();
    return accounts;
  } catch (error) {
    console.error('Error loading accounts:', error);
    throw error; // O manejar apropiadamente
  }
}

// Validaciones al inicio de la función
function withdraw(accountId, amount) {
  if (!accountId) throw new Error('accountId is required');
  if (amount <= 0) throw new Error('amount must be positive');

  // Rest of logic
}

// Errores específicos vs genéricos
throw new Error('Insufficient funds');  // ✅ Específico
throw new Error('Error');               // ❌ Genérico
```

### Comentarios
```javascript
// ✅ Comentar el POR QUÉ, no el QUÉ
// Calculamos el balance total considerando transacciones pendientes
// porque el usuario necesita ver el dinero realmente disponible
const availableBalance = balance - pendingTransactions;

// ❌ Evitar comments obvios
// Suma 1 a counter
counter = counter + 1;

// ✅ Comentar decisiones no obvias
// Usamos setTimeout 0 para permitir que el DOM se actualice
// antes de calcular la altura del elemento
setTimeout(() => calculateHeight(), 0);

// ✅ TODOs para trabajo futuro
// TODO: Optimizar este loop para arrays grandes (n > 1000)
items.forEach(item => processItem(item));
```

### Organización de imports
```javascript
// 1. Librerías externas (si las hay)
import React from 'react';

// 2. Components
import Table from '../../components/Table/Table.js';
import Button from '../../components/Button/Button.js';

// 3. Services
import AccountService from '../../services/accountService.js';

// 4. Utils
import { formatDate, formatCurrency } from '../../utils/formatter.js';

// 5. Styles (si aplica)
import './styles.css';
```

## Commits

### Formato de mensajes
```
<tipo>: <descripción corta>

<cuerpo opcional con más detalles>
```

**Tipos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `refactor`: Refactorización (sin cambio de funcionalidad)
- `docs`: Cambios en documentación
- `style`: Formato, espacios (sin cambio de lógica)
- `test`: Agregar o modificar tests
- `chore`: Mantenimiento (deps, config)

**Ejemplos:**
```bash
git commit -m "feat: add filter by transaction type"

git commit -m "fix: account balance not updating after transfer"

git commit -m "refactor: extract validation to separate method"

git commit -m "docs: update README with new setup instructions"
```

### Reglas de commits
- Mensaje en imperativo ("add" no "added", "fix" no "fixed")
- Primera línea: máximo 72 caracteres
- Commits atómicos (una cosa a la vez)
- No mezclar refactor con features
- Commit frecuente (cada 30-60 min de trabajo productivo)

## Branches

### Nomenclatura
```
feature/nombre-de-la-funcionalidad
fix/nombre-del-bug
refactor/nombre-del-cambio
docs/nombre-del-cambio

Ejemplos:
feature/account-filters
fix/transfer-balance-bug
refactor/extract-validation
docs/update-readme
```

### Reglas
- Branch desde main (o develop)
- Un branch por funcionalidad
- Merge cuando esté completamente Done
- Eliminar branch después de merge
- No commits directos a main (usar branches)

---

## Ejemplo Completo Aplicado

### ❌ Antes (código inconsistente)
```javascript
// Mezcla de estilos
const account_id = "123";  // snake_case
const AccountName = "Ahorro";  // PascalCase
function GetBalance() { }  // PascalCase function

// Sin validación
async function withdraw(accountId, amount) {
  const account = await getAccount(accountId);
  account.balance -= amount;  // ¿Y si no hay suficiente?
}

// Comentarios inútiles
// Esta función obtiene las cuentas
function getAccounts() {
  return accounts;
}
```

### ✅ Después (con convenciones)
```javascript
// Nomenclatura consistente
const accountId = '123';
const accountName = 'Ahorro';
function getBalance() { }

// Con validación y manejo de errores
async function withdraw(accountId, amount) {
  if (!accountId) throw new Error('accountId is required');
  if (amount <= 0) throw new Error('amount must be positive');

  const account = await getAccount(accountId);

  if (account.balance < amount) {
    throw new Error('Insufficient funds');
  }

  account.balance -= amount;
  return account;
}

// Comentarios útiles solo donde es necesario
// Calculamos con transacciones pendientes para mostrar saldo real disponible
function getAvailableBalance(account) {
  return account.balance - _calculatePendingAmount(account.id);
}
```
```

---

### Paso 6: Configurar herramientas (1-2 horas)

#### 6.1 Setup del repositorio

**Checklist:**
```markdown
## Setup de Git

- [ ] Inicializar repositorio: `git init`
- [ ] Crear .gitignore
- [ ] Primer commit (estructura base)
- [ ] Crear repositorio remoto (GitHub)
- [ ] Push inicial: `git push -u origin main`
- [ ] Configurar branch protections (opcional)

### .gitignore recomendado
```
# Dependencies
node_modules/
package-lock.json

# Build outputs
dist/
build/

# Environment
.env
.env.local

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Testing
coverage/

# Misc
*.tmp
.cache/
```

#### 6.2 Setup de herramientas de desarrollo

**package.json** (si usas npm):
```json
{
  "name": "gestion-bancaria",
  "version": "0.1.0",
  "description": "Aplicación de gestión de cuentas bancarias",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src/",
    "format": "prettier --write src/"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

**ESLint config** (opcional pero recomendado):
```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  rules: {
    'no-console': 'warn',  // Advertir sobre console.log
    'no-unused-vars': 'warn',
    'quotes': ['error', 'single'],  // Comillas simples
    'semi': ['error', 'always'],    // Siempre punto y coma
  },
};
```

**Prettier config** (opcional):
```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

#### 6.3 Setup de GitHub Projects (opcional)

Si usas GitHub para track:

```markdown
## GitHub Projects Setup

1. Ir a tu repositorio en GitHub
2. Click en "Projects" → "New Project"
3. Elegir template: "Kanban"
4. Configurar columnas:
   - 📝 Backlog
   - 🎯 Selected for Sprint
   - 🏗️ In Progress
   - ✅ Done

5. Crear issues para cada US
6. Asignar a projects
7. Mover según progreso
```

---

### Paso 7: Planning Meeting (30-60 min)

#### 7.1 Sprint Planning (al inicio de cada sprint)

**Agenda:**
1. Review del sprint anterior (si aplica)
   - ¿Qué se completó?
   - ¿Qué quedó pendiente?
   - ¿Velocity real?

2. Selección de User Stories para el nuevo sprint
   - Revisar prioridades
   - Confirmar estimaciones
   - Verificar capacidad del sprint

3. Desglose de tareas técnicas
   - Cada US → mini tareas
   - Identificar bloqueadores potenciales

4. Compromisos
   - ¿Qué me comprometo a completar?
   - ¿Hay días que no podré trabajar?

**Template:** `docs/sprints/SPRINT_X_PLANNING.md`

```markdown
# Sprint [X] Planning

**Fecha:** [fecha]
**Duración sprint:** [X] semanas
**Capacity:** [X] puntos

## Review de Sprint Anterior (si aplica)
- Planeado: ___ puntos
- Completado: ___ puntos
- Velocity real: ___ puntos/sprint
- Carry-over: [US no completadas]

## Objetivo del Sprint
[Descripción concisa del objetivo principal]

Ejemplo: "Implementar transacciones básicas (depósito y retiro)"

## User Stories Seleccionadas

### US-007: Registrar depósito (5 pts)
**Tareas técnicas:**
- [ ] Crear TransactionForm component (2h)
- [ ] Implementar TransactionService.deposit() (1h)
- [ ] Integrar form con service (1h)
- [ ] Validaciones y error handling (1h)
- [ ] Testing manual completo (30min)

**Subtotal:** 5.5 horas

### US-008: Registrar retiro (5 pts)
[Similar a US-007]

## Capacity Check
- Total puntos: 10 pts
- Capacity sprint: 12 pts
- ✅ Under capacity (buffer de 2 pts)

## Riesgos de este Sprint
- Riesgo: Primera vez implementando validaciones de saldo
  Mitigación: Investigar 1 hora antes de implementar

## Compromisos
- Completar US-007 para el [fecha]
- Completar US-008 para el [fecha]
- Daily review (5-10 min) cada tarde

## Notas
- [Cualquier nota adicional]
```

---

### Paso 8: Crear estructura de documentos (30 min)

#### 8.1 Estructura recomendada

```
docs/
├── VISION.md                    # ← Fase 0
├── BACKLOG.md                   # ← Fase 1 (este)
├── SPRINTS.md                   # ← Fase 1 (este)
├── DEFINITION_OF_DONE.md        # ← Fase 1 (este)
├── CONVENTIONS.md               # ← Fase 1 (este)
├── ARCHITECTURE.md              # → Fase 3
├── DATA_MODEL.md                # → Fase 3
├── API_DESIGN.md                # → Fase 3
├── TEST_STRATEGY.md             # → Fase 5
├── DEPLOYMENT.md                # → Fase 7
│
├── user-stories/                # User Stories detalladas
│   ├── US-001.md
│   ├── US-002.md
│   └── ...
│
├── sprints/                     # Planning y retros de cada sprint
│   ├── SPRINT_1_PLANNING.md
│   ├── SPRINT_1_RETRO.md
│   ├── SPRINT_2_PLANNING.md
│   └── ...
│
├── decisions/                   # ADRs (Architecture Decision Records)
│   ├── 001-use-vanilla-js.md
│   ├── 002-json-file-storage.md
│   └── ...
│
└── retrospectives/              # Retros generales
    └── 2026-Q1-RETRO.md
```

#### 8.2 Crear archivos iniciales

**Comando:**
```bash
mkdir -p docs/user-stories docs/sprints docs/decisions docs/retrospectives

touch docs/VISION.md
touch docs/BACKLOG.md
touch docs/SPRINTS.md
touch docs/DEFINITION_OF_DONE.md
touch docs/CONVENTIONS.md
```

---

### Paso 9: Architecture Decision Records (30 min)

#### 9.1 ¿Qué son los ADRs?
Documentos cortos que registran decisiones arquitectónicas importantes.

**Cuándo crear un ADR:**
- Elegiste una tecnología sobre otra
- Definiste un patrón arquitectónico
- Tomaste una decisión que afecta múltiples partes del sistema
- Decidiste NO hacer algo de cierta manera

**Template:** `docs/decisions/XXX-titulo-decision.md`

```markdown
# ADR-[XXX]: [Título de la Decisión]

**Fecha:** YYYY-MM-DD
**Estado:** Propuesto / Aceptado / Rechazado / Deprecado / Reemplazado por ADR-YYY
**Decisores:** [Nombres]

## Contexto
¿Qué problema o situación requiere una decisión?
[2-3 párrafos de contexto]

## Opciones Consideradas
1. [Opción A]
2. [Opción B]
3. [Opción C]

## Análisis de Opciones

### Opción A: [Nombre]
**Pros:**
- Pro 1
- Pro 2

**Contras:**
- Contra 1
- Contra 2

### Opción B: [Nombre]
[Similar]

### Opción C: [Nombre]
[Similar]

## Decisión
**Opción elegida:** [Opción X]

**Justificación:**
[Explicación de por qué esta opción es la mejor para este contexto]

## Consecuencias

### Positivas
- Consecuencia positiva 1
- Consecuencia positiva 2

### Negativas
- Consecuencia negativa 1 (y cómo la mitigaremos)
- Consecuencia negativa 2

### Neutral
- Punto a considerar

## Referencias
- [Link a documentación]
- [Link a discusión]

## Notas
[Cualquier nota adicional]
```

**Ejemplo concreto:**
```markdown
# ADR-001: Usar Vanilla JavaScript en lugar de Framework

**Fecha:** 2026-03-15
**Estado:** Aceptado
**Decisores:** Roberto Carlos

## Contexto
Necesitamos elegir la tecnología frontend para la aplicación de gestión bancaria.
El proyecto es educativo y busca demostrar conocimiento fundamental de JavaScript.
No hay restricciones de tiempo críticas y el alcance es relativamente pequeño.

## Opciones Consideradas
1. React
2. Vue
3. Vanilla JavaScript

## Análisis

### Opción A: React
**Pros:**
- Muy popular (buen para portfolio)
- Gran ecosistema de librerías
- Experiencia previa con React

**Contras:**
- Overhead de setup (Webpack/Vite, JSX, etc.)
- Bundle size mayor
- No demuestra conocimiento de fundamentos

### Opción B: Vue
**Pros:**
- Curva de aprendizaje más suave
- Buen para proyectos pequeños
- Menos boilerplate que React

**Contras:**
- Menos familiaridad personal
- Aún requiere build step
- No es el objetivo de aprendizaje

### Opción C: Vanilla JavaScript
**Pros:**
- Demuestra conocimiento profundo de JavaScript
- Sin dependencias externas
- Control total sobre el código
- Bundle size mínimo
- Transferible a cualquier framework

**Contras:**
- Más código manual (routing, state, etc.)
- Sin herramientas de dev automáticas
- Requiere más disciplina en arquitectura

## Decisión
**Opción elegida:** Vanilla JavaScript

**Justificación:**
El objetivo principal del proyecto es educativo. Usar Vanilla JS me obliga a
entender conceptos fundamentales como:
- Manipulación del DOM
- Event handling
- Routing manual
- State management sin librerías

Estos conocimientos son transferibles a cualquier framework futuro y demuestran
dominio real del lenguaje. Para un proyecto de este alcance (< 10 páginas),
el overhead de un framework no se justifica.

## Consecuencias

### Positivas
- Aprendizaje profundo de JavaScript fundamental
- Portfolio demuestra versatilidad
- Código más simple y directo
- Sin vulnerabilidades de dependencias externas

### Negativas
- Tendré que implementar routing manualmente (mitigación: es simple, < 100 líneas)
- Sin hot-reload automático (mitigación: usar Live Server o similar)
- Más código para features complejas (mitigación: crear componentes reutilizables)

### Neutral
- Performance será similar (proyecto pequeño)

## Referencias
- [You Don't Need a Framework](https://example.com)

## Notas
Esta decisión aplica solo al MVP. Si el proyecto crece significativamente
(> 20 páginas, estado complejo), reconsiderar migración a framework.
```

---

### Paso 10: Crear cronograma inicial (1 hora)

#### 10.1 Gantt simplificado

**Template:** `docs/TIMELINE.md`

```markdown
# Timeline del Proyecto

## Overview
**Inicio:** [fecha]
**MVP target:** [fecha] (X semanas después)
**v1.0 target:** [fecha]

## Fases

### Fase 0: Concepción
📅 [fecha inicio] - [fecha fin]
✅ Completada

### Fase 1: Planificación
📅 [fecha inicio] - [fecha fin]
🏗️ En progreso

### Fase 2: Análisis
📅 [fecha estimada]

### Fase 3: Diseño
📅 [fecha estimada]

### Fase 4-5: Desarrollo + Testing (Sprints)
📅 Sprint 1: [fechas]
📅 Sprint 2: [fechas]
📅 Sprint 3: [fechas]
📅 Sprint 4: [fechas]

### Fase 6: Documentación Final
📅 [fecha estimada]

### Fase 7: Despliegue
📅 [fecha estimada]

## Hitos (Milestones)

### 🎯 Milestone 1: Setup Completo
**Fecha:** [fecha]
**Criteria:**
- Repositorio configurado
- Estructura de carpetas
- Tooling setup
- Docs fundacionales creados

### 🎯 Milestone 2: MVP Funcional
**Fecha:** [fecha]
**Criteria:**
- CRUD de cuentas funciona
- Transacciones básicas implementadas
- Pasa DoD
- Desplegable (aunque sea local)

### 🎯 Milestone 3: v1.0 Release
**Fecha:** [fecha]
**Criteria:**
- Todas las features Must Have completadas
- Testing exhaustivo realizado
- Documentación completa
- Desplegado en producción

### 🎯 Milestone 4: v1.1 Release
**Fecha:** [fecha]
**Criteria:**
- Features Should Have completadas
- Feedback de usuarios incorporado

## Gantt Chart (ASCII)

```
                         Marzo      Abril      Mayo
                       |----------|----------|----------|
Fase 0: Concepción     [==]
Fase 1: Planificación     [==]
Fase 2-3: Análisis/Diseño  [====]
Sprint 1                       [=====]
Sprint 2                              [=====]
Sprint 3                                     [=====]
Sprint 4                                            [==]
Deploy                                              [=]
                                                     ^
                                                   v1.0
```

## Revisión del Timeline

Revisar cada 2 semanas:
- [ ] ¿Vamos según lo planeado?
- [ ] ¿Velocity real vs estimada?
- [ ] ¿Ajustar fechas de milestones?
- [ ] ¿Reducir alcance si es necesario?
```

---

### Paso 11: Definir métricas de éxito (30 min)

#### 11.1 KPIs del proyecto

**Crear archivo:** `docs/METRICS.md`

```markdown
# Métricas del Proyecto

## Métricas de Desarrollo

### Velocity (Velocidad)
**Qué:** Puntos completados por sprint
**Target:** ___ puntos/sprint
**Cómo medir:** Sumar puntos de US completadas en cada sprint

**Tracking:**
| Sprint | Planeado | Completado | Velocity Real |
|--------|----------|------------|---------------|
| 1      | 10 pts   | 8 pts      | 8 pts         |
| 2      | 10 pts   | 12 pts     | 12 pts        |
| 3      | 12 pts   | ?          | ?             |

### Lead Time
**Qué:** Tiempo desde que se define una US hasta que se completa
**Target:** < 1 sprint para US de 5 pts o menos
**Cómo medir:** Fecha completada - fecha creada

### Code Quality
- **Errores en consola:** 0 (target)
- **Warnings:** < 5 (aceptable)
- **Duplicación de código:** < 5%
- **Complejidad ciclomática:** < 10 por función

### Bugs
- **Bugs críticos abiertos:** 0 (always)
- **Bugs reportados por sprint:** < 3
- **Tiempo de resolución de bugs:** < 3 días

## Métricas de Producto

### Performance
- **Tiempo de carga inicial:** < 3 segundos
- **Tiempo de respuesta operaciones:** < 500ms
- **Tamaño bundle (si aplica):** < 200 KB

### Usabilidad
- **¿Puede un nuevo usuario crear una cuenta en < 2 min?:** Sí/No
- **¿La navegación es intuitiva?:** Sí/No (test con 2-3 personas)
- **Errores de usuario:** < 1 por sesión de uso

## Métricas Personales (Aprendizaje)

### Skills desarrolladas
- [ ] Dominio de Vanilla JS
- [ ] Arquitectura de software
- [ ] Testing
- [ ] Git workflow avanzado

### Satisfacción
- **¿Disfruté el proceso?:** 1-10
- **¿Aprendí cosas nuevas?:** Sí/No (¿qué?)
- **¿Lo volvería a hacer así?:** Sí/No

---

## Cómo Tracking

### Diario (5 min al final del día)
```markdown
## [Fecha]
- Completado hoy: ___
- Bloqueadores: ___
- Aprendizajes: ___
```

### Semanal (15 min los viernes)
```markdown
## Semana del [fecha]
- US completadas: ___
- Puntos completados: ___
- Velocity: ___
- Highlights: ___
- Challenges: ___
```

### Por Sprint (30 min al finalizar)
```markdown
## Sprint [X] - Retrospectiva de Métricas
- Velocity planeada vs real: ___
- Lead time promedio: ___
- Bugs encontrados: ___
- Calidad del código: ___

### Análisis
[¿Por qué la velocity fue mayor/menor? ¿Qué ajustar?]
```
```

---

## 🎯 Entregables de la Fase 1

Al completar esta fase debes tener:

### Documentos creados:
- [x] docs/BACKLOG.md (completo con todas las US)
- [x] docs/SPRINTS.md (planificación inicial de 3-4 sprints)
- [x] docs/DEFINITION_OF_DONE.md
- [x] docs/CONVENTIONS.md
- [x] docs/TIMELINE.md
- [x] docs/METRICS.md
- [x] docs/decisions/ (con al menos 1-2 ADRs)

### Configuración completada:
- [x] Repositorio Git configurado
- [x] .gitignore apropiado
- [x] Estructura de carpetas creada
- [x] Tooling configurado (linters, formatters)
- [x] GitHub Projects (opcional)

### Planificación completada:
- [x] Todas las funcionalidades convertidas a User Stories
- [x] User Stories priorizadas con MoSCoW
- [x] Sprints definidos (mínimo 3)
- [x] Sprint 1 planning completo con tareas técnicas
- [x] Velocity estimada calculada

### Validaciones:
- [x] Sprint 1 planificado no excede capacity
- [x] Dependencias entre US identificadas
- [x] Definition of Done es cumplible y clara
- [x] Convenciones documentadas y acordadas

---

## 📊 Aplicación a tu Proyecto Actual

### Estado Actual:
Tu proyecto está parcialmente construido sin planificación previa.

### Tarea: Crear planificación retroactiva (2-3 horas)

```markdown
## Paso 1: Inferir y documentar US completadas (30 min)
Analizar código actual y crear User Stories para lo que ya está hecho:

✅ US-006: Ver lista de transacciones
  - Estado: Completada
  - Fecha: 2026-03-20
  - Archivos: TransactionsPage.js, TransactionService.js

✅ US-XXX: [Otra funcionalidad ya existente]

## Paso 2: Crear BACKLOG.md con US pendientes (45 min)
Listar todas las funcionalidades que faltan:

⬜ US-001: Ver lista de cuentas
⬜ US-002: Crear cuenta
⬜ US-007: Registrar depósito
⬜ US-008: Registrar retiro
⬜ US-009: Transferir entre cuentas
⬜ US-010: Filtrar transacciones
[etc...]

## Paso 3: Priorizar y planificar próximos 2 sprints (30 min)
Sprint actual (próximas 2 semanas):
- US-001: Ver cuentas (2 pts)
- US-002: Crear cuenta (3 pts)
- US-007: Registrar depósito (5 pts)
Total: 10 pts

Sprint siguiente:
- US-008: Registrar retiro (5 pts)
- US-009: Transferir entre cuentas (8 pts)
Total: 13 pts

## Paso 4: Crear DEFINITION_OF_DONE.md (15 min)
Define qué significa "done" para tu proyecto.

## Paso 5: Documentar convenciones actuales (30 min)
Analiza tu código existente e infiere las convenciones:
- Nombres de archivos: PascalCase para páginas ✅
- Funciones privadas: prefijo _ ✅
- Services: camelCase ✅
- [etc...]

Documenta en CONVENTIONS.md para mantener consistencia.
```

---

## 🔄 Template Rápido para Sprints Recurrentes

### Sprint Planning en 30 minutos:

**Minuto 0-10: Review del sprint anterior**
```
- ¿Qué se completó?: ___
- ¿Qué no?: ___
- Velocity real: ___ pts
```

**Minuto 10-20: Seleccionar US para nuevo sprint**
```
- Revisar backlog priorizado
- Seleccionar hasta capacity
- Verificar dependencias
```

**Minuto 20-25: Desglosar en tareas**
```
Cada US → 3-5 tareas técnicas específicas
```

**Minuto 25-30: Documentar y comprometer**
```
- Crear docs/sprints/SPRINT_X_PLANNING.md
- Commit del plan
- ¡Empezar el sprint!
```

---

## 🎓 Tips y Mejores Prácticas

### ✅ DO (Hacer):

1. **Ser realista con estimaciones**
   - Mejor subestimar capacity que sobrestimar
   - Incluir buffer del 30-40% para imprevistos

2. **Backlog grooming regular**
   - Revisar y actualizar backlog cada 1-2 semanas
   - Eliminar US que ya no son relevantes
   - Agregar nuevas US que surjan

3. **Priorizar despiadadamente**
   - Si todo es Must Have, nada es Must Have
   - Ser honesto: ¿realmente lo necesito AHORA?

4. **Documentar decisiones**
   - ADRs para decisiones importantes
   - Justificar por qué elegiste X sobre Y

5. **Planear en bloques**
   - No planear los 10 sprints desde el inicio
   - Planear 2-3 sprints ahead
   - Ajustar según feedback y velocity real

### ❌ DON'T (No hacer):

1. **No sobre-planificar**
   - Si pasas más tiempo planificando que desarrollando, algo anda mal
   - Timebox la planificación

2. **No asumir velocity constante**
   - Los primeros sprints son más lentos (setup, aprendizaje)
   - Ajusta estimaciones con datos reales

3. **No ignorar dependencias**
   - US-002 depende de US-001 → no ponerlas en paralelo

4. **No llenar sprints al 100%**
   - Deja buffer para bugs, interrupciones, aprendizaje

5. **No cambiar prioridades constantemente**
   - Establece prioridades y respétalas por al menos 1 sprint
   - Cambios constantes = nunca terminas nada

### 💡 Pro Tips:

**Tip 1: La regla del 3**
Si estimas una tarea en X horas, probablemente tome 3X en realidad (para principiantes).
Con experiencia, este multiplicador baja a 1.5-2X.

**Tip 2: Agrupa por tipo de trabajo**
En un sprint, intenta tener:
- 50% features nuevas (US-001, US-002)
- 30% mejoras/refactors (optimización, cleanup)
- 20% bugs y tech debt

**Tip 3: "Yesterday's weather"**
La mejor predicción de velocity futura es la velocity reciente.
Después de 2-3 sprints, usa el promedio de velocity real para planificar.

**Tip 4: Buffer explícito**
En vez de "optimismo" en las estimaciones, planea explícitamente buffer:
- Sprint capacity: 15 pts
- US planeadas: 10 pts
- Buffer: 5 pts para imprevistos

---

## 🚦 Criterios de Salida (para avanzar a Fase 2)

Puedes avanzar a Fase 2: Análisis de Requisitos cuando:

- [x] BACKLOG.md completo con todas las funcionalidades como US
- [x] User Stories priorizadas con método MoSCoW
- [x] Al menos 2 sprints planificados en detalle
- [x] Sprint 1 con tareas técnicas desglosadas
- [x] Definition of Done clara y cumplible
- [x] Convenciones de código documentadas
- [x] Repositorio Git configurado y primer commit realizado
- [x] Tooling básico configurado
- [x] Timeline tentativo creado

**¿No cumples alguno?** Invierte más tiempo en esta fase antes de avanzar.

---

## 📚 Checklist Final de la Fase 1

```markdown
## Fase 1: Planificación - Checklist

### Product Backlog
- [ ] Todas las funcionalidades convertidas a User Stories
- [ ] User Stories siguen formato estándar consistente
- [ ] Criterios de aceptación claros para cada US
- [ ] Estimaciones de puntos realizadas
- [ ] Dependencias entre US identificadas
- [ ] BACKLOG.md creado y completo

### Priorización
- [ ] Método MoSCoW aplicado a todas las US
- [ ] Must Have claramente diferenciado de Should Have
- [ ] Won't Have explícitamente listado
- [ ] Priorización validada contra objetivos del proyecto

### Sprint Planning
- [ ] Duración de sprint definida (1-2 semanas)
- [ ] Velocity/capacity calculada
- [ ] Mínimo 2 sprints planificados
- [ ] Sprint 1 con tareas técnicas detalladas
- [ ] SPRINTS.md creado

### Estándares
- [ ] Definition of Done documentada
- [ ] Convenciones de código definidas
- [ ] Git workflow establecido
- [ ] Formato de commits definido

### Configuración
- [ ] Repositorio Git inicializado
- [ ] .gitignore configurado
- [ ] Estructura de carpetas creada
- [ ] Herramientas instaladas (linters, etc.)
- [ ] Primer commit realizado

### Documentación
- [ ] BACKLOG.md completo
- [ ] SPRINTS.md con planificación inicial
- [ ] DEFINITION_OF_DONE.md
- [ ] CONVENTIONS.md
- [ ] TIMELINE.md
- [ ] METRICS.md
- [ ] Mínimo 1 ADR creado

### Validación
- [ ] Sprint 1 es realista (no over-capacity)
- [ ] User Stories son claras y accionables
- [ ] Definition of Done es cumplible consistentemente
- [ ] Timeline consideró buffer para imprevistos

---

**Tiempo total invertido en Fase 1:** ___ horas
**Fecha de inicio:** ___
**Fecha de finalización:** ___
**Próximo paso:** Fase 2 - Análisis de Requisitos (detalle de cada US)
```

---

## 🎬 Conclusión de la Fase 1

### ¿Qué lograste?
- ✅ Backlog priorizado y estructurado
- ✅ Roadmap claro para las próximas 4-8 semanas
- ✅ Sprints planificados con capacidad realista
- ✅ Estándares y procesos definidos
- ✅ Repositorio y herramientas configuradas
- ✅ Métricas para medir progreso

### ¿Qué tienes ahora?
Un **plan de acción ejecutable** que te dice:
- Qué construir primero, segundo, tercero...
- Cuánto tiempo tomará aproximadamente
- Cómo saber cuándo algo está "done"
- Cómo mantener calidad y consistencia

### ¿Qué evitar?
- ❌ Cambiar prioridades cada semana (be disciplined)
- ❌ Sobrecargar sprints (menos es más)
- ❌ Ignorar la velocity real (ajusta con datos)
- ❌ Saltar el Definition of Done (recipe for technical debt)

### Siguiente paso:
➡️ **Fase 2: Análisis de Requisitos** (detalle de cada User Story con casos de uso, flujos, mockups)

---

**Recuerda:**
> "Un plan detallado es la diferencia entre desarrollo organizado y caos."
> "Planifica sprints, no años. Ajusta según aprendes."

La Fase 1 convierte tu visión en un mapa. Ahora sabes exactamente qué camino seguir.
