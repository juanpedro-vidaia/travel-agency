// ── Categories ────────────────────────────────────────────────────────────────

export const POST_CATEGORIES = {
  ARGENTINA:    'argentina',
  CHILE:        'chile',
  BOLIVIA:      'bolivia',
  INSPIRATION:  'inspiration',
  HONEYMOON: 'honeymoon',
  TIPS:     'tips',
} as const

export type PostCategory = typeof POST_CATEGORIES[keyof typeof POST_CATEGORIES]

export const CATEGORY_CONFIG: Record<PostCategory, { es: { label: string }; en?: { label: string }; color: string }> = {
  argentina:    { es: { label: 'Argentina' },          color: 'bg-sky-50 text-sky-700' },
  chile:        { es: { label: 'Chile' },              color: 'bg-red-50 text-red-700' },
  bolivia:      { es: { label: 'Bolivia' },            color: 'bg-amber-50 text-amber-700' },
  inspiration:  { es: { label: 'Inspiración' },        color: 'bg-purple-50 text-purple-700' },
  honeymoon: { es: { label: 'Lunas de Miel' },    color: 'bg-rose-50 text-rose-700' },
  tips:     { es: { label: 'Consejos de viaje' },  color: 'bg-green-50 text-green-700' },
}

// ── Post ──────────────────────────────────────────────────────────────────────

export interface PostContent {
  title: string
  excerpt: string
  content: string
  imageAlt: string
  metaTitle?: string
  metaDescription?: string
}

export interface Post {
  slug: string
  content: {
    es: PostContent
    en?: PostContent
  }
  imageKey: string
  date: string           // ISO: "2026-04-18"
  category: PostCategory
  tags: string[]
  readingTime: number    // minutes
  featured: boolean
  active: boolean
  relatedTripSlugs?: string[] // trip slugs
  author?: string
}

// ── Posts ─────────────────────────────────────────────────────────────────────

