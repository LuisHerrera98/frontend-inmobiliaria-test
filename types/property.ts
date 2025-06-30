export interface Property {
  _id: string;
  titulo: string;
  descripcion: string;
  direccion: string;
  aceptaMascotas: boolean;
  precioARS: number;
  precioUSD: number;
  expensas: number;
  habitaciones: number;
  banos: number;
  ambientes: number;
  tipoOperacion: 'venta' | 'alquiler';
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePropertyForm {
  titulo: string;
  descripcion: string;
  direccion: string;
  aceptaMascotas: boolean;
  precioARS: number | string;
  precioUSD: number | string;
  expensas: number | string;
  habitaciones: number;
  banos: number;
  ambientes: number;
  tipoOperacion: 'venta' | 'alquiler';
  images?: File[];
}