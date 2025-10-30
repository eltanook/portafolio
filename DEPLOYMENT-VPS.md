# 🚀 Guía Completa de Deployment en VPS

Esta guía te ayudará a deployear tanto el backend (Strapi) como el frontend (Next.js) en un VPS.

## 📋 Tabla de Contenidos

1. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
2. [Requisitos Previos](#requisitos-previos)
3. [Configuración del VPS](#configuración-del-vps)
4. [Deployment del Backend (Strapi)](#deployment-del-backend-strapi)
5. [Deployment del Frontend (Next.js)](#deployment-del-frontend-nextjs)
6. [Configuración de Dominios y SSL](#configuración-de-dominios-y-ssl)
7. [Mantenimiento y Actualizaciones](#mantenimiento-y-actualizaciones)

---

## 🏗️ Arquitectura del Proyecto

```
tomas-portfolio/
├── app/                    # Next.js App Router
├── components/             # Componentes React
├── hooks/                  # Custom hooks
├── lib/                    # Utilidades y helpers
├── public/                 # Assets estáticos
├── strapi-backend/         # CMS Backend (Strapi)
└── strapi-content-types.json  # Referencia de content types
```

**Stack Tecnológico:**
- **Frontend**: Next.js 15 + React 19 + TailwindCSS 4
- **Backend**: Strapi 5 + PostgreSQL
- **Deployment**: VPS + Nginx + PM2

---

## ✅ Requisitos Previos

### En tu VPS:
- Ubuntu 20.04 o superior
- Acceso root o sudo
- Al menos 2GB RAM
- Node.js 18.x o 20.x
- PostgreSQL 12+

### En tu máquina local:
- Git instalado
- Node.js 18+ y pnpm
- Acceso SSH al VPS

### Dominios (opcional pero recomendado):
- `api.tudominio.com` → Backend (Strapi)
- `tudominio.com` → Frontend (Next.js)

---

## 🖥️ Configuración del VPS

### 1. Conectar al VPS

```bash
ssh root@TU_IP_VPS
```

### 2. Actualizar sistema e instalar dependencias

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar instalación
node --version  # Debe mostrar v20.x.x
npm --version

# Instalar PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Instalar Nginx
sudo apt install -y nginx

# Instalar PM2 (gestor de procesos)
sudo npm install -g pm2

# Instalar pnpm
sudo npm install -g pnpm
```

### 3. Configurar PostgreSQL

```bash
# Entrar a PostgreSQL
sudo -u postgres psql

# Dentro de psql, ejecutar:
CREATE DATABASE strapi_production;
CREATE USER strapi_user WITH ENCRYPTED PASSWORD 'TU_PASSWORD_SEGURO_AQUI';
GRANT ALL PRIVILEGES ON DATABASE strapi_production TO strapi_user;
ALTER DATABASE strapi_production OWNER TO strapi_user;
\q
```

### 4. Configurar estructura de directorios

```bash
# Crear directorios
sudo mkdir -p /var/www/strapi-backend
sudo mkdir -p /var/www/portfolio-frontend

# Dar permisos
sudo chown -R $USER:$USER /var/www/strapi-backend
sudo chown -R $USER:$USER /var/www/portfolio-frontend
```

---

## 🔧 Deployment del Backend (Strapi)

### 1. Subir código al VPS

**Opción A: Git (Recomendado)**
```bash
# En el VPS
cd /var/www
git clone https://github.com/TU_USUARIO/TU_REPO.git portfolio
cd portfolio/strapi-backend
```

**Opción B: SCP**
```bash
# En tu máquina local
cd tomas-portfolio/strapi-backend
scp -r . root@TU_IP_VPS:/var/www/strapi-backend
```

### 2. Instalar dependencias

```bash
cd /var/www/strapi-backend
npm install --production
```

### 3. Configurar variables de entorno

```bash
cd /var/www/strapi-backend
cp .env.production.example .env
nano .env
```

Editar `.env` con estos valores:

```env
HOST=0.0.0.0
PORT=1337

# Generar 4 keys diferentes con: openssl rand -base64 32
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=tu_salt_aqui
ADMIN_JWT_SECRET=tu_secret_aqui
TRANSFER_TOKEN_SALT=tu_salt_aqui
JWT_SECRET=tu_secret_aqui

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=strapi_production
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=TU_PASSWORD_SEGURO_AQUI
DATABASE_SSL=false
```

**Generar secrets:**
```bash
# Ejecutar 4 veces para APP_KEYS
openssl rand -base64 32

# Para los demás secrets
openssl rand -base64 32
```

### 4. Build y configurar PM2

```bash
# Build de producción
NODE_ENV=production npm run build

# Editar ecosystem.config.js
nano ecosystem.config.js
```

Actualizar la ruta en `ecosystem.config.js`:

```javascript
cwd: '/var/www/strapi-backend',
```

### 5. Iniciar con PM2

```bash
# Iniciar aplicación
pm2 start ecosystem.config.js

# Guardar configuración PM2
pm2 save

# Configurar PM2 para autostart
pm2 startup
# Copiar y ejecutar el comando que te muestra
```

### 6. Verificar

```bash
# Ver logs
pm2 logs strapi

# Ver estado
pm2 status

# Probar endpoint
curl http://localhost:1337
```

---

## 🎨 Deployment del Frontend (Next.js)

### 1. Subir código al VPS

```bash
# En el VPS
cd /var/www/portfolio-frontend

# Opción A: Git
git clone https://github.com/TU_USUARIO/TU_REPO.git .
cd portfolio-frontend

# O si ya clonaste antes:
cd /var/www/portfolio
```

### 2. Configurar variables de entorno

```bash
cd /var/www/portfolio-frontend
nano .env.production
```

Contenido de `.env.production`:

```env
NEXT_PUBLIC_STRAPI_URL=https://api.tudominio.com
NEXT_PUBLIC_STRAPI_API_TOKEN=tu_token_de_strapi
```

**Obtener API Token:**
1. Ve a `https://api.tudominio.com/admin` (o `http://TU_IP:1337/admin`)
2. Crea un usuario admin si no existe
3. Ve a Settings → API Tokens → Create new API Token
4. Tipo: Read-only, Duración: Unlimited
5. Copia el token generado

### 3. Instalar dependencias y build

```bash
# Instalar dependencias
pnpm install

# Build de producción
pnpm build
```

### 4. Configurar PM2 para Next.js

Crear archivo `ecosystem.config.js` en `/var/www/portfolio-frontend`:

```bash
nano ecosystem.config.js
```

Contenido:

```javascript
module.exports = {
  apps: [
    {
      name: 'portfolio-frontend',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      cwd: '/var/www/portfolio-frontend',
      env: {
        NODE_ENV: 'production',
      },
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};
```

### 5. Iniciar aplicación

```bash
pm2 start ecosystem.config.js
pm2 save
```

---

## 🌐 Configuración de Dominios y SSL

### 1. Configurar Nginx para Strapi

```bash
sudo nano /etc/nginx/sites-available/strapi
```

Contenido:

```nginx
server {
    listen 80;
    server_name api.tudominio.com;

    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Aumentar timeouts
        proxy_connect_timeout 600;
        proxy_send_timeout 600;
        proxy_read_timeout 600;
        send_timeout 600;
    }
}
```

Activar:

```bash
sudo ln -s /etc/nginx/sites-available/strapi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 2. Configurar Nginx para Next.js

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Contenido:

```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Servir archivos estáticos directamente
    location /_next/static {
        proxy_cache STATIC;
        proxy_pass http://localhost:3000;
    }
}
```

Activar:

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 3. Configurar SSL con Let's Encrypt

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtener certificados SSL
sudo certbot --nginx -d api.tudominio.com
sudo certbot --nginx -d tudominio.com -d www.tudominio.com

# Renovación automática ya está configurada
sudo certbot renew --dry-run
```

### 4. Configurar DNS

En tu proveedor de dominios, configura estos registros DNS:

```
Tipo    Nombre    Valor           TTL
A       @         TU_IP_VPS       3600
A       www       TU_IP_VPS       3600
A       api       TU_IP_VPS       3600
```

---

## 🔄 Mantenimiento y Actualizaciones

### Actualizar Backend (Strapi)

```bash
# En tu máquina local
cd strapi-backend
git add .
git commit -m "Update backend"
git push

# En el VPS
cd /var/www/strapi-backend
git pull
npm install --production
NODE_ENV=production npm run build
pm2 restart strapi
```

### Actualizar Frontend (Next.js)

```bash
# En tu máquina local
git add .
git commit -m "Update frontend"
git push

# En el VPS
cd /var/www/portfolio-frontend
git pull
pnpm install
pnpm build
pm2 restart portfolio-frontend
```

### Comandos útiles PM2

```bash
# Ver estado de todas las apps
pm2 status

# Ver logs en tiempo real
pm2 logs

# Ver logs de una app específica
pm2 logs strapi
pm2 logs portfolio-frontend

# Reiniciar apps
pm2 restart all
pm2 restart strapi
pm2 restart portfolio-frontend

# Detener apps
pm2 stop strapi
pm2 stop portfolio-frontend

# Eliminar apps de PM2
pm2 delete strapi
pm2 delete portfolio-frontend
```

### Backups de Base de Datos

```bash
# Crear backup manual
pg_dump -U strapi_user -h localhost strapi_production > backup_$(date +%Y%m%d).sql

# Restaurar backup
psql -U strapi_user -h localhost strapi_production < backup_YYYYMMDD.sql
```

### Monitoreo de recursos

```bash
# Ver uso de CPU y memoria
htop

# Ver logs de Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Ver espacio en disco
df -h
```

---

## 🐛 Solución de Problemas

### Strapi no inicia

```bash
# Verificar logs
pm2 logs strapi

# Verificar que PostgreSQL está corriendo
sudo systemctl status postgresql

# Verificar conexión a base de datos
psql -U strapi_user -h localhost -d strapi_production
```

### Next.js no carga

```bash
# Verificar build
cd /var/www/portfolio-frontend
pnpm build

# Verificar variables de entorno
cat .env.production

# Limpiar caché
rm -rf .next
pnpm build
pm2 restart portfolio-frontend
```

### Problemas de permisos

```bash
# Dar permisos correctos
sudo chown -R $USER:$USER /var/www/strapi-backend
sudo chown -R $USER:$USER /var/www/portfolio-frontend
```

---

## 📝 Checklist de Deployment

### Antes de deployear:

- [ ] VPS configurado y actualizado
- [ ] Node.js 20.x instalado
- [ ] PostgreSQL instalado y configurado
- [ ] Nginx instalado
- [ ] PM2 instalado globalmente
- [ ] Dominios apuntando al VPS
- [ ] Firewall configurado (puertos 80, 443, 22 abiertos)

### Backend (Strapi):

- [ ] Código subido al VPS
- [ ] Variables de entorno configuradas
- [ ] Secrets generados (APP_KEYS, etc.)
- [ ] Base de datos creada y conectada
- [ ] Build de producción completado
- [ ] PM2 corriendo y guardado
- [ ] Nginx configurado como reverse proxy
- [ ] SSL configurado con Let's Encrypt
- [ ] Usuario admin creado en `/admin`
- [ ] API Token generado
- [ ] Permisos públicos configurados

### Frontend (Next.js):

- [ ] Código subido al VPS
- [ ] Variables de entorno configuradas
- [ ] NEXT_PUBLIC_STRAPI_URL apunta a producción
- [ ] Build de producción completado
- [ ] PM2 corriendo y guardado
- [ ] Nginx configurado
- [ ] SSL configurado
- [ ] Sitio accesible desde el dominio

### Post-deployment:

- [ ] Probar navegación completa del sitio
- [ ] Verificar que proyectos se cargan desde Strapi
- [ ] Verificar que blogs se cargan desde Strapi
- [ ] Configurar backups automáticos
- [ ] Configurar monitoreo (opcional: PM2 Plus, Sentry)
- [ ] Documentar credenciales y configuración

---

## 🚀 Conclusión

Tu portfolio ahora está completamente deployeado en un VPS con:

- ✅ Backend (Strapi) corriendo en `api.tudominio.com`
- ✅ Frontend (Next.js) corriendo en `tudominio.com`
- ✅ SSL habilitado en ambos
- ✅ PM2 gestionando los procesos
- ✅ Nginx como reverse proxy
- ✅ PostgreSQL como base de datos

**URLs importantes:**
- Frontend: `https://tudominio.com`
- Backend API: `https://api.tudominio.com/api`
- Admin Panel: `https://api.tudominio.com/admin`

¡Felicitaciones! 🎉
