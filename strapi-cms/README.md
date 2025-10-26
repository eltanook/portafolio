# Strapi CMS - Portfolio Tomás Nadal

CMS headless para gestionar proyectos, blogs y contenido destacado del portfolio.

## 🚀 Instalación Local

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
copy env.example .env

# Generar secrets seguros (ejecutar en PowerShell)
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"

# Iniciar en modo desarrollo
npm run develop
```

El admin panel estará disponible en: `http://localhost:1337/admin`

## 📦 Content Types

### Projects (Proyectos)
- **title**: Título del proyecto (i18n)
- **slug**: URL amigable
- **description**: Descripción corta (i18n)
- **content**: Contenido completo en rich text (i18n)
- **image**: Imagen principal
- **gallery**: Galería de imágenes
- **tags**: Tecnologías utilizadas
- **category**: Categoría del proyecto (i18n)
- **demoUrl**: URL de demostración
- **githubUrl**: URL del repositorio
- **featured**: Destacado en inicio
- **order**: Orden de visualización
- **technologies**: Lista de tecnologías
- **client**: Nombre del cliente (i18n)
- **year**: Año del proyecto

### Blogs (Artículos)
- **title**: Título del artículo (i18n)
- **slug**: URL amigable
- **excerpt**: Extracto/resumen (i18n)
- **content**: Contenido completo en rich text (i18n)
- **image**: Imagen destacada
- **category**: Categoría (i18n)
- **date**: Fecha de publicación
- **readTime**: Tiempo de lectura en minutos
- **author**: Autor del artículo
- **featured**: Destacado
- **tags**: Etiquetas

### Featured Items (Destacados)
- **title**: Título (i18n)
- **description**: Descripción (i18n)
- **image**: Imagen
- **link**: URL del enlace
- **type**: Tipo (project/blog/external)
- **order**: Orden de visualización
- **tags**: Etiquetas

## 🌐 Internacionalización (i18n)

El CMS está configurado con soporte para:
- **Español (es)**: Idioma por defecto
- **Inglés (en)**: Idioma secundario

Todos los campos de contenido están localizados.

## 🔐 Configuración de Permisos

Después de crear tu primer usuario admin:

1. Ve a **Settings > Users & Permissions Plugin > Roles > Public**
2. Habilita los siguientes permisos:
   - **Project**: find, findOne
   - **Blog**: find, findOne
   - **Featured-item**: find, findOne

Esto permitirá que tu frontend Next.js pueda consumir la API sin autenticación.

## 📡 API Endpoints

```
GET /api/projects?populate=*&locale=es
GET /api/projects/:slug?populate=*&locale=es
GET /api/blogs?populate=*&locale=es
GET /api/blogs/:slug?populate=*&locale=es
GET /api/featured-items?populate=*&locale=es&sort=order:asc
```

## 🚀 Despliegue en Hostinger

Ver archivo `DEPLOYMENT.md` para instrucciones detalladas.

## 🔧 Variables de Entorno

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=clave1,clave2,clave3,clave4
API_TOKEN_SALT=tu_salt_seguro
ADMIN_JWT_SECRET=tu_secret_seguro
TRANSFER_TOKEN_SALT=tu_salt_seguro
JWT_SECRET=tu_secret_seguro
DATABASE_CLIENT=better-sqlite3
DATABASE_FILENAME=.tmp/data.db
STRAPI_ADMIN_BACKEND_URL=https://tu-dominio.com
FRONTEND_URL=https://tu-frontend.com
```

## 📝 Notas

- En desarrollo usa SQLite (better-sqlite3)
- En producción se recomienda PostgreSQL o MySQL
- Las imágenes se almacenan en `/public/uploads`
- Para producción, configura un servicio de almacenamiento como Cloudinary o AWS S3
