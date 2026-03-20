# Fase 3: Diseño Arquitectónico
## Definir CÓMO construir el sistema

**Duración estimada:** 3-5 días (proyecto nuevo) | 1-2 horas (por feature compleja)
**Prerequisito:** Fase 2 (Análisis) completada para las US del sprint
**Cuándo usar:** Después del análisis, antes de escribir código

---

## 🎯 Objetivo de esta fase
Diseñar la estructura técnica del sistema:
- Definir arquitectura general (capas, patrones)
- Diseñar modelo de datos completo
- Diseñar APIs/Services (métodos, interfaces)
- Diseñar componentes UI reutilizables
- Establecer estándares técnicos

**Regla de oro:** Al finalizar esta fase, debes poder dibujar el sistema completo en una pizarra y explicar cómo fluyen los datos.

---

## 📋 Checklist Completa

### Parte A: Diseño Inicial (Solo una vez por proyecto)

---

### Paso 1: Definir arquitectura general (2-3 horas)

#### 1.1 Elegir patrón arquitectónico

**Opciones comunes:**

```markdown
## 1. Layered Architecture (Arquitectura en Capas)
Separación horizontal en capas con responsabilidades claras.

```
┌─────────────────────────────────────┐
│    Presentation Layer (UI)          │  ← Pages, Components
├─────────────────────────────────────┤
│    Business Logic Layer             │  ← Services
├─────────────────────────────────────┤
│    Data Access Layer                │  ← Repositories
├─────────────────────────────────────┤
│    Data Storage                     │  ← db.json, API, Database
└─────────────────────────────────────┘
```

**Pros:** Simple, fácil de entender, separación clara
**Contras:** Puede llevar a dependencias cruzadas si no se disciplina
**Ideal para:** Proyectos pequeños-medianos, equipos pequeños

---

## 2. MVC (Model-View-Controller)
```
    ┌──────────┐
    │   View   │ ← UI
    └────┬─────┘
         │
    ┌────▼──────┐
    │Controller │ ← Lógica de coordinación
    └────┬──────┘
         │
    ┌────▼─────┐
    │  Model   │ ← Datos + lógica de negocio
    └──────────┘
```

**Pros:** Patrón clásico, bien conocido
**Contras:** Puede confundirse dónde va cada lógica
**Ideal para:** Apps con mucha interacción UI

---

## 3. Repository Pattern
```
Service Layer
      ↓
Repository Interface (abstracción)
      ↓
Concrete Repository (implementación)
      ↓
Data Source (db.json, API, etc.)
```

**Pros:** Fácil cambiar fuente de datos, testeable
**Contras:** Overhead de abstracción
**Ideal para:** Cuando planeas migrar data source

---

**Para tu proyecto, recomiendo:** Layered Architecture + Repository Pattern
```

#### 1.2 Documentar arquitectura elegida

**Crear archivo:** `docs/ARCHITECTURE.md`

```markdown
# Arquitectura del Sistema - Gestión Bancaria

**Versión:** 1.0
**Fecha:** 2026-03-20
**Patrón:** Layered Architecture con Repository Pattern

---

## Vista General

```
┌──────────────────────────────────────────────────┐
│  Presentation Layer (Pages + Components)         │
│  ┌────────────┐  ┌─────────────┐                │
│  │ Pages      │  │ Components  │                 │
│  │ - Accounts │  │ - Table     │                 │
│  │ - Transact.│  │ - Button    │                 │
│  │ - Dashboard│  │ - Modal     │                 │
│  └──────┬─────┘  └──────┬──────┘                 │
└─────────┼────────────────┼──────────────────────────┘
          │                │
┌─────────▼────────────────▼──────────────────────────┐
│  Business Logic Layer (Services)                   │
│  ┌──────────────────┐  ┌──────────────────┐       │
│  │ AccountService   │  │TransactionService│       │
│  │ - getAll()       │  │ - getAll()       │       │
│  │ - create()       │  │ - deposit()      │       │
│  │ - update()       │  │ - withdraw()     │       │
│  │ - delete()       │  │ - transfer()     │       │
│  └────────┬─────────┘  └────────┬─────────┘       │
└───────────┼────────────────────┼───────────────────┘
            │                    │
┌───────────▼────────────────────▼───────────────────┐
│  Data Access Layer (Repositories)                  │
│  ┌──────────────────┐  ┌──────────────────┐       │
│  │ AccountRepo      │  │ TransactionRepo  │       │
│  │ - findAll()      │  │ - findAll()      │       │
│  │ - findById()     │  │ - save()         │       │
│  │ - save()         │  │ - findByAccount()│       │
│  └────────┬─────────┘  └────────┬─────────┘       │
└───────────┼────────────────────┼───────────────────┘
            │                    │
┌───────────▼────────────────────▼───────────────────┐
│  Data Storage                                      │
│  ┌──────────────────────────────────────────────┐ │
│  │  db.json                                     │ │
│  │  {                                           │ │
│  │    "accounts": [...],                        │ │
│  │    "transactions": [...]                     │ │
│  │  }                                           │ │
│  └──────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────┘

         Utilities Layer (Cross-cutting)
┌────────────────────────────────────────────────────┐
│  formatter.js, validator.js, constants.js         │
└────────────────────────────────────────────────────┘
```

## Principios Arquitectónicos

### 1. Separation of Concerns
Cada capa tiene una responsabilidad clara:
- **Presentation:** Renderizar UI, capturar eventos
- **Business Logic:** Validaciones, cálculos, reglas de negocio
- **Data Access:** CRUD operations, queries
- **Storage:** Persistencia de datos

**Regla:** Una capa solo conoce la capa inmediatamente inferior.
Pages → Services → Repositories → Storage

### 2. Dependency Inversion
Las capas superiores no dependen de implementaciones concretas.

```javascript
// ✅ Correcto: Service depende de interfaz
class AccountService {
  constructor(repository) {
    this.repo = repository; // Cualquier implementación de Repository
  }
}

// ❌ Incorrecto: Service depende de implementación concreta
class AccountService {
  constructor() {
    this.db = new JSONFileDB(); // Acoplado a JSON
  }
}
```

### 3. Single Responsibility
Cada módulo/clase hace una cosa y la hace bien.

```javascript
// ✅ Correcto
class AccountService {
  // Solo lógica de negocio de cuentas
}

class AccountValidator {
  // Solo validaciones
}

class AccountRepository {
  // Solo acceso a datos
}

