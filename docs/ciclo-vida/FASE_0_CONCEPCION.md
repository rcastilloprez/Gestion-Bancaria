# Fase 0: Concepción
## Definir la visión y alcance del proyecto

**Duración estimada:** 1-3 días (proyectos nuevos) | 2-4 horas (features grandes)
**Cuándo usar:** Al inicio de un proyecto nuevo o antes de una épica grande

---

## 🎯 Objetivo de esta fase
Responder las preguntas fundamentales:
- ¿Qué voy a construir?
- ¿Por qué es necesario?
- ¿Para quién es?
- ¿Qué problemas resuelve?

**Regla de oro:** No escribir una sola línea de código en esta fase. Solo pensar, investigar y documentar.

---

## 📋 Checklist Completa

### Paso 1: Identificar el problema (30-60 min)

#### 1.1 Definir el problema claramente
Escribe en lenguaje simple el problema que vas a resolver.

**Template:**
```markdown
## Problema
[Descripción del problema en 2-3 párrafos]

Actualmente, [situación actual].
Esto causa [consecuencias negativas].
Los usuarios necesitan [solución deseada].
```

**Ejemplo para este proyecto:**
```markdown
## Problema
Actualmente, las personas que quieren llevar control de sus finanzas personales
dependen de aplicaciones bancarias que no siempre son intuitivas, o de hojas
de cálculo que requieren configuración manual.

Esto causa frustración, falta de visibilidad sobre el estado financiero, y
dificultad para tomar decisiones informadas sobre gastos.

Los usuarios necesitan una herramienta simple, visual y accesible para gestionar
múltiples cuentas y ver su historial de transacciones de manera clara.
```

**Template general:**
```markdown
## Problema
Descripción: ____________________________________
Afecta a: _______________________________________
Frecuencia: _____________________________________
Impacto: ________________________________________
```

#### 1.2 Definir a los usuarios (User Personas)
¿Quién va a usar tu aplicación?

**Template:**
```markdown
## Persona 1: [Nombre del arquetipo]

**Demografía:**
- Edad: ___
- Ocupación: ___
- Nivel técnico: Bajo / Medio / Alto

**Necesidades:**
- Necesita ___ para ___
- Le frustra ___ porque ___
- Le gustaría poder ___

**Comportamiento:**
- Usa la aplicación [frecuencia]
- También utiliza [herramientas similares]
- Accede principalmente desde [dispositivo]

**Objetivos al usar tu app:**
1. ___
2. ___
3. ___
```

**Ejemplo para este proyecto:**
```markdown
## Persona 1: Carlos - El Organizador

**Demografía:**
- Edad: 28 años
- Ocupación: Profesional independiente
- Nivel técnico: Medio

**Necesidades:**
- Necesita ver todas sus cuentas en un solo lugar para tomar decisiones rápidas
- Le frustra no saber exactamente cuánto dinero tiene disponible porque usa múltiples cuentas
- Le gustaría poder categorizar sus gastos para entender en qué gasta más

**Comportamiento:**
- Revisa sus finanzas 2-3 veces por semana
- Usa Excel actualmente (le parece tedioso)
- Accede principalmente desde computadora de escritorio

**Objetivos:**
1. Ver balance total de todas las cuentas
2. Registrar transacciones rápidamente
3. Entender sus patrones de gasto

## Persona 2: María - La Ahorradora

**Demografía:**
- Edad: 35 años
- Ocupación: Maestra
- Nivel técnico: Bajo

**Necesidades:**
- Necesita una herramienta simple sin curva de aprendizaje
- Le frustra las apps bancarias complicadas
- Quiere ver su progreso de ahorro mes a mes

**Objetivos:**
1. Registrar cada gasto fácilmente
2. Ver gráficas simples de ahorro
3. No perderse en menús complicados
```

#### 1.3 Investigar soluciones existentes (30-45 min)

