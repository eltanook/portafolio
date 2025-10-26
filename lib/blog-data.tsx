export interface BlogPost {
  id: number
  slug: string
  title: string
  titleEn: string
  excerpt: string
  excerptEn: string
  image: string
  category: string
  categoryEn: string
  date: string
  readTime: number
  author: string
  content: string
  contentEn: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "los-suenos-tambien-se-programan",
    title: "Los sueños también se programan",
    titleEn: "Dreams are also programmed",
    excerpt: "No hace falta tener todo resuelto para empezar. Hace falta empezar para empezar a resolver.",
    excerptEn:
      "You don't need to have everything figured out to start. You need to start to start figuring things out.",
    image: "/blog-1.png",
    category: "Motivación · Historia personal",
    categoryEn: "Motivation · Personal Story",
    date: "2025-10-05",
    readTime: 5,
    author: "Tomás Nadal",
    content: `
      <p>A veces me preguntan cómo arranqué con todo esto: con Nexium, con Zevetix, con la facultad, con los proyectos.<br/>
      Y la verdad, no tengo una historia de película. Empecé <strong>con una notebook prestada, una idea borrosa y una determinación enorme.</strong></p>

      <p>No sabía exactamente qué iba a hacer, pero sabía que no quería quedarme quieto.<br/>
      Y eso fue suficiente para dar el primer paso.</p>

      <p>El camino fue de todo menos recto. Hubo errores, clientes difíciles, semanas de 14 horas, y días en los que me preguntaba si realmente valía la pena. Pero en cada intento había algo nuevo que aprender. Y con el tiempo entendí que <strong>los sueños no se cumplen: se programan.</strong></p>

      <p>Cada línea de código, cada propuesta enviada, cada diseño modificado fue una forma de acercarme a eso que imaginaba.<br/>
      Y cuando algo salía mal, lo tomaba como un bug que había que corregir, no como una señal de que debía abandonar.</p>

      <blockquote>
        <p><em>"Los sueños no se cumplen. Se depuran."</em></p>
      </blockquote>

      <p>Hoy miro atrás y no me siento exitoso: <strong>me siento en camino.</strong> Y eso me llena. Porque el éxito no es un punto de llegada, sino un proceso continuo de mejora, de prueba, de constancia.<br/>
      La verdadera diferencia entre el que sueña y el que logra está en el que, a pesar de todo, sigue escribiendo líneas nuevas.</p>
    `,
    contentEn: `
      <p>Sometimes people ask me how I started all this: Nexium, Zevetix, university, the projects.<br/>
      And honestly, I don't have a movie-worthy story. I started <strong>with a borrowed laptop, a blurry idea, and enormous determination.</strong></p>

      <p>I didn't know exactly what I was going to do, but I knew I didn't want to stay still.<br/>
      And that was enough to take the first step.</p>

      <p>The path was anything but straight. There were mistakes, difficult clients, 14-hour weeks, and days when I wondered if it was really worth it. But in every attempt there was something new to learn. And over time I understood that <strong>dreams don't come true: they are programmed.</strong></p>

      <p>Every line of code, every proposal sent, every modified design was a way to get closer to what I imagined.<br/>
      And when something went wrong, I took it as a bug that needed fixing, not as a sign that I should give up.</p>

      <blockquote>
        <p><em>"Dreams don't come true. They get debugged."</em></p>
      </blockquote>

      <p>Today I look back and I don't feel successful: <strong>I feel on the way.</strong> And that fulfills me. Because success is not a destination, but a continuous process of improvement, testing, and perseverance.<br/>
      The real difference between those who dream and those who achieve is in those who, despite everything, keep writing new lines.</p>
    `,
  },
  {
    id: 2,
    slug: "la-ia-no-te-va-a-reemplazar",
    title: "La IA no te va a reemplazar (si sabés cómo apalancarte en ella)",
    titleEn: "AI won't replace you (if you know how to leverage it)",
    excerpt: "No es la IA la que te reemplaza. Es el miedo a aprender lo nuevo.",
    excerptEn: "It's not AI that replaces you. It's the fear of learning something new.",
    image: "/blog-2.png",
    category: "Tecnología · Perspectiva",
    categoryEn: "Technology · Perspective",
    date: "2025-09-09",
    readTime: 4,
    author: "Tomás Nadal",
    content: `
      <p>Cada avance tecnológico viene con una ola de miedo. Y con la inteligencia artificial no fue distinto.<br/>
      Cuando la probé por primera vez, sentí lo mismo que muchos: una mezcla entre asombro y amenaza. Pensé <em>"¿y si esto hace mi trabajo mejor que yo?"</em></p>

      <p>Pero con el tiempo entendí algo importante: <strong>la IA no reemplaza personas, reemplaza tareas.</strong><br/>
      El verdadero valor está en la mente que la guía, en la curiosidad que le da dirección.</p>

      <p>Hoy uso IA todos los días. Me ayuda a redactar mejor, a planificar estrategias, a validar ideas antes de perder tiempo.<br/>
      Pero lo más importante no es lo que hace por mí, sino <strong>lo que me permite hacer con más foco, claridad y criterio.</strong></p>

      <blockquote>
        <p><em>"La IA no te quita trabajo. Te quita las excusas."</em></p>
      </blockquote>

      <p>La diferencia entre ser reemplazado y ser potenciado está en la actitud.<br/>
      Podés pelearte con ella o podés entrenarte para usarla como aliada.<br/>
      El que se adapta no es el que sabe más, sino el que aprende más rápido.<br/>
      Y si entendés eso, no solo no vas a quedar atrás: vas a estar un paso adelante.</p>
    `,
    contentEn: `
      <p>Every technological advance comes with a wave of fear. And artificial intelligence was no different.<br/>
      When I tried it for the first time, I felt the same as many: a mix of amazement and threat. I thought <em>"what if this does my job better than me?"</em></p>

      <p>But over time I understood something important: <strong>AI doesn't replace people, it replaces tasks.</strong><br/>
      The real value is in the mind that guides it, in the curiosity that gives it direction.</p>

      <p>Today I use AI every day. It helps me write better, plan strategies, validate ideas before wasting time.<br/>
      But the most important thing is not what it does for me, but <strong>what it allows me to do with more focus, clarity and judgment.</strong></p>

      <blockquote>
        <p><em>"AI doesn't take away your work. It takes away your excuses."</em></p>
      </blockquote>

      <p>The difference between being replaced and being empowered is in attitude.<br/>
      You can fight it or you can train yourself to use it as an ally.<br/>
      The one who adapts is not the one who knows more, but the one who learns faster.<br/>
      And if you understand that, not only will you not fall behind: you'll be one step ahead.</p>
    `,
  },
  {
    id: 3,
    slug: "de-la-facultad-al-codigo",
    title: "De la facultad al código: cómo Ciencia de Datos me cambió la forma de pensar productos",
    titleEn: "From university to code: how Data Science changed the way I think about products",
    excerpt:
      "Aprender a programar me enseñó a construir. Estudiar Ciencia de Datos me enseñó a entender por qué algo vale la pena construirlo.",
    excerptEn:
      "Learning to code taught me to build. Studying Data Science taught me to understand why something is worth building.",
    image: "/blog-3.png",
    category: "Educación · Tecnología",
    categoryEn: "Education · Technology",
    date: "2025-09-18",
    readTime: 5,
    author: "Tomás Nadal",
    content: `
      <p>Cuando empecé Ciencia de Datos lo hice con una mezcla de curiosidad e intuición. Sentía que había algo en los números que explicaba mejor al mundo.<br/>
      Y con el tiempo descubrí que tenía razón.</p>

      <p>En el desarrollo uno piensa en términos de "funciona" o "no funciona". Pero los datos te muestran algo más: <strong>te enseñan a medir el impacto, a entender si lo que hiciste realmente sirvió.</strong></p>

      <p>Hoy, gracias a eso, no programo para que las cosas simplemente anden. Programo para que tengan sentido, para que sean medibles, para que aporten.</p>

      <p>Cada vez que lanzo una web, miro métricas: conversiones, rebotes, tiempo en página. Y cada número me habla. A veces lo que creí genial no funciona, y lo que parecía simple termina siendo lo más potente.</p>

      <blockquote>
        <p><em>"El código construye. Los datos corrigen."</em></p>
      </blockquote>

      <p>Y eso también me cambió a nivel personal. Me enseñó a no aferrarme al ego, sino al aprendizaje.<br/>
      A entender que equivocarse rápido y barato es mejor que acertar tarde.<br/>
      La Ciencia de Datos me enseñó que el progreso real no está en tener razón, sino en <strong>saber adaptarse al resultado.</strong></p>
    `,
    contentEn: `
      <p>When I started Data Science I did it with a mix of curiosity and intuition. I felt there was something in numbers that explained the world better.<br/>
      And over time I discovered I was right.</p>

      <p>In development you think in terms of "it works" or "it doesn't work". But data shows you something more: <strong>it teaches you to measure impact, to understand if what you did really worked.</strong></p>

      <p>Today, thanks to that, I don't code just to make things work. I code so they make sense, so they're measurable, so they contribute.</p>

      <p>Every time I launch a website, I look at metrics: conversions, bounces, time on page. And every number speaks to me. Sometimes what I thought was great doesn't work, and what seemed simple ends up being the most powerful.</p>

      <blockquote>
        <p><em>"Code builds. Data corrects."</em></p>
      </blockquote>

      <p>And that also changed me personally. It taught me not to cling to ego, but to learning.<br/>
      To understand that making mistakes quickly and cheaply is better than getting it right late.<br/>
      Data Science taught me that real progress is not in being right, but in <strong>knowing how to adapt to the result.</strong></p>
    `,
  },
  {
    id: 4,
    slug: "que-es-una-landing-hibrida",
    title: "Qué es una landing híbrida (y por qué casi todos los negocios necesitan una)",
    titleEn: "What is a hybrid landing page (and why almost every business needs one)",
    excerpt:
      "Ni tienda online, ni simple página de contacto. Una landing híbrida es ese punto medio entre mostrar y vender.",
    excerptEn:
      "Neither an online store nor a simple contact page. A hybrid landing page is that middle ground between showing and selling.",
    image: "/blog-4.png",
    category: "Desarrollo Web · Marketing",
    categoryEn: "Web Development · Marketing",
    date: "2025-09-26",
    readTime: 5,
    author: "Tomás Nadal",
    content: `
      <p>En estos años trabajando con marcas y emprendedores, vi el mismo problema repetirse una y otra vez: <strong>quieren vender online, pero no están listos para un e-commerce completo.</strong><br/>
      Y ahí nace la idea de la landing híbrida.</p>

      <p>Una landing híbrida no es una web común. Es una mezcla entre <strong>presentación, catálogo y embudo de venta.</strong><br/>
      El usuario entra, ve el producto, elige, y en lugar de pasar por un proceso pesado, <strong>manda su pedido directo por WhatsApp.</strong></p>

      <p>Lo que más me gusta de este enfoque es su simpleza:</p>
      <ul>
        <li>No requiere mantenimiento complejo.</li>
        <li>Se carga rápido, posiciona bien.</li>
        <li>Es escalable: si mañana querés tener un CMS o una tienda, no hay que rehacer todo.</li>
      </ul>

      <blockquote>
        <p><em>"Primero construimos algo que funcione. Después lo hacemos perfecto."</em></p>
      </blockquote>

      <p>Y lo mejor: permite que los negocios chicos compitan con los grandes.<br/>
      Porque el secreto no es tener la web más cara, sino <strong>la más clara.</strong><br/>
      Una buena landing híbrida no grita, convence. Y esa es, quizás, la base del marketing moderno: vender sin forzar.</p>
    `,
    contentEn: `
      <p>In these years working with brands and entrepreneurs, I saw the same problem repeat itself over and over: <strong>they want to sell online, but they're not ready for a complete e-commerce.</strong><br/>
      And that's where the idea of the hybrid landing page is born.</p>

      <p>A hybrid landing page is not a common website. It's a mix between <strong>presentation, catalog and sales funnel.</strong><br/>
      The user enters, sees the product, chooses, and instead of going through a heavy process, <strong>sends their order directly via WhatsApp.</strong></p>

      <p>What I like most about this approach is its simplicity:</p>
      <ul>
        <li>It doesn't require complex maintenance.</li>
        <li>It loads fast, ranks well.</li>
        <li>It's scalable: if tomorrow you want to have a CMS or a store, you don't have to redo everything.</li>
      </ul>

      <blockquote>
        <p><em>"First we build something that works. Then we make it perfect."</em></p>
      </blockquote>

      <p>And the best part: it allows small businesses to compete with the big ones.<br/>
      Because the secret is not having the most expensive website, but <strong>the clearest one.</strong><br/>
      A good hybrid landing page doesn't shout, it convinces. And that is, perhaps, the basis of modern marketing: selling without forcing.</p>
    `,
  },
  {
    id: 5,
    slug: "disenar-sin-disenar",
    title: "Diseñar sin diseñar: cuando la estética nace del propósito",
    titleEn: "Designing without designing: when aesthetics are born from purpose",
    excerpt: "El diseño no se trata de agregar cosas. Se trata de decidir qué dejar afuera.",
    excerptEn: "Design is not about adding things. It's about deciding what to leave out.",
    image: "/blog-5.png",
    category: "Diseño · Filosofía Visual",
    categoryEn: "Design · Visual Philosophy",
    date: "2025-09-02",
    readTime: 4,
    author: "Tomás Nadal",
    content: `
      <p>Hay una frase que me quedó grabada: <em>"Diseñar no es decorar, es ordenar."</em><br/>
      Y con el tiempo, entendí que esa es exactamente la clave.</p>

      <p>El buen diseño no es el que impresiona, sino el que <strong>desaparece.</strong><br/>
      El que te guía sin que lo notes, el que te hace sentir cómodo sin saber por qué.<br/>
      Y eso no se logra con efectos, sino con intención.</p>

      <p>En Zevetix adoptamos esa filosofía. Trabajamos para que cada landing, cada pieza visual, cada interacción tenga una razón detrás.<br/>
      Si un color está ahí, es porque genera contraste. Si un bloque tiene espacio, es porque el ojo necesita respirar.</p>

      <blockquote>
        <p><em>"El silencio visual también comunica."</em></p>
      </blockquote>

      <p>Diseñar sin diseñar no significa ser minimalista por moda.<br/>
      Significa <strong>entender que la forma más elegante de comunicar es dejar espacio para que el mensaje respire.</strong><br/>
      El diseño es, en el fondo, una conversación entre la lógica y la emoción. Y cuando esas dos se equilibran, todo encaja.</p>
    `,
    contentEn: `
      <p>There's a phrase that stuck with me: <em>"Designing is not decorating, it's organizing."</em><br/>
      And over time, I understood that's exactly the key.</p>

      <p>Good design is not the one that impresses, but the one that <strong>disappears.</strong><br/>
      The one that guides you without you noticing, the one that makes you feel comfortable without knowing why.<br/>
      And that is not achieved with effects, but with intention.</p>

      <p>At Zevetix we adopted that philosophy. We work so that every landing page, every visual piece, every interaction has a reason behind it.<br/>
      If a color is there, it's because it generates contrast. If a block has space, it's because the eye needs to breathe.</p>

      <blockquote>
        <p><em>"Visual silence also communicates."</em></p>
      </blockquote>

      <p>Designing without designing doesn't mean being minimalist for fashion.<br/>
      It means <strong>understanding that the most elegant way to communicate is to leave space for the message to breathe.</strong><br/>
      Design is, at its core, a conversation between logic and emotion. And when those two balance out, everything fits.</p>
    `,
  },
  {
    id: 6,
    slug: "lo-que-aprendi-supervisando-programadores",
    title: "Lo que aprendí supervisando programadores (aunque todavía me siento uno)",
    titleEn: "What I learned supervising programmers (even though I still feel like one)",
    excerpt: "Liderar no es saber más. Es saber acompañar.",
    excerptEn: "Leading is not knowing more. It's knowing how to accompany.",
    image: "/blog-6.png",
    category: "Liderazgo · Reflexión",
    categoryEn: "Leadership · Reflection",
    date: "2025-08-21",
    readTime: 5,
    author: "Tomás Nadal",
    content: `
      <p>Cuando empecé a coordinar proyectos en Nexium, lo hice con una mezcla de entusiasmo y miedo.<br/>
      Era raro pasar de escribir código a tener que <strong>dirigir a otros que lo escriben.</strong><br/>
      Y lo primero que entendí fue que <strong>no se trata de control, sino de comunicación.</strong></p>

      <p>Hoy sé que un buen líder no es el que revisa cada línea, sino el que marca un norte claro.<br/>
      Que liderar es crear contexto, no presión.<br/>
      Y que los equipos más productivos no son los que trabajan más, sino <strong>los que se entienden mejor.</strong></p>

      <p>También aprendí que no hay que microgestionar. Cuando confiás, el equipo crece.<br/>
      Y cuando das libertad con responsabilidad, todos rinden mejor.</p>

      <blockquote>
        <p><em>"No soy el jefe del equipo. Soy parte del equipo."</em></p>
      </blockquote>

      <p>Sigo programando, sigo ensuciándome las manos. Porque si dejás de hacerlo, te desconectás.<br/>
      Y un líder desconectado se convierte en un gestor de planillas, no en alguien que inspira.</p>

      <p>Hoy sé que liderar es, en el fondo, un acto de servicio: estar atento, sostener y empujar.<br/>
      No para figurar, sino para que todos lleguemos más lejos.</p>
    `,
    contentEn: `
      <p>When I started coordinating projects at Nexium, I did it with a mix of enthusiasm and fear.<br/>
      It was strange to go from writing code to having to <strong>direct others who write it.</strong><br/>
      And the first thing I understood was that <strong>it's not about control, but about communication.</strong></p>

      <p>Today I know that a good leader is not the one who reviews every line, but the one who sets a clear direction.<br/>
      That leading is creating context, not pressure.<br/>
      And that the most productive teams are not the ones that work more, but <strong>the ones that understand each other better.</strong></p>

      <p>I also learned that you shouldn't micromanage. When you trust, the team grows.<br/>
      And when you give freedom with responsibility, everyone performs better.</p>

      <blockquote>
        <p><em>"I'm not the team boss. I'm part of the team."</em></p>
      </blockquote>

      <p>I keep coding, I keep getting my hands dirty. Because if you stop doing it, you disconnect.<br/>
      And a disconnected leader becomes a spreadsheet manager, not someone who inspires.</p>

      <p>Today I know that leading is, at its core, an act of service: being attentive, supporting and pushing.<br/>
      Not to stand out, but so we all go further.</p>
    `,
  },
  {
    id: 7,
    slug: "por-que-medir-importa-mas-que-opinar",
    title: "Por qué medir importa más que opinar",
    titleEn: "Why measuring matters more than opining",
    excerpt: "No hace falta tener razón. Hace falta tener datos.",
    excerptEn: "You don't need to be right. You need to have data.",
    image: "/blog-7.png",
    category: "Data · Estrategia",
    categoryEn: "Data · Strategy",
    date: "2025-08-14",
    readTime: 4,
    author: "Tomás Nadal",
    content: `
      <p>En el mundo digital, las opiniones sobran. Todos tienen una idea, una intuición, una corazonada.<br/>
      Pero cuando los proyectos empiezan a escalar, <strong>la diferencia entre avanzar y estancarse está en lo que medís.</strong></p>

      <p>En Nexium aprendí que los datos son el espejo más honesto que podés tener.<br/>
      Podés creer que algo funciona, pero los números te cuentan otra historia.<br/>
      Y cuando los sabés escuchar, te enseñan más que cualquier curso.</p>

      <p>Medir no es frío. Es humano. Porque detrás de cada clic hay una persona.<br/>
      Y entender cómo se comporta, qué busca, dónde duda, <strong>te da la oportunidad de mejorar su experiencia real.</strong></p>

      <blockquote>
        <p><em>"Medir no mata la creatividad. La dirige."</em></p>
      </blockquote>

      <p>Hoy no tomo decisiones sin mirar resultados.<br/>
      Porque el marketing, el diseño y el desarrollo no son mundos separados: son partes de un mismo sistema que respira datos.<br/>
      Y cuando lo entendés, dejás de trabajar a ciegas.<br/>
      Dejás de opinar y empezás a construir con evidencia.</p>
    `,
    contentEn: `
      <p>In the digital world, opinions are abundant. Everyone has an idea, an intuition, a hunch.<br/>
      But when projects start to scale, <strong>the difference between moving forward and stagnating is in what you measure.</strong></p>

      <p>At Nexium I learned that data is the most honest mirror you can have.<br/>
      You may believe something works, but the numbers tell you another story.<br/>
      And when you know how to listen to them, they teach you more than any course.</p>

      <p>Measuring is not cold. It's human. Because behind every click there's a person.<br/>
      And understanding how they behave, what they're looking for, where they hesitate, <strong>gives you the opportunity to improve their real experience.</strong></p>

      <blockquote>
        <p><em>"Measuring doesn't kill creativity. It directs it."</em></p>
      </blockquote>

      <p>Today I don't make decisions without looking at results.<br/>
      Because marketing, design and development are not separate worlds: they are parts of the same system that breathes data.<br/>
      And when you understand that, you stop working blindly.<br/>
      You stop opining and start building with evidence.</p>
    `,
  },
]
