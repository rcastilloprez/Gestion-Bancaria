# Metodología de Desarrollo - Gestión Bancaria

## 🎯 Filosofía
**"Planificar primero, codificar después"**

Este documento te guiará para desarrollar funcionalidades de manera estructurada y evitar programar "en la marcha".

---

## 📋 Proceso de Desarrollo por Funcionalidad

### Fase 1: ANÁLISIS (15-20 min)

#### 1.1 Definir el "qué"
- [ ] ¿Qué funcionalidad voy a implementar?
- [ ] ¿Qué problema resuelve para el usuario?
- [ ] ¿Cuál es el flujo de usuario esperado?

**Ejemplo:**
```
Funcionalidad: Filtrar transacciones por tipo
Problema: El usuario no puede ver solo depósitos o solo retiros
Flujo: Usuario selecciona tipo → tabla se actualiza → muestra solo ese tipo
```

#### 1.2 Identificar componentes afectados
- [ ] ¿Qué archivos necesito modificar?
- [ ] ¿Qué servicios/utilidades voy a usar?
- [ ] ¿Necesito crear nuevos componentes?

**Ejemplo:**
```
Archivos a modificar:
- src/pages/Transactions/TransactionsPage.js (agregar filtros)
- src/services/transactionService.js (método de filtrado)

Componentes nuevos:
- src/components/Filter/Filter.js (componente reutilizable)
```

#### 1.3 Revisar el código existente
- [ ] Leer los archivos relacionados
- [ ] Identificar patrones actuales del proyecto
- [ ] Verificar cómo se manejan casos similares

**Comando útil:**
```bash
# Buscar ejemplos de filtrado en el proyecto
grep -r "filter" src/
```

---

### Fase 2: DISEÑO (10-15 min)

#### 2.1 Diseñar la estructura de datos
- [ ] ¿Qué datos necesito?
- [ ] ¿Qué formato tienen?
- [ ] ¿De dónde vienen los datos?

**Ejemplo:**
```javascript
// Estado del filtro
{
  type: 'todos' | 'deposito' | 'retiro' | 'transferencia',
  dateRange: { from: Date, to: Date },
  minAmount: Number,
  maxAmount: Number
}
```

#### 2.2 Diseñar la interfaz (UI)
- [ ] Boceto rápido en papel o texto
- [ ] ¿Dónde va el componente?
- [ ] ¿Qué elementos HTML necesito?

**Ejemplo:**
```
[Mis transacciones]
┌─────────────────────────────────┐
│ Tipo: [Todos ▼] Desde: [____]  │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│   Tabla de transacciones        │
└─────────────────────────────────┘
```

#### 2.3 Diseñar la lógica
- [ ] Pseudocódigo de la funcionalidad principal
- [ ] Identificar casos edge
- [ ] Manejo de errores

**Ejemplo:**
```
Pseudocódigo:
1. Usuario selecciona filtro
2. Capturar valor del select
3. Si es "todos" → mostrar todas las transacciones
4. Si es específico → filtrar array por type
5. Renderizar tabla con datos filtrados
6. Si no hay resultados → mostrar mensaje vacío
```

---

### Fase 3: IMPLEMENTACIÓN (tiempo variable)

#### 3.1 Orden de implementación
Seguir este orden reduce errores:

1. **Datos primero (backend/services)**
   ```javascript
   // 1. TransactionService: agregar método de filtrado
   static filterByType(transactions, type) { ... }
   ```

2. **Lógica de negocio (controladores/páginas)**
   ```javascript
   // 2. TransactionsPage: agregar manejo de filtros
   _handleFilterChange: (filterValue) => { ... }
   ```

3. **Interfaz de usuario (componentes/HTML)**
   ```javascript
   // 3. Agregar select de filtros al HTML
   <select id="transaction-filter">...</select>
   ```

4. **Integración y pruebas**
   - Probar cada parte individualmente
   - Integrar y probar el flujo completo

#### 3.2 Commits estratégicos
NO esperar a terminar todo para hacer commit:

- ✅ Commit después de cada sub-funcionalidad completa
- ✅ Commits pequeños y frecuentes
- ✅ Mensajes descriptivos

**Ejemplo:**
```bash
git commit -m "Add filterByType method to TransactionService"
git commit -m "Add filter UI to TransactionsPage"
git commit -m "Connect filter UI with service logic"
```

---

### Fase 4: VALIDACIÓN (5-10 min)

#### 4.1 Checklist de calidad
- [ ] ¿Funciona el happy path?
- [ ] ¿Maneja errores correctamente?
- [ ] ¿Qué pasa si no hay datos?
- [ ] ¿Es consistente con el resto del código?
- [ ] ¿Hay código duplicado que pueda extraer?

#### 4.2 Pruebas manuales
- [ ] Probar en el navegador
- [ ] Probar casos edge (sin datos, errores, etc.)
- [ ] Verificar consola (sin errores)

#### 4.3 Refactorización (si es necesario)
- [ ] ¿Hay código repetido?
- [ ] ¿Los nombres son claros?
- [ ] ¿Puedo simplificar algo?

---

