# 🔐 Configurar Permisos Públicos en Strapi

## 🎯 URL: https://portafolio-c8qj.onrender.com/admin

---

## ⚠️ IMPORTANTE: Los permisos están COLAPSADOS

En la captura que me mostraste, los permisos están **colapsados**. Necesitas **EXPANDIRLOS** para poder marcarlos.

---

## 📋 Pasos Detallados:

### 1. Ve a Settings → Users & Permissions Plugin → Roles

### 2. Click en **"Public"**

### 3. Busca la sección **"Permissions"**

Verás varias secciones colapsadas con un ícono de **expandir** (⊕ o →):
- Content-type-builder
- Email
- i18n
- Media Library
- Users-permissions

### 4. **EXPANDE** las secciones que necesitas:

#### 📦 **PROJECT** (Click para expandir ⊕):
Cuando expandes, verás checkboxes:
- ✅ **find** ← Marca este
- ✅ **findOne** ← Marca este
- ☐ create (NO marcar)
- ☐ update (NO marcar)
- ☐ delete (NO marcar)

#### 📝 **BLOG** (Click para expandir ⊕):
Cuando expandes, verás checkboxes:
- ✅ **find** ← Marca este
- ✅ **findOne** ← Marca este
- ☐ create (NO marcar)
- ☐ update (NO marcar)
- ☐ delete (NO marcar)

### 5. **Click en "Save"** (arriba a la derecha)

---

## ✅ Verificación:

Una vez guardado, ejecuta esto en PowerShell para verificar:

```powershell
Invoke-RestMethod -Uri "https://portafolio-c8qj.onrender.com/api/projects?populate=*" -Method Get
```

**Si funciona** → Verás JSON con tus proyectos ✅  
**Si da 404** → Los permisos no están bien configurados ❌

---

## 🎯 Resultado Esperado:

Deberías ver algo como:
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "E-Commerce Platform",
        "slug": "ecommerce-platform",
        ...
      }
    }
  ]
}
```

---

**Configura los permisos y avísame cuando esté listo!** 🚀
