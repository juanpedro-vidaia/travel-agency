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
    id: 'city-tour-buenos-aires',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'City Tour. Medio día.',
        description: 'Un recorrido dinámico por los hitos que definen a la capital argentina. Desde el icónico Obelisco y las bulliciosas avenidas Corrientes y 9 de Julio, hasta el encanto histórico de San Telmo y el colorido de La Boca con su famoso Caminito. Descubrirás la elegancia de Palermo y Recoleta, la modernidad de Puerto Madero y puntos emblemáticos como la Floralis Genérica y la histórica Plaza de Mayo. La opción ideal para una visión vibrante y completa de la ciudad.',
      }
    },
    duration: '3,5-4 horas · Tour AM · PM',
    active: true,
  },
  {
    id: 'city-tour-premium-buenos-aires',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'City Tour Premium. Medio día.',
        description: 'La experiencia definitiva para conocer Buenos Aires a fondo. Iniciamos en el norte, explorando las mansiones de estilo francés en Retiro y Recoleta, con visitas al Cementerio de la Recoleta y el monumento a Evita. El itinerario incluye paradas extendidas en el Teatro Colón, la Casa Rosada y la Catedral Metropolitana. Tras conocer a Mafalda en San Telmo y el espíritu futbolero en el Estadio de Boca Juniors, el tour culmina con el regreso al hotel tras una inmersión total en la gastronomía y cultura porteña.',
      }
    },
    duration: '4 horas · Tour AM · PM',
    active: true,
  },
  {
    id: 'delta-premium-buenos-aires',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'Delta Premium',
        description: 'Una travesía única desde la costa de Buenos Aires hacia el ecosistema del Delta. Navega el Río de la Plata disfrutando de vistas panorámicas del Estadio de River Plate y San Isidro hasta adentrarte en el laberinto de islas del Río Luján. Conocerás la vida típica isleña antes de explorar la ciudad de Tigre, su Paseo Victorica, el imponente Museo de Arte y el pintoresco Puerto de Frutos, un mercado artesanal al aire libre lleno de encanto local.',
      }
    },
    duration: '5 horas',
    active: true,
  },
  {
    id: 'fiesta-gaucha-estancia-susana',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'Fiesta Gaucha Estancia Susana',
        description: 'Vive una jornada de campo auténtica a solo 80 km de la ciudad. Te recibirán gauchos y "chinas" en un casco histórico convertido en museo para sumergirte en la tradición rural. La experiencia incluye un clásico asado argentino, shows de tango, folclore y la destreza del malambo con boleadoras. El día culmina con paseos en carruaje y emocionantes demostraciones ecuestres, como las carreras de sortijas y el entrevero de tropillas.',
      }
    },
    duration: '8 horas',
    active: true,
  },
  {
    id: 'tango-show-la-ventana',
    destinationId: 'buenos-aires',
    content: {
      es: {
        name: 'Espectáculo de Tango con cena en La Ventana',
        description: 'En el corazón de San Telmo, este histórico conventillo restaurado ofrece la experiencia definitiva de la cultura porteña. Con 32 artistas en escena, incluyendo dos orquestas, bailarines y cantantes de tango y folclore, disfrutarás de un espectáculo de nivel internacional. La propuesta se completa con una cena gourmet que destaca la parrilla al carbón y los mejores vinos argentinos en un entorno que conserva la esencia más pura de 1982.',
      }
    },
    duration: 'Cena 20:00-21:30 hs · Show 21:30-23:30 hs',
    icon: 'Music',
    active: true,
  },
  {
    id: 'estancia-nibepo-aike',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'Estancia Nibepo Aike — Día de campo patagónico',
        description: 'Descubre la esencia de la vida rural en una auténtica estancia patagónica, ubicada en un entorno privilegiado entre el Lago Argentino y la Cordillera de los Andes. Lejos del turismo masivo, esta experiencia de día completo te invita a sumergirte en la historia de los pioneros con actividades tradicionales como ordeñe, arreo de ovejas y demostración de esquila. La jornada culmina con un exquisito almuerzo de cordero al asador en el antiguo casco de la estancia. Una inmersión cultural única que combina hospitalidad, historia ganadera y los paisajes más puros de la Patagonia.',
      }
    },
    duration: '8 horas · 08:30-16:30 hs',
    icon: 'UtensilsCrossed',
    active: true,
  },
  {
    id: 'todo-glaciares',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'Todo Glaciares: Traslados y Navegación',
        description: 'Embárcate en una expedición épica por el Brazo Norte del Lago Argentino para descubrir los gigantes de hielo más remotos. Navegarás entre icebergs monumentales en el Canal Upsala y te maravillarás ante el Glaciar Spegazzini, el más alto del Parque Nacional con paredes que superan los 135 metros. La experiencia incluye un desembarco en la exclusiva Base Spegazzini, donde podrás recorrer senderos boscosos y disfrutar de vistas panorámicas inigualables desde su moderno refugio frente al lago. Un recorrido esencial para capturar la escala más salvaje de la Patagonia.',
      }
    },
    duration: 'Día completo, 10 horas',
    active: true,
  },
  {
    id: 'glaciar-perito-moreno',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'Glaciar Perito Moreno: Excursión Completa',
        description: 'Descubre uno de los espectáculos naturales más imponentes del mundo en el corazón del Parque Nacional Los Glaciares. Tras recorrer la estepa y el bosque andino patagónico, llegarás frente al Glaciar Perito Moreno, famoso por ser uno de los pocos en el mundo en constante avance. Podrás explorar libremente su extenso sistema de pasarelas y miradores, que ofrecen perspectivas únicas de sus paredes de hielo y sus estruendosos desprendimientos. Una experiencia imprescindible para conectar con la fuerza de la naturaleza en un entorno declarado Patrimonio de la Humanidad.',
      }
    },
    duration: 'Día completo, 8 horas',
    active: true,
  },
  {
    id: 'perito-moreno-safari',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'Safari Náutico',
        description: 'Vive la inmensidad del glaciar desde el agua en esta navegación de una hora por el Lago Rico. La embarcación permite aproximarse a solo 200 metros de la imponente pared sur, un muro de hielo que se eleva 60 metros sobre el nivel del lago. Durante el recorrido de 3 km frente al glaciar, podrás admirar de cerca los intensos azules de sus grietas y seracs, y ser testigo privilegiado de los estruendosos desprendimientos diarios. Una perspectiva única y necesaria para dimensionar la magnitud real del gigante de hielo.',
      }
    },
    duration: '1 hora',
    active: true,
  },
  {
    id: 'perito-moreno-mintrekking',
    destinationId: 'el-calafate',
    content: {
      es: {
        name: 'Minitrekking',
        description: 'Desafía tus sentidos con la experiencia definitiva: caminar sobre el hielo milenario del glaciar más famoso del mundo. Tras una breve navegación por el Lago Rico, iniciaremos un trekking por el bosque hasta alcanzar el borde del glaciar. Equipados con crampones, exploraremos durante dos horas un paisaje irreal de grietas, sumideros y lagunas de un azul intenso. Una aventura activa y fascinante que te permite sentir bajo tus pies la fuerza viva de la naturaleza en el corazón del Parque Nacional Los Glaciares.',
      }
    },
    duration: '3 horas',
    active: true,
  },
  {
    id: 'trekking-laguna-de-los-tres',
    destinationId: 'el-chalten',
    content: {
      es: {
        name: 'Trekking Laguna de los Tres',
        description: 'Embárcate en la caminata más emblemática de la Capital Nacional del Trekking. Iniciando en el Río Eléctrico, atravesarás bosques nativos y valles glaciares hasta alcanzar el mirador del Glaciar Piedras Blancas. Tras superar el ascenso más desafiante del recorrido, serás recompensado con la vista más cercana y espectacular del Monte Fitz Roy reflejado en las aguas turquesas de la Laguna de los Tres. Un descenso escénico por la Laguna Capri completa esta aventura épica de 23 km, diseñada para quienes buscan el contacto más puro con las agujas de granito de la Patagonia.',
      }
    },
    duration: 'Día completo, 9 horas',
    active: true,
  },
  {
    id: 'trekking-laguna-capri',
    destinationId: 'el-chalten',
    content: {
      es: {
        name: 'Trekking Laguna Capri',
        description: 'La opción ideal para quienes buscan las vistas más icónicas del Monte Fitz Roy en un recorrido accesible y de medio día. Partiendo desde el extremo norte del pueblo, el sendero asciende entre bosques nativos hasta alcanzar miradores privilegiados del Valle del Río de las Vueltas y las agujas graníticas del macizo. El punto culminante es la Laguna Capri, un espejo de agua prístino donde podrás contemplar la majestuosidad del Fitz Roy en todo su esplendor. Una aventura perfecta para disfrutar de la naturaleza salvaje sin la exigencia de las travesías de día completo.',
      }
    },
    duration: '3,5 horas',
    active: true,
  },
  {
    id: 'trekking-mirador-cerro-torre',
    destinationId: 'el-chalten',
    content: {
      es: {
        name: 'Trekking Mirador Cerro Torre',
        description: 'La opción perfecta para descubrir la majestuosidad del Cerro Torre en una caminata breve y accesible. Partiendo desde El Chaltén, el sendero recorre el cañón del Río Fitz Roy y la encantadora Cascada Margarita, ofreciendo vistas espectaculares desde los primeros minutos. Tras un ascenso moderado entre bosques nativos, alcanzarás el mirador principal para contemplar una de las siluetas más famosas del mundo: las agujas graníticas del Torre, Egger y Standhardt. Una experiencia de media jornada que captura la esencia más pura de la alta montaña patagónica.',
      }
    },
    duration: '3,5 horas',
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
    active: true,
  },
  {
    id: 'cataratas-argentinas',
    destinationId: 'iguazu',
    content: {
      es: {
        name: 'Cataratas Argentinas',
        description: 'Sumérgete en el corazón de la selva misionera para descubrir la fuerza indomable de las Cataratas del Iguazú, Patrimonio de la Humanidad por la UNESCO. Esta excursión de día completo te permite recorrer el Paseo Superior, con vistas panorámicas desde el borde de los saltos, y el Paseo Inferior, para sentir la bruma y el rugido del agua desde abajo. El punto culminante es el acceso en el Tren Ecológico hasta la impresionante Garganta del Diablo, donde las pasarelas te sitúan frente a la caída de agua más imponente del planeta. Una experiencia sensorial única rodeada de biodiversidad y paisajes selváticos.',
      }
    },
    duration: '8 horas · 07:20-16:00 hs',
    active: true,
  },
  {
    id: 'cataratas-brasilenas',
    destinationId: 'iguazu',
    content: {
      es: {
        name: 'Cataratas Brasileñas',
        description: 'Descubre la mejor vista panorámica de una de las Siete Maravillas Naturales del Mundo. Tras un recorrido en modernos autobuses panorámicos por la selva, accederás a un sendero de 1.200 metros que ofrece una perspectiva frontal inigualable de los saltos. Desde las pasarelas, podrás admirar la inmensidad de la Garganta del Diablo y los saltos Floriano y Benjamín Constant, culminando la experiencia en un elevador vidriado que regala una postal inolvidable del cañón del río Iguazú. Una visita de media jornada imprescindible para dimensionar la magnitud del gigante de agua.',
      }
    },
    duration: '3 horas',
    icon: 'Waves',
    active: true,
  },
  {
    id: 'gran-aventura-iguazu',
    destinationId: 'iguazu',
    content: {
      es: {
        name: 'Gran Aventura',
        description: 'Siente la fuerza incontenible de la naturaleza en la excursión más emocionante de Iguazú. Esta aventura combina un recorrido en vehículos todoterreno por el Sendero Yacaratiá, revelando los secretos de la selva misionera, con una navegación extrema en lanchas rápidas. Te adentrarás en el cañón del Río Iguazú para vivir un "bautismo" bajo los saltos Tres Mosqueteros y San Martín. Una experiencia única de adrenalina y bruma que te sitúa literalmente bajo una de las Siete Maravillas Naturales del Mundo.',
      }
    },
    duration: '2,5 horas',
    active: true,
  },
  {
    id: 'peninsula-valdes-ballenas',
    destinationId: 'puerto-madryn',
    content: {
      es: {
        name: 'Excursión Península de Valdés y avistaje de ballena franca austral',
        description: 'Ruta por el Istmo Carlos Ameghino, Puerto Pirámides y Caleta Valdés (elefantes marinos). Avistaje en catamarán. Incluye entrada reserva natural. Temporada: junio-diciembre.',
      }
    },
    duration: '10 horas · Salida 07:30 hs',
    active: true,
  },
  {
    id: 'navegacion-canal-beagle',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Isla de Lobos en catamarán por Canal Beagle',
        description: 'Zarpa desde el muelle turístico de Ushuaia para descubrir la majestuosidad del Canal Beagle desde una perspectiva única. A bordo de un confortable catamarán, recorrerás el Archipiélago Bridges visitando la Isla de los Pájaros y la Isla de los Lobos, donde avistarás albatros, cormoranes y lobos marinos de uno y dos pelos. El punto culminante llega al alcanzar el legendario Faro Les Eclaireurs, donde conocerás la historia del naufragio del SS Monte Cervantes y podrás capturar la postal más famosa del Fin del Mundo. Una travesía amena y esencial, rodeada por la suntuosa geografía de la Cordillera de los Andes.',
      }
    },
    duration: '3 horas · AM · PM',
    active: true,
  },
  {
    id: 'parque-nacional-tierra-fuego',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Parque Nacional Tierra del Fuego',
        description: 'Vive la emoción de llegar al final de la ruta Panamericana, el punto donde los Andes se encuentran con el mar austral. En este recorrido de 12 km desde Ushuaia, exploraremos el Lago Acigami y la icónica Bahía Lapataia, hogar del cartel que marca los 15,000 km desde Alaska. El tour ofrece la opción de sumar la mística experiencia del Tren del Fin del Mundo y visitar la última estafeta postal de América. Un ecosistema único de bosques subantárticos y restos arqueológicos que te sitúan a solo 1000 km de la Antártida.',
      }
    },
    duration: '5 horas · Salida 08:00 hs',
    active: true,
  },
  {
    id: 'tren-fin-del-mundo',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Tren del Fin del Mundo',
        description: 'Revive la historia de Ushuaia a bordo del antiguo "Tren de los Presos". Este recorrido de 7 km te lleva por el trazado original que realizaban los convictos para abastecer de leña al pueblo. Hoy, en modernos vagones vidriados, atravesarás bosques centenarios, turberas y ríos, realizando una parada en la Cascada Macarena antes de adentrarte en el corazón del Parque Nacional Tierra del Fuego. Una experiencia histórica imprescindible para conectar con el pasado y la naturaleza fueguina.',
      }
    },
    active: true,
  },
  {
    id: 'navegacion-canal-beagle-pingüinera',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Navegación Canal de Beagle - Pingüinera',
        description: 'Una expedición completa que combina historia, paisajes binacionales y fauna austral. Tras visitar la Isla de los Lobos, la de los Pájaros y el icónico Faro Les Eclaireurs, navegaremos hacia el este para descubrir Isla Martillo. Allí, observaremos en su hábitat natural a las colonias de pingüinos Magallánicos y Papúa. El regreso bordea la costa permitiendo avistar Puerto Almanza y las históricas estancias Túnel y Remolino, con el casco del vapor Monte Sarmiento como testigo del pasado. Una travesía única para los amantes de la naturaleza en el confín del mundo.',
      }
    },
    duration: '6 horas · AM · PM',
    active: true,
  },
  {
    id: 'travesia-lagos-4x4-verano',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Travesía de los Lagos 4x4 - Verano',
        description: 'Siente la adrenalina de una travesía fuera de ruta por los paisajes más indómitos de Tierra del Fuego. Tras cruzar la Cordillera de los Andes por el Paso Garibaldi, nos adentraremos en una aventura 4x4 a través de bosques subantárticos y caminos de barro hasta alcanzar las orillas del imponente Lago Fagnano. La jornada incluye un trekking por el bosque hasta el Lago Escondido, donde disfrutaremos de una comida típica en un refugio exclusivo. Una experiencia inolvidable que combina potencia, naturaleza salvaje y la calidez de la gastronomía austral.',
      }
    },
    duration: '8 horas · AM · PM',
    active: true,
  },
  {
    id: 'trekking-martial-by-sunset',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Trekking Glaciar Martial by Sunset',
        description: 'Vive una experiencia mágica bajo las estrellas a solo minutos de Ushuaia. Esta travesía nocturna te invita a recorrer senderos centenarios del bosque fueguino mientras disfrutas de vistas panorámicas de la ciudad iluminada. Tras una caminata con linternas, te espera la calidez de un domo de montaña con vino caliente, seguido de una cena exclusiva en un refugio de montaña donde degustarás un auténtico guiso fueguino. Una combinación perfecta de aventura, historia y confort en el corazón de los Andes.',
      }
    },
    duration: '4,5 horas',
    active: true,
  },
  {
    id: 'parque-nacional-trekking-canoas',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Parque Nacional con trekking y canoas',
        description: 'Descubre el Parque Nacional Tierra del Fuego desde una perspectiva no convencional y cercana. Esta travesía de día completo te invita a sumergirte en un ecosistema único donde la montaña se une con el mar. La experiencia combina un trekking por senderos vírgenes del bosque subantártico con una emocionante navegación en canoas inflables por ríos y la Bahía Lapataia. Incluye un almuerzo completo en plena naturaleza, ofreciendo una inmersión total y respetuosa en el paisaje más austral de Argentina.',
      }
    },
    duration: '8 horas',
    active: true,
  },
  {
    id: 'aventura-almanza',
    destinationId: 'ushuaia',
    content: {
      es: {
        name: 'Aventura Almanza',
        description: 'Una expedición exclusiva que combina la fauna más icónica con la gastronomía más auténtica del Fin del Mundo. Tras recorrer la ruta escénica de los Andes, llegaremos a Puerto Almanza, el pueblo de pescadores más austral del país. Desde allí, navegaremos en una embarcación ligera hacia la Isla Martillo para un avistamiento cercano de pingüinos Magallanes y Papúa. La jornada culmina con una experiencia culinaria inolvidable en la "Ruta de la Centolla", donde una familia local nos recibirá en su hogar para degustar los tesoros del Canal Beagle en un almuerzo de tres pasos frente al mar.',
      }
    },
    duration: '8 horas',
    active: true,
  },
]

export default activities
