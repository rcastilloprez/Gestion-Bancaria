# Fase 4: Desarrollo Iterativo
## Construir el software en incrementos

**Duración estimada:** Variable (70% del tiempo total del proyecto)
**Prerequisito:** Fase 3 (Diseño) completada para las US del sprint
**Cuándo usar:** Durante cada sprint, todos los días

---

## 🎯 Objetivo de esta fase
Transformar diseños en código funcional:
- Implementar features en pequeños incrementos
- Commits frecuentes y atómicos
- Testing continuo durante desarrollo
- Refactorización inmediata cuando sea necesario
- Mantener calidad de código consistente

**Regla de oro:** Código que no está commiteado no existe. Commit cada 30-60 minutos de trabajo productivo.

---

## 📋 Proceso Diario de Desarrollo

### Ritual de Inicio de Día (10-15 min)

```markdown
## Daily Standup (contigo mismo)

### 1. ¿Qué hice ayer?
- [ ] Listar tareas completadas ayer
- [ ] Marcar US/tareas como Done si aplicable

### 2. ¿Qué haré hoy?
- [ ] Seleccionar 1-2 tareas del sprint
- [ ] Definir objetivo concreto del día
- [ ] Identificar posibles bloqueadores

### 3. ¿Hay bloqueadores?
- [ ] ¿Algo me impide avanzar?
- [ ] ¿Necesito investigar algo antes?
- [ ] ¿Necesito ayuda externa?

### 4. Preparar ambiente
- [ ] Pull latest de main: `git pull origin main`
- [ ] Crear/cambiar a branch: `git checkout -b feature/nombre`
- [ ] Abrir docs de la US: `docs/user-stories/US-XXX.md`
- [ ] Abrir diseño técnico: `docs/designs/DESIGN_US_XXX.md`
- [ ] Levantar dev server

---

## Ejemplo de Daily Plan
**Fecha:** 2026-03-20
**Objetivo del día:** Implementar US-007 (Registrar depósito)

**Tareas específicas:**
- [ ] 09:00-10:30: Implementar TransactionService.deposit()
- [ ] 10:30-11:00: Testing en consola de deposit()
- [ ] 11:00-12:00: Crear UI del form de depósito
- [ ] 14:00-15:00: Integrar form con service
- [ ] 15:00-16:00: Testing manual + edge cases
- [ ] 16:00-16:30: Refactoring y cleanup
- [ ] 16:30-17:00: Documentación y closing

**Commits planeados:**
1. "feat: add deposit method to TransactionService"
2. "feat: add deposit form UI"
3. "feat: integrate deposit form with service"
4. "test: add manual tests for deposit flow"
```

---

## 🔄 Ciclo TDD Adaptado (por funcionalidad)

### Fase RED → GREEN → REFACTOR

#### 🔴 RED: Definir comportamiento esperado (10-15 min)

Antes de escribir código, escribe lo que DEBERÍA pasar:

```javascript
// accounts/accountService.js

// ===== RED PHASE =====
// Especificación en comentarios ANTES de implementar

/**
 * Crea una nueva cuenta bancaria
 *
 * COMPORTAMIENTO ESPERADO:
 * - Input: { name: 'Ahorro', type: 'ahorro', balance: 1000 }
 * - Output: Account con id generado y timestamps
 * - Validaciones:
 *   ✗ name vacío → ValidationError
 *   ✗ type inválido → ValidationError
 *   ✗ balance negativo → ValidationError
 * - Side effects: Cuenta agregada a db.json
 *
 * TEST CASES:
 * ✓ Datos válidos → cuenta creada
 * ✓ Name < 3 chars → error
 * ✓ Balance negativo → error
 * ✓ Type inválido → error
 */
async create(data) {
  // TODO: Implementar
}

// ===== Escribir tests (manual o automatizado) =====

// Manual: Lista en comments
// TEST 1: crear con datos válidos → debe retornar cuenta con ID
// TEST 2: crear con name vacío → debe lanzar ValidationError
// TEST 3: crear con balance -100 → debe lanzar ValidationError

// Automatizado (opcional en MVP):
// test('creates account with valid data', async () => {
//   const account = await AccountService.create({
//     name: 'Test',
//     type: 'ahorro',
//     balance: 1000
//   });
//   expect(account.id).toBeDefined();
// });
```

---

#### 🟢 GREEN: Implementar lo mínimo (30-60 min)

Escribe el código más simple que pase los tests:

```javascript
// ===== GREEN PHASE =====
// Implementación mínima

async create(data) {
  // 1. Validar
  if (!data.name || data.name.trim().length < 3) {
    throw new ValidationError('Name must be at least 3 characters');
  }

  if (!['ahorro', 'corriente', 'inversion'].includes(data.type)) {
    throw new ValidationError('Invalid account type');
  }

  if (data.balance < 0) {
    throw new ValidationError('Balance cannot be negative');
  }

  // 2. Construir account
  const account = {
    id: crypto.randomUUID(),
    name: data.name.trim(),
    type: data.type,
    balance: data.balance || 0,
    currency: data.currency || 'MXN',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // 3. Guardar
  await this.repository.save(account);

  // 4. Retornar
  return account;
}

// ===== Testing manual en navegador console =====
// const acc = await AccountService.create({ name: 'Test', type: 'ahorro', balance: 100 });
// console.log(acc); // ✓ Funciona

// const err = await AccountService.create({ name: '', type: 'ahorro' });
// ✓ Lanza error

// **Commit 1:** "feat: add create method to AccountService"
```

---

#### 🔵 REFACTOR: Mejorar el código (15-30 min)

Sin cambiar comportamiento, mejora la estructura:

```javascript
// ===== REFACTOR PHASE =====
// Mejorar sin cambiar funcionalidad

async create(data) {
  // Extraer validaciones
  this._validateAccountData(data);

  // Extraer construcción
  const account = this._buildAccountObject(data);

  // Guardar
  await this.repository.save(account);

  return account;
}

// Método privado extraído
_validateAccountData(data) {
  const errors = {};

  if (!data.name || data.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters';
  }

  if (!['ahorro', 'corriente', 'inversion'].includes(data.type)) {
    errors.type = 'Invalid type';
  }

  if (data.balance !== undefined && data.balance < 0) {
    errors.balance = 'Balance cannot be negative';
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError(errors);
  }
}

_buildAccountObject(data) {
  return {
    id: crypto.randomUUID(),
    name: data.name.trim(),
    type: data.type,
    balance: data.balance || 0,
    currency: data.currency || 'MXN',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

// **Commit 2:** "refactor: extract validation and build methods"
```

---

## 🏗️ Desarrollo Incremental (Slicing)

### Estrategia de implementación: Bottom-Up vs Top-Down

#### Bottom-Up (Recomendado para MVP)
Empezar desde la base e ir subiendo:

```
1. Data Layer (Repositories)      ← Empezar aquí
2. Business Layer (Services)       ↑
3. Presentation Layer (Components) ↑
4. Pages (UI completa)             ↑
```

**Ventaja:** Cada capa se puede probar antes de construir la siguiente

