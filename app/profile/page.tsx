'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Property } from '@/types/property';
import PropertyCard from '@/components/PropertyCard';
import { Heart, User } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004/api/V1';

  const fetchFavoriteProperties = useCallback(async () => {
    try {
      setLoading(true);
      
      // Obtener IDs de favoritos
      const favoritesResponse = await axios.get(`${API_BASE_URL}/users/${session?.user?.id}/favorites`);
      const favoriteIds = favoritesResponse.data;

      if (favoriteIds.length === 0) {
        setFavoriteProperties([]);
        return;
      }

      // Obtener todas las propiedades
      const propertiesResponse = await axios.get(`${API_BASE_URL}/properties?limit=1000`);
      const allProperties = propertiesResponse.data.data || propertiesResponse.data;

      // Filtrar solo las favoritas
      const favorites = allProperties.filter((property: Property) => 
        favoriteIds.includes(property._id)
      );

      setFavoriteProperties(favorites);
    } catch (error) {
      console.error('Error fetching favorite properties:', error);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id, API_BASE_URL]);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/');
      return;
    }

    fetchFavoriteProperties();
  }, [session, status, router, fetchFavoriteProperties]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!session) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-4">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || ''}
                width={80}
                height={80}
                className="rounded-full"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-gray-400" />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{session.user.name}</h1>
              <p className="text-gray-600">{session.user.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                {favoriteProperties.length} propiedades favoritas
              </p>
            </div>
          </div>
        </div>

        {/* Favorite Properties */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-500" />
            Propiedades Favoritas
          </h2>

          {favoriteProperties.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tienes propiedades favoritas
              </h3>
              <p className="text-gray-600 mb-4">
                Explora nuestras propiedades y marca las que más te gusten
              </p>
              <button
                onClick={() => router.push('/')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Ver Propiedades
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {favoriteProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}