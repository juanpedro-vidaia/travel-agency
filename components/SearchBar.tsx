'use client';

import { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

export default function SearchBar() {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [travelers, setTravelers] = useState('2');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: conectar con búsqueda real o ruta /destinos
    console.log({ destination, checkIn, checkOut, travelers });
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-2"
      >
        {/* Destino */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
          <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <div className="flex-1 text-left">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">
              Destino
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="¿A dónde quieres ir?"
              className="w-full text-sm text-gray-900 placeholder-gray-400 bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="hidden md:block w-px bg-gray-200 self-stretch my-2" />

        {/* Fecha ida */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors md:w-44">
          <Calendar className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <div className="flex-1 text-left">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">
              Salida
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full text-sm text-gray-900 bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="hidden md:block w-px bg-gray-200 self-stretch my-2" />

        {/* Fecha vuelta */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors md:w-44">
          <Calendar className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <div className="flex-1 text-left">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">
              Vuelta
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full text-sm text-gray-900 bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="hidden md:block w-px bg-gray-200 self-stretch my-2" />

        {/* Viajeros */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors md:w-36">
          <Users className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <div className="flex-1 text-left">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">
              Viajeros
            </label>
            <select
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="w-full text-sm text-gray-900 bg-transparent outline-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'persona' : 'personas'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botón buscar */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-8 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap"
        >
          <Search className="w-5 h-5" />
          <span>Buscar</span>
        </button>
      </form>
    </div>
  );
}
