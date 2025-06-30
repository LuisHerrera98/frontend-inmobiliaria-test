'use client';

import { Property } from '@/types/property';
import { Heart, Phone, Mail, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useSession, signIn } from 'next-auth/react';
import axios from 'axios';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const { data: session } = useSession();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004/api/V1';

  const checkIfFavorite = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${session?.user?.id}/favorites`);
      setIsFavorite(response.data.includes(property._id));
    } catch (error) {
      console.error('Error checking favorite:', error);
    }
  }, [session?.user?.id, property._id, API_BASE_URL]);

  useEffect(() => {
    if (session?.user?.id) {
      checkIfFavorite();
    }
  }, [session?.user?.id, property._id, checkIfFavorite]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!session?.user?.id) {
      // Redirigir a login o mostrar mensaje
      return;
    }

    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        await axios.delete(`${API_BASE_URL}/users/${session.user.id}/favorites/${property._id}`);
        setIsFavorite(false);
      } else {
        await axios.post(`${API_BASE_URL}/users/${session.user.id}/favorites/${property._id}`);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setFavoriteLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatPriceUSD = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (property.images && property.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (property.images && property.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow mb-4">
      <div className="flex flex-col sm:flex-row sm:h-56">
        {/* Image Section - Left Side */}
        <div className="relative sm:h-full sm:w-96 bg-gray-200 flex-shrink-0 group overflow-hidden">
          {property.images && property.images.length > 0 ? (
            <>
              <Link href={`/property/${property._id}`} className="block w-full h-full sm:absolute sm:inset-0">
                <Image
                  src={property.images[currentImageIndex]}
                  alt={property.titulo}
                  width={640}
                  height={480}
                  className="w-full h-auto sm:absolute sm:inset-0 sm:w-full sm:h-full sm:object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
                  sizes="(max-width: 640px) 100vw, 384px"
                  priority
                />
              </Link>
              
              {/* Navigation arrows */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <ChevronRight className="h-4 w-4 text-gray-700" />
                  </button>
                </>
              )}

              {/* Image count */}
              {property.images && property.images.length > 1 && (
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                  <span>{property.images.length}</span>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              )}


              {/* Pet friendly badge */}
              {property.aceptaMascotas && (
                <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                  Pet Friendly
                </div>
              )}

              {/* Favorite button - on image for mobile */}
              <button 
                onClick={session ? toggleFavorite : () => signIn('google')}
                disabled={favoriteLoading}
                className={`sm:hidden absolute top-2 right-2 p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-sm transition-all z-10 ${
                  favoriteLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                title={session ? 'Agregar a favoritos' : 'Inicia sesión para guardar'}
              >
                <Heart 
                  className={`h-5 w-5 transition-colors ${
                    isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'
                  }`} 
                />
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Home className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Content Section - Right Side */}
        <div className="flex-1 p-4 flex flex-col relative">
          {/* Favorite button - absolute top right only on desktop */}
          <button 
            onClick={session ? toggleFavorite : () => signIn('google')}
            disabled={favoriteLoading}
            className={`hidden sm:block absolute top-4 right-4 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10 ${
              favoriteLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title={session ? 'Agregar a favoritos' : 'Inicia sesión para guardar'}
          >
            <Heart 
              className={`h-4 w-4 transition-colors ${
                isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'
              }`} 
            />
          </button>

          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Title and Location */}
              <div className="mb-3 pr-6">
                <Link href={`/property/${property._id}`}>
                  <h3 className="font-semibold text-base sm:text-lg text-gray-900 hover:text-orange-500 cursor-pointer mb-1">
                    {property.titulo}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600">{property.direccion}</p>
              </div>

            {/* Price */}
            {(property.precioUSD > 0 || property.precioARS > 0) && (
              <div className="mb-3">
                {property.precioUSD > 0 && (
                  <div className="text-lg font-bold text-gray-900">
                    {formatPriceUSD(property.precioUSD)}
                  </div>
                )}
                {property.precioARS > 0 && (
                  <div className="text-lg font-bold text-gray-900">
                    {formatPrice(property.precioARS)}
                  </div>
                )}
                <div className="text-sm text-gray-600">
                  + ${property.expensas.toLocaleString()} Expensas
                </div>
              </div>
            )}

            {/* Property details */}
            <div className="flex items-center space-x-2 sm:space-x-3 text-sm text-gray-600">
              <span>{property.ambientes} amb.</span>
              <span>{property.habitaciones} dorm.</span>
              <span>{property.banos} baño{property.banos > 1 ? 's' : ''}</span>
            </div>

            </div>

            {/* Actions - Bottom */}
            <div className="flex justify-between items-center mt-2">
              <Link 
                href={`/property/${property._id}`}
                className="text-sm text-orange-500 hover:text-orange-600 font-medium"
              >
                Ver más detalles
              </Link>
              <div className="flex items-center space-x-2">
                <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  <Phone className="h-4 w-4 text-gray-600" />
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded font-medium flex items-center space-x-1 transition-colors text-sm">
                  <Mail className="h-4 w-4" />
                  <span>Contactar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}