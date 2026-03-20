# Fase 5: Pruebas (Testing)
## Verificar que el software funciona correctamente

**Duración estimada:** Continuo durante desarrollo + 1 semana intensiva antes de release
**Prerequisito:** Fase 4 (código implementado)
**Cuándo usar:** Durante TODO el desarrollo + testing exhaustivo pre-release

---

## 🎯 Objetivo de esta fase
Garantizar calidad y detectar errores antes que usuarios:
- Testing funcional (¿hace lo que debe hacer?)
- Testing de regresión (¿rompimos algo existente?)
- Testing de usabilidad (¿es fácil de usar?)
- Testing de performance (¿es suficientemente rápido?)
- Testing cross-browser (¿funciona en todos lados?)

**Regla de oro:** Si no está testeado, no funciona. Un bug encontrado en testing es 10x más barato que un bug encontrado por usuario.

---

## 📋 Niveles de Testing

### Pirámide de Testing

```
         /\
        /  \
       / E2E \      ← Pocos (2-5% tests)
      /──────\
     / Integr.\     ← Algunos (20-30% tests)
    /──────────\
   /   Unit     \   ← Muchos (70-80% tests)
  /──────────────\
```

**Para MVP sin tests automatizados:**
```
         /\
        /  \
       /Manual \    ← Checklist exhaustivo
      / E2E    \
     /──────────\
    /  Manual    \  ← Checklist por feature
   / Integration \
  /─────────────────\
```

---

## 🔬 Testing Manual (Para MVP)

### Nivel 1: Unit Testing Manual (Durante desarrollo)

#### Por cada función/método:

```markdown
## Manual Unit Test Checklist

### Función: AccountService.create()

#### Test Cases (ejecutar en consola)

**Test 1: Happy Path**
```javascript
const account = await AccountService.create({
  name: 'Test Account',
  type: 'ahorro',
  balance: 1000
});

// Verificar:
console.assert(account.id !== undefined, 'ID should be generated');
console.assert(account.name === 'Test Account', 'Name should match');
console.assert(account.balance === 1000, 'Balance should match');
console.log('✅ Test 1 passed');
```

**Test 2: Validation - Name too short**
```javascript
try {
  await AccountService.create({ name: 'Ab', type: 'ahorro' });
  console.error('❌ Test 2 failed: Should have thrown error');
} catch (error) {
  console.assert(error.name === 'ValidationError', 'Should be ValidationError');
  console.log('✅ Test 2 passed:', error.message);
}
```

**Test 3: Validation - Negative balance**
```javascript
try {
  await AccountService.create({ name: 'Test', type: 'ahorro', balance: -100 });
  console.error('❌ Failed');
} catch (error) {
  console.log('✅ Test 3 passed');
}
```

**Test 4: Invalid type**
```javascript
try {
  await AccountService.create({ name: 'Test', type: 'invalid' });
  console.error('❌ Failed');
} catch (error) {
  console.log('✅ Test 4 passed');
}
```

**Test 5: Defaults (balance, currency)**
```javascript
const account = await AccountService.create({
  name: 'Test',
  type: 'ahorro'
  // No balance ni currency
});

console.assert(account.balance === 0, 'Should default to 0');
console.assert(account.currency === 'MXN', 'Should default to MXN');
console.log('✅ Test 5 passed');
```

---

**Resultado:** 5/5 tests passed → Method is solid
**Documentar:** Marcar en US document que method está testeado
```

---

### Nivel 2: Integration Testing Manual (Al completar feature)

#### Por cada flujo completo:

