const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

// Datos de proyectos
const projects = [
  {
    title: "E-Commerce Platform",
    slug: "ecommerce-platform",
    description: "Plataforma de comercio electrónico completa con pasarela de pagos y gestión de inventario. Complete e-commerce platform with payment gateway and inventory management.",
    content: "# E-Commerce Platform\n\nUna plataforma completa de comercio electrónico con todas las funcionalidades necesarias para un negocio online exitoso.",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    category: "Web App",
    demoUrl: "https://demo.com",
    featured: true,
    order: 1,
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
    year: 2024
  },
  {
    title: "Task Management App",
    slug: "task-management-app",
    description: "Aplicación de gestión de tareas con colaboración en tiempo real. Task management application with real-time collaboration.",
    content: "# Task Management App\n\nGestiona tus tareas y proyectos con colaboración en tiempo real.",
    tags: ["React", "Firebase", "Tailwind"],
    category: "Web App",
    demoUrl: "https://demo.com",
    featured: true,
    order: 2,
    technologies: ["React", "Firebase", "Tailwind CSS"],
    year: 2024
  },
  {
    title: "Portfolio CMS",
    slug: "portfolio-cms",
    description: "Sistema de gestión de contenidos para portfolios creativos. Content management system for creative portfolios.",
    content: "# Portfolio CMS\n\nSistema de gestión de contenidos diseñado específicamente para portfolios creativos.",
    tags: ["Next.js", "Strapi", "GraphQL"],
    category: "CMS",
    demoUrl: "https://demo.com",
    featured: true,
    order: 3,
    technologies: ["Next.js", "Strapi", "GraphQL"],
    year: 2024
  },
  {
    title: "Analytics Dashboard",
    slug: "analytics-dashboard",
    description: "Dashboard de análisis con visualización de datos en tiempo real. Analytics dashboard with real-time data visualization.",
    content: "# Analytics Dashboard\n\nVisualiza tus datos en tiempo real con gráficos interactivos.",
    tags: ["React", "D3.js", "Node.js"],
    category: "Dashboard",
    demoUrl: "https://demo.com",
    featured: false,
    order: 4,
    technologies: ["React", "D3.js", "Node.js"],
    year: 2023
  },
  {
    title: "Social Media App",
    slug: "social-media-app",
    description: "Red social con mensajería instantánea y compartición de contenido. Social network with instant messaging and content sharing.",
    content: "# Social Media App\n\nRed social moderna con mensajería en tiempo real.",
    tags: ["Next.js", "Socket.io", "MongoDB"],
    category: "Web App",
    demoUrl: "https://demo.com",
    featured: false,
    order: 5,
    technologies: ["Next.js", "Socket.io", "MongoDB"],
    year: 2023
  },
  {
    title: "Booking System",
    slug: "booking-system",
    description: "Sistema de reservas para servicios profesionales con calendario integrado. Booking system for professional services with integrated calendar.",
    content: "# Booking System\n\nSistema completo de reservas con calendario integrado.",
    tags: ["React", "Express", "PostgreSQL"],
    category: "Web App",
    demoUrl: "https://demo.com",
    featured: false,
    order: 6,
    technologies: ["React", "Express", "PostgreSQL"],
    year: 2023
  }
];

// Datos de blogs
const blogs = [
  {
    title: "Cómo construir una aplicación web moderna",
    slug: "como-construir-aplicacion-web-moderna",
    excerpt: "Guía completa para desarrollar aplicaciones web modernas con las mejores prácticas.",
    content: "# Cómo construir una aplicación web moderna\n\nEn este artículo exploramos las mejores prácticas...",
    category: "Tutorial",
    date: "2024-01-15",
    readTime: 8,
    author: "Tomás Nadal",
    featured: true,
    tags: ["Web Development", "Best Practices", "Tutorial"]
  },
  {
    title: "Optimización de rendimiento en React",
    slug: "optimizacion-rendimiento-react",
    excerpt: "Técnicas avanzadas para mejorar el rendimiento de tus aplicaciones React.",
    content: "# Optimización de rendimiento en React\n\nDescubre cómo optimizar tus aplicaciones React...",
    category: "Performance",
    date: "2024-02-20",
    readTime: 10,
    author: "Tomás Nadal",
    featured: true,
    tags: ["React", "Performance", "Optimization"]
  },
  {
    title: "Introducción a TypeScript",
    slug: "introduccion-typescript",
    excerpt: "Todo lo que necesitas saber para empezar con TypeScript en tus proyectos.",
    content: "# Introducción a TypeScript\n\nTypeScript es un superset de JavaScript...",
    category: "Tutorial",
    date: "2024-03-10",
    readTime: 6,
    author: "Tomás Nadal",
    featured: false,
    tags: ["TypeScript", "JavaScript", "Tutorial"]
  }
];

async function setup() {
  try {
    console.log('🚀 Configurando Strapi...\n');

    // 1. Configurar permisos públicos
    console.log('📝 Configurando permisos públicos...');
    try {
      // Obtener el rol público
      const rolesResponse = await axios.get(`${STRAPI_URL}/api/users-permissions/roles`);
      const publicRole = rolesResponse.data.roles.find(role => role.type === 'public');
      
      if (publicRole) {
        // Actualizar permisos
        const permissions = {
          ...publicRole.permissions,
          'api::project': {
            controllers: {
              project: {
                find: { enabled: true },
                findOne: { enabled: true }
              }
            }
          },
          'api::blog': {
            controllers: {
              blog: {
                find: { enabled: true },
                findOne: { enabled: true }
              }
            }
          }
        };

        await axios.put(`${STRAPI_URL}/api/users-permissions/roles/${publicRole.id}`, {
          ...publicRole,
          permissions
        });
        console.log('✅ Permisos públicos configurados\n');
      }
    } catch (error) {
      console.log('⚠️  No se pudieron configurar permisos automáticamente');
      console.log('   Configúralos manualmente en: Settings → Roles → Public\n');
    }

    // 2. Crear proyectos
    console.log('📦 Creando proyectos...');
    for (const project of projects) {
      try {
        await axios.post(`${STRAPI_URL}/api/projects`, {
          data: project
        });
        console.log(`✅ Proyecto creado: ${project.title}`);
      } catch (error) {
        console.log(`⚠️  Error creando ${project.title}: ${error.response?.data?.error?.message || error.message}`);
      }
    }

    // 3. Crear blogs
    console.log('\n📝 Creando artículos de blog...');
    for (const blog of blogs) {
      try {
        await axios.post(`${STRAPI_URL}/api/blogs`, {
          data: blog
        });
        console.log(`✅ Blog creado: ${blog.title}`);
      } catch (error) {
        console.log(`⚠️  Error creando ${blog.title}: ${error.response?.data?.error?.message || error.message}`);
      }
    }

    console.log('\n\n🎉 ¡Configuración completada!');
    console.log('\n📋 Próximos pasos:');
    console.log('   1. Ve a http://localhost:1337/admin');
    console.log('   2. Content Manager → Project/Blog');
    console.log('   3. Haz clic en "Publish" en cada entrada');
    console.log('   4. Settings → Roles → Public → Marca find y findOne');
    console.log('\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('   Detalles:', error.response.data);
    }
  }
}

setup();