**Preguntas a responder:**
- [ ] ¿Qué soluciones similares existen?
- [ ] ¿Qué hacen bien?
- [ ] ¿Qué hacen mal?
- [ ] ¿Qué puedo aprender de ellas?
- [ ] ¿Por qué mi solución sería mejor/diferente?

**Template:**
```markdown
## Análisis Competitivo

### Solución 1: [Nombre]
**URL/Referencia:** ___
**Fortalezas:**
- ___
- ___

**Debilidades:**
- ___
- ___

**Qué aprender:**
- ___

### Solución 2: [Nombre]
[Repetir estructura]

### Mi propuesta de valor única:
Mi solución se diferencia en:
1. ___
2. ___
3. ___
```

**Ejemplo:**
```markdown
## Análisis Competitivo

### Solución 1: YNAB (You Need A Budget)
**Fortalezas:**
- Excelente sistema de presupuestos
- Sincronización bancaria
- App móvil nativa

**Debilidades:**
- Costo mensual ($15/mes)
- Curva de aprendizaje pronunciada
- Requiere conexión a internet

**Qué aprender:**
- Su enfoque en "dar trabajo a cada dólar"
- UI limpia y organizada

### Solución 2: Excel/Google Sheets
**Fortalezas:**
- Gratuito
- Totalmente personalizable
- Control total de los datos

**Debilidades:**
- Requiere conocimiento de fórmulas
- No es intuitivo para usuarios no técnicos
- Difícil de usar en móvil

### Mi propuesta de valor única:
1. **Gratuito y de código abierto** (vs YNAB)
2. **Interfaz web intuitiva** (vs Excel)
3. **Sin curva de aprendizaje** (vs YNAB)
4. **Control total de datos** (local, no en la nube)
5. **Enfoque en simplicidad** (solo lo esencial)
```

---

### Paso 2: Definir el alcance (1-2 horas)

#### 2.1 MVP (Producto Mínimo Viable)
¿Qué es lo MÍNIMO que necesitas para que sea útil?

**Criterio:** Si quito esta funcionalidad, ¿el producto sigue siendo útil?
- **No** → es parte del MVP
- **Sí** → NO es parte del MVP

**Template:**
```markdown
## MVP - Versión 1.0

### Must Have (Sin esto, no sirve)
1. [Funcionalidad esencial 1]
   - ¿Por qué es esencial?: ___
   - Esfuerzo: bajo/medio/alto

2. [Funcionalidad esencial 2]
   - ¿Por qué es esencial?: ___
   - Esfuerzo: bajo/medio/alto

### Fuera del MVP pero importante
- [Feature X] → Moverlo a v1.1 o v2.0

### Explícitamente FUERA de alcance (no construir)
- [Feature Y] - Razón: ___
- [Feature Z] - Razón: ___
```

**Ejemplo para este proyecto:**
```markdown
## MVP - Versión 1.0

### Must Have
1. **Gestión de cuentas**
   - Crear, ver, editar, eliminar cuentas
   - ¿Por qué?: Es la base de toda la app
   - Esfuerzo: Medio

2. **Registro de transacciones**
   - Depósitos, retiros, transferencias
   - ¿Por qué?: Sin esto, no puedes registrar movimientos
   - Esfuerzo: Alto

3. **Visualización de transacciones**
   - Lista de todas las transacciones
   - ¿Por qué?: Necesitas ver tu historial
   - Esfuerzo: Bajo

4. **Cálculo de balance**
   - Balance actual de cada cuenta
   - ¿Por qué?: Necesitas saber cuánto dinero tienes
   - Esfuerzo: Bajo

### Fuera del MVP - v1.1
- Filtros de transacciones (nice to have, no esencial)
- Búsqueda de transacciones
- Exportación a CSV

### Fuera del MVP - v2.0
- Categorización de gastos
- Gráficas y reportes
- Presupuestos
- Metas de ahorro

### Explícitamente FUERA de alcance
- Sincronización con bancos reales (complejidad muy alta)
- Pagos automáticos/recurrentes (requiere scheduler)
- Multi-usuario (requiere autenticación y base de datos real)
- App móvil nativa (diferente tecnología)
- Notificaciones push
```