```markdown
## Manual Integration Test

### Flujo: Crear cuenta y hacer depósito

**Setup:**
- Abrir app en browser
- Limpiar db.json o usar datos conocidos
- Abrir DevTools Console

**Test Steps:**

1. **Crear cuenta**
   - [ ] Navegar a /cuentas
   - [ ] Click "Nueva Cuenta"
   - [ ] Llenar form: name="Test", type="ahorro", balance=1000
   - [ ] Submit
   - [ ] ✓ Verificar: Modal se cierra
   - [ ] ✓ Verificar: Cuenta aparece en tabla
   - [ ] ✓ Verificar: Balance muestra $1,000.00

2. **Registrar depósito**
   - [ ] Click "Nuevo Depósito"
   - [ ] Seleccionar cuenta "Test"
   - [ ] Ingresar monto: 500
   - [ ] Descripción: "Test deposit"
   - [ ] Submit
   - [ ] ✓ Verificar: Modal se cierra
   - [ ] ✓ Verificar: Balance actualizado a $1,500.00
   - [ ] ✓ Verificar: Transacción aparece en /transacciones

3. **Verificar persistencia**
   - [ ] Refresh la página (F5)
   - [ ] ✓ Verificar: Cuenta sigue existiendo
   - [ ] ✓ Verificar: Balance sigue siendo $1,500.00
   - [ ] ✓ Verificar: Transacción sigue en historial

**Resultado:** ✅ Flujo completo funciona end-to-end

**Tiempo:** 5-10 minutos

---

### Flujo: Transferencia entre cuentas (más complejo)

**Setup:**
- 2 cuentas existentes: A ($1000), B ($500)

**Test Steps:**
1. Transferir $300 de A → B
2. ✓ A debe quedar en $700
3. ✓ B debe quedar en $800
4. ✓ Balance total sin cambios ($1500)
5. ✓ 1 transacción creada
6. ✓ Transacción muestra origen y destino

**Casos edge:**
- [ ] Transferir más de lo disponible → Error claro
- [ ] Transferir a misma cuenta → Error claro
- [ ] Transferir $0 → Error claro

**Resultado:** ___ / 3 passed
```

---

### Nivel 3: End-to-End Testing Manual (Pre-release)

```markdown
## E2E Testing Checklist - MVP Completo

### Test Suite 1: First Time User (30 min)

**Escenario:** Usuario nuevo abre la app por primera vez

1. **Primera carga**
   - [ ] Abrir app en browser (incognito)
   - [ ] ✓ App carga en < 3 segundos
   - [ ] ✓ No errores en consola
   - [ ] ✓ UI se ve correcta (no broken)

2. **Crear primera cuenta**
   - [ ] Navegar a /cuentas
   - [ ] ✓ Ve empty state apropiado
   - [ ] Click "Crear cuenta"
   - [ ] Llenar form con datos válidos
   - [ ] Submit
   - [ ] ✓ Cuenta creada exitosamente
   - [ ] ✓ Aparece en lista

3. **Registrar primera transacción**
   - [ ] Navegar a transacciones
   - [ ] Click "Nuevo depósito"
   - [ ] Completar y submit
   - [ ] ✓ Depósito registrado
   - [ ] ✓ Balance actualizado
   - [ ] ✓ Aparece en historial

4. **Verificar persistencia**
   - [ ] Cerrar tab
   - [ ] Abrir app nuevamente
   - [ ] ✓ Datos persisten (cuenta y transacción siguen ahí)

**Tiempo completar flujo:** < 5 minutos
**Resultado:** Pass / Fail

---

### Test Suite 2: Daily Use (20 min)

**Escenario:** Usuario regular usa la app diariamente

1. **Registrar múltiples transacciones**
   - [ ] 3 depósitos en cuentas diferentes
   - [ ] 2 retiros
   - [ ] 1 transferencia
   - [ ] ✓ Todas registradas correctamente
   - [ ] ✓ Balances correctos

2. **Navegar entre páginas**
   - [ ] Dashboard → Cuentas → Transacciones → Dashboard
   - [ ] ✓ Navegación fluida
   - [ ] ✓ Datos consistentes en todas las vistas

3. **Performance con datos**
   - [ ] ✓ Operaciones responden < 500ms
   - [ ] ✓ Sin lag en UI

**Resultado:** Pass / Fail

---

### Test Suite 3: Error Handling (20 min)

**Escenario:** Cosas salen mal

1. **Datos inválidos**
   - [ ] Intentar crear cuenta sin nombre → Error claro
   - [ ] Intentar retiro sin saldo → Error claro
   - [ ] Monto negativo → Error claro
   - [ ] ✓ Errores muestran mensajes útiles
   - [ ] ✓ App no crashea

2. **Simulación de errors**
   - [ ] Renombrar db.json temporalmente
   - [ ] Refresh app
   - [ ] ✓ Error state apropiado mostrado
   - [ ] ✓ Opción de retry funciona
   - [ ] Restaurar db.json
   - [ ] Retry
   - [ ] ✓ App se recupera

3. **Casos edge**
   - [ ] 0 cuentas → Empty state
   - [ ] 1 cuenta → Funciona
   - [ ] 50+ cuentas → Performance OK
   - [ ] Transacción con descripción vacía → Acepta
   - [ ] Descripción muy larga (500 chars) → Trunca o error

**Resultado:** Pass / Fail

---

### Test Suite 4: Cross-Browser (30 min)

**Escenario:** App funciona en diferentes browsers

**Browsers a probar:**
- [ ] Chrome (versión actual)
- [ ] Firefox (versión actual)
- [ ] Safari (si tienes Mac)
- [ ] Edge (si estás en Windows)

**Por cada browser:**
1. [ ] App carga correctamente
2. [ ] Crear cuenta funciona
3. [ ] Registrar transacción funciona
4. [ ] Navegación funciona
5. [ ] ✓ Sin errores específicos del browser

**Matriz de compatibilidad:**
| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Cuentas | ✅     | ✅      | ✅     | ✅   |
| Deposit | ✅     | ✅      | ✅     | ✅   |
| Transfer| ✅     | ✅      | ❌ Bug | ✅   |

**Bugs encontrados:**
- Safari: crypto.randomUUID() no disponible en HTTP
  **Fix:** Usar fallback UUID generator

---

### Test Suite 5: Responsive (20 min)

**Escenario:** App usable en diferentes dispositivos

**Devices:**
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

**Por cada device:**
- [ ] Layout no se rompe
- [ ] Textos legibles
- [ ] Botones clickeables (no muy pequeños)
- [ ] Tabla scrolleable horizontally (si es necesario)
- [ ] Forms usables (inputs no tiny)

**Cómo probar:**
- DevTools → Toggle device toolbar
- Probar en cada device preset
- Verificar orientación (portrait + landscape en mobile)

**Resultado:** Pass / Fail por device

---

### Test Suite 6: Performance (15 min)

**Herramienta:** Lighthouse (Chrome DevTools)

**Métricas:**
- [ ] Performance: > 80
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90
- [ ] SEO: > 80 (si es público)

**Mediciones específicas:**
```markdown
### Lighthouse Report

