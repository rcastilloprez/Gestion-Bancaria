# Fase 2: Análisis de Requisitos
## Detallar QUÉ construir para cada funcionalidad

**Duración estimada:** Variable por funcionalidad (1-3 horas por US)
**Prerequisito:** Fase 1 (Planificación) completada
**Cuándo usar:** Antes de diseñar e implementar cada User Story

---

## 🎯 Objetivo de esta fase
Transformar User Stories de alto nivel en especificaciones detalladas:
- Desglosar cada funcionalidad en flujos específicos
- Definir criterios de aceptación precisos
- Identificar todos los casos edge y errores posibles
- Crear mockups/wireframes de la UI
- Documentar reglas de negocio

**Regla de oro:** Al finalizar esta fase para una US, cualquier desarrollador debería poder implementarla sin hacer preguntas.

---

## 📋 Proceso General

### Cuándo hacer análisis detallado

**NO analizar todo de una vez:**
- ❌ Analizar todas las 15 User Stories al inicio del proyecto
- ✅ Analizar solo las US del próximo sprint (2-4 US)
- ✅ Just-in-time analysis (antes de implementar)

**Por qué:**
- Los requisitos pueden cambiar
- Aprendes cosas durante implementación que afectan análisis futuro
- Evita desperdicio de esfuerzo en features que pueden ser canceladas

**Flujo recomendado:**
```
Sprint Planning → Analizar US de ese sprint → Implementar → Repeat
```

---

## 📋 Checklist por User Story

### Paso 1: Escribir User Story detallada (30-45 min)

#### 1.1 Formato completo de User Story

**Template:** `docs/user-stories/US-XXX.md`

