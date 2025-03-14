export interface VentaProducto {
  _id: string;
  producto_id: string;
  cantidad: number;
  precio: number;
  descuento: number;
}

export interface VentaResponse {
  _id: string;
  empleado_id?: string;
  cliente_id?: string;
  fecha_venta: string;
  fecha_pago: string;
  estado: 'PENDIENTE' | 'PAGADO' | 'COMPLETADO';
  metodo_pago: string;
  paypal_id?: string;
  token?: string;
  productos?: VentaProducto[];
}

export interface VentaRequest {
  productos?: { [key: string]: number }[];
  metodo_pago?: string;
}