- First Contentful Paint: ___ ms (meta: < 1500ms)
- Largest Contentful Paint: ___ ms (meta: < 2500ms)
- Time to Interactive: ___ ms (meta: < 3800ms)
- Cumulative Layout Shift: ___ (meta: < 0.1)
- Total Blocking Time: ___ ms (meta: < 300ms)

**Issues encontrados:**
- Issue 1: Imagen sin optimizar (500KB) → Comprimir
- Issue 2: JS bundle muy grande (1MB) → Code splitting

**Acciones:**
- [ ] Fix Issue 1
- [ ] Fix Issue 2
- [ ] Re-test
```

---

### Test Suite 7: Security (15 min)

**Testing básico de seguridad:**

```markdown
## Security Checklist

### Input Validation
- [ ] Intentar XSS: `<script>alert('xss')</script>` en nombre
      ✓ Debe escaparse o rechazarse
- [ ] Intentar SQL injection: `'; DROP TABLE accounts--` en nombre
      ✓ Debe tratarse como texto normal
- [ ] HTML injection: `<img src=x onerror=alert(1)>`
      ✓ Debe escaparse

### Data Exposure
- [ ] ✓ No hay datos sensibles en console.log
- [ ] ✓ No hay API keys en código frontend
- [ ] ✓ No se exponen errores de backend (stack traces)

### Authentication (si aplica en futuro)
- [ ] No aplicable en MVP (single user local)

**Resultado:** Pass / Fail
```

---

## 🤖 Testing Automatizado (Opcional en MVP)

### Setup de Testing Framework

```bash
# Instalación
npm install -D vitest @testing-library/dom

# package.json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "coverage": "vitest --coverage"
  }
}
```

---

### Nivel 1: Unit Tests (Funciones individuales)

```javascript
// tests/services/accountService.test.js

import { describe, test, expect, beforeEach } from 'vitest';
import AccountService from '../../src/services/accountService.js';

