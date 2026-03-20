# Fase 7: Despliegue (Deployment)
## Publicar la aplicación para usuarios

**Duración estimada:** 1-3 días (primera vez) | 1-2 horas (subsecuentes)
**Prerequisito:** Código funcional, testeado y documentado
**Cuándo usar:** Cuando estés listo para que usuarios accedan a la aplicación

---

## 🎯 Objetivo de esta fase
Hacer que tu aplicación sea accesible públicamente:
- Elegir plataforma de hosting
- Configurar deployment pipeline
- Realizar deploy inicial
- Verificar que funciona en producción
- Configurar dominio (opcional)

**Regla de oro:** Deployment no es el final del proyecto, es el inicio de la vida real de tu aplicación.

---

## 📋 Checklist Pre-Deployment

### Antes de desplegar (Readiness Checklist)

```markdown
## Code Readiness
- [ ] Todos los tests passing
- [ ] 0 bugs críticos abiertos
- [ ] Performance aceptable (Lighthouse > 80)
- [ ] Sin console.logs de debugging
- [ ] Sin código comentado
- [ ] Variables de entorno configuradas

## Security Checklist
- [ ] Sin API keys hardcoded
- [ ] Sin datos sensibles en código
- [ ] HTTPS habilitado
- [ ] CORS configurado correctamente (si aplica)
- [ ] Inputs validados (XSS, injection prevention)

## Documentation Readiness
- [ ] README actualizado
- [ ] CHANGELOG completo
- [ ] Versión tagged en git: `git tag v1.0.0`

## Build Readiness
- [ ] Build process funciona: `npm run build`
- [ ] Build output verificado (archivos existen)
- [ ] Assets optimizados (imágenes comprimidas)
- [ ] Bundle size aceptable (< 500KB ideal)

## Data Readiness
- [ ] db.json con estructura correcta
- [ ] Datos de prueba preparados (o vacío para producción)
- [ ] Backup plan definido

---

**Status:** ✅ READY / ⚠️ NOT READY
**Bloqueadores:** ___
```

---

## 🌐 Opciones de Hosting

### Comparación de Plataformas

```markdown
| Plataforma | Tipo | Costo | Complejidad | CI/CD | Backend | Recomendado Para |
|------------|------|-------|-------------|-------|---------|------------------|
| **Netlify** | JAMstack | Gratis | Baja | ✅ Auto | Limited | Apps frontend |
| **Vercel** | JAMstack | Gratis | Baja | ✅ Auto | ✅ Serverless | Next.js, React |
| **GitHub Pages** | Static | Gratis | Muy baja | Manual | ❌ No | Proyectos simples |
| **Railway** | Full-stack | Gratis tier | Media | ✅ Auto | ✅ Full | Apps con backend |
| **Render** | Full-stack | Gratis tier | Media | ✅ Auto | ✅ Full | Apps con backend |
| **Heroku** | Full-stack | $$$ | Media | ✅ Auto | ✅ Full | Legacy apps |
| **VPS** | Custom | $$$ | Alta | Manual | ✅ Full | Control total |
```

---

### Recomendación para tu Proyecto

**MVP (solo frontend + db.json):**
- **Primera opción:** Netlify
  - Pros: Gratis, fácil, auto-deploy desde GitHub
  - Contras: No puede servir db.json dinámico

- **Segunda opción:** GitHub Pages + json-server en Railway
  - Frontend en GitHub Pages (gratis)
  - json-server API en Railway (gratis tier)

**v2.0 (con backend real):**
- Railway o Render (full-stack)

---

## 🚀 Deployment Steps (Netlify)

### Opción A: Deploy via GitHub (Recomendado - CI/CD automático)

#### Paso 1: Preparar configuración

**Crear archivo:** `netlify.toml` en la raíz

```toml
[build]
  # Build command
  command = "npm run build"

  # Build output directory
  publish = "dist"

[build.environment]
  # Node version
  NODE_VERSION = "18"

# Redirects para SPA routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Headers de seguridad
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

#### Paso 2: Push a GitHub

```bash
# Asegurar que todo está commiteado
git status

# Verificar que build funciona localmente
npm run build

