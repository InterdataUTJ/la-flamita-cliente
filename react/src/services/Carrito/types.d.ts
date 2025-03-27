import { ProductoResponse } from "../Productos/types";

export interface CarritoItem {
  _id: string;
  cantidad: number;
  precio: number;
  descuento: number;
  producto_id: ProductoResponse;
}

export interface Carrito {
  subtotal: number;
  descuento: number;
  total: number;
  carrito: CarritoItem[];
}