```markdown
# US-XXX: [Título descriptivo]

**Estado:** Todo | In Progress | Done
**Prioridad:** Must Have | Should Have | Could Have
**Estimación:** X puntos (X horas)
**Sprint:** Sprint X
**Dependencias:** US-YYY, US-ZZZ

---

## User Story

**Como** [tipo de usuario]
**Quiero** [acción/funcionalidad]
**Para** [beneficio/objetivo]

---

## Contexto y Motivación

[2-3 párrafos explicando por qué esta funcionalidad es importante,
qué problema resuelve, y cómo encaja en el producto general]

---

## Criterios de Aceptación

### Escenario 1: [Nombre del escenario]
**Dado que** [contexto/precondición]
**Cuando** [acción del usuario]
**Entonces** [resultado esperado]

**Ejemplo:**
Dado que tengo 3 cuentas registradas con balances de $1000, $2000, $500
Cuando accedo a la página /cuentas
Entonces veo una tabla con las 3 cuentas mostrando nombre, tipo y balance

### Escenario 2: Estado vacío
Dado que no tengo cuentas registradas
Cuando accedo a /cuentas
Entonces veo mensaje "No tienes cuentas registradas" y botón "Crear cuenta"

### Escenario 3: Error de carga
Dado que hay un error al cargar datos (db.json corrupto)
Cuando accedo a /cuentas
Entonces veo mensaje de error claro y botón "Reintentar"

### Escenario 4: Performance
Dado que tengo 50 cuentas registradas
Cuando accedo a /cuentas
Entonces la lista se carga en menos de 2 segundos

---

## Flujo Principal (Happy Path)

1. Usuario navega a /cuentas (click en menú o URL directa)
2. Sistema muestra loading state ("Cargando cuentas...")
3. Sistema carga datos desde AccountService.getAll()
4. Sistema renderiza tabla con componente Table
5. Usuario ve todas las cuentas con información actualizada

**Tiempo estimado:** < 2 segundos (primer carga), < 500ms (loads subsecuentes)

---

## Flujos Alternativos

### Flujo A: Sin cuentas
1-3. Igual que flujo principal
4. Sistema detecta array vacío
5. Sistema renderiza empty state con mensaje y CTA

### Flujo B: Error de red/datos
1-3. Igual que flujo principal
4. Error en getAll() (network, parse error, etc.)
5. Sistema muestra error state con mensaje y botón "Reintentar"
6. Si usuario click reintentar → volver a paso 2

### Flujo C: Muchas cuentas (paginación futura)
[Pospuesto a v1.2 - Won't Have en MVP]

---

## Casos Edge

| Caso | Input | Comportamiento Esperado |
|------|-------|-------------------------|
| 0 cuentas | Array vacío | Empty state |
| 1 cuenta | Array con 1 item | Tabla de 1 fila |
| 100+ cuentas | Array grande | Mostrar todas (paginación en v1.2) |
| Cuenta sin nombre | {name: ""} | No debería existir (validación en creación) |
| Balance negativo | {balance: -100} | No debería existir (validación) |
| db.json corrupto | Parse error | Error state: "Error cargando datos" |
| db.json no existe | 404 | Tratarlo como array vacío o error inicial |

---

## Reglas de Negocio

### RN-001: Ordenamiento de cuentas
Las cuentas se muestran ordenadas por:
1. Prioridad: tipo (ahorro, corriente, inversión)
2. Secundario: nombre alfabéticamente

**Justificación:** Ahorros suelen ser más importantes para usuarios

### RN-002: Formato de balance
- Mostrar con 2 decimales siempre
- Símbolo de moneda según currency (default: $)
- Separadores de miles (1,000.00)

### RN-003: Colores por tipo
- Ahorro: Verde (#28a745)
- Corriente: Azul (#007bff)
- Inversión: Morado (#6f42c1)

---

## Validaciones

### En backend (AccountService):
- [x] Ninguna validación necesaria para `getAll()` (solo lectura)

### En frontend (AccountsPage):
- [x] Verificar que response es array
- [x] Verificar que cada item tiene propiedades requeridas

---

## Datos de Entrada/Salida

### Input
**Ninguno** (GET request sin parámetros)

### Output
```typescript
Account[] = [
  {
    id: string,           // UUID v4
    name: string,         // 3-50 caracteres
    type: 'ahorro' | 'corriente' | 'inversion',
    balance: number,      // >= 0
    currency: string,     // ISO 4217 (default: 'MXN')
    createdAt: string,    // ISO Date
    updatedAt: string     // ISO Date
  },
  ...
]
```

### Errores posibles
```javascript
// NetworkError
{
  name: 'NetworkError',
  message: 'No se pudo conectar al servidor'
}

// ParseError
{
  name: 'ParseError',
  message: 'Error al procesar datos'
}
```

---

## Wireframe / Mockup

```
┌─────────────────────────────────────────────────────┐
│  Gestión Bancaria                    [Usuario ▼]    │
├─────────────────────────────────────────────────────┤
│  [Dashboard] [Cuentas] [Transacciones]              │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Mis Cuentas                       [+ Nueva Cuenta] │
│  ────────────────────────────────────────────────   │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │ Nombre        │ Tipo       │ Balance          │ │
│  ├────────────────────────────────────────────────┤ │
│  │ 💚 Ahorro     │ Ahorro     │ $12,345.67       │ │
│  │ 💙 Principal  │ Corriente  │ $5,678.90        │ │
│  │ 💜 Inversión  │ Inversión  │ $100,000.00      │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  Balance Total: $118,024.57                         │
│                                                      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Estado vacío:                                       │
│                                                      │
│  Mis Cuentas                       [+ Nueva Cuenta] │
│  ────────────────────────────────────────────────   │
│                                                      │
│         📊                                           │
│    No tienes cuentas registradas                     │
│                                                      │
│    Crea tu primera cuenta para empezar               │
│    a gestionar tus finanzas.                         │
│                                                      │
│         [+ Crear Primera Cuenta]                     │
│                                                      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Estado de error:                                    │
│                                                      │
│  Mis Cuentas                       [+ Nueva Cuenta] │
│  ────────────────────────────────────────────────   │
│                                                      │
│         ⚠️                                           │
│    Error al cargar las cuentas                       │
│                                                      │
│    No pudimos cargar tus cuentas. Por favor          │
│    verifica tu conexión e intenta nuevamente.        │
│                                                      │
│         [🔄 Reintentar]                              │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## Diseño de Interacciones

