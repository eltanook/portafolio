# 🚀 Quick Start Guide

Guía rápida para poner en marcha el proyecto en 5 minutos.

## 📦 Instalación Rápida

### Opción 1: Script Automático (Recomendado)

```bash
pnpm setup
```

Este script instalará todas las dependencias automáticamente.

### Opción 2: Manual

```bash
# 1. Instalar dependencias del frontend
pnpm install

# 2. Instalar dependencias del backend
cd strapi-backend
npm install
cd ..
```

## 🔐 Configuración

### 1. Frontend (.env.local)

Crear archivo `.env.local` en la raíz:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=
```

### 2. Backend (ya configurado)

El backend ya tiene un `.env` configurado para desarrollo local con SQLite.

## 🎯 Iniciar el Proyecto

### Paso 1: Iniciar Strapi

```bash
# Opción A: Desde la raíz
pnpm strapi:dev

# Opción B: Desde strapi-backend
cd strapi-backend
npm run develop
```

**Primera vez:**
1. Ve a http://localhost:1337/admin
2. Crea un usuario administrador
3. Ve a Settings → API Tokens → Create new API Token
   - Nombre: "Frontend"
   - Tipo: Read-only
   - Duración: Unlimited
4. Copia el token y pégalo en `.env.local`

### Paso 2: (Opcional) Poblar con datos

```bash
cd strapi-backend
node seed-data.js
```

### Paso 3: Configurar permisos públicos

En Strapi Admin Panel:
1. Settings → Roles → Public
2. Marcar permisos de lectura (find, findOne) para:
   - ✅ Project
   - ✅ Blog
   - ✅ Featured-item

### Paso 4: Iniciar Frontend

```bash
# En otra terminal, desde la raíz
pnpm dev
```

## ✅ Verificar Instalación

- **Strapi Admin**: http://localhost:1337/admin
- **Strapi API**: http://localhost:1337/api
- **Frontend**: http://localhost:3000

## 📝 Scripts Disponibles

### Frontend (Next.js)

```bash
pnpm dev          # Modo desarrollo
pnpm build        # Build producción
pnpm start        # Iniciar producción
pnpm lint         # Linter

# Utilidades
pnpm setup        # Configuración inicial
pnpm clean        # Limpiar cachés y node_modules

# Strapi desde la raíz
pnpm strapi:dev   # Iniciar Strapi en desarrollo
pnpm strapi:build # Build de Strapi
pnpm strapi:start # Iniciar Strapi en producción
```

### Backend (Strapi)

```bash
cd strapi-backend

npm run develop   # Modo desarrollo
npm run build     # Build producción
npm run start     # Iniciar producción
```

## 🐛 Problemas Comunes

### Error: Cannot connect to Strapi

**Solución:**
1. Verifica que Strapi esté corriendo en http://localhost:1337
2. Verifica `NEXT_PUBLIC_STRAPI_URL` en `.env.local`
3. Verifica permisos públicos en Strapi

### Error: Invalid token

**Solución:**
1. Genera un nuevo API Token en Strapi
2. Actualiza `NEXT_PUBLIC_STRAPI_API_TOKEN` en `.env.local`
3. Reinicia el servidor de Next.js

### Error al hacer build

**Solución:**
```bash
pnpm clean
pnpm install
pnpm build
```

## 🚀 Listo para Deployment?

Consulta la guía completa: **[DEPLOYMENT-VPS.md](./DEPLOYMENT-VPS.md)**

## 📚 Más Información

- **README completo**: [README.md](./README.md)
- **Deployment**: [DEPLOYMENT-VPS.md](./DEPLOYMENT-VPS.md)
- **Backend Deployment**: [strapi-backend/DEPLOYMENT.md](./strapi-backend/DEPLOYMENT.md)

---

**¿Necesitas ayuda?** Revisa la documentación completa en README.md
