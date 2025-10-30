# 🚀 Usando Strapi Local (Solución Inmediata)

## ✅ Cambios Aplicados:

1. **`.env.local` actualizado** → Apunta a `http://localhost:1337`
2. **Strapi local iniciado** → Corriendo en el puerto 1337

---

## 📋 Qué Hacer:

### 1. Espera que Strapi inicie (~30 segundos)

Verás en la terminal:
```
[2025-10-30] INFO Server started on port 1337
```

### 2. Abre Strapi Admin:

http://localhost:1337/admin

**Login:**
- Email: (el que usaste al crear el admin)
- Password: (tu contraseña)

### 3. Configura Permisos Públicos:

1. Ve a **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. **Project:**
   - ✅ `find`
   - ✅ `findOne`
3. **Blog:**
   - ✅ `find`
   - ✅ `findOne`
4. **Save**

### 4. Crea Contenido de Prueba:

**Proyectos:**
1. **Content Manager** → **Project** → **Create new entry**
2. Llena los campos y **Publish**
3. Crea al menos 3 proyectos

**Blogs:**
1. **Content Manager** → **Blog** → **Create new entry**  
2. Llena los campos y **Publish**
3. Crea al menos 2 blogs

---

## 🔄 Reinicia el Frontend:

```powershell
# Ctrl + C para detener
npm run dev
```

---

## ✅ Verifica que Funciona:

- **Home:** http://localhost:3000 → Deberías ver tus proyectos
- **Projects:** http://localhost:3000/projects → Lista completa
- **Blog:** http://localhost:3000/blog → Artículos

---

## 🌐 Para Volver a Render:

Cuando el deploy en Render termine, edita `.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=https://portafolio-c8qj.onrender.com
NEXT_PUBLIC_STRAPI_API_TOKEN=f6dcf4b8b91cef4bea6931348bcae4356d2da849f761e621e649a036dbc7d1d729d1cc10da5e8db9394b6264c31ab2eaf06835a08b6a6a3d7411664c5aa753288baa64aeac7c2ce6b41645a6b7dfb9c1ad10f7b20e40d3df39e7664d7babfa1234a7eda4f4b1940efc633f4236a65293dbbc3beb0e055b61c3f490480f049301
```

Y reinicia el frontend.

---

**Por ahora, Strapi LOCAL es la solución inmediata.** ✅
