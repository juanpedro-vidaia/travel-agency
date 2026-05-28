export type FaqPage = 'home' | 'viajes' | 'luna-de-miel' | 'destination' | 'itinerary'

export interface FAQ {
  id: string
  page: FaqPage
  refId?: string
  order: number
  active: boolean
  onlyIf?: 'hasDomesticFlights' | 'hasInternationalFlights' | 'hasPriceFrom' | 'hasBestMonths'
  es: { question: string; answer: string }
  en?: { question: string; answer: string }
}

export const faqs: FAQ[] = [

  // ── HOME ─────────────────────────────────────────────────────────────────────

  {
    id: 'home-que-diferencia',
    page: 'home',
    order: 1,
    active: true,
    es: {
      question: '¿Qué hace diferente a Viajes Vidaia de otras agencias?',
      answer: 'Somos especialistas exclusivos en Sudamérica. No vendemos paquetes cerrados: cada viaje se diseña desde cero según tus fechas, ritmo e intereses. Trabajamos con proveedores locales de confianza en cada destino y te acompañamos antes, durante y después del viaje.',
    },
  },
  {
    id: 'home-destinos',
    page: 'home',
    order: 2,
    active: true,
    es: {
      question: '¿En qué destinos estáis especializados?',
      answer: 'Ahora mismo en Argentina, Chile, Bolivia y Perú. Dentro de estos países cubrimos desde las rutas más conocidas hasta itinerarios fuera de lo habitual. Próximamente incorporaremos nuevos destinos como Colombia, Brasil o Ecuador.',
    },
  },
  {
    id: 'home-como-funciona',
    page: 'home',
    order: 3,
    active: true,
    es: {
      question: '¿Cómo funciona el proceso para contratar un viaje?',
      answer: 'Nos cuentas tu idea (fechas, destino, número de viajeros, intereses y presupuesto aproximado). En pocos días te enviamos una propuesta a medida sin compromiso. Si te convence, la ajustamos hasta que sea perfecta y entonces formalizamos la reserva.',
    },
  },
  {
    id: 'home-grupos-privados',
    page: 'home',
    order: 4,
    active: true,
    es: {
      question: '¿Hacéis viajes en grupo o solo individuales?',
      answer: 'Diseñamos viajes privados: tú viajas solo, en pareja, en familia o con amigos. En destino, puedes compartir experiencias determinadas en grupos pequeños o en privado. A día de hoy diseñamos exclusivamente viajes privados. Estamos preparando rutas en grupo para un futuro cercano — si te interesa, escríbenos y te avisamos.',
    },
  },
  {
    id: 'home-antelacion',
    page: 'home',
    order: 5,
    active: true,
    es: {
      question: '¿Cuánto tiempo antes hay que planificar el viaje?',
      answer: 'Recomendamos contactarnos con al menos 6 meses de antelación, especialmente para temporada alta (diciembre-enero y julio-agosto). Si nos contactas con más antelación también lo gestionamos perfectamente. Si el viaje es próximo también podemos ayudarte, aunque la disponibilidad de vuelos y alojamientos puede ser más limitada.',
    },
  },
  {
    id: 'home-vuelos',
    page: 'home',
    order: 6,
    active: true,
    es: {
      question: '¿Los viajes incluyen vuelos internacionales?',
      answer: 'Depende de ti. Si lo deseas, preparamos el viaje completo: vuelos internacionales e internos, alojamientos, traslados, actividades y seguro con anulación. Si prefieres gestionar los vuelos por tu cuenta, te preparamos la propuesta sin ellos.',
    },
  },

  // ── VIAJES ───────────────────────────────────────────────────────────────────

  {
    id: 'viajes-temporada',
    page: 'viajes',
    order: 1,
    active: true,
    es: {
      question: '¿Todos los itinerarios recomendados están disponibles todo el año?',
      answer: 'Son itinerarios propuestos y adaptables; indicamos los mejores meses para hacerlos. Con nuestro asesoramiento siempre sabrás cuándo es mejor viajar a cada destino: los viajes a Patagonia son mejores entre octubre y marzo aunque si quieres esquiar puedes viajar también en julio y agosto; los del Salar de Uyuni entre mayo y octubre, o Machu Picchu entre abril y noviembre. En cada itinerario indicamos los meses recomendados y te asesoramos según cuándo quieras viajar.',
    },
  },
  {
    id: 'viajes-combinar-paises',
    page: 'viajes',
    order: 2,
    active: true,
    es: {
      question: '¿Se pueden combinar destinos de países distintos?',
      answer: 'Sí. Algunos de nuestros viajes más populares combinan varios países, como el circuito por Chile y Bolivia o experiencias como el Cruce de Lagos o el Crucero Australis. También diseñamos combinaciones personalizadas.',
    },
  },
  {
    id: 'viajes-que-incluye',
    page: 'viajes',
    order: 3,
    active: true,
    es: {
      question: '¿Los precios incluyen todo?',
      answer: 'El precio base de cada itinerario incluye alojamiento, traslados, excursiones y guías indicados en el programa. Los vuelos internacionales e internos y el seguro de viaje se pueden incluir o gestionar por separado según tu preferencia. En la propuesta final siempre detallamos exactamente qué incluye y qué no.',
    },
  },
  {
    id: 'viajes-categoria-hotel',
    page: 'viajes',
    order: 4,
    active: true,
    es: {
      question: '¿Puedo elegir la categoría del hotel?',
      answer: 'Sí. Preparamos itinerarios con opciones de hotel en categoría estándar (3★), superior (4★) o lujo (5★). El precio varía en consecuencia.',
    },
  },
  {
    id: 'viajes-cancelacion',
    page: 'viajes',
    order: 5,
    active: true,
    es: {
      question: '¿Qué pasa si necesito cancelar o cambiar el viaje?',
      answer: 'Cada reserva tiene sus condiciones según los proveedores implicados. Te las explicamos antes de confirmar y recomendamos siempre contratar un seguro de viaje con cobertura de cancelación.',
    },
  },

  // ── LUNA DE MIEL ─────────────────────────────────────────────────────────────

  {
    id: 'honeymoon-precio',
    page: 'luna-de-miel',
    order: 1,
    active: true,
    es: {
      question: '¿Cuánto cuesta una luna de miel en Sudamérica?',
      answer: 'El presupuesto varía según el destino, los días y la categoría de los hoteles. Diseñamos opciones desde viajes con alojamientos superiores hasta experiencias de lujo en lodges exclusivos. Lo más útil es contarnos qué tenéis en mente y os preparamos una propuesta ajustada a vosotros.',
    },
  },
  {
    id: 'honeymoon-mejor-epoca',
    page: 'luna-de-miel',
    order: 2,
    active: true,
    es: {
      question: '¿Cuándo es el mejor momento para viajar en luna de miel a Sudamérica?',
      answer: 'Depende del destino y de lo que busquéis. La Patagonia es espectacular entre octubre y marzo. Si preferís una luna de miel de invierno, julio y agosto abren otra posibilidad: esquiar en los Andes, desde las pistas de Bariloche o Las Leñas en Argentina hasta Valle Nevado en Chile, o incluso en Cerro Castor en Ushuaia, la estación de esquí más austral del mundo. Entre nuestros destinos siempre hay una opción perfecta para cualquier época del año.',
    },
  },
  {
    id: 'honeymoon-especial',
    page: 'luna-de-miel',
    order: 3,
    active: true,
    es: {
      question: '¿Qué hace especial un viaje de luna de miel con Viajes Vidaia?',
      answer: 'Diseñamos el viaje desde cero pensando en vosotros dos: el ritmo, los detalles, los alojamientos con encanto y las experiencias que recordaréis siempre. No es un paquete, es vuestro viaje.',
    },
  },
  {
    id: 'honeymoon-antelacion',
    page: 'luna-de-miel',
    order: 4,
    active: true,
    es: {
      question: '¿Con cuánta antelación hay que planificar la luna de miel?',
      answer: 'Cuanto antes, mejor — especialmente si tenéis una fecha de boda en temporada alta. Con 6 meses o más tenemos toda la disponibilidad abierta. Si la boda está cerca, consultadnos igualmente, solemos encontrar soluciones.',
    },
  },

  // ── DESTINO: ARGENTINA ───────────────────────────────────────────────────────

  {
    id: 'argentina-mejor-epoca',
    page: 'destination',
    refId: 'argentina',
    order: 1,
    active: true,
    es: {
      question: '¿Cuándo es la mejor época para viajar a Argentina?',
      answer: 'Depende de la zona. Patagonia (El Calafate, El Chaltén, Ushuaia) es mejor entre octubre y marzo. Iguazú, todo el año, con más caudal en octubre-noviembre. Buenos Aires y Mendoza, en primavera (sep-nov) u otoño (mar-may). El norte andino (Salta y Jujuy), mejor evitar enero y febrero por las lluvias.',
    },
  },
  {
    id: 'argentina-dias',
    page: 'destination',
    refId: 'argentina',
    order: 2,
    active: true,
    es: {
      question: '¿Cuántos días mínimos necesito para ver Argentina?',
      answer: 'Para una visita con sentido y tres destinos recomendamos mínimo 8-10 días. Argentina es un país enorme: hay 3.000 km entre Iguazú y Ushuaia. Con 13-15 días se puede hacer un recorrido muy completo y sin prisas.',
    },
  },
  {
    id: 'argentina-visado',
    page: 'destination',
    refId: 'argentina',
    order: 3,
    active: true,
    es: {
      question: '¿Se necesita visado para viajar a Argentina desde España?',
      answer: 'No. Los ciudadanos españoles no necesitan visado. Solo pasaporte en vigor.',
    },
  },
  {
    id: 'argentina-seguridad',
    page: 'destination',
    refId: 'argentina',
    order: 4,
    active: true,
    es: {
      question: '¿Es seguro viajar a Argentina?',
      answer: 'Sí, en los destinos turísticos que trabajamos el nivel de seguridad para turistas es bueno. Recomendamos precauciones básicas en zonas concurridas de grandes ciudades y consultar las recomendaciones actualizadas del Ministerio de Asuntos Exteriores antes de viajar.',
    },
  },
  {
    id: 'argentina-dinero',
    page: 'destination',
    refId: 'argentina',
    order: 5,
    active: true,
    es: {
      question: '¿Qué moneda se usa y cómo gestionar el dinero en Argentina?',
      answer: 'La moneda oficial es el peso argentino. Dado el contexto cambiario del país, te explicamos en detalle cómo gestionar el efectivo antes de viajar para que no tengas ningún problema.',
    },
  },

  // ── DESTINO: CHILE ───────────────────────────────────────────────────────────

  {
    id: 'chile-diferencia',
    page: 'destination',
    refId: 'chile',
    order: 1,
    active: true,
    es: {
      question: '¿Qué diferencia a Chile de otros destinos de Sudamérica?',
      answer: 'Chile combina en un mismo país el desierto más árido del mundo (Atacama), lagos patagónicos, glaciares, volcanes y una capital moderna. Es también uno de los países más seguros y bien organizados para el turismo en la región.',
    },
  },
  {
    id: 'chile-combinar',
    page: 'destination',
    refId: 'chile',
    order: 2,
    active: true,
    es: {
      question: '¿Se puede combinar Chile con Argentina o Bolivia en el mismo viaje?',
      answer: 'Sí, es una de las combinaciones más habituales. Hay múltiples opciones: en Patagonia se puede cruzar entre El Calafate (Argentina) y Torres del Paine (Chile), entre Bariloche y Puerto Varas por vía lacustre, o a través del Crucero Australis. En el norte andino, San Pedro de Atacama conecta fácilmente con el Salar de Uyuni en Bolivia.',
    },
  },
  {
    id: 'chile-torres-paine',
    page: 'destination',
    refId: 'chile',
    order: 3,
    active: true,
    es: {
      question: '¿Cuándo es mejor ir a Torres del Paine?',
      answer: 'Entre noviembre y marzo es la temporada alta y la más recomendable para trekking. Octubre y abril son buenos meses con menos gente y con posibilidad de nieve en las rutas. En invierno (mayo-agosto) el parque tiene acceso limitado y para senderismo es necesario contratar paquetes guiados.',
    },
  },
  {
    id: 'chile-isla-pascua',
    page: 'destination',
    refId: 'chile',
    order: 4,
    active: true,
    es: {
      question: '¿Vale la pena incluir la Isla de Pascua?',
      answer: 'Depende de tu interés cultural. Es un destino único en el mundo y requiere añadir 3-4 días al viaje. Para quienes les atrae la historia y la arqueología, es una experiencia que no se olvida.',
    },
  },
  {
    id: 'chile-visado',
    page: 'destination',
    refId: 'chile',
    order: 5,
    active: true,
    es: {
      question: '¿Se necesita visado para Chile desde España?',
      answer: 'No. Los ciudadanos españoles entran sin visado como turistas. Solo pasaporte en vigor.',
    },
  },

  // ── DESTINO: BOLIVIA ─────────────────────────────────────────────────────────

  {
    id: 'bolivia-imprescindible',
    page: 'destination',
    refId: 'bolivia',
    order: 1,
    active: true,
    es: {
      question: '¿Qué es lo imprescindible de Bolivia?',
      answer: 'El Salar de Uyuni es el gran emblema, especialmente en época de lluvias (diciembre-abril) cuando se forma el espejo de agua. Complementos habituales: la Laguna Colorada en la Reserva Eduardo Avaroa, el desierto de Siloli y la ciudad colonial de Sucre.',
    },
  },
  {
    id: 'bolivia-altitud',
    page: 'destination',
    refId: 'bolivia',
    order: 2,
    active: true,
    es: {
      question: '¿Afecta la altitud en Bolivia?',
      answer: 'Sí, es uno de los aspectos más importantes a tener en cuenta. La Paz está a 3.600 m y el Salar a 3.600-4.700 m. Recomendamos llegar con tiempo de aclimatación, evitar el alcohol y el ejercicio intenso los primeros días, y consultar con el médico sobre medicación preventiva.',
    },
  },
  {
    id: 'bolivia-mejor-epoca',
    page: 'destination',
    refId: 'bolivia',
    order: 3,
    active: true,
    es: {
      question: '¿En qué época es mejor el Salar de Uyuni?',
      answer: 'Entre enero y abril el salar se cubre de una fina capa de agua que crea el famoso efecto espejo. Entre mayo y noviembre está seco, con la sal blanca característica y cielos despejados. Ambas épocas son espectaculares, pero muy distintas.',
    },
  },
  {
    id: 'bolivia-combinar',
    page: 'destination',
    refId: 'bolivia',
    order: 4,
    active: true,
    es: {
      question: '¿Se puede combinar Bolivia con Argentina, Chile o Perú?',
      answer: 'Sí. Bolivia se combina frecuentemente con el norte de Chile (San Pedro de Atacama), el noroeste argentino (Salta, Purmamarca) — ambos a pocas horas del Salar — o con Perú a través del lago Titicaca, Cusco y Machu Picchu.',
    },
  },
  {
    id: 'bolivia-visado',
    page: 'destination',
    refId: 'bolivia',
    order: 5,
    active: true,
    es: {
      question: '¿Se necesita visado para Bolivia desde España?',
      answer: 'No. Los ciudadanos españoles no necesitan visado para Bolivia como turistas.',
    },
  },

  // ── DESTINO: PERÚ ────────────────────────────────────────────────────────────

  {
    id: 'peru-dias',
    page: 'destination',
    refId: 'peru',
    order: 1,
    active: true,
    es: {
      question: '¿Cuánto tiempo necesito para ver Perú bien?',
      answer: 'Para incluir Lima, Cusco, el Valle Sagrado y Machu Picchu, mínimo 8-10 días. Si quieres añadir el lago Titicaca o la Amazonía, 12-14 días.',
    },
  },
  {
    id: 'peru-machu-picchu',
    page: 'destination',
    refId: 'peru',
    order: 2,
    active: true,
    es: {
      question: '¿Hay que reservar Machu Picchu con mucha antelación?',
      answer: 'Sí. Las entradas tienen cupo diario limitado y en temporada alta (junio-agosto) se agotan con semanas de antelación. Recomendamos gestionar la entrada con al menos 2-3 meses de antelación.',
    },
  },
  {
    id: 'peru-altitud',
    page: 'destination',
    refId: 'peru',
    order: 3,
    active: true,
    es: {
      question: '¿Afecta la altitud en Perú?',
      answer: 'Cusco está a 3.400 m. Es habitual el mal de altura los primeros días. Recomendamos llegar desde Lima (a nivel del mar) y dar al cuerpo 1-2 días de aclimatación en Cusco antes de hacer excursiones exigentes.',
    },
  },
  {
    id: 'peru-mejor-epoca',
    page: 'destination',
    refId: 'peru',
    order: 4,
    active: true,
    es: {
      question: '¿Cuándo es mejor viajar a Perú?',
      answer: 'La temporada seca (mayo-octubre) es la más recomendable para Cusco, Machu Picchu y el Valle Sagrado. Lima tiene un microclima propio con neblina invernal. La Amazonía es visitable todo el año.',
    },
  },
  {
    id: 'peru-visado',
    page: 'destination',
    refId: 'peru',
    order: 5,
    active: true,
    es: {
      question: '¿Se necesita visado para Perú desde España?',
      answer: 'No. Los ciudadanos españoles no necesitan visado como turistas.',
    },
  },

  // ── PLANTILLAS DE ITINERARIO ─────────────────────────────────────────────────
  // Las variables {{var}} las resuelve generateItineraryFAQs() en faqsService.ts

  {
    id: 'itinerary-duracion',
    page: 'itinerary',
    order: 1,
    active: true,
    es: {
      question: '¿Cuántos días dura este viaje y qué destinos recorre?',
      answer: 'Este itinerario tiene una duración de {{days}} días y {{nights}} noches. Recorre {{destinations}}.',
    },
  },
  {
    id: 'itinerary-incluye',
    page: 'itinerary',
    order: 2,
    active: true,
    es: {
      question: '¿Qué está incluido en el precio?',
      answer: 'El programa incluye alojamiento, traslados entre destinos, excursiones y guías locales indicados en el itinerario. {{domestic_flights}}{{international_flights}}En días concretos puede incluir comidas especiales, indicadas en el programa día a día. El detalle exacto de inclusiones te lo confirmamos en la propuesta.',
    },
  },
  {
    id: 'itinerary-precio',
    page: 'itinerary',
    order: 3,
    active: true,
    onlyIf: 'hasPriceFrom',
    es: {
      question: '¿Cuál es el precio del viaje?',
      answer: 'El precio parte desde {{price_from}} por persona en habitación doble, incluyendo excursiones y seguro de viaje. El precio final depende de la categoría de hotel elegida y la época del año.',
    },
  },
  {
    id: 'itinerary-meses',
    page: 'itinerary',
    order: 4,
    active: true,
    onlyIf: 'hasBestMonths',
    es: {
      question: '¿Cuáles son los mejores meses para hacer este viaje?',
      answer: 'Los meses más recomendables son {{best_months}}.',
    },
  },
  {
    id: 'itinerary-personalizar',
    page: 'itinerary',
    order: 5,
    active: true,
    es: {
      question: '¿Se puede personalizar el itinerario?',
      answer: 'Sí. Este itinerario es una base de referencia. Podemos ajustar las fechas, el ritmo, la categoría de los hoteles o añadir y cambiar actividades según tus preferencias.',
    },
  },

]

export default faqs
