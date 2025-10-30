# 🔄 Recrear Content Types en Strapi

## 📍 Ir a: https://portafolio-c8qj.onrender.com/admin

---

## PASO 1: Eliminar Content Types Actuales ❌

1. Ve a **Content-Type Builder** (en la barra lateral)
2. Elimina estos content types (click en cada uno → Delete → Confirmar):
   - ❌ **Blog**
   - ❌ **Featured Item**  
   - ❌ **Project**

**Importante:** Strapi reiniciará después de cada eliminación (~30 segundos).

---

## PASO 2: Crear PROJECTS ✅

1. En **Content-Type Builder** → Click **"Create new collection type"**
2. **Display name:** `Projects`
3. Click **Continue**
4. Agregar estos campos (solo los necesarios para el frontend):

### Campos de Projects:

**Click "Add another field" para cada uno:**

1. **Text** → Name: `title` → Short text → ✅ Required
2. **UID** → Name: `slug` → Attached field: `title` → ✅ Required
3. **Text** → Name: `description` → Long text → ✅ Required
4. **Media** → Name: `image` → Type: Single → Allowed types: Images → ✅ Required
5. **JSON** → Name: `tags` → ✅ Required

**Click "Save"** (arriba a la derecha)

**Espera** a que Strapi reinicie (~30 segundos).

---

## PASO 3: Crear BLOG-ARTICLES ✅

1. En **Content-Type Builder** → Click **"Create new collection type"**
2. **Display name:** `Blog-Articles`
3. Click **Continue**
4. Agregar estos campos:

### Campos de Blog-Articles:

**Click "Add another field" para cada uno:**

1. **Text** → Name: `title` → Short text → ✅ Required
2. **UID** → Name: `slug` → Attached field: `title` → ✅ Required
3. **Text** → Name: `excerpt` → Long text → ✅ Required
4. **Rich text** → Name: `content` → ✅ Required
5. **Media** → Name: `image` → Type: Single → Allowed types: Images → ✅ Required
6. **Text** → Name: `category` → Short text → ✅ Required
7. **Date** → Name: `date` → Type: date → ✅ Required
8. **Number** → Name: `readTime` → Format: integer → ✅ Required → Default: 5
9. **Text** → Name: `author` → Short text → ✅ Required
10. **Boolean** → Name: `featured` → Default value: false
11. **JSON** → Name: `tags`

**Click "Save"** (arriba a la derecha)

**Espera** a que Strapi reinicie (~30 segundos).

---

## PASO 4: Configurar Permisos Públicos ⚙️

1. Ve a **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click en **Public**
3. Expande **Projects** y marca:
   - ✅ `find`
   - ✅ `findOne`
4. Expande **Blog-Articles** y marca:
   - ✅ `find`
   - ✅ `findOne`
5. Click en **Save** (arriba a la derecha)

---

## ✅ Listo!

Los content types están listos para recibir datos.

**Próximo paso:** Agregar manualmente:
- 3 Proyectos featured
- 7 Artículos de blog

Avísame cuando termines de crear los content types! 🚀