// ❌ Incorrecto
class AccountManager {
  // Hace todo: UI, validación, negocio, datos
}
```

### 4. DRY (Don't Repeat Yourself)
Extraer código duplicado a funciones/componentes reutilizables.

---

## Decisiones Arquitectónicas

### DA-001: Usar Repository Pattern
**Razón:** Facilita migración futura de db.json a API real
**Implementación:** Capa de repositorio abstrae acceso a datos

### DA-002: State Management
**Decisión:** Sin state management global en MVP
**Razón:** Alcance pequeño, no necesita Redux/Vuex
**Implementación:** Estado local en cada página

### DA-003: Routing
**Decisión:** Router custom en Vanilla JS
**Razón:** Evitar dependencia, aprendizaje
**Implementación:** Hash routing (#/cuentas, #/transacciones)

### DA-004: Componentes
**Decisión:** Object-based components (no clases)
**Razón:** Simplicidad, funcional approach
**Pattern:**
```javascript
const Component = {
  render: (container, config) => {
    // Implementation
  }
};
```

---

## Estructura de Carpetas del Proyecto

```
GestionBancariaVanillaJS/
├── docs/                          # Documentación
│   ├── ciclo-vida/               # Guías de proceso
│   ├── user-stories/             # US detalladas
│   ├── decisions/                # ADRs
│   ├── VISION.md
│   ├── BACKLOG.md
│   ├── ARCHITECTURE.md           # Este archivo
│   └── ...
│
├── src/                          # Código fuente
│   ├── components/               # Componentes reutilizables
│   │   ├── Table/
│   │   │   ├── Table.js
│   │   │   └── styles.css
│   │   ├── Button/
│   │   │   ├── Button.js
│   │   │   └── styles.css
│   │   ├── Modal/
│   │   └── Form/
│   │
│   ├── pages/                    # Páginas de la aplicación
│   │   ├── Accounts/
│   │   │   ├── AccountsPage.js
│   │   │   └── styles.css
│   │   ├── Transactions/
│   │   │   ├── TransactionsPage.js
│   │   │   └── styles.css
│   │   └── Dashboard/
│   │       ├── DashboardPage.js
│   │       └── styles.css
│   │
│   ├── services/                 # Business Logic Layer
│   │   ├── accountService.js
│   │   ├── transactionService.js
│   │   └── validationService.js
│   │
│   ├── repositories/             # Data Access Layer
│   │   ├── accountRepository.js
│   │   ├── transactionRepository.js
│   │   └── baseRepository.js
│   │
│   ├── utils/                    # Utilities
│   │   ├── formatter.js
│   │   ├── validator.js
│   │   ├── dateUtils.js
│   │   └── constants.js
│   │
│   ├── router.js                 # Routing
│   ├── main.js                   # Entry point
│   └── styles/                   # Global styles
│       ├── global.css
│       ├── variables.css
│       └── reset.css
│
├── public/                       # Assets estáticos
│   ├── index.html
│   ├── favicon.ico
│   └── images/
│
├── tests/                        # Tests (futuro)
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── db.json                       # Base de datos (dev)
├── package.json
├── .gitignore
├── README.md
└── CHANGELOG.md
```

---

## Flujo de Datos

### Lectura de datos (GET)
```
User Action
    ↓
Page.render()
    ↓
Service.getAll()  ← Validaciones, transformaciones
    ↓
Repository.findAll()  ← Acceso a datos
    ↓
db.json / API
    ↓
[datos retornan por la misma ruta]
    ↓
Page renderiza con datos
```

### Escritura de datos (POST/PUT/DELETE)
```
User submits form
    ↓
Page._handleSubmit()
    ↓
Service.create(data)
    ↓
    ├─ Validaciones (ValidationService)
    ├─ Reglas de negocio (if balance < 0 → error)
    ├─ Transformaciones (generar ID, timestamps)
    └→ Repository.save(data)
           ↓
       db.json actualizado
           ↓
    [success/error return]
           ↓
    Page actualiza UI
```

### Ejemplo concreto: Crear cuenta
```
1. Usuario llena form → click "Guardar"
2. AccountsPage._handleSubmit(formData)
3. AccountService.create(formData)
   a. ValidationService.validateAccount(formData)
   b. Si válido: generar ID, timestamps
   c. AccountRepository.save(accountData)
   d. db.json actualizado
4. Return: nueva cuenta creada
5. AccountsPage actualiza UI:
   - Cierra modal
   - Re-carga lista de cuentas
   - Muestra mensaje de éxito
```

---

## Paso 2: Diseñar modelo de datos (1-2 horas)

### 2.1 Identificar entidades

**Crear archivo:** `docs/DATA_MODEL.md`

```markdown
# Modelo de Datos - Gestión Bancaria

**Versión:** 1.0
**Fecha:** 2026-03-20

---

## Entidades

### Account (Cuenta)

#### Atributos
```typescript
interface Account {
  id: string;              // UUID v4, PK
  name: string;            // 3-50 caracteres
  type: AccountType;       // Enum
  balance: number;         // >= 0, hasta 2 decimales
  currency: string;        // ISO 4217 (default: "MXN")
  createdAt: string;       // ISO 8601 date string
  updatedAt: string;       // ISO 8601 date string
}

enum AccountType {
  AHORRO = 'ahorro',
  CORRIENTE = 'corriente',
  INVERSION = 'inversion'
}
```

#### Constraints
- `id`: Único, generado automáticamente, inmutable
- `name`: Requerido, no vacío después de trim
- `type`: Debe ser uno de los valores del enum
- `balance`: No negativo, round a 2 decimales
- `currency`: 3 letras uppercase (usar validator)
- `createdAt`: Set al crear, inmutable
- `updatedAt`: Set al crear, actualizar en cada modificación

#### Validaciones
```javascript
function validateAccount(account) {
  const errors = [];

  // ID
  if (!account.id || !isValidUUID(account.id)) {
    errors.push('Invalid ID');
  }

  // Name
  if (!account.name || account.name.trim().length < 3) {
    errors.push('Name must be at least 3 characters');
  }
  if (account.name.length > 50) {
    errors.push('Name cannot exceed 50 characters');
  }

  // Type
  if (!['ahorro', 'corriente', 'inversion'].includes(account.type)) {
    errors.push('Type must be ahorro, corriente, or inversion');
  }

  // Balance
  if (typeof account.balance !== 'number' || isNaN(account.balance)) {
    errors.push('Balance must be a number');
  }
  if (account.balance < 0) {
    errors.push('Balance cannot be negative');
  }

  // Currency (opcional)
  if (account.currency && !/^[A-Z]{3}$/.test(account.currency)) {
    errors.push('Currency must be 3 uppercase letters (ISO 4217)');
  }

  return errors;
}
```

#### Ejemplo de datos
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "Cuenta de Ahorro Principal",
  "type": "ahorro",
  "balance": 15234.50,
  "currency": "MXN",
  "createdAt": "2026-01-15T10:00:00.000Z",
  "updatedAt": "2026-03-20T14:30:00.000Z"
}
```

---

### Transaction (Transacción)

#### Atributos
```typescript
interface Transaction {
  id: string;               // UUID v4, PK
  accountId: string;        // FK a Account.id
  toAccountId?: string;     // FK a Account.id (solo transferencias)
  type: TransactionType;    // Enum
  amount: number;           // > 0, hasta 2 decimales
  description: string;      // 0-200 caracteres
  date: string;             // ISO 8601 date
  status: TransactionStatus;// Enum (futuro: pending, completed, failed)
  createdAt: string;        // ISO 8601 date
}

enum TransactionType {
  DEPOSITO = 'deposito',
  RETIRO = 'retiro',
  TRANSFERENCIA = 'transferencia'
}

enum TransactionStatus {
  COMPLETADA = 'completada',
  PENDIENTE = 'pendiente',
  FALLIDA = 'fallida'
}
```

#### Constraints
- `id`: Único, generado automáticamente
- `accountId`: Requerido, debe existir en accounts
- `toAccountId`: Requerido solo si type = 'transferencia'
- `type`: Enum estricto
- `amount`: Siempre positivo (el tipo indica si suma/resta)
- `description`: Opcional pero recomendado
- `date`: Fecha de la transacción (puede ser pasada)
- `status`: Default 'completada' en MVP

#### Reglas de negocio por tipo
```javascript
// Depósito
{
  accountId: required,
  toAccountId: null,
  amount: positive
  // Efecto: account.balance += amount
}

// Retiro
{
  accountId: required,
  toAccountId: null,
  amount: positive,
  // Validación adicional: account.balance >= amount
  // Efecto: account.balance -= amount
}

// Transferencia
{
  accountId: required,      // Cuenta origen
  toAccountId: required,    // Cuenta destino
  amount: positive,
  // Validación: accountId !== toAccountId
  // Validación: account.balance >= amount
  // Efecto: origin.balance -= amount, destination.balance += amount
}
```

#### Validaciones
```javascript
function validateTransaction(transaction) {
  const errors = [];

  // Amount
  if (transaction.amount <= 0) {
    errors.push('Amount must be positive');
  }

  // Type-specific
  if (transaction.type === 'transferencia') {
    if (!transaction.toAccountId) {
      errors.push('toAccountId required for transfers');
    }
    if (transaction.accountId === transaction.toAccountId) {
      errors.push('Cannot transfer to same account');
    }
  } else {
    if (transaction.toAccountId) {
      errors.push('toAccountId must be null for deposits/withdrawals');
    }
  }

  return errors;
}
```

---

## Relaciones entre Entidades

```
Account 1 ────< ∞ Transaction (accountId)
                     │
                     │ (opcional)
                     │