# Tag de versión
git tag v1.0.0
git push origin main --tags

# Push
git push origin main
```

---

#### Paso 3: Conectar Netlify con GitHub

1. **Ir a [Netlify](https://app.netlify.com)**
2. Click **"New site from Git"**
3. Elegir **GitHub** (autorizar si es primera vez)
4. Seleccionar tu repositorio: `gestion-bancaria`
5. Configurar build settings:
   - **Branch to deploy:** `main`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **"Deploy site"**

**Resultado:**
- Netlify asigna URL temporal: `random-name-12345.netlify.app`
- Auto-deploy cada push a main

---

#### Paso 4: Verificar deployment

```markdown
## Deployment Verification Checklist

### Accessibility
- [ ] Abrir URL en browser
- [ ] App carga correctamente
- [ ] Sin errores 404 en assets

### Functionality
- [ ] Navegación funciona (todas las páginas)
- [ ] Crear cuenta funciona
- [ ] Registrar transacción funciona
- [ ] Datos persisten (LocalStorage funciona)

### Performance
- [ ] Carga inicial < 5 segundos
- [ ] Lighthouse score > 80 (en producción)

### Cross-browser
- [ ] Chrome: ✅
- [ ] Firefox: ✅
- [ ] Safari: ✅
- [ ] Edge: ✅

### Mobile
- [ ] Responsive funciona
- [ ] Touch interactions OK

---

**Status:** ✅ VERIFIED / ❌ ISSUES FOUND
**Issues:** ___
```

---

### Opción B: Deploy Manual (CLI)

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy (primera vez)
netlify deploy --prod

# O deploy preview (no prod)
netlify deploy
```

---

## 🔧 Deploy con GitHub Pages

### Setup para GitHub Pages

#### Paso 1: Configurar build

**package.json:**
```json
{
  "scripts": {
    "build": "vite build --base=/gestion-bancaria/",
    "deploy": "npm run build && gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^5.0.0"
  }
}
```

**⚠️ Nota:** `--base` debe ser el nombre de tu repositorio.

---

#### Paso 2: Instalar y ejecutar

```bash
# Instalar dependencia
npm install -D gh-pages

# Build y deploy
npm run deploy
```

---

#### Paso 3: Configurar GitHub

1. Ir a repo en GitHub
2. Settings → Pages
3. Source: **gh-pages branch**
4. Save

**URL resultante:** `https://tu-usuario.github.io/gestion-bancaria/`

---

## 🔐 Configurar Dominio Custom (Opcional)

### Con Netlify

```markdown
## Pasos para Dominio Custom

### 1. Comprar dominio
- Comprar en: Namecheap, Google Domains, etc.
- Ejemplo: `gestion-bancaria.com`

### 2. Configurar en Netlify
1. En Netlify dashboard → Site settings
2. Domain management → Add custom domain
3. Ingresar: `gestion-bancaria.com`
4. Netlify te da DNS records

### 3. Configurar DNS
En tu registrador de dominios:

**Para dominio raíz (gestion-bancaria.com):**
```
Type: A
Name: @
Value: 75.2.60.5 (Netlify load balancer)
```

**Para www (www.gestion-bancaria.com):**
```
Type: CNAME
Name: www
Value: tu-site.netlify.app
```

### 4. Habilitar HTTPS
Netlify lo hace automáticamente (Let's Encrypt)

### 5. Verificar
- ✅ https://gestion-bancaria.com carga
- ✅ https://www.gestion-bancaria.com redirige
- ✅ Certificado SSL válido (candado verde)

**Tiempo de propagación:** 1-24 horas
```

---

## 📊 Monitoreo Post-Deployment

### Analytics (Opcional)

#### Opción 1: Netlify Analytics (Pagado)
```markdown
- Visitas
- Page views
- Bandwidth usage
```

#### Opción 2: Google Analytics (Gratis)

**Agregar a `index.html`:**
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### Opción 3: Simple Analytics (Privacy-friendly)
```html
<script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
```

---

### Error Monitoring

#### Opción 1: Sentry (Recomendado para producción)

```bash
npm install @sentry/browser
```