#### 2.2 Definir success criteria (criterios de éxito)
¿Cómo sabrás que tu proyecto es exitoso?

**Template:**
```markdown
## Criterios de Éxito

### Para el MVP (v1.0)
El proyecto será exitoso si:
- [ ] Un usuario nuevo puede crear su primera cuenta en < 2 minutos
- [ ] Se pueden registrar los 3 tipos de transacciones sin errores
- [ ] La interfaz es intuitiva (usuario no requiere manual)
- [ ] Carga en < 3 segundos
- [ ] Sin bugs críticos en flujos principales

### Métricas cuantitativas (si aplica)
- Usuarios activos: ___ (si es público)
- Satisfacción: ___ / 10
- Tiempo de adopción: < ___ minutos
- Errores reportados: < ___ por mes

### Métricas cualitativas
- ¿Resuelve el problema original?: Sí/No
- ¿Es más fácil que las alternativas?: Sí/No
- ¿Lo usarías tú mismo?: Sí/No
```

---

### Paso 3: Selección de tecnología (1-2 horas)

#### 3.1 Stack tecnológico

**Criterios de selección:**
- Familiaridad (¿ya lo conoces?)
- Curva de aprendizaje (¿cuánto tiempo toma aprender?)
- Ecosistema (¿hay librerías/herramientas?)
- Longevidad (¿seguirá activo en 2-3 años?)
- Requisitos del proyecto (¿encaja con las necesidades?)

**Template:**
```markdown
## Stack Tecnológico

### Frontend
**Opciones consideradas:**
1. [Opción A] - Pros: ___ / Contras: ___
2. [Opción B] - Pros: ___ / Contras: ___

**Selección:** [Opción elegida]
**Justificación:** ___

### Backend/API
**Opciones consideradas:**
1. [Opción A] - Pros: ___ / Contras: ___
2. [Opción B] - Pros: ___ / Contras: ___

**Selección:** [Opción elegida]
**Justificación:** ___

### Base de Datos
**Opciones consideradas:**
1. [Opción A] - Pros: ___ / Contras: ___
2. [Opción B] - Pros: ___ / Contras: ___

**Selección:** [Opción elegida]
**Justificación:** ___

### Herramientas de Desarrollo
- Control de versiones: ___
- Editor/IDE: ___
- Testing: ___
- Build tool: ___
- Package manager: ___
```

**Ejemplo para este proyecto:**
```markdown
## Stack Tecnológico

### Frontend
**Opciones consideradas:**
1. React - Pros: Popular, muchos recursos / Contras: Overhead para proyecto pequeño
2. Vue - Pros: Fácil de aprender / Contras: Menos familiar para mí
3. Vanilla JS - Pros: Sin dependencias, control total / Contras: Más código manual

**Selección:** Vanilla JavaScript
**Justificación:**
- Proyecto educativo (aprender fundamentos)
- No requiere build complejo
- Tamaño mínimo del bundle
- Control total sobre el código

### Backend/API
**Opciones consideradas:**
1. Node.js + Express - Pros: JavaScript full-stack / Contras: Requiere servidor
2. JSON Server - Pros: Mock API rápido / Contras: No es real
3. LocalStorage - Pros: Sin backend / Contras: Limitado, no persistente
4. db.json + fetch local - Pros: Simple / Contras: Solo desarrollo

**Selección:** db.json (desarrollo) → Backend real (producción futura)
**Justificación:**
- Para MVP, db.json es suficiente
- Fácil migrar a API real después
- No requiere setup complejo

### Base de Datos
**Selección:** JSON file (desarrollo) → PostgreSQL/MongoDB (futuro)
**Justificación:** Empezar simple, escalar cuando sea necesario

### Herramientas
- Control de versiones: Git + GitHub
- Editor: VS Code
- Testing: Manual (MVP) → Jest (v1.1)
- Build tool: Vite (si se necesita)
- Package manager: npm
```

