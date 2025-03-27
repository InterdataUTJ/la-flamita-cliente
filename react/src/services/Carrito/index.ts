import Http from "../base";
import { Carrito } from "./types";

export default class CarritoService {
  static listar(jwt: string): Promise<Carrito> {
    return Http.get<Carrito>("/carrito/listar", { jwt }) as Promise<Carrito>;
  }

  static editar(jwt: string, producto_id: string, cantidad: number) {
    return Http.post("/carrito/editar", { producto_id, cantidad }, { jwt });
  }

  static agregar(jwt: string, producto_id: string, cantidad: number) {
    return Http.put("/carrito/editar", { producto_id, cantidad }, { jwt });
  }

  static eliminar(jwt: string, id: string) {
    return Http.delete(`/carrito/eliminar/${id}`, { jwt });
  }
}