describe('AccountService', () => {
  beforeEach(() => {
    // Reset state antes de cada test
    // O usar mock repository
  });

  describe('create', () => {
    test('creates account with valid data', async () => {
      // Arrange
      const accountData = {
        name: 'Test Account',
        type: 'ahorro',
        balance: 1000
      };

      // Act
      const result = await AccountService.create(accountData);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe('Test Account');
      expect(result.type).toBe('ahorro');
      expect(result.balance).toBe(1000);
      expect(result.createdAt).toBeDefined();
    });

    test('throws ValidationError when name is empty', async () => {
      // Arrange
      const accountData = {
        name: '',
        type: 'ahorro'
      };

      // Act & Assert
      await expect(
        AccountService.create(accountData)
      ).rejects.toThrow('Name must be at least 3 characters');
    });

    test('throws ValidationError when balance is negative', async () => {
      const accountData = {
        name: 'Test',
        type: 'ahorro',
        balance: -100
      };

      await expect(
        AccountService.create(accountData)
      ).rejects.toThrow('Balance cannot be negative');
    });

    test('uses default values when not provided', async () => {
      const accountData = {
        name: 'Test',
        type: 'ahorro'
        // No balance, no currency
      };

      const result = await AccountService.create(accountData);

      expect(result.balance).toBe(0);
      expect(result.currency).toBe('MXN');
    });
  });

  describe('deposit', () => {
    test('increases balance correctly', async () => {
      // Arrange
      const account = await AccountService.create({
        name: 'Test',
        type: 'ahorro',
        balance: 1000
      });

      // Act
      const transaction = await TransactionService.deposit(
        account.id,
        500,
        'Test deposit'
      );

      // Assert
      expect(transaction.amount).toBe(500);
      const updatedAccount = await AccountService.getById(account.id);
      expect(updatedAccount.balance).toBe(1500);
    });

    test('throws error when amount is negative', async () => {
      const accountId = 'some-uuid';

      await expect(
        TransactionService.deposit(accountId, -100, 'Invalid')
      ).rejects.toThrow('Amount must be positive');
    });
  });
});
```

---

### Nivel 2: Integration Tests

```javascript
// tests/integration/transaction-flow.test.js

import { describe, test, expect, beforeEach } from 'vitest';

describe('Transaction Flow Integration', () => {
  let account1, account2;

  beforeEach(async () => {
    // Setup: Crear 2 cuentas
    account1 = await AccountService.create({
      name: 'Account A',
      type: 'ahorro',
      balance: 1000
    });

    account2 = await AccountService.create({
      name: 'Account B',
      type: 'corriente',
      balance: 500
    });
  });

  test('complete transfer flow updates both accounts', async () => {
    // Act
    const transaction = await TransactionService.transfer(
      account1.id,
      account2.id,
      300,
      'Transfer test'
    );

    // Assert
    expect(transaction.type).toBe('transferencia');
    expect(transaction.amount).toBe(300);

    // Verificar balances
    const updatedA = await AccountService.getById(account1.id);
    const updatedB = await AccountService.getById(account2.id);

    expect(updatedA.balance).toBe(700);  // 1000 - 300
    expect(updatedB.balance).toBe(800);  // 500 + 300

    // Verificar balance total sin cambios
    const allAccounts = await AccountService.getAll();
    const totalBalance = allAccounts.reduce((sum, a) => sum + a.balance, 0);
    expect(totalBalance).toBe(1500);  // Sin cambios
  });

  test('transfer fails if insufficient funds', async () => {
    await expect(
      TransactionService.transfer(account1.id, account2.id, 2000, 'Too much')
    ).rejects.toThrow('Insufficient funds');

    // Verificar que NO se modificaron balances
    const a1 = await AccountService.getById(account1.id);
    const a2 = await AccountService.getById(account2.id);

    expect(a1.balance).toBe(1000);  // Sin cambios
    expect(a2.balance).toBe(500);   // Sin cambios
  });
});
```

---

### Nivel 3: E2E Tests (Con Playwright o Cypress)

```javascript
// tests/e2e/complete-flow.spec.js
// Usando Playwright

import { test, expect } from '@playwright/test';

test('user can create account and register transactions', async ({ page }) => {
  // 1. Navegar a app
  await page.goto('http://localhost:3000');

  // 2. Verificar carga inicial
  await expect(page.locator('h1')).toContainText('Gestión Bancaria');

  // 3. Crear cuenta
  await page.click('text=Cuentas');
  await page.click('text=Nueva Cuenta');

  await page.fill('#account-name', 'Mi Ahorro');
  await page.selectOption('#account-type', 'ahorro');
  await page.fill('#account-balance', '1000');
  await page.click('button:has-text("Guardar")');

  // 4. Verificar cuenta creada
  await expect(page.locator('table')).toContainText('Mi Ahorro');
  await expect(page.locator('table')).toContainText('$1,000.00');

  // 5. Registrar depósito
  await page.click('text=Transacciones');
  await page.click('text=Nuevo Depósito');

  await page.selectOption('#deposit-account', { label: 'Mi Ahorro' });
  await page.fill('#deposit-amount', '500');
  await page.fill('#deposit-description', 'Test deposit');
  await page.click('button:has-text("Registrar")');

  // 6. Verificar transacción registrada
  await expect(page.locator('.table')).toContainText('Test deposit');
  await expect(page.locator('.table')).toContainText('$500.00');

  // 7. Verificar balance actualizado
  await page.click('text=Cuentas');
  await expect(page.locator('table')).toContainText('$1,500.00');
});

