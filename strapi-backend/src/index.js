module.exports = {
  async bootstrap({ strapi }) {
    console.log('🚀 Strapi iniciado correctamente');
    
    // Verificar si ya hay datos
    const projectCount = await strapi.db.query('api::project.project').count();
    
    if (projectCount === 0) {
      console.log('📦 Creando proyectos de ejemplo...');
      
      // Crear proyectos
      const projects = [
        {
          title: "E-Commerce Platform",
          slug: "ecommerce-platform",
          description: "Plataforma de comercio electrónico completa con pasarela de pagos y gestión de inventario",
          content: "# E-Commerce Platform\n\nUna plataforma completa de comercio electrónico con todas las funcionalidades necesarias.",
          tags: ["Next.js", "Stripe", "PostgreSQL"],
          category: "Web App",
          demoUrl: "https://demo.com",
          featured: true,
          order: 1,
          technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
          year: 2024,
          publishedAt: new Date(),
        },
        {
          title: "Task Management App",
          slug: "task-management-app",
          description: "Aplicación de gestión de tareas con colaboración en tiempo real",
          content: "# Task Management App\n\nGestiona tus tareas y proyectos con colaboración en tiempo real.",
          tags: ["React", "Firebase", "Tailwind"],
          category: "Web App",
          demoUrl: "https://demo.com",
          featured: true,
          order: 2,
          technologies: ["React", "Firebase", "Tailwind CSS"],
          year: 2024,
          publishedAt: new Date(),
        },
        {
          title: "Portfolio CMS",
          slug: "portfolio-cms",
          description: "Sistema de gestión de contenidos para portfolios creativos",
          content: "# Portfolio CMS\n\nSistema de gestión de contenidos diseñado específicamente para portfolios creativos.",
          tags: ["Next.js", "Strapi", "GraphQL"],
          category: "CMS",
          demoUrl: "https://demo.com",
          featured: true,
          order: 3,
          technologies: ["Next.js", "Strapi", "GraphQL"],
          year: 2024,
          publishedAt: new Date(),
        },
        {
          title: "Analytics Dashboard",
          slug: "analytics-dashboard",
          description: "Dashboard de análisis con visualización de datos en tiempo real",
          content: "# Analytics Dashboard\n\nVisualiza tus datos en tiempo real con gráficos interactivos y análisis avanzado.",
          tags: ["React", "D3.js", "Node.js"],
          category: "Dashboard",
          demoUrl: "https://demo.com",
          featured: false,
          order: 4,
          technologies: ["React", "D3.js", "Node.js"],
          year: 2023,
          publishedAt: new Date(),
        },
        {
          title: "Social Media App",
          slug: "social-media-app",
          description: "Red social con mensajería instantánea y compartición de contenido",
          content: "# Social Media App\n\nRed social moderna con mensajería en tiempo real y compartición de contenido multimedia.",
          tags: ["Next.js", "Socket.io", "MongoDB"],
          category: "Web App",
          demoUrl: "https://demo.com",
          featured: false,
          order: 5,
          technologies: ["Next.js", "Socket.io", "MongoDB"],
          year: 2023,
          publishedAt: new Date(),
        },
        {
          title: "Booking System",
          slug: "booking-system",
          description: "Sistema de reservas para servicios profesionales con calendario integrado",
          content: "# Booking System\n\nSistema completo de reservas con calendario integrado y notificaciones automáticas.",
          tags: ["React", "Express", "PostgreSQL"],
          category: "Web App",
          demoUrl: "https://demo.com",
          featured: false,
          order: 6,
          technologies: ["React", "Express", "PostgreSQL"],
          year: 2023,
          publishedAt: new Date(),
        },
      ];

      for (const project of projects) {
        await strapi.db.query('api::project.project').create({ data: project });
        console.log(`✅ Proyecto creado: ${project.title}`);
      }

      // Crear blogs
      console.log('📝 Creando artículos de blog...');
      const blogs = [
        {
          title: "Cómo construir una aplicación web moderna",
          slug: "como-construir-aplicacion-web-moderna",
          excerpt: "Guía completa para desarrollar aplicaciones web modernas con las mejores prácticas y tecnologías actuales.",
          content: "# Cómo construir una aplicación web moderna\n\nEn este artículo exploramos las mejores prácticas para desarrollar aplicaciones web modernas...",
          category: "Tutorial",
          date: "2024-01-15",
          readTime: 8,
          author: "Tomás Nadal",
          featured: true,
          tags: ["Web Development", "Best Practices", "Tutorial"],
          publishedAt: new Date(),
        },
        {
          title: "Optimización de rendimiento en React",
          slug: "optimizacion-rendimiento-react",
          excerpt: "Técnicas avanzadas para mejorar el rendimiento de tus aplicaciones React y ofrecer una mejor experiencia de usuario.",
          content: "# Optimización de rendimiento en React\n\nDescubre cómo optimizar tus aplicaciones React para lograr el máximo rendimiento...",
          category: "Performance",
          date: "2024-02-20",
          readTime: 10,
          author: "Tomás Nadal",
          featured: true,
          tags: ["React", "Performance", "Optimization"],
          publishedAt: new Date(),
        },
        {
          title: "Introducción a TypeScript",
          slug: "introduccion-typescript",
          excerpt: "Todo lo que necesitas saber para empezar con TypeScript en tus proyectos y mejorar la calidad de tu código.",
          content: "# Introducción a TypeScript\n\nTypeScript es un superset de JavaScript que añade tipado estático...",
          category: "Tutorial",
          date: "2024-03-10",
          readTime: 6,
          author: "Tomás Nadal",
          featured: false,
          tags: ["TypeScript", "JavaScript", "Tutorial"],
          publishedAt: new Date(),
        },
      ];

      for (const blog of blogs) {
        await strapi.db.query('api::blog.blog').create({ data: blog });
        console.log(`✅ Blog creado: ${blog.title}`);
      }

      console.log('\n🎉 ¡Datos de ejemplo creados exitosamente!\n');
    }
  },
};