### Hover states
- Fila de tabla: fondo gris claro (#f8f9fa)
- Botón "Nueva Cuenta": fondo más oscuro

### Loading state
- Skeleton screen (opcional) o spinner
- Texto: "Cargando cuentas..."
- Deshabilitar navegación durante carga: NO (permitir cancel)

### Animaciones
- Fade in al cargar datos (300ms)
- NO usar animaciones pesadas (performance)

---

## Consideraciones Técnicas

### Archivos involucrados
```
src/pages/Accounts/
  ├── AccountsPage.js       # Crear nuevo
  ├── styles.css            # Crear nuevo (opcional)

src/services/
  ├── accountService.js     # Usar existente

src/components/Table/
  ├── Table.js              # Reutilizar existente

src/router.js               # Modificar: agregar ruta /cuentas
```

### Componentes reutilizables
- `Table` (ya existe)
- `Button` (si existe, sino inline)
- `EmptyState` (crear genérico si hay tiempo)
- `ErrorState` (crear genérico si hay tiempo)

### Dependencias externas
- Ninguna

### Performance
- Rendering: < 100ms para 50 cuentas
- Inicial load: < 2 segundos
- Re-renders: minimizar (solo cuando data cambie)

---

## Accesibilidad

- [ ] Tabla con `<table>` semántico (no divs)
- [ ] Headers con `<th>` y scope
- [ ] Navegable con teclado (Tab)
- [ ] Botones con `aria-label` descriptivo
- [ ] Loading state anunciado a screen readers
- [ ] Contraste de colores WCAG AA (4.5:1)

---

## Testing Strategy

### Manual Testing
- [ ] Cargar con 0, 1, 3, 50 cuentas
- [ ] Simular error (renombrar db.json temporalmente)
- [ ] Verificar estados: loading, success, empty, error
- [ ] Testing en Chrome, Firefox, Safari
- [ ] Testing responsive (mobile, tablet)

### Unit Testing (opcional para MVP)
```javascript
// AccountsPage.test.js
describe('AccountsPage', () => {
  test('renders empty state when no accounts', () => {...});
  test('renders table when accounts exist', () => {...});
  test('shows error state on fetch failure', () => {...});
});
```

---

## Definition of Done (específico para esta US)

- [ ] Página renderiza correctamente en /cuentas
- [ ] Muestra todas las cuentas desde db.json
- [ ] Tabla usa componente Table reutilizable
- [ ] Empty state funciona (sin cuentas)
- [ ] Error state funciona (simulado)
- [ ] Loading state visible durante carga
- [ ] Formato de balance correcto ($ + decimales + comas)
- [ ] Responsive (usable en mobile)
- [ ] Sin errores en consola
- [ ] Navegación funciona (ir y volver)
- [ ] Performance aceptable (< 2seg carga)
- [ ] Probado manualmente con todos los escenarios
- [ ] Código commiteado: "feat: add AccountsPage with account list view"
- [ ] CHANGELOG.md actualizado

---

## Notas y Decisiones

### Decisión 1: Mostrar balance total
**Estado:** Aprobado
**Razón:** Es muy útil para usuario ver el total de un vistazo
**Implementación:** Calcular sum() en el frontend al renderizar

### Decisión 2: No implementar paginación en MVP
**Estado:** Pospuesto a v1.2
**Razón:** Complejidad vs beneficio no justificado para MVP
**Suposición:** Usuario promedio tiene < 10 cuentas

### Decisión 3: Colores por tipo de cuenta
**Estado:** Aprobado
**Razón:** Mejora usabilidad, fácil identificación visual
**Riesgo:** Usuarios con daltonismo (mitigar con iconos también)

---

## Preguntas Abiertas

- [ ] ¿Incluir acciones por cuenta (editar, eliminar) en esta vista?
      **Decisión:** NO, eso es US-003 y US-004. Esta US solo visualiza.

- [ ] ¿Mostrar fecha de última transacción?
      **Decisión:** NO en MVP, agregar en v1.1 si es útil.

- [ ] ¿Click en cuenta abre detalle de cuenta?
      **Decisión:** Sí, pero eso es US-005 (Could Have), no un MVP.

---

## Estimación Detallada

| Tarea | Tiempo Estimado |
|-------|-----------------|
| Crear estructura HTML | 30 min |
| Implementar _loadAccounts() | 45 min |
| Integrar Table component | 30 min |
| Implementar empty state | 20 min |
| Implementar error state | 20 min |
| Implementar loading state | 15 min |
| CSS y estilos | 45 min |
| Testing manual | 30 min |
| Fixes y ajustes | 30 min |
| **Total** | **4.5 horas ≈ 5 pts** |

**Buffer:** 30% → 6-7 horas totales (comfortable)

---

## Historial de Cambios

| Fecha | Cambio | Razón |
|-------|--------|-------|
| 2026-03-20 | Creación inicial | Sprint 1 planning |
| 2026-03-22 | Agregado balance total | Feedback de review |

---

## Anexos

### Anexo A: Estructura de datos de ejemplo
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Cuenta de Ahorro",
    "type": "ahorro",
    "balance": 12345.67,
    "currency": "MXN",
    "createdAt": "2026-01-15T10:00:00Z",
    "updatedAt": "2026-03-20T14:30:00Z"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Cuenta Corriente",
    "type": "corriente",
    "balance": 5678.90,
    "currency": "MXN",
    "createdAt": "2026-01-15T10:05:00Z",
    "updatedAt": "2026-03-19T09:15:00Z"
  }
]
```

### Anexo B: Referencias
- Componente Table: src/components/Table/Table.js
- AccountService: src/services/accountService.js
- Convenciones: docs/CONVENTIONS.md
```