#### 3.2 Restricciones y limitaciones

**Template:**
```markdown
## Restricciones del Proyecto

### Técnicas
- [ ] Navegadores soportados: ___
- [ ] Compatibilidad móvil: Sí / No / Futuro
- [ ] Offline capability: Sí / No / Futuro
- [ ] Performance mínima: ___ (ej: carga < 3 seg)

### De Negocio
- [ ] Presupuesto: $___
- [ ] Timeline: ___ semanas/meses
- [ ] Recursos: ___ personas

### Legales/Seguridad
- [ ] GDPR/Privacidad: ¿Aplica?
- [ ] Datos sensibles: ¿Qué tipo?
- [ ] Auditoría: ¿Requiere?

### Personales (para proyectos individuales)
- [ ] Tiempo disponible: ___ horas/semana
- [ ] Nivel de conocimiento en tecnologías: ___
- [ ] Objetivo: Aprendizaje / Portfolio / Producción
```

**Ejemplo:**
```markdown
## Restricciones del Proyecto

### Técnicas
- Navegadores: Chrome, Firefox, Safari (últimas 2 versiones)
- Móvil: Responsive básico en MVP, app nativa en v3.0
- Offline: No en MVP, considerar para v2.0
- Performance: Carga < 3 segundos, operaciones < 500ms

### Personales
- Tiempo disponible: 10-15 horas/semana
- Nivel: JavaScript intermedio
- Objetivo: Aprendizaje + Portfolio + Uso personal

### Limitaciones
- Sin backend real en MVP (usar db.json)
- Sin autenticación en v1.0 (single-user)
- Sin sincronización multi-dispositivo
```

---

### Paso 4: Definir visión del producto (30 min)

#### 4.1 Vision Statement
Una frase que capture la esencia del proyecto.

**Template:**
```
Para [usuario objetivo]
que [necesidad/problema],
[nombre del producto] es una [categoría]
que [beneficio clave].

A diferencia de [alternativa principal],
nuestro producto [diferenciador único].
```

**Ejemplo:**
```
Para personas que quieren control sobre sus finanzas personales
que necesitan una herramienta simple y visual,
Gestión Bancaria es una aplicación web
que permite gestionar múltiples cuentas y ver transacciones claramente.

A diferencia de apps bancarias tradicionales o Excel,
nuestro producto prioriza simplicidad y control total de los datos.
```

#### 4.2 Elevator Pitch (30 segundos)
Explica tu proyecto en 30 segundos a alguien que no es técnico.

**Ejemplo:**
```
"Gestión Bancaria es una app web que te permite llevar el control de tus
cuentas bancarias y transacciones en un solo lugar. Es como Excel pero más
fácil, con una interfaz visual donde puedes ver cuánto dinero tienes, registrar
gastos y depósitos, y transferir entre cuentas. Todo se guarda localmente, así
que tienes control total de tu información."
```

---

### Paso 5: Definir alcance detallado (1-2 horas)

#### 5.1 Feature list (lista de funcionalidades)

**Template:**
```markdown
## Lista de Funcionalidades

### Categoría: [Nombre]

#### [Funcionalidad 1]
**Descripción:** ___
**Prioridad:** Must / Should / Could / Won't Have
**Complejidad:** Baja / Media / Alta
**Versión objetivo:** v1.0 / v1.1 / v2.0
**Dependencias:** [Otras funcionalidades requeridas]

#### [Funcionalidad 2]
[Repetir estructura]
```

