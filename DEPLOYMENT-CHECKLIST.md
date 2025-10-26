# ✅ CHECKLIST DE DEPLOYMENT - NETLIFY + HOSTINGER VPS

## ESTADO ACTUAL: TODO LISTO PARA PRODUCCIÓN

### ✅ Archivos de configuración creados:
- [x] `strapi-backend/config/env/production/database.js` - Config PostgreSQL
- [x] `strapi-backend/config/env/production/server.js` - Config servidor
- [x] `strapi-backend/.env.production.example` - Variables de entorno
- [x] `strapi-backend/ecosystem.config.js` - Config PM2
- [x] `strapi-backend/DEPLOYMENT.md` - Guía completa de deployment
- [x] `netlify.toml` - Config Netlify
- [x] `strapi-backend/package.json` - PostgreSQL agregado

### ✅ Configuración local funcionando:
- [x] Strapi corriendo en localhost:1337
- [x] Next.js corriendo en localhost:3000
- [x] Content Types creados (Project, Blog)
- [x] `.env.local` configurado

---

## 🚀 CUANDO ESTÉS LISTO PARA DEPLOYEAR:

### PASO 1: HOSTINGER VPS (Backend Strapi)
1. Sigue la guía en `strapi-backend/DEPLOYMENT.md`
2. Instala Node.js, PostgreSQL, PM2, Nginx
3. Sube el código de `strapi-backend`
4. Configura variables de entorno
5. Build y arranca con PM2
6. Configura Nginx y SSL

**Tiempo estimado: 30-45 minutos**

### PASO 2: NETLIFY (Frontend Next.js)
1. Conecta tu repositorio GitHub con Netlify
2. Configura variables de entorno:
   - `NEXT_PUBLIC_STRAPI_URL=https://api.tudominio.com`
   - `NEXT_PUBLIC_STRAPI_API_TOKEN=(generar en Strapi)`
3. Deploy automático

**Tiempo estimado: 5-10 minutos**

### PASO 3: CONFIGURAR STRAPI EN PRODUCCIÓN
1. Accede a `https://api.tudominio.com/admin`
2. Crea usuario administrador
3. Settings → Roles → Public → Marca `find` y `findOne` para Project y Blog
4. Settings → API Tokens → Create new token (Full access)
5. Copia el token y agrégalo a Netlify

**Tiempo estimado: 5 minutos**

---

## 📋 VERIFICACIÓN FINAL ANTES DE DEPLOYEAR

### Backend (Strapi):
- [ ] VPS de Hostinger contratado
- [ ] Dominio configurado (ej: api.tudominio.com)
- [ ] PostgreSQL instalado en VPS
- [ ] Node.js 20 instalado en VPS
- [ ] PM2 instalado globalmente
- [ ] Nginx instalado

### Frontend (Next.js):
- [ ] Repositorio en GitHub actualizado
- [ ] Cuenta de Netlify creada
- [ ] Dominio principal configurado (opcional)

### Datos:
- [ ] Contenido de prueba creado en Strapi local
- [ ] Imágenes listas para subir
- [ ] Textos revisados

---

## ⚠️ IMPORTANTE

1. **NO uses SQLite en producción** - Usa PostgreSQL
2. **Genera nuevas APP_KEYS** para producción (no uses las de desarrollo)
3. **Configura backups** de PostgreSQL
4. **Usa Cloudinary** para imágenes (opcional pero recomendado)
5. **Configura SSL** con Let's Encrypt (gratis)

---

## 🆘 SI ALGO FALLA

### Strapi no arranca:
```bash
pm2 logs strapi
# Revisa los logs para ver el error
```

### Next.js no conecta con Strapi:
1. Verifica que `NEXT_PUBLIC_STRAPI_URL` sea correcta
2. Verifica permisos públicos en Strapi
3. Verifica CORS en Strapi

### Base de datos:
```bash
# Conectar a PostgreSQL
sudo -u postgres psql
\c strapi_production
\dt
# Ver tablas creadas
```

---

## 📞 CONTACTO

Si necesitas ayuda durante el deployment, tengo toda la configuración lista.
Solo sigue la guía paso a paso en `strapi-backend/DEPLOYMENT.md`.
