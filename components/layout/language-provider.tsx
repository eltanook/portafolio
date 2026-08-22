"use client"

import * as React from "react"

export type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  es: {
    // Navigation
    "nav.brand": "— desarrollador & datos.",
    "nav.home": "Inicio",
    "nav.projects": "Proyectos",
    "nav.blog": "Blog",
    "nav.contact": "Contacto",
    "nav.expertise": "Experiencia",
    "nav.works": "Trabajos",
    "nav.testimonials": "Filosofía",
    "nav.connect": "Conectar",
    "nav.sendMessage": "Contáctame",

    // Hero
    "hero.title": "Tomás Nadal",
    "hero.subtitle": "Desarrollador Web & Científico de Datos|",
    "hero.description.start": "Combino desarrollo web y ciencia de datos para construir ",
    "hero.description.highlight": "experiencias digitales inteligentes",
    "hero.btn": "Contactame",
    "hero.scroll": "(Scrollear abajo)",
    "hero.rights": "Desarrollo web y data science.",

    // About Stats
    "about.tag": "Sobre Mi",
    "about.years": "— años de experiencia construyendo aplicaciones web modernas.",
    "about.statement": "Soy Tomás Nadal, desarrollador web y científico de datos de Buenos Aires. Me apasiona crear soluciones digitales que combinen desarrollo y la ciencia de datos para resolver problemas reales. Disfruto construir plataformas robustas, optimizar procesos y transformar información en herramientas útiles, eficientes y con impacto real.",
    "about.ageLabel": "Edad",
    "about.yearsShort": "Años",
    "about.projectsLabel": "Proyectos",
    "about.englishLabel": "Inglés Avanzado",
    "about.btn": "Más sobre mí",

    // Expertise
    "exp.1.title": "Full Stack Engineering",
    "exp.1.desc": "Construyendo soluciones robustas y escalables con React, Next.js y Node.js. Como CTO en Nexium Solutions, lideré el desarrollo de más de 50 proyectos digitales desde cero.",
    "exp.2.title": "Ciencia de Datos & Analítica",
    "exp.2.desc": "Aplicando el rigor académico de mi Licenciatura en Ciencia de Datos en UNSAM. Especializado en análisis estadístico, Python, Pandas y modelos de Machine Learning (Scikit-learn).",
    "exp.3.title": "Inteligencia Artificial",
    "exp.3.desc": "Como fundador de Zevetix Labs, desarrollé más de 20 proyectos enfocados en IA, integrando modelos de OpenAI, Anthropic, Gemini y herramientas locales como Ollama.",
    "exp.learn": "Saber más",

    // Works
    "works.subtitle": "— algunos de mis proyectos",
    "works.title1": "Desarrollo de sitios web y herramientas digitales enfocadas en resolver problemas de clientes reales. ",
    "works.title2": "Ningún proyecto de acá es de juguete.",

    // Approach
    "approach.title1": "Cómo busco aportar ",
    "approach.title2": "valor.",
    "approach.whatWeDo": "Mi CV",
    "approach.cuz": "— a la izquierda mis habilidades, abajo mis currículums.",
    "approach.cv": "Mis CVs",
    "approach.cvWeb": "CV Desarrollador",
    "approach.cvData": "CV Data Scientist",
    "approach.cvGeneral": "CV General",
    "approach.downloadCv": "Descargar",
    "approach.shareWhatsapp": "Compartir por WhatsApp",
    "approach.copyLink": "Copiar enlace",
    "general.scroll": "Desplazar",
    "general.noImage": "Sin imagen",
    "general.placeholder": "Marcador",
    "general.category": "Categoría",
    
    "app.1.title": "Full Stack Engineering (Nexium)",
    "app.1.desc": "Como Co-Fundador y CTO de Nexium Solutions, lideré a equipos de desarrolladores para entregar más de 50 proyectos web a medida. Diseñé arquitecturas escalables con Node.js, Bases de Datos Relacionales y NoSQL, asegurando el almacenamiento eficiente de datos y la robustez del sistema.",
    "app.2.title": "Ciencia de Datos (UNSAM)",
    "app.2.desc": "Transitando hacia el 4to año de mi Licenciatura en Ciencia de Datos en la Universidad Nacional de San Martín. Cuento con formación intensiva en Álgebra Lineal, Análisis Matemático, Probabilidad y Estadística Inferencial, aportando rigor científico a cada solución.",
    "app.3.title": "Inteligencia Artificial (Zevetix)",
    "app.3.desc": "Como Fundador de Zevetix Labs, diseñé y desarrollé más de 20 proyectos orientados a datos. Me especializo en la integración comercial de APIs de IA pre-entrenadas (OpenAI, Anthropic, Gemini) y la experimentación con modelos locales (Ollama).",
    "app.4.title": "Machine Learning y Análisis",
    "app.4.desc": "Aplico mis conocimientos en Python, Pandas, NumPy y Scikit-learn para resolver problemas complejos. Construyo modelos de Machine Learning clásico (regresiones, clasificación, clustering) y realizo análisis exploratorios profundos para tomar decisiones basadas en datos.",
    "app.5.title": "Liderazgo y Metodologías",
    "app.5.desc": "No solo escribo código. Experiencia real gestionando el ciclo de vida completo de productos bajo metodologías ágiles (Kanban con Trello/Notion). Lidero equipos, defino requerimientos (Product Discovery) y me comunico asertivamente con clientes y stakeholders.",
    "app.6.title": "Mentalidad de Crecimiento",
    "app.6.desc": "Comencé de forma autodidacta en 2020 creando mis primeras interfaces web con HTML, CSS y JavaScript puro. Esa curiosidad base me llevó a escalar hacia React y Node.js, y hoy a combinar la ingeniería de software con las ciencias de datos.",
    "app.7.title": "Filosofía de Trabajo",
    "app.7.desc": "El código y los datos no son el fin, son la herramienta. La tecnología solo tiene sentido cuando transforma información en decisiones y resuelve problemas medibles en el mundo real. Creo firmemente que una arquitectura sólida desde el día uno y modelos analíticos bien fundamentados ahorran meses de refactorización.",

    // CTA
    "cta.chaos": "Mi historia",
    "cta.subtitle": "— desde 2020 creando soluciones digitales.",
    "cta.title1": "Mi ",
    "cta.title2": "Trayectoria.",
    "cta.story": "Mi camino comenzó en 2020. Me formé inicialmente de manera autodidacta mientras estaba en la escuela secundaria, construyendo desde cero mi lugar en un mundo que me resultaba fascinante, pero del que no tenía conocimientos técnicos. Con el tiempo, combiné la formación académica de mi Licenciatura en Ciencia de Datos en UNSAM con la práctica constante, proyectos para clientes reales y experiencia en el mercado freelance. Hoy fusiono ingeniería de software, análisis de datos e IA para desarrollar soluciones inteligentes y de alto impacto. Además, cofundé Nexium Solutions, donde participé en más de 50 proyectos, y actualmente dirijo Zevetix, sumando otros 50 proyectos enfocados en soluciones digitales modernas y escalables.",
    "cta.btn": "Contactame",
    
    // Testimonials (Now: Principles)
    "test.title": "Filosofía de Trabajo",
    "test.explore": "Visitar mi GitHub",
    "test.1.quote": "\"El código y los datos no son el fin, son la herramienta. La tecnología solo tiene sentido cuando transforma información en decisiones y resuelve problemas medibles en el mundo real.\"",
    "test.1.author": "Principio #1: Datos, Código y Resultados",
    "test.2.quote": "\"Una arquitectura sólida desde el día uno y modelos analíticos bien fundamentados ahorran meses de refactorización. Escalar debe ser un proceso lógico, no un parche constante.\"",
    "test.2.author": "Principio #2: Rigor y Escalabilidad",

    // Certifications
    "cert.title": "Certificaciones",
    "cert.1": "React JS (Top 10%)",
    "cert.1.org": "Coderhouse",
    "cert.2": "Python Full Stack",
    "cert.2.org": "Min. de Educación (Codo a Codo)",
    "cert.3": "Desarrollo Web Intensivo",
    "cert.3.org": "Min. de Educación",
    "cert.4": "Inglés Avanzado (C1)",
    "cert.4.org": "Cambridge Assessment English",
    "cert.explore": "Ver todas en LinkedIn",

    // Footer
    "footer.office": "(Ubicación)",
    "footer.contact": "(Contáctame)",
    "footer.nav": "(Navegación)",
    "footer.touch": "— sentite libre de contactarme",
    "footer.social": "(Redes sociales)",
    "footer.built": "Tomás I. Nadal",
    "footer.privacy": "Política de Privacidad",
    "footer.terms": "Términos y Condiciones",
    "footer.home": "Inicio",
    "footer.description": "Creo soluciones inteligentes, combinando código y datos para convertir la tecnología en una herramienta al servicio de las personas.",
    "footer.rights": "Todos los derechos reservados.",

    // Projects
    "projects.title": "Proyectos",
    "projects.subtitle": "Una colección de mis trabajos recientes y desarrollos destacados.",
    "projects.search": "Buscar proyectos",
    "projects.searchPlaceholder": "Escribe para buscar...",
    "projects.categories": "Categorías",
    "projects.sortBy": "Ordenar por",
    "projects.recent": "Más recientes",
    "projects.oldest": "Más antiguos",

    // Blog
    "blog.title": "Blog",

    // Contact
    "contact.title": "Ponte en contacto",
    "contact.subtitle": "¿Tienes un proyecto en mente? Hablemos de cómo podemos trabajar juntos.",
    "contact.name": "Nombre",
    "contact.namePlaceholder": "Tu nombre completo",
    "contact.email": "Correo electrónico",
    "contact.emailPlaceholder": "tu@email.com",
    "contact.message": "Mensaje",
    "contact.messagePlaceholder": "Cuéntame sobre tu proyecto...",
    "contact.send": "Enviar Mensaje",
    "contact.sending": "Enviando...",
    "contact.location": "Ubicación"
  },
  en: {
    // Navigation
    "nav.brand": "— developer & data.",
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.expertise": "Expertise",
    "nav.works": "Works",
    "nav.testimonials": "Philosophy",
    "nav.connect": "Get Connected",
    "nav.sendMessage": "Contact Me",

    // Hero
    "hero.title": "Tomás Nadal",
    "hero.subtitle": "Web Developer & Data Scientist|",
    "hero.description.start": "I merge code and data to make technology a ",
    "hero.description.highlight": "a tool at the service of others",
    "hero.btn": "Contact",
    "hero.scroll": "(Scroll down)",
    "hero.rights": "All Rights Reserved.",

    // About Stats
    "about.tag": "About Tomás",
    "about.years": "— years of experience building modern web applications.",
    "about.statement": "I'm Tomás Nadal, a web developer and data scientist from Buenos Aires, Argentina. My passion is building robust platforms and analytical models that provide real value. Each project is an opportunity to transform data and ideas into tools that serve people.",
    "about.ageLabel": "Age",
    "about.yearsShort": "Years",
    "about.projectsLabel": "Projects",
    "about.englishLabel": "Advanced English",
    "about.btn": "More about me",

    // Expertise
    "exp.1.title": "Full Stack Engineering",
    "exp.1.desc": "Building robust, scalable applications with React, Next.js, and Node.js. As CTO at Nexium Solutions, I led the development of over 50 digital projects from scratch.",
    "exp.2.title": "Data Science & Analytics",
    "exp.2.desc": "Applying the academic rigor from my Data Science degree at UNSAM. Specialized in statistical analysis, Python, Pandas, and Machine Learning models (Scikit-learn).",
    "exp.3.title": "Artificial Intelligence",
    "exp.3.desc": "As founder of Zevetix Labs, I've developed over 20 AI-focused projects, integrating models from OpenAI, Anthropic, Gemini, and local tools like Ollama.",
    "exp.learn": "Learn more",

    // Works
    "works.subtitle": "— from my most recent works to the most basic ones.",
    "works.title1": "I develop scalable systems and analytical models ",
    "works.title2": "focused on solving real-world problems.",

    // Approach
    "approach.title1": "How I approach ",
    "approach.title2": "projects.",
    "approach.whatWeDo": "Methodology",
    "approach.cuz": "— a summary of my background and skills.",
    "approach.cv": "My CV",
    "approach.cvWeb": "CV Developer",
    "approach.cvData": "CV Data Science",
    "approach.cvGeneral": "CV General",
    "approach.downloadCv": "Download",
    "approach.shareWhatsapp": "Share via WhatsApp",
    "approach.copyLink": "Copy link",
    "general.scroll": "Scroll",
    "general.noImage": "No Image",
    "general.placeholder": "Placeholder",
    "general.category": "Category",
    
    "app.1.title": "Full Stack Engineering (Nexium)",
    "app.1.desc": "As Co-Founder and CTO of Nexium Solutions, I led developer teams to deliver over 50 custom web projects. I designed scalable architectures with Node.js, Relational, and NoSQL databases, ensuring efficient data storage and system robustness.",
    "app.2.title": "Data Science (UNSAM)",
    "app.2.desc": "Transitioning to the 4th year of my Data Science degree at UNSAM. I possess intensive training in Linear Algebra, Calculus, Probability, and Inferential Statistics, bringing scientific rigor to every solution I build.",
    "app.3.title": "Artificial Intelligence (Zevetix)",
    "app.3.desc": "As Founder of Zevetix Labs, I designed and developed over 20 data-driven projects. I specialize in the commercial integration of pre-trained AI APIs (OpenAI, Anthropic, Gemini) and experimentation with local models (Ollama).",
    "app.4.title": "Machine Learning & Analytics",
    "app.4.desc": "I apply my knowledge in Python, Pandas, NumPy, and Scikit-learn to solve complex problems. I build classical Machine Learning models (regressions, classification, clustering) and conduct deep exploratory analysis to make data-driven decisions.",
    "app.5.title": "Leadership & Methodologies",
    "app.5.desc": "I don't just write code. I have real experience managing the complete product lifecycle using agile methodologies (Kanban with Trello/Notion). I lead teams, define requirements (Product Discovery), and communicate assertively with clients and stakeholders.",
    "app.6.title": "Growth Mindset",
    "app.6.desc": "I started self-taught in 2020 building my first web interfaces with pure HTML, CSS, and JavaScript. That foundational curiosity led me to scale towards React and Node.js, and today to combine software engineering with data sciences.",
    "app.7.title": "Work Philosophy",
    "app.7.desc": "Code and data aren't the end goal, they are the tools. Technology only makes sense when it turns information into decisions and solves measurable real-world problems. I firmly believe that a solid architecture from day one and well-founded analytical models save months of refactoring.",

    // CTA
    "cta.chaos": "My story",
    "cta.subtitle": "— building solutions since 2020.",
    "cta.title1": "My ",
    "cta.title2": "Journey.",
    "cta.story": "My journey started in 2020. I initially trained as a self-taught developer, building from scratch. Today, through my Data Science degree at UNSAM, I merge software engineering with data analysis and AI. I co-founded Nexium (100+ projects) and currently lead Zevetix, building intelligent, high-impact solutions.",
    "cta.btn": "Work with me",
    
    // Testimonials (Now: Principles)
    "test.title": "Work Philosophy",
    "test.explore": "View my GitHub",
    "test.1.quote": "\"Code and data aren't the end goal, they are the tools. Technology only makes sense when it turns information into decisions and solves measurable real-world problems.\"",
    "test.1.author": "Principle #1: Data, Code & Results",
    "test.2.quote": "\"A solid architecture from day one and well-founded analytical models save months of refactoring. Scaling should be a logical process, not a constant patch.\"",
    "test.2.author": "Principle #2: Rigor & Scalability",

    // Certifications
    "cert.title": "Certifications",
    "cert.1": "React JS (Top 10%)",
    "cert.1.org": "Coderhouse",
    "cert.2": "Python Full Stack",
    "cert.2.org": "Ministry of Education (Codo a Codo)",
    "cert.3": "Intensive Web Dev",
    "cert.3.org": "Ministry of Education",
    "cert.4": "Advanced English (C1)",
    "cert.4.org": "Cambridge Assessment English",
    "cert.explore": "View all on LinkedIn",

    // Footer
    "footer.office": "(Location)",
    "footer.contact": "(Contact me)",
    "footer.nav": "(Navigation)",
    "footer.touch": "— let's get in touch",
    "footer.social": "(Social media)",
    "footer.built": "Tomás I. Nadal",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms and Conditions",
    "footer.home": "Home",
    "footer.description": "I build intelligent solutions, combining code and data to turn technology into a tool to serve others.",
    "footer.rights": "All rights reserved.",

    // Projects
    "projects.title": "Projects",
    "projects.subtitle": "A collection of my recent works and featured developments.",
    "projects.search": "Search projects",
    "projects.searchPlaceholder": "Type to search...",
    "projects.categories": "Categories",
    "projects.sortBy": "Sort by",
    "projects.recent": "Most recent",
    "projects.oldest": "Oldest",

    // Blog
    "blog.title": "Blog",

    // Contact
    "contact.title": "Get in touch",
    "contact.subtitle": "Have a project in mind? Let's talk about how we can work together.",
    "contact.name": "Name",
    "contact.namePlaceholder": "Your full name",
    "contact.email": "Email",
    "contact.emailPlaceholder": "you@email.com",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Tell me about your project...",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.location": "Location"
  }
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
