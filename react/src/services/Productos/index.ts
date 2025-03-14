import Http from "../base";
import { ProductoResponse, ProductoRequest } from "./types";

export default class ProductoService {
  static listar(jwt: string): Promise<ProductoResponse[]> {
    return Http.get<ProductoResponse[]>("/producto/listar", { jwt }) as Promise<ProductoResponse[]>;
  }

  static crear(jwt: string, producto: ProductoRequest) {
    return Http.post<undefined>("/producto/crear", producto, { jwt, asForm: true });
  }

  static editar(jwt: string, id: string, producto: ProductoRequest) {
    return Http.put<undefined>(`/producto/editar/${id}`, producto, { jwt, asForm: true });
  }

  static mostrar(jwt: string, id: string): Promise<ProductoResponse> {
    return Http.get<ProductoResponse>(`/producto/mostrar/${id}`, { jwt }) as Promise<ProductoResponse>;
  }

  static eliminar(jwt: string, id: string) {
    return Http.delete<undefined>(`/producto/eliminar/${id}`, { jwt });
  }
}