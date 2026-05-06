export interface Asset {
  url: string
  alt: string
}

export const ASSETS = {
  // ── Logos ─────────────────────────────────────────────────────────────────────
  'LOGO.DEFAULT': { url: '/images/logo/viajes-vidaia-logo.png', alt: 'Viajes Vidaia' },
  'LOGO.COLOR':   { url: '/images/logo/viajes-vidaia-logo-color.jpg', alt: 'Viajes Vidaia' },

  // ── Flags (via flagcdn.com) ───────────────────────────────────────────────────
  'FLAGS.AR': { url: 'https://flagcdn.com/20x15/ar.png', alt: 'Argentina' },
  'FLAGS.CL': { url: 'https://flagcdn.com/20x15/cl.png', alt: 'Chile' },
  'FLAGS.BO': { url: 'https://flagcdn.com/20x15/bo.png', alt: 'Bolivia' },
  'FLAGS.PE': { url: 'https://flagcdn.com/20x15/pe.png', alt: 'Perú' },

  // ── Country hero images ───────────────────────────────────────────────────────
  'COUNTRIES.ARGENTINA_HERO': { url: 'https://res.cloudinary.com/dny6gct6o/image/upload/v1777912429/copy_of_dscf5187_cgefyp_2abb25.jpg', alt: 'El Chaltén, Patagonia argentina' },
  'COUNTRIES.CHILE_HERO':     { url: 'https://images.unsplash.com/photo-1558517286-6b7b81953cb5?q=80&w=1920', alt: 'Torres del Paine, Chile' },
  'COUNTRIES.BOLIVIA_HERO':   { url: 'https://images.unsplash.com/photo-1641234332283-af77dfe995c7?q=80&w=1920', alt: 'Salar de Uyuni, Bolivia' },
  'COUNTRIES.PERU_HERO':      { url: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1920', alt: 'Machu Picchu, Perú' },

  // ── Hero backgrounds ──────────────────────────────────────────────────────────
  'HOME.HERO_BG':      { url: 'https://images.unsplash.com/photo-1598162480222-b2c3d92548d5?q=80&w=1920&auto=format&fit=crop', alt: 'Paisajes de Sudamérica' },
  'HONEYMOON_HERO_BG': { url: 'https://images.unsplash.com/photo-1664271987414-15b38d834357?q=80&w=1920&auto=format&fit=crop', alt: 'Luna de miel en Sudamérica' },
  'QUOTE_HERO_BG':     { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85', alt: 'Diseña tu viaje' },
  'CTA_SECTION_BG':    { url: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1920&q=80', alt: 'Diseña tu aventura' },

  // ── Team ──────────────────────────────────────────────────────────────────────
  'TEAM.LAU':             { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', alt: 'Lau - Viajes Vidaia' },
  'TEAM.JUPE':            { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', alt: 'Jupe - Viajes Vidaia' },
  'TEAM.LANDSCAPE_PHOTO': { url: 'https://images.unsplash.com/photo-1461301214746-1e109215d6d3?auto=format&fit=crop&w=1600&q=80', alt: 'Viajes Vidaia en ruta' },

  // ── Trips ─────────────────────────────────────────────────────────────────────
  'TRIPS.ARGENTINA_NATURAL_PAISAJES':   { url: 'https://res.cloudinary.com/dny6gct6o/image/upload/v1777912429/copy_of_dscf5187_cgefyp_2abb25.jpg', alt: 'Paisajes naturales de Argentina' },
  'TRIPS.LATITUDES_AUSTRALES':          { url: 'https://images.unsplash.com/photo-1684790761209-a49f6d6ef7df?q=80&w=800', alt: 'Latitudes Australes - Patagonia' },
  'TRIPS.PATAGONIA_SUR_NORTE':          { url: 'https://images.unsplash.com/photo-1520641082665-df9ec00b0953?q=80&w=800', alt: 'Patagonia de sur a norte' },
  'TRIPS.FIN_DE_ANO_ARGENTINA':         { url: 'https://images.unsplash.com/photo-1709426197175-ea5577067e5d?q=80&w=800', alt: 'Fin de año en Argentina' },
  'TRIPS.ARGENTINA_ESENCIAL':           { url: 'https://images.unsplash.com/photo-1582727867856-46e3951fd3ff?q=80&w=800', alt: 'Argentina esencial' },
  'TRIPS.CONTRASTES_ARGENTINOS':        { url: 'https://images.unsplash.com/photo-1603155376270-6ad9b9b4fa59?q=80&w=800', alt: 'Contrastes argentinos' },
  'TRIPS.CHILE_BOLIVIA_SALARES':        { url: 'https://images.unsplash.com/photo-1573502059387-0848782c6956?q=80&w=800', alt: 'Chile y Bolivia: salares y desierto' },
  'TRIPS.CHILE_ISLA_PASCUA':            { url: 'https://images.unsplash.com/photo-1600754047212-0cf91397fbc6?q=80&w=800', alt: 'Chile e Isla de Pascua' },
  'TRIPS.GRANDES_ESCENARIOS_ARGENTINA': { url: 'https://res.cloudinary.com/dny6gct6o/image/upload/v1778096630/DSCF4710_i0ivn7.jpg', alt: 'Fitz Roy en Patagonia, Argentina' },

  // ── Viajes hero carousel ──────────────────────────────────────────────────────
  'VIAJES_HERO_CHILE':     { url: 'https://images.unsplash.com/photo-1558518986-a7def81b3b73?q=80&w=1920', alt: 'Torres del Paine, Chile' },
  'VIAJES_HERO_ARGENTINA': { url: 'https://images.unsplash.com/photo-1615656637621-5aa19f1ef847?q=80&w=1920', alt: 'Perito Moreno, Argentina' },
  'VIAJES_HERO_BOLIVIA':   { url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1920', alt: 'Salar de Uyuni, Bolivia' },

  // ── Blog posts ────────────────────────────────────────────────────────────────
  'BLOG.ENCUENTRO_IGUAZU':        { url: 'https://res.cloudinary.com/dny6gct6o/image/upload/v1777991216/IMG_1651_1_apzpg6.jpg', alt: 'Vista de las Cataratas del Iguazú desde un mirador del Lago Brasileño.' },
  'BLOG.MATE_ARGENTINA':          { url: 'https://images.unsplash.com/photo-1523642456391-c597480dbdb6?auto=format&fit=crop&w=1200&q=80', alt: 'Mate argentino' },
  'BLOG.ATACAMA_CHILE':           { url: 'https://res.cloudinary.com/dny6gct6o/image/upload/v1777455009/DSCF7649_1_uoc1t6.jpg', alt: 'Desierto de Atacama, Chile' },
  'BLOG.CARRETERA_AUSTRAL':       { url: 'https://res.cloudinary.com/dny6gct6o/image/upload/v1777938578/DSCF5578_2_ofnz1j.jpg', alt: 'Catedrales de Mármol en el Lago General Carrera, Chile' },
  'BLOG.PATAGONIA_W_CIRCUIT':     { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', alt: 'Circuito W, Torres del Paine' },
  'BLOG.BUENOS_AIRES_FIRST_TIME': { url: 'https://images.unsplash.com/photo-1612294037637-ec328d0e075e?auto=format&fit=crop&w=1200&q=80', alt: 'Buenos Aires' },
  'BLOG.HONEYMOON_PATAGONIA':     { url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80', alt: 'Luna de miel en Patagonia' },
  'BLOG.BEST_TIME_ARGENTINA':     { url: 'https://images.unsplash.com/photo-1591177335318-eb7de5c24f86?auto=format&fit=crop&w=1200&q=80', alt: 'Mejor época para viajar a Argentina' },

  // ── Testimonials ──────────────────────────────────────────────────────────────
  'TESTIMONIALS.MARIA_GARCIA':    { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80', alt: 'María García' },
  'TESTIMONIALS.CARLOS_MARTINEZ': { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', alt: 'Carlos Martínez' },
  'TESTIMONIALS.ANA_RODRIGUEZ':   { url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&q=80', alt: 'Ana Rodríguez' },

  // ── Destinations ──────────────────────────────────────────────────────────────
  'DESTINATIONS.BUENOS_AIRES':      { url: 'https://images.unsplash.com/photo-1589993624-d5e0e6a27fd8?w=800&q=80', alt: 'Buenos Aires' },
  'DESTINATIONS.IGUAZU':            { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'Cataratas del Iguazú' },
  'DESTINATIONS.PENINSULA_VALDES':  { url: 'https://images.unsplash.com/photo-1499343628900-f45a080d42d4?w=800&q=80', alt: 'Península Valdés' },
  'DESTINATIONS.PUERTO_MADRYN':     { url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', alt: 'Puerto Madryn' },
  'DESTINATIONS.EL_CALAFATE':       { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80', alt: 'El Calafate' },
  'DESTINATIONS.USHUAIA':           { url: 'https://images.unsplash.com/photo-1531761399323-e5f7e7f98816?w=800&q=80', alt: 'Ushuaia' },
  'DESTINATIONS.ELCHALTEN':         { url: 'https://res.cloudinary.com/dny6gct6o/image/upload/v1778096630/IMG_8150_aw7cy4.jpg', alt: 'El Chaltén, Patagonia argentina' },
  'DESTINATIONS.SANMARTIN':         { url: 'https://images.unsplash.com/photo-1604019550689-d6762c28b19e?q=80&w=1920', alt: 'San Martín de los Andes' },
  'DESTINATIONS.SALTA':             { url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80', alt: 'Salta' },
  'DESTINATIONS.JUJUY':             { url: 'https://images.unsplash.com/photo-1583309219338-a582f1db9a62?w=800&q=80', alt: 'Jujuy' },
  'DESTINATIONS.TORRES_DEL_PAINE':  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'Torres del Paine' },
  'DESTINATIONS.ATACAMA':           { url: 'https://images.unsplash.com/photo-1548919219-32a0d9e83b80?w=800&q=80', alt: 'Desierto de Atacama' },
  'DESTINATIONS.SANTIAGO':          { url: 'https://images.unsplash.com/photo-1601053999937-7fb74e2c552d?w=1200&q=80', alt: 'Santiago de Chile' },
  'DESTINATIONS.SAN_PEDRO_ATACAMA': { url: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=1200&q=80', alt: 'San Pedro de Atacama' },
  'DESTINATIONS.ISLA_PASCUA':       { url: 'https://images.unsplash.com/photo-1565073624497-7e91b5cc3843?w=1200&q=80', alt: 'Isla de Pascua' },
  'DESTINATIONS.UYUNI':             { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'Salar de Uyuni' },
  'DESTINATIONS.LA_PAZ':            { url: 'https://images.unsplash.com/photo-1531761399323-e5f7e7f98816?w=800&q=80', alt: 'La Paz' },

  // ── Hotels ────────────────────────────────────────────────────────────────────
  'HOTELS.CITY_FALLS_IGUAZU':   { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', alt: 'City Falls Iguazú' },
  'HOTELS.PANORAMIC_IGUAZU':    { url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80', alt: 'Panoramic Iguazú' },
  'HOTELS.GRAN_MELIA_IGUAZU':   { url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', alt: 'Gran Meliá Iguazú' },
  'HOTELS.MUELLE_VIEJO':        { url: 'https://images.unsplash.com/photo-1578774204375-826dc5d996ed?w=800&q=80', alt: 'Muelle Viejo' },
  'HOTELS.YENE_HUE':            { url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', alt: 'Yene Hue' },
  'HOTELS.TERRITORIO':          { url: 'https://images.unsplash.com/photo-1596413038447-f0a9e6ecefff?w=800&q=80', alt: 'Hotel Territorio' },
  'HOTELS.MERIT_SAN_TELMO':     { url: 'https://images.unsplash.com/photo-1578774204375-826dc5d996ed?w=800&q=80', alt: 'Merit San Telmo' },
  'HOTELS.HOTEL_MADERO':        { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', alt: 'Hotel Madero' },
  'HOTELS.ALVEAR_PALACE':       { url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', alt: 'Alvear Palace Hotel' },
  'HOTELS.LOS_ALAMOS':          { url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', alt: 'Los Álamos' },
  'HOTELS.ROCHESTER_CALAFATE':  { url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80', alt: 'Rochester Calafate' },
  'HOTELS.EOLO_PATAGONIA':      { url: 'https://images.unsplash.com/photo-1596413038447-f0a9e6ecefff?w=800&q=80', alt: 'EOLO Patagonia' },
  'HOTELS.ALTOS_USHUAIA':       { url: 'https://images.unsplash.com/photo-1596413038447-f0a9e6ecefff?w=800&q=80', alt: 'Los Altos Ushuaia' },
  'HOTELS.LOS_CAUQUENES':       { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', alt: 'Los Cauquenes' },
  'HOTELS.ARAKUR_USHUAIA':      { url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', alt: 'Arakur Ushuaia' },
  'HOTELS.PLAZA_SAN_FRANCISCO': { url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80', alt: 'Plaza San Francisco' },
  'HOTELS.CUMBRES_LASTARRIA':   { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', alt: 'Cumbres Lastarria' },
  'HOTELS.MANDARIN_ORIENTAL':   { url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80', alt: 'Mandarin Oriental Santiago' },
  'HOTELS.HOLIDAY_INN_SCL':     { url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', alt: 'Holiday Inn Santiago' },
  'HOTELS.POBLADO_KIMAL':       { url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80', alt: 'Poblado Kimal' },
  'HOTELS.CUMBRES_SAN_PEDRO':   { url: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80', alt: 'Cumbres San Pedro de Atacama' },
  'HOTELS.TIERRA_ATACAMA':      { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', alt: 'Tierra Atacama' },
  'HOTELS.OTAI_RAPA_NUI':       { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', alt: 'Otai Rapa Nui' },
  'HOTELS.TAKARUA':             { url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', alt: 'Takarua' },
  'HOTELS.EXPLORA_RAPA_NUI':    { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80', alt: 'explora Rapa Nui' },

  // ── Itinerary hero images ─────────────────────────────────────────────────────
  'ITINERARIES.PAISAJES_NATURALES_IGUAZU': { url: 'https://images.unsplash.com/photo-1682597465277-ffffd1341731?q=80&w=1920', alt: 'Cataratas del Iguazú, Argentina' },
  'ITINERARIES.PAISAJES_NATURALES_VALDES': { url: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?q=80&w=1920', alt: 'Ballena Franca Austral · Península de Valdés' },
  'ITINERARIES.PAISAJES_NATURALES_BA':     { url: 'https://images.unsplash.com/photo-1706170421190-48b12aa10f5e?q=80&w=1920', alt: 'Buenos Aires' },
  'ITINERARIES.PAISAJES_NATURALES_MORENO': { url: 'https://images.unsplash.com/photo-1552751753-0fc84ae5b6c8?q=80&w=1920', alt: 'Glaciar Perito Moreno' },
  'ITINERARIES.PAISAJES_NATURALES_BEAGLE': { url: 'https://images.unsplash.com/photo-1553363437-e236983485c2?q=80&w=1920', alt: 'Canal Beagle, Ushuaia' },
  'ITINERARIES.ESENCIAS_CHILE_MOAIS':      { url: 'https://images.unsplash.com/photo-1671155282127-a23795b7b46a?w=1920&q=80', alt: 'Moáis de Isla de Pascua' },
  'ITINERARIES.ESENCIAS_CHILE_ATACAMA':    { url: 'https://images.unsplash.com/photo-1620824175623-930d7a980da8?w=1920&q=80', alt: 'Desierto de Atacama' },
  'ITINERARIES.ESENCIAS_CHILE_SANTIAGO':   { url: 'https://images.unsplash.com/photo-1631850033735-b4c7853b16df?w=1920&q=80', alt: 'Santiago de Chile' },
  'ITINERARIES.ESENCIAS_CHILE_VALLE_LUNA': { url: 'https://images.unsplash.com/photo-1662239091066-51f01a402516?w=1920&q=80', alt: 'Valle de la Luna · Atacama' },

  // ── Instagram grid ────────────────────────────────────────────────────────────
  'INSTAGRAM_PHOTOS.PERITO_MORENO':          { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', alt: 'Glaciar Perito Moreno, Argentina' },
  'INSTAGRAM_PHOTOS.IGUAZU_FALLS':           { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', alt: 'Cataratas del Iguazú' },
  'INSTAGRAM_PHOTOS.TORRES_DEL_PAINE_INSTA': { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', alt: 'Torres del Paine, Chile' },
  'INSTAGRAM_PHOTOS.BUENOS_AIRES_INSTA':     { url: 'https://images.unsplash.com/photo-1589993624-d5e0e6a27fd8?w=600&q=80', alt: 'Buenos Aires' },
  'INSTAGRAM_PHOTOS.JUJUY_HUMAHUACA':        { url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80', alt: 'Quebrada de Humahuaca, Jujuy' },
  'INSTAGRAM_PHOTOS.USHUAIA_BEAGLE':         { url: 'https://images.unsplash.com/photo-1531761399323-e5f7e7f98816?w=600&q=80', alt: 'Canal Beagle, Ushuaia' },

  // ── Itineraries ───────────────────────────────────────────────────────────────
  'ITINERARIES.GRANDES_ESCENARIOS_FITZ_ROY':  { url: 'https://res.cloudinary.com/dny6gct6o/image/upload/v1777912429/copy_of_dscf5187_cgefyp_2abb25.jpg', alt: 'Fitz Roy y Cerro Torre, desde la Loma del Pliegue Tumbado, El Chaltén' },
  'ITINERARIES.GRANDES_ESCENARIOS_USHUAIA':   { url: 'https://res.cloudinary.com/dny6gct6o/image/upload/v1778096630/DSCF3573_1_qdvk2p.jpg', alt: 'Ushuaia desde el Canal de Beagle, Tierra de Fuego' },
  'ITINERARIES.GRANDES_ESCENARIOS_MORENO':    { url: 'https://images.unsplash.com/photo-1637949213621-c2aba6149fdb?q=80&w=1920', alt: 'Glaciar Perito Moreno' },
  'ITINERARIES.GRANDES_ESCENARIOS_BARILOCHE': { url: 'https://images.unsplash.com/photo-1661558341880-2c9ab8c9478c?q=80&w=1920', alt: 'Lago Nahuel Huapi Bariloche' },
  'ITINERARIES.GRANDES_ESCENARIOS_IGUAZU':    { url: 'https://res.cloudinary.com/dny6gct6o/image/upload/v1778096630/IMG_1417_1_1_xdhe8i.jpg', alt: 'Cataratas del Iguazú, Argentina' },
} as const

export type AssetKey = keyof typeof ASSETS

export function getAsset(key: AssetKey | string): Asset {
  const asset = ASSETS[key as AssetKey]
  if (!asset) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[getAsset] Key not found: "${key}"`)
    }
    return { url: '/images/placeholder.jpg', alt: '' }
  }
  return asset
}
