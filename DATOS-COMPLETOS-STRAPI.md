# 📋 DATOS COMPLETOS PARA SOLUCIONAR STRAPI

## 🔑 Credenciales y URLs

### URLs:
- **Strapi Admin:** https://portafolio-c8qj.onrender.com/admin
- **Strapi API Base:** https://portafolio-c8qj.onrender.com/api
- **Render Dashboard:** https://dashboard.render.com

### API Token:
```
f6dcf4b8b91cef4bea6931348bcae4356d2da849f761e621e649a036dbc7d1d729d1cc10da5e8db9394b6264c31ab2eaf06835a08b6a6a3d7411664c5aa753288baa64aeac7c2ce6b41645a6b7dfb9c1ad10f7b20e40d3df39e7664d7babfa1234a7eda4f4b1940efc633f4236a65293dbbc3beb0e055b61c3f490480f049301
```

---

## 🎯 PROBLEMA ACTUAL

Los endpoints de la API devuelven 404:
- `GET /api/projects` → 404
- `GET /api/project` → 404
- `GET /api/blogs` → 404
- `GET /api/blog` → 404

**Causa:** Los content types NO existen en la base de datos de producción (PostgreSQL en Render).

---

## ✅ SOLUCIÓN: Crear Content Types Manualmente en Strapi

### Opción 1: Crear en la UI de Strapi (MÁS FÁCIL)

#### 1. Accede al Admin:
```
https://portafolio-c8qj.onrender.com/admin
```

#### 2. Ve a Content-Type Builder (icono de engranaje en sidebar)

#### 3. Crear Content Type "Project":

**Click en "Create new collection type"**

**Display name:** `Project`  
**API ID (Singular):** `project`  
**API ID (Plural):** `projects`

**Campos a agregar:**

| Campo | Tipo | Requerido | Configuración Extra |
|-------|------|-----------|---------------------|
| `title` | Text (Short text) | ✅ Sí | - |
| `slug` | UID | ✅ Sí | Attached field: `title` |
| `description` | Text (Long text) | ✅ Sí | - |
| `content` | Rich text | ❌ No | - |
| `image` | Media (Single media) | ✅ Sí | Allowed types: Images only |
| `gallery` | Media (Multiple media) | ❌ No | Allowed types: Images only |
| `tags` | JSON | ✅ Sí | - |
| `category` | Text (Short text) | ✅ Sí | - |
| `demoUrl` | Text (Short text) | ❌ No | - |
| `githubUrl` | Text (Short text) | ❌ No | - |
| `featured` | Boolean | ❌ No | Default: `false` |
| `order` | Number (integer) | ❌ No | Default: `0` |
| `technologies` | JSON | ❌ No | - |
| `client` | Text (Short text) | ❌ No | - |
| `year` | Number (integer) | ❌ No | - |

**Configuración adicional:**
- ✅ Enable draft & publish
- Click "Save" y espera a que Strapi reinicie

---

#### 4. Crear Content Type "Blog":

**Click en "Create new collection type"**

**Display name:** `Blog`  
**API ID (Singular):** `blog`  
**API ID (Plural):** `blogs`

**Campos a agregar:**

| Campo | Tipo | Requerido | Configuración Extra |
|-------|------|-----------|---------------------|
| `title` | Text (Short text) | ✅ Sí | - |
| `slug` | UID | ✅ Sí | Attached field: `title` |
| `excerpt` | Text (Long text) | ✅ Sí | - |
| `content` | Rich text | ✅ Sí | - |
| `image` | Media (Single media) | ✅ Sí | Allowed types: Images only |
| `category` | Text (Short text) | ✅ Sí | - |
| `date` | Date | ✅ Sí | Type: `date` |
| `readTime` | Number (integer) | ✅ Sí | - |
| `featured` | Boolean | ❌ No | Default: `false` |
| `tags` | JSON | ❌ No | - |
| `author` | Text (Short text) | ❌ No | - |

**Configuración adicional:**
- ✅ Enable draft & publish
- Click "Save" y espera a que Strapi reinicie

---

#### 5. Configurar Permisos Públicos:

1. Ve a **Settings** (⚙️) → **Users & Permissions Plugin** → **Roles**
2. Click en **Public**
3. En **Permissions**, expande:
   - **Project**: ✅ Marca `find` y `findOne`
   - **Blog**: ✅ Marca `find` y `findOne`
4. Click **Save**

---

#### 6. Crear Contenido de Ejemplo:

**Para Projects:**
1. Ve a **Content Manager** → **Project**
2. Click **Create new entry**
3. Llena los campos:
   ```
   Title: Proyecto de Prueba
   Description: Descripción del proyecto
   Category: Web Development
   Tags: ["React", "Next.js"]
   Featured: true
   Order: 1
   ```
4. Sube una imagen
5. Click **Save** y luego **Publish**

**Para Blogs:**
1. Ve a **Content Manager** → **Blog**
2. Click **Create new entry**
3. Llena los campos:
   ```
   Title: Artículo de Prueba
   Excerpt: Resumen del artículo
   Content: Contenido completo...
   Category: Technology
   Date: (fecha actual)
   Read Time: 5
   Featured: true
   ```
4. Sube una imagen
5. Click **Save** y luego **Publish**

---

## 🧪 VERIFICAR QUE FUNCIONA