**Ejemplo completo:**
```markdown
## Lista de Funcionalidades

### Categoría: Gestión de Cuentas

#### Ver lista de cuentas
**Descripción:** Mostrar todas las cuentas en una tabla con nombre, tipo y balance
**Prioridad:** Must Have
**Complejidad:** Baja
**Versión:** v1.0
**Dependencias:** ninguna

#### Crear nueva cuenta
**Descripción:** Formulario para agregar cuenta con nombre, tipo, balance inicial
**Prioridad:** Must Have
**Complejidad:** Media
**Versión:** v1.0
**Dependencias:** Ver lista de cuentas

#### Editar cuenta existente
**Descripción:** Modificar nombre y tipo de cuenta (no balance directamente)
**Prioridad:** Should Have
**Complejidad:** Media
**Versión:** v1.0
**Dependencias:** Ver lista de cuentas

#### Eliminar cuenta
**Descripción:** Borrar cuenta (validar que no tenga transacciones)
**Prioridad:** Should Have
**Complejidad:** Media
**Versión:** v1.0
**Dependencias:** Ver lista de cuentas

#### Ver detalle de cuenta
**Descripción:** Página individual con todas las transacciones de una cuenta
**Prioridad:** Could Have
**Complejidad:** Media
**Versión:** v1.1
**Dependencias:** Ver lista de cuentas, Ver transacciones

---

### Categoría: Transacciones

#### Ver lista de transacciones
**Descripción:** Tabla con todas las transacciones (todas las cuentas)
**Prioridad:** Must Have
**Complejidad:** Baja
**Versión:** v1.0
**Dependencias:** Gestión de cuentas

#### Registrar depósito
**Descripción:** Formulario para agregar dinero a una cuenta
**Prioridad:** Must Have
**Complejidad:** Media
**Versión:** v1.0
**Dependencias:** Ver lista de cuentas

#### Registrar retiro
**Descripción:** Formulario para retirar dinero (validar saldo suficiente)
**Prioridad:** Must Have
**Complejidad:** Media
**Versión:** v1.0
**Dependencias:** Ver lista de cuentas

#### Transferir entre cuentas
**Descripción:** Mover dinero de una cuenta a otra
**Prioridad:** Must Have
**Complejidad:** Alta (actualizar 2 cuentas atómicamente)
**Versión:** v1.0
**Dependencias:** Registrar depósito, Registrar retiro

#### Filtrar transacciones
**Descripción:** Filtrar por tipo, fecha, monto
**Prioridad:** Should Have
**Complejidad:** Media
**Versión:** v1.1
**Dependencias:** Ver lista de transacciones

#### Buscar transacciones
**Descripción:** Buscar por descripción
**Prioridad:** Could Have
**Complejidad:** Baja
**Versión:** v1.1
**Dependencias:** Ver lista de transacciones

#### Editar transacción
**Descripción:** Modificar descripción o fecha (no monto ni cuentas)
**Prioridad:** Could Have
**Complejidad:** Media
**Versión:** v1.2
**Dependencias:** Ver lista de transacciones

#### Eliminar transacción
**Descripción:** Borrar transacción y recalcular balances
**Prioridad:** Could Have
**Complejidad:** Alta (recálculo de balances)
**Versión:** v2.0
**Dependencias:** Ver lista de transacciones

---

### Categoría: Dashboard

#### Panel de resumen
**Descripción:** Balance total, cuenta con más dinero, últimas transacciones
**Prioridad:** Should Have
**Complejidad:** Media
**Versión:** v1.0
**Dependencias:** Gestión de cuentas, Transacciones

#### Gráficas de gastos/ingresos
**Descripción:** Visualizaciones con Chart.js
**Prioridad:** Could Have
**Complejidad:** Alta
**Versión:** v2.0
**Dependencias:** Dashboard básico

---

### Categoría: Utilidades

#### Exportar a CSV
**Descripción:** Descargar transacciones/cuentas como CSV
**Prioridad:** Could Have
**Complejidad:** Baja
**Versión:** v1.2
**Dependencias:** ninguna

#### Importar desde CSV
**Descripción:** Cargar datos desde archivo CSV
**Prioridad:** Won't Have (MVP)
**Complejidad:** Media
**Versión:** v2.0
**Dependencias:** ninguna

#### Configuración de moneda
**Descripción:** Elegir moneda predeterminada (USD, MXN, EUR, etc.)
**Prioridad:** Could Have
**Complejidad:** Baja
**Versión:** v1.1
**Dependencias:** ninguna

---

### Resumen por Versión

**v1.0 (MVP - 4-6 semanas)**
- Gestión de cuentas completa (CRUD)
- Transacciones básicas (depósito, retiro, transferencia)
- Visualización de transacciones
- Dashboard simple

**v1.1 (2-3 semanas)**
- Filtros y búsqueda
- Configuración de moneda
- Detalle de cuenta individual

**v1.2 (2-3 semanas)**
- Editar transacciones
- Exportar a CSV
- Mejoras de UX

**v2.0 (6-8 semanas)**
- Categorización y tags
- Gráficas y reportes
- Presupuestos y metas
- Backend real con base de datos
```

