export interface ActivityContent {
  name: string
  description: string
}

export interface Activity {
  id: string
  destinationId: string
  content: {
    es: ActivityContent
    en?: ActivityContent
  }
  duration?: string
  priceFrom?: number     // reference price when booked as optional add-on
  imageKey?: string
  /** Lucide icon name used in activity cards (e.g. 'Waves', 'Music'). */
  icon?: string
  active: boolean
}

const activities: Activity[] = [
  {
    id: 'circuito-chico-bariloche',
    destinationId: 'bariloche',
    content: {
      es: {
        name: 'Circuito Chico',
        description: 'El recorrido clásico de Bariloche bordea el lago Nahuel Huapi por la avenida Bustillo hasta la península de Llao Llao. Por el camino, parada opcional en el Cerro Campanario, vistas al lago Moreno y los bosques que rodean la ciudad. La mejor introducción al paisaje de la Patagonia andina en medio día.',
      }
    },
    duration: 'Medio día (4 horas).',
    imageKey: 'ACTIVITIES.CIRCUITO_CHICO',
    icon: 'Binoculars',
    active: true,
  },
  {
    id: 'cerro-campanario-bariloche',
    destinationId: 'bariloche',
    content: {
      es: {
        name: 'Ascenso al Cerro Campanario',
        description: 'En siete minutos de aerosilla se alcanza la cima del Campanario, a 1.050 metros, con vistas sobre los lagos Nahuel Huapi y Perito Moreno, la Isla Victoria y los cerros que rodean Bariloche. Una parada breve que vale por sí sola o como extensión del Circuito Chico.',
      }
    },
    imageKey: 'ACTIVITIES.CERRO_CAMPANARIO',
    icon: 'CableCar',
    active: true,
  },
  {
    id: 'ruta-siete-lagos-san-martin',
    destinationId: 'bariloche',
    content: {
      es: {
        name: 'San Martín de los Andes por Ruta de los Siete Lagos',
        description: 'Jornada completa desde Bariloche hasta San Martín de los Andes por la Ruta Nacional 40 y la mítica Ruta de los Siete Lagos, bordeando los lagos Espejo, Correntoso, Falkner y Lácar entre los Parques Nacionales Nahuel Huapi y Lanín. Dos horas libres en San Martín para almorzar y recorrer la costanera. El regreso al atardecer, por el mismo camino, tiene su propia recompensa.',
      }
    },
    duration: '10 horas',
    imageKey: 'ACTIVITIES.SIETE_LAGOS',
    icon: 'Waves',
    active: true,
  },
  {
    id: 'city-tour-buenos-aires',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'City Tour · Buenos Aires · Medio día.',
        description: 'Recorrido por los barrios y monumentos que definen Buenos Aires: el Obelisco y la Avenida 9 de Julio, la Plaza de Mayo, San Telmo, La Boca y el Caminito, Palermo, Recoleta y Puerto Madero. La mejor introducción a la ciudad en tres horas y media, con guía y recogida en hotel incluidos.',
      }
    },
    duration: '3,5-4 horas · Tour AM · PM',
    imageKey: 'ACTIVITIES.CITY_TOUR_BBAA',
    icon: 'Building2',
    active: true,
  },
  {
    id: 'city-tour-premium-buenos-aires',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'City Tour Premium · Buenos Aires · Medio día.',
        description: 'La versión completa del city tour, con paradas más largas y visitas al Cementerio de la Recoleta, el Teatro Colón, la Catedral Metropolitana y el estadio de Boca Juniors. Incluye la foto con Mafalda en San Telmo y termina en Puerto Madero. Para quien quiere conocer Buenos Aires a fondo en medio día.',
      }
    },
    duration: '4 horas · Tour AM · PM',
    imageKey: 'ACTIVITIES.CITY_TOUR_PREMIUM_BBAA',
    icon: 'Building2',
    active: true,
  },
  {
    id: 'delta-premium-buenos-aires',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'Delta Premium',
        description: 'Desde Buenos Aires hasta el Delta del Paraná en cinco horas. El recorrido navega el Río de la Plata bordeando San Isidro y el estadio de River, se adentra en los ríos del Delta entre casas isleñas y naturaleza, y termina en Tigre con tiempo para el Paseo Victorica y el Puerto de Frutos. Regreso en bus a la ciudad.',
      }
    },
    duration: '5 horas',
    imageKey: 'ACTIVITIES.DELTA_PREMIUM',
    icon: 'Waves',
    active: true,
  },
  {
    id: 'fiesta-gaucha-estancia-susana',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'Fiesta Gaucha Estancia Susana',
        description: 'A 80 kilómetros de Buenos Aires, la Estancia Santa Susana ofrece una jornada de campo con asado argentino, folclore, tango y demostraciones de destreza gaucha — tropillas, sortijas y carreras. El casco histórico reconvertido en museo da contexto a una experiencia que combina gastronomía, cultura rural y entretenimiento.',
      }
    },
    duration: '8 horas',
    imageKey: 'ACTIVITIES.FIESTA_GAUCHA_ESTANCIA_SUSANA',
    icon: 'UtensilsCrossed',
    active: true,
  },
  {
    id: 'tango-show-la-ventana',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'Espectáculo de Tango con cena en La Ventana',
        description: 'En un conventillo restaurado de San Telmo, La Ventana lleva desde 1982 ofreciendo una noche de tango y folclore con 32 artistas en escena. La cena incluye parrilla al carbón y vinos argentinos; el show arranca a las 21:30. Una velada clásica y bien producida para quienes quieren vivir el tango en su barrio natural.',
      }
    },
    duration: 'Cena 20:00-21:30 hs · Show 21:30-23:30 hs',
    imageKey: 'ACTIVITIES.LA_VENTANA',
    icon: 'Music',
    active: true,
  },
  {
    id: 'bodegas-quebrada-conchas-cafayate',
    destinationId: 'cafayate',
    content: {
      es: {
        name: 'Bodegas de Cafayate y Quebrada de las Conchas',
        description: 'Jornada completa que combina lo mejor de Cafayate antes de continuar a Salta. La mañana es para el vino: visita a dos bodegas tradicionales del Valle Calchaquí con recorrido por sus instalaciones, proceso de vinificación y degustación, más una parada en el Museo de la Vid y el Vino. Por la tarde, la Quebrada de las Conchas: un cañón de roca rojiza donde el agua y el viento han tallado formaciones como la Garganta del Diablo, el Anfiteatro, el Sapo y los Castillos. El día termina con traslado a Salta al atardecer, con el paisaje de la quebrada como despedida.',
      }
    },
    duration: 'Día completo',
    imageKey: 'ACTIVITIES.QUEBRADA_CONCHAS_CAFAYATE',
    icon: 'Wine',
    active: true,
  },
  {
    id: 'estancia-cristina-upsala-calafate',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'Estancia Cristina — Mirador Glaciar Upsala',
        description: 'a versión más completa de la Estancia Cristina añade al recorrido clásico un ascenso en 4x4 por 9,5 kilómetros de pista hasta el Mirador del Glaciar Upsala, seguido de una caminata de 20 minutos hasta el punto de observación. Desde allí, vistas panorámicas sobre uno de los glaciares más grandes del Parque Nacional Los Glaciares. Almuerzo en el quincho al regreso. Una jornada de trece horas que combina navegación, aventura y paisaje en su versión más completa.',
      }
    },
    duration: 'Día completo',
    imageKey: 'ACTIVITIES.ESTANCIA_CRISTINA_UPSALA',
    icon: 'Waves',
    active: true,
  },
  {
    id: 'estancia-cristina-classic-calafate',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'Estancia Cristina Classic',
        description: 'Navegación desde Puerto Punta Bandera hasta el extremo del Brazo Cristina del Lago Argentino, donde la Estancia Cristina lleva funcionando desde 1914. En la estancia, tarde tranquila con visita al museo costumbrista, caminata por el casco histórico y almuerzo en el quincho. El recorrido de ida entre témpanos e icebergs es parte esencial de la experiencia. Para quienes buscan historia pionera, paisaje remoto y un ritmo pausado lejos del turismo masivo.',
      }
    },
    duration: 'Día completo',
    imageKey: 'ACTIVITIES.ESTANCIA_CRISTINA_CLASSIC',
    icon: 'TreePine',
    active: true,
  },
  {
    id: 'estancia-nibepo-aike',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'Estancia Nibepo Aike — Día de campo patagónico',
        description: 'A orillas del Brazo Sur del Lago Argentino, la Estancia Nibepo Aike conserva la vida de las antiguas estancias patagónicas dedicadas al ganado bovino y ovino. La jornada incluye ordeñe, arreo de ovejas, demostración de esquila y almuerzo de cordero al asador. Sin grandes espectáculos, solo el ritmo pausado de una estancia activa con más de un siglo de historia.',
      }
    },
    duration: '8 horas · 08:30-16:30 hs',
    imageKey: 'ACTIVITIES.ESTANCIA_NIBEPO_AIKE',
    icon: 'UtensilsCrossed',
    active: true,
  },
  {
    id: 'glaciar-perito-moreno',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'Glaciar Perito Moreno: Excursión Completa',
        description: 'Excursión Completa Desde El Calafate, 80 kilómetros por la estepa patagónica hasta el Parque Nacional Los Glaciares. El recorrido por las pasarelas permite ver el glaciar desde distintos ángulos y a distintas distancias, con tiempo libre para encontrar el propio ritmo. Uno de los pocos glaciares del mundo en avance activo, con desprendimientos diarios que se escuchan antes de verse. Incluye traslados y guía bilingüe.',
      }
    },
    duration: 'Día completo, 8 horas',
    imageKey: 'ACTIVITIES.GLACIAR_PERITO_MORENO',
    icon: 'Snowflake',
    active: true,
  },
  {
    id: 'kayak-atardecer-lago-argentino',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'Kayak al Atardecer en Lago Argentino',
        description: 'Salida desde Prefectura Naval al atardecer para recorrer la bahía en kayak doble con vistas al lago y la cordillera. Por el camino, flamencos, cisnes de cuello negro y gallaretas. Una hora y cuarto en el agua, con equipo técnico completo incluido. La actividad más tranquila y accesible de las que ofrece El Calafate para quienes quieren estar en el lago sin una jornada de día completo.',
      }
    },
    duration: '1.15 horas kayak',
    imageKey: 'ACTIVITIES.KAYAK_ATARDECER_LAGO_ARGENTINO',
    icon: 'Waves',
    active: true,
  },
  {
    id: 'kayak-trekking-rio-la-leona',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'Kayak y Trekking en Río La Leona',
        description: 'Jornada completa remando 14 kilómetros por el Río La Leona, con sus aguas turquesa de origen glaciar en contraste con los ocres de la estepa. El mismo río que fascinó a Darwin, Moreno y Moyano en sus expediciones. Máximo 10 pasajeros, equipo técnico completo y snack incluidos. Apto para principiantes en buen estado físico.',
      }
    },
    duration: 'Día completo',
    imageKey: 'ACTIVITIES.KAYAK_TREKKING_RIO_LA_LEONA',
    icon: 'Waves',
    active: true,
  },
  {
    id: 'perito-moreno-mintrekking',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'Minitrekking',
        description: 'Navegación de 20 minutos hasta el refugio, caminata hasta el borde del glaciar y dos horas sobre el hielo con crampones. El recorrido atraviesa grietas, sumideros y pequeñas lagunas de un azul muy intenso. Apto para mayores de 8 años en buena forma física. Incluye crampones y guía especializado; los traslados se contratan aparte con la excursión al Perito Moreno.',
      }
    },
    duration: '3 horas',
    imageKey: 'ACTIVITIES.MINITREKKING_PERITO_MORENO',
    icon: 'MountainSnow',
    active: true,
  },
  {
    id: 'perito-moreno-safari',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'Safari Náutico',
        description: 'Una hora de navegación por el Lago Rico bordeando la pared sur del Perito Moreno, a 200 metros del frente del glaciar. Desde el agua se aprecia la escala real del hielo — 60 metros sobre el lago, más de 100 por debajo — y los desprendimientos que desde las pasarelas no se ven. Complemento natural a la visita al glaciar.',
      }
    },
    duration: '1 hora',
    imageKey: 'ACTIVITIES.SAFARI_NAUTICO_GLACIAR',
    icon: 'Waves',
    active: true,
  },
  {
    id: 'todo-glaciares',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'Todo Glaciares: Traslados y Navegación',
        description: 'Jornada de diez horas navegando el Brazo Norte del Lago Argentino. El recorrido pasa entre los témpanos del Canal Upsala y llega al Glaciar Spegazzini, el más alto del Parque Nacional, con paredes de más de 135 metros. Incluye desembarco en la Base Spegazzini, con sendero por el bosque y refugio con vistas al lago. Una perspectiva distinta y más remota de los glaciares del sur.',
      }
    },
    duration: 'Día completo, 10 horas',
    imageKey: 'ACTIVITIES.TODO_GLACIARES',
    icon: 'Waves',
    active: true,
  },
  {
    id: 'trekking-cerro-torre',
    destinationId: 'el-chalten',
    content: {
      es: {
        name: 'Trekking Cerro Torre',
        description: 'Embárcate en uno de los trekkings más legendarios de la Patagonia para contemplar el indómito Cerro Torre. Con un relieve más suave que otras rutas, el sendero serpentea junto al Río Fitz Roy, ofreciendo paradas mágicas en la Cascada Margarita y miradores panorámicos. Al llegar a la Laguna Torre, serás testigo de un paisaje sobrecogedor: icebergs flotando frente a los glaciares y las agujas verticales más desafiantes del mundo. Una travesía de 18 km que conecta la paz del bosque con la escala monumental de la alta montaña.',
      }
    },
    duration: 'Día completo, 9 horas',
    imageKey: 'ACTIVITIES.TREKKING_CERRO_TORRE',
    icon: 'Mountain',
    active: true,
  },
  {
    id: 'trekking-laguna-capri',
    destinationId: 'el-chalten',
    content: {
      es: {
        name: 'Trekking Laguna Capri',
        description: 'Cuatro horas y media desde el pueblo hasta la Laguna Capri, con vistas al Fitz Roy y sus agujas satélites desde el primer mirador. Ocho kilómetros de subida constante y regreso por el mismo camino. La opción más accesible para quien quiere ver el macizo de cerca sin afrontar una jornada completa. Incluye guía de montaña.',
      }
    },
    duration: '3,5 horas',
    imageKey: 'ACTIVITIES.TREKKING_LAGUNA_CAPRI',
    icon: 'Mountain',
    active: true,
  },
  {
    id: 'trekking-laguna-de-los-tres',
    destinationId: 'el-chalten',
    content: {
      es: {
        name: 'Trekking Laguna de los Tres',
        description: 'El trekking más exigente y más recompensado de El Chaltén. Desde el Río Eléctrico, 23 kilómetros por valles, bosque nativo y el mirador del Glaciar Piedras Blancas hasta la subida final, rocosa y empinada, a la Laguna de los Tres. Arriba, el Fitz Roy a pocos metros y el lago a sus pies. El descenso pasa por la Laguna Capri. Jornada de nueve horas con guía de montaña y traslado al inicio del sendero incluidos.',
      }
    },
    duration: 'Día completo, 9 horas',
    imageKey: 'ACTIVITIES.TREKKING_LAGUNA_TRES',
    icon: 'Mountain',
    active: true,
  },
  {
    id: 'trekking-mirador-cerro-torre',
    destinationId: 'el-chalten',
    content: {
      es: {
        name: 'Trekking Mirador Cerro Torre',
        description: 'La versión corta del valle del Cerro Torre: seis kilómetros desde el pueblo hasta el Mirador, con la Cascada Margarita como parada a los veinte minutos. En hora y media de caminata se alcanzan vistas panorámicas del Cerro Torre y sus agujas. Ida y vuelta por el mismo sendero. La opción más accesible para una primera aproximación al valle. Incluye guía de montaña.',
      }
    },
    duration: '3,5 horas',
    imageKey: 'ACTIVITIES.TREKKING_MIRADOR_TORRE',
    icon: 'Mountain',
    active: true,
  },
  {
    id: 'kayak-lago-del-desierto',
    destinationId: 'el-chalten',
    content: {
      es: {
        name: 'Kayak en el Lago del Desierto',
        description: 'Kayak en el Lago del Desierto, rodeado de bosque nativo y con vistas a los glaciares Huemul y Vespignani. Una jornada completa en kayaks dobles estables, sin experiencia previa necesaria, con guía bilingüe y equipo completo incluido. Salida desde El Chaltén a las 10:00 hs.',
      }
    },
    duration: '8 horas - 1,5 horas en kayal',
    imageKey: 'ACTIVITIES.KAYAK_LAGO_DESIERTO',
    icon: 'Waves',
    active: true,
  },
  {
    id: 'cataratas-argentinas',
    destinationId: 'iguazu',
    content: {
      es: {
        name: 'Cataratas Argentinas',
        description: 'Jornada completa en el Parque Nacional Iguazú recorriendo los tres paseos clásicos: el Paseo Inferior, con vistas frontales y desde abajo de los saltos; el Paseo Superior, sobre la línea de caída; y la Garganta del Diablo, accesible en tren ecológico hasta los balcones frente a la caída principal. Ocho horas con tiempo para recorrer a ritmo propio, con guía bilingüe y traslados incluidos.',
      }
    },
    duration: '8 horas · 07:20-16:00 hs',
    imageKey: 'ACTIVTIIES.CATARATAS_ARGENTINAS',
    icon: 'Waves',
    active: true,
  },
  {
    id: 'cataratas-brasilenas',
    destinationId: 'iguazu',
    content: {
      es: {
        name: 'Cataratas Brasileñas',
        description: 'Extensión de la visita a las cataratas argentinas que combina una caminata guiada por el Sendero Yacaratiá con una navegación en lancha rápida por el cañón del Río Iguazú hasta los Saltos Tres Mosqueteros y San Martín. Se termina mojado. Edad mínima 12 años; hay restricciones de salud que conviene consultar antes de reservar.',
      }
    },
    duration: '3 horas',
    imageKey: 'ACTIVITIES.CATARATAS_BRASILEÑAS',
    icon: 'Waves',
    active: true,
  },
  {
    id: 'gran-aventura-iguazu',
    destinationId: 'iguazu',
    content: {
      es: {
        name: 'Gran Aventura',
        description: 'Tres horas en el lado argentino del Parque, con acceso en autobús panorámico hasta 1.200 metros de pasarelas con vistas frontales al conjunto de los saltos. La perspectiva más amplia de las cataratas, ideal para complementar la visita argentina.',
      }
    },
    duration: '2,5 horas',
    imageKey: 'ACTIVITIES.GRAN_AVENTURA_IGUAZU',
    icon: 'Waves',
    active: true,
  },
  {
    id: 'peninsula-valdes-ballenas',
    destinationId: 'puerto-madryn',
    content: {
      es: {
        name: 'Excursión Península de Valdés y avistaje de ballena franca austral',
        description: 'Jornada completa desde Puerto Madryn recorriendo la Península Valdés: el Istmo Carlos Ameghino con vistas a los dos golfos, Puerto Pirámides, el faro de Punta Delgada y Caleta Valdés, donde los elefantes marinos ocupan la costa entre diciembre y marzo. En temporada de ballenas — julio a principios de diciembre — se añade una navegación en catamarán desde Puerto Pirámides: motor apagado, ballenas francas australes que se acercan por curiosidad y, si hay suerte, saltos completos. La Isla de los Pájaros, con telescopio, cierra el recorrido de vuelta. Incluye traslados y guía bilingüe; entradas a la reserva no incluidas.',
      }
    },
    duration: '10 horas · Salida 07:30 hs',
    imageKey: 'ACTIVITIES.PENINSULA_VALDES_BALLENAS',
    icon: 'Fish',
    active: true,
  },
  {
    id: 'pinguinera-punta-tombo',
    destinationId: 'puerto-madryn',
    content: {
      es: {
        name: 'Excursión Pingüinera Punta Tombo',
        description: 'A 180 kilómetros al sur de Puerto Madryn, Punta Tombo alberga la colonia continental de pingüinos de Magallanes más grande del mundo. La reserva está activa desde mediados de septiembre hasta abril, con distintos ciclos según la época: preparación del nido, apareamiento, nacimiento de los pichones y crecimiento de las crías. El horario de llegada, pasada la media mañana, permite recorrer la reserva con más tranquilidad que los grupos madrugadores. Incluye traslados y guía bilingüe; entradas no incluidas.',
      }
    },
    duration: '10 horas · Salida 07:30 hs',
    imageKey: 'ACTIVITIES.PUNTA_TOMBO',
    icon: 'Fish',
    active: true,
  },
  {
    id: 'quebrada-humahuaca',
    destinationId: 'purmamarca',
    content: {
      es: {
        name: 'Quebrada de Humahuaca: Patrimonio de la Humanidad',
        description: 'Jornada completa desde Purmamarca recorriendo la Quebrada declarada Patrimonio de la Humanidad. El recorrido sube por Tilcara, Huacalera, el Trópico de Capricornio y Uquía — con su iglesia y los famosos Ángeles Arcabuceros — hasta Humahuaca y su Monumento a la Independencia. El regreso pasa por Maimara con la Paleta del Pintor como despedida. El Pucará de Tilcara puede visitarse por libre con entrada aparte. Incluye guía en español.',
      }
    },
    duration: 'Día completo',
    imageKey: 'ACTIVITIES.QUEBRADA_HUMAHUACA',
    icon: 'Mountain',
    active: true,
  },
  {
    id: 'cafayate-excursion-salta',
    destinationId: 'salta',
    content: {
      es: {
        name: 'Excursión a Cafayate: Bodegas y Quebrada de las Conchas',
        description: 'Doce horas desde Salta hasta Cafayate por la Quebrada del Río Las Conchas, con sus formaciones de roca erosionada — el Sapo, el Anfiteatro, la Garganta del Diablo, los Castillos — y visita a una bodega con degustación de Torrontés. El regreso por la misma ruta al atardecer cambia completamente el paisaje de la quebrada. Incluye guía y transporte; comidas y entradas a museos aparte.',
      }
    },
    duration: 'Día completo',
    imageKey: 'ACTIVITIES.CAFAYATE_EXCURSION_SALTA',
    icon: 'Wine',
    active: true,
  },
  {
    id: 'city-tour-salta',
    destinationId: 'salta',
    content: {
      es: {
        name: 'City Tour Salta: La Linda',
        description: 'Recorrido de tarde por el centro histórico de Salta: la Catedral Basílica, el Cabildo, la Basílica de San Francisco, el Convento San Bernardo y el ascenso al Cerro San Bernardo con vistas panorámicas sobre la ciudad. Cierra en San Lorenzo y el Mercado Artesanal, con artesanías certificadas de toda la provincia. Incluye guía bilingüe y traslados.',
      }
    },
    duration: 'Medio día',
    imageKey: 'ACTIVITIES.CITY_TOUR_SALTA',
    icon: 'Building2',
    active: true,
  },
  {
    id: 'salinas-grandes-purmamarca',
    destinationId: 'salta',
    content: {
      es: {
        name: 'Vuelta a la Alturas: Salinas Grandes y Purmamarca',
        description: 'Jornada de doce horas desde Salta siguiendo el trazado del Tren de las Nubes por la Quebrada del Toro, con parada en la ciudad preincaica de Santa Rosa de Tastil. El recorrido asciende hasta las Salinas Grandes a 4.170 metros, en el límite entre Salta y Jujuy, y desciende por la Cuesta de Lipán hasta Purmamarca y su Cerro de los Siete Colores. Noche en Purmamarca. Incluye traslados, guía y entrada a las Salinas.',
      }
    },
    duration: '12 horas',
    imageKey: 'ACTIVITIES.SALINAS_GRANDES_PURMAMARCA',
    icon: 'Mountain',
    active: true,
  },
  {
    id: 'ruta-escenica-tafi-quilmes',
    destinationId: 'tucuman',
    content: {
      es: {
        name: 'Ruta escénica Tafí del Valle, Amaicha y Ruinas de Quilmes',
        description: 'Jornada completa desde Tucumán por los Valles Calchaquíes: subida por la Quebrada del río Los Sosa con parada en los Menhires de El Mollar, el pueblo de Tafí del Valle y el ascenso en zigzag hasta el Abra del Infiernillo a 3.042 metros. Bajada hacia Amaicha del Valle y las Ruinas de Quilmes, el último bastión de resistencia aborigen ante el avance español, con su zona residencial y fortaleza en la cima del cerro. El recorrido termina en Cafayate con visita a una bodega y degustación. Incluye traslados, entradas y guía.',
      }
    },
    duration: 'Día completo',
    imageKey: 'ACTIVITIES.RUTA_ESCENICA_TAFI_QUILMES',
    icon: 'Mountain',
    active: true,
  },
  {
    id: 'aventura-almanza',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Aventura Almanza',
        description: 'A 70 kilómetros al este de Ushuaia, Puerto Almanza es el pueblo pesquero más austral del país. La jornada combina una navegación en embarcación pequeña hasta la Isla Martillo para ver las colonias de pingüinos magallánicos y papúa, y un almuerzo de tres pasos en casa de una familia pescadora local con centolla y frutos de mar del Canal Beagle. El tamaño de la embarcación permite un acercamiento más tranquilo a la fauna que los catamaranes grandes. Incluye traslados, navegación y almuerzo con copa de vino.',
      }
    },
    duration: '8 horas',
    imageKey: 'ACTIVITIES.AVENTURA_ALMANZA_PINGUINERA',
    icon: 'Fish',
    active: true,
  },
  {
    id: 'navegacion-canal-beagle',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Isla de Lobos en catamarán por Canal Beagle',
        description: 'Tres horas de navegación desde el muelle de Ushuaia por el Canal Beagle: la Isla de los Pájaros con su avifauna fueguina, la Isla de los Lobos con colonias de lobos marinos de uno y dos pelos, y el Faro Les Eclaireurs con la historia del hundimiento del SS Monte Cervantes en 1930. Ida y vuelta con vistas al cordón montañoso que rodea la ciudad. Incluye traslados, guía bilingüe y cafetería a bordo.',
      }
    },
    duration: '3 horas · AM · PM',
    imageKey: 'ACTIVITIES.NAVEGACION_ISLA_LOBOS_USHUAIA',
    icon: 'Fish',
    active: true,
  },
  {
    id: 'navegacion-canal-beagle-pingüinera',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Navegación Canal de Beagle - Pingüinera',
        description: 'Versión completa de la navegación por el Canal Beagle, que después del Faro Les Eclaireurs continúa hacia el este hasta la Isla Martillo, donde conviven pingüinos magallánicos y papúa. El regreso bordea la costa argentina con vistas a Puerto Almanza, las estancias históricas y el casco semihundido del vapor Monte Sarmiento. Seis horas en total, con traslados incluidos.',
      }
    },
    duration: '6 horas · AM · PM',
    imageKey: 'ACTIVITIES.NAVEGACION_ISLA_MARTILLO_USHUAIA',
    icon: 'Fish',
    active: true,
  },
  {
    id: 'nieve-fuego-raquetas-trineos',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Nieve y Fuego: Raquetas de Nieve y Trineos con Huskies',
        description: 'A 21 kilómetros de Ushuaia, en el valle de Tierra Mayor, una noche de invierno combinando dos actividades: caminata con raquetas de nieve por el bosque subantártico de lengas y ñires, y trineos tirados por perros huskies por los caminos nevados del valle. Entre medias, cena con guisado, vino caliente y guitarreada en el domo. La temporada es julio a septiembre. Incluye traslados, raquetas, trineos y cena con bebidas.',
      }
    },
    duration: 'Tarde-noche',
    imageKey: 'ACTIVITIES.NIEVE_FUEGO_RAQUETAS_TRINEOS',
    icon: 'Snowflake',
    active: true,
  },
  {
    id: 'parque-nacional-tierra-fuego',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Parque Nacional Tierra del Fuego',
        description: 'A 12 kilómetros de Ushuaia, el Parque Nacional Tierra del Fuego combina bosque subantártico, lagos glaciares y costa en un mismo recorrido. El itinerario incluye la Bahía Ensenada, el Lago Acigami compartido con Chile, la Bahía Lapataia y el cartel que marca el final de la ruta Panamericana, a 15.000 kilómetros de Alaska. La última estafeta postal de América, cuando está abierta, permite enviar postales desde el fin del mundo. Incluye traslados, entradas y guía bilingüe.',
      }
    },
    duration: '5 horas · Salida 08:00 hs',
    imageKey: 'ACTIVITIES.PARQUE_TIERRA_FUEGO',
    icon: 'Mountain',
    active: true,
  },
  {
    id: 'parque-nacional-trekking-canoas',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Parque Nacional con trekking y canoas',
        description: 'Ocho horas en el Parque Nacional Tierra del Fuego combinando caminata por senderos del bosque y navegación en canoas australianas por ríos y la Bahía Lapataia. Los guías especializados acompañan ambas actividades; entre medias, almuerzo completo con bebidas junto al grupo. Una forma de recorrer el parque alejada del circuito habitual, donde la naturaleza lleva el ritmo. Incluye traslados, equipo de canotaje y almuerzo.',
      }
    },
    duration: '8 horas',
    imageKey: 'ACTIVITIES.PARQUE_TREKKING_CANOAS',
    icon: 'Waves',
    active: true,
  },
  {
    id: 'puerto-almanza-centolla',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Pesca de la Centolla con almuerzo gourmet',
        description: 'Desde Puerto Almanza, navegación de 25 minutos hasta los invernaderos donde los pescadores locales levantan las redes con centolla fresca. Los pasajeros participan en la recolección antes de regresar al restaurante de los anfitriones para un almuerzo de tres pasos: dip del Beagle, centolla y postre. La actividad de recolección depende del clima, pero la excursión opera en cualquier caso. Solo adultos. Incluye traslados, navegación y almuerzo.',
      }
    },
    duration: 'Medio día',
    imageKey: 'ACTIVITIES.PUERTO_ALMANZA_CENTOLLA',
    icon: 'UtensilsCrossed',
    active: true,
  },
  {
    id: 'travesia-lagos-4x4-verano',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Travesía de los Lagos 4x4 - Verano',
        description: 'Jornada de ocho horas cruzando la Cordillera de los Andes por el Paso Garibaldi en vehículos 4x4, por caminos de barro y bosque hasta el Lago Fagnano. Desde allí, caminata hasta el Lago Escondido y almuerzo en un refugio con bebidas incluidas. El regreso por la misma ruta con el bosque fueguino cambiando de luz. Incluye traslados y almuerzo.',
      }
    },
    duration: '8 horas · AM · PM',
    imageKey: 'ACTIVITIES.TRAVESIA_LAGOS_FUEGUINOS',
    icon: 'Mountain',
    active: true,
  },
  {
    id: 'trekking-martial-by-sunset',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Trekking Glaciar Martial by Sunset',
        description: 'Desde el Glaciar Martial, a veinte minutos del centro de Ushuaia, una caminata de tarde-noche por senderos centenarios del bosque fueguino con vistas a la bahía mientras cae el sol. Al llegar al domo de montaña, vino caliente junto al fuego; después, cena en el refugio con guiso de montaña y vino. Una actividad tranquila que combina naturaleza y gastronomía en el entorno más cercano a la ciudad. Incluye transporte, guía, seguro y cena completa.',
      }
    },
    duration: '4,5 horas',
    imageKey: 'ACTIVITIES.GLACIAR_MARTIAL_TREKKING',
    icon: 'Mountain',
    active: true,
  },
  {
    id: 'tren-fin-del-mundo',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Tren del Fin del Mundo',
        description: 'Siete kilómetros por el trazado original que recorrían los presos del Presidio de Ushuaia para abastecer de leña a la ciudad. Hoy en vagones vidriados y calefaccionados, el recorrido atraviesa bosques centenarios, turberas y ríos con parada en la Cascada Macarena, hasta entrar en el Parque Nacional. Extensión opcional de la visita al parque.',
      }
    },
    imageKey: 'ACTIVITIES.TREN_FIN_DEL_MUNDO',
    icon: 'Mountain',
    active: true,
  },
  {
    id: 'city-tour-panoramico-santiago',
    destinationId: 'santiago-chile',
    content: {
      es: {
        name: 'City Tour Panorámico · Santiago de Chile',
        description: 'Cinco horas recorriendo el contraste entre el centro histórico y el Santiago moderno. La Moneda y la Alameda, la Plaza de Armas con la Catedral y el Correo Central, el Cerro Santa Lucía, el Barrio Lastarria y Bellavista al otro lado del Mapocho. El recorrido termina en Providencia, Las Condes y Vitacura, el eje moderno de la ciudad. Incluye traslados y guía trilingüe.',
      }
    },
    duration: '5 horas · Salida entre 8.30 y 9.00 am',
    imageKey: 'ACTIVITIES.CITY_TOUR_SANTIAGO',
    icon: 'Building2',
    active: true,
  },
  {
    id: 'bodega-santa-rita-tour-clasico',
    destinationId: 'santiago-chile',
    content: {
      es: {
        name: 'Bodega Santa Rita: Tour Clásico',
        description: 'En el Valle del Maipo, la Viña Santa Rita combina producción vitivinícola e historia chilena en un mismo recinto. El tour clásico recorre los viñedos, las bodegas de vinificación y la célebre Bodega de los 120 Patriotas, hoy Monumento Nacional. Degustación de tres vinos reserva al final, con tiempo libre para el Museo Andino. Salida desde el hotel a partir de las 14:00 hs. Incluye traslados y guía trilingüe.',
      }
    },
    duration: '4 horas · A partir de 14:00 am.',
    imageKey: 'ACTIVITIES.BODEGA_SANTA_RITA',
    icon: 'Wine',
    active: true,
  },
  {
    id: 'valle-casablanca-vinas-bodega-re-casas-bosque',
    destinationId: 'santiago-chile',
    content: {
      es: {
        name: 'Valle Casablanca - Viñas Bodega RE y Casas del Bosque',
        description: 'A menos de una hora de Santiago, el Valle de Casablanca produce algunos de los mejores vinos de clima frío de Chile. El recorrido visita dos bodegas con estilos muy distintos: Bodega RE, con producción en tinajas de arcilla y enfoque artesanal, y Casas del Bosque, especializada en varietales como Sauvignon Blanc, Pinot Noir y Chardonnay. Recorrido por viñedos y sala de barricas, degustación y almuerzo incluidos. Excursión privada.',
      }
    },
    duration: '9 horas · A partir de 8:30 am.',
    imageKey: 'ACTIVITIES.VALLE_CASABLANCA',
    icon: 'Wine',
    active: true,
  },
  {
    id: 'vina-del-mar-valparaiso',
    destinationId: 'santiago-chile',
    content: {
      es: {
        name: 'Viña del Mar y Valparaíso',
        description: 'Jornada completa desde Santiago cruzando el Valle de Casablanca hasta la costa. En Valparaíso, recorrido por los cerros Alegre y Concepción, subida en ascensor, vistas desde el Paseo Yugoslavo y visita a La Sebastiana, la casa-museo de Pablo Neruda. En Viña del Mar, el Casino, las avenidas costeras y la playa de Reñaca. Incluye traslados y guía trilingüe.',
      }
    },
    duration: '9 horas',
    imageKey: 'ACTIVITIES.VINA_VALPARAISO',
    icon: 'Landmark',
    active: true,
  },
  {
    id: 'city-tour-mendoza',
    destinationId: 'mendoza',
    content: {
      es: {
        name: 'City Tour Mendoza',
        description: 'Cuatro horas y media por la ciudad más arbolada de Argentina. El recorrido parte del Área Fundacional, el corazón de la ciudad vieja, y continúa por las plazas del centro cívico, donde se conserva la Bandera del Ejército de los Andes. El Parque General San Martín, con sus hectáreas de jardines y fuentes, precede a la parada final en el Cerro de la Gloria y su monumento a la campaña libertadora de San Martín. Incluye traslados y guía bilingüe.',
      }
    },
    duration: '4 horas 30 minutos · A partir de 8:30 am.',
    imageKey: 'ACTIVITIES.CITY_TOUR_MENDOZA',
    icon: 'Building2',
    active: true,
  },
  {
    id: 'rafting-los-arboles-mendoza',
    destinationId: 'mendoza',
    content: {
      es: {
        name: 'Rafting Los Árboles',
        description: 'Descenso en aguas blancas por el río Los Árboles, a las afueras de Mendoza. Seis horas desde el hotel, con todo el equipo incluido — traje de neopreno, casco, chaleco y remo — y guía profesional bilingüe durante toda la actividad. Dificultad media-alta; edad mínima 12 años. Llevar ropa de cambio y toalla.',
      }
    },
    duration: '6 horas · A partir de 9:00 am.',
    imageKey: 'ACTIVITIES.RAFTING_LOS_ARBOLES',
    icon: 'Waves',
    active: true,
  },
  {
    id: 'caminos-del-vino-valle-de-uco',
    destinationId: 'mendoza',
    content: {
      es: {
        name: 'Caminos del Vino - Zona Valle de Uco',
        description: 'Jornada completa en el Valle de Uco, el oasis vitivinícola de mayor altitud de Mendoza, con la Cordillera de los Andes como fondo permanente. Visita a tres bodegas de alta gama — entre las opciones: Andeluna, Domaine Bousquet, Masi, Monteviejo — con recorrido por instalaciones, explicación del proceso de elaboración y degustación. Almuerzo de pasos en el restaurante de una de las bodegas. Incluye traslados y guía especializado en vinos.',
      }
    },
    duration: '9 horas · A partir de 8:30 am.',
    imageKey: 'ACTIVITIES.VALLE_DE_UCO',
    icon: 'Wine',
    active: true,
  },
  {
    id: 'vinos-sabores-maipu',
    destinationId: 'mendoza',
    content: {
      es: {
        name: 'Vinos y Sabores de Maipu',
        description: 'El recorrido clásico de bodegas en Maipú, el valle histórico de la vitivinicultura mendocina. Visita a dos bodegas con degustación — entre las opciones: Trapiche, Santa Julia, La Rural, Trivento — con explicación del proceso de elaboración y las tradiciones familiares que las definen. Almuerzo de pasos para cerrar la jornada. Incluye traslados y guía en español con asistencia en inglés.',
      }
    },
    duration: '9 horas · A partir de 8:30 am.',
    imageKey: 'ACTIVITIES.VINO_SABORES_MAIPU',
    icon: 'Wine',
    active: true,
  },
  {
    id: 'degustacion-vinos-la-ventana-buenos-aires',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'Degustación de Vinos - La Ventana',
        description: 'Una hora con el sommelier de La Ventana probando tres varietales entre Malbec, Torrontés, Chardonnay y Cabernet de bodegas como Catena Zapata, Rutini y Escorihuela Gascón, con maridaje de quesos, jamón crudo, panes y bruschetta. Se puede tomar como antesala al espectáculo de tango en el mismo local. Sin traslados incluidos.',
      }
    },
    imageKey: 'ACTIVITIES.DEGUSTACION_VINOS_LA_VENTANA',
    icon: 'Wine',
    active: true,
  },
  {
    id: 'fogon-asado-experience',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'Fogon Asado Experience',
        description: 'En Palermo, una cena de degustación a la parrilla en formato íntimo donde los comensales observan las técnicas de cocción desde el bar antes de sentarse a la mesa. El menú recorre el asado argentino desde la provoleta y las achuras hasta el ojo de bife y los panqueques de dulce de leche, con cortes de primera y verduras de temporada. Capacidad reducida; opción de maridaje con vinos boutique. Sin traslados incluidos.',
      }
    },
    duration: '2 horas 30 minutos',
    imageKey: 'ACTIVITIES.FOGON_ASADO_EXPERIENCE',
    icon: 'UtensilsCrossed',
    active: true,
  },
  {
    id: 'secreto-tango-society',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'Secreto Tango Society',
        description: 'Show de tango en Palermo para treinta personas como máximo, en un espacio cerrado sin escenario ni barreras entre el público y los bailarines. Una hora de tango en vivo con músicos y bailarines de primer nivel, vino ilimitado incluido. Funciones de martes a sábados a las 16:30 o 18:30. Edad mínima 14 años.',
      }
    },
    duration: '1 horas',
    imageKey: 'ACTIVITIES.SECRETO_TANGO_SOCIETY',
    icon: 'Music',
    active: true,
  },
  {
    id: 'city-tour-montevideo',
    destinationId: 'montevideo',
    content: {
      es: {
        name: 'City Tour Montevideo',
        description: 'Tres horas recorriendo los principales puntos de la ciudad: Plaza Independencia, el Palacio Salvo, el Teatro Solís, el Mercado del Puerto y el Mercado Agrícola, el Palacio Legislativo y el Estadio Centenario. Con paradas para fotografías en los hitos más reconocidos y un recorrido por los barrios más pintorescos de la capital uruguaya.',
      }
    },
    duration: '3/4 horas · AM',
    imageKey: 'ACTIVITIES.CITY_TOUR_MONTEVIDEO',
    icon: 'Building2',
    active: true,
  },
  {
    id: 'tour-bodega-bouza-montevideo',
    destinationId: 'montevideo',
    content: {
      es: {
        name: 'Tour Bodega Bouza con Almuerzo Maridado',
        description: 'A orillas del arroyo Melilla, la Bodega Bouza combina producción vitivinícola, huerta orgánica y una colección privada de autos clásicos de la familia. El tour recorre viñedos, cava y jardines, con degustación de cuatro vinos acompañados de quesos regionales y fiambres. Almuerzo de tres pasos en el restaurante de la bodega. Incluye traslados y degustación.',
      }
    },
    duration: '4 horas',
    imageKey: 'ACTIVITIES.TOUR_BODEGA_BOUZA',
    icon: 'Wine',
    active: true,
  },
  {
    id: 'bodega-pizzorno-almuerzo-maridado',
    destinationId: 'montevideo',
    content: {
      es: {
        name: 'Tour a Bodega Pizzorno con almuerzo maridado',
        description: 'La familia Pizzorno lleva más de un siglo en la vitivinicultura uruguaya. El tour recorre viñedos, bodega y cava con explicación del proceso de elaboración, y termina con degustación asistida de cuatro vinos y aceites de oliva seguida de un almuerzo de tres pasos a la carta con vino incluido. Incluye traslados y degustación.',
      }
    },
    duration: '5 horas',
    imageKey: 'ACTIVITIES.BODEGA_PIZZORNO_MONTEVIDEO',
    icon: 'Wine',
    active: true,
  },
  {
    id: 'torres-del-paine-excursion',
    destinationId: 'puerto-natales',
    content: {
      es: {
        name: 'Parque Nacional Torres del Paine con almuerzo incluido',
        description: 'Jornada completa desde Puerto Natales con parada en la Cueva del Milodón antes de entrar al parque. El recorrido visita Laguna Amarga, los Cuernos del Paine, el Salto Grande y el Lago Grey, donde los témpanos del Glaciar Grey flotan sobre el agua. Cada parada tiene su propio carácter: la estepa, el bosque de coihues, el río y el hielo. Almuerzo y entradas incluidos.',
      }
    },
    duration: 'Día completo · 10-11 horas',
    imageKey: 'ACTIVITIES.TORRES_DEL_PAINE',
    icon: 'Mountain',
    active: true,
  },
  {
    id: 'glaciares-balmaceda-serrano',
    destinationId: 'puerto-natales',
    content: {
      es: {
        name: 'Glaciares Balmaceda y Serrano a bordo de Fiordos del Sur',
        description: "Seis horas de navegación desde Puerto Natales por el Fiordo de Última Esperanza hasta el Parque Nacional Bernardo O'Higgins. El recorrido pasa por estancias patagónicas, colonias de cormoranes y lobos marinos, hasta los Glaciares Balmaceda y Serrano. Desembarco y caminata de hora y media hasta el mirador del Glaciar Serrano. El regreso incluye un brindis con whisky e hielo de glaciar.",
      }
    },
    duration: 'Medio día · 6 horas de navegación',
    imageKey: 'ACTIVITIES.GLACIARES_BALMACEDA_SERRANO',
    icon: 'Waves',
    active: true,
  },
  {
    id: 'vuelta-lago-llanquihue',
    destinationId: 'puerto-varas',
    content: {
      es: {
        name: 'Vuelta al Lago Llanquihue con almuerzo incluido',
        description: 'Jornada completa bordeando el lago por Llanquihue, Frutillar y Puerto Octay, tres pueblos con fuerte huella de la inmigración alemana del siglo XIX. Arquitectura de tejuelas, el Teatro del Lago de Frutillar, el mirador de Puerto Octay y el pueblo de Ensenada cierran un recorrido tranquilo con el lago y el Osorno de fondo. Almuerzo incluido.',
      }
    },
    duration: 'Día completo · 9 horas',
    imageKey: 'ACTIVITIES.VUELTA_LAGO_LLANQUIHUE',
    icon: 'Waves',
    active: true,
  },
  {
    id: 'castro-dalcahue-chiloe',
    destinationId: 'puerto-varas',
    content: {
      es: {
        name: 'Castro y Dalcahue — Isla de Chiloé con almuerzo incluido',
        description: 'Doce horas desde Puerto Varas cruzando el Canal de Chacao hasta la Isla de Chiloé. En Castro, los palafitos de Gamboa y la iglesia de San Francisco en madera nativa, Patrimonio UNESCO. En Dalcahue, el mercado artesanal, la costanera y la Iglesia de Nuestra Señora de los Dolores. Cierre en Nercón con su iglesia declarada Patrimonio de la Humanidad. Almuerzo y ticket de ferry incluidos.',
      }
    },
    duration: 'Día completo · 12 horas',
    imageKey: 'ACTIVITIES.CASTRO_DALCAHUE_CHILOE',
    icon: 'Waves',
    active: true,
  },
  {
    id: 'valle-de-la-luna',
    destinationId: 'san-pedro-atacama',
    content: {
      es: {
        name: 'Valle de la Luna — Servicio PM',
        description: 'Tarde en el Valle de la Luna, en la Cordillera de la Sal del desierto de Atacama. El recorrido visita las Tres Marías, el Cañón, el Anfiteatro y la mina de sal Victoria, terminando en el mirador de Licarantay para ver el atardecer sobre el desierto con los volcanes al fondo. Entrada incluida.',
      }
    },
    duration: 'Medio día · 4 horas',
    imageKey: 'ACTIVITIES.VALLE_DE_LA_LUNA_ATACAMA',
    icon: 'Mountain',
    active: true,
  },
  {
    id: 'lagunas-altiplanicas-piedras-rojas-chaxa',
    destinationId: 'san-pedro-atacama',
    content: {
      es: {
        name: 'Lagunas Altiplánicas, Piedras Rojas y Laguna Chaxa',
        description: 'Jornada completa desde San Pedro hacia el altiplano. Las Piedras Rojas —también conocidas como Salar de Aguas Calientes— a 3.800 metros, con sus formaciones cobrizas y lagunas de colores. Las lagunas Miscanti y Miñiques con flora y fauna de altura, y la Laguna Chaxa con flamencos. Parada en el Trópico de Capricornio de vuelta. Entradas y almuerzo incluidos.',
      }
    },
    duration: 'Día completo · 11 horas',
    imageKey: 'ACTIVITIES.LAGUNAS_ALTIPLANICAS_PIEDRAS_ROJAS',
    icon: 'Binoculars',
    active: true,
  },
  {
    id: 'geysers-tatio-machuca-putana',
    destinationId: 'san-pedro-atacama',
    content: {
      es: {
        name: 'Géiseres del Tatio, Machuca y Vado de Putana — Servicio de Madrugada',
        description: 'Salida antes del amanecer hacia los 4.200 metros del campo geotérmico del Tatio, el más extenso del hemisferio sur. Una hora y media entre los 80 géiseres con sus columnas de vapor en el frío de la madrugada. El regreso pasa por los bofedales de Putana y el pueblo de Machuca, con sus llamas y su iglesia de paja. Entrada y desayuno incluidos.',
      }
    },
    duration: 'Medio día · 7 horas · desde 04:30h',
    imageKey: 'ACTIVITIES.GEYSERS_TATIO_MACHUCA',
    icon: 'Mountain',
    active: true,
  },
  {
    id: 'orongo-rano-kau',
    destinationId: 'isla-pascua',
    content: {
      es: {
        name: 'Centro Ceremonial Orongo y Volcán Rano Kau',
        description: 'Medio día visitando el volcán más grande de Rapa Nui y el centro ceremonial donde se celebraba el ritual del Hombre Pájaro, origen del festival Tapati. El cráter del Rano Kau, con más de 200 metros de paredes, actúa como invernadero natural y alberga una vegetación única en la isla. En Orongo, pinturas rupestres y vistas sobre el Pacífico.',
      }
    },
    duration: 'Medio día · 3 horas',
    imageKey: 'ACTIVITIES.ORONGO_RANO_KAU',
    icon: 'TreePalm',
    active: true,
  },
  {
    id: 'ahu-akivi-misterios-moais',
    destinationId: 'isla-pascua',
    content: {
      es: {
        name: 'Ahu Akivi y los Misterios de los Moais',
        description: 'Tarde recorriendo tres sitios de gran valor arqueológico. La cantera de Puna Pau, donde se tallaban los pukao —los tocados de los moais—. El Ahu Akivi, con sus siete moais orientados al océano y alineados con los equinoccios. El Centro Ceremonial Tahai al atardecer, con tres plataformas restauradas y el único moai de la isla con los ojos reconstruidos.',
      }
    },
    duration: 'Medio día · 3 horas',
    imageKey: 'ACTIVITIES.AHU_AKIVI_MOAIS',
    icon: 'TreePalm',
    active: true,
  },
  {
    id: 'cantera-moais-playa-anakena',
    destinationId: 'isla-pascua',
    content: {
      es: {
        name: 'Cantera de los Moais y Playa Anakena con box lunch incluido',
        description: 'Jornada completa recorriendo el lado norte y este de la isla. Ahu Akahanga, Ahu Tongariki y el cráter volcánico de Rano Raraku, la cantera donde se tallaron y aún permanecen cerca de 400 moais en distintos estados. Picnic en el camino y tarde libre en Anakena, la playa de arena blanca donde la tradición sitúa el desembarco del primer colono polinesio de la isla.',
      }
    },
    duration: 'Día completo · 8 horas',
    imageKey: 'ACTIVITIES.CANTERA_MOAIS_ANAKENA',
    icon: 'TreePalm',
    active: true,
  },
  {
    id: 'city-tour-lima-colonial-museo-larco',
    destinationId: 'lima',
    content: {
      es: {
        name: 'City Tour Lima Colonial y Moderno + Museo Larco Herrera',
        description: 'Recorrido por el casco histórico declarado Patrimonio de la Humanidad: la Catedral, la Plaza Mayor con el Palacio de Gobierno, el Convento de Santo Domingo y el Convento de San Francisco. La movilidad traslada al barrio de San Isidro y Miraflores pasando por la Huaca Pucllana. Visita al Museo Larco Herrera, instalado en una mansión virreinal del siglo XVIII sobre una pirámide del siglo VII, con 3.000 años de historia precolombina y la célebre colección de arte erótico. Parada en el Parque del Amor con vistas a la costa verde limeña.',
      }
    },
    duration: 'Medio día · 5-6 horas',
    imageKey: 'ACTIVITIES.CITY_TOUR_LIMA',
    icon: 'Building2',
    active: true,
  },
  {
    id: 'reserva-nacional-paracas',
    destinationId: 'paracas',
    content: {
      es: {
        name: 'Reserva Nacional de Paracas',
        description: 'Visita a la Reserva Nacional de Paracas, donde la cultura Paracas habitó estas costas hace más de 2.000 años dejando como legado su necrópolis y una tradición textil de gran riqueza. Recorrido por el paisaje marítimo, los acantilados y el desierto costero, con visita al centro de interpretación de la Reserva donde se ilustra sobre la biodiversidad y esta civilización precolombina.',
      }
    },
    duration: 'Medio día',
    imageKey: 'ACTIVITIES.RESERVA_NACIONAL_PARACAS',
    icon: 'Binoculars',
    active: true,
  },
  {
    id: 'buggies-sandboard-dunas-paracas',
    destinationId: 'paracas',
    content: {
      es: {
        name: 'Buggies y Sandboard en las Dunas — Oasis Costa Rica',
        description: 'Experiencia de aventura recorriendo las enormes dunas del Oasis Costa Rica a bordo de "buggies" o areneros, siguiendo parte de la mítica Ruta del Dakar. La actividad culmina practicando sandboard, deslizándose por las inmensas dunas al atardecer antes de regresar al hotel.',
      }
    },
    duration: 'Tarde · 3-4 horas',
    imageKey: 'ACTIVITIES.BUGGIES_SANDBOARD_PARACAS',
    icon: 'Binoculars',
    active: true,
  },
  {
    id: 'islas-ballestas-paracas',
    destinationId: 'paracas',
    content: {
      es: {
        name: 'Islas Ballestas en Lancha',
        description: 'Navegación en lancha compartida por el Océano Pacífico para observar, en el camino, el geoglifo del Candelabro. Recorrido por las Islas Ballestas, santuario natural donde conviven lobos marinos, pingüinos de Humboldt, pelícanos y decenas de especies de aves en su hábitat natural. El "Galápagos peruano".',
      }
    },
    duration: 'Medio día · 2-3 horas',
    imageKey: 'ACTIVITIES.ISLAS_BALLESTAS',
    icon: 'Binoculars',
    active: true,
  },
  {
    id: 'sobrevuelo-lineas-nazca',
    destinationId: 'paracas',
    content: {
      es: {
        name: 'Sobrevuelo a las Líneas de Nazca (Opcional)',
        description: 'La mejor forma de apreciar las enigmáticas Líneas de Nazca, geoglifos precolombinos de entre 40 y 210 cm de ancho y 30 cm de profundidad que solo pueden admirarse desde el aire. Vuelo en avioneta sobre las principales figuras durante 35 minutos, más media hora por trayecto desde Pisco, con vistas al Océano Pacífico de ida y a la Cordillera de regreso.',
      }
    },
    duration: '35 minutos de vuelo + traslados',
    imageKey: 'ACTIVITIES.SOBREVUELO_NAZCA',
    icon: 'Binoculars',
    active: true,
  },
  {
    id: 'city-tour-arequipa',
    destinationId: 'arequipa',
    content: {
      es: {
        name: 'City Tour Arequipa: Santa Catalina, Yanahuara y Mundo Alpaca',
        description: 'Visita de la llamada Ciudad Blanca incluyendo el Convento de Santa Catalina, una ciudad dentro de la ciudad con callejuelas y patios de colores; la Plaza de Armas y los Claustros de la Compañía con la cúpula de San Ignacio; los distritos de Yanahuara y Chilina con vistas panorámicas al volcán Misti. La visita concluye en Mundo Alpaca, centro cultural del proceso tradicional de la fibra de alpaca desde la esquila hasta el tejido.',
      }
    },
    duration: 'Tarde · 4-5 horas',
    imageKey: 'ACTIVITIES.CITY_TOUR_AREQUIPA',
    icon: 'Building2',
    active: true,
  },
  {
    id: 'canon-del-colca-cruz-condor',
    destinationId: 'canon-del-colca',
    content: {
      es: {
        name: 'Cañón del Colca y Cruz del Cóndor',
        description: 'Excursión al Mirador Cruz del Cóndor, desde donde se aprecia la profundidad del cañón y el vuelo de los cóndores andinos. Visita a los pueblos coloniales de Yanque y Maca con sus iglesias características y plazas andinas. Vistas del valle de retorno a Chivay con sus bofedales y flamencos.',
      }
    },
    duration: 'Día completo · 8 horas',
    imageKey: 'ACTIVITIES.CANON_DEL_COLCA',
    icon: 'Binoculars',
    active: true,
  },
  {
    id: 'lago-titicaca-uros-taquile',
    destinationId: 'puno',
    content: {
      es: {
        name: 'Lago Titicaca: Islas Uros e Isla Taquile',
        description: 'Navegación por el lago navegable más alto del planeta (3.820 m) hasta las Islas Uros, islas flotantes construidas artesanalmente con totora, planta acuática del lago, donde los descendientes de esta ancestral etnia mantienen su forma de vida tradicional. Continuación hasta la Isla de Taquile, isla quechua de costumbres incas vivas, con almuerzo en restaurante local y visita a sus artesanos textiles Patrimonio Inmaterial de la UNESCO.',
      }
    },
    duration: 'Día completo · 8 horas',
    imageKey: 'ACTIVITIES.LAGO_TITICACA_UROS_TAQUILE',
    icon: 'Waves',
    active: true,
  },
  {
    id: 'city-tour-peatonal-cusco',
    destinationId: 'cusco',
    content: {
      es: {
        name: 'City Tour Peatonal Cusco',
        description: 'Circuito exclusivo a pie por el corazón de la antigua capital del Imperio Inca: la plaza del bohemio barrio de San Blas, la calle Hatunrumiyoc con la célebre Piedra de los 12 Ángulos, la plazoleta Nazarenas, la Plaza de Armas con la Catedral barroca del siglo XVII y el Koricancha o Templo del Sol, el recinto más sagrado del Imperio Inca. Finaliza en el mercado de abastos de San Pedro.',
      }
    },
    duration: 'Medio día · 4-5 horas',
    imageKey: 'ACTIVITIES.CITY_TOUR_PEATONAL_CUSCO',
    icon: 'Building2',
    active: true,
  },
  {
    id: 'valle-sagrado-chinchero-maras-moray-ollantaytambo',
    destinationId: 'valle-sagrado',
    content: {
      es: {
        name: 'Valle Sagrado: Chinchero, Maras, Moray y Ollantaytambo',
        description: 'Recorrido completo por el Valle Sagrado comenzando en Chinchero con su zona arqueológica, iglesia colonial y taller textil donde herederas de las técnicas incas demuestran tejidos con tintes naturales. Visita a las Minas de Sal de Maras, explotadas desde el Imperio Inca. Exploración del laboratorio agrícola circular de Moray con sus microclimas concéntricos. Por la tarde, visita a la fortaleza de Ollantaytambo antes de tomar el tren Vistadome hacia Aguas Calientes.',
      }
    },
    duration: 'Día completo · 9 horas',
    imageKey: 'ACTIVITIES.VALLE_SAGRADO_FULL',
    icon: 'Landmark',
    active: true,
  },
  {
    id: 'machu-picchu-visita-guiada',
    destinationId: 'machu-picchu',
    content: {
      es: {
        name: 'Machu Picchu: Visita Guiada a la Ciudadela Inca',
        description: 'Visita guiada de la ciudadela inca de Machu Picchu, una de las Siete Maravillas Modernas del Mundo, declarada Patrimonio de la Humanidad. Conviene madrugar para recorrer los andenes, plazas, templos, palacios, depósitos, talleres, escalinatas, fuentes de agua y el Templo del Sol antes de que lleguen los grupos. Posibilidad de subir al monte Huayna Picchu o monte Machu Picchu previo pago de suplemento. Regreso en bus a Aguas Calientes para explorar el mercadillo y el pueblo.',
      }
    },
    duration: 'Día completo · 5-6 horas',
    imageKey: 'ACTIVITIES.MACHU_PICCHU_VISITA',
    icon: 'Landmark',
    active: true,
  },
  {
    id: 'pisac-ruinas-mercado',
    destinationId: 'valle-sagrado',
    content: {
      es: {
        name: 'Ruinas y Mercado de Pisac',
        description: 'Visita al extenso sitio arqueológico de Pisac en el sector de Kanturaquay, con sus fuentes incas y cementerio. Breve parada en el animado mercado de Pisac, uno de los mercados artesanales más importantes del Valle Sagrado, con tejidos, cerámica y productos andinos de toda la región.',
      }
    },
    duration: 'Medio día · 3-4 horas',
    imageKey: 'ACTIVITIES.PISAC_RUINAS_MERCADO',
    icon: 'Landmark',
    active: true,
  },
  {
    id: 'ruinas-aledanas-cusco',
    destinationId: 'cusco',
    content: {
      es: {
        name: "Ruinas Aledañas de Cusco: Sacsayhuamán, Q'enqo y Tambomachay",
        description: "Circuito por los monumentos incas en las colinas que rodean Cusco: Sacsayhuamán, impresionante fortaleza ceremonial de piedras monumentales de hasta 125 toneladas; Q'enqo, centro ceremonial donde se realizaban rituales y sacrificios; Tambomachay, templo para rendir culto al Dios Agua con sus fuentes y canales. Vista panorámica de Puka-Pukará, antiguo tambo o puesto de vigilancia en los caminos incas.",
      }
    },
    duration: 'Medio día · 3 horas',
    imageKey: 'ACTIVITIES.RUINAS_ALEDANAS_CUSCO',
    icon: 'Landmark',
    active: true,
  },
  {
    id: 'valle-arcoiris-atacama',
    destinationId: 'san-pedro-atacama',
    content: {
      es: {
        name: 'Valle del Arcoiris, Petroglifos y Yerbas Buenas',
        description: 'A 90 kilómetros de San Pedro, el Valle del Arcoíris debe su nombre a la variedad de tonalidades que muestran sus cerros: rojos, ocres, verdes, blancos y amarillos, producto de distintas concentraciones de arcilla, minerales y sales. El recorrido incluye una caminata de dos horas por el valle, una parada en el sector del río Salado y la visita a los petroglifos de Yerbas Buenas. Traslados, guía, entrada y snack incluidos. Salida a las 7:30 hs.',
      }
    },
    duration: '5 horas · Salida 7:30',
    imageKey: 'ACTIVITIES.VALLE_ARCO_IRIS',
    icon: 'Mountain',
    active: true,
  },
  {
    id: 'laguna-cejar-tebenquinche',
    destinationId: 'san-pedro-atacama',
    content: {
      es: {
        name: 'Laguna Cejar, Laguna Tebequinche y Ojos del Salar',
        description: 'Tarde en tres puntos del Salar de Atacama. La Laguna Cejar, con sus aguas saturadas de sal donde se flota sin esfuerzo y una tonalidad turquesa poco habitual. Los Ojos del Salar, dos pozos de agua dulce en medio del desierto con un verde intenso que contrasta con el entorno árido. La Laguna Tebenquinche, con sus senderos y una fauna que incluye zorros y flamencos. Traslados, guía, entradas y snack incluidos. Salida a las 14:00 hs.',
      }
    },
    duration: '4 horas · Salida 14:30',
    imageKey: 'ACTIVITIES.LAGUNA_CEJAR',
    icon: 'Binoculars',
    active: true,
  },
]

export default activities
