// Script para poblar Strapi con datos iniciales
const projects = [
  {
    title: "E-Commerce Platform",
    slug: "ecommerce-platform",
    description: "Plataforma de comercio electrónico completa con pasarela de pagos y gestión de inventario. Complete e-commerce platform with payment gateway and inventory management.",
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
    tags: ["React", "Express", "PostgreSQL"],
    category: "Web App",
    demoUrl: "https://demo.com",
    featured: false,
    order: 6,
    technologies: ["React", "Express", "PostgreSQL"],
    year: 2023
  }
];

console.log('\n📦 DATOS PARA STRAPI\n');
console.log('Copia estos proyectos manualmente en Strapi Admin:\n');
projects.forEach((project, index) => {
  console.log(`\n${index + 1}. ${project.title}`);
  console.log(`   Slug: ${project.slug}`);
  console.log(`   Category: ${project.category}`);
  console.log(`   Featured: ${project.featured ? 'Sí' : 'No'}`);
  console.log(`   Tags: ${JSON.stringify(project.tags)}`);
});

console.log('\n\n✅ Ve a http://localhost:1337/admin');
console.log('   Content Manager → Project → Create new entry');
console.log('   Copia los datos de arriba\n');