#### 5.2 Calcular esfuerzo aproximado

**Método: Planning Poker simplificado**
- 1 punto = 1-2 horas
- 2 puntos = 2-4 horas
- 3 puntos (medio día)
- 5 puntos = 1 día
- 8 puntos = 2 días
- 13 puntos = 1 semana

**Template:**
```markdown
## Estimación de Esfuerzo

| Funcionalidad | Puntos | Horas | Justificación |
|---------------|--------|-------|---------------|
| Ver lista de cuentas | 2 | 2-4h | Ya existe Table component |
| Crear cuenta | 3 | ~1 día | Form + validation + service |
| Registrar depósito | 3 | ~1 día | Similar a crear cuenta |
| Transferencias | 8 | 2 días | Lógica compleja, 2 cuentas |

**Total MVP:** ___ puntos ≈ ___ semanas
```

---

### Paso 6: Identificar riesgos (30 min)

#### 6.1 Risk assessment

**Template:**
```markdown
## Análisis de Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| [Descripción] | Alta/Media/Baja | Alto/Medio/Bajo | [Cómo reducir] |

### Riesgos técnicos
- Riesgo: ___
  Probabilidad: ___
  Impacto: ___
  Mitigación: ___

### Riesgos de alcance
- Riesgo: Feature creep (agregar funcionalidades sin control)
  Probabilidad: Alta
  Impacto: Alto (proyecto nunca termina)
  Mitigación: Backlog estricto, DoD clara, revisión semanal de alcance

### Riesgos de tiempo
- Riesgo: ___
  Probabilidad: ___
  Impacto: ___
  Mitigación: ___

### Riesgos de conocimiento
- Riesgo: No sé cómo implementar transferencias atómicas
  Probabilidad: Media
  Impacto: Medio
  Mitigación: Investigar 2-3 horas antes de sprint, considerar transacciones como una sola entidad
```

---

### Paso 7: Crear documentos fundacionales (1 hora)

#### 7.1 Documento VISION.md

**Crear archivo:** `docs/VISION.md`

**Contenido mínimo:**
```markdown
# Vision del Proyecto: [Nombre]

## Problema
[Ver template del Paso 1.1]

## Usuarios Objetivo
[Ver template del Paso 1.2]

## Solución Propuesta
[Descripción de tu solución]

## Vision Statement
[Ver template del Paso 4.1]

## Alcance

### MVP (v1.0)
- Funcionalidad esencial 1
- Funcionalidad esencial 2
- Funcionalidad esencial 3

### Roadmap Futuro
- v1.1: ___
- v2.0: ___
- v3.0: ___

### Explícitamente Fuera de Alcance
- Feature X
- Feature Y

## Criterios de Éxito
[Ver template del Paso 4.2]

## Stack Tecnológico
[Ver template del Paso 3.1]

## Riesgos Identificados
[Ver template del Paso 6.1]

---
**Última actualización:** [Fecha]
**Autor:** [Tu nombre]
```

#### 7.2 Crear README.md básico