test('shows error when insufficient funds', async ({ page }) => {
  await page.goto('http://localhost:3000/cuentas');

  // Crear cuenta con $100
  // ... setup ...

  // Intentar retirar $200
  await page.click('text=Nuevo Retiro');
  await page.fill('#amount', '200');
  await page.click('button:has-text("Retirar")');

  // Debe mostrar error
  await expect(page.locator('.error')).toContainText('Saldo insuficiente');

  // Balance no debe cambiar
  await expect(page.locator('table')).toContainText('$100.00');
});
```

---

## 📋 Master Test Checklist (Pre-Release)

```markdown
# Pre-Release Testing Checklist

**Versión:** v1.0.0
**Fecha:** ___
**Tester:** ___

---

## Funcionalidades Core

### Gestión de Cuentas
- [ ] Ver lista de cuentas
- [ ] Crear nueva cuenta (datos válidos)
- [ ] Crear cuenta (validaciones funcionan)
- [ ] Editar cuenta (si implementado)
- [ ] Eliminar cuenta (si implementado)
- [ ] Ver detalle de cuenta (si implementado)

### Transacciones
- [ ] Ver lista de transacciones
- [ ] Registrar depósito (happy path)
- [ ] Registrar depósito (validaciones)
- [ ] Registrar retiro (happy path)
- [ ] Registrar retiro (saldo insuficiente → error)
- [ ] Transferir entre cuentas (happy path)
- [ ] Transferir (casos edge: misma cuenta, saldo insuficiente)
- [ ] Filtrar transacciones (si implementado)
- [ ] Buscar transacciones (si implementado)

### Dashboard (si implementado)
- [ ] Balance total correcto
- [ ] Resumen de cuentas
- [ ] Últimas transacciones

---

## Estados de UI

### Estados universales (todas las páginas)
- [ ] Loading state (durante carga de datos)
- [ ] Success state (con datos)
- [ ] Empty state (sin datos)
- [ ] Error state (error de carga)

### Feedback de acciones
- [ ] Success message después de crear
- [ ] Success message después de editar
- [ ] Error message cuando falla operación
- [ ] Loading durante operaciones largas

---

## Casos Edge

### Datos
- [ ] 0 cuentas → Empty state apropiado
- [ ] 1 cuenta → Funciona
- [ ] 50+ cuentas → Performance OK
- [ ] 0 transacciones → Empty state apropiado
- [ ] 100+ transacciones → Performance OK

### Validaciones
- [ ] Campos requeridos vacíos → Error
- [ ] Montos negativos → Error
- [ ] Montos muy grandes (999999999) → Acepta o rechaza apropiadamente
- [ ] Nombres muy largos → Trunca o rechaza
- [ ] Caracteres especiales → Maneja correctamente

### Operaciones
- [ ] Double submit (click 2 veces) → No duplica
- [ ] Submit durante loading → Botón deshabilitado
- [ ] Cancelar operación → No guarda datos parciales
- [ ] Navegación durante loading → Maneja apropiadamente

---

## Navegación

- [ ] Click en links → Navega correctamente
- [ ] Botón back → Funciona
- [ ] Botón forward → Funciona
- [ ] Refresh en cualquier página → Mantiene estado
- [ ] Deep link (abrir /cuentas directamente) → Funciona

---

## Performance

- [ ] Carga inicial < 3 segundos
- [ ] Operaciones < 500ms
- [ ] Sin memory leaks (usar > 5 min sin degrades)
- [ ] Bundle size < 200KB (si hay build)

---

## Cross-Browser

- [ ] Chrome: Todo funciona
- [ ] Firefox: Todo funciona
- [ ] Safari: Todo funciona
- [ ] Edge: Todo funciona
- [ ] Mobile browsers (Chrome Mobile): Todo funciona

---

## Responsive

- [ ] Desktop (1920px): Layout óptimo
- [ ] Laptop (1366px): Layout óptimo
- [ ] Tablet (768px): Usable
- [ ] Mobile (375px): Usable

---

## Accessibility

- [ ] Navegable con teclado (Tab)
- [ ] Navegable con screen reader (probar con NVDA/VoiceOver)
- [ ] Contraste suficiente (WCAG AA)
- [ ] Focus visible en elementos interactivos
- [ ] Formularios con labels apropiados

---

## Data Integrity

- [ ] Datos persisten después de refresh
- [ ] Balances siempre correctos (suma de transacciones)
- [ ] Balance total = suma de todas las cuentas
- [ ] No se duplican cuentas al crear
- [ ] No se pierden transacciones

---

## Error Handling

