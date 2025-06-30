'use client';

import { useEffect, useState } from 'react';
import { Property } from '@/types/property';
import { propertyAPI } from '@/lib/api';
import SearchFilters from '@/components/SearchFilters';
import PropertyCard from '@/components/PropertyCard';
import { MapPin, LayoutGrid } from 'lucide-react';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await propertyAPI.getAllPaginated(currentPage, ITEMS_PER_PAGE);
        console.log('Properties loaded:', response.data.length, 'of', response.total);
        setProperties(response.data);
        setTotal(response.total);
        setTotalPages(response.totalPages);
      } catch (err) {
        setError('Error al cargar las propiedades');
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SearchFilters />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error al cargar</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Asegúrate de que el backend esté corriendo en http://localhost:3000</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchFilters />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Results header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {total} Departamento{total !== 1 ? 's' : ''} en alquiler
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Mostrando {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, total)}-{Math.min(currentPage * ITEMS_PER_PAGE, total)} de {total}
            </p>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="flex items-center space-x-1 sm:space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm sm:text-base">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Ver mapa</span>
              <span className="sm:hidden">Mapa</span>
            </button>
            
            <select className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base">
              <option>Ordenar</option>
              <option>Precio menor a mayor</option>
              <option>Precio mayor a menor</option>
              <option>Más recientes</option>
            </select>
          </div>
        </div>

        {/* Properties grid */}
        {properties.length === 0 ? (
          <div className="text-center py-12">
            <LayoutGrid className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay propiedades disponibles</h3>
            <p className="text-gray-600">Intenta crear una nueva propiedad desde el formulario.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        currentPage === page
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}