**Contenido inicial:**
```markdown
# [Nombre del Proyecto]

> [Una línea describiendo el proyecto]

## 🎯 Qué es
[2-3 párrafos explicando el proyecto]

## ✨ Características Principales (MVP)
- Funcionalidad 1
- Funcionalidad 2
- Funcionalidad 3

## 🚀 Estado del Proyecto
**Versión actual:** v0.1.0 (en desarrollo)
**Estado:** Pre-alpha / Alpha / Beta / Stable

## 🛠️ Tecnologías
- Frontend: ___
- Backend: ___
- Database: ___

## 📦 Setup (completar en Fase 1)
```bash
# Instrucciones vendrán después del setup
```

## 👤 Autor
[Tu nombre]

## 📄 Licencia
[MIT, GPL, etc.]
```

---

### Paso 8: Review de la Concepción (30 min)

#### 8.1 Validación con preguntas clave

Responde honestamente:

**Claridad del problema:**
- [ ] ¿Puedo explicar el problema en 30 segundos?
- [ ] ¿Sé exactamente quién es mi usuario?
- [ ] ¿El problema es real o asumido?

**Viabilidad técnica:**
- [ ] ¿Tengo las habilidades necesarias?
- [ ] ¿Las tecnologías elegidas son apropiadas?
- [ ] ¿Los riesgos técnicos son manejables?

**Alcance realista:**
- [ ] ¿Puedo completar el MVP en el tiempo disponible?
- [ ] ¿El MVP es realmente mínimo viable?
- [ ] ¿Las dependencias entre features están claras?

**Valor:**
- [ ] ¿Esto resuelve un problema real?
- [ ] ¿Lo usaría yo mismo?
- [ ] ¿Vale la pena el esfuerzo?

**Si respondiste NO a más de 2 preguntas:** Reconsiderar el proyecto o ajustar alcance.

---

## 🎯 Entregables de la Fase 0

Al completar esta fase debes tener:

### Documentos creados:
- [x] docs/VISION.md (completo)
- [x] README.md (básico)
- [x] docs/FEATURE_LIST.md (listo para priorizar en Fase 1)

### Decisiones tomadas:
- [x] Problema claramente definido
- [x] Usuario objetivo identificado
- [x] MVP definido
- [x] Stack tecnológico seleccionado
- [x] Riesgos identificados
- [x] Restricciones documentadas

### Validaciones:
- [x] Vision statement claro y conciso
- [x] Alcance realista (MVP completable en tiempo disponible)
- [x] Tecnologías apropiadas para el proyecto

---

## 📊 Aplicación a tu Proyecto Actual

### Estado Actual:
Tu proyecto ya está en desarrollo, así que estás en **"Concepción retroactiva"**.

### Tarea: Documentar la visión existente
```markdown
## Para tu proyecto (30-45 min):

1. Crear docs/VISION.md basado en lo que ya construiste
2. Inferir el problema original que querías resolver
3. Documentar decisiones técnicas ya tomadas (Vanilla JS, db.json)
4. Listar todas las funcionalidades planeadas
5. Separarlas en: Completadas / En progreso / Pendientes

## Funcionalidades ya completadas:
- ✅ Página de transacciones con visualización
- ✅ Componente Table reutilizable
- ✅ TransactionService.getAll()
- ✅ Formateo de fechas

## Funcionalidades inferidas pendientes:
- ⬜ CRUD de cuentas
- ⬜ Formulario para crear transacciones
- ⬜ Dashboard
- ⬜ Filtros y búsqueda
```

---

## 🔄 Template Rápido para Proyectos Nuevos

### Concepción en 2 horas (quick start):

**Minuto 0-30: Problema y usuario**
```
¿Qué problema?: ___________________________________
¿Para quién?: _____________________________________
¿Por qué importa?: ________________________________
```

**Minuto 30-60: Solución y alcance**
```
MVP (3-5 features críticas):
1. ___
2. ___
3. ___

Fuera de MVP: ___
```

**Minuto 60-90: Tecnologías**
```
Frontend: ___
Backend: ___
Database: ___
Justificación: ___
```

**Minuto 90-120: Documentación**
```
Crear VISION.md con:
- Problema
- Solución
- MVP
- Stack
```

✅ **Resultado:** Tienes claridad para empezar la Fase 1 (Planificación)

---

## 🎓 Tips y Mejores Prácticas

