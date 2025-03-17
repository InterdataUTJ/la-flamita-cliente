import Http from "../base";
import { ProductoResponse } from "./types";

export default class ProductoService {
  static listar(): Promise<ProductoResponse[]> {
    return Http.get<ProductoResponse[]>("/producto/listar") as Promise<ProductoResponse[]>;
  }

  static mostrar(id: string): Promise<ProductoResponse> {
    return Http.get<ProductoResponse>(`/producto/mostrar/${id}`) as Promise<ProductoResponse>;
  }
}