**Por cada error posible:**
- [ ] Mensaje claro y útil (no stack trace)
- [ ] Opción de recovery (retry, go back, etc.)
- [ ] App no crashea
- [ ] Estado se mantiene consistente

---

## Regression Testing

**Todas las features viejas siguen funcionando:**
- [ ] Si agregué filtros, crear cuenta sigue funcionando
- [ ] Si arreglé bug en retiros, depósitos siguen funcionando
- [ ] Ninguna feature nueva rompió features viejas

---

## Usability Testing (con 2-3 usuarios reales)

**Test con usuario nuevo:**
- [ ] Usuario puede crear cuenta en < 2 min
- [ ] Usuario entiende cómo registrar transacción
- [ ] Usuario encuentra lo que busca sin ayuda
- [ ] Usuario completa flujo completo en < 5 min

**Preguntas al usuario:**
- ¿Qué fue confuso?
- ¿Qué esperabas pero no pasó?
- ¿Algo fue frustrante?
- ¿Usarías esto regularmente?

---

**Resultado Final:**
- Total tests: ___
- Passed: ___
- Failed: ___
- **Status:** PASS (todo funciona) / FAIL (bugs críticos) / CONDITIONAL (bugs menores)
```

---

## 🐛 Bug Tracking

### Cuando encuentres un bug en testing:

```markdown
## Bug Report Template

**ID:** BUG-001
**Fecha:** 2026-03-20
**Reportado por:** Roberto Carlos
**Severidad:** Critical / High / Medium / Low
**Estado:** Open / In Progress / Fixed / Won't Fix

---

### Descripción
[Descripción clara del problema en 1-2 párrafos]

### Pasos para Reproducir
1. Paso 1
2. Paso 2
3. Paso 3

### Resultado Esperado
[Qué debería pasar]

### Resultado Actual
[Qué pasa realmente]

### Información Adicional
- **Browser:** Chrome 122
- **OS:** Windows 10
- **Errores en consola:**
  ```
  Error: Cannot read property 'balance' of undefined
      at TransactionService.deposit (line 45)
  ```

### Screenshots
[Si aplica]

---

### Análisis (llenar al investigar)
**Causa raíz:** [Descripción técnica]
**Archivos afectados:** [Lista]
**Prioridad de fix:** [1-5]

### Fix Aplicado
```javascript
// Antes
const balance = account.balance;

// Después
const balance = account?.balance ?? 0;
```

**Commit:** [SHA del fix]
**Verificado:** [Fecha]
```

### Clasificación de severidad:

```markdown
## Critical (arreglar AHORA)
- App crashea completamente
- Pérdida de datos
- Funcionalidad core no funciona
- Security vulnerability

## High (arreglar en 24-48 hrs)
- Funcionalidad importante no funciona
- Error muy visible
- Workaround muy incómodo

## Medium (arreglar en 1 semana)
- Funcionalidad secundaria no funciona
- Error en casos edge poco comunes
- UX degradada pero usable

## Low (arreglar cuando haya tiempo)
- Typos en textos
- Mejoras de UI menores
- Features "nice to have" que no funcionan perfecto
```

---

## 📊 Test Coverage (Si usas tests automatizados)

### Medir cobertura

```bash
npm run coverage
```

**Reporte:**
```
------------------|---------|----------|---------|---------|
File              | % Stmts | % Branch | % Funcs | % Lines |
------------------|---------|----------|---------|---------|
accountService.js |   85.71 |    75.00 |   90.00 |   85.71 |
transactionSvc.js |   78.26 |    66.67 |   80.00 |   78.26 |
validator.js      |   95.00 |    88.89 |  100.00 |   95.00 |
------------------|---------|----------|---------|---------|
All files         |   84.21 |    74.07 |   87.50 |   84.21 |
------------------|---------|----------|---------|---------|
```

### Metas de cobertura:

```markdown
## Coverage Targets

### Para MVP:
- Services (business logic): > 70%
- Utils (helpers): > 80%
- Components: > 50% (o skip, test manual)
- Pages: Skip (test E2E manual)

### Para Producción (v1.0):
- Services: > 85%
- Utils: > 90%
- Components: > 70%
- Overall: > 80%

**Áreas sin cobertura aceptable:**
- Edge cases muy raros (< 0.1% probabilidad)
- Código legacy (si aplica)
- UI styling (CSS)
```

---

## 🎯 Testing Strategy por Fase

### Durante Desarrollo (Fase 4)
```markdown
**Frecuencia:** Continuo