**Ejemplo:**
```
Día 1: Implementar AccountRepository (CRUD básico)
       Test: Usar en consola
       Commit: "feat: add AccountRepository with CRUD operations"

Día 2: Implementar AccountService (lógica de negocio)
       Test: Usar en consola con datos reales
       Commit: "feat: add AccountService with business logic"

Día 3: Crear componentes UI (Table, Button, Modal)
       Test: Renderizar en página de prueba
       Commit: "feat: add reusable UI components"

Día 4: Implementar AccountsPage (todo junto)
       Test: Navegar desde browser
       Commit: "feat: add AccountsPage with full functionality"
```

---

#### Top-Down (Alternativa)
Empezar desde UI e ir bajando:

```
1. Pages (UI mock con datos hardcoded)  ← Empezar aquí
2. Services (mockeados)                  ↓
3. Repositories (stubbed)                ↓
4. Real data (conectar todo)             ↓
```

**Ventaja:** Ves resultado visual rápido (motivación)
**Desventaja:** Más refactoring después

---

### Slicing: Dividir features en incrementos

**Ejemplo: US-007 (Registrar depósito)**

```markdown
## Incremento 1: Service Layer (1-1.5 horas)
**Objetivo:** deposit() funciona con validaciones

### Tareas:
- [ ] Crear método TransactionService.deposit()
- [ ] Validaciones de input (amount > 0, accountId exists)
- [ ] Lógica: crear transaction, actualizar balance
- [ ] Testing manual en consola:
      ```javascript
      const t = await TransactionService.deposit('uuid', 100, 'Test');
      console.log(t); // Debe mostrar transacción
      const acc = await AccountService.getById('uuid');
      console.log(acc.balance); // Debe haber aumentado
      ```
- [ ] **Commit:** "feat: add deposit method with validations"

**DoD del incremento:**
- Método implementado
- Validaciones funcionan
- Probado manualmente
- Sin erreros

---

## Incremento 2: UI del Form (1 hora)
**Objetivo:** Form de depósito renderiza y captura datos

### Tareas:
- [ ] Crear HTML del form (modal)
- [ ] Campos: cuenta (select), monto (number), descripción (textarea)
- [ ] CSS básico
- [ ] Testing: Abrir modal, llenar form, ver console.log de datos
- [ ] **Commit:** "feat: add deposit form UI"

**DoD del incremento:**
- Form renderiza correctamente
- Campos capturan valores
- Botón submit captura evento

---

## Incremento 3: Integración (45 min)
**Objetivo:** Form → Service → Update UI

### Tareas:
- [ ] Conectar submit del form con TransactionService.deposit()
- [ ] Manejar success: cerrar modal, mostrar mensaje, recargar tabla
- [ ] Manejar error: mostrar mensaje, mantener modal abierto
- [ ] **Commit:** "feat: integrate deposit form with service"

**DoD del incremento:**
- Flujo completo funciona
- Success y error manejados
- UI actualiza correctamente

---

## Incremento 4: Edge Cases (30-45 min)
**Objetivo:** Robusto ante casos edge

### Tareas:
- [ ] Probar: monto 0, negativo, muy grande
- [ ] Probar: cuenta inexistente
- [ ] Probar: descripción vacía vs con texto
- [ ] Probar: double submit (click múltiples veces)
- [ ] Agregar validaciones faltantes
- [ ] **Commit:** "fix: add edge case handling to deposit"

**DoD del incremento:**
- Todos los edge cases manejados
- Sin crashes
- Errores muestran mensajes claros

---

## Incremento 5: Polish (30 min)
**Objetivo:** UX refinado

### Tareas:
- [ ] Loading state mientras procesa
- [ ] Deshabilitar botón mientras submit
- [ ] Focus automático en primer campo
- [ ] Enter key submits form
- [ ] Limpiar form después de éxito
- [ ] **Commit:** "improve: enhance deposit UX with loading and shortcuts"

**DoD del incremento:**
- UX pulido
- Detalles implementados
- Se siente profesional

---

**Total de incrementos:** 5
**Total de commits:** 5
**Total de tiempo:** ~4-5 horas
**Velocity:** 5 puntos (US-007 estimada en 5 pts)
```

---

## 🎨 Workflow de Desarrollo (Pomodoro + Git)

### Técnica Pomodoro Adaptada

```markdown
## Ciclo de 90 minutos

### Pomodoro 1 (25 min): Implementación Foco
- Escribir código sin interrupciones
- Consultar diseño técnico como referencia
- NO probar todavía, solo escribir

### Break (5 min)
- Levantarse, estirar
- NO revisar redes sociales

### Pomodoro 2 (25 min): Testing y Ajustes
- Probar lo que escribiste en Pomodoro 1
- Corregir errores
- Ajustar según resultados

### Break (5 min)

### Pomodoro 3 (25 min): Refactor y Commit
- Refactorizar código
- Mejorar nombres
- Eliminar duplicación
- Commit con mensaje claro

### Long Break (15 min)
- Descanso real
- Revisar progreso del día

---

## Al finalizar cada ciclo (90 min)
- [ ] Mínimo 1 commit realizado
- [ ] Código probado manualmente
- [ ] Push a remote: `git push origin feature-branch`

**Meta:** 3-4 ciclos por día = 4-5 horas de desarrollo efectivo
```

---

## 💻 Estrategias de Implementación

### Estrategia 1: TDD Clásico (Test-Driven Development)

