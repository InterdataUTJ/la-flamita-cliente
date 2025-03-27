import Http from "../base";
import { VentaResponse, VentaRequest } from "./types";

export default class VentaService {
  static listar(jwt: string): Promise<VentaResponse[]> {
    return Http.get<VentaResponse[]>("/venta/listar", { jwt }) as Promise<VentaResponse[]>;
  }

  static crear(jwt: string): Promise<VentaRequest> { 
    return Http.post<VentaRequest>("/venta/crear", {}, { jwt }) as Promise<VentaRequest>;
  }

  static editar(jwt: string, id: string, venta: VentaRequest) {
    return Http.put<undefined>(`/venta/editar/${id}`, venta, { jwt });
  }

  static mostrar(jwt: string, id: string): Promise<VentaResponse> {
    return Http.get<VentaResponse>(`/venta/mostrar/${id}`, { jwt }) as Promise<VentaResponse>;
  }
}