### Test 1: Verificar Proyectos
```powershell
$token = "f6dcf4b8b91cef4bea6931348bcae4356d2da849f761e621e649a036dbc7d1d729d1cc10da5e8db9394b6264c31ab2eaf06835a08b6a6a3d7411664c5aa753288baa64aeac7c2ce6b41645a6b7dfb9c1ad10f7b20e40d3df39e7664d7babfa1234a7eda4f4b1940efc633f4236a65293dbbc3beb0e055b61c3f490480f049301"
$headers = @{ "Authorization" = "Bearer $token" }

# Test endpoint
Invoke-RestMethod -Uri "https://portafolio-c8qj.onrender.com/api/projects" -Headers $headers
```

**Respuesta esperada:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Proyecto de Prueba",
        "slug": "proyecto-de-prueba",
        "description": "...",
        ...
      }
    }
  ],
  "meta": { ... }
}
```

### Test 2: Verificar Blogs
```powershell
Invoke-RestMethod -Uri "https://portafolio-c8qj.onrender.com/api/blogs" -Headers $headers
```

---

## 🔧 Opción 2: Usar los Schemas del Código Local

Si prefieres usar el código local que ya tiene los schemas:

### 1. Verificar que los schemas existen:
```
strapi-backend/src/api/project/content-types/project/schema.json
strapi-backend/src/api/blog/content-types/blog/schema.json
```

### 2. Hacer redeploy en Render:

**Opción A: Desde el Dashboard de Render**
1. Ve a https://dashboard.render.com
2. Selecciona el servicio `strapi-backend`
3. Click en **Manual Deploy** → **Deploy latest commit**
4. Espera 5-10 minutos

**Opción B: Forzar con un commit**
```powershell
cd "C:\TN\Marca personal\tomas-portfolio"

# Crear un archivo dummy para forzar redeploy
echo "Redeploy $(Get-Date)" > strapi-backend/REDEPLOY.txt

git add strapi-backend/REDEPLOY.txt
git commit -m "Force redeploy to sync schemas"
git push origin main
```

Render detectará el push automáticamente y rebuildeará.

---

## 📊 ENDPOINTS QUE DEBE USAR EL FRONTEND

Según el código local, los endpoints correctos son:

### Projects:
```
GET /api/projects?populate=*&sort[0]=order:asc
GET /api/projects?populate=*&sort[0]=order:asc&pagination[limit]=3
GET /api/projects?filters[slug][$eq]=SLUG&populate=*
```

### Blogs:
```
GET /api/blogs?populate=*&sort[0]=date:desc
GET /api/blogs?filters[slug][$eq]=SLUG&populate=*
```

**Nota:** Los endpoints usan el **plural** (`projects`, `blogs`) según los schemas.

---

## 🔍 DEBUGGING

### Ver logs de Strapi en Render:
1. Ve a https://dashboard.render.com
2. Selecciona `strapi-backend`
3. Click en **Logs**
4. Busca errores relacionados con content types

### Verificar que la base de datos está conectada:
```powershell
# Verificar health check
Invoke-WebRequest -Uri "https://portafolio-c8qj.onrender.com/_health"
```

Debería devolver `204 No Content` si está funcionando.

### Verificar que Strapi está corriendo:
```powershell
Invoke-WebRequest -Uri "https://portafolio-c8qj.onrender.com/admin"
```

Debería devolver `200 OK`.

---

## 📝 CONFIGURACIÓN DEL FRONTEND

El frontend ya está configurado correctamente en:

### `.env.local`:
```env
NEXT_PUBLIC_STRAPI_URL=https://portafolio-c8qj.onrender.com
NEXT_PUBLIC_STRAPI_API_TOKEN=f6dcf4b8b91cef4bea6931348bcae4356d2da849f761e621e649a036dbc7d1d729d1cc10da5e8db9394b6264c31ab2eaf06835a08b6a6a3d7411664c5aa753288baa64aeac7c2ce6b41645a6b7dfb9c1ad10f7b20e40d3df39e7664d7babfa1234a7eda4f4b1940efc633f4236a65293dbbc3beb0e055b61c3f490480f049301
```

### Archivos que hacen fetch:
- `app/page.tsx` - Fetch featured projects
- `app/projects/page.tsx` - Fetch all projects
- `app/blog/page.tsx` - Fetch all blogs

**No necesitan cambios una vez que Strapi funcione.**

---

## ⚠️ IMPORTANTE

1. **Los content types DEBEN estar en Strapi de producción** (en Render)
2. **Los permisos públicos DEBEN estar habilitados** para `find` y `findOne`
3. **El contenido DEBE estar PUBLICADO** (no en draft)
4. **El API Token DEBE estar configurado** en el frontend

Si sigues estos pasos, todo funcionará correctamente.

---

## 🆘 SI NADA FUNCIONA

**Última opción:** Eliminar y recrear el servicio en Render:

1. Backup de la base de datos (si tiene contenido importante)
2. Eliminar el servicio `strapi-backend` en Render
3. Crear nuevo servicio desde el repo de GitHub
4. Configurar las variables de entorno según `render.yaml`
5. Crear los content types manualmente en la UI
6. Cargar el contenido

---

**Con esta información deberías poder solucionar el problema completamente.** 🚀
