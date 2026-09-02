import type { SitePage } from "../utils/routes";

export const book = {
  title: "Escuchar en otros sentidos",
  subtitle: "Primero mis manos",
  coverLine: "Tu vida puede ser posible sin escuchar",
  author: "Berenice Cura",
  description:
    "Una invitación a comprender la sordera y descubrir otras formas de escuchar el mundo.",
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
    price: "$30.000 ARS",
    purchaseUrl: "https://mpago.la/1q8ca7k",
  },
} as const;

export type Product = {
  slug: string;
  page: SitePage;
  title: string;
  subtitle: string;
  author: string;
  audience: string;
  description: string;
  longDescription: string;
  moral?: string;
  price?: string;
  topics: readonly string[];
  image: string;
  imageWidth: number;
  imageHeight: number;
  paymentUrl: string;
  trailerUrl?: string;
};

export const products: readonly Product[] = [
  {
    slug: "escuchar-en-otros-sentidos",
    page: "tienda/escuchar-en-otros-sentidos",
    title: book.title,
    subtitle: book.subtitle,
    author: book.author,
    audience: "Docentes, familias e instituciones",
    description: book.description,
    longDescription: book.purpose,
    price: book.pendingDetails.price,
    topics: book.topics,
    image: "book-cover.webp",
    imageWidth: 1024,
    imageHeight: 1536,
    paymentUrl: "https://mpago.la/1q8ca7k",
  },
  {
    slug: "luna-y-el-puente-de-las-manos",
    page: "tienda/luna-y-el-puente-de-las-manos",
    title: "Luna y el puente de las manos",
    subtitle: "Cuento infantil",
    author: "Berenice Cura",
    audience: "Niñas, niños y familias",
    description:
      "Luna es una nena sorda que ve el mundo de una manera especial. Un cuento sobre cómo su clase aprende a comunicarse en Lengua de Señas Argentina y construye, entre todos, un puente donde antes había silencio.",
    longDescription:
      "Con la ayuda de su maestra, los compañeros de Luna empiezan a aprender señas simples —hola, gracias, amigo, jugar, te quiero— y descubren que se puede contar historias, cantar y jugar con las manos, el rostro y la mirada. Todo termina en una gran feria de la inclusión, donde Luna cuenta un cuento con señas frente a toda la escuela.",
    moral:
      "Cada persona se comunica de una manera diferente. Cuando aprendemos a comprender al otro, construimos un mundo donde todos pueden participar, hacer amigos y sentirse incluidos.",
    price: "$10.000 ARS",
    topics: ["Primera infancia", "Lengua de Señas Argentina", "Inclusión escolar", "Comunicación"],
    image: "luna-cover.webp",
    imageWidth: 1024,
    imageHeight: 1495,
    paymentUrl: "https://mpago.la/1Q3o92S",
  },
  {
    slug: "mi-mama",
    page: "tienda/mi-mama",
    title: "Mi Mamá",
    subtitle: "Documental",
    author: "Dirigido por Morena Lucía Santivañez",
    audience: "Público general",
    description: "Existen otras maneras de comunicarse.",
    longDescription:
      "Un documental dirigido por Morena Lucía Santivañez que explora el vínculo entre una madre y su hija a través de otras formas de comunicación, invitando a repensar los afectos y la escucha desde otros sentidos.",
    price: "$15.000 ARS",
    topics: ["Documental", "Comunicación", "Vínculos familiares", "Accesibilidad"],
    image: "mi-mama-poster.webp",
    imageWidth: 1536,
    imageHeight: 1536,
    paymentUrl: "https://mpago.la/2Q7tKAH",
    trailerUrl: "https://youtu.be/Jii0aYuaQPk",
  },
] as const;

export const brand = {
  registration: "Registro N.º 3.470.308 · Acta N.º 4.182.539",
  pillars: [
    { label: "Comunicación", detail: "Un gesto que se entiende sin necesidad de traducirlo." },
    { label: "Lengua de Señas Argentina", detail: "La lengua natural y propia de la comunidad sorda." },
    { label: "Conexión humana", detail: "Puentes entre personas, más allá de cómo se expresen." },
  ],
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
  {
    text: "Escuchar no siempre comienza con los oídos, sino con la intención.",
    image: "libro-fragmento-escuchar.webp",
    imageAlt: "Ilustración editorial de una persona escuchando con atención bajo un arco al atardecer",
  },
  {
    text: "Las manos también hablan, sienten y construyen puentes invisibles.",
    image: "libro-fragmento-manos.webp",
    imageAlt: "Ilustración editorial de dos manos que se acercan entre columnas frente al mar",
  },
  {
    text: "Cada gesto puede convertirse en una palabra llena de sentido.",
    image: "libro-fragmento-gesto.webp",
    imageAlt: "Ilustración editorial de una mano haciendo un gesto en Lengua de Señas bajo un arco",
  },
  {
    text: "La inclusión comienza cuando todos encuentran su forma de expresarse.",
    image: "home-asociacion-editorial.webp",
    imageAlt: "Ilustración editorial de dos personas comunicándose en Lengua de Señas bajo arcos al atardecer",
  },
  {
    text: "Y en cada mano que se extiende, existe una oportunidad de conexión real.",
    image: "libro-fragmento-conexion.webp",
    imageAlt: "Ilustración editorial de un grupo de personas reunidas bajo un arco de noche",
  },
] as const;

export const association = {
  name: "Asociación Civil Comunidad Sorda e Hipoacúsica Tandilense",
  since: "Desde 2024",
  description:
    "Promueve la inclusión y la accesibilidad comunicacional de las personas sordas e hipoacúsicas. Trabaja para eliminar barreras de comunicación, fomentar la igualdad de oportunidades y garantizar la participación plena.",
  about: [
    "La Asociación Civil Comunidad Sorda e Hipoacúsica Tandilense funciona desde el año 2024 y promueve la inclusión y la accesibilidad comunicacional de las personas sordas e hipoacúsicas.",
    "Desarrolla talleres de Lengua de Señas Argentina (LSA), capacitaciones, actividades de sensibilización y proyectos educativos destinados a instituciones, organizaciones y la comunidad en general. Su objetivo es eliminar las barreras de comunicación, fomentar la igualdad de oportunidades y garantizar la plena participación de las personas sordas en todos los ámbitos de la sociedad.",
  ],
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

export const donationUrl = "https://link.mercadopago.com.ar/accshtcontribucion";

export const whatsappUrl = (message: string, phoneIndex = 0) =>
  `https://wa.me/${contact.phones[phoneIndex].international}?text=${encodeURIComponent(message)}`;

export const contactMessages = {
  book: "Hola, quisiera consultar por el libro «Escuchar en otros sentidos: Primero mis manos».",
  activity: "Hola, quisiera invitar a Berenice Cura a una actividad.",
  training: "Hola, quisiera solicitar información sobre una capacitación.",
  association: "Hola, quisiera contactar a la Asociación Civil Comunidad Sorda e Hipoacúsica Tandilense.",
  materials: "Hola, quisiera consultar por los materiales de sensibilización para mi institución.",
  receipt: "Hola, ya realicé el pago en la tienda. Te comparto el comprobante para coordinar la entrega.",
} as const;