const posts: Post[] = [
  {
    slug: 'mate-alma-tradicion-argentina',
    content: {
      es: {
        title: 'El mate, alma y tradición de Argentina.',
        excerpt:
          'Más que una bebida, una forma de vida. Te contamos la historia, los rituales y los secretos de la infusión que une a los argentinos.',
        content: `El mate es mucho más que una bebida en Argentina; es un ritual, una tradición y un símbolo de identidad nacional. Desde el norte hasta el sur del país, el mate se comparte entre amigos y familiares, creando lazos y fortaleciendo relaciones. Esta infusión de yerba mate, servida en una calabaza y bebida a través de una bombilla, es tan común en Argentina que resulta imposible imaginar la vida cotidiana sin ella.

Aunque Uruguay y Paraguay también tienen una profunda relación con el mate, en este artículo nos centraremos en su papel en la cultura argentina y exploraremos su historia, cómo se prepara, los tipos de mate, su significado social y sus beneficios para la salud.

## Historia del mate

El mate tiene sus orígenes en los pueblos indígenas guaraníes que habitaban las regiones actuales de Argentina, Paraguay y Brasil. Estos pueblos utilizaban las hojas de yerba mate como parte de sus rituales y creían que poseía propiedades curativas. Durante la época colonial, los colonizadores españoles descubrieron esta bebida y comenzaron a adoptarla, popularizándola en el resto del continente.

Con el tiempo, la yerba mate se convirtió en un producto comercial importante, especialmente en Argentina, donde su cultivo se estableció firmemente en las provincias de **Misiones** y **Corrientes**. La popularidad del mate ha perdurado a través de los siglos, y hoy en día es una de las bebidas más representativas de Argentina, con un significado cultural que trasciende generaciones.

## Cómo se prepara el mate

Preparar un buen mate es todo un arte, y cada paso tiene su importancia. A continuación, se detallan los elementos necesarios y el proceso para disfrutar de esta bebida.

### Elementos necesarios

- **Calabaza**: tradicionalmente, el mate se toma en una calabaza seca, aunque actualmente también se utilizan recipientes de madera, cerámica o metal.
- **Bombilla**: es una especie de sorbete metálico con un filtro en el extremo inferior para evitar que la yerba pase al beber.
- **Yerba mate**: la yerba se elige según el gusto personal y puede variar en sabor e intensidad.
- **Agua caliente**: la temperatura ideal del agua es de entre **70°C y 80°C**, ya que el agua hirviendo quema la yerba y altera su sabor.

### Pasos para preparar el mate

1. **Llenar la calabaza**: se llena el mate aproximadamente a tres cuartas partes de yerba.
2. **Inclinar y humedecer la yerba**: se cubre la boca del mate y se lo inclina para que la yerba se agrupe hacia un lado. Luego, se añade un poco de agua tibia para humedecerla y dejarla reposar.
3. **Colocar la bombilla**: se introduce la bombilla en la parte donde se humedeció la yerba, sin moverla para que no se tapone.
4. **Agregar agua caliente**: se vierte agua caliente, pero no hirviendo, sobre la yerba y se comienza a beber.

> Cada persona tiene su propio estilo para preparar el mate, y estos pasos pueden variar ligeramente según las costumbres regionales o personales.

## Tipos de mate

La yerba mate se presenta en diferentes variedades, cada una con sus características únicas que influyen en el sabor y la intensidad del mate. Estos son algunos de los tipos más comunes:

- **Yerba con palo**: contiene hojas trituradas junto con pequeñas ramas. Es el tipo más consumido en Argentina y ofrece un sabor equilibrado.
- **Yerba sin palo**: solo contiene hojas trituradas, lo que da como resultado un sabor más fuerte y amargo.
- **Yerba saborizada**: algunas marcas agregan esencias de frutas, hierbas o especias para darle un toque especial al mate. Entre las combinaciones más populares está la yerba con limón, menta o cedrón.
- **Yerba orgánica**: se cultiva sin el uso de pesticidas ni productos químicos, siendo una opción más natural y saludable.

Cada persona puede elegir el tipo de yerba que más le guste, y hay una gran variedad disponible para satisfacer todos los gustos.

## La cultura del mate

El mate es mucho más que una bebida en Argentina; es un acto social y un símbolo de amistad y compañerismo. Es común ver a personas en plazas, parques y oficinas compartiendo un mate, lo cual fomenta la conexión y el diálogo. **El acto de compartir el mate, pasar la calabaza de una persona a otra, representa la igualdad y el respeto mutuo.**

Además, el mate tiene un rol importante en la rutina diaria. Muchas personas lo toman al despertar, durante el trabajo o al atardecer. Es una costumbre tan arraigada que, al visitar a alguien en su casa, es casi seguro que se ofrecerá un mate como símbolo de hospitalidad y amabilidad.

En comparación, en Uruguay también se consume el mate con gran fervor, y es común ver a los uruguayos caminando por la calle con su termo bajo el brazo y su mate en la mano. En Paraguay, el **tereré**, una versión fría del mate, es particularmente popular debido al clima cálido. Cada país ha hecho del mate una tradición única, adaptada a sus costumbres y estilo de vida.

## Beneficios del mate para la salud

La yerba mate es conocida por sus numerosas propiedades beneficiosas para la salud. A continuación, se destacan algunos de los beneficios más notables:

- **Fuente de energía**: la yerba mate contiene cafeína, lo que ayuda a mejorar la concentración y la energía, similar al café pero sin el efecto de nerviosismo.
- **Rica en antioxidantes**: la yerba mate contiene antioxidantes, que ayudan a combatir los radicales libres en el cuerpo y a reducir el riesgo de enfermedades.
- **Estimula la digestión**: el mate tiene un efecto positivo en el sistema digestivo y puede ayudar a aliviar problemas de indigestión.
- **Ayuda a la pérdida de peso**: se ha demostrado que la yerba mate ayuda a controlar el apetito y puede ser beneficiosa para aquellos que buscan mantener o reducir su peso.

> Aunque el mate tiene muchos beneficios, es importante consumirlo con moderación para evitar posibles efectos adversos relacionados con el exceso de cafeína.

## Dónde y cuándo se consume el mate

El mate se consume prácticamente en cualquier lugar y momento en Argentina. Desde la casa hasta la oficina, en reuniones sociales o en la soledad del hogar, el mate es bienvenido. Algunos de los lugares más comunes para beber mate incluyen:

- **En el hogar**: es el lugar donde más se consume, especialmente en el desayuno o la merienda.
- **En el trabajo**: muchas personas llevan su mate y su termo al trabajo para disfrutarlo durante la jornada laboral.
- **Al aire libre**: en parques y playas, el mate es ideal para disfrutar al aire libre con amigos o familia.
- **Durante viajes**: es común llevar un mate en viajes largos por carretera, ya que la bebida acompaña y hace el trayecto más ameno.

## Conclusión

El mate es, sin lugar a dudas, un símbolo de identidad en Argentina. Más allá de ser una simple bebida, representa el compañerismo, la tradición y la conexión entre las personas. Su historia, rituales y costumbres lo han consolidado como parte fundamental de la cultura argentina, y su influencia se extiende también a países como Uruguay y Paraguay.

Con sus múltiples beneficios para la salud y su capacidad para unir a las personas, **el mate sigue siendo una costumbre arraigada que acompaña a los argentinos en su vida cotidiana**, manteniendo viva una tradición que trasciende generaciones.`,
        imageAlt: 'Foto de Jorge Zapata en Unsplash',
        metaTitle: 'El mate, alma y tradición de Argentina. — Viajes Vidaia',
        metaDescription:
          'Descubre la cultura del mate en Argentina: su historia desde los guaraníes, cómo se prepara, los tipos de yerba y el ritual de compartirlo. Una tradición que define la identidad argentina.',
      }
    },
    imageKey: 'BLOG.MATE_ARGENTINA',
    date: '2024-09-27',
    category: 'argentina',
    tags: ['argentina', 'inspiracion'],
    readingTime: 5,
    featured: true,
    active: true,
    relatedTripSlugs: ['paisajes-naturales-argentina', 'argentina-esencial'],
  },
  {
    slug: 'desierto-de-atacama-en-chile',
    content: {
      es: {
        title: 'Viaje a Chile: el desierto de Atacama',
        excerpt:
          'El desierto de Atacama, uno de los lugares más extremos y fascinantes del planeta, combina paisajes únicos, leyendas ancestrales y escenarios que parecen de otro mundo. Un destino imprescindible en Chile para quienes buscan naturaleza, misterio y aventura.',
        content: `¿Sabes que Atacama es tan especial que hasta la NASA lo utiliza para probar sus instrumentos para las misiones en Marte?

Atacama no es solo un desierto, es uno de los lugares más áridos del planeta, es una de las mayores fuentes naturales de nitrato de sodio, el desierto de niebla más grande del mundo y por supuesto es un lugar mágico que merece la pena visitar.

>Por situaros, Atacama se encuentra al norte de Chile, ocupa más de 100.000 km2 y es el desierto más antiguo de la tierra, increíble, ¿no?

A este gran “mar” seco se le conoce como el **desierto no polar más seco del mundo**.

## La magia y sus leyendas

Lo que más me encanta de sitios así es la magia que le rodea… Atacama no destaca únicamente por todo lo que ya os he comentado, si no que además son muchas las leyendas que rondan este lugar tan increíble.

La maldición del tesoro del Inca que cuenta que la codicia de las personas que buscaban el tesoro les hacía perder el juicio y tener mala suerte hasta el final de sus días… o la famosa leyenda de Licancabur y Kimal, que narra la historia de amor entre un joven guerrero y una joven doncella.

Estas no son las únicas leyendas que rodean este paraje tan enigmático pero os invitamos a disfrutar de ellas viajando directamente a este lugar.

Desde Viajes Vidaia nos encantaría prepararte un viaje personalizado a este increíble lugar, visitando lugares como…

… el **salar de Atacama** para descubrir las 3 especies de flamencos de la Laguna Chaxa siendo este el depósito salino más grande de Chile cuya superficie, blanca y rugosa, oculta a simple vista un gran lago salobre. Su tamaño es de 300.000 kilómetros cuadrados y puede ser apreciado en su totalidad gracias a que el aire está completamente seco,

… el **Valle de la Luna** donde te adentraras en un territorio cuyo proceso de formación comenzó hace aproximadamente 33 millones de años con la formación de un conjunto de rocas que con el paso de los años han sido testigos de la gran capacidad de resiliencia de la Patta Hoiri,

… los **Geysers del Tatios**, un campo geotérmico ubicado en la Cordillera de los Andes, siendo el más alto del mundo (4.200 mts de altura) y ubicado a 89 kilómetros de San Pedro. Este último presenta a tempranas horas de la mañana una impresionante actividad de fumarolas de vapor producidas por las altas temperaturas de sus acuosos cráteres. ¡Se encuentra rodeado por cerros que alcanzan los 5900 metros de altura!

… así como contemplar el contraste de las aguas turquesas de las lagunas de Baltinache o las famosas lagunas altiplánicas (**Miscanti** y **Miñiques** a 4000m de altura!).

¿De verdad te vas a quedar sin visitarlo?`,
        imageAlt: 'Laguna Miscanti en el Desierto de Atacama, Chile',
        metaTitle: 'Viaje al Desierto de Atacama (Chile) — Guía completa | Viajes Vidaia',
        metaDescription:
          'Descubre el Desierto de Atacama: lagunas altiplánicas, geysers del Tatio, Valle de la Luna y sus leyendas. Consejos prácticos y todo lo necesario para organizar tu viaje.'  
      }
    },
    imageKey: 'BLOG.ATACAMA_CHILE',
    date: '2024-12-04',
    category: 'chile',
    tags: ['desierto de atacama', 'chile', 'lagunas altiplánicas', 'San Pedro de Atacama'],
    readingTime: 4,
    featured: true,
    active: true,
    relatedTripSlugs: ['chile-bolivia-salares'],
  },
  {
    slug: 'patagonia-argentina-w-circuit',
    content: {
      es: {
        title: 'W Circuit en Torres del Paine: todo lo que necesitas saber',
        excerpt:
          'Uno de los trekkings más míticos del planeta. Campamentos, refugios, el Glaciar Grey y esas torres que emergen entre nubes. Paso a paso.',
        content: '',
        imageAlt: 'Torres del Paine, Patagonia',
        metaTitle: 'Circuito W Torres del Paine: guía paso a paso — Viajes Vidaia',
        metaDescription:
          'Cómo hacer el Circuito W en Torres del Paine: campamentos, refugios, cuánto cuesta, cuándo ir y cómo reservar. La guía más completa en español.',
      }
    },
    imageKey: 'BLOG.PATAGONIA_W_CIRCUIT',
    date: '2026-03-28',
    category: 'chile',
    tags: ['torres-del-paine', 'trekking', 'patagonia', 'circuito-w'],
    readingTime: 10,
    featured: false,
    active: true,
    relatedTripSlugs: ['latitudes-australes'],
  },
  {
    slug: 'buenos-aires-primera-vez',
    content: {
      es: {
        title: 'Buenos Aires por primera vez: el barrio a barrio que te falta leer',
        excerpt:
          'Palermo, San Telmo, La Boca, Recoleta… Buenos Aires no se entiende sin sus barrios. Aquí va el mapa mental que necesitas antes de aterrizar.',
        content: '',
        imageAlt: 'Buenos Aires, Argentina',
        metaTitle: 'Buenos Aires por primera vez: guía de barrios — Viajes Vidaia',
        metaDescription:
          'De Palermo a San Telmo: cómo orientarte en Buenos Aires, qué ver en cada barrio, dónde comer y los errores que no debes cometer en tu primera visita.',
      }
    },
    imageKey: 'BLOG.BUENOS_AIRES_FIRST_TIME',
    date: '2026-03-10',
    category: 'argentina',
    tags: ['buenos-aires', 'ciudad', 'argentina', 'primera-vez'],
    readingTime: 7,
    featured: false,
    active: true,
    relatedTripSlugs: [],
  },
  {
    slug: 'luna-de-miel-patagonia',
    content: {
      es: {
        title: 'Luna de miel en Patagonia: romanticismo en el fin del mundo',
        excerpt:
          'Pocos escenarios en el mundo combinan tanta grandeza con tanta intimidad. Te contamos cómo organizar una luna de miel que jamás olvidaréis.',
        content: '',
        imageAlt: 'Patagonia al atardecer',
        metaTitle: 'Luna de miel en Patagonia: guía romántica — Viajes Vidaia',
        metaDescription:
          'Glaciares, lagos y silencio. Todo lo que necesitas para planificar una luna de miel inolvidable en la Patagonia argentina y chilena.',
      }
    },
    imageKey: 'BLOG.HONEYMOON_PATAGONIA',
    date: '2026-02-14',
    category: 'honeymoon',
    tags: ['luna-de-miel', 'patagonia', 'argentina', 'chile', 'romantico'],
    readingTime: 6,
    featured: false,
    active: true,
    relatedTripSlugs: ['latitudes-australes'],
  },
  {
    slug: 'mejores-epocas-viajar-argentina',
    content: {
      es: {
        title: 'Cuándo viajar a Argentina: mes a mes, destino a destino',
        excerpt:
          'Argentina es el país de los contrastes climáticos. Lo que es perfecto en Bariloche puede ser un infierno en Buenos Aires. Aquí te lo aclaramos todo.',
        content: '',
        imageAlt: 'Patagonia argentina en otoño',
        metaTitle: 'Cuándo viajar a Argentina: guía mes a mes — Viajes Vidaia',
        metaDescription:
          'La mejor época para viajar a cada región de Argentina: Patagonia, Buenos Aires, Iguazú, Mendoza y el norte. Clima, temporadas y cuándo reservar.',
      }
    },
    imageKey: 'BLOG.BEST_TIME_ARGENTINA',
    date: '2026-01-20',
    category: 'tips',
    tags: ['argentina', 'cuando-ir', 'temporadas', 'planificacion'],
    readingTime: 5,
    featured: false,
    active: true,
    relatedTripSlugs: [],
  },
]

export default posts