**Qué testear:**
- Cada método al escribirlo (console tests)
- Cada componente al crearlo (render en browser)
- Happy path cada 30 min

**Tiempo:** 30-40% del tiempo de desarrollo

**Herramientas:**
- DevTools Console
- Browser manual testing
```

---

### Pre-Sprint Review (Viernes de cada sprint)
```markdown
**Frecuencia:** Semanal

**Qué testear:**
- Todas las US completadas esta semana
- Regression de features viejas
- Cross-browser básico (Chrome + Firefox)

**Tiempo:** 2-3 horas

**Herramientas:**
- Master Test Checklist (subset)
- Manual testing
```

---

### Pre-Release (Antes de v1.0)
```markdown
**Frecuencia:** Una vez antes de cada release

**Qué testear:**
- Master Test Checklist completo
- Todos los flujos E2E
- Performance testing
- Security testing
- Usability testing con usuarios reales

**Tiempo:** 1 semana completa

**Herramientas:**
- Master Test Checklist (100%)
- Lighthouse
- Manual testing exhaustivo
- Tests automatizados (si existen)
```

---

## 🎯 Entregables de la Fase 5

### Durante desarrollo (continuo):
- [x] Cada función testeada (console)
- [x] Cada feature testeada (browser)
- [x] Test results documentados (al menos mental note)

### Pre-release (intensivo):
- [x] Master Test Checklist ejecutado 100%
- [x] Bug registry con todos los bugs encontrados
- [x] Bug registry con todos los fixes aplicados
- [x] Performance report (Lighthouse)
- [x] Cross-browser compatibility matrix
- [x] Usability testing results (si aplicable)
- [x] Regression testing (features viejas OK)
- [x] Documento: docs/testing/TEST_RESULTS_v1.0.md

### Tests automatizados (opcional):
- [x] Suite de unit tests (> 70% coverage en services)
- [x] Suite de integration tests (flujos principales)
- [x] Suite de E2E tests (1-2 flujos críticos)
- [x] Todos los tests passing

---

## 🚦 Criterios de Salida (Release Ready)

Puedes avanzar a Release (Fase 7) cuando:

**Funcionalidad:**
- [x] Todas las features Must Have funcionan
- [x] Criterios de aceptación de todas las US pasan
- [x] 0 bugs críticos abiertos
- [x] < 3 bugs high (o todos con workaround documentado)

**Calidad:**
- [x] Master Test Checklist > 95% passed
- [x] Sin errores en consola
- [x] Performance acceptable (Lighthouse > 80)
- [x] Cross-browser (min Chrome + Firefox)
- [x] Responsive (desktop + mobile usable)

**Experiencia:**
- [x] Usability testing con 2+ personas (si posible)
- [x] Feedback incorporado o documentado para v1.1
- [x] Flujo completo E2E funciona sin ayuda

**Documentación:**
- [x] Test results documentados
- [x] Known issues documentados (si existen)
- [x] README actualizado
- [x] CHANGELOG completo

---

## 💡 Tips para Testing Efectivo

### Tip 1: Testing es inversión, no costo
```
1 hora testing ahora = 10 horas debugging después
```

### Tip 2: Test como usuario, no como developer
```
No testear "¿la función retorna array?"
Testear "¿puedo completar mi tarea?"
```

### Tip 3: Automatiza lo repetitivo
```
Si pruebas lo mismo 5+ veces → automatizar
Si es test one-time → manual está bien
```

### Tip 4: No testear implementación, testear comportamiento
```javascript
// ❌ Test de implementación (frágil)
test('calls repository.save()', () => {
  const spy = jest.spyOn(repository, 'save');
  service.create(data);
  expect(spy).toHaveBeenCalled();
});

// ✅ Test de comportamiento (robusto)
test('creates account with correct data', () => {
  const account = service.create(data);
  expect(account.name).toBe('Test');
  expect(account.balance).toBeGreaterThanOrEqual(0);
});
```

### Tip 5: Test pyramid, no ice cream cone
```
      /\
     /  \      ← E2E: Pocos (lentos, frágiles)
    /────\
   /  Int \    ← Integration: Algunos
  /────────\
 /   Unit   \  ← Unit: Muchos (rápidos, confiables)
/────────────\
```

No hagas:
```
\            /
 \   E2E   /  ← Muchos E2E (lento, frágil)
  \──────/
   \ Int/     ← Algunos
    \──/
     \/       ← Pocos unit (no hay base)
```

---

## 🔥 Cuando Encuentras un Bug

### Workflow de Bug Fix

```markdown
## 1. Reproducir el bug (10-15 min)
- [ ] Seguir pasos exactos
- [ ] Confirmar que ocurre consistentemente
- [ ] Documentar en bug report

