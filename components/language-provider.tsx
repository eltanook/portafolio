"use client"

import * as React from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  es: {
    "nav.home": "Inicio",
    "nav.projects": "Proyectos",
    "nav.blog": "Blog",
    "nav.contact": "Contacto",
    "nav.sendMessage": "Enviar Mensaje",
    "hero.title": "Trabajo Inteligente, Éxito Garantizado.",
    "hero.subtitle": "Creamos soluciones digitales que optimizan, potencian y transforman negocios y profesionales.",
    "hero.cta": "Enviar mensaje",
    "hero.viewProjects": "Ver Proyectos",
    "about.title": "Sobre Mí",
    "about.description":
      "Desarrollador Full Stack apasionado por crear experiencias digitales excepcionales que combinan diseño elegante con código limpio y eficiente.",
    "about.experience": "Años de Experiencia",
    "about.projects": "Proyectos Completados",
    "about.clients": "Clientes Satisfechos",
    "about.technologies": "Tecnologías",
    "about.viewMore": "Ver más información",
    "about.downloadCV": "Descargar CV",
    "about.myCV": "Mi CV",
    "about.myJourney": "Mi Trayectoria",
    "about.myBeginnings": "Mis Inicios",
    "about.age": "años",
    "about.available": "Disponible",
    "about.forNewProjects": "Para nuevos proyectos",
    "projects.title": "Proyectos Destacados",
    "projects.subtitle": "Una selección de mis trabajos más recientes y destacados",
    "projects.viewProject": "Ver Proyecto",
    "projects.viewAll": "Ver Todos los Proyectos",
    "projects.viewDetails": "Ver Detalles",
    "projects.visitSite": "Visitar Sitio",
    "projects.demo": "Demo",
    "projects.search": "Buscar",
    "projects.searchPlaceholder": "Buscar proyectos...",
    "projects.categories": "Categorías",
    "projects.sortBy": "Ordenar por",
    "projects.recent": "Más recientes",
    "projects.oldest": "Más antiguos",
    "projects.noResults": "No se encontraron proyectos",
    "projects.noProjectsFound": "No se encontraron proyectos",
    "projects.relatedProjects": "Proyectos Relacionados",
    "projects.backToProjects": "Volver a Proyectos",
    "projects.viewDemo": "Ver Demo",
    "projects.client": "Cliente",
    "projects.date": "Fecha",
    "projects.category": "Categoría",
    "blog.title": "Blog & Artículos",
    "blog.subtitle": "Pensamientos, tutoriales y experiencias sobre desarrollo web",
    "blog.readMore": "Leer Más",
    "blog.minRead": "min de lectura",
    "blog.by": "por",
    "contact.title": "Trabajemos Juntos",
    "contact.subtitle": "¿Tienes un proyecto en mente? Me encantaría escuchar sobre él y ayudarte a hacerlo realidad.",
    "contact.name": "Nombre",
    "contact.namePlaceholder": "Juan Pérez",
    "contact.email": "Email",
    "contact.emailPlaceholder": "juan@ejemplo.com",
    "contact.message": "Mensaje",
    "contact.messagePlaceholder": "Cuéntame sobre tu proyecto...",
    "contact.send": "Enviar Mensaje",
    "contact.sending": "Enviando...",
    "contact.success": "¡Mensaje enviado con éxito!",
    "contact.error": "Error al enviar el mensaje. Inténtalo de nuevo.",
    "contact.phone": "Teléfono",
    "contact.location": "Ubicación",
    "contact.availability": "Disponibilidad",
    "contact.availabilityText": "Actualmente disponible para proyectos freelance. Respuesta en 24-48 horas.",
    "contact.remoteAvailable": "Disponible para proyectos remotos",
    "footer.rights": "Todos los derechos reservados.",
    "footer.madeWith": "Hecho con",
    "footer.by": "por",
    "footer.quickLinks": "Enlaces Rápidos",
    "footer.links": "Links",
    "footer.contact": "Contacto",
    "footer.social": "Redes Sociales",
    "footer.description": "Programador y desarrollador argentino especializado en desarrollo web, prospección y contenido.",
  },
  en: {
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.sendMessage": "Send Message",
    "hero.title": "Smart Work, Guaranteed Success.",
    "hero.subtitle": "We create digital solutions that optimize, empower, and transform businesses and professionals.",
    "hero.cta": "Send Message",
    "hero.viewProjects": "View Projects",
    "about.title": "About Me",
    "about.description":
      "Full Stack Developer passionate about creating exceptional digital experiences that combine elegant design with clean, efficient code.",
    "about.experience": "Years of Experience",
    "about.projects": "Projects Completed",
    "about.clients": "Happy Clients",
    "about.technologies": "Technologies",
    "about.viewMore": "Learn More",
    "about.downloadCV": "Download Resume",
    "about.myCV": "My Resume",
    "about.myJourney": "My Journey",
    "about.myBeginnings": "My Beginnings",
    "about.age": "years old",
    "about.available": "Available",
    "about.forNewProjects": "For New Projects",
    "projects.title": "Featured Projects",
    "projects.subtitle": "A selection of my most recent and outstanding work",
    "projects.viewProject": "View Project",
    "projects.viewAll": "View All Projects",
    "projects.viewDetails": "View Details",
    "projects.visitSite": "Visit Site",
    "projects.demo": "Demo",
    "projects.search": "Search",
    "projects.searchPlaceholder": "Search projects...",
    "projects.categories": "Categories",
    "projects.sortBy": "Sort By",
    "projects.recent": "Most Recent",
    "projects.oldest": "Oldest First",
    "projects.noResults": "No projects found",
    "projects.noProjectsFound": "No projects found",
    "projects.relatedProjects": "Related Projects",
    "projects.backToProjects": "Back to Projects",
    "projects.viewDemo": "View Demo",
    "projects.client": "Client",
    "projects.date": "Date",
    "projects.category": "Category",
    "blog.title": "Blog & Articles",
    "blog.subtitle": "Thoughts, tutorials, and experiences about web development",
    "blog.readMore": "Read More",
    "blog.minRead": "min read",
    "blog.by": "by",
    "contact.title": "Let's Work Together",
    "contact.subtitle": "Have a project in mind? I'd love to hear about it and help bring it to life.",
    "contact.name": "Name",
    "contact.namePlaceholder": "John Doe",
    "contact.email": "Email",
    "contact.emailPlaceholder": "john@example.com",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Tell me about your project...",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Message sent successfully!",
    "contact.error": "Error sending message. Please try again.",
    "contact.phone": "Phone",
    "contact.location": "Location",
    "contact.availability": "Availability",
    "contact.availabilityText": "Currently available for freelance projects. Response within 24-48 hours.",
    "contact.remoteAvailable": "Available for remote projects",
    "footer.rights": "All rights reserved.",
    "footer.madeWith": "Made with",
    "footer.by": "by",
    "footer.quickLinks": "Quick Links",
    "footer.links": "Links",
    "footer.contact": "Contact",
    "footer.social": "Social Media",
    "footer.description": "Argentine programmer and developer specialized in web development, prospecting, and content.",
  },
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<Language>("es")

  React.useEffect(() => {
    const stored = localStorage.getItem("language") as Language
    if (stored && (stored === "es" || stored === "en")) {
      setLanguageState(stored)
    }
  }, [])

  const setLanguage = React.useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }, [])

  const t = React.useCallback(
    (key: string) => {
      return translations[language][key as keyof typeof translations.es] || key
    },
    [language],
  )

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = React.useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
