'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Property } from '@/types/property';
import { propertyAPI } from '@/lib/api';
import PropertyGallery from '@/components/PropertyGallery';
import ContactForm from '@/components/ContactForm';

import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Home, 
  Bath, 
  Bed, 
  PawPrint,
  DollarSign,
  Calendar,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (params.id) {
          const data = await propertyAPI.getById(params.id as string);
          setProperty(data);
        }
      } catch (err) {
        setError('Error al cargar la propiedad');
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.id]);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Propiedad no encontrada</h2>
          <p className="text-gray-600 mb-4">{error || 'La propiedad que buscas no existe'}</p>
          <Link 
            href="/"
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Volver</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <PropertyGallery images={property.images} title={property.titulo} />

            {/* Property Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Title and Location */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {property.titulo}
                    </h1>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span className="text-lg">{property.direccion}</span>
                    </div>
                  </div>
                  
                  {property.aceptaMascotas && (
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <PawPrint className="h-4 w-4 mr-1" />
                      Pet Friendly
                    </div>
                  )}
                </div>

                {/* Price */}
                {(property.precioUSD > 0 || property.precioARS > 0) && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-lg font-semibold text-gray-900">Precio</span>
                    </div>
                    
                    <div className="space-y-2">
                      {property.precioUSD > 0 && (
                        <div className="text-3xl font-bold text-gray-900">
                          {formatPriceUSD(property.precioUSD)}
                        </div>
                      )}
                      {property.precioARS > 0 && (
                        <div className="text-xl text-gray-700">
                          {formatPrice(property.precioARS)}
                        </div>
                      )}
                      <div className="text-gray-600">
                        + ${property.expensas.toLocaleString()} Expensas
                      </div>
                    </div>
                  </div>
                )}

                {/* Property Details */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Home className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.ambientes}</div>
                    <div className="text-sm text-gray-600">Ambiente{property.ambientes > 1 ? 's' : ''}</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bed className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.habitaciones}</div>
                    <div className="text-sm text-gray-600">Dormitorio{property.habitaciones > 1 ? 's' : ''}</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bath className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.banos}</div>
                    <div className="text-sm text-gray-600">Baño{property.banos > 1 ? 's' : ''}</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Descripción</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.descripcion}
                </p>
              </div>

              {/* Publication Info */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Publicado el {formatDate(property.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Características</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700">{property.ambientes} Ambiente{property.ambientes > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700">{property.habitaciones} Dormitorio{property.habitaciones > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700">{property.banos} Baño{property.banos > 1 ? 's' : ''}</span>
                </div>
                {property.aceptaMascotas && (
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700">Acepta mascotas</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <ContactForm property={property} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}