---

### Paso 2: Análisis de flujos (30-45 min)

#### 2.1 Mapear todos los flujos posibles

**Herramienta: Diagrama de flujo simple**

```
                    ┌─────────────┐
                    │   Usuario   │
                    │  navega a   │
                    │  /cuentas   │
                    └──────┬──────┘
                           │
                     ┌─────▼──────┐
                     │  Mostrar   │
                     │  Loading   │
                     └─────┬──────┘
                           │
               ┌───────────▼────────────┐
               │ AccountService.getAll()│
               └───────────┬────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
         ┌────▼─────┐            ┌─────▼──────┐
         │  Success │            │   Error    │
         └────┬─────┘            └─────┬──────┘
              │                        │
    ┌─────────▼─────────┐       ┌──────▼───────┐
    │  ¿Array vacío?    │       │ Mostrar error│
    └─────────┬─────────┘       │  + Reintentar│
              │                 └──────────────┘
      ┌───────┴────────┐
      │                │
  ┌───▼──┐       ┌────▼─────┐
  │ Sí   │       │   No     │
  └───┬──┘       └────┬─────┘
      │               │
┌─────▼──────┐   ┌────▼──────┐
│Empty State │   │  Renderizar│
│+ CTA       │   │   Tabla    │
└────────────┘   └────────────┘
```

#### 2.2 Documentar cada decisión/branch

Para cada punto de decisión en el flujo:
- ¿Qué condición?
- ¿Qué opciones?
- ¿Cuál es el comportamiento para cada opción?

---

### Paso 3: Definir reglas de negocio (20-30 min)

#### 3.1 Identificar reglas de negocio

**Regla de negocio** = Lógica que no es técnica, viene del dominio del problema