Account 1 ────< ∞ Transaction (toAccountId)
```

**Explicación:**
- Una cuenta tiene muchas transacciones como origen
- Una cuenta puede tener muchas transacciones como destino (transferencias)
- Una transacción pertenece a una cuenta (origen)
- Una transacción puede pertenecer a otra cuenta (destino, solo transferencias)

---

## Índices y Queries

### Queries comunes (optimizar para estos):
```javascript
// Q1: Todas las transacciones de una cuenta
transactions.filter(t =>
  t.accountId === id || t.toAccountId === id
)

// Q2: Balance calculado de una cuenta
const balance = transactions
  .filter(t => t.accountId === id)
  .reduce((sum, t) => {
    if (t.type === 'deposito') return sum + t.amount;
    if (t.type === 'retiro') return sum - t.amount;
    if (t.type === 'transferencia') return sum - t.amount;
  }, initialBalance);

// Q3: Transacciones en rango de fechas
transactions.filter(t =>
  new Date(t.date) >= startDate &&
  new Date(t.date) <= endDate
)
```

**Para MVP:** Sin índices (todo in-memory)
**Para v2.0:** Si usamos BD real, índices en:
- accountId
- toAccountId
- date
- type

---

## Esquema de Base de Datos (db.json)

```json
{
  "accounts": [
    {
      "id": "uuid",
      "name": "string",
      "type": "ahorro|corriente|inversion",
      "balance": 0,
      "currency": "MXN",
      "createdAt": "ISO date",
      "updatedAt": "ISO date"
    }
  ],
  "transactions": [
    {
      "id": "uuid",
      "accountId": "uuid",
      "toAccountId": "uuid|null",
      "type": "deposito|retiro|transferencia",
      "amount": 0,
      "description": "string",
      "date": "ISO date",
      "status": "completada",
      "createdAt": "ISO date"
    }
  ],
  "settings": {
    "defaultCurrency": "MXN",
    "dateFormat": "DD/MM/YYYY"
  }
}
```

---

## Migraciones Futuras

### De db.json a API REST:
Solo modificar la capa Repository, el resto sin cambios.

```javascript
// Antes (MVP)
class AccountRepository {
  async findAll() {
    const response = await fetch('/db.json');
    const data = await response.json();
    return data.accounts;
  }
}

// Después (v2.0 con backend)
class AccountRepository {
  async findAll() {
    const response = await fetch('https://api.example.com/accounts');
    return await response.json();
  }
}
```

**El resto del código no cambia** gracias al Repository Pattern.
```

---

### Paso 3: Diseñar APIs/Services (2-3 horas)

#### 3.1 Diseñar contratos de servicios

**Crear archivo:** `docs/API_DESIGN.md`

