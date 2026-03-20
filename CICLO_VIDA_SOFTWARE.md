# Ciclo de Vida del Software - Guía Completa
## Gestión Bancaria - Metodología Profesional

---

## 📖 Índice

1. [Fase 0: Concepción](#fase-0-concepción)
2. [Fase 1: Planificación](#fase-1-planificación)
3. [Fase 2: Análisis de Requisitos](#fase-2-análisis-de-requisitos)
4. [Fase 3: Diseño Arquitectónico](#fase-3-diseño-arquitectónico)
5. [Fase 4: Desarrollo Iterativo](#fase-4-desarrollo-iterativo)
6. [Fase 5: Pruebas](#fase-5-pruebas)
7. [Fase 6: Documentación](#fase-6-documentación)
8. [Fase 7: Despliegue](#fase-7-despliegue)
9. [Fase 8: Mantenimiento](#fase-8-mantenimiento)
10. [Herramientas y Templates](#herramientas-y-templates)

---

## Fase 0: Concepción
**Duración:** 1-2 días
**Objetivo:** Definir la visión del proyecto

### 0.1 Definir el problema
- [ ] ¿Qué problema estoy resolviendo?
- [ ] ¿Quién es el usuario final?
- [ ] ¿Qué soluciones existen actualmente?
- [ ] ¿Por qué crear una nueva solución?

**Para este proyecto:**
```
Problema: Gestionar cuentas bancarias personales y transacciones
Usuario: Persona que quiere llevar control de sus finanzas
Soluciones existentes: Apps bancarias, Excel, aplicaciones de finanzas
Por qué: Aprendizaje, personalización, control total de los datos
```

### 0.2 Definir el alcance general
- [ ] MVP (Producto Mínimo Viable): ¿qué DEBE tener?
- [ ] Funcionalidades deseables (para versión 2.0)
- [ ] Funcionalidades fuera de alcance

**Documento:** `VISION.md`
```markdown
## MVP (v1.0)
- Gestión de cuentas (CRUD)
- Registro de transacciones (depósito, retiro, transferencia)
- Visualización de transacciones
- Cálculo de balance

## v2.0 (futuro)
- Categorización de gastos
- Reportes y gráficas
- Exportación de datos
- Múltiples usuarios

## Fuera de alcance
- Conexión con bancos reales
- Pagos automáticos
- Aplicación móvil nativa
```

### 0.3 Tecnologías base
- [ ] Frontend: ¿Qué framework/librería?
- [ ] Backend: ¿API? ¿Base de datos?
- [ ] Hosting: ¿Dónde se desplegará?

---

## Fase 1: Planificación
**Duración:** 2-3 días
**Objetivo:** Roadmap y cronograma

### 1.1 Crear Product Backlog
Lista de todas las funcionalidades y tareas del proyecto.

**Documento:** `BACKLOG.md`

```markdown
# Product Backlog - Gestión Bancaria

## Épicas (grandes bloques de funcionalidad)
1. Gestión de Cuentas
2. Gestión de Transacciones
3. Dashboard y Reportes
4. Configuración y Preferencias

## Epic 1: Gestión de Cuentas
- [ ] US-001: Ver lista de cuentas
- [ ] US-002: Crear nueva cuenta
- [ ] US-003: Editar cuenta existente
- [ ] US-004: Eliminar cuenta
- [ ] US-005: Ver detalle de cuenta individual

## Epic 2: Gestión de Transacciones
- [ ] US-006: Ver lista de transacciones
- [ ] US-007: Realizar depósito
- [ ] US-008: Realizar retiro
- [ ] US-009: Realizar transferencia entre cuentas
- [ ] US-010: Filtrar transacciones
- [ ] US-011: Buscar transacciones
```

### 1.2 Priorización (Método MoSCoW)
Para cada funcionalidad, clasificar:

- **Must Have** (Debe tener): Sin esto, el proyecto no funciona
- **Should Have** (Debería tener): Importante pero no crítico
- **Could Have** (Podría tener): Deseable si hay tiempo
- **Won't Have** (No tendrá): Fuera del alcance actual

**Ejemplo:**
```
US-001: Ver lista de cuentas → MUST HAVE
US-010: Filtrar transacciones → SHOULD HAVE
US-011: Búsqueda avanzada → COULD HAVE
```

### 1.3 Dividir en Sprints/Iteraciones
Sprints de 1-2 semanas recomendados.

**Documento:** `SPRINTS.md`

```markdown
# Sprint 1 (Semana 1-2): Fundación
- Setup del proyecto
- Arquitectura base
- Gestión de cuentas CRUD básico

# Sprint 2 (Semana 3-4): Transacciones Básicas
- Depósitos
- Retiros
- Visualización de transacciones

# Sprint 3 (Semana 5-6): Transacciones Avanzadas
- Transferencias entre cuentas
- Validaciones robustas
- Manejo de errores mejorado

# Sprint 4 (Semana 7-8): Polish y Features
- Filtros y búsqueda
- Mejoras de UI/UX
- Testing y bug fixes
```

### 1.4 Definir Definition of Done (DoD)
¿Cuándo una tarea está realmente terminada?

**Documento:** `DEFINITION_OF_DONE.md`

```markdown
# Definition of Done

Una funcionalidad está COMPLETA cuando:

## Código
- [ ] Implementado según los requisitos
- [ ] Código revisado (auto-review o peer review)
- [ ] Sin errores en consola
- [ ] Sin warnings importantes
- [ ] Sigue las convenciones del proyecto

## Funcionalidad
- [ ] Funciona el flujo happy path
- [ ] Maneja errores correctamente
- [ ] Validaciones implementadas
- [ ] Casos edge considerados
- [ ] UI responsive (si aplica)

## Pruebas
- [ ] Probado manualmente en navegador
- [ ] Probado en diferentes escenarios
- [ ] No rompe funcionalidades existentes

## Documentación
- [ ] Código comentado (solo partes complejas)
- [ ] README actualizado (si aplica)
- [ ] CHANGELOG.md actualizado

## Control de versión
- [ ] Commit realizado con mensaje claro
- [ ] Branch mergeado (si aplica)
```

---

## Fase 2: Análisis de Requisitos
**Duración:** Variable por funcionalidad
**Objetivo:** Especificar QUÉ construir

### 2.1 User Stories
Para cada funcionalidad, escribir:

```
Como [tipo de usuario]
Quiero [acción/funcionalidad]
Para [beneficio/objetivo]
```

**Documento:** `USER_STORIES.md`

**Ejemplo:**
```markdown
## US-001: Ver lista de cuentas

Como usuario de la aplicación
Quiero ver una lista de todas mis cuentas bancarias
Para tener una visión general de mis finanzas

### Criterios de Aceptación
- [ ] Se muestran todas las cuentas en una tabla
- [ ] Cada cuenta muestra: nombre, tipo, balance
- [ ] Si no hay cuentas, muestra mensaje apropiado
- [ ] Carga rápida (< 2 segundos)

### Casos de Uso
1. Usuario con múltiples cuentas → ve tabla completa
2. Usuario sin cuentas → ve mensaje "No tienes cuentas"
3. Error de carga → ve mensaje de error claro
```

### 2.2 Análisis funcional detallado

Para cada User Story, responder:

```markdown
## Flujo Principal
1. Usuario navega a /cuentas
2. Sistema carga datos de db.json
3. Sistema renderiza tabla con cuentas
4. Usuario ve información actualizada

## Flujos Alternativos
- Si no hay cuentas → mostrar mensaje + botón "Crear cuenta"
- Si hay error de red → mostrar error + botón "Reintentar"
- Si hay demasiadas cuentas → implementar paginación (v2.0)

## Reglas de Negocio
- Balance no puede ser negativo
- Nombre de cuenta es obligatorio
- Tipos de cuenta: ahorro, corriente, inversión

## Validaciones
- accountId: requerido, numérico
- name: requerido, min 3 caracteres
- type: debe ser uno de los tipos permitidos
- balance: número, >= 0

## Datos de entrada/salida
Input: ninguno (lectura desde db.json)
Output: Array de objetos Account
```

### 2.3 Mockups y wireframes
No es necesario usar herramientas complejas. ASCII art o papel funcionan:

```
┌─────────────────────────────────────────────┐
│  Mis Cuentas                    [+ Nueva]  │
├─────────────────────────────────────────────┤
│ Nombre      │ Tipo     │ Balance           │
├─────────────────────────────────────────────┤
│ Ahorro      │ Ahorro   │ $1,234.56        │
│ Corriente   │ Corriente│ $5,678.90        │
│ Inversión   │ Inversión│ $10,000.00       │
└─────────────────────────────────────────────┘
```

**Herramienta recomendada:** Excalidraw, papel y lápiz, o ASCII art

---

## Fase 3: Diseño Arquitectónico
**Duración:** 2-4 días (inicio del proyecto) o 1-2 horas (por funcionalidad)
**Objetivo:** Definir CÓMO construir

### 3.1 Arquitectura general del proyecto (solo una vez)

**Documento:** `ARCHITECTURE.md`

```markdown
# Arquitectura del Proyecto

## Patrón Arquitectónico
**Patrón:** Separación en capas (Layered Architecture)

```
┌─────────────────────────────────┐
│         Presentación            │  ← Pages, Components
├─────────────────────────────────┤
│      Lógica de Negocio          │  ← Services
├─────────────────────────────────┤
│      Acceso a Datos             │  ← Repositories (API/db.json)
├─────────────────────────────────┤
│          Utilidades             │  ← Utils, Helpers
└─────────────────────────────────┘
```

## Estructura de Carpetas
```
src/
├── components/       # Componentes reutilizables
│   ├── Table/
│   ├── Button/
│   └── Modal/
├── pages/           # Páginas de la aplicación
│   ├── Accounts/
│   ├── Transactions/
│   └── Dashboard/
├── services/        # Lógica de negocio
│   ├── accountService.js
│   └── transactionService.js
├── repositories/    # Acceso a datos (futuro)
│   └── apiRepository.js
├── utils/           # Funciones auxiliares
│   ├── formatter.js
│   └── validator.js
├── router.js        # Navegación
└── main.js          # Entry point
```

## Convenciones de Código
- Archivos: PascalCase para componentes, camelCase para servicios
- Variables: camelCase
- Constantes: UPPER_SNAKE_CASE
- Funciones privadas: prefijo _
- Async functions: siempre usar async/await, no .then()
```

### 3.2 Diseño de datos

**Documento:** `DATA_MODEL.md`

```markdown
# Modelo de Datos

## Entidades

### Account (Cuenta)
```json
{
  "id": "string (UUID)",
  "name": "string",
  "type": "ahorro" | "corriente" | "inversion",
  "balance": "number (>= 0)",
  "currency": "string (default: MXN)",
  "createdAt": "ISO Date string",
  "updatedAt": "ISO Date string"
}
```

**Validaciones:**
- id: UUID v4, único, generado automáticamente
- name: requerido, 3-50 caracteres
- type: enum estricto
- balance: número, no negativo
- currency: código ISO 4217 (3 letras)

### Transaction (Transacción)
```json
{
  "id": "string (UUID)",
  "accountId": "string (FK a Account.id)",
  "toAccountId": "string | null (para transferencias)",
  "type": "deposito" | "retiro" | "transferencia",
  "amount": "number (> 0)",
  "description": "string",
  "date": "ISO Date string",
  "status": "completada" | "pendiente" | "fallida"
}
```

**Validaciones:**
- amount: siempre positivo (no negativos)
- type:
  - deposito: toAccountId debe ser null
  - retiro: toAccountId debe ser null
  - transferencia: toAccountId requerido
- accountId: debe existir en cuentas
- toAccountId: si existe, debe ser diferente a accountId

## Relaciones
```
Account 1 ----< ∞ Transaction (accountId)
Account 1 ----< ∞ Transaction (toAccountId, solo transferencias)
```

## Reglas de Negocio Críticas
1. El balance de una cuenta NUNCA puede ser negativo
2. Una transferencia debe actualizar 2 cuentas atómicamente
3. Los montos siempre son positivos (el tipo indica si suma o resta)
4. No se pueden eliminar cuentas con transacciones asociadas (o cascade)
```

### 3.3 Diseño de la API/Servicios

**Documento:** `API_DESIGN.md`

```markdown
# Diseño de Servicios

## AccountService

### getAll()
**Propósito:** Obtener todas las cuentas
**Input:** ninguno
**Output:** Promise<Account[]>
**Errores:** NetworkError, ParseError

### getById(id)
**Propósito:** Obtener cuenta por ID
**Input:** id (string)
**Output:** Promise<Account>
**Errores:** NotFoundError, NetworkError

### create(accountData)
**Propósito:** Crear nueva cuenta
**Input:** { name, type, balance, currency }
**Output:** Promise<Account>
**Validaciones:**
  - name no vacío
  - type válido
  - balance >= 0
**Errores:** ValidationError, NetworkError

### update(id, accountData)
**Propósito:** Actualizar cuenta existente
**Input:** id (string), { name?, type?, currency? }
**Output:** Promise<Account>
**Nota:** No se puede actualizar balance directamente (solo via transacciones)
**Errores:** NotFoundError, ValidationError

### delete(id)
**Propósito:** Eliminar cuenta
**Input:** id (string)
**Output:** Promise<void>
**Validaciones:**
  - Cuenta no debe tener transacciones (o cascade delete)
**Errores:** NotFoundError, BusinessRuleError

### getBalance(id)
**Propósito:** Calcular balance actual de una cuenta
**Input:** id (string)
**Output:** Promise<number>
**Lógica:**
  - Balance inicial + suma de transacciones

## TransactionService

### getAll()
**Propósito:** Obtener todas las transacciones
**Output:** Promise<Transaction[]>
**Ordenamiento:** Por fecha DESC (más recientes primero)

### getByAccountId(accountId)
**Propósito:** Obtener transacciones de una cuenta
**Input:** accountId (string)
**Output:** Promise<Transaction[]>

### create(transactionData)
**Propósito:** Registrar nueva transacción
**Input:** { accountId, type, amount, description, toAccountId? }
**Output:** Promise<Transaction>
**Lógica:**
  1. Validar datos
  2. Verificar saldo suficiente (retiro/transferencia)
  3. Crear transacción
  4. Actualizar balance(s) de cuenta(s)
**Errores:** ValidationError, InsufficientFundsError

### deposit(accountId, amount, description)
**Propósito:** Realizar depósito
**Lógica:** create() con type="deposito"

### withdraw(accountId, amount, description)
**Propósito:** Realizar retiro
**Validaciones adicionales:**
  - Verificar saldo suficiente
**Errores:** InsufficientFundsError

### transfer(fromAccountId, toAccountId, amount, description)
**Propósito:** Transferir entre cuentas
**Lógica:**
  1. Validar que ambas cuentas existen
  2. Verificar saldo suficiente en origen
  3. Restar de cuenta origen
  4. Sumar a cuenta destino
  5. Registrar transacción
**Nota:** Debe ser atómico (todo o nada)

### filterByType(type)
### filterByDateRange(from, to)
### search(query)
```

### 3.4 Diseño de componentes UI

**Documento:** `COMPONENTS.md`

```markdown
# Catálogo de Componentes

## Componentes Base (Atómicos)

### Button
**Propósito:** Botón reutilizable
**Props:**
  - label: string
  - onClick: function
  - variant: 'primary' | 'secondary' | 'danger'
  - disabled: boolean
**Archivo:** src/components/Button/Button.js

### Input
**Propósito:** Campo de entrada reutilizable
**Props:**
  - name: string
  - type: 'text' | 'number' | 'date'
  - value: string
  - placeholder: string
  - onChange: function
  - error: string (mensaje de error)

### Table
**Propósito:** Tabla de datos genérica
**Props:**
  - columns: Array<Column>
  - data: Array<Object>
  - emptyMessage: string
**Archivo:** src/components/Table/Table.js (✅ existe)

## Componentes Compuestos

### AccountForm
**Propósito:** Formulario crear/editar cuenta
**Props:**
  - initialData: Account | null
  - onSubmit: function
  - onCancel: function

### TransactionForm
**Propósito:** Formulario para transacciones
**Props:**
  - accounts: Account[] (para select)
  - type: 'deposito' | 'retiro' | 'transferencia'
  - onSubmit: function

### Modal
**Propósito:** Ventana modal genérica
**Props:**
  - title: string
  - content: HTMLElement | string
  - onClose: function

## Páginas

### AccountsPage
**Ruta:** /cuentas
**Componentes usados:** Table, Button, Modal
**Servicios usados:** AccountService

### TransactionsPage (✅ existe)
**Ruta:** /transacciones
**Componentes usados:** Table
**Servicios usados:** TransactionService

### DashboardPage
**Ruta:** / (home)
**Componentes usados:** Card, Chart (futuro)
**Servicios usados:** AccountService, TransactionService
```

### 3.5 Diagrama de flujo de datos

```
Usuario
   ↓
[Page Component]
   ↓
[Service Layer] ← Validaciones, lógica de negocio
   ↓
[Repository/API] ← Acceso a datos (db.json)
   ↓
[db.json / Backend]
```

---

## Fase 4: Desarrollo Iterativo
**Duración:** Variable
**Objetivo:** Construir el software incrementalmente

### 4.1 Antes de cada sesión de código

**Checklist de inicio:**
```
[ ] ¿Qué funcionalidad voy a implementar HOY?
[ ] ¿Revisé los documentos de diseño?
[ ] ¿Tengo claros los requisitos?
[ ] ¿Cuál es mi Definition of Done para esta tarea?
[ ] ¿Tengo el entorno listo? (dependencias instaladas, servidor corriendo)
```

### 4.2 Desarrollo de una funcionalidad (TDD-style)

#### Paso 1: Red (Rojo) - Define el comportamiento
```javascript
// Antes de escribir código, escribe lo que DEBERÍA pasar

// Ejemplo en comentarios o pseudocódigo:
// TransactionService.deposit(accountId, 100)
//   → debe incrementar el balance en 100
//   → debe crear una transacción tipo "deposito"
//   → debe retornar la transacción creada
//   → si accountId no existe, debe lanzar NotFoundError
//   → si amount <= 0, debe lanzar ValidationError
```

#### Paso 2: Green (Verde) - Implementa lo mínimo
```javascript
// Implementación simple que cumpla los requisitos
async deposit(accountId, amount, description) {
  // Validar
  if (amount <= 0) throw new Error('Amount must be positive');

  // Obtener cuenta
  const account = await this.getById(accountId);
  if (!account) throw new Error('Account not found');

  // Crear transacción
  const transaction = {
    id: crypto.randomUUID(),
    accountId,
    type: 'deposito',
    amount,
    description,
    date: new Date().toISOString()
  };

  // Guardar y actualizar balance
  // ... implementación

  return transaction;
}
```

#### Paso 3: Refactor (Refactorizar) - Mejora el código
```javascript
// Extraer validaciones, mejorar nombres, eliminar duplicación
async deposit(accountId, amount, description) {
  this._validateAmount(amount);
  const account = await this._getAccountOrThrow(accountId);

  const transaction = this._createTransactionObject({
    accountId,
    type: TRANSACTION_TYPES.DEPOSIT,
    amount,
    description
  });

  await this._saveTransactionAndUpdateBalance(transaction, account);

  return transaction;
}
```

### 4.3 Ciclo de desarrollo TDD adaptado

```markdown
## Por cada funcionalidad:

1. **Escribir especificación** (5 min)
   - En comentarios o documento separado
   - Qué debe hacer la función
   - Qué entradas acepta
   - Qué salidas produce
   - Qué errores puede lanzar

2. **Implementar lo básico** (20-40 min)
   - Código que cumpla el happy path
   - Sin optimizaciones prematuras
   - Sin casos edge todavía

3. **Probar manualmente** (5 min)
   - Correr en navegador
   - Verificar que funciona el caso básico

4. **Agregar manejo de errores** (10-15 min)
   - Validaciones de entrada
   - Try-catch donde sea necesario
   - Mensajes de error claros

5. **Probar casos edge** (10 min)
   - Datos inválidos
   - Datos vacíos
   - Casos límite

6. **Refactorizar** (10-15 min)
   - Extraer código duplicado
   - Mejorar nombres
   - Simplificar lógica compleja

7. **Commit** (2 min)
   ```bash
   git add <archivos-específicos>
   git commit -m "Add deposit functionality to TransactionService"
   ```
```

### 4.4 Desarrollo incremental

No intentes construir todo de una vez. Incrementos sugeridos:

```markdown
## Ejemplo: Implementar página de Transacciones

### Incremento 1: Estructura básica (30 min)
- [ ] Crear archivo TransactionsPage.js
- [ ] Implementar render() con HTML estático
- [ ] Agregar ruta al router
- [ ] Verificar que la página carga
- ✅ Commit: "Add TransactionsPage with basic structure"

### Incremento 2: Cargar datos (45 min)
- [ ] Implementar _loadTransactions()
- [ ] Llamar a TransactionService.getAll()
- [ ] Renderizar datos en tabla
- [ ] Mostrar mensaje de carga
- ✅ Commit: "Load and display transactions in TransactionsPage"

### Incremento 3: Manejo de errores (20 min)
- [ ] Try-catch en _loadTransactions
- [ ] Mensaje de error amigable
- [ ] Botón de reintentar
- ✅ Commit: "Add error handling to TransactionsPage"

### Incremento 4: Estado vacío (15 min)
- [ ] Mensaje cuando no hay transacciones
- [ ] Sugerencia de acción
- ✅ Commit: "Add empty state message to TransactionsPage"

### Incremento 5: Mejoras UX (30 min)
- [ ] Formato de fechas
- [ ] Formato de montos
- [ ] Colores según tipo de transacción
- ✅ Commit: "Improve UX with formatting and colors"
```

### 4.5 Branch strategy

```markdown
# Estrategia de Branches

## Para proyectos individuales:
- `main`: código estable y funcional
- `feature/nombre-funcionalidad`: desarrollo de features
- `fix/nombre-bug`: corrección de bugs

## Flujo de trabajo:
1. Crear branch desde main: `git checkout -b feature/filtros-transacciones`
2. Desarrollar en commits pequeños
3. Cuando esté completo, merge a main: `git checkout main && git merge feature/filtros-transacciones`
4. Opcional: eliminar branch: `git branch -d feature/filtros-transacciones`

## Para proyectos colaborativos:
- `main`: producción
- `develop`: integración
- `feature/*`: nuevas funcionalidades
- `release/*`: preparación de releases
- `hotfix/*`: fixes urgentes en producción
```

---

## Fase 5: Pruebas
**Duración:** 20-30% del tiempo de desarrollo
**Objetivo:** Garantizar calidad

### 5.1 Niveles de pruebas

```markdown
# Estrategia de Pruebas

## 1. Pruebas Unitarias (Unit Tests)
**Qué probar:** Funciones individuales, métodos de servicios
**Herramientas sugeridas:** Jest, Vitest

### Ejemplo:
```javascript
// tests/services/accountService.test.js
describe('AccountService', () => {
  describe('create', () => {
    it('should create account with valid data', async () => {
      const account = await AccountService.create({
        name: 'Test Account',
        type: 'ahorro',
        balance: 1000
      });

      expect(account.id).toBeDefined();
      expect(account.name).toBe('Test Account');
      expect(account.balance).toBe(1000);
    });

    it('should throw error if balance is negative', async () => {
      await expect(
        AccountService.create({ name: 'Test', type: 'ahorro', balance: -100 })
      ).rejects.toThrow('Balance cannot be negative');
    });
  });
});
```

## 2. Pruebas de Integración
**Qué probar:** Flujos completos entre capas

### Ejemplo:
```javascript
// tests/integration/transaction-flow.test.js
describe('Transaction Flow', () => {
  it('should complete deposit flow', async () => {
    // 1. Crear cuenta
    const account = await AccountService.create({...});

    // 2. Hacer depósito
    const transaction = await TransactionService.deposit(account.id, 100);

    // 3. Verificar que el balance se actualizó
    const updatedAccount = await AccountService.getById(account.id);
    expect(updatedAccount.balance).toBe(initialBalance + 100);
  });
});
```

## 3. Pruebas E2E (End-to-End)
**Qué probar:** Flujos completos desde perspectiva del usuario
**Herramientas:** Playwright, Cypress

### Ejemplo:
```javascript
test('user can create account and make deposit', async ({ page }) => {
  // 1. Navegar a cuentas
  await page.goto('/cuentas');

  // 2. Crear cuenta
  await page.click('button:has-text("Nueva Cuenta")');
  await page.fill('#account-name', 'Mi Ahorro');
  await page.selectOption('#account-type', 'ahorro');
  await page.click('button:has-text("Guardar")');

  // 3. Verificar que aparece en la lista
  await expect(page.locator('text=Mi Ahorro')).toBeVisible();
});
```

## 4. Pruebas Manuales
**Qué probar:** UX, casos edge, exploratory testing

### Checklist de pruebas manuales:
- [ ] Navegación entre páginas funciona
- [ ] Formularios validan correctamente
- [ ] Mensajes de error son claros
- [ ] Loading states se muestran
- [ ] Responsive en móvil
- [ ] Sin errores en consola
- [ ] Performance aceptable (< 3 seg carga)
```

### 5.2 Matriz de pruebas por funcionalidad

**Documento:** `TEST_MATRIX.md`

```markdown
# Matriz de Pruebas

## Funcionalidad: Crear Cuenta

| Caso de Prueba | Input | Output Esperado | Tipo |
|----------------|-------|-----------------|------|
| Datos válidos | {name: "Ahorro", type: "ahorro", balance: 1000} | Cuenta creada | Manual |
| Nombre vacío | {name: "", type: "ahorro", balance: 1000} | ValidationError | Unit |
| Balance negativo | {name: "Test", type: "ahorro", balance: -100} | ValidationError | Unit |
| Tipo inválido | {name: "Test", type: "invalido", balance: 100} | ValidationError | Unit |
| Duplicate name | {name: "Existente", ...} | OK o Warning | Manual |

## Funcionalidad: Realizar Depósito

| Caso de Prueba | Input | Output Esperado | Tipo |
|----------------|-------|-----------------|------|
| Depósito válido | accountId: "123", amount: 100 | Balance +100, transacción creada | Integration |
| Cuenta inexistente | accountId: "999", amount: 100 | NotFoundError | Unit |
| Monto cero | accountId: "123", amount: 0 | ValidationError | Unit |
| Monto negativo | accountId: "123", amount: -50 | ValidationError | Unit |
```

### 5.3 Testing workflow

```markdown
## Flujo de Pruebas Recomendado

### Durante el desarrollo:
1. Escribir función/componente
2. Probar manualmente en navegador (desarrollo iterativo)
3. Ajustar según resultados
4. Repetir hasta que funcione

### Antes de commit:
1. Verificar que no hay errores en consola
2. Probar happy path
3. Probar al menos 2 casos edge
4. Commit si todo pasa

### Antes de merge a main:
1. Probar todos los flujos de la funcionalidad
2. Verificar que no rompió funcionalidades existentes (regression)
3. Revisar código (auto-review)
4. Merge

### Periódicamente (semanal):
1. Testing exploratorio (usar la app como usuario)
2. Verificar performance
3. Limpiar código y refactorizar
```

---

## Fase 6: Documentación
**Duración:** Continuo (10-15% del tiempo)
**Objetivo:** Mantener documentación actualizada

### 6.1 Tipos de documentación

```markdown
# Documentación del Proyecto

## 1. README.md (Para usuarios/desarrolladores nuevos)
### Debe contener:
- Descripción del proyecto
- Cómo instalar
- Cómo ejecutar
- Estructura del proyecto
- Tecnologías usadas

## 2. CHANGELOG.md (Historial de cambios)
### Formato:
```markdown
# Changelog

## [1.2.0] - 2026-03-20

### Added
- Filtros de transacciones por tipo
- Búsqueda de transacciones por descripción

### Fixed
- Error al cargar transacciones sin fecha
- Validación de montos negativos

### Changed
- Mejorado rendimiento de carga de transacciones

## [1.1.0] - 2026-03-15
...
```

## 3. CONTRIBUTING.md (Para colaboradores)
### Debe contener:
- Cómo contribuir
- Convenciones de código
- Proceso de pull requests
- Definition of Done

## 4. API.md o SERVICES.md (Documentación técnica)
### Debe contener:
- Lista de servicios disponibles
- Métodos y sus parámetros
- Ejemplos de uso
- Errores posibles

## 5. Comentarios en código
### Cuándo comentar:
- Lógica compleja o no obvia
- Decisiones arquitectónicas importantes
- Workarounds temporales (con TODO)
- Cálculos matemáticos complejos

### Cuándo NO comentar:
- Código auto-explicativo
- Obviedades (// incrementa contador)
- Paráfrasis del código
```

### 6.2 Documentación continua

**Durante el desarrollo:**
- Actualizar CHANGELOG.md con cada funcionalidad completada
- Escribir comentarios en código complejo al momento de escribirlo
- Actualizar README.md si cambia setup o estructura

**Al finalizar sprint:**
- Revisar y actualizar toda la documentación
- Agregar ejemplos de uso para funcionalidades nuevas
- Actualizar diagramas si la arquitectura cambió

---

## Fase 7: Despliegue
**Duración:** Variable (setup inicial 1-2 días, luego minutos)
**Objetivo:** Publicar el software

### 7.1 Preparación para despliegue

```markdown
# Checklist Pre-Deploy

## Código
- [ ] Todos los tests pasan
- [ ] No hay errores en consola
- [ ] No hay console.log() de debug
- [ ] No hay código comentado innecesario
- [ ] Variables de entorno configuradas

## Configuración
- [ ] .env.example actualizado
- [ ] .gitignore incluye archivos sensibles
- [ ] package.json con scripts correctos
- [ ] Build process funciona: `npm run build`

## Datos
- [ ] Base de datos con schema correcta
- [ ] Scripts de migración si aplican
- [ ] Datos de prueba disponibles

## Documentación
- [ ] README con instrucciones de despliegue
- [ ] CHANGELOG actualizado
- [ ] Documentación de API actual
```

### 7.2 Estrategias de despliegue

```markdown
# Opciones de Deploy

## Opción 1: GitHub Pages (Frontend estático)
### Pasos:
1. Build del proyecto: `npm run build`
2. Configurar GitHub Pages en settings del repo
3. Push de la carpeta dist/build
4. Acceder vía https://username.github.io/repo-name

**Limitación:** Solo frontend, necesitas backend separado para db.json

## Opción 2: Vercel/Netlify (Recomendado para SPA)
### Pasos:
1. Conectar repositorio de GitHub
2. Configurar build command: `npm run build`
3. Configurar output directory: `dist`
4. Deploy automático en cada push

## Opción 3: Server propio (VPS)
### Pasos:
1. Configurar servidor (nginx/apache)
2. Clonar repositorio
3. Instalar dependencias
4. Build de producción
5. Configurar dominio

## Para este proyecto (con db.json):
**Sugerencia:** Netlify + JSON Server en Render/Railway
```

### 7.3 Versionado semántico

```markdown
# Semantic Versioning (SemVer)

## Formato: MAJOR.MINOR.PATCH (ej: 1.4.2)

### MAJOR (1.x.x)
Cambios que rompen compatibilidad
- Cambio completo de arquitectura
- Eliminar funcionalidades
- Cambios en estructura de datos que requieren migración

### MINOR (x.1.x)
Nuevas funcionalidades compatibles
- Agregar nueva página
- Agregar filtros
- Nuevos componentes

### PATCH (x.x.1)
Correcciones de bugs
- Fix de errores
- Mejoras de rendimiento
- Correcciones de UI

## Ejemplo para este proyecto:
- v0.1.0: Setup inicial + cuentas CRUD
- v0.2.0: Agregar transacciones básicas
- v0.2.1: Fix error en cálculo de balance
- v0.3.0: Agregar filtros y búsqueda
- v1.0.0: Primera versión estable y completa
```

---

## Fase 8: Mantenimiento
**Duración:** Continuo
**Objetivo:** Mantener calidad y evolucionar el software

### 8.1 Mantenimiento correctivo (Bugs)

```markdown
# Proceso de Fix de Bugs

## 1. Reportar el bug
**Documento:** BUGS.md o issue tracker

```markdown
## Bug #001: Error al transferir entre cuentas

**Severidad:** Alta
**Fecha:** 2026-03-20
**Reportado por:** Usuario/Tester

### Descripción
Cuando intento transferir $500 de Cuenta A a Cuenta B, se resta de A pero no se suma a B.

### Pasos para reproducir
1. Ir a /transacciones
2. Click en "Nueva transferencia"
3. Seleccionar cuenta origen y destino
4. Ingresar $500
5. Submit

### Resultado esperado
Balance de A: -500, Balance de B: +500

### Resultado actual
Balance de A: -500, Balance de B: sin cambios

### Datos adicionales
- Browser: Chrome 122
- Errores en consola: ninguno
```

## 2. Investigar la causa
- [ ] Reproducir el bug localmente
- [ ] Identificar archivo(s) afectado(s)
- [ ] Usar console.log o debugger para encontrar causa raíz
- [ ] Documentar hallazgos

## 3. Crear branch de fix
```bash
git checkout -b fix/transfer-balance-update
```

## 4. Implementar solución
- [ ] Escribir test que reproduzca el bug (si es posible)
- [ ] Implementar fix mínimo
- [ ] Verificar que el test pasa
- [ ] Probar manualmente

## 5. Validar fix
- [ ] Bug original resuelto
- [ ] No se rompieron otras funcionalidades (regression test)
- [ ] Considerar casos similares

## 6. Merge y documentar
```bash
git commit -m "Fix: account balance not updating in transfers"
git checkout main
git merge fix/transfer-balance-update
```

- [ ] Actualizar CHANGELOG.md
- [ ] Cerrar issue/bug report
- [ ] Si es crítico, considerar hotfix release
```

### 8.2 Mantenimiento evolutivo (Mejoras)

```markdown
# Agregar Nuevas Funcionalidades (Post-Release)

## Proceso:
1. **Evaluar solicitud**
   - ¿Encaja en la visión del proyecto?
   - ¿Cuál es la prioridad?
   - ¿Cuánto esfuerzo requiere?

2. **Agregar a BACKLOG.md**
   - Documentar como User Story
   - Asignar prioridad

3. **Planificar sprint**
   - ¿Entra en el siguiente sprint?
   - ¿Hay dependencias?

4. **Seguir proceso de desarrollo normal**
   - Análisis → Diseño → Implementación → Pruebas

5. **Release**
   - Actualizar versión (semver)
   - Actualizar CHANGELOG
   - Tag de git: `git tag v1.3.0`
```

### 8.3 Mantenimiento preventivo

```markdown
# Mantenimiento Regular

## Semanal:
- [ ] Revisar dependencias desactualizadas: `npm outdated`
- [ ] Revisar issues/bugs reportados
- [ ] Limpiar código muerto (unused imports, functions)

## Mensual:
- [ ] Actualizar dependencias menores: `npm update`
- [ ] Refactorizar código con code smells
- [ ] Revisar y actualizar documentación
- [ ] Análisis de performance

## Trimestral:
- [ ] Actualizar dependencias mayores (con testing)
- [ ] Revisión de arquitectura (¿sigue siendo adecuada?)
- [ ] Limpieza de branches viejos
- [ ] Backup de datos importantes
```

### 8.4 Monitoreo y métricas

```markdown
# Métricas de Calidad

## Código
- Complejidad ciclomática (< 10 por función)
- Cobertura de tests (> 70% para lógica crítica)
- Duplicación de código (< 5%)

## Performance
- Tiempo de carga inicial (< 3 segundos)
- Tiempo de respuesta de operaciones (< 500ms)
- Tamaño del bundle (< 200KB para SPA pequeña)

## Bugs
- Tiempo medio de resolución
- Bugs críticos abiertos (meta: 0)
- Tasa de regresión (bugs reintroducidos)

**Herramientas:**
- Lighthouse para performance
- Bundle analyzer para tamaño
- Console para errores
```

---

## Herramientas y Templates

### Template: Planificación de Sprint

```markdown
# Sprint [Número] - [Fechas]

## Objetivo del Sprint
[Descripción breve del objetivo principal]

## User Stories Seleccionadas
1. [US-XXX] Nombre de la historia (Prioridad: Must/Should/Could)
2. [US-XXX] Nombre de la historia
3. [US-XXX] Nombre de la historia

## Tareas Técnicas
- [ ] [Tarea técnica 1]
- [ ] [Tarea técnica 2]

## Criterios de Éxito
- Todas las US completadas según DoD
- Sin bugs críticos
- Documentación actualizada
- Demo lista para mostrar

## Retrospectiva (al finalizar)
### ¿Qué salió bien?
- ...

### ¿Qué salió mal?
- ...

### ¿Qué mejorar para el siguiente sprint?
- ...
```

### Template: Implementación de Funcionalidad

```markdown
# [Nombre de la Funcionalidad]

**Fecha inicio:** YYYY-MM-DD
**Fecha estimada fin:** YYYY-MM-DD
**Estado:** En progreso / Completado

## Análisis (completar ANTES de codificar)
- [ ] Requisitos claros documentados
- [ ] Archivos a modificar identificados
- [ ] Datos necesarios definidos
- [ ] Casos edge identificados

## Diseño (completar ANTES de codificar)
- [ ] Mockup/wireframe creado
- [ ] Estructura de datos definida
- [ ] Pseudocódigo escrito
- [ ] Componentes reutilizables identificados

## Implementación
- [ ] Capa de datos (services/repositories)
- [ ] Lógica de negocio (validations, calculations)
- [ ] Capa de presentación (UI components)
- [ ] Event handlers y interactividad
- [ ] Manejo de errores
- [ ] Loading states
- [ ] Empty states

## Pruebas
- [ ] Happy path funciona
- [ ] Casos edge manejados
- [ ] Errores muestran mensajes claros
- [ ] Sin errores en consola
- [ ] Performance aceptable

## Documentación
- [ ] Comentarios en código complejo
- [ ] CHANGELOG.md actualizado
- [ ] README actualizado (si aplica)

## Commit y merge
- [ ] Commits atómicos realizados
- [ ] Branch merged a main
- [ ] Branch eliminado
```

### Template: Code Review Checklist

```markdown
# Code Review Checklist

## Funcionalidad
- [ ] Cumple con los requisitos de la User Story
- [ ] Los nombres de variables/funciones son claros
- [ ] No hay código duplicado
- [ ] No hay código comentado innecesario
- [ ] No hay console.log de debugging

## Arquitectura
- [ ] Sigue los patrones establecidos del proyecto
- [ ] Separación de responsabilidades clara
- [ ] Componentes reutilizables donde sea apropiado
- [ ] No hay acoplamiento excesivo

## Seguridad
- [ ] No hay datos sensibles en el código
- [ ] Validación de inputs del usuario
- [ ] No hay vulnerabilidades obvias (XSS, injection)

## Performance
- [ ] No hay bucles infinitos potenciales
- [ ] No hay re-renders innecesarios
- [ ] Carga de datos eficiente
- [ ] Imágenes/assets optimizados

## Mantenibilidad
- [ ] Código fácil de entender
- [ ] Funciones con una sola responsabilidad
- [ ] Manejo de errores apropiado
- [ ] Tests relevantes incluidos (si aplica)
```

---

## 🎯 Metodología Ágil Adaptada para Desarrollo Individual

### Ciclo semanal recomendado:

```markdown
## Lunes: Planificación
- Revisar BACKLOG.md
- Seleccionar 2-3 funcionalidades para la semana
- Crear/actualizar SPRINT.md
- Análisis y diseño de primera funcionalidad

## Martes-Jueves: Desarrollo
- Implementar funcionalidades
- Commits frecuentes
- Documentación continua
- Pruebas durante desarrollo

## Viernes: Review y Retro
- Testing exhaustivo
- Code review (auto-review)
- Actualizar documentación
- Retrospectiva personal (qué mejorar)
- Planning de siguiente semana

## Fin de Semana: Pausa
- No codificar (evitar burnout)
- Opcional: investigar tecnologías para próximas features
```

---

## 🏗️ Caso Práctico: Tu Proyecto Actual

### Estado Actual del Proyecto
```
✅ Completado:
- Página de transacciones con visualización
- Servicio de transacciones
- Componente Table reutilizable

⚠️ Identificado:
- Error en mensaje: "Error al cargar cuentas" → debe ser "transacciones"

🔜 Sugerencias de próximos pasos:
1. Corregir errores menores actuales
2. Implementar filtros de transacciones
3. Agregar formulario para crear transacciones
4. Implementar dashboard con resumen
```

### Aplicando la metodología a tu próxima funcionalidad

**Ejemplo: Implementar filtros de transacciones**

#### Día 1: Lunes (Planificación - 2 horas)
```
09:00-09:30 → Análisis
  - Definir qué filtros: tipo, fecha, monto
  - Identificar archivos: TransactionsPage.js, TransactionService.js
  - Revisar código existente

09:30-10:30 → Diseño
  - Diseñar UI del filtro (ASCII mockup)
  - Diseñar estructura de datos del filtro
  - Pseudocódigo de la lógica de filtrado

10:30-11:00 → Documentar plan
  - Crear archivo docs/features/FILTROS_TRANSACCIONES.md
  - Seguir template de implementación
  - Definir DoD específico para esta feature
```

#### Día 1: Lunes (Desarrollo parte 1 - 2 horas)
```
11:00-12:00 → Implementar service layer
  - TransactionService.filter(transactions, filterCriteria)
  - Probar función aisladamente (console.log resultados)
  - Commit: "Add filter method to TransactionService"

14:00-15:00 → Implementar UI básica
  - Agregar <select> para filtro de tipo
  - CSS básico
  - Commit: "Add filter UI to TransactionsPage"
```

#### Día 2: Martes (Desarrollo parte 2 - 3 horas)
```
09:00-10:00 → Integración
  - Conectar UI con service
  - Event handlers
  - Actualizar tabla con resultados filtrados

10:00-11:00 → Manejo de estados especiales
  - Loading state mientras filtra
  - Empty state cuando no hay resultados
  - Error state si algo falla

11:00-12:00 → Testing y refinamiento
  - Probar todos los tipos de filtro
  - Probar combinaciones
  - Ajustar UX según necesidad
  - Commit: "Complete filter functionality with error handling"
```

#### Día 2: Martes (Documentación - 30 min)
```
14:00-14:30 → Actualizar docs
  - CHANGELOG.md: agregar feature
  - Marcar US-010 como completada en BACKLOG.md
```

---

## 📊 Métricas de Progreso

### Track semanal
```markdown
# Semana del [fecha]

## Objetivo de la semana
[Descripción]

## User Stories completadas
- [US-XXX] Nombre (X horas)
- [US-XXX] Nombre (X horas)

## Bugs corregidos
- [BUG-XXX] Descripción

## Tiempo invertido
- Análisis: X horas
- Diseño: X horas
- Desarrollo: X horas
- Pruebas: X horas
- Documentación: X horas
**Total:** X horas

## Aprendizajes
- ...

## Bloqueadores encontrados
- ...

## Para próxima semana
- ...
```

---

## 🎓 Principios SOLID aplicados

```markdown
# Principios de Diseño

## S - Single Responsibility Principle
Cada módulo debe tener una sola razón para cambiar.

❌ Malo:
```javascript
class AccountService {
  createAccount() { /* ... */ }
  renderAccountUI() { /* ... */ }  // ← Responsabilidad diferente
  calculateTaxes() { /* ... */ }   // ← Responsabilidad diferente
}
```

✅ Bueno:
```javascript
class AccountService {
  create() { /* ... */ }
  getAll() { /* ... */ }
  update() { /* ... */ }
}

class AccountRenderer {
  render() { /* ... */ }
}

class TaxCalculator {
  calculate() { /* ... */ }
}
```

## O - Open/Closed Principle
Abierto a extensión, cerrado a modificación.

✅ Diseñar para extender sin modificar código existente:
```javascript
// Base
class TransactionValidator {
  validate(transaction) {
    // Validación básica
  }
}

// Extensión (sin modificar el original)
class AdvancedTransactionValidator extends TransactionValidator {
  validate(transaction) {
    super.validate(transaction);
    // Validaciones adicionales
  }
}
```

## L - Liskov Substitution Principle
Los subtipos deben ser sustituibles por sus tipos base.

## I - Interface Segregation Principle
No forzar a implementar interfaces que no se usan.

## D - Dependency Inversion Principle
Depender de abstracciones, no de implementaciones concretas.

✅ Ejemplo:
```javascript
// Abstracción
class DataRepository {
  getAll() { throw new Error('Not implemented'); }
  save(data) { throw new Error('Not implemented'); }
}

// Implementación concreta
class JSONFileRepository extends DataRepository {
  getAll() { /* lee de db.json */ }
  save(data) { /* escribe a db.json */ }
}

// Otro implementación (para testing o futuro)
class LocalStorageRepository extends DataRepository {
  getAll() { /* lee de localStorage */ }
  save(data) { /* escribe a localStorage */ }
}

// Service no depende de implementación específica
class AccountService {
  constructor(repository) {
    this.repo = repository; // ← puede ser cualquier implementación
  }
}
```
```

---

## 🚀 Quick Start para tu próxima funcionalidad

```markdown
# Checklist Rápida

## Antes de empezar (15 min)
1. [ ] Abrir BACKLOG.md y seleccionar tarea
2. [ ] Crear archivo de planificación en docs/features/[NOMBRE].md
3. [ ] Análisis: escribir qué voy a hacer y por qué
4. [ ] Diseño: pseudocódigo y mockup
5. [ ] Listar archivos a modificar

## Durante desarrollo (variable)
6. [ ] Crear branch: `git checkout -b feature/nombre`
7. [ ] Implementar en incrementos pequeños
8. [ ] Commit cada sub-funcionalidad completada
9. [ ] Probar continuamente en navegador
10. [ ] Refactorizar al final de cada incremento

## Antes de marcar como completa (20 min)
11. [ ] Revisar Definition of Done
12. [ ] Probar todos los casos (happy path + edge cases)
13. [ ] Auto code-review con checklist
14. [ ] Actualizar CHANGELOG.md
15. [ ] Merge a main: `git checkout main && git merge feature/nombre`

## Al finalizar el día (5 min)
16. [ ] Actualizar PROGRESS.md con lo hecho hoy
17. [ ] Anotar bloqueadores o dudas para mañana
```

---

## 📚 Documentos Recomendados

### Estructura mínima de docs:
```
docs/
├── VISION.md              # Qué es el proyecto
├── BACKLOG.md             # Todas las funcionalidades (priorizado)
├── SPRINTS.md             # Planificación de sprints
├── ARCHITECTURE.md        # Diseño técnico
├── DATA_MODEL.md          # Modelos de datos
├── API_DESIGN.md          # Servicios y métodos
├── COMPONENTS.md          # Catálogo de componentes
├── DEFINITION_OF_DONE.md  # Criterios de completitud
├── TEST_MATRIX.md         # Casos de prueba
├── PROGRESS.md            # Track semanal
└── features/              # Planificación detallada por feature
    ├── FILTROS_TRANSACCIONES.md
    ├── DASHBOARD.md
    └── EXPORTAR_DATOS.md
```

### Documentos en la raíz:
```
/
├── README.md              # Introducción y setup
├── CHANGELOG.md           # Historial de cambios
├── CONTRIBUTING.md        # Guía para contribuidores
├── METODOLOGIA_DESARROLLO.md  # Proceso por funcionalidad
└── CICLO_VIDA_SOFTWARE.md     # Este documento
```

---

## 🎯 Plan de Acción Inmediato para tu Proyecto

### Ahora mismo (20 min):
1. **Crear estructura de documentos**
```bash
mkdir -p docs/features
touch docs/VISION.md
touch docs/BACKLOG.md
touch docs/ARCHITECTURE.md
```

2. **Documentar estado actual**
   - En VISION.md: escribir objetivo del proyecto
   - En BACKLOG.md: listar todas las funcionalidades que quieres
   - En ARCHITECTURE.md: documentar estructura actual

### Esta semana:
3. **Organizar trabajo existente**
   - Revisar código actual
   - Identificar qué está completo vs qué falta
   - Priorizar siguiente funcionalidad

4. **Implementar siguiente feature usando metodología**
   - Seguir proceso completo desde análisis hasta pruebas
   - Documentar cada paso
   - Commits pequeños

### Este mes:
5. **Establecer rutina**
   - Lunes: planificación
   - Martes-Jueves: desarrollo
   - Viernes: review

6. **Mantener documentación actualizada**
   - Actualizar CHANGELOG con cada feature
   - Actualizar BACKLOG marcando completadas

---

## 💡 Principios Fundamentales

### 1. Never Start Coding Without a Plan
```
Tiempo de planificación = 1/5 del tiempo de desarrollo
Ejemplo: Si una feature toma 5 horas, planifica 1 hora
```

### 2. Small Commits, Frequent Pushes
```
Commit cada: sub-funcionalidad completa (30-60 min de trabajo)
No commit: trabajo a medias, código que no compila
```

### 3. Documentation is Code
```
Documentar ≠ Comentar todo
Documentar = Explicar decisiones, arquitectura, y flujos
```

### 4. Test Early, Test Often
```
No esperar a terminar todo para probar
Probar cada pieza inmediatamente después de escribirla
```

### 5. Refactor Continuously
```
Al terminar cada funcionalidad: revisar y limpiar
No acumular deuda técnica
```

### 6. YAGNI (You Aren't Gonna Need It)
```
No implementar funcionalidades "por si acaso"
Solo construir lo que se necesita AHORA
```

### 7. DRY (Don't Repeat Yourself)
```
Si copias código 3+ veces → extraer a función/componente
Identificar patrones y abstraer
```

### 8. KISS (Keep It Simple, Stupid)
```
La solución más simple que funcione es la mejor
No sobre-ingeniera
```

---

## 🔄 Proceso Completo - Diagrama Visual

```
┌────────────────────────────────────────────────────────────┐
│                     FASE 0: CONCEPCIÓN                     │
│  Definir problema, alcance, tecnologías (1-2 días)        │
└───────────────────────┬────────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────────────┐
│                   FASE 1: PLANIFICACIÓN                    │
│  Backlog, priorización, sprints (2-3 días)                │
└───────────────────────┬────────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────────────┐
│              FASE 2: ANÁLISIS DE REQUISITOS                │
│  User Stories, casos de uso (por feature)                 │
└───────────────────────┬────────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────────────┐
│              FASE 3: DISEÑO ARQUITECTÓNICO                 │
│  Arquitectura, datos, APIs, componentes                   │
└───────────────────────┬────────────────────────────────────┘
                        ↓
        ┌───────────────┴───────────────┐
        ↓                               ↓
┌──────────────────┐         ┌──────────────────┐
│  FASE 4: DEV     │←──────→│  FASE 5: TESTING │
│  (Iterativo)     │         │  (Continuo)      │
└────────┬─────────┘         └──────────────────┘
         ↓
┌────────────────────────────────────────────────────────────┐
│               FASE 6: DOCUMENTACIÓN (Continuo)             │
└───────────────────────┬────────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────────────┐
│                    FASE 7: DESPLIEGUE                      │
│  Deploy a producción (al completar sprint)                │
└───────────────────────┬────────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────────────┐
│                  FASE 8: MANTENIMIENTO                     │
│  Bugs, mejoras, evolución (continuo)                      │
└────────────────────────────┬───────────────────────────────┘
                             ↓
                    ┌────────────────┐
                    │  Nueva Feature │
                    │  (Volver a F2) │
                    └────────────────┘
```

---

## 🛠️ Herramientas Recomendadas

### Gestión de Tareas
- **Básico:** BACKLOG.md + SPRINTS.md (archivos markdown)
- **Intermedio:** GitHub Projects (integrado con repo)
- **Avanzado:** Jira, Linear, Notion

### Control de Versiones
- **Git:** Control de versiones
- **GitHub:** Hosting + issues + projects
- **Branches:** feature/*, fix/*, release/*

### Testing
- **Unit:** Jest, Vitest
- **E2E:** Playwright, Cypress
- **Manual:** Checklist en TEST_MATRIX.md

### Documentación
- **Código:** JSDoc para funciones públicas
- **Proyecto:** Markdown files en /docs
- **API:** Swagger/OpenAPI (si backend)

### CI/CD
- **GitHub Actions:** Automatizar tests y deploy
- **Pre-commit hooks:** Linting y formatting automático
- **Dependabot:** Actualizar dependencias automáticamente

---

## ⚠️ Errores Comunes y Cómo Evitarlos

### Error 1: Empezar a codificar sin plan
**Síntoma:** Reescribes código constantemente
**Solución:** Obligarte a escribir pseudocódigo primero

### Error 2: Commits gigantes
**Síntoma:** Commit de 20+ archivos con mensaje genérico
**Solución:** Commit cada 30-60 min de trabajo o cada sub-funcionalidad

### Error 3: No probar durante desarrollo
**Síntoma:** Descubres 10 bugs al final
**Solución:** Probar en navegador cada 15-20 min

### Error 4: Documentación al final (nunca se hace)
**Síntoma:** Código sin docs, nadie entiende cómo funciona
**Solución:** Documentar mientras codificas (5 min cada hora)

### Error 5: Sobre-ingeniería
**Síntoma:** Sistema de plugins para algo que usarás una vez
**Solución:** YAGNI - implementa solo lo necesario ahora

### Error 6: No hacer retrospectivas
**Síntoma:** Repites los mismos errores
**Solución:** 15 min cada viernes para reflexionar

### Error 7: Feature creep (agregar features sin control)
**Síntoma:** Proyecto nunca termina, funcionalidades a medias
**Solución:** Backlog priorizado + Definition of Done estricta

---

## 📝 Templates Adicionales

### Template: Feature Implementation Plan

```markdown
# Feature: [Nombre]

## Metadata
- **ID:** FEAT-XXX
- **Prioridad:** Must/Should/Could Have
- **Estimación:** X horas/días
- **Sprint:** Sprint X
- **Asignado a:** [nombre]
- **Status:** Not Started / In Progress / Testing / Done

## 1. Requisitos
[User Story completa + criterios de aceptación]

## 2. Análisis Técnico
### Archivos a crear:
- [ ] ruta/archivo.js

### Archivos a modificar:
- [ ] ruta/archivo.js (razón)
- [ ] ruta/otro.js (razón)

### Dependencias nuevas:
- [ ] librería X (para qué)

## 3. Diseño

### 3.1 Estructura de datos
```javascript
// Definir estructuras aquí
```

### 3.2 Mockup/Wireframe
```
[ASCII art o link a imagen]
```

### 3.3 Pseudocódigo
```
1. Paso 1
2. Paso 2
3. Paso 3
```

## 4. Plan de Implementación

### Incremento 1: [Nombre] (duración estimada)
- [ ] Tarea específica 1
- [ ] Tarea específica 2
**Commit:** "Mensaje del commit"

### Incremento 2: [Nombre] (duración estimada)
- [ ] Tarea específica 1
- [ ] Tarea específica 2
**Commit:** "Mensaje del commit"

## 5. Casos de Prueba
| Scenario | Input | Expected Output | Status |
|----------|-------|-----------------|--------|
| Happy path | ... | ... | ⬜ Not tested |
| Edge case 1 | ... | ... | ⬜ Not tested |
| Error case | ... | ... | ⬜ Not tested |

## 6. Definition of Done
- [ ] Código implementado
- [ ] Pruebas manuales completadas
- [ ] Sin errores en consola
- [ ] Documentación actualizada
- [ ] Code review realizado
- [ ] Merged a main

## 7. Notas y Decisiones
- [Fecha] Decisión de usar X en lugar de Y porque...
- [Fecha] Bloqueador encontrado: ...
- [Fecha] Solución aplicada: ...

## 8. Post-Implementation Review
### ¿Qué salió bien?
- ...

### ¿Qué salió mal?
- ...

### ¿Qué haría diferente?
- ...

### Tiempo real invertido:
- Análisis: X horas
- Desarrollo: X horas
- Testing: X horas
- Total: X horas (vs estimado: X horas)
```

---

## 🎯 Ejercicio Práctico: Aplicar Metodología HOY

### Tarea: Implementar "Filtrar transacciones por tipo"

#### 1. Crear documento de planificación (15 min)
```bash
# Crear archivo
touch docs/features/FILTROS_TRANSACCIONES.md

# Completar template de Feature Implementation Plan
# Incluir: análisis, diseño, plan de implementación
```

#### 2. Crear branch (1 min)
```bash
git checkout -b feature/filtros-transacciones
```

#### 3. Seguir plan de implementación (2-3 horas)
- Implementar por incrementos
- Commit cada incremento
- Probar cada pieza

#### 4. Review y merge (20 min)
- Auto code-review
- Testing completo
- Actualizar docs
- Merge a main

#### 5. Retrospectiva (5 min)
- Documentar aprendizajes en el plan de la feature
- ¿La estimación fue correcta?
- ¿Qué mejorar para la próxima?

---

## 🏆 Objetivos de Madurez

### Nivel 1: Principiante
- ✅ Documentar qué voy a hacer antes de codificar
- ✅ Commits con mensajes descriptivos
- ✅ Probar antes de push

### Nivel 2: Intermedio
- ✅ Planificación por sprint
- ✅ User Stories con criterios de aceptación
- ✅ Code reviews (auto-review)
- ✅ CHANGELOG actualizado

### Nivel 3: Avanzado
- ✅ Tests automatizados (unit + integration)
- ✅ CI/CD configurado
- ✅ Documentación técnica completa
- ✅ Métricas de código y performance

### Nivel 4: Experto
- ✅ Arquitectura escalable y mantenible
- ✅ TDD (Test-Driven Development)
- ✅ Deployment automático
- ✅ Monitoreo y analytics
- ✅ Procesos de code review con equipo

---

## 📖 Recursos Adicionales

### Lecturas recomendadas:
- **Clean Code** - Robert C. Martin
- **The Pragmatic Programmer** - Hunt & Thomas
- **Refactoring** - Martin Fowler
- **Design Patterns** - Gang of Four

### Conceptos clave para investigar:
- SOLID Principles
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple)
- YAGNI (You Aren't Gonna Need It)
- Test-Driven Development (TDD)
- Behavior-Driven Development (BDD)
- Continuous Integration/Continuous Deployment (CI/CD)

---

## 🎬 Conclusión

### El ciclo ideal resumido:

```
1. Pensar → ¿Qué voy a construir?
2. Diseñar → ¿Cómo lo voy a construir?
3. Planificar → ¿En qué orden?
4. Codificar → Construir en incrementos
5. Probar → ¿Funciona correctamente?
6. Documentar → ¿Otros pueden entenderlo?
7. Desplegar → ¿Usuarios pueden acceder?
8. Mantener → ¿Sigue funcionando?
9. Evolucionar → Volver al paso 1 para nueva feature
```

### Regla de oro:
> **"Un día de planificación ahorra una semana de desarrollo"**

### Próximos pasos:
1. Lee este documento completamente
2. Crea la estructura de docs/ sugerida
3. Documenta tu proyecto actual (qué tienes, qué falta)
4. Elige una funcionalidad del backlog
5. Aplica la metodología completa para esa funcionalidad
6. Reflexiona sobre el proceso
7. Ajusta según tus necesidades

---

**Recuerda:** Esta metodología es una guía, no una prisión. Adáptala a tu estilo y proyecto, pero mantén los principios fundamentales:

✅ Planificar antes de codificar
✅ Desarrollo incremental
✅ Documentación continua
✅ Testing frecuente
✅ Mejora continua

**¡Buena suerte en tu desarrollo!** 🚀
