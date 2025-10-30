# 🚀 Portfolio de Tomás Nadal

Portfolio personal moderno desarrollado con Next.js 15 y Strapi 5 como CMS headless.

## 📋 Estructura del Proyecto

```
tomas-portfolio/
├── app/                    # Next.js App Router (páginas y layouts)
├── components/             # Componentes React reutilizables
│   ├── ui/                # Componentes UI de shadcn/ui
│   └── ...                # Componentes específicos del portfolio
├── hooks/                  # Custom React hooks
├── lib/                    # Utilidades y helpers
├── public/                 # Assets estáticos (imágenes, íconos)
├── strapi-backend/         # CMS Backend (Strapi)
│   ├── config/            # Configuración de Strapi
│   ├── src/               # API, controllers, services
│   └── ...
└── strapi-content-types.json  # Referencia de content types de Strapi
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

## 🎨 Características

- ✅ Diseño moderno y minimalista
- ✅ Totalmente responsive
- ✅ Dark mode / Light mode
- ✅ Cursor personalizado
- ✅ Animaciones fluidas
- ✅ SEO optimizado
- ✅ Performance optimizado
- ✅ CMS headless con Strapi
- ✅ TypeScript
- ✅ Componentes reutilizables

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

## 📚 Recursos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Strapi](https://docs.strapi.io)
- [Documentación de TailwindCSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

## 📄 Licencia

Este proyecto es privado y de uso personal.

---

**Desarrollado por Tomás Nadal** 🚀