### ✅ DO (Hacer):
- Involucrar a usuarios potenciales (si existen) para validar el problema
- Investigar soluciones existentes (no reinventar la rueda innecesariamente)
- Ser honesto sobre el alcance y tiempo disponible
- Documentar decisiones y justificaciones
- Validar la visión con alguien más (feedback temprano)

### ❌ DON'T (No hacer):
- Empezar a codificar "solo para probar" (tentación #1)
- Definir alcance muy amplio (recipe for disaster)
- Elegir tecnologías solo por hype (usa lo apropiado)
- Ignorar riesgos obvios (te perseguirán después)
- Saltarte esta fase porque "es solo un proyecto pequeño"

### 💡 Pro Tips:
1. **Timebox esta fase:** No te quedes atascado en planificar. 1-3 días máximo.
2. **Visión evolutiva:** Está bien no tener todas las respuestas. Itera.
3. **KISS en alcance:** Mejor un MVP sólido que un proyecto abandonado a medio hacer.
4. **Valida temprano:** Muestra tu visión a alguien más antes de invertir semanas.

---

## 🚦 Criterios de Salida (para avanzar a Fase 1)

Puedes avanzar a la Fase 1: Planificación cuando:

- [x] Tienes VISION.md completo y revisado
- [x] MVP definido con máximo 10 funcionalidades must-have
- [x] Stack tecnológico seleccionado y justificado
- [x] Riesgos principales identificados
- [x] Alcance validado como realista
- [x] Usuario objetivo claro
- [x] Propuesta de valor diferenciada de alternativas

**¿No cumples alguno?** No avances todavía. Invierte más tiempo en esta fase.

---

## 📚 Checklist Final de la Fase 0

```markdown
## Fase 0: Concepción - Checklist

### Investigación
- [ ] Problema claramente definido (en 1-2 párrafos)
- [ ] User personas documentadas (mínimo 1, ideal 2-3)
- [ ] Análisis competitivo realizado (mínimo 2 alternativas)
- [ ] Propuesta de valor única identificada

### Alcance
- [ ] MVP definido (3-10 funcionalidades must-have)
- [ ] Roadmap tentativo creado (v1.0, v1.1, v2.0)
- [ ] Features explícitamente fuera de alcance listadas
- [ ] Estimación de esfuerzo realizada

### Tecnología
- [ ] Stack tecnológico seleccionado
- [ ] Justificaciones documentadas
- [ ] Restricciones técnicas identificadas
- [ ] Riesgos evaluados y mitigados

### Documentación
- [ ] VISION.md creado y completo
- [ ] README.md inicial creado
- [ ] Vision statement redactado
- [ ] Elevator pitch preparado

### Validación
- [ ] Visión revisada (self-review o con peer)
- [ ] Alcance validado como realista
- [ ] No hay blockers críticos identificados
- [ ] Listo para empezar planificación detallada

---

**Tiempo total invertido en Fase 0:** ___ horas
**Fecha de inicio:** ___
**Fecha de finalización:** ___
**Próximo paso:** Fase 1 - Planificación
```

---

## 🎬 Conclusión de la Fase 0

### ¿Qué lograste?
- ✅ Claridad sobre QUÉ vas a construir
- ✅ Entendimiento de PARA QUIÉN
- ✅ Definición de POR QUÉ es necesario
- ✅ Alcance realista y priorizado
- ✅ Technology stack definido
- ✅ Fundamentos documentados

### ¿Qué tienes que evitar?
- ❌ Cambiar el MVP cada semana (scope creep)
- ❌ Elegir tecnologías sin justificación
- ❌ Empezar a codificar sin completar la visión

### Siguiente paso:
➡️ **Fase 1: Planificación** (crear BACKLOG.md, SPRINTS.md, ARCHITECTURE.md)

---

**Recuerda:**
> "Horas de planificación ahorran semanas de desarrollo caótico."

La Fase 0 es tu fundación. Una fundación sólida sostiene edificios grandes.