```javascript
// main.js
import * as Sentry from "@sentry/browser";

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: "YOUR_SENTRY_DSN",
    environment: "production",
    release: "gestion-bancaria@1.0.0"
  });
}
```

#### Opción 2: Console monitoring

```javascript
// Capturar errores no manejados
window.addEventListener('error', (event) => {
  console.error('Unhandled error:', event.error);
  // Enviar a servicio de logging
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
```

---

### Health Checks

```markdown
## Health Check Routine (Semanal)

### Uptime
- [ ] Sitio está accesible (no 404, no 500)
- [ ] Tiempo de carga aceptable

### Functionality
- [ ] Flujo principal funciona end-to-end
- [ ] No errores en consola

### Logs (si tienes backend)
- [ ] Revisar logs de errores
- [ ] Check usage metrics

### SSL Certificate
- [ ] Certificado válido (no expirado)
- [ ] HTTPS redirection funciona

---

**Herramienta recomendada:** UptimeRobot (gratis, te notifica si sitio cae)
```

---

## 🔄 CI/CD (Continuous Integration/Deployment)

### GitHub Actions (Automatizar más)

**Crear:** `.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Build
        run: npm run build

      - name: Test build output
        run: |
          test -d dist
          test -f dist/index.html

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install and Build
        run: |
          npm ci
          npm run build

      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: './dist'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

**Beneficios:**
- Auto-test en cada PR
- Auto-deploy en merge a main
- Feedback inmediato si algo se rompe

---

## 🐛 Troubleshooting Deployment

### Issue 1: Build falla en Netlify pero funciona local

**Causa posible:**
- Diferencia en versión de Node
- Variables de entorno faltantes
- Dependencia en devDependencies (debería estar en dependencies)

**Solución:**
```toml
# netlify.toml
[build.environment]
  NODE_VERSION = "18"  # Especificar versión exacta
```

---

### Issue 2: Página blanca después de deploy

**Causa posible:**
- Rutas incorrectas (base path)
- Assets no encontrados (404)

**Solución:**
```javascript
// vite.config.js
export default {
  base: '/gestion-bancaria/',  // ← Para GitHub Pages
  // o
  base: '/',  // ← Para Netlify/Vercel
};
```

---

### Issue 3: SPA routing no funciona (refresh = 404)

**Causa:**
- Server no configurado para SPA

**Solución Netlify:**
```toml
# netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Solución GitHub Pages:**
```html
<!-- 404.html (copia de index.html) -->
```

---

### Issue 4: HTTPS no funciona

**Netlify/Vercel:** Automático, esperar 1-24 horas

**GitHub Pages:**
1. Settings → Pages
2. Enforce HTTPS: ✅

---

## 📦 Deployment Packaging

### Deployment Checklist

```markdown
# Pre-Deployment Package

## Version Control
- [ ] Código en `main` branch
- [ ] Tagged: `git tag v1.0.0`
- [ ] CHANGELOG actualizado
- [ ] README actualizado

## Build
- [ ] `npm run build` exitoso
- [ ] Output en `dist/` verificado
- [ ] Assets presentes (HTML, JS, CSS)
- [ ] Source maps generados (para debugging)

## Configuration Files
- [ ] netlify.toml (o equivalente)
- [ ] .gitignore correcto (no commits de dist/ si no es necesario)
- [ ] package.json con scripts de deploy

## Environment Variables
- [ ] Documentadas en README
- [ ] Configuradas en plataforma (si aplica)
- [ ] No hay secrets en código

## DNS (si custom domain)
- [ ] Registros DNS configurados
- [ ] Propagación verificada: `nslookup dominio.com`

## SSL
- [ ] Certificado instalado
- [ ] HTTPS redirection habilitada

---

**Packaged by:** ___
**Date:** ___
**Version:** ___
**Ready for deployment:** ✅ YES / ❌ NO
```

---

## 🎯 Post-Deployment Tasks

### Inmediatamente después de deploy

