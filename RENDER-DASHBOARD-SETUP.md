# 🚀 Completar Deployment de Strapi en Render

## ✅ Ya está hecho

Tu base de datos PostgreSQL ya está creada y lista:
- **ID**: `dpg-d41g15vgi27c739gqosg-a`
- **Nombre**: `strapi-db`
- **Estado**: Disponible ✓

## 📝 Crear Servicio Web (5 minutos)

### Paso 1: Ir al Dashboard de Render

Ve a: https://dashboard.render.com/

### Paso 2: Crear Nuevo Web Service

1. Click en **"New +"** → **"Web Service"**
2. Selecciona **"Build and deploy from a Git repository"**
3. Click en **"Connect GitHub"** o pega la URL del repo:
   ```
   https://github.com/eltanook/portafolio
   ```

### Paso 3: Configurar el Servicio

**Información básica:**
- **Name**: `strapi-backend`
- **Region**: `Oregon (US West)`
- **Branch**: `main`
- **Root Directory**: `strapi-backend`

**Build & Deploy:**
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start`

**Plan:**
- Selecciona **"Free"** (o Starter si prefieres $7/mes para mejor rendimiento)

### Paso 4: Variables de Entorno

Click en **"Advanced"** y agrega estas variables:

```
NODE_ENV=production
HOST=0.0.0.0
PORT=10000
DATABASE_CLIENT=postgres
DATABASE_SSL=false
```

### Paso 5: Vincular Base de Datos

1. Scroll hasta la sección **"Environment Variables"**
2. Click en **"Add from Database"**
3. Selecciona tu base de datos **"strapi-db"**
4. Esto agregará automáticamente `DATABASE_URL`

### Paso 6: Generar Secrets

Agrega manualmente estos secrets (genera valores con el comando más abajo):

```
APP_KEYS=[genera_4_keys_separados_por_comas]
API_TOKEN_SALT=[genera_un_secret]
ADMIN_JWT_SECRET=[genera_un_secret]
TRANSFER_TOKEN_SALT=[genera_un_secret]
JWT_SECRET=[genera_un_secret]
```

**Para generar los secrets, abre PowerShell y ejecuta:**

```powershell
# Generar un secret
$bytes = New-Object byte[] 32
[System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

Ejecuta esto 7 veces y usa los valores generados.

O usa este script que ya preparé:
```powershell
.\generate-secrets.ps1
```

### Paso 7: Crear el Servicio

1. Click en **"Create Web Service"**
2. Espera 5-10 minutos mientras hace el primer build
3. Monitorea el progreso en los logs

## 🎉 Una vez desplegado

### Acceder al Admin Panel

1. Ve a: `https://[tu-servicio-slug].onrender.com/admin`
2. Crea tu primer usuario administrador
3. Configura los permisos públicos en **Settings → Roles → Public**

### URLs Importantes

- **Admin**: `https://[tu-servicio-slug].onrender.com/admin`
- **API**: `https://[tu-servicio-slug].onrender.com/api`
- **Dashboard**: https://dashboard.render.com

## ⚡ Plan Free - Consideraciones

- El servicio se duerme después de 15 minutos de inactividad
- La primera request lo despierta (~30 segundos)
- 750 horas/mes de servicio (suficiente para 24/7 de un servicio)
- Base de datos: 1GB storage

## 🔄 Actualizaciones Automáticas

Render detectará automáticamente los commits en tu branch `main` y re-deployará:

```bash
git add .
git commit -m "Update strapi"
git push origin main
```

## 📞 Soporte

Si tienes problemas:
- Dashboard: https://dashboard.render.com
- Docs: https://render.com/docs
- Logs: Revisa los logs en el dashboard del servicio