```markdown
# Diseño de APIs - Services

**Versión:** 1.0

---

## AccountService

### Constructor
```javascript
constructor(accountRepository)
```

---

### getAll()
**Propósito:** Obtener todas las cuentas del usuario

**Signature:**
```javascript
async getAll(): Promise<Account[]>
```

**Input:** Ninguno

**Output:**
```javascript
[
  { id, name, type, balance, currency, createdAt, updatedAt },
  ...
]
```

**Errores:**
- `NetworkError`: Si no se puede conectar a datos
- `ParseError`: Si datos están corruptos

**Lógica:**
1. Llamar a repository.findAll()
2. Ordenar por tipo (ahorro, corriente, inversión) y nombre
3. Retornar array

**Ejemplo de uso:**
```javascript
const accounts = await AccountService.getAll();
console.log(accounts); // [{ id: '...', name: 'Ahorro', ... }]
```

---

### getById(id)
**Propósito:** Obtener cuenta específica por ID

**Signature:**
```javascript
async getById(id: string): Promise<Account>
```

**Input:**
- `id` (string): UUID de la cuenta

**Output:** Objeto Account

**Errores:**
- `ValidationError`: Si id no es UUID válido
- `NotFoundError`: Si cuenta no existe
- `NetworkError`: Si hay problema de conexión

**Lógica:**
1. Validar que id es UUID válido
2. Llamar a repository.findById(id)
3. Si no existe, lanzar NotFoundError
4. Retornar cuenta

**Ejemplo:**
```javascript
const account = await AccountService.getById('uuid-here');
console.log(account.name); // "Ahorro"
```

---

### create(accountData)
**Propósito:** Crear nueva cuenta

**Signature:**
```javascript
async create(data: AccountCreateDTO): Promise<Account>
```

**Input:**
```typescript
AccountCreateDTO {
  name: string,
  type: 'ahorro' | 'corriente' | 'inversion',
  balance: number,         // Opcional, default 0
  currency?: string        // Opcional, default 'MXN'
}
```

**Output:** Account completo con id, timestamps

**Errores:**
- `ValidationError`: Datos inválidos (con detalles por campo)
- `NetworkError`: Error al guardar

**Lógica:**
1. Validar datos con ValidationService
2. Si inválido, lanzar ValidationError con detalles
3. Generar ID (UUID v4)
4. Agregar timestamps (createdAt, updatedAt)
5. Set defaults: balance = 0, currency = 'MXN'
6. Guardar via repository.save()
7. Retornar cuenta creada

**Ejemplo:**
```javascript
try {
  const newAccount = await AccountService.create({
    name: 'Mi Ahorro',
    type: 'ahorro',
    balance: 1000
  });
  console.log(newAccount.id); // "uuid-generado"
} catch (error) {
  if (error.name === 'ValidationError') {
    console.log(error.fields); // { name: 'error msg', ... }
  }
}
```

---

### update(id, accountData)
**Propósito:** Actualizar datos de cuenta existente

**Signature:**
```javascript
async update(id: string, data: AccountUpdateDTO): Promise<Account>
```

**Input:**
```typescript
AccountUpdateDTO {
  name?: string,
  type?: 'ahorro' | 'corriente' | 'inversion',
  currency?: string
  // Balance NO se puede actualizar directamente (solo via transacciones)
}
```

**Output:** Account actualizado

**Errores:**
- `NotFoundError`: Cuenta no existe
- `ValidationError`: Datos inválidos
- `NetworkError`: Error al guardar

**Lógica:**
1. Validar que cuenta existe (getById)
2. Validar datos nuevos
3. Merge datos: { ...existingAccount, ...newData, updatedAt: now() }
4. NO permitir cambiar: id, balance, createdAt
5. Guardar via repository.update()
6. Retornar cuenta actualizada

---

### delete(id)
**Propósito:** Eliminar cuenta

**Signature:**
```javascript
async delete(id: string): Promise<void>
```

**Input:**
- `id`: UUID de la cuenta a eliminar

**Output:** void (sin retorno si éxito)

**Errores:**
- `NotFoundError`: Cuenta no existe
- `BusinessRuleError`: Cuenta tiene transacciones (no se puede eliminar)
- `NetworkError`: Error al eliminar

**Lógica:**
1. Validar que cuenta existe
2. **Regla de negocio:** Verificar que NO tiene transacciones
   ```javascript
   const transactions = await TransactionService.getByAccountId(id);
   if (transactions.length > 0) {
     throw new BusinessRuleError('Cannot delete account with transactions');
   }
   ```
3. Si tiene transacciones, lanzar error (o ofrecer cascade delete)
4. Eliminar via repository.delete(id)

**Alternativa (v2.0):** Soft delete (marcar como deleted, no eliminar)

---

### calculateBalance(id)
**Propósito:** Calcular balance actual basado en transacciones

**Signature:**
```javascript
async calculateBalance(id: string): Promise<number>
```

**Input:**
- `id`: UUID de la cuenta

**Output:** Balance calculado (number)

**Lógica:**
```javascript
async calculateBalance(id) {
  const account = await this.getById(id);
  const transactions = await TransactionService.getByAccountId(id);

  // Balance inicial de la cuenta
  let balance = account.balance;

  // NO: esto es incorrecto, balance ya incluye transacciones pasadas
  // Mejor: balance = suma de todas las transacciones desde creación

  // Para MVP: account.balance ya es correcto (se actualiza en cada transacción)
  return account.balance;
}
```

**Nota para v2.0:** Si implementas event sourcing, balance se calcula sumando todas las transacciones. En MVP, balance se actualiza directamente.

---

## TransactionService

### getAll()
**Propósito:** Obtener todas las transacciones

**Signature:**
```javascript
async getAll(): Promise<Transaction[]>
```

**Output:** Array ordenado por fecha DESC (más reciente primero)

**Lógica:**
```javascript
async getAll() {
  const transactions = await this.repository.findAll();
  return transactions.sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  );
}
```

---

### getByAccountId(accountId)
**Propósito:** Obtener transacciones de una cuenta

**Signature:**
```javascript
async getByAccountId(accountId: string): Promise<Transaction[]>
```

**Input:**
- `accountId`: UUID de la cuenta

**Output:** Transacciones donde account es origen O destino

**Lógica:**
```javascript
async getByAccountId(accountId) {
  const transactions = await this.repository.findAll();

  return transactions.filter(t =>
    t.accountId === accountId || t.toAccountId === accountId
  ).sort((a, b) => new Date(b.date) - new Date(a.date));
}
```

---

### deposit(accountId, amount, description)
**Propósito:** Registrar depósito en una cuenta

**Signature:**
```javascript
async deposit(
  accountId: string,
  amount: number,
  description: string
): Promise<Transaction>
```

**Input:**
- `accountId`: UUID de la cuenta
- `amount`: Monto a depositar (> 0)
- `description`: Descripción opcional

**Output:** Transacción creada

**Errores:**
- `ValidationError`: Amount <= 0 o accountId inválido
- `NotFoundError`: Cuenta no existe

**Lógica:**
```javascript
async deposit(accountId, amount, description = '') {
  // 1. Validaciones
  if (amount <= 0) {
    throw new ValidationError('Amount must be positive');
  }

  // 2. Verificar que cuenta existe
  const account = await AccountService.getById(accountId);

  // 3. Crear objeto transacción
  const transaction = {
    id: generateUUID(),
    accountId,
    toAccountId: null,
    type: 'deposito',
    amount,
    description,
    date: new Date().toISOString(),
    status: 'completada',
    createdAt: new Date().toISOString()
  };

  // 4. Guardar transacción
  await this.repository.save(transaction);

  // 5. Actualizar balance de cuenta
  account.balance += amount;
  account.updatedAt = new Date().toISOString();
  await AccountService.update(account.id, { balance: account.balance });

  // 6. Retornar transacción
  return transaction;
}
```

**⚠️ Importante:** Pasos 4 y 5 deben ser atómicos (todo o nada)

---

### withdraw(accountId, amount, description)

Similar a deposit pero:
- Validación adicional: `account.balance >= amount`
- Efecto: `account.balance -= amount`

---

### transfer(fromAccountId, toAccountId, amount, description)

**Lógica crítica:**
```javascript
async transfer(fromAccountId, toAccountId, amount, description = '') {
  // 1. Validaciones
  if (fromAccountId === toAccountId) {
    throw new ValidationError('Cannot transfer to same account');
  }
  if (amount <= 0) {
    throw new ValidationError('Amount must be positive');
  }

  // 2. Obtener ambas cuentas (verificar que existen)
  const fromAccount = await AccountService.getById(fromAccountId);
  const toAccount = await AccountService.getById(toAccountId);

  // 3. Verificar saldo suficiente
  if (fromAccount.balance < amount) {
    throw new InsufficientFundsError('Insufficient funds');
  }

  // 4. Crear transacción
  const transaction = {
    id: generateUUID(),
    accountId: fromAccountId,
    toAccountId: toAccountId,
    type: 'transferencia',
    amount,
    description,
    date: new Date().toISOString(),
    status: 'completada',
    createdAt: new Date().toISOString()
  };

  // 5. ATOMIC: Actualizar ambas cuentas
  try {
    // Restar de origen
    fromAccount.balance -= amount;
    fromAccount.updatedAt = new Date().toISOString();

    // Sumar a destino
    toAccount.balance += amount;
    toAccount.updatedAt = new Date().toISOString();

    // Guardar todo (idealmente en transacción DB)
    await Promise.all([
      this.repository.save(transaction),
      AccountService.update(fromAccountId, { balance: fromAccount.balance }),
      AccountService.update(toAccountId, { balance: toAccount.balance })
    ]);

    return transaction;

  } catch (error) {
    // Si algo falla, idealmente rollback
    // En MVP con db.json, esto es difícil
    // En v2.0 con DB real, usar transacciones
    throw error;
  }
}
```

---

### filterByType(transactions, type)
**Propósito:** Filtrar transacciones por tipo

**Signature:**
```javascript
filterByType(
  transactions: Transaction[],
  type: 'todos' | TransactionType
): Transaction[]
```

**Input:**
- `transactions`: Array de transacciones
- `type`: Tipo a filtrar o 'todos'

**Output:** Array filtrado

**Lógica:**
```javascript
filterByType(transactions, type) {
  if (type === 'todos') {
    return transactions;
  }

  return transactions.filter(t => t.type === type);
}
```

**Nota:** No es async, es función pura (no toca storage)

---

### filterByDateRange(transactions, from, to)

Similar a filterByType

---

### search(transactions, query)

Buscar por descripción (case-insensitive)
```

---

### Paso 4: Diseñar componentes UI (1-2 horas)

#### 4.1 Catálogo de componentes

**Crear archivo:** `docs/COMPONENTS.md`

```markdown
# Catálogo de Componentes UI

## Principios de Diseño de Componentes

1. **Reutilizables:** No hardcodear data
2. **Configurables:** Recibir config como parámetro
3. **Single Responsibility:** Un componente = una cosa
4. **Composables:** Pequeños componentes que se combinan

---

## Atomic Design Classification

### Átomos (componentes más pequeños)
- Button
- Input
- Label
- Icon (futuro)

### Moléculas (combinación de átomos)
- InputField (Label + Input + Error message)
- ButtonGroup
- SearchBar

### Organismos (secciones completas)
- Table
- Form
- Modal
- Navbar

### Templates (pages específicas)
- AccountsPage
- TransactionsPage
- DashboardPage

---

## Componente: Table

### Propósito
Renderizar datos tabulares de forma consistente.

### API
```javascript
Table.render(container, config)
```

### Config
```typescript
interface TableConfig {
  columns: Column[];
  data: Object[];
  emptyMessage?: string;
  onRowClick?: (row: Object) => void;
}