## 🎨 Plantillas para Funcionalidades Comunes

### Template: Agregar nueva página

```markdown
## Análisis
- Nombre de la página: _______
- Ruta: _______
- Datos que muestra: _______

## Archivos necesarios
- [ ] src/pages/[NombrePagina]/[NombrePagina]Page.js
- [ ] src/pages/[NombrePagina]/styles.css (si es necesario)
- [ ] Actualizar router.js

## Pasos de implementación
1. Crear archivo de página con estructura básica
2. Implementar método render()
3. Agregar ruta al router
4. Probar navegación
5. Implementar lógica específica
```

### Template: Agregar filtros/búsqueda

```markdown
## Análisis
- ¿Qué datos filtrar?: _______
- ¿Criterios de filtro?: _______
- ¿Dónde va el UI?: _______

## Implementación
1. [ ] Service: agregar método de filtrado
2. [ ] UI: agregar controles (select/input)
3. [ ] Event handlers: conectar UI con lógica
4. [ ] Actualizar tabla/vista con resultados filtrados
5. [ ] Manejar "sin resultados"
```

### Template: Agregar operación (depósito, retiro, etc.)

```markdown
## Análisis
- Operación: _______
- Datos requeridos: _______
- Validaciones: _______

## Implementación
1. [ ] db.json: verificar estructura de datos
2. [ ] Service: método para la operación
3. [ ] Validación de datos (monto, cuenta, etc.)
4. [ ] UI: formulario/modal
5. [ ] Manejo de éxito/error
6. [ ] Actualizar vista después de la operación
```

---

## 🛠️ Herramientas de Apoyo

### Checklist antes de empezar
```
[ ] ¿Leí el código relacionado?
[ ] ¿Entiendo la arquitectura actual?
[ ] ¿Tengo claro qué archivos modificar?
[ ] ¿Diseñé la estructura de datos?
[ ] ¿Tengo un pseudocódigo o plan escrito?
```

### Preguntas clave durante el desarrollo
- ¿Este código ya existe en otro lugar? (evitar duplicación)
- ¿Este nombre de variable/función es claro?
- ¿Qué pasa si esto falla?
- ¿Esto es consistente con el resto del código?

### Señales de que vas mal
- 🚩 Estás modificando 5+ archivos sin plan claro
- 🚩 No sabes qué archivo modificar siguiente
- 🚩 Estás escribiendo código y borrando constantemente
- 🚩 No recuerdas qué cambios ya hiciste
- 🚩 El código se está volviendo muy complejo

**Si ves estas señales:** PAUSA y vuelve a la fase de análisis.

---

## 📝 Ejemplo Práctico: Tu Proyecto Actual

### Funcionalidad: Página de Transacciones (ya implementada)

**Como debió haberse planificado:**

#### 1. Análisis
- Página para mostrar todas las transacciones del usuario
- Datos: lista de transacciones de db.json
- Mostrar en tabla con columnas: origen, destino, tipo, monto, descripción, fecha

#### 2. Diseño
```javascript
// Estructura de datos esperada
transactions: [{
  id, accountId, toAccountId, type, amount, description, date
}]

// Componentes reutilizables
- Table.js (ya existe)
- TransactionService.getAll()
```

#### 3. Implementación
1. ✅ Crear TransactionsPage.js
2. ✅ Implementar render() con estructura HTML
3. ✅ Crear _loadTransactions()
4. ✅ Usar TransactionService.getAll()
5. ✅ Configurar columnas del Table component
6. ✅ Manejar estado de carga
7. ✅ Manejar errores

#### 4. Validación
- ✅ Funciona con datos
- ✅ Muestra mensaje si no hay datos
- ✅ Maneja errores
- ⚠️ Mensaje de error dice "Error al cargar cuentas" (debería ser "transacciones")

---

## 🎯 Siguiente Funcionalidad Sugerida

Si quieres practicar esta metodología, te sugiero implementar una de estas:

### Opción A: Filtrar transacciones
**Complejidad:** Media
**Tiempo estimado:** 1-2 horas

### Opción B: Buscar transacciones por descripción
**Complejidad:** Baja
**Tiempo estimado:** 30-45 min

### Opción C: Exportar transacciones a CSV
**Complejidad:** Media
**Tiempo estimado:** 1-2 horas

---

## 💡 Tips Finales

1. **Escribe el plan ANTES de codificar** (en papel, comentarios, o un .md temporal)
2. **Lee el código existente** para mantener consistencia
3. **Commits pequeños y frecuentes** (cada sub-funcionalidad)
4. **Prueba cada pieza** antes de integrar
5. **Refactoriza al final**, no durante la implementación inicial

---

## 🔄 Flujo Rápido (para funcionalidades pequeñas)

```
1. Leer código relacionado (5 min)
2. Escribir pseudocódigo en comentarios (3 min)
3. Implementar siguiendo el pseudocódigo (variable)
4. Probar en navegador (5 min)
5. Refactorizar si es necesario (5 min)
6. Commit (1 min)
```

---

**Recuerda:** Es mejor invertir 15 minutos planificando que 2 horas arreglando código mal estructurado.
