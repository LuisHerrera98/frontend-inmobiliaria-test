'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { propertyAPI } from '@/lib/api';
import { CreatePropertyForm } from '@/types/property';
import { Upload, DollarSign, Home, MapPin, PawPrint, AlertCircle, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import CustomSelect from '@/components/CustomSelect';

export default function CreatePropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<CreatePropertyForm>({
    titulo: '',
    descripcion: '',
    direccion: '',
    aceptaMascotas: false,
    precioARS: '',
    precioUSD: '',
    expensas: '',
    habitaciones: 1,
    banos: 1,
    ambientes: 1,
    images: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      // Para campos numéricos, mantener como string hasta el envío
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 10) {
      setError('Máximo 10 imágenes permitidas');
      return;
    }

    setFormData(prev => ({ ...prev, images: files }));

    // Preview images
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const removeImage = (index: number) => {
    const newImages = formData.images?.filter((_, i) => i !== index) || [];
    const newPreviews = previewImages.filter((_, i) => i !== index);
    
    setFormData(prev => ({ ...prev, images: newImages }));
    setPreviewImages(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Convertir strings a números antes de enviar
      const submitData = {
        ...formData,
        precioARS: Number(formData.precioARS),
        precioUSD: formData.precioUSD ? Number(formData.precioUSD) : 0,
        expensas: Number(formData.expensas),
      };
      
      await propertyAPI.create(submitData);
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      setError('Error al crear la propiedad. Intenta nuevamente.');
      console.error('Error creating property:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Propiedad creada!</h2>
          <p className="text-gray-600 mb-4">Tu propiedad ha sido publicada exitosamente.</p>
          <p className="text-sm text-gray-500">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Publicar Propiedad</h1>
          <p className="text-gray-600">Completa la información de tu propiedad para publicarla</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Home className="h-5 w-5 mr-2 text-orange-500" />
              Información Básica
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
                  Título de la propiedad *
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  required
                  value={formData.titulo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 placeholder-gray-400"
                  placeholder="Ej: Hermoso departamento 2 ambientes en Palermo"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  required
                  rows={4}
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 placeholder-gray-400"
                  placeholder="Describe las características y beneficios de tu propiedad..."
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Dirección *
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  required
                  value={formData.direccion}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 placeholder-gray-400"
                  placeholder="Ej: Av. Santa Fe 3456, Palermo, CABA"
                />
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Detalles de la Propiedad</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="ambientes" className="block text-sm font-medium text-gray-700 mb-2">
                  Ambientes *
                </label>
                <CustomSelect
                  id="ambientes"
                  name="ambientes"
                  value={formData.ambientes}
                  onChange={(value) => handleSelectChange('ambientes', value)}
                  options={[1,2,3,4,5,6,7,8].map(num => ({
                    value: num,
                    label: `${num} ambiente${num > 1 ? 's' : ''}`
                  }))}
                  required
                />
              </div>

              <div>
                <label htmlFor="habitaciones" className="block text-sm font-medium text-gray-700 mb-2">
                  Dormitorios *
                </label>
                <CustomSelect
                  id="habitaciones"
                  name="habitaciones"
                  value={formData.habitaciones}
                  onChange={(value) => handleSelectChange('habitaciones', value)}
                  options={[1,2,3,4,5,6].map(num => ({
                    value: num,
                    label: `${num} dormitorio${num > 1 ? 's' : ''}`
                  }))}
                  required
                />
              </div>

              <div>
                <label htmlFor="banos" className="block text-sm font-medium text-gray-700 mb-2">
                  Baños *
                </label>
                <CustomSelect
                  id="banos"
                  name="banos"
                  value={formData.banos}
                  onChange={(value) => handleSelectChange('banos', value)}
                  options={[1,2,3,4,5].map(num => ({
                    value: num,
                    label: `${num} baño${num > 1 ? 's' : ''}`
                  }))}
                  required
                />
              </div>

              <div className="md:col-span-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="aceptaMascotas"
                    name="aceptaMascotas"
                    checked={formData.aceptaMascotas}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="aceptaMascotas" className="ml-2 text-sm text-gray-700 flex items-center">
                    <PawPrint className="h-4 w-4 mr-1" />
                    Acepta mascotas
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-green-500" />
              Precios
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="precioUSD" className="block text-sm font-medium text-gray-700 mb-2">
                  Precio en USD
                </label>
                <input
                  type="number"
                  id="precioUSD"
                  name="precioUSD"
                  min="0"
                  value={formData.precioUSD}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 placeholder-gray-400"
                  placeholder="0 (opcional)"
                />
              </div>

              <div>
                <label htmlFor="precioARS" className="block text-sm font-medium text-gray-700 mb-2">
                  Precio en ARS *
                </label>
                <input
                  type="number"
                  id="precioARS"
                  name="precioARS"
                  required
                  min="0"
                  value={formData.precioARS}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 placeholder-gray-400"
                  placeholder="85000000"
                />
              </div>

              <div>
                <label htmlFor="expensas" className="block text-sm font-medium text-gray-700 mb-2">
                  Expensas *
                </label>
                <input
                  type="number"
                  id="expensas"
                  name="expensas"
                  required
                  min="0"
                  value={formData.expensas}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 placeholder-gray-400"
                  placeholder="35000"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Upload className="h-5 w-5 mr-2 text-blue-500" />
              Imágenes
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
                  Subir imágenes (máximo 10)
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Image Previews */}
              {previewImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        width={200}
                        height={150}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Publicando...</span>
                </>
              ) : (
                <span>Publicar Propiedad</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}