'use client';

import { Search, MapPin, Home, Bed, DollarSign, Filter } from 'lucide-react';

export default function SearchFilters() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Search Bar */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Location */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Ubicación (ej: Palermo, CABA)"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                defaultValue="La Plata"
              />
            </div>
          </div>

          {/* Property Type */}
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
            <option>Alquilar</option>
            <option>Comprar</option>
          </select>

          {/* Property Category */}
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
            <option>Departamento</option>
            <option>Casa</option>
            <option>PH</option>
          </select>

          {/* Rooms */}
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
            <option>Amb | Dorm</option>
            <option>1 ambiente</option>
            <option>2 ambientes</option>
            <option>3 ambientes</option>
            <option>4+ ambientes</option>
          </select>

          {/* Price */}
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
            <option>Precio</option>
            <option>Hasta $50.000</option>
            <option>$50.000 - $100.000</option>
            <option>$100.000 - $200.000</option>
            <option>Más de $200.000</option>
          </select>

          {/* More Filters */}
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Más filtros</span>
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">1</span>
          </button>

          {/* Alert */}
          <button className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50">
            Alerta creada
          </button>
        </div>
      </div>
    </div>
  );
}