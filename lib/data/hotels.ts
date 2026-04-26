export interface Hotel {
  id: string
  destinationId: string
  name: string
  category: 3 | 4 | 5
  categoryLabel?: string   // e.g. "Superior", "Boutique", "Lodge"
  description?: string
  image: string
  active: boolean
}

const hotels: Hotel[] = [
  // ── Iguazú ───────────────────────────────────────────────────────────────────
  {
    id: 'city-falls-iguazu',
    destinationId: 'iguazu',
    name: 'City Falls Iguazú',
    category: 3,
    categoryLabel: 'Superior',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    active: true,
  },
  {
    id: 'panoramic-iguazu',
    destinationId: 'iguazu',
    name: 'Panoramic Hotel Iguazú',
    category: 4,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    active: true,
  },
  {
    id: 'gran-melia-iguazu',
    destinationId: 'iguazu',
    name: 'Gran Meliá Iguazú',
    category: 5,
    categoryLabel: 'Lujo',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    active: true,
  },
  // ── Puerto Madryn ────────────────────────────────────────────────────────────
  {
    id: 'hotel-muelle-viejo',
    destinationId: 'puerto-madryn',
    name: 'Hotel Muelle Viejo',
    category: 3,
    image: 'https://images.unsplash.com/photo-1578774204375-826dc5d996ed?w=800&q=80',
    active: true,
  },
  {
    id: 'yene-hue',
    destinationId: 'puerto-madryn',
    name: 'Yene Hue',
    category: 4,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
    active: true,
  },
  {
    id: 'hotel-territorio',
    destinationId: 'puerto-madryn',
    name: 'Hotel Territorio',
    category: 5,
    image: 'https://images.unsplash.com/photo-1596413038447-f0a9e6ecefff?w=800&q=80',
    active: true,
  },
  // ── Buenos Aires ─────────────────────────────────────────────────────────────
  {
    id: 'merit-san-telmo',
    destinationId: 'buenos-aires',
    name: 'Mérit San Telmo',
    category: 3,
    image: 'https://images.unsplash.com/photo-1578774204375-826dc5d996ed?w=800&q=80',
    active: true,
  },
  {
    id: 'hotel-madero',
    destinationId: 'buenos-aires',
    name: 'Hotel Madero Buenos Aires',
    category: 4,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    active: true,
  },
  {
    id: 'alvear-palace',
    destinationId: 'buenos-aires',
    name: 'Alvear Palace Hotel',
    category: 5,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    active: true,
  },
  // ── El Calafate ──────────────────────────────────────────────────────────────
  {
    id: 'hotel-los-alamos',
    destinationId: 'el-calafate',
    name: 'Hotel Los Álamos',
    category: 3,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
    active: true,
  },
  {
    id: 'rh-rochester-calafate',
    destinationId: 'el-calafate',
    name: 'RH Rochester Calafate',
    category: 4,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    active: true,
  },
  {
    id: 'eolo-patagonia',
    destinationId: 'el-calafate',
    name: "Eolo Patagonia's Spirit",
    category: 5,
    categoryLabel: 'Relais & Châteaux',
    image: 'https://images.unsplash.com/photo-1596413038447-f0a9e6ecefff?w=800&q=80',
    active: true,
  },
  // ── Ushuaia ──────────────────────────────────────────────────────────────────
  {
    id: 'altos-ushuaia',
    destinationId: 'ushuaia',
    name: 'Altos Ushuaia Hotel & Resto',
    category: 3,
    categoryLabel: 'Superior',
    image: 'https://images.unsplash.com/photo-1596413038447-f0a9e6ecefff?w=800&q=80',
    active: true,
  },
  {
    id: 'los-cauquenes',
    destinationId: 'ushuaia',
    name: 'Los Cauquenes Resort & Spa',
    category: 4,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    active: true,
  },
  {
    id: 'arakur-ushuaia',
    destinationId: 'ushuaia',
    name: 'Arakur Ushuaia Resort & Spa',
    category: 5,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    active: true,
  },
  // Santiago — categoría 3, 4, 5
  {
    id: 'hotel-plaza-san-francisco-santiago',
    destinationId: 'santiago-chile',
    name: 'Hotel Plaza San Francisco',
    category: 3,
    categoryLabel: 'Superior',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    active: true,
  },
  {
    id: 'cumbres-lastarria',
    destinationId: 'santiago-chile',
    name: 'Cumbres Lastarria',
    category: 4,
    categoryLabel: 'Boutique',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    active: true,
  },
  {
    id: 'mandarin-oriental-santiago',
    destinationId: 'santiago-chile',
    name: 'Mandarin Oriental Santiago',
    category: 5,
    categoryLabel: 'Lujo',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    active: true,
  },
  // Santiago Aeropuerto (escalas)
  {
    id: 'holiday-inn-santiago-airport',
    destinationId: 'santiago-chile',
    name: 'Holiday Inn Santiago Airport',
    category: 3,
    categoryLabel: 'Aeropuerto',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    active: true,
  },
  // San Pedro de Atacama
  {
    id: 'hotel-poblado-kimal',
    destinationId: 'san-pedro-atacama',
    name: 'Hotel Poblado Kimal',
    category: 3,
    categoryLabel: 'Boutique',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',
    active: true,
  },
  {
    id: 'cumbres-san-pedro',
    destinationId: 'san-pedro-atacama',
    name: 'Cumbres San Pedro de Atacama',
    category: 4,
    categoryLabel: 'Superior',
    image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80',
    active: true,
  },
  {
    id: 'tierra-atacama',
    destinationId: 'san-pedro-atacama',
    name: 'Tierra Atacama Hotel & Spa',
    category: 5,
    categoryLabel: 'Lujo',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    active: true,
  },
  // Isla de Pascua
  {
    id: 'hotel-otai-rapa-nui',
    destinationId: 'isla-pascua',
    name: 'Hotel Otai',
    category: 3,
    categoryLabel: 'Tradicional',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    active: true,
  },
  {
    id: 'takarua',
    destinationId: 'isla-pascua',
    name: 'Hotel Takarua',
    category: 4,
    categoryLabel: 'Boutique',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
    active: true,
  },
  {
    id: 'explora-rapa-nui',
    destinationId: 'isla-pascua',
    name: 'Explora Rapa Nui',
    category: 5,
    categoryLabel: 'Lujo todo incluido',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    active: true,
  },
]

export default hotels