**Ejemplo en gestión bancaria:**
```markdown
## RN-001: Balance nunca negativo
Una cuenta NO puede tener balance negativo.
- Al crear: balance >= 0
- Al retirar: verificar saldo suficiente
- Al transferir: verificar saldo suficiente en origen

**Justificación:** Simula realidad bancaria (sin sobregiros en MVP)

---

## RN-002: Transferencias atómicas
Una transferencia debe actualizar AMBAS cuentas o ninguna.
- No puede quedar solo una cuenta actualizada
- Si falla actualización de destino, revertir origen

**Justificación:** Integridad de datos, balances siempre correctos

---

## RN-003: Tipos de cuenta fijos
Solo 3 tipos permitidos: ahorro, corriente, inversión
- No se pueden crear tipos custom
- Cada tipo tiene comportamiento específico (futuro: tasas, límites)

**Justificación:** Simplicidad, evita datos inconsistentes

---

## RN-004: Montos siempre positivos
Los montos en transacciones son siempre positivos.
- El tipo de transacción indica si suma o resta
- Depósito $100 → balance +100
- Retiro $100 → balance -100

**Justificación:** Evita confusión (registrar -$100 como retiro)
```

#### 3.2 Priorizar reglas por criticidad

```markdown
## Reglas Críticas (MUST implementar)
- RN-001: Balance nunca negativo
- RN-002: Transferencias atómicas

## Reglas Importantes (SHOULD implementar)
- RN-003: Tipos de cuenta fijos
- RN-004: Montos positivos

## Reglas Deseables (COULD implementar)
- RN-005: Límites de retiro por día
- RN-006: Alertas de bajo balance
```

---

### Paso 4: Diseñar wireframes (45-60 min)

#### 4.1 Herramientas

**No necesitas herramientas fancy:**
- ✅ Papel y lápiz (más rápido)
- ✅ ASCII art en markdown
- ✅ Excalidraw (gratis, simple)
- ✅ Figma (gratis, más sofisticado)
- ❌ Photoshop (overkill)

#### 4.2 Niveles de fidelidad

**Low-fidelity (suficiente para MVP):**
- Cajas y texto
- No colores ni estilos
- Enfoque en layout y flujo

**Medium-fidelity (opcional):**
- Colores básicos
- Tipografía aproximada
- Espaciado realista

**High-fidelity (NO necesario para MVP):**
- Diseño pixel-perfect
- Assets finales
- Interacciones detalladas

#### 4.3 Qué wireframear

```markdown
## Wireframes necesarios por US

### US-001: Ver lista de cuentas
- [x] Vista principal (con datos)
- [x] Empty state (sin datos)
- [x] Error state
- [x] Loading state

### US-002: Crear nueva cuenta
- [ ] Modal/página de creación
- [ ] Form con campos
- [ ] Validación de errores
- [ ] Success state

### US-007: Registrar depósito
- [ ] Form de depósito
- [ ] Selección de cuenta
- [ ] Confirmación
- [ ] Feedback de éxito
```

---

### Paso 5: Identificar casos edge (30 min)

#### 5.1 Técnica: Boundary Value Analysis

Para cada input, identifica valores límite:

```markdown
## Análisis de valores límite: Crear Cuenta

### Campo: name (nombre de cuenta)
| Valor | Válido | Caso |
|-------|--------|------|
| "" (vacío) | ❌ | Mínimo inválido |
| "A" | ❌ | Menor que mínimo (min: 3) |
| "Ah" | ❌ | Justo debajo del mínimo |
| "Aho" | ✅ | En el límite mínimo |
| "Cuenta de Ahorro" | ✅ | Valor normal |
| "X".repeat(50) | ✅ | En el límite máximo |
| "X".repeat(51) | ❌ | Excede máximo |
| "X".repeat(100) | ❌ | Muy largo |

### Campo: balance (balance inicial)
| Valor | Válido | Caso |
|-------|--------|------|
| -100 | ❌ | Negativo |
| -0.01 | ❌ | Justo debajo de cero |
| 0 | ✅ | Límite mínimo |
| 0.01 | ✅ | Justo arriba del mínimo |
| 1000 | ✅ | Valor normal |
| 999999999 | ✅ | Muy grande (pero válido) |
| Infinity | ❌ | Infinito |
| NaN | ❌ | No es número |
| "1000" | ❌ | String (debe ser number) |

### Campo: type
| Valor | Válido | Caso |
|-------|--------|------|
| "ahorro" | ✅ | Válido |
| "corriente" | ✅ | Válido |
| "inversion" | ✅ | Válido |
| "inversión" (con tilde) | ❌ | Typo común |
| "credito" | ❌ | No en lista |
| "" | ❌ | Vacío |
| null | ❌ | Null |
| undefined | ❌ | Undefined |
```