```markdown
## Post-Deploy Checklist (15-30 min)

### Smoke Testing
- [ ] Sitio accesible en producción
- [ ] Crear cuenta funciona
- [ ] Registrar transacción funciona
- [ ] Navegación funciona
- [ ] No errores en consola

### Monitoring Setup
- [ ] Analytics configurado (si aplica)
- [ ] Error monitoring configurado (Sentry, etc.)
- [ ] Uptime monitoring configurado (UptimeRobot)

### Communication
- [ ] Anunciar release (si es público):
      - Twitter, LinkedIn, etc.
      - Communities (Reddit, Discord, etc.)
- [ ] Enviar a beta testers (si aplica)

### Documentation
- [ ] Link a producción en README
- [ ] Status badge actualizado (if using shields.io)
- [ ] Docs reflejan versión deployed

### Backup
- [ ] Snapshot del código deployed
- [ ] Backup de datos (si aplica)

---

**Deployed at:** ___ (timestamp)
**URL:** https://___
**Version:** v1.0.0
**Status:** ✅ LIVE
```

---

### Primera semana post-deploy

```markdown
## Week 1 Monitoring

### Daily Checks (5 min/día)
- [ ] Sitio está up (check URL)
- [ ] Revisar analytics (si configurado)
- [ ] Revisar error logs (Sentry, etc.)

### Issues encontrados
- Issue 1: ___
  Status: ___
  Priority: ___

### User Feedback
- Feedback 1: ___
- Feedback 2: ___

### Metrics (end of week)
- Unique visitors: ___
- Page views: ___
- Errors: ___
- Uptime: ___

---

**All good?** ✅ YES / ⚠️ ISSUES FOUND
```

---

## 🔄 Deployment Workflow (Subsecuentes)

### Release Process para v1.1+

```markdown
## Release Workflow

### 1. Feature Development (1-2 semanas)
- Desarrollar en `feature/` branches
- Merge a `main` via PR
- Tests automáticos passing

### 2. Pre-Release Testing (1-2 días)
- Deploy a staging (Netlify preview deploy)
- Testing exhaustivo
- Fix bugs encontrados

### 3. Release Preparation (1 hora)
```bash
# Actualizar version
npm version minor  # ej: 1.0.0 → 1.1.0

# Actualizar CHANGELOG
# ... editar CHANGELOG.md ...

# Commit y tag
git add .
git commit -m "chore: release v1.1.0"
git tag v1.1.0

# Push
git push origin main --tags
```

### 4. Deploy (Automático)
- Netlify detecta push a main
- Build y deploy automático
- Verificar en producción (5 min)

### 5. Announcement
- GitHub release notes
- Social media
- Email a usuarios (si tienes lista)

---

**Frecuencia recomendada:** 1 release cada 2-4 semanas
```

---

## 🎯 Entregables de la Fase 7

### Configuración:
- [x] Plataforma de hosting seleccionada (Netlify, Vercel, etc.)
- [x] Configuración files creados (netlify.toml, etc.)
- [x] DNS configurado (si custom domain)
- [x] SSL habilitado

### Deployment:
- [x] Build exitoso en producción
- [x] App desplegada y accesible
- [x] URL público funcionando
- [x] Smoke testing completado

### Monitoring:
- [x] Analytics configurado (opcional)
- [x] Error monitoring configurado (recomendado)
- [x] Uptime monitoring configurado

### Documentación:
- [x] README actualizado con link a producción
- [x] DEPLOYMENT.md con instrucciones (opcional)
- [x] CHANGELOG con release notes

### Comunicación:
- [x] Release anunciado (si es público)
- [x] v1.0.0 tagged en git

---

## 🚦 Criterios de Salida (deployment completo)

Deployment está completo cuando:

**Accessibility:**
- [x] App accesible vía URL público
- [x] URL funciona en diferentes redes (no solo local)
- [x] HTTPS habilitado (candado verde)

**Functionality:**
- [x] Todas las features funcionan en producción
- [x] No errores en producción que no existían en dev
- [x] Performance aceptable (similar a local)

**Stability:**
- [x] Sin crashes en primeras 24 horas
- [x] Uptime > 99%

**Monitoring:**
- [x] Tienes forma de saber si algo se rompe
- [x] Puedes ver errores de usuarios
- [x] Puedes ver métricas básicas (visitas, etc.)

**Process:**
- [x] Deployment reproducible (no "funcionó por suerte")
- [x] CI/CD configurado para futuros deploys
- [x] Rollback plan definido (si algo sale mal)

