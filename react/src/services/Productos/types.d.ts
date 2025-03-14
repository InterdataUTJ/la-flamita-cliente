export interface ProductoResponse {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  existencias: number;
  descuento: number;
  estado: boolean;
  fotos: string[];
  categorias: string[];
}

export interface ProductoRequest {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  existencias?: number;
  descuento?: number;
  estado?: boolean;
  fotos?: File[];
  categorias?: string[];
}