#### 5.2 Casos edge comunes

```markdown
## Checklist de casos edge

### Datos
- [ ] Input vacío
- [ ] Input null/undefined
- [ ] Input de tipo incorrecto (string cuando espero number)
- [ ] Arrays vacíos
- [ ] Arrays con 1 elemento
- [ ] Arrays muy grandes (> 100 elementos)
- [ ] Valores límite (0, negativos, muy grandes)
- [ ] Caracteres especiales (emoji, tildes, ñ)
- [ ] SQL injection attempts (si hay backend)
- [ ] XSS attempts (<script>alert('xss')</script>)

### Estado de la aplicación
- [ ] Primera vez que se usa (sin datos)
- [ ] Después de usar mucho tiempo (mucha data)
- [ ] Después de error (estado inconsistente)
- [ ] Múltiples tabs abiertas (sync issues)
- [ ] Navegación con botón back/forward

### Red/Performance
- [ ] Sin conexión (offline)
- [ ] Conexión lenta (throttle 3G)
- [ ] Timeout de request
- [ ] Respuestas inesperadas del servidor

### Usuario
- [ ] Usuario hace click múltiples veces (double submit)
- [ ] Usuario cancela operación a medias
- [ ] Usuario ingresa datos en orden raro
- [ ] Usuario usa solo teclado (sin mouse)
```

---

### Paso 6: Especificar validaciones (20-30 min)

#### 6.1 Tipos de validaciones

```markdown
## Validaciones para US-002: Crear Cuenta

### Frontend (validaciones inmediatas, UX)
```javascript
// Validar mientras el usuario escribe
function validateAccountName(name) {
  if (!name || name.trim() === '') {
    return { valid: false, error: 'El nombre es requerido' };
  }

  if (name.length < 3) {
    return { valid: false, error: 'El nombre debe tener al menos 3 caracteres' };
  }

  if (name.length > 50) {
    return { valid: false, error: 'El nombre no puede exceder 50 caracteres' };
  }

  return { valid: true };
}

function validateBalance(balance) {
  if (balance === null || balance === undefined || balance === '') {
    return { valid: false, error: 'El balance es requerido' };
  }

  const numBalance = Number(balance);

  if (isNaN(numBalance)) {
    return { valid: false, error: 'El balance debe ser un número' };
  }

  if (numBalance < 0) {
    return { valid: false, error: 'El balance no puede ser negativo' };
  }

  return { valid: true };
}

function validateType(type) {
  const validTypes = ['ahorro', 'corriente', 'inversion'];

  if (!validTypes.includes(type)) {
    return { valid: false, error: 'Tipo de cuenta inválido' };
  }

  return { valid: true };
}
```

### Backend (validaciones definitivas, seguridad)
```javascript
// AccountService.create()
function validateAccountData(data) {
  const errors = [];

  // Name
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required and must be a string');
  } else if (data.name.trim().length < 3 || data.name.length > 50) {
    errors.push('Name must be between 3 and 50 characters');
  }

  // Type
  const validTypes = ['ahorro', 'corriente', 'inversion'];
  if (!validTypes.includes(data.type)) {
    errors.push('Type must be one of: ahorro, corriente, inversion');
  }

  // Balance
  if (typeof data.balance !== 'number' || isNaN(data.balance)) {
    errors.push('Balance must be a number');
  } else if (data.balance < 0) {
    errors.push('Balance cannot be negative');
  }

  // Currency (opcional)
  if (data.currency && typeof data.currency !== 'string') {
    errors.push('Currency must be a string');
  }

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
}
```

### Cuándo y dónde validar
| Validación | Frontend | Backend | Razón |
|------------|----------|---------|-------|
| Formato (email, phone) | ✅ | ✅ | UX + Seguridad |
| Requeridos | ✅ | ✅ | UX + Seguridad |
| Límites (min/max) | ✅ | ✅ | UX + Seguridad |
| Reglas de negocio | ⚠️ | ✅ | Backend definitivo |
| Existencia (unique) | ⚠️ | ✅ | Solo backend sabe |
| SQL injection | ❌ | ✅ | Solo backend |

**Regla:** SIEMPRE validar en backend, frontend es solo para UX
```

