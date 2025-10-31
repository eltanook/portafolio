# 🚀 Portfolio de Tomás Nadal

> Portfolio personal profesional desarrollado con Next.js 15, React 19, TailwindCSS 4 y Strapi 5 como CMS headless.

[![Next.js](https://img.shields.io/badge/Next.js-15.1.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.9-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Strapi](https://img.shields.io/badge/Strapi-5.29.0-4945FF?style=flat-square&logo=strapi)](https://strapi.io/)

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Inicio Rápido](#-inicio-rápido)
- [Content Types de Strapi](#-content-types-de-strapi)
- [Scripts Disponibles](#-scripts-disponibles)
- [Deployment](#-deployment)
- [Configuración](#-configuración)
- [Solución de Problemas](#-solución-de-problemas)

---

## 📖 Descripción

Portfolio personal moderno y minimalista que muestra proyectos, artículos de blog y experiencia profesional. Construido con las últimas tecnologías web y un CMS headless para gestión de contenido dinámica.

**Características principales:**
- 🎨 Diseño moderno y responsive
- 🌓 Dark/Light mode
- ⚡ Performance optimizado
- 🔍 SEO friendly
- 📱 Mobile-first
- 🎭 Animaciones fluidas
- 🔐 CMS seguro con Strapi
- 📧 Formularios con FormSubmit.co

---

## 📁 Estructura del Proyecto

```
tomas-portfolio/
│
├── 📂 app/                          # Next.js App Router
│   ├── blog/                       # Página de blog
│   │   ├── [slug]/                # Artículo individual
│   │   │   └── page.tsx
│   │   └── page.tsx               # Lista de artículos
│   ├── contact/                    # Página de contacto
│   │   └── page.tsx
│   ├── projects/                   # Página de proyectos
│   │   ├── [slug]/                # Proyecto individual
│   │   │   └── page.tsx
│   │   ├── beginnings/            # Proyectos iniciales
│   │   │   └── page.tsx
│   │   └── page.tsx               # Lista de proyectos
│   ├── globals.css                # Estilos globales
│   ├── layout.tsx                 # Layout principal
│   ├── not-found.tsx              # Página 404
│   └── page.tsx                   # Página de inicio
│
├── 📂 components/                   # Componentes React
│   ├── ui/                        # Componentes UI (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── cursor.tsx                 # Cursor personalizado
│   ├── footer.tsx                 # Footer del sitio
│   ├── header.tsx                 # Header/Navbar
│   ├── language-provider.tsx      # Proveedor de idioma (i18n)
│   ├── theme-provider.tsx         # Proveedor de tema
│   └── ...
│
├── 📂 hooks/                        # Custom React Hooks
│   ├── use-mobile.tsx             # Hook para detectar mobile
│   └── use-toast.ts               # Hook para notificaciones
│
├── 📂 lib/                          # Utilidades y helpers
│   ├── strapi.ts                  # Cliente de Strapi API
│   └── utils.ts                   # Funciones utilitarias
│
├── 📂 public/                       # Assets estáticos
│   ├── CV — Tomás Nadal 2025.pdf # Curriculum Vitae
│   ├── logo.png                   # Logo del sitio
│   ├── site.webmanifest           # PWA manifest
│   └── ...
│
├── 📂 strapi-backend/               # CMS Backend (Strapi)
│   ├── config/                    # Configuración de Strapi
│   │   ├── admin.ts              # Config del panel admin
│   │   ├── api.ts                # Config de la API
│   │   ├── database.ts           # Config de base de datos
│   │   ├── middlewares.ts        # Middlewares
│   │   ├── plugins.ts            # Plugins de Strapi
│   │   └── server.ts             # Config del servidor
│   │
│   ├── database/                  # Base de datos SQLite (dev)
│   │   └── data.db
│   │
│   ├── src/                       # Código fuente de Strapi
│   │   ├── api/                  # Content Types API
│   │   │   ├── blog/            # Content Type: Blog
│   │   │   │   ├── content-types/
│   │   │   │   │   └── blog/
│   │   │   │   │       └── schema.json
│   │   │   │   ├── controllers/
│   │   │   │   │   └── blog.ts
│   │   │   │   ├── routes/
│   │   │   │   │   └── blog.ts
│   │   │   │   └── services/
│   │   │   │       └── blog.ts
│   │   │   │
│   │   │   ├── project/         # Content Type: Project
│   │   │   │   ├── content-types/
│   │   │   │   │   └── project/
│   │   │   │   │       └── schema.json
│   │   │   │   ├── controllers/
│   │   │   │   │   └── project.ts
│   │   │   │   ├── routes/
│   │   │   │   │   └── project.ts
│   │   │   │   └── services/
│   │   │   │       └── project.ts
│   │   │   │
│   │   │   └── featured-item/   # Content Type: Featured Item
│   │   │       └── ...
│   │   │
│   │   ├── admin/                # Personalización del admin
│   │   │   ├── app.tsx
│   │   │   └── webpack.config.ts
│   │   │
│   │   ├── extensions/           # Extensiones de Strapi
│   │   └── index.ts             # Entry point
│   │
│   ├── types/                     # Tipos de TypeScript
│   ├── .env                      # Variables de entorno (dev)
│   ├── .env.example              # Ejemplo de variables
│   ├── package.json              # Dependencias de Strapi
│   └── tsconfig.json             # Config de TypeScript
│
├── 📂 scripts/                      # Scripts de automatización
│   ├── cleanup.ps1               # Script de limpieza
│   └── setup.ps1                 # Script de setup
│
├── .env.local                      # Variables de entorno (frontend)
├── .gitignore                      # Archivos ignorados por Git
├── components.json                 # Config de shadcn/ui
├── next.config.mjs                 # Config de Next.js
├── package.json                    # Dependencias del proyecto
├── postcss.config.mjs              # Config de PostCSS
├── README.md                       # Este archivo
├── render.yaml                     # Config de Render.com
├── tailwind.config.ts              # Config de TailwindCSS
├── tsconfig.json                   # Config de TypeScript
└── ...
```

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI**: React 19
- **Estilos**: TailwindCSS 4
- **Componentes**: shadcn/ui + Radix UI
- **Íconos**: Lucide React
- **Animaciones**: TailwindCSS Animate + tw-animate-css
- **Temas**: next-themes (soporte dark mode)
- **Analytics**: Vercel Analytics

### Backend
- **CMS**: Strapi 5.29.0
- **Base de datos (dev)**: SQLite
- **Base de datos (prod)**: PostgreSQL
- **Autenticación**: Strapi Users & Permissions

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 18+ o 20.x
- pnpm (recomendado) o npm
- PostgreSQL (solo para producción)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/TU_USUARIO/tomas-portfolio.git
cd tomas-portfolio
```

### 2. Instalar Dependencias

**Frontend (Next.js):**
```bash
# En la raíz del proyecto
pnpm install
# o
npm install
```

**Backend (Strapi):**
```bash
cd strapi-backend
npm install
```

### 3. Configurar Variables de Entorno

**Frontend (raíz del proyecto):**

Crear `.env.local`:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=tu_token_aqui
```

**Backend (strapi-backend):**

Copiar `.env.example` a `.env`:
```bash
cd strapi-backend
cp .env.example .env
```

El archivo `.env` ya viene configurado para desarrollo local con SQLite.

### 4. Iniciar Strapi (Backend)

```bash
cd strapi-backend
npm run develop
```

Strapi estará disponible en:
- API: http://localhost:1337
- Admin Panel: http://localhost:1337/admin

**Primera vez:**
1. Crea un usuario administrador en `/admin`
2. Ve a Settings → API Tokens → Create new API Token
3. Copia el token y pégalo en `.env.local` del frontend

### 5. Poblar Strapi con Datos

Puedes usar el script de seed incluido:

```bash
cd strapi-backend
node seed-data.js
```

Esto creará contenido de ejemplo para proyectos y blogs.

### 6. Iniciar Frontend (Next.js)

```bash
# En la raíz del proyecto
pnpm dev
# o
npm run dev
```

El sitio estará disponible en http://localhost:3000

## 📁 Content Types de Strapi

El CMS incluye los siguientes content types:

### Project
- `title` (String): Título del proyecto
- `slug` (UID): URL amigable
- `description` (Text): Descripción breve
- `content` (RichText): Contenido detallado
- `image` (Media): Imagen principal
- `gallery` (Media): Galería de imágenes
- `tags` (JSON): Etiquetas del proyecto
- `category` (String): Categoría
- `demoUrl` (String): URL de demostración
- `githubUrl` (String): URL del repositorio
- `featured` (Boolean): Proyecto destacado
- `technologies` (JSON): Tecnologías usadas
- `client` (String): Cliente
- `year` (Integer): Año del proyecto

### Blog
- `title` (String): Título del artículo
- `slug` (UID): URL amigable
- `excerpt` (Text): Extracto
- `content` (RichText): Contenido completo
- `image` (Media): Imagen principal
- `category` (String): Categoría
- `date` (Date): Fecha de publicación
- `readTime` (Integer): Tiempo de lectura
- `author` (String): Autor
- `featured` (Boolean): Artículo destacado
- `tags` (JSON): Etiquetas

### Featured Item
- `title` (String): Título
- `description` (Text): Descripción
- `image` (Media): Imagen
- `link` (String): URL
- `type` (Enum): project | blog | external
- `order` (Integer): Orden de visualización
- `tags` (JSON): Etiquetas

## 🌟 Características

### 🎨 Diseño y UX
- ✅ **Diseño moderno y minimalista** con enfoque en contenido
- ✅ **Totalmente responsive** - Mobile, Tablet, Desktop
- ✅ **Dark/Light mode** con persistencia de preferencia
- ✅ **Cursor personalizado** con efectos interactivos
- ✅ **Animaciones fluidas** con TailwindCSS Animate
- ✅ **Transiciones suaves** entre páginas
- ✅ **Tipografía optimizada** para legibilidad

### ⚡ Performance y SEO
- ✅ **Performance optimizado** con Next.js 15
- ✅ **SEO friendly** con metadata dinámica
- ✅ **Imágenes optimizadas** con next/image
- ✅ **Lazy loading** de componentes
- ✅ **Code splitting** automático
- ✅ **Vercel Analytics** integrado
- ✅ **PWA ready** con manifest

### 🔧 Desarrollo
- ✅ **TypeScript** para type safety
- ✅ **Componentes reutilizables** con shadcn/ui
- ✅ **CMS headless** con Strapi 5
- ✅ **API REST** segura y documentada
- ✅ **Formularios** con FormSubmit.co
- ✅ **Internacionalización** (ES/EN)
- ✅ **Git hooks** para calidad de código

### 📦 Contenido Dinámico
- ✅ **Proyectos** gestionados desde Strapi
- ✅ **Blog** con artículos y categorías
- ✅ **Galerías** de imágenes
- ✅ **Tags y categorías** dinámicas
- ✅ **Búsqueda y filtrado** de contenido
- ✅ **Contenido destacado** configurable

## 📝 Scripts Disponibles

### Frontend (raíz del proyecto)

```bash
pnpm dev          # Iniciar en modo desarrollo
pnpm build        # Build de producción
pnpm start        # Iniciar en modo producción
pnpm lint         # Ejecutar linter
```

### Backend (strapi-backend)

```bash
npm run develop   # Iniciar en modo desarrollo
npm run build     # Build de producción
npm run start     # Iniciar en modo producción
```

## 🚀 Deployment

Para deployear este proyecto en un VPS, consulta la guía completa:

**[📖 DEPLOYMENT-VPS.md](./DEPLOYMENT-VPS.md)**

Esta guía incluye:
- Configuración del VPS desde cero
- Deployment de Strapi con PostgreSQL
- Deployment de Next.js
- Configuración de Nginx
- SSL con Let's Encrypt
- PM2 para gestión de procesos
- Comandos de mantenimiento

## 🔧 Configuración Adicional

### Permisos de Strapi

Para que el frontend pueda consumir la API públicamente:

1. Ir a Settings → Roles → Public
2. Marcar los permisos de lectura (find, findOne) para:
   - Project
   - Blog
   - Featured Item

### API Token

Genera un API Token en Strapi para mayor seguridad:

1. Settings → API Tokens → Create new API Token
2. Nombre: "Frontend Token"
3. Tipo: Read-only
4. Duración: Unlimited
5. Copiar token y agregarlo a `.env.local`

## 🐛 Solución de Problemas

### El frontend no se conecta a Strapi

1. Verifica que Strapi esté corriendo en http://localhost:1337
2. Verifica que `NEXT_PUBLIC_STRAPI_URL` en `.env.local` sea correcto
3. Verifica que el API Token sea válido
4. Verifica los permisos públicos en Strapi

### Errores de build

```bash
# Limpiar caché y reinstalar
rm -rf node_modules .next
pnpm install
pnpm build
```

### Strapi no inicia

```bash
cd strapi-backend
rm -rf node_modules .tmp build
npm install
npm run develop
```

## 📚 Recursos y Documentación

### Documentación Oficial
- [Next.js Documentation](https://nextjs.org/docs) - Framework React
- [Strapi Documentation](https://docs.strapi.io) - Headless CMS
- [TailwindCSS Documentation](https://tailwindcss.com/docs) - Utility-first CSS
- [shadcn/ui Components](https://ui.shadcn.com) - Componentes UI
- [Radix UI](https://www.radix-ui.com/) - Primitivos UI accesibles
- [Lucide Icons](https://lucide.dev/) - Biblioteca de íconos

### Herramientas Utilizadas
- [Vercel](https://vercel.com/) - Hosting del frontend
- [Render](https://render.com/) - Hosting del backend
- [FormSubmit.co](https://formsubmit.co/) - Servicio de formularios
- [PostgreSQL](https://www.postgresql.org/) - Base de datos en producción

---

## 🔐 Variables de Entorno

### Frontend (`.env.local`)
```env
# Strapi API
NEXT_PUBLIC_STRAPI_URL=https://tu-strapi.onrender.com
NEXT_PUBLIC_STRAPI_API_TOKEN=tu_token_aqui
```

### Backend Strapi (`.env`)
```env
# Server
HOST=0.0.0.0
PORT=1337
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=salt
ADMIN_JWT_SECRET=secret
TRANSFER_TOKEN_SALT=salt
JWT_SECRET=secret

# Database (PostgreSQL en producción)
DATABASE_CLIENT=postgres
DATABASE_HOST=tu-host
DATABASE_PORT=5432
DATABASE_NAME=tu-db
DATABASE_USERNAME=tu-usuario
DATABASE_PASSWORD=tu-password
DATABASE_SSL=true
```

---

## 🚀 Deployment en Render

Este proyecto está configurado para desplegarse automáticamente en Render usando `render.yaml`:

### Servicios Configurados:
1. **Strapi Backend** - Web Service
   - Build: `cd strapi-backend && npm install && npm run build`
   - Start: `cd strapi-backend && npm run start`
   - PostgreSQL incluido

2. **Next.js Frontend** - Static Site
   - Build: `npm install && npm run build`
   - Publish: `.next`

### Pasos para Deploy:
1. Conecta tu repositorio de GitHub a Render
2. Render detectará automáticamente `render.yaml`
3. Configura las variables de entorno
4. Deploy automático en cada push a `main`

---

## 📊 Estructura de Datos

### Ejemplo de Proyecto en Strapi
```json
{
  "title": "E-Commerce Platform",
  "slug": "ecommerce-platform",
  "description": "Plataforma de comercio electrónico completa",
  "content": "Contenido detallado en Markdown...",
  "image": { "url": "/uploads/project.jpg" },
  "tags": ["React", "Node.js", "MongoDB"],
  "category": "Web Development",
  "demoUrl": "https://demo.com",
  "githubUrl": "https://github.com/user/repo",
  "featured": true,
  "order": 1,
  "technologies": ["Next.js", "TailwindCSS", "Stripe"],
  "client": "Empresa XYZ",
  "year": 2024
}
```

### Ejemplo de Blog Post
```json
{
  "title": "Introducción a Next.js 15",
  "slug": "introduccion-nextjs-15",
  "excerpt": "Descubre las nuevas características...",
  "content": "Contenido completo del artículo...",
  "image": { "url": "/uploads/blog.jpg" },
  "category": "Technology",
  "date": "2025-01-15",
  "readTime": 5,
  "author": "Tomás Nadal",
  "featured": true,
  "tags": ["Next.js", "React", "Web Development"]
}
```

---

## 🤝 Contribución

Este es un proyecto personal, pero si encuentras algún bug o tienes sugerencias:

1. Abre un **Issue** describiendo el problema o sugerencia
2. Si quieres contribuir con código:
   - Fork el repositorio
   - Crea una rama (`git checkout -b feature/AmazingFeature`)
   - Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
   - Push a la rama (`git push origin feature/AmazingFeature`)
   - Abre un Pull Request

---

## 📧 Contacto

**Tomás Nadal**
- Email: tomasnadal04@gmail.com
- LinkedIn: [linkedin.com/in/tomasnadal](https://linkedin.com/in/tomasnadal/)
- GitHub: [@eltanook](https://github.com/eltanook)
- Portfolio: [tomasnadal.com](https://tomasnadal.com)

---

## 📄 Licencia

Este proyecto es privado y de uso personal.

© 2025 Tomás Nadal. Todos los derechos reservados.

---

## 🙏 Agradecimientos

- [Vercel](https://vercel.com/) por el excelente servicio de hosting
- [Render](https://render.com/) por el hosting del backend
- [shadcn](https://twitter.com/shadcn) por los componentes UI
- La comunidad de Next.js y React

---

<div align="center">

**Desarrollado con ❤️ por Tomás Nadal**

⭐ Si te gusta este proyecto, considera darle una estrella en GitHub

</div>
