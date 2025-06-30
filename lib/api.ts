import axios from 'axios';
import { Property, CreatePropertyForm } from '@/types/property';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004/api/V1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const propertyAPI = {
  // Obtener todas las propiedades (mantener compatibilidad)
  getAll: async (): Promise<Property[]> => {
    const response = await api.get('/properties');
    return response.data.data || response.data; // Soportar ambos formatos
  },

  // Obtener propiedades con paginación
  getAllPaginated: async (page = 1, limit = 10): Promise<{
    data: Property[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> => {
    const response = await api.get(`/properties?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Obtener propiedad por ID
  getById: async (id: string): Promise<Property> => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  // Crear nueva propiedad
  create: async (data: CreatePropertyForm): Promise<Property> => {
    const formData = new FormData();
    
    // Agregar campos de texto
    formData.append('titulo', data.titulo);
    formData.append('descripcion', data.descripcion);
    formData.append('direccion', data.direccion);
    formData.append('ubicacion', data.ubicacion);
    if (data.requisitos) formData.append('requisitos', data.requisitos);
    formData.append('tipoOperacion', data.tipoOperacion);
    formData.append('aceptaMascotas', data.aceptaMascotas.toString());
    formData.append('precioARS', data.precioARS.toString());
    formData.append('precioUSD', data.precioUSD.toString());
    formData.append('expensas', data.expensas.toString());
    formData.append('habitaciones', data.habitaciones.toString());
    formData.append('banos', data.banos.toString());
    formData.append('ambientes', data.ambientes.toString());

    // Agregar imágenes si existen
    if (data.images) {
      data.images.forEach((image) => {
        formData.append('images', image);
      });
    }

    const response = await api.post('/properties', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Filtros con paginación
  getWithFilters: async (filters: Record<string, string | number>): Promise<{
    data: Property[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      params.append(key, value.toString());
    });
    const response = await api.get(`/properties?${params}`);
    return response.data;
  },

  // Obtener ubicaciones para autocomplete
  getUbicaciones: async (): Promise<string[]> => {
    const response = await api.get('/properties/ubicaciones/list');
    return response.data;
  },
};

export default api;