'use client';

import { MapPin } from 'lucide-react';
import { useState } from 'react';
import CustomSelect from './CustomSelect';

interface SearchFiltersProps {
  onFiltersChange?: (filters: FilterParams) => void;
}

export interface FilterParams {
  tipoOperacion?: string;
  minPrecioARS?: number;
  maxPrecioARS?: number;
  habitaciones?: number;
  ambientes?: number;
  aceptaMascotas?: boolean;
  ubicacion?: string;
}

export default function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<FilterParams>({});

  const handleFilterChange = (key: keyof FilterParams, value: string | number | boolean) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFiltersChange?.({});
  };
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Search Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-3 items-center">
          {/* Location */}
          <div className="lg:col-span-2">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Ubicación (ej: Palermo, CABA)"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={filters.ubicacion || ''}
                onChange={(e) => handleFilterChange('ubicacion', e.target.value)}
              />
            </div>
          </div>

          {/* Tipo de Operación */}
          <div>
            <CustomSelect
              id="tipoOperacion"
              name="tipoOperacion"
              value={filters.tipoOperacion || ''}
              onChange={(value) => handleFilterChange('tipoOperacion', value)}
              options={[
                { value: '', label: 'Tipo' },
                { value: 'alquiler', label: 'Alquiler' },
                { value: 'venta', label: 'Venta' }
              ]}
              placeholder="Tipo"
            />
          </div>

          {/* Habitaciones */}
          <div>
            <CustomSelect
              id="habitaciones"
              name="habitaciones"
              value={filters.habitaciones || ''}
              onChange={(value) => handleFilterChange('habitaciones', value)}
              options={[
                { value: '', label: 'Habitaciones' },
                { value: 1, label: '1+ hab' },
                { value: 2, label: '2+ hab' },
                { value: 3, label: '3+ hab' },
                { value: 4, label: '4+ hab' }
              ]}
              placeholder="Habitaciones"
            />
          </div>

          {/* Precio */}
          <div>
            <CustomSelect
              id="precio"
              name="precio"
              value=""
              onChange={(value) => {
                const ranges = {
                  'low': { min: 0, max: 500000 },
                  'mid': { min: 500000, max: 1000000 },
                  'high': { min: 1000000, max: 999999999 }
                };
                const range = ranges[value as keyof typeof ranges];
                if (range) {
                  handleFilterChange('minPrecioARS', range.min);
                  handleFilterChange('maxPrecioARS', range.max);
                }
              }}
              options={[
                { value: '', label: 'Precio' },
                { value: 'low', label: 'Hasta $500K' },
                { value: 'mid', label: '$500K - $1M' },
                { value: 'high', label: 'Más de $1M' }
              ]}
              placeholder="Precio"
            />
          </div>

          {/* Clear Filters Button */}
          <div className="flex space-x-2">
            <button 
              onClick={clearFilters}
              className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}