interface Column {
  key: string;                    // Propiedad del objeto
  label: string;                  // Header de columna
  render?: (value, row) => string; // Custom render
  align?: 'left' | 'center' | 'right';
}
```

### Ejemplo de uso
```javascript
Table.render(container, {
  columns: [
    { key: 'name', label: 'Nombre' },
    { key: 'type', label: 'Tipo' },
    {
      key: 'balance',
      label: 'Balance',
      render: (value) => formatCurrency(value),
      align: 'right'
    }
  ],
  data: accounts,
  emptyMessage: 'No hay cuentas para mostrar'
});
```

### Implementación
```javascript
const Table = {
  render: (container, config) => {
    const { columns, data, emptyMessage = 'No hay datos' } = config;

    // Empty state
    if (!data || data.length === 0) {
      container.innerHTML = `<p class="empty-state">${emptyMessage}</p>`;
      return;
    }

    // Crear tabla
    const table = document.createElement('table');
    table.className = 'table';

    // Header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    columns.forEach(col => {
      const th = document.createElement('th');
      th.textContent = col.label;
      if (col.align) th.style.textAlign = col.align;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Body
    const tbody = document.createElement('tbody');

    data.forEach(row => {
      const tr = document.createElement('tr');

      columns.forEach(col => {
        const td = document.createElement('td');

        // Custom render o valor directo
        const value = row[col.key];
        const displayValue = col.render ? col.render(value, row) : value;

        td.innerHTML = displayValue;
        if (col.align) td.style.textAlign = col.align;

        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.innerHTML = '';
    container.appendChild(table);
  }
};

export default Table;
```

---

## Componente: Button

### API
```javascript
Button.render(config)
```

### Config
```typescript
interface ButtonConfig {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  type?: 'button' | 'submit';
}
```

### Implementación
```javascript
const Button = {
  render: (config) => {
    const {
      label,
      onClick,
      variant = 'primary',
      disabled = false,
      type = 'button'
    } = config;

    const button = document.createElement('button');
    button.textContent = label;
    button.className = `btn btn--${variant}`;
    button.type = type;
    button.disabled = disabled;

    if (onClick) {
      button.addEventListener('click', onClick);
    }

    return button;
  }
};

export default Button;
```

---

## Componente: Modal

### API
```javascript
Modal.open(config)
Modal.close()
```

### Config
```typescript
interface ModalConfig {
  title: string;
  content: HTMLElement | string;
  onClose?: () => void;
  size?: 'small' | 'medium' | 'large';
}
```

### Uso
```javascript
// Abrir modal con form
const form = AccountForm.render({
  onSubmit: (data) => {
    AccountService.create(data);
    Modal.close();
  }
});

Modal.open({
  title: 'Nueva Cuenta',
  content: form,
  size: 'medium'
});
```

---

## Componente: Form (genérico)

### API
```javascript
Form.render(config)
```

### Config
```typescript
interface FormConfig {
  fields: FormField[];
  onSubmit: (data: Object) => void;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
}

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'date';
  value?: any;
  placeholder?: string;
  required?: boolean;
  options?: { value: string, label: string }[]; // Para select
  validation?: (value) => string | null;
}
```

### Ejemplo
```javascript
Form.render({
  fields: [
    {
      name: 'name',
      label: 'Nombre de la cuenta',
      type: 'text',
      required: true,
      validation: (v) => v.length < 3 ? 'Mínimo 3 caracteres' : null
    },
    {
      name: 'type',
      label: 'Tipo',
      type: 'select',
      required: true,
      options: [
        { value: 'ahorro', label: 'Ahorro' },
        { value: 'corriente', label: 'Corriente' },
        { value: 'inversion', label: 'Inversión' }
      ]
    },
    {
      name: 'balance',
      label: 'Balance inicial',
      type: 'number',
      value: 0,
      required: true
    }
  ],
  submitLabel: 'Crear Cuenta',
  onSubmit: (data) => {
    console.log(data); // { name: '...', type: '...', balance: 0 }
  }
});
```

---

## Patrones de Componentes

### Pattern 1: Render-only (sin estado)
```javascript
const Component = {
  render: (container, config) => {
    container.innerHTML = `...`;
  }
};
```

**Uso:** Componentes simples, presentacionales

---

### Pattern 2: Con métodos privados
```javascript
const Component = {
  render: (container, config) => {
    container.innerHTML = this._getHTML(config);
    this._attachEvents(container, config);
  },

  _getHTML: (config) => {
    return `<div>...</div>`;
  },

  _attachEvents: (container, config) => {
    container.querySelector('.btn').addEventListener('click', ...);
  }
};
```

**Uso:** Componentes con interacción

---

### Pattern 3: Con estado (para componentes complejos)
```javascript
const Component = {
  state: {},

  render: (container, config) => {
    this.state = { ...config };
    this._render(container);
  },

  _render: (container) => {
    container.innerHTML = this._getHTML();
    this._attachEvents(container);
  },

  _getHTML: () => {
    // Usa this.state
  },

  update: (newState) => {
    this.state = { ...this.state, ...newState };
    // Re-render
  }
};
```

**Uso:** Componentes que cambian después del render inicial
```

---

### Paso 5: Diseñar patrones de comunicación (1 hora)

#### 5.1 Flujo de eventos

```markdown
# Patrones de Comunicación

## Page → Service → Repository → Data

### Ejemplo: Crear Cuenta
```javascript
// AccountsPage.js
async _handleCreateAccount(formData) {
  try {
    // Page solo coordina, no tiene lógica de negocio
    const newAccount = await AccountService.create(formData);

    // Actualizar UI
    this._showSuccessMessage('Cuenta creada');
    this._reloadAccounts();

  } catch (error) {
    this._showErrorMessage(error.message);
  }
}

// AccountService.js
async create(data) {
  // Service tiene lógica de negocio
  this._validate(data);
  const account = this._buildAccount(data);

  // Llamar a repository
  return await AccountRepository.save(account);
}

// AccountRepository.js
async save(account) {
  // Repository solo hace CRUD
  const db = await this._readDB();
  db.accounts.push(account);
  await this._writeDB(db);
  return account;
}
```

### Reglas:
- **Pages:** NO tienen lógica de negocio, solo coordinan
- **Services:** SÍ tienen lógica de negocio, NO tocan storage directamente
- **Repositories:** Solo CRUD, NO lógica de negocio

---

## Component → Component (sin parent-child)

### Pattern: Custom Events

```javascript
// Component A emite evento
const event = new CustomEvent('account-created', {
  detail: { accountId: '123' }
});
document.dispatchEvent(event);

// Component B escucha
document.addEventListener('account-created', (e) => {
  console.log('Nueva cuenta:', e.detail.accountId);
  this.reload();
});
```

**Uso:** Cuando componentes no tienen relación directa pero necesitan comunicarse.

---

## Error Handling Strategy

### Tipos de errores
```javascript
// Custom Errors
class ValidationError extends Error {
  constructor(fields) {
    super('Validation failed');
    this.name = 'ValidationError';
    this.fields = fields; // { name: 'error msg', balance: 'error msg' }
  }
}

class NotFoundError extends Error {
  constructor(resource, id) {
    super(`${resource} with id ${id} not found`);
    this.name = 'NotFoundError';
  }
}

class InsufficientFundsError extends Error {
  constructor() {
    super('Insufficient funds');
    this.name = 'InsufficientFundsError';
  }
}

class BusinessRuleError extends Error {
  constructor(rule) {
    super(`Business rule violated: ${rule}`);
    this.name = 'BusinessRuleError';
  }
}
```

### Error propagation
```
Repository → lanza error
    ↓
Service → captura, enriquece, re-lanza
    ↓
Page → captura, muestra al usuario
```

### Ejemplo
```javascript
// Repository
async findById(id) {
  const db = await readDB();
  const account = db.accounts.find(a => a.id === id);

  if (!account) {
    throw new NotFoundError('Account', id);
  }

  return account;
}

// Service
async getById(id) {
  try {
    return await this.repository.findById(id);
  } catch (error) {
    // Log para debugging
    console.error('Error fetching account:', error);
    // Re-throw para que page maneje
    throw error;
  }
}

// Page
async _loadAccount(id) {
  try {
    const account = await AccountService.getById(id);
    this._renderAccount(account);

  } catch (error) {
    // Traducir error técnico a mensaje de usuario
    let userMessage = 'Error al cargar cuenta';

    if (error.name === 'NotFoundError') {
      userMessage = 'La cuenta no existe';
    } else if (error.name === 'NetworkError') {
      userMessage = 'No se pudo conectar. Verifica tu conexión.';
    }

    this._showError(userMessage);
  }
}
```
```

---

### Paso 6: Diseñar estructura de archivos detallada (30 min)

```markdown
# Estructura de Archivos Detallada

## src/components/

### Table/
```javascript
// Table.js - Componente principal
export default Table;

// TableHeader.js (si es complejo)
// TableRow.js (si es complejo)
// styles.css - Estilos del componente
```

**Responsabilidad:** Renderizar datos en formato tabular
**Dependencias:** formatter.js (para formatear valores)
**Usado por:** AccountsPage, TransactionsPage

---

### Button/
```javascript
// Button.js
export default Button;

// styles.css
```

**Responsabilidad:** Botón reutilizable con variantes
**Dependencias:** Ninguna
**Usado por:** Todas las páginas

---

### Modal/
```javascript
// Modal.js
const Modal = {
  open: (config) => { },
  close: () => { },
  _render: () => { }
};

export default Modal;

// styles.css
```

**Responsabilidad:** Ventanas modales
**Estado:** Singleton (solo un modal abierto a la vez)
**Usado por:** Cualquier página que necesite modals

---

### Form/
```javascript
// Form.js
const Form = {
  render: (config) => { },
  validate: () => { },
  getData: () => { }
};

export default Form;
```

---

## src/services/

### accountService.js
```javascript
import AccountRepository from '../repositories/accountRepository.js';
import ValidationService from './validationService.js';

const AccountService = {
  // Public methods
  async getAll() { },
  async getById(id) { },
  async create(data) { },
  async update(id, data) { },
  async delete(id) { },

  // Private helpers
  _validate(data) { },
  _buildAccount(data) { }
};

export default AccountService;
```

**Responsabilidad:**
- Lógica de negocio de cuentas
- Validaciones
- Coordinación con repository

**NO debe:**
- Renderizar UI
- Conocer del DOM
- Hacer HTTP directo (usar repository)

---

### transactionService.js

Similar a accountService pero para transacciones

---

### validationService.js
```javascript
const ValidationService = {
  validateAccount(data) { },
  validateTransaction(data) { },
  validateAmount(amount) { },
  validateUUID(id) { }
};

export default ValidationService;
```

---

## src/repositories/

### baseRepository.js
```javascript
// Funcionalidad común a todos los repos
const BaseRepository = {
  async _readDB() {
    const response = await fetch('/db.json');
    if (!response.ok) throw new NetworkError();
    return await response.json();
  },

  async _writeDB(data) {
    // En producción: hacer POST a API
    // En dev con db.json: solo simular (no podemos escribir a file desde browser)
    console.warn('Write to db.json not possible from browser');
    // Usar localStorage o json-server para writes
  }
};

export default BaseRepository;
```

---

### accountRepository.js
```javascript
import BaseRepository from './baseRepository.js';

const AccountRepository = {
  async findAll() {
    const db = await BaseRepository._readDB();
    return db.accounts || [];
  },

  async findById(id) {
    const accounts = await this.findAll();
    const account = accounts.find(a => a.id === id);

    if (!account) {
      throw new NotFoundError('Account', id);
    }

    return account;
  },

  async save(account) {
    // Implementación depende de storage
    // Con json-server: POST /accounts
    // Con localStorage: localStorage.setItem()
  },

  async update(id, data) { },

  async delete(id) { }
};

export default AccountRepository;
```

---

## src/pages/

### AccountsPage.js
```javascript
import AccountService from '../../services/accountService.js';
import Table from '../../components/Table/Table.js';
import Modal from '../../components/Modal/Modal.js';

const AccountsPage = {
  // Public methods
  render: async (container) => {
    container.innerHTML = this._getHTML();
    await this._loadAccounts(container);
    this._attachEventListeners(container);
  },

  // Private methods
  _getHTML: () => {
    return `
      <section class="page">
        <div class="page__header">
          <h1>Mis Cuentas</h1>
          <button id="btn-new-account" class="btn btn--primary">
            + Nueva Cuenta
          </button>
        </div>
        <div id="accounts-container"></div>
      </section>
    `;
  },

  _loadAccounts: async (container) => { },

  _attachEventListeners: (container) => {
    const btnNew = container.querySelector('#btn-new-account');
    btnNew.addEventListener('click', () => this._openCreateModal());
  },

  _openCreateModal: () => { },

  _handleCreateAccount: async (formData) => { },

  _showError: (message) => { },

  _showSuccess: (message) => { }
};

export default AccountsPage;
```

**Responsabilidad:**
- Renderizar UI
- Coordinar servicios
- Manejar eventos de usuario
- Actualizar UI según resultados

**NO debe:**
- Validar datos (Service lo hace)
- Lógica de negocio
- Acceso directo a datos (usar Service)

---

## src/utils/

### formatter.js
```javascript
export function formatCurrency(amount, currency = 'MXN') {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

export function formatDate(dateString, format = 'short') {
  const date = new Date(dateString);

  if (format === 'short') {
    return date.toLocaleDateString('es-MX');
  }

  return date.toLocaleString('es-MX');
}
```

---

### validator.js
```javascript
export function isValidUUID(str) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

---

### constants.js
```javascript
export const ACCOUNT_TYPES = {
  AHORRO: 'ahorro',
  CORRIENTE: 'corriente',
  INVERSION: 'inversion'
};

export const TRANSACTION_TYPES = {
  DEPOSITO: 'deposito',
  RETIRO: 'retiro',
  TRANSFERENCIA: 'transferencia'
};

export const TRANSACTION_STATUS = {
  COMPLETADA: 'completada',
  PENDIENTE: 'pendiente',
  FALLIDA: 'fallida'
};

export const DEFAULT_CURRENCY = 'MXN';

export const VALIDATION_RULES = {
  ACCOUNT_NAME_MIN_LENGTH: 3,
  ACCOUNT_NAME_MAX_LENGTH: 50,
  TRANSACTION_DESCRIPTION_MAX_LENGTH: 200,
  MIN_AMOUNT: 0.01,
  MAX_AMOUNT: 999999999
};
```
```

---

## Parte B: Diseño por Feature (Para features complejas)

---

### Paso 7: Diseño técnico de feature específica (1-2 horas)

#### Para cada US compleja (> 5 puntos), crear documento de diseño técnico

**Template:** `docs/designs/DESIGN_US_XXX.md`

```markdown
# Diseño Técnico: US-XXX [Título]

**Fecha:** YYYY-MM-DD
**Autor:** [Nombre]
**Estado:** Draft | Approved | Implemented

---

## Overview
[Breve descripción de la funcionalidad y su propósito]

---

## Arquitectura de la Solución

### Componentes involucrados
```
User
  ↓
[TransactionsPage]
  ↓
[TransactionService.filterByType()]
  ↓
[Array.filter()] (client-side)
  ↓
[Table re-render con datos filtrados]
```

### Archivos a modificar
- ✏️ src/pages/Transactions/TransactionsPage.js
  - Agregar dropdown de filtros
  - Agregar método _handleFilterChange()
  - Modificar _loadTransactions() para aceptar filtros

- ✏️ src/services/transactionService.js
  - Agregar método filterByType()
  - Agregar método filterByDateRange() (futuro)

### Archivos a crear
- ✨ src/components/Filter/Filter.js (opcional, o inline)

---

## Diseño de Datos

### State de la página
```javascript
{
  transactions: Transaction[],     // Todas las transacciones
  filteredTransactions: Transaction[], // Después de aplicar filtros
  currentFilter: {
    type: 'todos' | 'deposito' | 'retiro' | 'transferencia',
    dateRange: null  // Para futuro
  }
}
```

### Persistencia de filtros (optional)
```javascript
// Guardar en localStorage para mantener entre reloads
localStorage.setItem('transactionFilters', JSON.stringify(filters));
```

---

## Diseño de UI

### HTML Structure
```html
<section class="page">
  <div class="page__header">
    <h1>Mis Transacciones</h1>
  </div>

  <!-- Nuevo: Filtros -->
  <div class="filters">
    <label for="filter-type">Tipo:</label>
    <select id="filter-type" class="filter-select">
      <option value="todos">Todas</option>
      <option value="deposito">Depósitos</option>
      <option value="retiro">Retiros</option>
      <option value="transferencia">Transferencias</option>
    </select>
  </div>

  <!-- Existente: Tabla -->
  <div id="transactions-table"></div>
</section>
```

### CSS (nuevo)
```css
.filters {
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.filter-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
```

---

## Lógica de Implementación

### Pseudocódigo
```
1. Al renderizar página:
   a. Cargar todas las transacciones
   b. Aplicar filtros si hay filtros guardados
   c. Renderizar tabla con transacciones filtradas

2. Al cambiar filtro:
   a. Capturar valor del select
   b. Actualizar currentFilter
   c. Filtrar array de transacciones
   d. Re-renderizar tabla
   e. Guardar filtro en localStorage

3. Si transacciones filtradas = array vacío:
   a. Mostrar empty state específico: "No hay transacciones de tipo X"
```

### Código clave (snippets)
```javascript
// TransactionsPage.js
_attachFilterListeners: (container) => {
  const filterSelect = container.querySelector('#filter-type');

  filterSelect.addEventListener('change', (e) => {
    const filterType = e.target.value;
    this._applyFilters(container, filterType);
  });
},

_applyFilters: async (container, filterType) => {
  const tableContainer = container.querySelector('#transactions-table');

  // Obtener todas las transacciones (ya cargadas en memoria)
  const allTransactions = this._allTransactions; // Guardar en variable de módulo

  // Filtrar
  const filtered = TransactionService.filterByType(allTransactions, filterType);

  // Re-renderizar tabla
  Table.render(tableContainer, {
    columns: this._getColumns(),
    data: filtered,
    emptyMessage: `No hay transacciones de tipo "${filterType}"`
  });

  // Persistir filtro
  localStorage.setItem('transactionFilter', filterType);
},

// TransactionService.js
filterByType: (transactions, type) => {
  if (type === 'todos') {
    return transactions;
  }

  return transactions.filter(t => t.type === type);
}
```

---

## Casos Edge

| Caso | Manejo |
|------|--------|
| Sin transacciones | Empty state: "No hay transacciones" |
| Filtro sin resultados | Empty state: "No hay transacciones de tipo X" |
| Cambiar filtro múltiples veces | Performance OK (< 100ms), no hacer fetch cada vez |
| Reload con filtro activo | Cargar filtro de localStorage y aplicar |

---

## Performance Considerations

- ✅ Filtrado client-side (array < 1000 items)
- ✅ No re-fetch en cada cambio de filtro
- ⚠️ Si array > 1000 transactions, considerar paginación o filtrado server-side

---

## Testing Plan

### Unit Tests (futuro)
```javascript
describe('TransactionService.filterByType', () => {
  test('returns all when type is "todos"', () => {
    const result = TransactionService.filterByType(transactions, 'todos');
    expect(result.length).toBe(10);
  });

  test('filters by deposito', () => {
    const result = TransactionService.filterByType(transactions, 'deposito');
    expect(result.every(t => t.type === 'deposito')).toBe(true);
  });
});
```

### Manual Tests
- [ ] Filtrar por cada tipo
- [ ] Cambiar filtro múltiples veces
- [ ] Reload con filtro activo
- [ ] Filtro sin resultados

---

## Estimación Detallada

| Tarea | Tiempo |
|-------|--------|
| Diseñar este documento | 1h |
| Implementar filterByType() en Service | 15min |
| Agregar UI del filtro | 30min |
| Conectar event handlers | 20min |
| Implementar persistencia localStorage | 15min |
| CSS del filtro | 20min |
| Testing manual | 30min |
| Ajustes y fixes | 30min |
| **Total** | **3h 40min ≈ 4 pts** |

---

## Alternativas Consideradas

### Alternativa 1: Crear componente Filter genérico
**Pros:** Reutilizable para futuros filtros
**Contras:** Overhead, over-engineering para MVP
**Decisión:** NO, hacer inline primero, extraer si se repite

### Alternativa 2: Filtrado server-side
**Pros:** Mejor para grandes datasets
**Contras:** Requiere backend, complejidad innecesaria para MVP
**Decisión:** NO en MVP, considerar en v2.0 si dataset > 1000

---

## Dependencias

### Depende de:
- US-006 (Ver transacciones) completada
- Table component existente

### Bloquea:
- US-011 (Búsqueda avanzada) puede reutilizar este patrón

---

## Riesgos

### Riesgo 1: Performance con muchos filtros
Si se agregan 5+ filtros combinados, performance puede degradarse.
**Mitigación:** Timebox filtering a 100ms, medir en desarrollo.

---

## Aprobación

- [ ] Diseño revisado
- [ ] Sin preguntas abiertas
- [ ] Estimación aceptable
- [ ] Listo para implementación

**Aprobado por:** ___
**Fecha:** ___
```

---

### Paso 8: Crear diagramas (45-60 min)

#### 8.1 Diagrama de clases/módulos

```markdown
# Diagrama de Módulos

```
┌─────────────────────────────────────────────────────┐
│                    Pages Layer                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────┐  ┌──────────────┐               │
│  │ AccountsPage │  │TransactionPg │               │
│  ├──────────────┤  ├──────────────┤               │
│  │+ render()    │  │+ render()    │               │
│  │- _load()     │  │- _load()     │               │
│  │- _handle()   │  │- _handle()   │               │
│  └───────┬──────┘  └───────┬──────┘               │
│          │                  │                       │
│          └────────┬─────────┘                       │
└───────────────────┼─────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────┐
│                 Services Layer                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────┐  ┌──────────────────┐        │
│  │ AccountService  │  │TransactionService│        │
│  ├─────────────────┤  ├──────────────────┤        │
│  │+ getAll()       │  │+ getAll()        │        │
│  │+ getById()      │  │+ deposit()       │        │
│  │+ create()       │  │+ withdraw()      │        │
│  │+ update()       │  │+ transfer()      │        │
│  │+ delete()       │  │+ filterByType()  │        │
│  │- _validate()    │  │- _validate()     │        │
│  └────────┬────────┘  └────────┬─────────┘        │
│           │                     │                   │
│           └──────────┬──────────┘                   │
└──────────────────────┼──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│              Repositories Layer                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌────────────────┐  ┌─────────────────┐          │
│  │ AccountRepo    │  │TransactionRepo  │          │
│  ├────────────────┤  ├─────────────────┤          │
│  │+ findAll()     │  │+ findAll()      │          │
│  │+ findById()    │  │+ findByAccount()│          │
│  │+ save()        │  │+ save()         │          │
│  │+ update()      │  │+ update()       │          │
│  │+ delete()      │  │+ delete()       │          │
│  └────────┬───────┘  └────────┬────────┘          │
│           │                    │                    │
│           └─────────┬──────────┘                    │
└─────────────────────┼───────────────────────────────┘
                      │
             ┌────────▼────────┐
             │    db.json      │
             │   (Storage)     │
             └─────────────────┘

        Cross-cutting (Utils)
┌─────────────────────────────────────┐
│ formatter │ validator │ constants  │
└─────────────────────────────────────┘
```
```

#### 8.2 Diagrama de secuencia (para flujos complejos)

**Ejemplo: Transferencia entre cuentas**

```
Usuario   Page      TransactionSvc  AccountSvc  Repository
  │         │              │             │            │
  │─submit─>│              │             │            │
  │         │              │             │            │
  │         │─transfer()──>│             │            │
  │         │              │             │            │
  │         │              │─getById()──>│            │
  │         │              │             │─findById()>│
  │         │              │<────────────│<───────────│
  │         │              │  [from acc] │            │
  │         │              │             │            │
  │         │              │─getById()──>│            │
  │         │              │<────────────│            │
  │         │              │   [to acc]  │            │
  │         │              │             │            │
  │         │              │─validate────│            │
  │         │              │ (sufficient │            │
  │         │              │  funds?)    │            │
  │         │              │             │            │
  │         │              │─save()──────┼───────────>│
  │         │              │ (transaction)            │
  │         │              │             │            │
  │         │              │─update()───>│            │
  │         │              │ (from acc)  │─update()──>│
  │         │              │             │            │
  │         │              │─update()───>│            │
  │         │              │ (to acc)    │─update()──>│
  │         │              │             │            │
  │         │<─────────────│             │            │
  │         │  [transaction]             │            │
  │         │                            │            │
  │<─UI────│                            │            │
  │ update │                            │            │
```

---

### Paso 9: Definir interfaces y contratos (30-45 min)

#### 9.1 Interfaces de servicios (TypeScript-style en comments)

```javascript
/**
 * @interface IAccountService
 */

/**
 * Obtiene todas las cuentas
 * @returns {Promise<Account[]>} Array de cuentas
 * @throws {NetworkError} Si hay error de conexión
 */
async getAll() { }

/**
 * Obtiene cuenta por ID
 * @param {string} id - UUID de la cuenta
 * @returns {Promise<Account>} Cuenta encontrada
 * @throws {NotFoundError} Si cuenta no existe
 * @throws {ValidationError} Si id inválido
 */
async getById(id) { }

/**
 * Crea nueva cuenta
 * @param {AccountCreateDTO} data - Datos de la cuenta
 * @returns {Promise<Account>} Cuenta creada con ID generado
 * @throws {ValidationError} Si datos inválidos
 */
async create(data) { }

/**
 * @typedef {Object} AccountCreateDTO
 * @property {string} name - Nombre de la cuenta (3-50 chars)
 * @property {'ahorro'|'corriente'|'inversion'} type - Tipo de cuenta
 * @property {number} [balance=0] - Balance inicial (>= 0)
 * @property {string} [currency='MXN'] - Código de moneda ISO 4217
 */

/**
 * @typedef {Object} Account
 * @property {string} id - UUID v4
 * @property {string} name
 * @property {'ahorro'|'corriente'|'inversion'} type
 * @property {number} balance
 * @property {string} currency
 * @property {string} createdAt - ISO date string
 * @property {string} updatedAt - ISO date string
 */
```

#### 9.2 Contracts tests (opcional)

```javascript
// tests/contracts/accountService.contract.test.js

describe('AccountService contract', () => {
  test('getAll returns array of accounts', async () => {
    const result = await AccountService.getAll();

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('type');
    }
  });

  test('getById throws NotFoundError when not exists', async () => {
    await expect(
      AccountService.getById('non-existent-id')
    ).rejects.toThrow(NotFoundError);
  });
});
```

---

## 🎯 Entregables de la Fase 3

### Documentos creados:

#### Diseño inicial (una vez):
- [x] docs/ARCHITECTURE.md (completo)
- [x] docs/DATA_MODEL.md (todas las entidades)
- [x] docs/API_DESIGN.md (todos los servicios)
- [x] docs/COMPONENTS.md (catálogo)
- [x] Diagrama de arquitectura general
- [x] Diagrama de flujo de datos
- [x] Estructura de carpetas definida

#### Por feature compleja:
- [x] docs/designs/DESIGN_US_XXX.md
- [x] Diagrama de componentes involucrados
- [x] Diagrama de secuencia (si flujo es complejo)
- [x] Pseudocódigo de lógica principal
- [x] Wireframe detallado con anotaciones técnicas

### Validaciones:
- [x] Arquitectura es escalable (fácil agregar features)
- [x] Separación de responsabilidades clara
- [x] Datos normalizados (sin redundancia)
- [x] Interfaces bien definidas (service contracts)
- [x] Componentes reutilizables identificados
- [x] No hay dependencias circulares
- [x] Patrones consistentes en todo el diseño

---

## 🚦 Criterios de Salida (para avanzar a Fase 4)

Puedes empezar desarrollo cuando:

- [x] ARCHITECTURE.md documentado
- [x] DATA_MODEL.md con todas las entidades del MVP
- [x] API_DESIGN.md con métodos de servicios principales
- [x] COMPONENTS.md con componentes necesarios
- [x] Estructura de carpetas creada (al menos vacía)
- [x] Para el próximo sprint: diseño técnico de cada US compleja
- [x] Diagramas principales creados (arquitectura + flujo datos)
- [x] Sin decisiones arquitectónicas críticas pendientes
- [x] Patrones y convenciones claros

---

## 💡 Tips para Diseño Efectivo

### Tip 1: Diseña para cambio
El código cambiará. Diseña para que sea fácil:
- Cambiar fuente de datos (db.json → API)
- Agregar features (filtros, búsqueda)
- Cambiar UI (componentes desacoplados)

### Tip 2: YAGNI en diseño también
No diseñes abstracciones "por si acaso".
- ¿La necesito HOY? → Diseña
- ¿La necesitaré "algún día"? → No diseñes

### Tip 3: Roba con orgullo
Busca arquitecturas similares:
- GitHub: proyectos vanilla JS bien estructurados
- Patterns: Repositorio Pattern, Service Layer, etc.

### Tip 4: Empieza simple, refactoriza después
MVP: diseño simple que funcione
v1.1+: refactorizar con patterns más sofisticados

### Tip 5: Documenta el "por qué"
No solo documentes QUÉ decidiste, sino POR QUÉ.
En 6 meses, tu yo futuro te lo agradecerá.

---

## 📚 Checklist Final de la Fase 3

```markdown
## Fase 3: Diseño Arquitectónico - Checklist

### Arquitectura General (una vez)
- [ ] Patrón arquitectónico elegido y documentado
- [ ] ARCHITECTURE.md completo
- [ ] Diagrama de capas creado
- [ ] Flujo de datos documentado
- [ ] Estructura de carpetas definida
- [ ] Carpetas creadas en el proyecto

### Modelo de Datos (una vez)
- [ ] Todas las entidades identificadas
- [ ] Atributos definidos con tipos
- [ ] Constraints y validaciones especificadas
- [ ] Relaciones mapeadas
- [ ] DATA_MODEL.md completo
- [ ] Ejemplos de datos incluidos

### APIs/Services (una vez)
- [ ] Todos los servicios del MVP diseñados
- [ ] Métodos con signatures claras
- [ ] Inputs/outputs especificados
- [ ] Errores posibles documentados
- [ ] API_DESIGN.md completo
- [ ] Ejemplos de uso incluidos

### Componentes UI (una vez)
- [ ] Componentes necesarios identificados
- [ ] APIs de componentes diseñadas
- [ ] Reutilización maximizada
- [ ] COMPONENTS.md completo
- [ ] Props/config especificados

### Por Feature Compleja
- [ ] Diseño técnico específico creado
- [ ] Componentes involucrados listados
- [ ] Archivos a modificar/crear identificados
- [ ] Pseudocódigo de lógica principal
- [ ] Casos edge considerados
- [ ] Estimación detallada
- [ ] Sin decisiones técnicas abiertas

### Validación
- [ ] Diseño revisado (auto-review o peer)
- [ ] No hay over-engineering
- [ ] Patrones consistentes
- [ ] Escalable para v1.1+
- [ ] Implementable con habilidades actuales

---

**Tiempo invertido en Fase 3:** ___ horas
**Próximo paso:** Fase 4 - Desarrollo Iterativo (escribir código)
```

---

## 🎬 Conclusión de la Fase 3

### ¿Qué lograste?
- ✅ Blueprint técnico completo
- ✅ Arquitectura clara y escalable
- ✅ Modelo de datos normalizado
- ✅ Contratos de servicios definidos
- ✅ Componentes reutilizables diseñados
- ✅ Roadmap técnico para implementación

### ¿Qué tienes ahora?
Un **mapa técnico detallado**:
- Sabes CÓMO construir cada parte
- Sabes dónde va cada código
- Sabes cómo se comunican las partes
- Puedes explicar la arquitectura a otro developer

### ¿Qué evitar en implementación?
- ❌ No desviarse del diseño sin razón fuerte
- ❌ No agregar capas extra (YAGNI)
- ❌ No mezclar responsabilidades (pages con lógica de negocio)

### Siguiente paso:
➡️ **Fase 4: Desarrollo Iterativo** (escribir código en incrementos, TDD, commits frecuentes)

---

**Recuerda:**
> "La arquitectura es fácil de cambiar en papel, difícil de cambiar en código."
> "Diseña para el 80% de casos, no para el 100%."

Ahora que tienes el diseño, es momento de construir.