---

## 💡 Tips de Deployment

### Tip 1: Deploy temprano y frecuente

```
❌ Malo: Desarrollar 3 meses, deploy una vez al final
✅ Bueno: Deploy MVP día 1, iterar en producción
```

**Por qué:** Feedback real de usuarios > suposiciones

---

### Tip 2: Staging environment

```
Development → Staging → Production
```

**Staging** = Copia exacta de prod para testing final antes de release

Para proyectos pequeños: Netlify preview deploys son suficientes

---

### Tip 3: Feature flags para releases seguras

```javascript
// constants.js
const FEATURE_FLAGS = {
  ENABLE_EXPORT: import.meta.env.PROD && import.meta.env.VITE_ENABLE_EXPORT
};

// Usar en código
if (FEATURE_FLAGS.ENABLE_EXPORT) {
  renderExportButton();
}
```

**Beneficio:** Deploy código nuevo pero deshabilitado, habilitar después

---

### Tip 4: Rollback plan

**Si algo sale mal en producción:**

```bash
# Opción 1: Revert último commit
git revert HEAD
git push origin main
# Netlify auto-deploys la versión anterior

# Opción 2: Rollback a tag anterior en Netlify UI
# Site settings → Deploys → Find previous deploy → Publish

# Opción 3: Deploy tag anterior manualmente
git checkout v0.9.0
npm run build
netlify deploy --prod
```

---

### Tip 5: Blue-Green Deployment (avanzado)

```markdown
## Blue-Green Strategy

**Setup:**
- Blue: Versión actual en producción
- Green: Nueva versión en staging

**Process:**
1. Deploy nueva versión a Green
2. Test exhaustivo en Green
3. Switch traffic de Blue a Green (instant cutover)
4. Si falla, switch back a Blue immediately

**Netlify:** Branch deploys facilitan esto
```

---

## 📚 Checklist Final de la Fase 7

```markdown
## Fase 7: Despliegue - Checklist

### Pre-Deployment
- [ ] Pre-deployment checklist 100% completa
- [ ] Security checklist verificada
- [ ] Build funciona localmente
- [ ] Version tagged en git

### Deployment
- [ ] Plataforma elegida y configurada
- [ ] Deploy completado exitosamente
- [ ] URL público accesible
- [ ] SSL habilitado (HTTPS)

### Verification
- [ ] Smoke testing en producción
- [ ] Functionality check completo
- [ ] Performance aceptable
- [ ] Cross-browser verificado
- [ ] Mobile verificado

### Monitoring & Analytics
- [ ] Uptime monitoring configurado
- [ ] Error monitoring configurado (recomendado)
- [ ] Analytics configurado (opcional)

### Documentation
- [ ] README con link a producción
- [ ] DEPLOYMENT.md creado (si procesos complejos)
- [ ] CHANGELOG release notes

### Communication
- [ ] Release anunciado (si público)
- [ ] GitHub release creado
- [ ] Social media post (opcional)

### Post-Deployment
- [ ] Post-deploy checklist completado
- [ ] No issues críticos en primeras 24hrs
- [ ] Monitoring activo funcionando

---

**Deployed:** [Fecha y hora]
**Version:** v1.0.0
**URL:** https://___
**Status:** ✅ LIVE AND STABLE
**Próximo paso:** Fase 8 - Mantenimiento
```

---

## 🎬 Conclusión de la Fase 7

### ¿Qué lograste?
- ✅ Aplicación accesible públicamente
- ✅ URL que puedes compartir
- ✅ Sistema de deployment reproducible
- ✅ Monitoring básico configurado

### Hitos alcanzados:
- Tu código está en manos de usuarios reales
- Feedback real comenzará a llegar
- Has completado el ciclo: idea → código → producción

### Siguiente paso:
➡️ **Fase 8: Mantenimiento** (mantener y evolucionar la aplicación)

---

**Recuerda:**
> "Deployment no es el fin, es el principio de la vida real de tu app."
> "Deploy temprano, deploy frecuente."
> "Un sitio en producción vale más que mil prototipos locales."

¡Felicidades! Tu aplicación está viva en internet. 🎉
