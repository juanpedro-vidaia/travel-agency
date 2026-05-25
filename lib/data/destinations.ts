import type { CountrySlug } from './countries'

export interface DestinationContent {
  name: string
  description: string
}

export interface Destination {
  id: string
  slug: string
  country: CountrySlug
  content: {
    es: DestinationContent
    en?: DestinationContent
  }
  imageKey: string
  active: boolean
  featured?: boolean
  lat?: number
  lng?: number
}

const destinations: Destination[] = [
  // ── Argentina ────────────────────────────────────────────────────────────────
  {
    id: 'bariloche',
    slug: 'bariloche',
    country: 'argentina',
    content: {
      es: {
        name: 'San Carlos de Bariloche',
        description: 'Situada a orillas del lago Nahuel Huapi, en el corazón de la Patagonia andina, San Carlos de Bariloche combina la tradición alpina con el espíritu patagónico. Rodeada de montañas, lagos y bosques, es la puerta de entrada al Parque Nacional Nahuel Huapi, el más antiguo del país. Fundada a fines del siglo XIX, la ciudad creció gracias a la inmigración centroeuropea, que dejó huella en su arquitectura de madera y piedra y en la cultura del chocolate y la cerveza artesanal. Hoy es un destino vibrante durante todo el año: en invierno, referente del esquí sudamericano; en verano, punto de partida de excursiones a la Ruta de los Siete Lagos, al Bosque de Arrayanes o al Cerro Tronador. El Circuito Chico y el mirador del Cerro Campanario ofrecen algunas de las vistas más célebres de la región. Entre lagos de aguas turquesa, montañas nevadas y gastronomía típica, Bariloche se presenta como el gran enclave de los Andes australes.',
      }
    },
    imageKey: 'DESTINATIONS.BARILOCHE',
    active: true,
    featured: true,
    lat: -41.1335,
    lng: -71.3103,
  },
  {
    id: 'buenos-aires',
    slug: 'buenos-aires',
    country: 'argentina',
    content: {
      es: {
        name: 'Buenos Aires',
        description: 'Fundada en 1536 por Pedro de Mendoza y refundada en 1580 por Juan de Garay a orillas del Río de la Plata, Buenos Aires es una capital moderna y cosmopolita. De aire europeo y carácter rioplatense, conserva una valiosa arquitectura de fines del XIX y comienzos del XX (belle époque, art nouveau y art déco), aunque la renovación urbana también se llevó parte de su patrimonio. Con casi un tercio de la población del país concentrada en su área metropolitana, es una metrópolis dinámica y polifacética: cafés, librerías y teatros —con el Teatro Colón como emblema— y barrios de fuerte personalidad como San Telmo, La Boca, Recoleta y Palermo. Llana y abierta a la pampa y al estuario, la ciudad combina tango, fútbol y alta gastronomía.',
      }
    },
    imageKey: 'DESTINATIONS.BUENOS_AIRES',
    active: true,
    featured: true,
    lat: -34.6037,
    lng: -58.3816,
  },
  {
    id: 'cafayate',
    slug: 'cafayate',
    country: 'argentina',
    content: {
      es: {
        name: 'Cafayate',
        description: 'Cafayate es un pueblo vitícola en el sur de la provincia de Salta, a 1.683 metros de altitud en el Valle Calchaquí. Sus viñedos producen el torrontés más reconocido del país, una uva blanca aromática que se da especialmente bien en este microclima de altura, sol intenso y noches frías. El centro del pueblo, con su plaza, su catedral y sus bodegas a pie de calle, se recorre en poco tiempo. Los alrededores ofrecen algunas de las bodegas más interesantes del noroeste argentino, varias con restaurante y alojamiento. La Quebrada de las Conchas, en el camino desde Salta, es un cañón de roca rojiza con formaciones como la Garganta del Diablo o el Anfiteatro que justifican dedicar tiempo al trayecto. Cafayate combina bien con Salta en itinerarios de dos o tres días por el norte argentino.',
      }
    },
    imageKey: 'DESTINATIONS.CAFAYATE',
    active: true,
    featured: false,
    lat: -26.0739,
    lng: -65.9735,
  },
  {
    id: 'catamarca',
    slug: 'catamarca',
    country: 'argentina',
    content: {
      es: {
        name: 'Catamarca',
        description: 'Catamarca es una de las provincias menos visitadas del noroeste argentino y precisamente por eso una de las más interesantes para quienes buscan destinos fuera de los circuitos habituales. Su territorio abarca desde valles fértiles en el este hasta la Puna y la alta cordillera en el oeste, donde se concentra la Ruta de los 6000: una sucesión de volcanes de más de 6.000 metros de altitud — entre ellos el Ojos del Salado, el volcán activo más alto del planeta — que no tiene equivalente en ningún otro lugar del mundo. El Campo de Piedra Pómez, en Antofagasta de la Sierra, es otro paisaje único: formaciones volcánicas blancas a más de 3.600 metros rodeadas de lagunas con flamencos. Belén y Santa María son los pueblos de referencia, con artesanía en lana de llama y cerámica de tradición precolombina.',
      }
    },
    imageKey: 'DESTINATIONS.CATAMARCA',
    active: true,
    featured: false,
    lat: -28.4696,
    lng: -65.7795,
  },
  {
    id: 'el-calafate',
    slug: 'el-calafate',
    country: 'argentina',
    content: {
      es: {
        name: 'El Calafate',
        description: 'Puerta de entrada al Parque Nacional Los Glaciares, El Calafate se extiende en la ribera sur del Lago Argentino, entre estepa ventosa y aguas de un turquesa lechoso. Antiguo territorio aónikenk (tehuelche), el poblado tomó impulso en el siglo XX como apoyo a estancias ovejeras y, desde 1927, creció de la mano del turismo. Debe su nombre al calafate, arbusto espinoso de bayas azules y leyenda sureña. Hoy la ciudad vive del turismo de naturaleza y servicios ligados a los glaciares: desde aquí se accede a las pasarelas del Perito Moreno —un gigante vivo del Hielo Patagónico Sur, famoso por sus crujidos y desprendimientos— y a las navegaciones por Punta Bandera hacia los frentes Upsala y Spegazzini. Completa la experiencia el Glaciarium (museo del hielo) y la Reserva Laguna Nimez, con flamencos y aves patagónicas. Vientos amplios, luz diáfana y el pulso de los glaciares definen el carácter de esta puerta meridional a los Andes.',
      }
    },
    imageKey: 'DESTINATIONS.EL_CALAFATE',
    active: true,
    featured: true,
    lat: -50.3379,
    lng: -72.2648,
  },
  {
    id: 'el-chalten',
    slug: 'el-chalten',
    country: 'argentina',
    content: {
      es: {
        name: 'El Chaltén',
        description: 'Capital del trekking argentino, El Chaltén se encarama en la confluencia de los ríos De las Vueltas y Fitz Roy, dentro del Parque Nacional Los Glaciares. Nació en 1985 como puesto fronterizo y hoy late al ritmo de sus senderos: bosques de lenga, agujas de granito (Fitz Roy y Cerro Torre) y glaciares colgantes. Todo empieza caminando desde el mismo pueblo: huellas bien señalizadas, miradores a tiro de paso y cielos cambiantes que obligan a ir por capas. Viento, luz limpia y cervezas artesanas al regreso definen su encanto.',
      }
    },
    imageKey: 'DESTINATIONS.ELCHALTEN',
    active: true,
    featured: false,
    lat: -49.3315,
    lng: -72.886,
  },
  {
    id: 'iguazu',
    slug: 'iguazu',
    country: 'argentina',
    content: {
      es: {
        name: 'Iguazú',
        description: 'En el extremo nordeste de Argentina, donde confluyen los ríos Iguazú y Paraná, se levanta Puerto Iguazú, ciudad fronteriza con Brasil y Paraguay. Su origen se remonta a principios del siglo XX, cuando misioneros y pioneros comenzaron a asentarse en esta tierra subtropical habitada ancestralmente por los guaraníes. Rodeada de selva, es la base ideal para visitar el Parque Nacional Iguazú, declarado Patrimonio de la Humanidad y hogar de una de las siete maravillas naturales del mundo: las cataratas. Más de 250 saltos de agua, entre ellos la majestuosa Garganta del Diablo, ofrecen un espectáculo de niebla y arcoíris inolvidable. Además de la naturaleza, Iguazú invita a descubrir la cultura misionera y guaraní, con su gastronomía marcada por la yerba mate, el pescado de río y la influencia de las tres fronteras. Una ciudad cálida y colorida, donde la selva y el agua definen cada experiencia.',
      }
    },
    imageKey: 'DESTINATIONS.IGUAZU',
    active: true,
    featured: true,
    lat: -25.6953,
    lng: -54.4367,
  },
  {
    id: 'jujuy',
    slug: 'jujuy',
    country: 'argentina',
    content: {
      es: {
        name: 'Jujuy',
        description: 'San Salvador de Jujuy, capital de la provincia más norteña de Argentina, es una ciudad compacta y tranquila que sirve de base para explorar uno de los paisajes más singulares del país. A pocos kilómetros, la Quebrada de Humahuaca —declarada Patrimonio de la Humanidad por la UNESCO— despliega un corredor de montañas ocres, rojas y violetas habitado desde hace más de diez mil años, con pueblos como Purmamarca, Tilcara, Humahuaca y Uquía jalonando la ruta. Las ruinas prehispánicas de Pucará de Tilcara, las iglesias coloniales de adobe y los mercados artesanales definen el carácter de la quebrada. Más arriba, en el altiplano, las Salinas Grandes ofrecen una extensión de sal blanca a 3.450 metros de altitud, y la Laguna de los Pozuelos acoge flamencos y aves del altiplano. La gastronomía jujeña, con el locro, la humita y el charqui, refleja una identidad andina que lleva siglos presente en estas tierras.',
      }
    },
    imageKey: 'DESTINATIONS.JUJUY',
    active: true,
    featured: false,
    lat: -24.1858,
    lng: -65.2995,
  },
  {
    id: 'mendoza',
    slug: 'mendoza',
    country: 'argentina',
    content: {
      es: {
        name: 'Mendoza',
        description: 'Mendoza es la capital vitivinícola de Argentina y una de las ciudades más agradables del país. Fundada en 1561 y reconstruida tras el terremoto de 1861, tiene un trazado urbano generoso, con amplias avenidas arboladas y acequias que la recorren. A sus espaldas, la Cordillera de los Andes con el Aconcagua —el pico más alto del hemisferio occidental, con 6.961 metros— define el paisaje y el carácter de la región. Los viñedos se extienden por los departamentos de Maipú, Luján de Cuyo y el Valle de Uco, donde la altitud y la aridez del clima producen algunos de los mejores malbecs del mundo. Las bodegas combinan producción, arquitectura y gastronomía, y muchas ofrecen visitas y alojamiento. Además del vino, Mendoza es base para el trekking y el andinismo en la cordillera, el rafting en el río Mendoza y, en invierno, el esquí en Las Leñas y Los Penitentes. Una ciudad que combina bien naturaleza, gastronomía y cultura del vino.',
      }
    },
    imageKey: 'DESTINATIONS.MENDOZA',
    active: true,
    featured: true,
    lat: -32.8895,
    lng: -68.8458,
  },
  {
    id: 'puerto-madryn',
    slug: 'puerto-madryn',
    country: 'argentina',
    content: {
      es: {
        name: 'Puerto Madryn',
        description: 'Puerto Madryn, en la provincia de Chubut, es la puerta de entrada a la Península Valdés y uno de los mejores destinos de Sudamérica para el avistamiento de fauna marina. Sus amplias playas, el ambiente patagónico y la tranquilidad del Golfo Nuevo crean un escenario ideal para disfrutar del mar y la naturaleza.\nDesde aquí parten las navegaciones para observar la ballena franca austral en temporada, así como excursiones para conocer colonias de lobos y elefantes marinos, pingüinos de Magallanes y una enorme diversidad de aves.\nEs una ciudad auténtica y acogedora, perfecta para pasear, disfrutar de buena gastronomía y vivir algunos de los encuentros con fauna salvaje más emocionantes del viaje.',
      }
    },
    imageKey: 'DESTINATIONS.PUERTO_MADRYN',
    active: true,
    featured: false,
    lat: -42.7682,
    lng: -65.0333,
  },
  {
    id: 'purmamarca',
    slug: 'purmamarca',
    country: 'argentina',
    content: {
      es: {
        name: 'Purmamarca',
        description: 'Purmamarca es un pequeño pueblo de adobe al pie del Cerro de los Siete Colores, en la Quebrada de Humahuaca. Sus calles de tierra, la iglesia de Santa Rosa de Lima del siglo XVII y el mercado artesanal en la plaza conforman un conjunto que ha cambiado poco en siglos. El cerro, con sus capas de roca en ocre, amarillo, verde, rojo y morado, se puede rodear en un paseo de cuarenta minutos por el camino del Colorao. A 65 kilómetros al oeste, la ruta asciende hasta las Salinas Grandes, a 3.450 metros. Purmamarca se visita habitualmente como etapa entre Jujuy y Tilcara, aunque merece una noche para verla tranquila, antes de que lleguen los grupos del día.',
      }
    },
    imageKey: 'DESTINATIONS.PURMAMARCA',
    active: true,
    featured: false,
    lat: -23.7414,
    lng: -65.5019,
  },
  {
    id: 'salta',
    slug: 'salta',
    country: 'argentina',
    content: {
      es: {
        name: 'Salta',
        description: 'Salta es una de las ciudades más singulares del noroeste argentino, conocida como "La Linda" por la belleza de su centro histórico colonial. Fundada en 1582 a orillas del río Arias, conserva una arquitectura de los siglos XVII y XVIII especialmente bien preservada, con la Plaza 9 de Julio como epicentro: la Catedral Basílica, el Cabildo y los edificios de fachadas rosas que la rodean conforman uno de los conjuntos coloniales más cuidados del país.\nMás allá del casco urbano, Salta es la puerta de entrada a paisajes de una diversidad extraordinaria. A pocos kilómetros, la Quebrada de Humahuaca despliega montañas de colores ocres, rojos y violetas que cambian con la luz del día. Las Salinas Grandes ofrecen una extensión blanca casi irreal a 3.450 metros de altitud. El pueblo de Purmamarca, con su cerro de siete colores, y Cafayate, rodeado de viñedos de altura donde se produce el torrontés, completan un entorno de una riqueza visual difícil de igualar.\nLa gastronomía salteña tiene identidad propia: el locro, las empanadas al horno de barro y el cordero a las brasas son protagonistas de una cocina de raíz andina que se mezcla con influencias criollas. Y el Tren a las Nubes, que asciende hasta los 4.220 metros cruzando viaductos y paisajes de puna, sigue siendo una de las experiencias ferroviarias más impresionantes de América del Sur.\nUna ciudad con carácter, rodeada de naturaleza y cultura, que combina bien con casi cualquier itinerario por el norte argentino.',
      }
    },
    imageKey: 'DESTINATIONS.SALTA',
    active: true,
    featured: true,
    lat: -24.7884,
    lng: -65.4116,
  },
  {
    id: 'san-martin-de-los-andes',
    slug: 'san-martin-de-los-andes',
    country: 'argentina',
    content: {
      es: {
        name: 'San Martín de los Andes',
        description: 'San Martín de los Andes es una ciudad lacustre en la orilla del lago Lácar, dentro del Parque Nacional Lanín, en la Patagonia andina neuquina. Más tranquila y menos masificada que Bariloche, tiene un centro compacto con arquitectura de madera, buena gastronomía y una oferta de actividades al aire libre durante todo el año: trekking, kayak y pesca en verano; esquí en el cerro Chapelco en invierno. Es el punto de partida de la Ruta de los Siete Lagos, que bordea lagos y bosques de araucarias y lengas hasta Bariloche a lo largo de 110 kilómetros. El volcán Lanín, con sus 3.776 metros de cono nevado, domina el paisaje al norte y es uno de los destinos de andinismo más accesibles de la Patagonia.',
      }
    },
    imageKey: 'DESTINATIONS.SANMARTIN',
    active: true,
    featured: false,
    lat: -40.1541,
    lng: -71.3411,
  },
  {
    id: 'tucuman',
    slug: 'tucuman',
    country: 'argentina',
    content: {
      es: {
        name: 'San Miguel de Tucumán',
        description: 'San Miguel de Tucumán es la ciudad más poblada del noroeste argentino y un nodo histórico y cultural de la región. Aquí se declaró la independencia argentina el 9 de julio de 1816, en la Casa Histórica que hoy es museo y referencia ineludible de la ciudad. Tucumán es también la capital azucarera del país: los cañaverales dominan el paisaje de la llanura circundante y la agroindustria define su economía. La ciudad tiene una vida urbana activa, con una buena escena gastronómica y una arquitectura de fines del XIX y principios del XX que merece un paseo por el centro. Es además la puerta de entrada a las Yungas, la selva subtropical de montaña que cubre las laderas orientales de los Andes, y punto de paso habitual en los itinerarios por el norte argentino entre Salta y el sur.',
      }
    },
    imageKey: 'DESTINATIONS.TUCUMAN',
    active: true,
    featured: false,
    lat: -26.8083,
    lng: -65.2176,
  },
  {
    id: 'ushuaia',
    slug: 'ushuaia',
    country: 'argentina',
    content: {
      es: {
        name: 'Ushuaia',
        description: 'Puerta fueguina al Canal Beagle, Ushuaia se recuesta entre el mar y la Sierra del Martial, en uno de los extremos habitados más australes del planeta. Sus primeros pobladores fueron los yámanas (yaganes); a fines del siglo XIX llegaron misioneros y colonos, y el histórico Presidio —cuyos reclusos levantaron calles y muelles— marcó el despegue urbano. Hoy la ciudad combina turismo de naturaleza, actividad portuaria y logística antártica, además de pesca y servicios. Bosques de lenga y coihue, turberas y picos nevados rodean el Parque Nacional Tierra del Fuego, ideal para trekking y canoas; desde el puerto parten navegaciones por islas del Beagle hacia colonias de lobos marinos, cormoranes y, en temporada, pingüinos. Muy cerca, Puerto Almanza ofrece su ritmo pesquero y la célebre centolla con vistas al canal. Vientos fríos, cielos cambiantes y la unión de cordillera y océano definen el carácter único del llamado “Fin del Mundo”.',
      }
    },
    imageKey: 'DESTINATIONS.USHUAIA',
    active: true,
    featured: true,
    lat: -54.8019,
    lng: -68.303,
  },
  // ── Bolivia ──────────────────────────────────────────────────────────────────
  {
    id: 'copacabana',
    slug: 'copacabana',
    country: 'bolivia',
    content: {
      es: {
        name: 'Copacabana',
        description: 'Copacabana es un pueblo a orillas del Lago Titicaca, en la frontera con Perú, y el principal destino boliviano del lago. Su basílica del siglo XVI, que alberga la Virgen de Copacabana — patrona de Bolivia —, es lugar de peregrinación y da al pueblo un ambiente tranquilo y recogido. Desde el puerto parten las embarcaciones hacia la Isla del Sol, donde la tradición andina sitúa el origen del Imperio Inca y el nacimiento de Manco Cápac y Mama Ocllo. La isla, sin coches ni carreteras, se recorre a pie entre ruinas incas, comunidades quechuas y vistas sobre el lago a 3.800 metros. Copacabana se visita habitualmente como etapa entre La Paz y Puno, en Perú, y combina bien con una noche en la Isla del Sol para verla tranquila antes de que lleguen los grupos del día.',
      }
    },
    imageKey: 'DESTINATIONS.COPACABANA',
    active: true,
    featured: true,
    lat: -16.1669,
    lng: -69.0854,
  },
  {
    id: 'isla-del-sol',
    slug: 'isla-del-sol',
    country: 'bolivia',
    content: {
      es: {
        name: 'Isla del Sol',
        description: 'La mayor isla del Lago Titicaca, a 3.800 metros de altitud, sin carreteras ni vehículos. La tradición andina sitúa aquí el origen del Imperio Inca y el nacimiento de Manco Cápac y Mama Ocllo. Sus senderos conectan los sitios arqueológicos de Pilkokaina —antiguo palacio inca— y Chinkana, con vistas sobre el lago en todas las direcciones. Se llega en barca desde Copacabana en unos noventa minutos.',
      }
    },
    imageKey: 'DESTINATIONS.ISLA_DEL_SOL',
    active: true,
    featured: false,
    lat: -16.023,
    lng: -69.162,
  },
  {
    id: 'la-paz',
    slug: 'la-paz',
    country: 'bolivia',
    content: {
      es: {
        name: 'La Paz',
        description: 'La Paz es la sede de gobierno de Bolivia y la capital administrativa más alta del mundo, con su centro a 3.650 metros de altitud. La ciudad se asienta en un cañón excavado por el río Choqueyapu, rodeada del altiplano y con el nevado Illimani —de casi 6.500 metros— como telón de fondo permanente. En el borde del altiplano, a más de 4.000 metros, se extiende El Alto, ciudad autónoma de más de un millón de habitantes que domina La Paz desde arriba y concentra una de las ferias comerciales más grandes del continente, la Feria 16 de Julio. El teleférico que conecta ambas ciudades es transporte público y mirador al mismo tiempo. El Mercado de las Brujas, la calle Jaén con sus museos coloniales, la plaza Murillo y el Mercado Rodríguez concentran la vida del centro histórico. El barrio de Sopocachi tiene la mejor oferta gastronómica y de ocio. A 45 minutos, el Valle de la Luna ofrece un paisaje de erosión arcillosa de aspecto casi lunar. La Paz es también el punto de partida hacia el Lago Titicaca y Copacabana, hacia los Yungas y hacia Rurrenabaque y el Amazonas boliviano.',
      }
    },
    imageKey: 'DESTINATIONS.LA_PAZ',
    active: true,
    featured: true,
    lat: -16.4897,
    lng: -68.1193,
  },
  {
    id: 'ojo-de-perdiz',
    slug: 'ojo-de-perdiz',
    country: 'bolivia',
    content: {
      es: {
        name: 'Ojo de Perdiz',
        description: 'Zona de alojamiento en el altiplano boliviano del Lípez, a unos 4.500 metros de altitud. El hotel Tayka del Desierto, construido con materiales del entorno, sirve de base para las jornadas por la Reserva Nacional Eduardo Avaroa: las lagunas de colores, los géiseres del Sol de Mañana y el volcán Ollagüe. Un punto de paso entre el Salar de Uyuni y las lagunas del sur boliviano, sin pueblo ni servicios fuera del alojamiento.',
      }
    },
    imageKey: 'DESTINATIONS.OJO_DE_PERDIZ',
    active: true,
    featured: false,
    lat: -22.6,
    lng: -67.7,
  },
  {
    id: 'potosi',
    slug: 'potosi',
    country: 'bolivia',
    content: {
      es: {
        name: 'Potosí',
        description: 'Potosí es una de las ciudades más singulares de América del Sur, declarada Patrimonio de la Humanidad por la UNESCO. Fundada en 1546 al pie del Cerro Rico, a 4.090 metros de altitud, fue durante dos siglos una de las ciudades más pobladas y ricas del mundo gracias a sus minas de plata, que financiaron en gran medida el Imperio español. El Cerro Rico, visible desde cualquier punto de la ciudad con su forma cónica característica, sigue siendo explotado hoy por cooperativas mineras y puede visitarse en una excursión guiada que muestra las condiciones de trabajo actuales — una experiencia dura e impactante que no deja indiferente a nadie. El centro histórico conserva una arquitectura barroca mestiza de gran riqueza: la Casa de la Moneda, donde se acuñó gran parte de la plata del virreinato, es el museo más importante de la ciudad. Potosí se visita habitualmente combinada con Sucre y como etapa en los circuitos por el sur de Bolivia.',
      }
    },
    imageKey: 'DESTINATIONS.POTOSI',
    active: true,
    featured: true,
    lat: -19.5836,
    lng: -65.7531,
  },
  {
    id: 'san-pedro-quemez',
    slug: 'san-pedro-quemez',
    country: 'bolivia',
    content: {
      es: {
        name: 'San Pedro de Quemez',
        description: 'Pequeño pueblo del altiplano boliviano a 3.700 metros de altitud, cerca del límite con Chile. El nombre hace referencia a un episodio de la Guerra del Pacífico del siglo XIX, del que quedan vestigios visibles. Es el último punto habitado antes de entrar en la Reserva Eduardo Avaroa y sirve de alojamiento para los circuitos por el sur boliviano.',
      }
    },
    imageKey: 'DESTINATIONS.SAN_PEDRO_QUEMEZ',
    active: true,
    featured: false,
    lat: -21.72,
    lng: -67.53,
  },
  {
    id: 'santa-cruz',
    slug: 'santa-cruz',
    country: 'bolivia',
    content: {
      es: {
        name: 'Santa Cruz de la Sierra',
        description: 'Santa Cruz de la Sierra es la ciudad más grande y dinámica de Bolivia, centro económico del país y capital del departamento del mismo nombre en las tierras bajas del oriente boliviano. A diferencia de La Paz o Sucre, Santa Cruz es una ciudad moderna y de rápido crecimiento, con una economía basada en la agroindustria, el gas y el comercio. Su clima tropical, su gastronomía y su ambiente nocturno la diferencian del resto del país. El centro histórico, con la plaza 24 de Septiembre y la catedral, conserva cierto aire colonial aunque la ciudad ha crecido en anillos concéntricos que se alejan del centro. Para el viajero, Santa Cruz es principalmente un nodo logístico: desde aquí se accede a las Misiones Jesuíticas de Chiquitos — un conjunto de iglesias barrocas en pueblos remotos declaradas Patrimonio de la Humanidad — y a la Chiquitanía, uno de los territorios menos visitados y más interesantes de Bolivia. Es también punto de entrada al Amazonas boliviano y a los parques naturales del oriente.',
      }
    },
    imageKey: 'DESTINATIONS.SANTACRUZ',
    active: true,
    featured: true,
    lat: -17.7863,
    lng: -63.1812,
  },
  {
    id: 'sucre',
    slug: 'sucre',
    country: 'bolivia',
    content: {
      es: {
        name: 'Sucre',
        description: "Sucre es la capital constitucional de Bolivia y una de las ciudades coloniales mejor conservadas de América del Sur, declarada Patrimonio de la Humanidad por la UNESCO en 1991. Su centro histórico, con edificios de cal blanca, conventos, iglesias barrocas y plazas porticadas, mantiene una coherencia arquitectónica poco habitual. Fundada en 1538 como La Plata, fue durante siglos el centro político y religioso del Alto Perú gracias a la riqueza de las minas de Potosí. La Casa de la Libertad, donde se firmó la independencia boliviana en 1825, y el Museo de Arte Indígena ASUR, con su extraordinaria colección de tejidos jalq'a y tarabuco, son visitas imprescindibles. La universidad, fundada en 1624 y una de las más antiguas del continente, le da a la ciudad un ambiente universitario y cosmopolita que contrasta con su aire colonial. El mercado central y los alrededores de la plaza 25 de Mayo concentran la vida cotidiana. Sucre se visita bien combinada con Potosí, a tres horas, y es uno de los destinos más agradables de Bolivia por su clima templado y su ritmo tranquilo.",
      }
    },
    imageKey: 'DESTINATIONS.SUCRE',
    active: true,
    featured: true,
    lat: -19.0196,
    lng: -65.2619,
  },
  {
    id: 'uyuni',
    slug: 'uyuni',
    country: 'bolivia',
    content: {
      es: {
        name: 'Salar de Uyuni',
        description: 'El Salar de Uyuni es la mayor extensión de sal del mundo, con más de 10.000 kilómetros cuadrados a 3.656 metros de altitud en el altiplano boliviano. Formado hace unos 40.000 años por la evaporación de un lago prehistórico, su superficie blanca y casi perfectamente plana crea efectos ópticos que en temporada de lluvias, cuando una fina capa de agua lo cubre, producen el espejo natural más grande del planeta. En el centro del salar, la Isla Incahuasi alberga cactus gigantes de hasta diez metros y ofrece perspectivas sobre la extensión blanca en todas las direcciones. Los circuitos por el salar se combinan habitualmente con la Reserva Eduardo Avaroa, en el sur del altiplano: lagunas de colores — la Laguna Colorada con sus flamencos, la Laguna Verde al pie del volcán Licancabur — géiseres, campos de piedra pómez y volcanes que superan los 5.000 metros. La base de operaciones es el pueblo de Uyuni, aunque muchos circuitos de tres días arrancan directamente hacia el sur desde la ciudad de Tupiza.',
      }
    },
    imageKey: 'DESTINATIONS.UYUNI',
    active: true,
    featured: true,
    lat: -20.1338,
    lng: -67.4891,
  },
  // ── Chile ────────────────────────────────────────────────────────────────────
  {
    id: 'arica',
    slug: 'arica',
    country: 'chile',
    content: {
      es: {
        name: 'Arica',
        description: "Arica es la ciudad más septentrional de Chile, en el extremo del desierto de Atacama junto a la frontera con Perú y Bolivia. Ciudad portuaria con un clima benigno todo el año, es conocida como 'la ciudad de la eterna primavera' por sus temperaturas suaves y la ausencia casi total de lluvia. El Morro de Arica, un cerro escarpado sobre el puerto, es el símbolo de la ciudad y escenario de la batalla de 1880 durante la Guerra del Pacífico. La iglesia de San Marcos, diseñada por Gustavo Eiffel, y el Museo de San Miguel de Azapa, con su colección de momias chinchorro de más de siete mil años de antigüedad, son sus principales atractivos culturales. Arica es también punto de paso hacia el Altiplano chileno — el Parque Nacional Lauca y Parinacota y el lago Chungará, a 4.500 metros — y conexión habitual con Tacna en Perú y con La Paz en Bolivia.",
      }
    },
    imageKey: 'DESTINATIONS.ARICA',
    active: true,
    featured: false,
    lat: -18.4783,
    lng: -70.3126,
  },
  {
    id: 'balmaceda',
    slug: 'balmaceda',
    country: 'chile',
    content: {
      es: {
        name: 'Balmaceda',
        description: 'Balmaceda es una pequeña localidad en la Patagonia chilena cuya relevancia para el viajero es su aeropuerto, el principal punto de entrada aéreo a la Carretera Austral desde Santiago. Desde aquí se organizan los traslados hacia Coyhaique, a 55 kilómetros, que es la base de operaciones de la región de Aysén.',
      }
    },
    imageKey: 'DESTINATIONS.BALMACEDA',
    active: true,
    featured: false,
    lat: -45.9161,
    lng: -71.6894,
  },
  {
    id: 'coyahique',
    slug: 'coyahique',
    country: 'chile',
    content: {
      es: {
        name: 'Coyahique',
        description: 'Coyhaique es la capital de la región de Aysén y la ciudad más grande de la Carretera Austral, con unos 60.000 habitantes. Centro de servicios y abastecimiento para quienes recorren la carretera, tiene una vida urbana activa y una oferta gastronómica y de alojamiento que la convierte en la base natural para explorar la región. Los alrededores ofrecen pesca con mosca en el río Simpson, trekking en la Reserva Nacional Coyhaique y acceso a la Laguna San Rafael y sus glaciares. El Parque Nacional Patagonia, uno de los proyectos de conservación más ambiciosos del continente, impulsado por Tompkins Conservation, está a unas horas al sur y es uno de los grandes atractivos de la región para el turismo de naturaleza.',
      }
    },
    imageKey: 'DESTINATIONS.COYAHIQUE',
    active: true,
    featured: false,
    lat: -45.5752,
    lng: -72.0662,
  },
  {
    id: 'isla-pascua',
    slug: 'isla-pascua',
    country: 'chile',
    content: {
      es: {
        name: 'Isla de Pascua (Rapa Nui)',
        description: 'A 3.700 kilómetros de la costa chilena, en mitad del Pacífico Sur, Rapa Nui es uno de los lugares habitados más alejados del planeta. La isla, de origen volcánico, fue colonizada por navegantes polinesios entre los siglos IV y VIII, y durante siglos desarrolló una civilización propia cuya expresión más visible son los moáis: estatuas de piedra volcánica de hasta 20 toneladas, distribuidas por toda la isla y orientadas hacia el interior, hacia los ancestros. El Parque Nacional Rapa Nui, que cubre casi la mitad de la isla, protege los principales yacimientos: Ahu Tongariki, con sus quince moáis restaurados frente al mar, la cantera del Rano Raraku, donde se tallaban las figuras, y Anakena, la única playa de arena blanca de la isla. Hanga Roa, la única localidad, concentra alojamiento, restaurantes y el Museo Antropológico Sebastián Englert. La isla se puede recorrer en coche, bicicleta o en excursiones guiadas, dedicando al menos tres días. Se llega en vuelo directo desde Santiago en unas cinco horas',
      }
    },
    imageKey: 'DESTINATIONS.ISLA_PASCUA',
    active: true,
    featured: true,
    lat: -27.1127,
    lng: -109.3497,
  },
  {
    id: 'pucon',
    slug: 'pucon',
    country: 'chile',
    content: {
      es: {
        name: 'Pucón',
        description: 'Pucón es el pueblo de referencia del turismo de aventura en el sur de Chile, a orillas del lago Villarrica y bajo la sombra del volcán activo del mismo nombre. Su calle principal concentra agencias de excursiones, equipamiento outdoor y una buena oferta gastronómica para ser un pueblo pequeño. El ascenso al volcán Villarrica, con sus 2.847 metros y el cráter humeante en la cima, es la actividad más demandada y requiere guía obligatorio. Los alrededores ofrecen rafting en el río Trancura, termas naturales en el bosque, trekking en el Parque Nacional Huerquehue — con sus lagunas de altura y bosques de araucarias milenarias — y la Reserva Privada del Cañi, un refugio de bosque valdiviano poco transitado y especialmente interesante para quienes buscan naturaleza sin aglomeraciones. Pucón se visita bien combinado con Puerto Varas al sur o como etapa en la ruta entre Santiago y la Patagonia.',
      }
    },
    imageKey: 'DESTINATIONS.PUCON',
    active: true,
    featured: false,
    lat: -39.2729,
    lng: -71.9782,
  },
  {
    id: 'puerto-montt',
    slug: 'puerto-montt',
    country: 'chile',
    content: {
      es: {
        name: 'Puerto Montt',
        description: 'Puerto Montt es la capital de la región de Los Lagos y el nodo logístico del sur de Chile. Ciudad portuaria y comercial, no es un destino en sí mismo pero sí un punto de paso inevitable: desde aquí parte la Carretera Austral hacia el sur, arrancan los ferries hacia Chiloé y las naveras que cubren los fiordos patagónicos hasta Puerto Natales. El mercado de Angelmó, junto al puerto, es uno de los mercados de mariscos más conocidos del país y merece una parada. La mayoría de los viajeros combinan Puerto Montt con Puerto Varas, a 20 kilómetros, que ofrece más carácter y mejor base para explorar la zona. Para quien continúa hacia la Carretera Austral, Puerto Montt es el punto de abastecimiento antes de adentrarse en uno de los territorios más remotos de América del Sur.',
      }
    },
    imageKey: 'DESTINATIONS.PUERTOMONTT',
    active: true,
    featured: false,
    lat: -41.4717,
    lng: -72.9371,
  },
  {
    id: 'puerto-natales',
    slug: 'puerto-natales',
    country: 'chile',
    content: {
      es: {
        name: 'Puerto Natales',
        description: 'Puerto Natales es una ciudad pequeña a orillas del Seno Última Esperanza, en la Patagonia chilena, y la puerta de entrada al Parque Nacional Torres del Paine. En las últimas décadas ha pasado de ser un pueblo ganadero y pesquero a convertirse en uno de los centros de turismo de naturaleza más activos del extremo sur del continente. Su oferta de alojamiento, restaurantes y equipamiento outdoor es notable para su tamaño, y la mayoría de los viajeros pasan aquí al menos una noche antes y después del parque. Desde Puerto Natales parten también las navegaciones por los fiordos patagónicos: el ferry de Navimag conecta con Puerto Montt a lo largo de tres días entre canales, glaciares y paisaje austral. El Monumento Natural Cueva del Milodón, a pocos kilómetros, conserva los restos del perezoso gigante prehistórico que habitó la Patagonia hace más de diez mil años. Una ciudad con carácter austral, tranquila fuera de temporada y muy activa entre noviembre y marzo.',
      }
    },
    imageKey: 'DESTINATIONS.PUERTONATALES',
    active: true,
    featured: true,
    lat: -51.7309,
    lng: -72.4976,
  },
  {
    id: 'puerto-varas',
    slug: 'puerto-varas',
    country: 'chile',
    content: {
      es: {
        name: 'Puerto Varas',
        description: 'Puerto Varas es una ciudad lacustre a orillas del Lago Llanquihue, en la región de Los Lagos, con el volcán Osorno como telón de fondo permanente. Fundada por colonos alemanes a mediados del siglo XIX, conserva una arquitectura de madera con influencia centroeuropea visible en sus casonas, iglesias y la cultura local de la cerveza artesanal y la repostería. Es el centro de operaciones natural del Lake District chileno: desde aquí se accede al Parque Nacional Vicente Pérez Rosales, el más antiguo de Chile, con los saltos del Petrohué y la navegación por el lago Todos los Santos hacia el volcán Puntiagudo. El volcán Osorno, con su cono nevado casi perfecto, se puede ascender en verano y esquiar en invierno. Puerto Varas es también el punto de partida del cruce lacustre a Bariloche, una ruta de lagos, volcanes y bosques que combina navegación y bus a lo largo de dos días. Una ciudad con carácter propio que combina bien con Pucón al norte o con la Carretera Austral al sur.',
      }
    },
    imageKey: 'DESTINATIONS.PUERTOVARAS',
    active: true,
    featured: true,
    lat: -41.3195,
    lng: -72.9876,
  },
  {
    id: 'punta-arenas',
    slug: 'punta-arenas',
    country: 'chile',
    content: {
      es: {
        name: 'Punta Arenas',
        description: 'Punta Arenas es la ciudad más austral del mundo con más de 100.000 habitantes, situada a orillas del Estrecho de Magallanes en la Patagonia chilena. Fundada en 1848 como colonia penal y punto estratégico en la ruta entre los océanos Atlántico y Pacífico, creció con fuerza a fines del XIX gracias a la ganadería ovina y al comercio marítimo, lo que dejó una arquitectura de mansiones y palacios que contrasta con el paisaje austral. El Cementerio Municipal, con sus cipreses y mausoleos de familias inmigrantes croatas, británicas y españolas, es uno de los más singulares del continente. Desde Punta Arenas parten los ferries hacia Tierra del Fuego y las navegaciones hacia la Antártida en temporada. El Monumento Natural Los Pingüinos, en la isla Magdalena, acoge una colonia de más de 60.000 pingüinos de Magallanes visitables entre octubre y marzo. Es también la base de operaciones para acceder a Torres del Paine junto con Puerto Natales, y el punto de conexión con Ushuaia al otro lado de la frontera.',
      }
    },
    imageKey: 'DESTINATIONS.PUNTAARENAS',
    active: true,
    featured: true,
    lat: -53.1638,
    lng: -70.9171,
  },
  {
    id: 'san-pedro-atacama',
    slug: 'san-pedro-atacama',
    country: 'chile',
    content: {
      es: {
        name: 'San Pedro de Atacama',
        description: 'San Pedro de Atacama es un pueblo de adobe en el corazón del desierto más árido del mundo, a 2.436 metros de altitud en el norte de Chile. Su calle principal, con hostales, restaurantes y agencias de excursiones, concentra una actividad turística intensa que contrasta con la quietud del entorno. Desde aquí se organizan todas las excursiones al Atacama: los géiseres del Tatio al amanecer, la Laguna Cejar y las lagunas altiplánicas de Miscanti y Miñiques, el Valle de la Luna con sus formaciones de sal y arcilla, el salar de Atacama con sus flamencos y la reserva de vicuñas. Los cielos del Atacama, con la menor contaminación lumínica del planeta, han convertido la zona en uno de los mejores destinos de astronomía del mundo, con varios observatorios abiertos al público. San Pedro requiere al menos tres días para hacer justicia a su entorno, y conviene reservar las excursiones con antelación en temporada alta. La altitud y la intensidad del sol exigen hidratación constante y protección.',
      }
    },
    imageKey: 'DESTINATIONS.SAN_PEDRO_ATACAMA',
    active: true,
    featured: true,
    lat: -22.9087,
    lng: -68.2003,
  },
  {
    id: 'santiago-chile',
    slug: 'santiago-chile',
    country: 'chile',
    content: {
      es: {
        name: 'Santiago de Chile',
        description: 'Fundada en 1541 por Pedro de Valdivia en un valle entre la Cordillera de los Andes y la Cordillera de la Costa, Santiago es una metrópolis moderna de más de siete millones de habitantes que ha perdido gran parte de su patrimonio colonial por terremotos e incendios, pero que tiene una vida urbana intensa y una oferta cultural, gastronómica y de ocio que sorprende a quien llega con expectativas bajas. El cerro Santa Lucía y el cerro San Cristóbal ofrecen perspectivas sobre la ciudad y, en días despejados, vistas a la cordillera nevada. El barrio Lastarria, Bellavista y el Mercado Central concentran la mejor oferta gastronómica; el Museo Chileno de Arte Precolombino y el Museo de la Memoria merecen una visita. Los viñedos del Maipo están a menos de una hora, las playas de Viña del Mar y Valparaíso a menos de dos, y las pistas de esquí del Colorado y Valle Nevado a poco más de una hora en coche. Santiago funciona bien como puerta de entrada a Chile y como destino en sí mismo para una o dos noches.',
      }
    },
    imageKey: 'DESTINATIONS.SANTIAGO',
    active: true,
    featured: true,
    lat: -33.4569,
    lng: -70.6483,
  },
  {
    id: 'torres-del-paine',
    slug: 'torres-del-paine',
    country: 'chile',
    content: {
      es: {
        name: 'Torres del Paine',
        description: 'En el corazón de la Patagonia chilena, el Parque Nacional Torres del Paine reúne en poco más de 180.000 hectáreas glaciares, lagos, ríos, estepa y bosque valdiviano. El macizo del Paine —con sus torres de granito y los Cuernos como siluetas reconocibles— domina un paisaje que cambia de color y carácter con cada hora del día. Declarado Reserva de la Biosfera por la UNESCO, el parque es territorio de guanacos, cóndores y pumas que conviven con los senderistas en los senderos más frecuentados de la Patagonia. El Trekking W y el Circuito O son las rutas clásicas, con refugios y camping en el interior; el Glaciar Grey se puede visitar a pie o en kayak. La base de operaciones es Puerto Natales, a unas dos horas, donde se concentran alojamientos, equipamiento y logística. El tiempo aquí es protagonista: viento, lluvia y sol pueden sucederse en pocas horas, y eso forma parte de la experiencia.',
      }
    },
    imageKey: 'DESTINATIONS.TORRES_DEL_PAINE',
    active: true,
    featured: true,
    lat: -51.0,
    lng: -73.0,
  },
  {
    id: 'valparaiso',
    slug: 'valparaiso',
    country: 'chile',
    content: {
      es: {
        name: 'Valparaiso',
        description: 'Valparaíso es una ciudad portuaria en la costa del Pacífico, a unos 120 kilómetros al noroeste de Santiago, declarada Patrimonio de la Humanidad por su arquitectura y su urbanismo singular. Construida sobre más de cuarenta cerros que caen directamente al mar, se recorre en ascensores centenarios —los famosos funiculares— y a pie por calles empinadas llenas de murales, escaleras y miradores. El plan, junto al puerto, conserva edificios de fines del XIX y principios del XX que reflejan la época en que Valparaíso fue el puerto más importante del Pacífico sur antes de la apertura del Canal de Panamá. Los cerros Alegre y Concepción concentran la mayor parte de la oferta turística: hostales, restaurantes, galerías y cafés en casas de madera de colores. Pablo Neruda vivió aquí y su casa, La Sebastiana, es hoy museo. Valparaíso se visita bien en combinación con Santiago, a menos de dos horas, o con las viñas del valle de Casablanca en el camino.',
      }
    },
    imageKey: 'DESTINATIONS.VALPARAISO',
    active: true,
    featured: false,
    lat: -33.0472,
    lng: -71.6127,
  },
  // ── Perú ─────────────────────────────────────────────────────────────────────
  {
    id: 'arequipa',
    slug: 'arequipa',
    country: 'peru',
    content: {
      es: {
        name: 'Arequipa',
        description: 'Arequipa es la segunda ciudad de Perú, a 2.335 metros de altitud en un valle andino del sur del país, con los volcanes Misti y Chachani como presencia constante en el horizonte. Construida en gran parte con sillar, una piedra volcánica blanca que le da nombre como la Ciudad Blanca, tiene un centro histórico declarado Patrimonio de la Humanidad con una arquitectura barroca mestiza de gran personalidad. El Convento de Santa Catalina, fundado en 1579 y durante siglos ciudad dentro de la ciudad con sus propias calles, plazas y jardines, es uno de los conjuntos religiosos más singulares de América del Sur. La Plaza de Armas, con la catedral y los portales de sillar, es el corazón de una ciudad que tiene además una escena gastronómica propia — el rocoto relleno, el adobo y el queso helado son especialidades locales — y una vida cultural activa. El Chachani, a 6.075 metros, es uno de los volcanes más accesibles del mundo para quienes quieran una cumbre de altura sin técnica de escalada. Arequipa es también el punto de partida habitual hacia el Cañón del Colca, a unas tres horas al norte.',
      }
    },
    imageKey: 'DESTINATIONS.AREQUIPA',
    active: true,
    featured: true,
    lat: -16.409,
    lng: -71.5375,
  },
  {
    id: 'canon-del-colca',
    slug: 'canon-del-colca',
    country: 'peru',
    content: {
      es: {
        name: 'Cañón del Colca',
        description: 'A unos 160 kilómetros al noreste de Arequipa, el Cañón del Colca es uno de los más profundos del mundo y uno de los paisajes más habitados y cultivados de los Andes. Sus laderas están cubiertas de andenes preincaicos que los pueblos collagua y cabana construyeron hace siglos y que aún se trabajan hoy. A lo largo del valle se suceden aldeas con iglesias coloniales de piedra volcánica, mercados y termas naturales. El Mirador Cruz del Cóndor, cerca de Cabanaconde, es el punto desde el que se observa el vuelo del cóndor andino, que aprovecha las corrientes térmicas del cañón. Se puede visitar en excursión de un día desde Arequipa o con una o dos noches en Chivay, con tiempo para bajar al fondo del cañón y subir de vuelta.',
      }
    },
    imageKey: 'DESTINATIONS.CANON_DEL_COLCA',
    active: true,
    featured: false,
    lat: -15.6462,
    lng: -71.8815,
  },
  {
    id: 'cusco',
    slug: 'cusco',
    country: 'peru',
    content: {
      es: {
        name: 'Cusco',
        description: 'Cusco fue la capital del Tawantinsuyu, el Imperio Inca, y sigue siendo el corazón histórico y cultural del Perú. A 3.400 metros de altitud en un valle andino, la ciudad combina dos capas de historia superpuestas: los muros de piedra inca, construidos con una técnica de ensamblaje sin mortero que ha resistido siglos de terremotos, sirven de base a iglesias y palacios coloniales españoles del siglo XVI. La Plaza de Armas, el Koricancha — antiguo templo del Sol convertido en convento de Santo Domingo — y el barrio de San Blas, con sus talleres de artesanos y calles empinadas, son los focos del centro histórico. El mercado de San Pedro es el más auténtico de la ciudad y un buen lugar para entender la vida cotidiana cusqueña. Cusco requiere al menos un día de aclimatación antes de hacer actividad física por la altitud, y merece dos o tres noches para recorrerla con calma antes de continuar hacia el Valle Sagrado o Machu Picchu. Es además la base de operaciones del Camino Inca y de las rutas de trekking hacia Choquequirao y la Amazonía.',
      }
    },
    imageKey: 'DESTINATIONS.CUSCO',
    active: true,
    featured: true,
    lat: -13.532,
    lng: -71.9675,
  },
  {
    id: 'lima',
    slug: 'lima',
    country: 'peru',
    content: {
      es: {
        name: 'Lima',
        description: 'Lima es la capital del Perú y una de las ciudades más grandes de América del Sur, con más de diez millones de habitantes en su área metropolitana. Fundada en 1535 por Francisco Pizarro a orillas del río Rímac, fue durante tres siglos la capital del Virreinato del Perú y el centro político y comercial de América del Sur. Su centro histórico, declarado Patrimonio de la Humanidad, conserva iglesias barrocas, conventos y palacios coloniales de gran riqueza, con la Plaza Mayor y el convento de San Francisco como referencias principales. Los barrios de Miraflores y Barranco, sobre los acantilados del Pacífico, concentran la mejor oferta gastronómica, hotelera y cultural de la ciudad. La cocina limeña, con su mezcla de influencias andinas, amazónicas, japonesas y españolas, ha situado a Lima entre las capitales gastronómicas más interesantes del mundo en las últimas décadas. El Museo Larco, con su colección de cerámica precolombina, y el Museo de la Nación son visitas imprescindibles. Lima funciona bien como puerta de entrada al país y merece al menos dos noches para hacer justicia a su oferta.',
      }
    },
    imageKey: 'DESTINATIONS.LIMA',
    active: true,
    featured: true,
    lat: -12.0464,
    lng: -77.0428,
  },
  {
    id: 'machu-picchu',
    slug: 'machu-picchu',
    country: 'peru',
    content: {
      es: {
        name: 'Machu Picchu',
        description: 'Machu Picchu es la ciudadela inca construida en el siglo XV en un filo de montaña a 2.430 metros, entre la cordillera andina y la selva alta. Declarada Patrimonio de la Humanidad y una de las Siete Maravillas del Mundo Moderno, es el yacimiento arqueológico más visitado de América del Sur. Sus terrazas, templos, fuentes y recintos de piedra encajan con una precisión que sigue sorprendiendo a ingenieros y arqueólogos. El acceso se hace desde Aguas Calientes —también llamada Machu Picchu Pueblo—, un pueblo encajonado entre montañas a orillas del río Urubamba, al que se llega en tren desde Cusco u Ollantaytambo. Desde allí, un autobús sube en veinte minutos hasta la puerta del parque arqueológico. La visita requiere entrada con horario reservado con antelación, y conviene dedicar al menos medio día, aunque quien pernocta en Aguas Calientes puede madrugar para entrar con la primera luz, antes de que lleguen los grupos. El Camino Inca, de cuatro días, es la otra forma de llegar: una ruta de trekking que culmina en la Puerta del Sol con vistas a la ciudadela.',
      }
    },
    imageKey: 'DESTINATIONS.MACHU_PICCHU',
    active: true,
    featured: true,
    lat: -13.1631,
    lng: -72.545,
  },
  {
    id: 'paracas',
    slug: 'paracas',
    country: 'peru',
    content: {
      es: {
        name: 'Paracas',
        description: 'En la costa desértica del Pacífico peruano, la Reserva Nacional de Paracas protege uno de los ecosistemas marinos más ricos del litoral sudamericano. Sus acantilados, playas de arena rojiza y aguas frías albergan colonias de lobos marinos, pingüinos de Humboldt y una gran variedad de aves costeras. Desde el puerto parten las embarcaciones hacia las Islas Ballestas, donde la fauna marina se puede observar de cerca. Paracas es también el punto de partida habitual para el sobrevuelo de las Líneas de Nazca, los geoglifos trazados en el desierto que solo se comprenden desde el aire. Un destino de naturaleza y misterio histórico a unas tres horas al sur de Lima.',
      }
    },
    imageKey: 'DESTINATIONS.PARACAS',
    active: true,
    featured: false,
    lat: -13.8315,
    lng: -76.2504,
  },
  {
    id: 'puno',
    slug: 'puno',
    country: 'peru',
    content: {
      es: {
        name: 'Puno',
        description: 'Capital del altiplano peruano a orillas del Lago Titicaca, Puno se asienta a 3.827 metros de altitud en una de las regiones más singulares del continente. Ciudad animada y comercial, es el centro cultural del altiplano andino y uno de los focos de la tradición musical y festiva del Perú: la Festividad de la Virgen de la Candelaria, cada febrero, es una de las celebraciones de danza y música más importantes de América del Sur. Desde el puerto parten las embarcaciones hacia las Islas Uros, construidas sobre totora flotante y habitadas desde tiempos preincaicos, y hacia la Isla Taquile, cuyos pobladores mantienen viva una tradición textil quechua reconocida por la UNESCO como Patrimonio Inmaterial de la Humanidad. El Lago Titicaca, compartido con Bolivia, es el lago navegable más alto del planeta y un espacio de enorme valor cultural e histórico para los pueblos andinos.',
      }
    },
    imageKey: 'DESTINATIONS.PUNO',
    active: true,
    featured: false,
    lat: -15.8402,
    lng: -70.0219,
  },
  {
    id: 'valle-sagrado',
    slug: 'valle-sagrado',
    country: 'peru',
    content: {
      es: {
        name: 'Valle Sagrado de los Incas',
        description: 'El Valle del río Urubamba, entre Cusco y Ollantaytambo, fue el corazón agrícola y ceremonial del Imperio Inca. A lo largo de sus 60 kilómetros se suceden yacimientos arqueológicos, mercados y pueblos andinos que mantienen sus tradiciones. Pisac, con su ciudadela en lo alto y su mercado dominical, es la primera parada habitual; Ollantaytambo, con sus terrazas escalonadas y el templo del Sol, es la más imponente y la puerta de entrada al tren a Machu Picchu. Entre medias, las minas de sal de Maras —en uso desde tiempos preincaicos— y el conjunto de andenes circulares de Moray, que los incas usaron como laboratorio agrícola para experimentar con distintos microclimas, añaden capas de historia al recorrido. Chinchero, con su iglesia colonial sobre cimientos incas y su tradición textil viva, cierra el circuito de vuelta a Cusco. El valle se puede recorrer en un día desde Cusco, aunque merece más tiempo.',
      }
    },
    imageKey: 'DESTINATIONS.VALLE_SAGRADO',
    active: true,
    featured: true,
    lat: -13.3167,
    lng: -72.0833,
  },
  // ── Uruguay ──────────────────────────────────────────────────────────────────
  {
    id: 'montevideo',
    slug: 'montevideo',
    country: 'uruguay',
    content: {
      es: {
        name: 'Montevideo',
        description: 'Montevideo es la capital y ciudad más grande de Uruguay, con casi la mitad de la población del país concentrada en su área metropolitana. Fundada en 1724 por los españoles como plaza fuerte frente a los portugueses de Brasil, tiene un centro histórico — la Ciudad Vieja — con arquitectura colonial y art déco bien conservada, plazas animadas y el Mercado del Puerto, donde las parrillas llevan funcionando desde el siglo XIX. La rambla, un paseo marítimo de casi veintidós kilómetros a orillas del Río de la Plata, es el eje de la vida cotidiana de los montevideanos: se camina, se corre, se pesca y se toma mate con vistas al estuario más ancho del mundo. El barrio Sur y el Palermo son los focos del candombe, el ritmo afro-uruguayo declarado Patrimonio Inmaterial de la Humanidad. Montevideo se visita bien combinada con Buenos Aires, a un ferry de distancia, y con Colonia del Sacramento, a poco más de dos horas al oeste.',
      }
    },
    imageKey: 'DESTINATIONS.MONTEVIDEO',
    active: true,
    featured: false,
    lat: -34.9011,
    lng: -56.1645,
  },
]

export default destinations
