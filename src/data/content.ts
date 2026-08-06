export const book = {
  title: "Escuchar en otros sentidos",
  subtitle: "Primero mis manos",
  coverLine: "Tu vida puede ser posible sin escuchar",
  author: "Berenice Cura",
  description:
    "Una invitación a comprender la hipoacusia y la sordera, y a descubrir otras formas de escuchar el mundo.",
  purpose:
    "El libro reúne reflexiones y herramientas para ayudar a docentes, familias e instituciones a derribar barreras comunicacionales y construir una educación verdaderamente inclusiva.",
  topics: [
    "Educación inclusiva",
    "Lengua de Señas Argentina",
    "Accesibilidad comunicacional",
    "Infancia y familias",
    "Instituciones",
    "Empatía y vínculos",
  ],
  // Campos editoriales preparados para completar cuando haya datos confirmados.
  pendingDetails: {
    isbn: null,
    publisher: null,
    publicationDate: null,
    price: null,
    purchaseUrl: null,
  },
} as const;

export const navigation = [
  { label: "El libro", href: "#el-libro" },
  { label: "Su propósito", href: "#proposito" },
  { label: "Berenice", href: "#berenice" },
  { label: "La asociación", href: "#asociacion" },
  { label: "Fragmentos", href: "#fragmentos" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const manifesto = [
  { word: "Escuchar.", detail: "con la intención" },
  { word: "Comprender.", detail: "con presencia" },
  { word: "Conectar.", detail: "desde la empatía" },
  { word: "Incluir.", detail: "sin dejar a nadie afuera" },
] as const;

export const audiences = [
  {
    number: "01",
    title: "Docentes",
    text: "Reflexiones y herramientas para reconocer barreras comunicacionales y acompañar una educación más accesible.",
  },
  {
    number: "02",
    title: "Familias",
    text: "Una mirada sensible sobre la hipoacusia, la sordera y las distintas maneras de comunicarse y construir vínculos.",
  },
  {
    number: "03",
    title: "Instituciones",
    text: "Una invitación a pensar la accesibilidad comunicacional como un derecho y una responsabilidad compartida.",
  },
  {
    number: "04",
    title: "Comunidad",
    text: "Un punto de partida para derribar prejuicios, respetar la diversidad y abrir nuevas formas de participación.",
  },
] as const;

export const fragments = [
  "Escuchar no siempre comienza con los oídos, sino con la intención.",
  "Las manos también hablan, sienten y construyen puentes invisibles.",
  "Cada gesto puede convertirse en una palabra llena de sentido.",
  "La inclusión comienza cuando todos encuentran su forma de expresarse.",
  "Y en cada mano que se extiende, existe una oportunidad de conexión real.",
] as const;

export const association = {
  name: "Asociación Civil Comunidad Sorda e Hipoacúsica Tandilense",
  since: "Desde 2024",
  description:
    "Promueve la inclusión y la accesibilidad comunicacional de las personas sordas e hipoacúsicas. Trabaja para eliminar barreras de comunicación, fomentar la igualdad de oportunidades y garantizar la participación plena.",
  activities: [
    "Talleres de Lengua de Señas Argentina",
    "Capacitaciones",
    "Actividades de sensibilización",
    "Proyectos educativos",
  ],
  concept: "Cruzando Puentes",
} as const;

export const contact = {
  email: "accshtandilense@gmail.com",
  phones: [
    {
      raw: "2494569921",
      international: "5492494569921",
      display: "+54 9 249 456-9921",
    },
    {
      raw: "2494245888",
      international: "5492494245888",
      display: "+54 9 249 424-5888",
    },
  ],
  instagram: {
    handle: "@accshtandilense",
    url: "https://www.instagram.com/accshtandilense/",
  },
  facebook: {
    label: "Accsht",
    url: "https://www.facebook.com/Accsht",
  },
} as const;

export const whatsappUrl = (message: string, phoneIndex = 0) =>
  `https://wa.me/${contact.phones[phoneIndex].international}?text=${encodeURIComponent(message)}`;

export const contactMessages = {
  book: "Hola, quisiera consultar por el libro «Escuchar en otros sentidos: Primero mis manos».",
  activity: "Hola, quisiera invitar a Berenice Cura a una actividad.",
  training: "Hola, quisiera solicitar información sobre una capacitación.",
  association: "Hola, quisiera contactar a la Asociación Civil Comunidad Sorda e Hipoacúsica Tandilense.",
} as const;
