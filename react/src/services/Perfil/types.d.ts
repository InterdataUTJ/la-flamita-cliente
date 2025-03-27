export interface RegisterRequest {
  nombre: string;
  apellido: string;
  correo: string;
  clave: string;
}

export interface LoginResponse {
  token: string;
}

export interface CarritoItem {
  _id: string;
  producto_id: string;
  cantidad: number;
  precio: number;
  descuento: number;
}

export interface PerfilResponse {
  _id: string;
  estado: boolean;
  carrito: CarritoItem[],
  nombre: string;
  apellido: string;
  correo: string;
  avatar: string;
}

export interface PerfilEdit {
  nombre?: string;
  apellido?: string;
  correo?: string;
  clave?: string;
  avatar?: File;
}