---

## 🎯 Aplicación a tu Proyecto

### Ejercicio Práctico: Analizar US-010 (Filtrar transacciones)

```markdown
# US-010: Filtrar transacciones por tipo

## User Story
Como usuario
Quiero filtrar las transacciones por tipo (depósito, retiro, transferencia)
Para poder ver solo el tipo de transacción que me interesa

## Criterios de Aceptación

### Escenario 1: Filtrar por tipo
Dado que tengo 10 transacciones (5 depósitos, 3 retiros, 2 transferencias)
Cuando selecciono filtro "Depósito"
Entonces veo solo las 5 transacciones de tipo depósito

### Escenario 2: Mostrar todas (sin filtro)
Dado que he aplicado un filtro
Cuando selecciono "Todas"
Entonces veo todas las transacciones sin filtrar

### Escenario 3: Sin resultados
Dado que no tengo transacciones de tipo "Transferencia"
Cuando filtro por "Transferencia"
Entonces veo mensaje "No hay transacciones de este tipo"

## Flujo Principal
1. Usuario está en /transacciones viendo todas las transacciones
2. Usuario ve dropdown "Tipo: [Todas ▼]"
3. Usuario click en dropdown
4. Ve opciones: Todas, Depósito, Retiro, Transferencia
5. Usuario selecciona "Depósito"
6. Sistema filtra array: transactions.filter(t => t.type === 'deposito')
7. Sistema re-renderiza tabla con resultados filtrados
8. Usuario ve solo depósitos

## Wireframe
```
┌──────────────────────────────────────────┐
│  Mis Transacciones                       │
│                                          │
│  Tipo: [Todas ▼]                        │
│       ┌─────────┐                        │
│       │ Todas   │ ← seleccionado        │
│       │ Depósito│                        │
│       │ Retiro  │                        │
│       │Transfer.│                        │
│       └─────────┘                        │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ Cuenta │ Tipo │ Monto │ Fecha    │  │
│  ├────────────────────────────────────┤  │
│  │ Ahorro │ Dep. │ $100  │ 20/03/26 │  │
│  │ Corr.  │ Dep. │ $500  │ 19/03/26 │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

## Reglas de Negocio
- RN-010: Filtro persiste durante sesión (no reset en reload)
  **Implementación:** Guardar en localStorage

## Validaciones
- Frontend: Verificar que tipo seleccionado es válido
- Backend: Ninguna (solo filtrado client-side)

## Casos Edge
- Array vacío (sin transacciones) → Empty state normal
- Filtro sin resultados → "No hay transacciones de tipo X"
- Cambiar filtro múltiples veces → Performance OK (< 100ms)

## Datos
### Input:
- transactions: Transaction[]
- filterType: 'todos' | 'deposito' | 'retiro' | 'transferencia'

### Output:
- filteredTransactions: Transaction[]