## 2. Aislar la causa (15-30 min)
- [ ] Usar debugger
- [ ] console.log estratégicos
- [ ] Binary search (comentar mitad del código y ver si bug sigue)
- [ ] Identificar línea exacta

## 3. Crear branch de fix
```bash
git checkout -b fix/bug-id-description
```

## 4. Escribir test que reproduzca el bug (10 min)
```javascript
// Este test debe FALLAR antes del fix
test('reproduces bug', () => {
  // Pasos que causan el bug
  expect(result).toBe(expected);
});
```

## 5. Implementar fix mínimo (20-40 min)
- [ ] Arreglar solo este bug
- [ ] No refactorizar "ya que estoy aquí"
- [ ] Mantener cambios mínimos

## 6. Verificar test pasa (5 min)
```bash
npm test
# ✓ Test que fallaba ahora pasa
```

## 7. Regression testing (10-15 min)
- [ ] Verificar que fix no rompió otras cosas
- [ ] Probar features relacionadas

## 8. Commit y merge
```bash
git commit -m "fix: [descripción clara del bug]"
git checkout main
git merge fix/bug-id
```

## 9. Actualizar bug report
- [ ] Marcar como Fixed
- [ ] Documentar causa raíz
- [ ] Documentar solución aplicada
- [ ] Link al commit

---

**Tiempo total:** 1-2 horas para bug típico
```

---

## 📚 Checklist Final de la Fase 5

```markdown
## Fase 5: Pruebas - Checklist

### Testing Continuo (durante Fase 4)
- [ ] Cada función testeada al escribirla
- [ ] Cada feature testeada al completarla
- [ ] Happy path verificado siempre
- [ ] Casos edge principales probados

### Testing Pre-Release (intensivo)
- [ ] Master Test Checklist 100% ejecutado
- [ ] Todas las funcionalidades Must Have testeadas
- [ ] Estados de UI verificados (loading, success, error, empty)
- [ ] Casos edge documentados y probados
- [ ] Cross-browser testing (min 2 browsers)
- [ ] Responsive testing (min desktop + mobile)
- [ ] Performance testing (Lighthouse)
- [ ] Security básico verificado

### Bug Management
- [ ] Todos los bugs encontrados documentados
- [ ] Bugs críticos: 0 abiertos
- [ ] Bugs high: < 3 abiertos (con workaround)
- [ ] Bugs documentados en KNOWN_ISSUES.md (si aplica)

### Automatización (opcional)
- [ ] Suite de unit tests (si implementado)
- [ ] Suite de integration tests (si implementado)
- [ ] Suite de E2E tests (si implementado)
- [ ] CI configurado para correr tests (si aplicable)

### Documentación
- [ ] Test results documentados
- [ ] Coverage report (si tests automáticos)
- [ ] Known issues listados
- [ ] Workarounds documentados

### Sign-off
- [ ] Product owner (tú) aprueba calidad
- [ ] Cumple todos los criterios de éxito del MVP
- [ ] Confianza en que está listo para usuarios
- [ ] No hay bloqueadores para release

---

**Bugs encontrados:** ___
**Bugs arreglados:** ___
**Bugs pendientes:** ___ (solo low priority)
**Cobertura de tests:** ___% (si automatizado)
**Estado:** ✅ READY FOR RELEASE / ⚠️ BLOCKED
**Próximo paso:** Fase 7 - Despliegue (si ready)
```

---

## 🎬 Conclusión de la Fase 5

### ¿Qué produce esta fase?
- ✅ Confianza en la calidad del código
- ✅ Lista de bugs conocidos
- ✅ Software testeado exhaustivamente
- ✅ Evidencia de que funciona

### Señales de testing suficiente:
- Has probado todo en Master Checklist
- No encuentras bugs nuevos en 2-3 sesiones de testing
- Usability testing pasó con usuarios reales
- Te sientes confiado de mostrarlo públicamente

### Señales de testing insuficiente:
- Encuentras bug nuevo cada 10 minutos de uso
- No has probado en otros browsers
- No probaste casos edge
- No has dejado a nadie más usarlo

### Siguiente paso:
➡️ **Fase 6: Documentación** (documentar todo antes de release)

---

**Recuerda:**
> "Testing no es una fase, es una actitud."
> "Bug encontrado temprano = bug barato de arreglar."
> "No hay vergüenza en bugs, solo en no buscarlos."

Testing riguroso es lo que separa código hobby de código profesional.
