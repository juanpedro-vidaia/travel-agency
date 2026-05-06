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
    slug: 'nuestro-encuentro-en-iguazu',
    content: {
      es: {
        title: 'Nuestro encuentro en Iguazú',
        excerpt: 'Entre la majestuosidad de la Garganta del Diablo, anécdotas compartidas y el deseo de aventura, este encuentro no solo reforzó nuestra amistad, sino que sembró la semilla de lo que hoy conocemos como Viajes Vidaia.',
        content: `Cuando decimos que **Argentina y Chile** son especiales para nosotros viene de lejos.

Ya os hemos contado ese viaje de Laura por Argentina con un fin solidario, pero no os hemos contado que Jupe casualmente estaba allí viajando y viviendo en Argentina desde hacía unos meses y, claro, ¡aprovechamos esa oportunidad para vernos!

## El encuentro según Laura…

Yo tenía claro que como parte de mi corta estancia en Argentina quería ir a **Iguazú**, así que no dudé en llamar a Jupe para ver si podíamos coincidir! Jupe acababa de entrar a Argentina e iba a recorrer el norte del país. Resultó que tenía previsto pasar por Iguazú en fechas similares a las mías, y decidimos vernos y aprovechar a disfrutar de esa maravilla de entorno juntos.

Fue un encuentro especial, no sólo por Iguazú como fondo natural si no porque Jupe llevaba mucho tiempo fuera de casa y era la primera persona que conocía previamente con la que coincidía en su viaje. Aún recuerdo el abrazo cuando nos vimos en el hotel 🙂 

Los días siguientes fueron espectaculares, siempre recordaré ese bocata en frente de la garganta del diablo disfrutando de su majestuosidad, de su fuerza increíble y rodeados de los graciosos coatíes que no paraban de ofrecernos su compañía, o las risas en el hostal conociendo y tomando mate con nuevos amigos pero sobre todo ver a Jupe feliz, contándome sus anécdotas e imaginándome a mi misma en algún momento siendo tan valiente como él.

Y qué decir de Iguazú… es increíble, la fuerza y la belleza de sus cascadas es inexplicable y solo se puede entender si se visita, pero visitarlo al lado de un amigo hace que esa experiencia sea inolvidable. Siempre he estado un poco en contra de los lugares “super turísticos” porque creo que pierden encanto al estar masificados pero Iguazú hace que todo eso pase a un segundo plano. Aun se me eriza la piel cada vez que recuerdo la magia de esas cascadas y la sensación de sentirme tan pequeñita ante algo tan impresionante.  

## El encuentro según Jupe…

No estaba en mis planes encontrarme con Laura durante mi viaje por Sudamérica. Había terminado mi periplo por Bolivia y, tras cruzar por La Quiaca, planeaba recorrer el norte andino de Argentina, desde la provincia de Jujuy hasta Mendoza. Fue entonces cuando Laura me comentó que estaba en Buenos Aires haciendo voluntariado, y que un mes después tenía pensado viajar por la provincia de Salta y también visitar las Cataratas del Iguazú. Como en el norte no íbamos a coincidir —pues yo llegaría a Salta en tres días—, decidimos ajustar nuestros planes aventureros y vernos en las cataratas más caudalosas del mundo.

Llegué a **Puerto Iguazú** un mes después, un día antes de la llegada de Laura. Ella fue la primera amiga de mi vida anterior con la que me crucé en este viaje. Cuando escuché su voz en la recepción del hostel, me levanté corriendo para abrazarla. Tras meses de conocer a nuevos amigos, compartir el camino y disfrutar de las despedidas, sentía la necesidad de conectarme con alguien cercano, alguien con quien pudiera compartir mis vivencias con la visión de la amistad

El reencuentro fue maravilloso…por una vez no me organicé el viaje, ella lo llevaba todo preparado, primero visitamos la zona argentina y el segundo día la zona brasileña. Disfrutar con tu amiga las sensaciones del ruido que generan las cascadas, del mojarte en aquella experiencia en la lancha, fue mágico. En las noches en el hostel intercambiamos experiencias con otros viajeros argentinos e internacionales, ella pudo vivir la experiencia viajera durante dos días, el conocer gente diversa y compartir alegrías y emociones. Todo lo que pasó aquellos días reforzó nuestra amistad.

La última tarde juntos, después de visitar la parte brasileña, disfrutamos de un rato de carcajadas con los chicos que habíamos conocido esos días. Con tristeza, llegó el momento de despedirnos. Yo debía partir hacia mi próximo destino, la provincia de Misiones, mientras Laura iniciaba su regreso a Madrid.

> Cenas, cervezas, risas y dos días increíbles en Iguazú fueron suficientes para recargar mis pilas (Jupe) y para cerrar el viaje (Laura) de manera increíble!

Puede que en parte la conexión **Vidaia** naciera allí…`,
        imageAlt: 'Cataratas del Iguazú, desde un mirador del Lado Brasileño',
        metaTitle: 'Nuestro encuentro en Iguazú — Inspiración viajeros | Viajes Vidaia',
        metaDescription: 'Descubre el encuentro en las Cataratas del Iguazú de los fundadores de Viajes Vidaia. Un encuentro inspiracional que no llevó a fundar esta empresa para crear viajes a Argentina para vosotros.',
      }
    },
    imageKey: 'BLOG.ENCUENTRO_IGUAZU',
    date: '2024-11-15',
    category: 'argentina',
    tags: ['argentina', 'inspiracion', 'cataratas-iguazu', 'viajes-vidaia'],
    readingTime: 3,
    featured: true,
    active: true,
    relatedTripSlugs: ['paisajes-naturales-argentina', 'argentina-esencial'],
  },
  {
    slug: 'mate-alma-tradicion-argentina',
    content: {
      es: {
        title: 'El mate, alma y tradición de Argentina.',
        excerpt: 'Más que una bebida, una forma de vida. Te contamos la historia, los rituales y los secretos de la infusión que une a los argentinos.',
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
        metaDescription: 'Descubre la cultura del mate en Argentina: su historia desde los guaraníes, cómo se prepara, los tipos de yerba y el ritual de compartirlo. Una tradición que define la identidad argentina.',
      }
    },
    imageKey: 'BLOG.MATE_ARGENTINA',
    date: '2024-11-27',
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
        excerpt: 'El desierto de Atacama, uno de los lugares más extremos y fascinantes del planeta, combina paisajes únicos, leyendas ancestrales y escenarios que parecen de otro mundo. Un destino imprescindible en Chile para quienes buscan naturaleza, misterio y aventura.',
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
        metaDescription: 'Descubre el Desierto de Atacama: lagunas altiplánicas, geysers del Tatio, Valle de la Luna y sus leyendas. Consejos prácticos y todo lo necesario para organizar tu viaje.',
      }
    },
    imageKey: 'BLOG.ATACAMA_CHILE',
    date: '2024-12-04',
    category: 'chile',
    tags: ['desierto-de-atacama', 'chile', 'lagunas-altiplánicas', 'san-pedro-de-atacama'],
    readingTime: 4,
    featured: true,
    active: true,
    relatedTripSlugs: ['chile-bolivia-salares'],
  },
  {
    slug: 'carretera-austral-chile',
    content: {
      es: {
        title: 'Carretera Austral: Un recorrido imprescindible por la Patagonia chilena',
        excerpt: 'La Carretera Austral recorre más de 1.200 km entre Puerto Montt y Villa O’Higgins, atravesando algunos de los paisajes más salvajes de la Patagonia. Glaciares, fiordos y lugares únicos como las Catedrales de Mármol la convierten en una ruta imprescindible para los amantes de la aventura.',
        content: `La región de la Patagonia chilena es una de las áreas más remotas y salvajes del mundo. Durante siglos, su acceso fue casi imposible debido a la presencia de densos bosques, fiordos, ríos caudalosos y campos de hielo, que dificultaban la conexión entre sus comunidades. Los primeros habitantes de esta zona fueron los pueblos originarios **Chonos, Kawésqar y Tehuelches**, quienes se adaptaron a la vida nómada, navegando por los fiordos y sobreviviendo en un entorno hostil.

A partir de la **segunda mitad del siglo XIX**, se inició la colonización europea, con la llegada de colonos europeos (principalmente alemanes) que buscaban aprovechar los recursos naturales de la región, especialmente la madera y la ganadería ovina. Las estancias ganaderas comenzaron a poblar los valles, mientras que los navegantes exploraban los canales y fiordos. Las comunidades estaban separadas por ríos, lagos y montañas, y el único acceso posible era por vía marítima o aérea. Fue así como surgió la necesidad de una carretera que uniera el corazón de la Patagonia con el resto de Chile.

Su creación se impulsó durante la dictadura militar de **Augusto Pinochet**, bajo la dirección del **Cuerpo Militar del Trabajo (CMT)**, una división del ejército chileno. La obra comenzó en **1976** y se extendió por más de dos décadas. Fue un verdadero desafío de ingeniería, ya que la construcción tuvo que enfrentar terrenos escarpados, densos bosques, ríos de gran caudal y condiciones climáticas extremas, con lluvias constantes, nevadas y terrenos inestables. No había maquinaria moderna ni tecnología avanzada para abrir caminos; gran parte del trabajo se realizó de forma manual, con explosivos.

> La vía conecta la localidad de **Puerto Montt**, en la región de Los Lagos, con la localidad de **Villa O’Higgins**, en la región de Aysén. Su extensión total supera los **1,240 kilómetros**, y su recorrido atraviesa paisajes de ensueño, que incluyen fiordos, lagos, glaciares, bosques y montañas.

A lo largo de los años, la Carretera Austral ha sido constantemente ampliada, modernizada y reparada. En la actualidad, algunos tramos son de ripio y otros están asfaltados, pero la esencia aventurera de esta ruta se mantiene intacta.

### Chaitén
El volcán Chaitén hizo erupción en 2008, destruyendo gran parte del pueblo, pero la comunidad se levantó y reconstruyó el lugar. Hoy se ha convertido en un símbolo de resistencia. Se pueden realizar caminatas hacia el cráter del volcán para observar el impacto de la erupción.

### Puyuhuapi: Termas y relajación patagónica
Fundada por colonos alemanes, Puyuhuapi se ha convertido en un refugio de tranquilidad. Aquí, los visitantes pueden disfrutar de las termas naturales ubicadas a orillas del mar. Las aguas termales ofrecen la combinación perfecta de naturaleza y bienestar.

### Catedrales de mármol: La Joya del Lago General Carrera
Ubicadas en el Lago General Carrera, las Catedrales de Mármol son formaciones de roca calcárea esculpidas por la erosión del agua. Este fenómeno natural ha creado una serie de cuevas y pasadizos con tonos turquesas, blancos y azules. Navegar en kayak o en bote entre estas formaciones es una experiencia mágica.

### Glaciar San Rafael: La inmensidad del hielo milenario
El glaciar San Rafael es una de las maravillas naturales más impactantes de la Carretera Austral. Se accede a través de un recorrido en barco desde Puerto Chacabuco, donde podrás observar el imponente campo de hielo y los desprendimientos de hielo que caen a la laguna.

### Ventisquero colgante: Un glaciar diferente
A diferencia de los glaciares blancos y azulados, el Ventisquero Colgante se distingue por sus tonos oscuros debido a la mezcla de sedimentos y tierra. Este glaciar se encuentra en el Parque Nacional Queulat, y para llegar a él, se debe hacer una caminata por un sendero rodeado de frondosa vegetación.

### Chile Chico: La Ciudad del Sol de la Patagonia
Conocida como la «Ciudad del Sol», Chile Chico tiene un microclima más cálido en comparación con el resto de la Patagonia. Desde aquí se puede acceder a la Reserva Nacional Jeinimeni, que cuenta con paisajes desérticos, formaciones rocosas y la icónica Cueva de las Manos, famosa por sus pinturas rupestres prehistóricas.

### Trekking de Cerro Castillo: La joya del senderismo patagónico
El trekking del Parque Nacional de Cerro Castillo se ha ganado la fama de ser una de las rutas de trekking más desafiantes y espectaculares de la Patagonia. Su imponente forma de castillo de piedra se alza entre glaciares y lagunas turquesas.

### Caleta Tortel: La Ciudad de Pasarelas
Caleta Tortel es única en el mundo por su sistema de pasarelas de madera que conectan cada rincón del pueblo. No hay calles ni autos, solo senderos elevados de madera que permiten recorrer esta pintoresca localidad enclavada entre fiordos y bosques.

> La Carretera Austral es mucho más que una carretera; es un testimonio de la historia, la naturaleza y la perseverancia humana. Conectando algunos de los paisajes más remotos y asombrosos de la Patagonia, esta ruta es un viaje que todo amante de la aventura debe realizar al menos una vez en la vida. ¿Te animas a recorrer la Carretera Austral en coche o en bicicleta? Empaca tu mochila, prepárate para la aventura y descubre por qué esta ruta es uno de los tesoros más valiosos de Chile.`,
        imageAlt: 'Catedrales de Marmol en el Lago General Carrera, Chile',
        metaTitle: 'Viaje a la Carretera Austral de Chile — Guía completa | Viajes Vidaia',
        metaDescription: 'Descubre la Carretera Austral en Chile: Caleta Tortel, Catedrales de Marmol, Trekking de Cerro Castillo, Glaciar San Rafael, Ventisquero Colgante en Queulat, Puyuhapi, Coyahique y Chaiten. Consejos prácticos y todo lo necesario para organizar tu viaje.',
      }
    },
    imageKey: 'BLOG.CARRETERA_AUSTRAL',
    date: '2024-12-12',
    category: 'chile',
    tags: ['carretera-austral', 'chile', 'catedrales-de-marmol', 'glaciar-san-rafael', 'trekking-cerro-castillo'],
    readingTime: 7,
    featured: true,
    active: true,
    relatedTripSlugs: ['latitudes-australes'],
  },
  {
    slug: 'patagonia-argentina-w-circuit',
    content: {
      es: {
        title: 'W Circuit en Torres del Paine: todo lo que necesitas saber',
        excerpt: 'Uno de los trekkings más míticos del planeta. Campamentos, refugios, el Glaciar Grey y esas torres que emergen entre nubes. Paso a paso.',
        content: ``,
        imageAlt: 'Torres del Paine, Patagonia',
        metaTitle: 'Circuito W Torres del Paine: guía paso a paso — Viajes Vidaia',
        metaDescription: 'Cómo hacer el Circuito W en Torres del Paine: campamentos, refugios, cuánto cuesta, cuándo ir y cómo reservar. La guía más completa en español.',
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
        excerpt: 'Palermo, San Telmo, La Boca, Recoleta… Buenos Aires no se entiende sin sus barrios. Aquí va el mapa mental que necesitas antes de aterrizar.',
        content: ``,
        imageAlt: 'Buenos Aires, Argentina',
        metaTitle: 'Buenos Aires por primera vez: guía de barrios — Viajes Vidaia',
        metaDescription: 'De Palermo a San Telmo: cómo orientarte en Buenos Aires, qué ver en cada barrio, dónde comer y los errores que no debes cometer en tu primera visita.',
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
        excerpt: 'Pocos escenarios en el mundo combinan tanta grandeza con tanta intimidad. Te contamos cómo organizar una luna de miel que jamás olvidaréis.',
        content: ``,
        imageAlt: 'Patagonia al atardecer',
        metaTitle: 'Luna de miel en Patagonia: guía romántica — Viajes Vidaia',
        metaDescription: 'Glaciares, lagos y silencio. Todo lo que necesitas para planificar una luna de miel inolvidable en la Patagonia argentina y chilena.',
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
        excerpt: 'Argentina es el país de los contrastes climáticos. Lo que es perfecto en Bariloche puede ser un infierno en Buenos Aires. Aquí te lo aclaramos todo.',
        content: ``,
        imageAlt: 'Patagonia argentina en otoño',
        metaTitle: 'Cuándo viajar a Argentina: guía mes a mes — Viajes Vidaia',
        metaDescription: 'La mejor época para viajar a cada región de Argentina: Patagonia, Buenos Aires, Iguazú, Mendoza y el norte. Clima, temporadas y cuándo reservar.',
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