```markdown
## TDD Loop (Solo si escribes tests automatizados)

### 1. Write Test (5-10 min)
```javascript
// accountService.test.js
test('create account with valid data', async () => {
  const account = await AccountService.create({
    name: 'Test Account',
    type: 'ahorro',
    balance: 1000
  });

  expect(account).toBeDefined();
  expect(account.id).toBeDefined();
  expect(account.name).toBe('Test Account');
  expect(account.balance).toBe(1000);
});
```

### 2. Run Test → ❌ FAIL
```bash
npm test
# Error: AccountService.create is not defined
```

### 3. Write Code (15-20 min)
```javascript
// accountService.js
async create(data) {
  const account = {
    id: crypto.randomUUID(),
    name: data.name,
    type: data.type,
    balance: data.balance,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await this.repository.save(account);
  return account;
}
```

### 4. Run Test → ✅ PASS
```bash
npm test
# ✓ create account with valid data (45ms)
```

### 5. Refactor (10 min)
```javascript
async create(data) {
  const account = this._buildAccount(data);
  await this.repository.save(account);
  return account;
}

_buildAccount(data) {
  return {
    id: crypto.randomUUID(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}
```

### 6. Run Test → ✅ STILL PASS

### 7. Commit
```bash
git commit -m "feat: add create method to AccountService with tests"
```

**Repite para cada funcionalidad.**
```

---

### Estrategia 2: Manual Testing Loop (Para MVP sin tests automatizados)

```markdown
## Manual Testing Loop (Recomendado para MVP rápido)

### 1. Escribir especificación en comentarios (5 min)
```javascript
/**
 * deposit() - Registrar depósito
 *
 * DEBE:
 * - Aceptar accountId, amount, description
 * - Validar amount > 0
 * - Verificar que cuenta existe
 * - Crear transaction
 * - Incrementar account.balance
 * - Retornar transaction
 *
 * MANUAL TESTS:
 * - [ ] deposit('uuid', 100, 'Test') → balance +100, transaction creada
 * - [ ] deposit('uuid', -50) → ValidationError
 * - [ ] deposit('fake-id', 100) → NotFoundError
 */
```

### 2. Implementar código (30-45 min)
[Escribir la implementación]

### 3. Testing manual en consola (10-15 min)
```javascript
// En DevTools Console
const service = await import('./services/transactionService.js');

// Test 1: Happy path
const t1 = await service.default.deposit('existing-uuid', 100, 'Test deposit');
console.log('✓ Test 1 passed:', t1);

// Test 2: Monto negativo
try {
  await service.default.deposit('uuid', -50, 'Invalid');
  console.error('✗ Test 2 failed: Should have thrown error');
} catch (e) {
  console.log('✓ Test 2 passed:', e.message);
}

// Test 3: Cuenta inexistente
try {
  await service.default.deposit('fake-uuid', 100, 'Test');
  console.error('✗ Test 3 failed: Should have thrown error');
} catch (e) {
  console.log('✓ Test 3 passed:', e.message);
}
```

### 4. Corregir errores encontrados (15-30 min)
[Ajustar código según tests]

### 5. Re-test hasta que todos pasen

### 6. Refactorizar (10-15 min)
[Mejorar código sin cambiar comportamiento]

### 7. Test final (5 min)
[Verificar que refactor no rompió nada]

### 8. Commit
```bash
git add src/services/transactionService.js
git commit -m "feat: add deposit method with validations"
```

**Tiempo total:** 1.5-2 horas

**Repite para cada método/funcionalidad.**
```

---

### Estrategia 3: Spike (Investigación técnica)

```markdown
## Cuándo hacer un Spike

**Spike** = Investigación técnica time-boxed

**Hacer spike cuando:**
- No sabes si algo es posible técnicamente
- No sabes cómo implementar algo
- Necesitas evaluar librería/tecnología
- Primer vez usando una API

**Características de un spike:**
- Time-boxed (1-4 horas máximo)
- Objetivo: aprender, no código productivo
- Resultado: Documento con findings
- Código del spike: normalmente se descarta

### Ejemplo de Spike

**Spike:** ¿Cómo persisitir datos en db.json desde browser?

**Time-box:** 2 horas

**Investigación:**
1. Investigar file system access en browser → NO posible por seguridad
2. Investigar json-server → Posible, requiere servidor
3. Investigar localStorage → Posible, limitado a 5-10MB
4. Investigar IndexedDB → Posible, más complejo

**Findings:**
- Browser no puede escribir a files directamente
- Opciones:
  1. json-server (dev) + API real (prod)
  2. localStorage (simple pero limitado)
  3. IndexedDB (complejo pero robusto)

**Decisión:** json-server para desarrollo

**Entregable:**
- Documento: `docs/spikes/SPIKE_001_data_persistence.md`
- Código de prueba: descartar o guardar en `spikes/` folder

**Commit:**
```bash
git commit -m "docs: add findings from data persistence spike"
```

**NO incluir código experimental en main codebase.**
```

---

## 🔨 Patrones de Implementación

### Pattern 1: Service Method Implementation

```javascript
// Template para implementar métodos de servicio

async methodName(params) {
  // 1. VALIDACIONES (fail fast)
  this._validateInput(params);

  // 2. BUSINESS LOGIC
  // - Obtener datos necesarios
  // - Aplicar reglas de negocio
  // - Transformar datos

  // 3. PERSISTENCIA
  // - Llamar a repository
  // - Manejar errores de persistencia

  // 4. SIDE EFFECTS (si aplica)
  // - Actualizar otros recursos
  // - Emitir eventos

  // 5. RETURN
  return result;
}

// Ejemplo concreto: deposit
async deposit(accountId, amount, description = '') {
  // 1. Validaciones
  if (amount <= 0) {
    throw new ValidationError('Amount must be positive');
  }

  // 2. Business logic
  const account = await AccountService.getById(accountId);

  if (!account) {
    throw new NotFoundError('Account', accountId);
  }

  const transaction = {
    id: crypto.randomUUID(),
    accountId,
    toAccountId: null,
    type: TRANSACTION_TYPES.DEPOSITO,
    amount,
    description,
    date: new Date().toISOString(),
    status: TRANSACTION_STATUS.COMPLETADA,
    createdAt: new Date().toISOString()
  };

  // 3. Persistencia
  await this.repository.save(transaction);

  // 4. Side effects: actualizar balance
  account.balance += amount;
  account.updatedAt = new Date().toISOString();
  await AccountService.update(accountId, { balance: account.balance });

  // 5. Return
  return transaction;
}
```

---

### Pattern 2: Page Rendering

```javascript
// Template para páginas

const PageName = {
  // Entry point
  render: async (container) => {
    // 1. Limpiar container
    container.innerHTML = '';

    // 2. Render estructura básica (sin datos)
    container.innerHTML = this._getHTML();

    // 3. Cargar datos (async)
    await this._loadData(container);

    // 4. Attach event listeners
    this._attachEventListeners(container);
  },

  // HTML template
  _getHTML: () => {
    return `
      <section class="page">
        <div class="page__header">
          <h1>Título</h1>
          <button id="action-btn">Acción</button>
        </div>
        <div id="content-container">
          <p class="loading">Cargando...</p>
        </div>
      </section>
    `;
  },

  // Data loading
  _loadData: async (container) => {
    const contentContainer = container.querySelector('#content-container');

    try {
      // Mostrar loading
      contentContainer.innerHTML = '<p class="loading">Cargando...</p>';

      // Fetch data
      const data = await SomeService.getAll();

      // Render data
      if (data.length === 0) {
        this._renderEmptyState(contentContainer);
      } else {
        this._renderData(contentContainer, data);
      }

    } catch (error) {
      this._renderErrorState(contentContainer, error);
    }
  },

  // Event handlers
  _attachEventListeners: (container) => {
    const btn = container.querySelector('#action-btn');
    btn.addEventListener('click', () => this._handleAction());
  },

  // Specific renders
  _renderData: (container, data) => {
    // Usar componentes
    Table.render(container, { columns: [...], data });
  },

  _renderEmptyState: (container) => {
    container.innerHTML = `
      <div class="empty-state">
        <p>No hay datos</p>
        <button id="btn-create">Crear</button>
      </div>
    `;
  },

  _renderErrorState: (container, error) => {
    container.innerHTML = `
      <div class="error-state">
        <p class="error">${error.message}</p>
        <button id="btn-retry">Reintentar</button>
      </div>
    `;

    container.querySelector('#btn-retry').addEventListener('click', () => {
      this._loadData(container);
    });
  },

  // Action handlers
  _handleAction: () => {
    // Implementar acción
  }
};

export default PageName;
```

---

### Pattern 3: Component Creation

```javascript
// Template para componentes reutilizables

const ComponentName = {
  /**
   * Renderiza el componente
   * @param {HTMLElement} container - Donde renderizar
   * @param {Object} config - Configuración
   */
  render: (container, config) => {
    // 1. Validar config
    this._validateConfig(config);

    // 2. Construir HTML
    const html = this._buildHTML(config);

    // 3. Insertar en DOM
    container.innerHTML = html;

    // 4. Attach events (si es necesario)
    this._attachEvents(container, config);
  },

  // Validación de props/config
  _validateConfig: (config) => {
    if (!config.requiredProp) {
      throw new Error('requiredProp is required');
    }
  },

  // Construcción de HTML
  _buildHTML: (config) => {
    return `
      <div class="component">
        <h3>${config.title}</h3>
        <div class="component__content">
          ${config.content}
        </div>
      </div>
    `;
  },

  // Event handlers
  _attachEvents: (container, config) => {
    if (config.onClick) {
      const element = container.querySelector('.component');
      element.addEventListener('click', config.onClick);
    }
  }
};

export default ComponentName;
```

---

## 🐛 Debugging During Development

### Técnicas de debugging

#### 1. Console.log estratégico
```javascript
async deposit(accountId, amount, description) {
  console.log('🔵 deposit() called:', { accountId, amount, description });

  // Validaciones
  console.log('✓ Validations passed');

  // Business logic
  const account = await AccountService.getById(accountId);
  console.log('📊 Account fetched:', account);

  const transaction = this._buildTransaction(accountId, amount, description);
  console.log('📝 Transaction built:', transaction);

  await this.repository.save(transaction);
  console.log('✓ Transaction saved');

  account.balance += amount;
  console.log('💰 New balance:', account.balance);

  await AccountService.update(accountId, { balance: account.balance });
  console.log('✓ Balance updated');

  return transaction;
}

// Limpiar console.logs antes de commit
```

#### 2. Debugger statements
```javascript
async deposit(accountId, amount, description) {
  debugger; // ← Pausa ejecución aquí

  const account = await AccountService.getById(accountId);

  debugger; // ← Inspecciona account

  // ...
}
```

**Uso:**
- Abrir DevTools
- Refresh página
- Código pausa en `debugger`
- Inspeccionar variables, step through

#### 3. Assert durante desarrollo
```javascript
function calculateBalance(transactions) {
  const balance = transactions.reduce((sum, t) => {
    if (t.type === 'deposito') return sum + t.amount;
    if (t.type === 'retiro') return sum - t.amount;
    return sum;
  }, 0);

  // Assert durante desarrollo
  console.assert(balance >= 0, 'Balance should never be negative!', balance);

  return balance;
}
```

---

## 📦 Commits Atómicos

### Anatomía de un buen commit

```markdown
## Estructura de commit
<type>: <subject>

<body (opcional)>

<footer (opcional)>
```

### Types
- **feat:** Nueva funcionalidad
- **fix:** Corrección de bug
- **refactor:** Cambio de código sin cambiar funcionalidad
- **docs:** Solo documentación
- **style:** Formato (espacios, indentación, NO lógica)
- **test:** Agregar/modificar tests
- **chore:** Mantenimiento (deps, config)
- **perf:** Mejora de performance

### Subject (primera línea)
- Imperativo ("add" no "added")
- Máximo 72 caracteres
- No punto al final
- Descripción clara y concisa

### Ejemplos de buenos commits
```bash
feat: add deposit method to TransactionService

Implements deposit logic with validations:
- Amount must be positive
- Account must exist
- Updates account balance atomically

Closes #12

---

fix: prevent negative balance in withdrawals

Added validation to check sufficient funds before
allowing withdrawal. Throws InsufficientFundsError
with clear message.

---

refactor: extract validation logic to separate service

Moved all validation functions from accountService
to validationService for better reusability.

---

docs: add API documentation for AccountService

Documents all public methods with:
- Parameters and types
- Return values
- Possible errors
- Usage examples

---

style: format code with prettier

No functional changes.

---

test: add unit tests for deposit method

Coverage:
- Valid deposit
- Negative amount (error)
- Non-existent account (error)

---

chore: update dependencies to latest versions

Updated vite from 4.5.0 to 5.0.0
```

### Ejemplos de malos commits
```bash
# ❌ Muy vago
git commit -m "changes"
git commit -m "update"
git commit -m "fix"

# ❌ Demasiado en un commit (no atómico)
git commit -m "add deposits, withdrawals, transfers, and fix 3 bugs"

# ❌ Mezcla de concerns
git commit -m "add feature and fix unrelated bug"

# ❌ WIP (Work in Progress) sin contexto
git commit -m "wip"
git commit -m "almost done"
```

---

### Estrategia de commits por incremento

```markdown
## Incremento 1: Service Layer
**Commits:**
1. "feat: add deposit method skeleton"
2. "feat: add validations to deposit method"
3. "feat: implement balance update in deposit"
4. "test: add manual test cases for deposit"

## Incremento 2: UI Layer
**Commits:**
1. "feat: add deposit form HTML structure"
2. "style: add CSS for deposit form"
3. "feat: add form validation on client side"

## Incremento 3: Integration
**Commits:**
1. "feat: connect deposit form with TransactionService"
2. "feat: add success and error handling"
3. "improve: add loading state during deposit"

## Incremento 4: Polish
**Commits:**
1. "fix: handle edge cases in deposit"
2. "improve: enhance UX with keyboard shortcuts"
3. "refactor: extract duplicate validation logic"

**Total:** 11 commits para 1 User Story de 5 pts
**Promedio:** 1 commit cada 30-45 min
```

---

## 🔄 Daily Development Workflow

### Workflow completo de un día típico

```markdown
## 09:00 - Inicio del día (15 min)

### Checklist:
- [ ] Revisar plan del día (definido ayer o ahora)
- [ ] Abrir docs relevantes (US, diseño técnico)
- [ ] `git pull origin main` (si colaborativo)
- [ ] `git checkout -b feature/nombre` (si es nueva feature)
- [ ] Levantar dev server: `npm run dev`
- [ ] Abrir browser + DevTools

---

## 09:15 - Primera sesión de código (90 min)

### 09:15-09:40: Pomodoro 1 - Implementar
- Escribir código según diseño
- Enfoque total, sin distracciones

### 09:40-09:45: Break

### 09:45-10:10: Pomodoro 2 - Probar
- Testing manual en browser/console
- Corregir errores encontrados

### 10:10-10:15: Break

### 10:15-10:40: Pomodoro 3 - Refactor & Commit
- Refactorizar código
- Commit: "feat: ..."
- Push: `git push origin feature-branch`

### 10:40-10:55: Long Break

---

## 11:00 - Segunda sesión (90 min)

[Repetir estructura Pomodoro]

**Objetivo:** Completar siguiente incremento

---

## 12:30 - Almuerzo (60 min)

**NO programar durante almuerzo** (burnout)

---

## 13:30 - Tercera sesión (90 min)

[Repetir estructura Pomodoro]

---

## 15:00 - Cuarta sesión (opcional, 90 min)

Si tienes energía y tiempo.

---

## 16:30 - Cierre del día (15-30 min)

### Checklist:
- [ ] Commit de cualquier trabajo incompleto:
      ```bash
      git add .
      git commit -m "wip: deposit form - form validates, integration pending"
      ```
- [ ] Push todos los commits: `git push origin feature-branch`
- [ ] Actualizar docs/PROGRESS.md:
      ```markdown
      ## 2026-03-20
      - ✅ Implementado deposit() en TransactionService (3 commits)
      - 🏗️ UI del form 70% completa (1 commit)
      - ⏭️ Mañana: completar integración + testing
      ```
- [ ] Revisar DoD: ¿qué falta para marcar US como Done?
- [ ] Planificar mañana:
      - Tareas específicas
      - Tiempo estimado
      - Prioridad

### Reflexión (5 min):
- ¿Qué salió bien hoy?
- ¿Qué bloqueó mi progreso?
- ¿Qué aprendí?
- ¿Estoy on-track con el sprint?

---

**Commits del día:** ___ (meta: 3-5)
**Progreso:** ___% de la US actual
**Moral:** 😃 😐 😔
```

---

## 🛠️ Herramientas de Desarrollo

### Setup de Dev Environment

```markdown
## Herramientas esenciales

### 1. Editor: VS Code
**Extensiones recomendadas:**
- ESLint (linting)
- Prettier (formatting)
- Live Server (dev server)
- GitLens (git history)
- Error Lens (errores inline)
- Auto Rename Tag (paired tags)

**Settings:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.autoSave": "onFocusChange"
}
```

### 2. Dev Server: Vite (o Live Server)
```bash
npm install -D vite
```

**vite.config.js:**
```javascript
export default {
  server: {
    port: 3000,
    open: true
  }
};
```

**Scripts en package.json:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 3. Debugging: Chrome DevTools
**Shortcuts útiles:**
- `Cmd/Ctrl + Shift + C`: Inspector
- `Cmd/Ctrl + Shift + J`: Console
- `Cmd/Ctrl + P`: Buscar archivo
- `Cmd/Ctrl + Shift + P`: Command palette

**Breakpoints:**
- Click en número de línea en Sources tab
- `debugger;` statement en código

**Console avanzado:**
```javascript
// Grupos
console.group('Account Creation');
console.log('Validating...');
console.log('Creating...');
console.groupEnd();

// Tablas
console.table(accounts);

// Timers
console.time('load-accounts');
await AccountService.getAll();
console.timeEnd('load-accounts'); // "load-accounts: 234ms"

// Asserts
console.assert(balance >= 0, 'Balance should not be negative');
```

### 4. Version Control: Git + GitHub
```bash
# Aliases útiles
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit

# Log bonito
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# Usar:
git lg  # Ver commits con gráfico
```

### 5. JSON Server (para desarrollo con db.json)
```bash
npm install -g json-server

# Run
json-server --watch db.json --port 3001
```

**API automática:**
- GET /accounts → todas las cuentas
- GET /accounts/:id → cuenta por ID
- POST /accounts → crear cuenta
- PUT /accounts/:id → actualizar
- DELETE /accounts/:id → eliminar

---

## Hot Reloading Setup

### Con Vite
Automático, solo guarda el archivo.

### Con Live Server (VS Code)
Automático al guardar HTML/CSS/JS.

### Sin herramientas
```javascript
// Auto-reload en desarrollo
if (import.meta.env.DEV) {
  new EventSource('/esbuild').addEventListener('change', () => {
    location.reload();
  });
}
```
```

---

## 📊 Tracking de Progreso

### Actualizar progreso diariamente

**Archivo:** `docs/PROGRESS.md`

```markdown
# Progress Tracker

## Sprint Actual: Sprint 2
**Objetivo:** Implementar transacciones básicas
**Fechas:** 2026-03-20 al 2026-04-03

---

## Semana 1

### Lunes 2026-03-20
**Horas:** 4 horas
**Completado:**
- ✅ US-007: deposit() method implemented (3 commits)
- ✅ UI form for deposits (2 commits)

**En progreso:**
- 🏗️ US-007: Integration (50% done)

**Bloqueadores:**
- Ninguno

**Aprendizajes:**
- FormData API facilita captura de form data
- crypto.randomUUID() no disponible en HTTP (solo HTTPS)

**Próximo día:**
- Completar integración de deposit form
- Testing exhaustivo

---

### Martes 2026-03-21
**Horas:** 5 horas
**Completado:**
- ✅ US-007: Registrar depósito (COMPLETA)
  Commits: 7 total
  Tiempo real: 5 horas (estimado: 5 pts ✓)

**En progreso:**
- 🏗️ US-008: Withdraw method (25% done)

**Bloqueadores:**
- Ninguno

**Próximo día:**
- Completar US-008

---

### Miércoles 2026-03-22
[Continuar...]

---

## Métricas del Sprint

**Velocity:**
- Planeada: 13 pts
- Completada hasta ahora: 5 pts
- Días transcurridos: 2 / 10
- Ritmo: On track ✅

**Commits:**
- Total: 12
- Promedio: 6 por día
- Calidad: Todos atómicos ✓

**Horas:**
- Planeadas por sprint: 25 hrs
- Usadas hasta ahora: 9 hrs
- Restantes: 16 hrs
```

---

## 🎯 Checklist por Incremento

```markdown
## Template: Implementar Incremento

### Pre-implementación (5 min)
- [ ] Leer diseño técnico del incremento
- [ ] Entender qué archivos modificar
- [ ] Tener claro el objetivo (1 frase)

### Implementación (30-60 min)
- [ ] Escribir código siguiendo diseño
- [ ] Consultar CONVENTIONS.md para estilo
- [ ] Hacer código funcionar (no perfecto)

### Testing (10-15 min)
- [ ] Probar happy path
- [ ] Probar 2-3 casos edge
- [ ] Verificar sin errores en consola
- [ ] Ajustar código según errores

### Refactor (10-15 min)
- [ ] Extraer código duplicado
- [ ] Mejorar nombres de variables/funciones
- [ ] Agregar comentarios si lógica es compleja
- [ ] Eliminar console.logs de debugging

### Commit (5 min)
- [ ] Stage archivos específicos: `git add <files>`
- [ ] Commit con mensaje descriptivo
- [ ] Verificar: `git log` y `git diff HEAD~1`
- [ ] Push: `git push origin feature-branch`

### Transición (5 min)
- [ ] Marcar incremento como completado
- [ ] Actualizar PROGRESS.md (si es significativo)
- [ ] Planear siguiente incremento

---

**Total por incremento:** 60-110 min
**Resultado:** 1 feature pequeña funcional + 1 commit
```

---

## 🚨 Señales de que vas mal

### Red Flags durante desarrollo

#### 🚩 Flag 1: Reescribiendo constantemente
**Síntoma:** Borras y reescribes el mismo código 3+ veces
**Causa:** Diseño insuficiente o no seguiste el diseño
**Solución:**
- PAUSA, no sigas escribiendo código
- Vuelve a leer docs/designs/DESIGN_US_XXX.md
- Si el diseño está mal, actualiza diseño primero
- Si no entiendes el diseño, clarifica antes de codificar

#### 🚩 Flag 2: No sabes qué archivo modificar
**Síntoma:** Abres 10 archivos tratando de encontrar dónde va el código
**Causa:** Arquitectura no clara o no documentada
**Solución:**
- Leer docs/ARCHITECTURE.md
- Si falta claridad, crear diagrama de la feature específica
- No adivinar, pregunta o investiga

#### 🚩 Flag 3: Errores en cadena
**Síntoma:** Arreglas un error, aparecen 2 más
**Causa:** Cambio muy grande sin testing incremental
**Solución:**
- Git reset al último commit bueno: `git reset --hard HEAD~1`
- Implementar en incrementos más pequeños
- Probar cada cambio inmediatamente

#### 🚩 Flag 4: Lleva 2x el tiempo estimado
**Síntoma:** Estimaste 2 horas, llevas 4 y sigues bloqueado
**Causa:** Subestimación o bloqueador técnico no anticipado
**Solución:**
- Identificar bloqueador específico
- Hacer spike para resolverlo (time-box 1 hora)
- Si sigue bloqueado después de spike, escalar (pedir ayuda)
- Actualizar estimación en BACKLOG para futuras US similares

#### 🚩 Flag 5: No has commiteado en 2+ horas
**Síntoma:** Mucho código sin commit
**Causa:** Incremento muy grande o inseguridad
**Solución:**
- Commit ahora aunque no esté perfecto: "wip: feature-name"
- Dividir trabajo en partes más pequeñas
- Recordar: commit != release, puede ser WIP

#### 🚩 Flag 6: Código duplicado en 3+ lugares
**Síntoma:** Copy-paste del mismo bloque
**Causa:** No refactorizaste a tiempo
**Solución:**
- PAUSA desarrollo de features nuevas
- Refactor ahora (extract function/component)
- Commit refactor: "refactor: extract X to Y"
- Continuar con features

---

## 🔥 Manejo de Bloqueadores

### Tipos de bloqueadores y soluciones

```markdown
## Bloqueador Técnico (no sé cómo hacer X)

**Solución:**
1. Google: "[problema] vanilla javascript"
2. StackOverflow
3. Documentación oficial (MDN para JS)
4. Hacer spike (time-box 1 hora)
5. Si aún bloqueado: preguntar en comunidades (Discord, Reddit)

**No hacer:**
- NO pasar días bloqueado en silencio
- NO implementar algo que no entiendes completamente

---

## Bloqueador de Requisitos (no sé qué construir)

**Solución:**
1. Volver a docs/user-stories/US-XXX.md
2. Si no está claro allí, volver a Fase 2 (análisis)
3. Clarificar requisitos ANTES de seguir codificando

**No hacer:**
- NO adivinar qué quiere el usuario
- NO seguir codificando con supuestos

---

## Bloqueador de Diseño (no sé dónde va este código)

**Solución:**
1. Leer docs/ARCHITECTURE.md
2. ¿Es lógica de negocio? → Service
3. ¿Es acceso a datos? → Repository
4. ¿Es UI? → Component o Page
5. Si sigue confuso, crear mini-diagram

---

## Bloqueador Personal (cansancio, falta de motivación)

**Solución:**
- Si es cansancio: PAUSA, descanso real
- Si es aburrimiento: trabaja en feature más interesante (ajustar sprint)
- Si es frustración: pedir ayuda, pair programming
- Si es burnout: tomar días off, revisar workload

**Recordar:**
- Es un proyecto personal/educativo
- No hay deadlines críticos
- Calidad > rapidez
```

---

## 🧪 Testing Durante Desarrollo

### Niveles de testing en desarrollo

#### Nivel 1: Syntax Check (Inmediato)
```markdown
- Editor muestra errores (ESLint)
- Guardar archivo → ver errores
- Corregir antes de testear

**Meta:** 0 errores de sintaxis antes de test funcional
```

#### Nivel 2: Console Testing (Cada 15-30 min)
```javascript
// Mientras desarrollas, probar en consola

// Test rápido de función
import AccountService from './services/accountService.js';
const accounts = await AccountService.getAll();
console.log(accounts);

// Test de validación
try {
  await AccountService.create({ name: '', type: 'ahorro' });
} catch (e) {
  console.log('✓ Error esperado:', e.message);
}
```

#### Nivel 3: UI Testing (Cada incremento completo)
```markdown
- Navegar a la página en browser
- Interactuar como usuario
- Verificar estados: loading, success, error, empty
- Verificar en diferentes navegadores (al menos Chrome + Firefox)

**Checklist:**
- [ ] Happy path funciona
- [ ] Error state muestra mensaje claro
- [ ] Empty state apropiado
- [ ] Loading state visible
- [ ] No errores en consola
```

#### Nivel 4: Edge Case Testing (Antes de marcar Done)
```markdown
- Probar con datos límite
- Probar cada caso edge documentado
- Probar flujos alternativos
- Regression testing (features antiguas siguen funcionando)

**Marcar:** Lista de edge cases en US document
```

---

## 📝 Documentación Durante Desarrollo

### Qué documentar mientras programas

#### 1. Comments en código (selectivo)
```javascript
// ✅ Comentar: Decisiones no obvias
// Usamos setTimeout para permitir que el DOM se actualice antes de calcular altura
setTimeout(() => calculateHeight(), 0);

// ✅ Comentar: Lógica compleja
// Calculamos balance considerando transacciones pendientes porque
// queremos mostrar al usuario el dinero realmente disponible, no solo el registrado
const availableBalance = balance - pendingAmount - reservedAmount;

// ✅ Comentar: Workarounds temporales
// TODO: Remover este hack cuando actualicemos a Vite 5.x
// Workaround para bug en Vite 4.5 con dynamic imports
const module = await import(`./${name}.js`);

// ✅ Comentar: TODOs
// TODO: Optimizar para arrays > 1000 elementos (usar virtualization)
items.forEach(item => renderItem(item));

// ❌ NO comentar: Obviedades
// Incrementa el contador en 1
counter++;

// ❌ NO comentar: Qué hace (el código ya lo dice)
// Obtiene todas las cuentas
function getAll() { return accounts; }
```

#### 2. Actualizar CHANGELOG.md (al completar US)
```markdown
## [Unreleased]

### Added
- Página de cuentas con visualización de lista (#001)
- Formulario para crear nuevas cuentas (#002)
- Registro de depósitos en cuentas (#007)

### Fixed
- Balance no se actualizaba después de transferencia (#bug-12)

### Changed
- Mejorado performance de carga de transacciones (cache)
```

#### 3. Actualizar README.md (si hay cambios de setup)
Solo si:
- Agregaste nueva dependencia
- Cambió el proceso de instalación
- Nuevos scripts en package.json
- Nuevas variables de entorno

---

## 🎯 Entregables de la Fase 4

### Por cada día de desarrollo:
- [x] 3-5 commits atómicos
- [x] Código probado manualmente
- [x] docs/PROGRESS.md actualizado
- [x] Todo pusheado a remote

### Por cada incremento:
- [x] Feature pequeña funcional
- [x] 1-2 commits
- [x] Testing de ese incremento
- [x] Sin errores en consola

### Por cada User Story:
- [x] Todos los incrementos completados
- [x] Definition of Done cumplida
- [x] Suite completa de testing manual realizada
- [x] CHANGELOG.md actualizado
- [x] Feature functional, sin bugs críticos
- [x] Merged a main (o ready to merge)

### Por cada Sprint:
- [x] Todas las US del sprint completadas (o justificado carry-over)
- [x] docs/sprints/SPRINT_X_RETRO.md creado
- [x] Velocity real calculada
- [x] Demo funcional del sprint

---

## 🚦 Criterios de Salida (completar User Story)

Una US está lista para marcar como Done cuando:

**Funcionalidad:**
- [x] Todos los criterios de aceptación pasan
- [x] Happy path funciona sin errores
- [x] Casos edge manejados
- [x] Flujos alternativos implementados

**Código:**
- [x] Sigue convenciones del proyecto
- [x] Sin código comentado
- [x] Sin console.logs de debugging
- [x] Nombres claros y descriptivos
- [x] DRY (sin duplicación)

**Testing:**
- [x] Probado manualmente en browser
- [x] Todos los test cases del análisis ejecutados
- [x] Regression check (features viejas funcionan)
- [x] Sin errores en consola

**Control de versión:**
- [x] 3+ commits atómicos realizados
- [x] Mensajes de commit descriptivos
- [x] Código pusheado a remote
- [x] Branch ready para merge (o ya merged)

**Documentación:**
- [x] CHANGELOG.md actualizado
- [x] Comentarios en código complejo (si aplica)

**Review:**
- [x] Auto code-review realizado
- [x] Definition of Done cumplida 100%

---

## 💡 Best Practices de Desarrollo

### ✅ DO (Hacer):

#### 1. Commit temprano y frecuente
```bash
# Cada 30-60 min de trabajo productivo
git add src/services/accountService.js
git commit -m "feat: add validation to account creation"
```

**Por qué:** Fácil revertir si algo sale mal

#### 2. Probar en navegador constantemente
```markdown
- Escribes 20-30 líneas → refresh browser → verificar
- NO esperar a terminar todo para probar
```

**Por qué:** Detectar errores temprano es más fácil de arreglar

#### 3. Refactorizar inmediatamente
```markdown
Si ves código duplicado → refactor AHORA
Si un nombre no es claro → cambiar AHORA
Si una función hace 3 cosas → split AHORA
```

**Por qué:** Deuda técnica acumulada es difícil de pagar después

#### 4. Leer código antes de modificar
```javascript
// Antes de modificar TransactionsPage.js
// 1. Leer el archivo completo (5 min)
// 2. Entender estructura actual
// 3. Identificar dónde va el cambio
// 4. Seguir patrones existentes
```

**Por qué:** Consistencia, evita romper código existente

#### 5. Baby steps en cambios grandes
```markdown
Gran refactor:
1. Commit código actual (safety net)
2. Cambiar 1 archivo
3. Probar que funciona
4. Commit
5. Siguiente archivo
6. Repetir
```

**Por qué:** Si algo se rompe, sabes exactamente qué lo rompió

---

### ❌ DON'T (No hacer):

#### 1. No codificar sin diseño
```markdown
❌ "Voy a empezar a codificar y veo qué sale"
✅ "Leí el diseño, sé qué construir, empiezo"
```

#### 2. No mezclar cambios en un commit
```bash
# ❌ Malo
git commit -m "add deposits, fix bug, refactor accounts, update styles"

# ✅ Bueno
git commit -m "feat: add deposit functionality"
git commit -m "fix: account balance not updating"
git commit -m "refactor: extract validation logic"
git commit -m "style: update button styles"
```

#### 3. No commitear código que no compila/corre
```bash
# Si tiene errores de sintaxis o runtime, NO commitear
# Excepción: WIP commits explícitos

# ✅ WIP commit
git commit -m "wip: deposit form - validation pending"
```

#### 4. No dejar TODOs sin tracking
```javascript
// ❌ TODO sin contexto
// TODO: fix this

// ✅ TODO con contexto y tracking
// TODO(#23): Optimize for large arrays (> 1000 items)
// Priority: Low, planned for v1.2
```

#### 5. No ignorar warnings
```javascript
// ❌ "Es solo un warning, lo ignoro"
// ✅ Investigar por qué está el warning, arreglarlo o justificar
```

---

## 🎓 Técnicas Avanzadas

### Técnica 1: Feature Flags

Para desarrollar features grandes sin romper main:

```javascript
// constants.js
export const FEATURE_FLAGS = {
  ENABLE_ADVANCED_FILTERS: false,  // ← En desarrollo
  ENABLE_CHARTS: false,
  ENABLE_EXPORT: true               // ← Completo
};

// Uso en código
import { FEATURE_FLAGS } from './utils/constants.js';

if (FEATURE_FLAGS.ENABLE_ADVANCED_FILTERS) {
  // Código de la feature nueva
  renderAdvancedFilters();
}
```

**Beneficio:** Merge a main aunque feature no esté completa

---

### Técnica 2: Branch per Feature (Git Flow)

```bash
# Crear branch para feature
git checkout -b feature/advanced-filters

# Desarrollar en commits pequeños
git commit -m "feat: add date range filter"
git commit -m "feat: add amount range filter"
git commit -m "feat: integrate filters with UI"

# Cuando esté completa
git checkout main
git merge feature/advanced-filters
git branch -d feature/advanced-filters
```

**Ventaja:** Main siempre estable

---

### Técnica 3: Stash para cambios rápidos

```bash
# Estás en feature/deposits, necesitas fix urgente en main
git stash save "WIP: deposit form integration"

git checkout main
git checkout -b fix/urgent-bug
# ... fix bug ...
git commit -m "fix: critical bug"
git checkout main
git merge fix/urgent-bug

git checkout feature/deposits
git stash pop  # Recuperar trabajo
```

---

### Técnica 4: Git Hooks (Automatización)

**Pre-commit hook** (ejecuta antes de cada commit):

```bash
# .git/hooks/pre-commit
#!/bin/bash

echo "Running pre-commit checks..."

# Lint
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Lint failed. Fix errors before commit."
  exit 1
fi

# Format check
npm run format:check
if [ $? -ne 0 ]; then
  echo "⚠️  Code not formatted. Running formatter..."
  npm run format
  git add -A
fi

echo "✅ Pre-commit checks passed"
exit 0
```

**Hacer ejecutable:**
```bash
chmod +x .git/hooks/pre-commit
```

---

### Técnica 5: Rubber Duck Debugging

Cuando estés bloqueado:
1. Explicar el problema en voz alta (a un patito de hule, o a ti mismo)
2. Explicar qué debería pasar
3. Explicar qué está pasando
4. Explicar qué has intentado
5. Mientras explicas, usualmente encuentras la solución

---

## 📚 Templates de Código

### Template: Implementar Service Method

```javascript
/**
 * [Descripción del método]
 * @param {Type} param - Descripción
 * @returns {Promise<Type>} Descripción
 * @throws {ErrorType} Cuando...
 */
async methodName(param) {
  // ===== VALIDACIONES =====
  // Fail fast: validar todo al inicio
  if (!param) {
    throw new ValidationError('param is required');
  }

  // ===== OBTENER DATOS NECESARIOS =====
  // Llamar a otros services/repositories
  const data = await SomeService.getSomething();

  // ===== LÓGICA DE NEGOCIO =====
  // Aplicar reglas, transformaciones
  const result = this._applyBusinessLogic(data, param);

  // ===== PERSISTENCIA =====
  // Guardar cambios
  try {
    await this.repository.save(result);
  } catch (error) {
    // Manejar errores específicos
    if (error.name === 'DuplicateError') {
      throw new BusinessRuleError('Already exists');
    }
    throw error;
  }

  // ===== SIDE EFFECTS (opcional) =====
  // Actualizar otros recursos, emitir eventos
  await this._updateRelatedResources(result);

  // ===== RETURN =====
  return result;
}

// ===== MÉTODOS PRIVADOS =====
_applyBusinessLogic(data, param) {
  // Extraer lógica compleja a métodos privados
  // Más fácil de testear y entender
}
```

---

### Template: Implementar Page

```javascript
const PageName = {
  // ===== STATE (si es necesario) =====
  _state: {
    data: [],
    loading: false,
    error: null
  },

  // ===== ENTRY POINT =====
  render: async (container) => {
    // 1. Setup estructura básica
    container.innerHTML = this._getHTML();

    // 2. Load data
    await this._loadData(container);

    // 3. Attach eventos
    this._attachEventListeners(container);
  },

  // ===== HTML TEMPLATE =====
  _getHTML: () => {
    return `
      <section class="page">
        <header class="page__header">
          <h1>Título</h1>
          <button id="btn-action" class="btn btn--primary">
            Acción
          </button>
        </header>

        <main id="page-content" class="page__content">
          <!-- Content se inyecta aquí -->
        </main>
      </section>
    `;
  },

  // ===== DATA LOADING =====
  _loadData: async (container) => {
    const content = container.querySelector('#page-content');

    try {
      // Set loading state
      this._setState({ loading: true, error: null });
      content.innerHTML = '<p class="loading">Cargando...</p>';

      // Fetch data
      const data = await SomeService.getAll();

      // Update state
      this._setState({ data, loading: false });

      // Render based on data
      if (data.length === 0) {
        this._renderEmptyState(content);
      } else {
        this._renderContent(content, data);
      }

    } catch (error) {
      // Set error state
      this._setState({ error, loading: false });
      this._renderErrorState(content, error);
    }
  },

  // ===== EVENT HANDLERS =====
  _attachEventListeners: (container) => {
    const btnAction = container.querySelector('#btn-action');
    btnAction?.addEventListener('click', () => this._handleAction());
  },

  _handleAction: async () => {
    // Handle user action
  },

  // ===== RENDER METHODS =====
  _renderContent: (container, data) => {
    // Usar componentes
    Component.render(container, { data });
  },

  _renderEmptyState: (container) => {
    container.innerHTML = `
      <div class="empty-state">
        <p>No hay datos</p>
        <button id="btn-create" class="btn">Crear</button>
      </div>
    `;

    container.querySelector('#btn-create').addEventListener('click', () => {
      this._handleCreate();
    });
  },

  _renderErrorState: (container, error) => {
    container.innerHTML = `
      <div class="error-state">
        <p class="error">Error: ${error.message}</p>
        <button id="btn-retry" class="btn">Reintentar</button>
      </div>
    `;

    container.querySelector('#btn-retry').addEventListener('click', () => {
      this._loadData(container.parentElement);
    });
  },

  // ===== STATE MANAGEMENT (simple) =====
  _setState: (newState) => {
    this._state = { ...this._state, ...newState };
  },

  _getState: () => {
    return this._state;
  }
};

export default PageName;
```

---

### Template: Implementar Component

```javascript
/**
 * [ComponentName] - [Descripción breve]
 *
 * @example
 * ComponentName.render(container, {
 *   prop1: 'value',
 *   prop2: 123
 * });
 */
const ComponentName = {
  /**
   * Renderiza el componente
   * @param {HTMLElement} container - Contenedor donde renderizar
   * @param {Object} config - Configuración
   * @param {string} config.requiredProp - Descripción
   * @param {Function} [config.optionalCallback] - Descripción
   */
  render: (container, config) => {
    // 1. Validar configuración
    this._validateConfig(config);

    // 2. Construir y renderizar
    const element = this._build(config);
    container.appendChild(element);

    // 3. Setup (si necesario)
    this._setup(element, config);

    // 4. Return element (para referencia)
    return element;
  },

  // ===== PRIVATE METHODS =====
  _validateConfig: (config) => {
    if (!config.requiredProp) {
      throw new Error('requiredProp is required');
    }
  },

  _build: (config) => {
    const div = document.createElement('div');
    div.className = 'component-name';
    div.innerHTML = `
      <div class="component-name__header">
        ${config.requiredProp}
      </div>
    `;
    return div;
  },

  _setup: (element, config) => {
    // Event listeners, etc.
    if (config.optionalCallback) {
      element.addEventListener('click', config.optionalCallback);
    }
  }
};

export default ComponentName;
```

---

## 🔄 Weekly Development Workflow

### Lunes: Planning + Setup

```markdown
**Duración:** 2-3 horas

### Morning (9:00-11:00)
- [ ] Sprint planning (si es inicio de sprint)
- [ ] Revisar BACKLOG.md y seleccionar US
- [ ] Leer análisis y diseño de US del sprint
- [ ] Identificar primera US a implementar
- [ ] Desglosar primera US en incrementos (en papel o doc)

### Afternoon (14:00-17:00)
- [ ] Setup environment (dependencias, etc.)
- [ ] Empezar implementación del primer incremento
- [ ] Meta: 1-2 commits hoy

**Commit antes de terminar el día** (aunque sea WIP)
```

---

### Martes-Jueves: Implementación Full

```markdown
**Duración:** 4-5 horas/día

### Estructura del día:
- 09:00-10:30: Sesión 1 (Pomodoros 1-3) → 1-2 commits
- 11:00-12:30: Sesión 2 (Pomodoros 4-6) → 1-2 commits
- 14:00-15:30: Sesión 3 (Pomodoros 7-9) → 1-2 commits
- 16:00-17:00: Testing + Cleanup → 1 commit

**Meta:** Completar 1 US en 2-3 días
**Meta commits:** 4-6 por día
```

---

### Viernes: Testing + Review + Retro

```markdown
**Duración:** 3-4 horas

### Morning (9:00-12:00): Testing Exhaustivo
- [ ] Regression testing (todas las features)
- [ ] Edge cases de la semana
- [ ] Testing en diferentes browsers
- [ ] Performance check (Lighthouse)
- [ ] Fix bugs encontrados

### Afternoon (14:00-17:00): Review + Retro
- [ ] Auto code-review de código de la semana
- [ ] Refactorizar si encontraste duplicación
- [ ] Actualizar documentación (CHANGELOG, README)
- [ ] Retrospectiva:
      - ¿Qué salió bien?
      - ¿Qué salió mal?
      - ¿Qué mejorar próxima semana?
- [ ] Planning de próxima semana

**Meta:** Dejar código limpio y estable para el fin de semana
```

---

## 🎬 Conclusión de la Fase 4

### ¿Qué produces en esta fase?
- ✅ Código funcional
- ✅ Features implementadas
- ✅ Commits consistentes
- ✅ Software que se puede usar (aunque sea MVP)

### Características del buen código de Fase 4:
- Funciona (pasa criterios de aceptación)
- Es mantenible (estructura clara, nombres buenos)
- Está testeado (manual mínimo)
- Está documentado (comments críticos + CHANGELOG)
- Está versionado (commits atómicos)

### Siguiente paso:
➡️ **Fase 5: Pruebas** (testing exhaustivo antes de release)

**Nota:** Fase 4 y Fase 5 se solapan. Testing básico es continuo durante Fase 4. Fase 5 es testing exhaustivo al finalizar.

---

**Recuerda:**
> "Código sin tests es código legado desde el día 1."
> "Commit temprano, commit frecuente, commit atómico."
> "No escribas código perfecto, escribe código funcional y refactoriza."

La Fase 4 es donde pasas el 70% de tu tiempo. Domínala y el proyecto fluye.