## Estimación
- Crear dropdown component: 30 min
- Lógica de filtrado: 20 min
- Integración con TransactionsPage: 30 min
- Estado vacío de filtro: 15 min
- Testing: 20 min
**Total: 2 horas ≈ 2 pts**
```

---

## 🎯 Entregables de la Fase 2

Por cada User Story analizar, debes tener:

### Documentos creados:
- [x] docs/user-stories/US-XXX.md (completo)
- [x] Criterios de aceptación (mínimo 3 escenarios)
- [x] Flujo principal documentado
- [x] Flujos alternativos identificados
- [x] Wireframes (low-fidelity mínimo)
- [x] Reglas de negocio listadas
- [x] Validaciones especificadas
- [x] Casos edge identificados
- [x] Estimación detallada por tarea

### Claridad alcanzada:
- [x] Sabes exactamente qué construir
- [x] Sabes cómo se verá (wireframe)
- [x] Sabes qué puede salir mal (edge cases)
- [x] Sabes cómo validar (criterios de aceptación)
- [x] Puedes estimar con confianza

---

## 🚦 Criterios de Salida (para avanzar a Fase 3)

Una User Story está lista para diseño cuando:

- [x] Criterios de aceptación son claros y testeables
- [x] Todos los flujos (principal + alternativos) documentados
- [x] Wireframe existe (aunque sea ASCII art)
- [x] Casos edge principales identificados
- [x] Validaciones especificadas (frontend + backend)
- [x] Reglas de negocio documentadas
- [x] No hay preguntas abiertas críticas
- [x] Estimación de esfuerzo realizada

---

## 💡 Tips para Análisis Efectivo

### Tip 1: Usa el template consistentemente
Don't reinvent the wheel para cada US. Usa el mismo template siempre.

### Tip 2: Piensa en negativos
No solo "¿qué pasa si funciona?", también "¿qué puede salir mal?"

### Tip 3: Colabora si es posible
Si tienes acceso a usuarios reales, muéstrales wireframes y valida supuestos.

### Tip 4: Timebox el análisis
No más de 3 horas por User Story promedio. Si toma más, probablemente la US es muy grande (dividir).

### Tip 5: El 80/20
Enfócate en los casos más probables. No necesitas documentar 100 edge cases, solo los críticos.

---

## 📚 Checklist Final de la Fase 2

```markdown
## Fase 2: Análisis de Requisitos - Checklist

### Por cada User Story del sprint:
- [ ] US completa con formato estándar
- [ ] Criterios de aceptación (mínimo 3)
- [ ] Flujo principal documentado paso a paso
- [ ] Flujos alternativos identificados
- [ ] Wireframe/mockup creado
- [ ] Reglas de negocio listadas
- [ ] Validaciones especificadas
- [ ] Casos edge top 10 identificados
- [ ] Datos de entrada/salida definidos
- [ ] Estimación de esfuerzo por tarea
- [ ] Definition of Done específica
- [ ] Sin preguntas críticas abiertas

### General:
- [ ] Todas las US del próximo sprint analizadas
- [ ] Documentos guardados en docs/user-stories/
- [ ] Claridad suficiente para empezar diseño
- [ ] Equipo/yo entiende qué construir

---

**Tiempo invertido en Fase 2:** ___ horas
**Número de US analizadas:** ___
**Promedio por US:** ___ horas
**Próximo paso:** Fase 3 - Diseño Arquitectónico
```

---

## 🎬 Conclusión de la Fase 2

### ¿Qué lograste?
- ✅ Especificaciones detalladas por US
- ✅ Claridad de qué construir exactamente
- ✅ Criterios claros de éxito (acceptance criteria)
- ✅ Identificación de riesgos (edge cases)
- ✅ Wireframes para guiar implementación

### ¿Qué tienes ahora?
Un **blueprint detallado** para cada funcionalidad:
- Sabes qué construir
- Sabes cómo se ve
- Sabes qué validar
- Sabes cuándo está done

### Siguiente paso:
➡️ **Fase 3: Diseño Arquitectónico** (CÓMO construir - arquitectura, datos, componentes)

---

**Recuerda:**
> "Horas de análisis ahorran días de refactorización."
> "Si no puedes especificar cómo validarlo, no está listo para construir."
