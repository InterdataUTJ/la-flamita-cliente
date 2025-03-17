import Http from "../base";
import { CategoriaResponse } from "./types";

export default class CategoriaService {
  static listar(): Promise<CategoriaResponse[]> {
    return Http.get<CategoriaResponse[]>("/categoria/listar") as Promise<CategoriaResponse[]>;
  }

  static mostrar(id: string): Promise<CategoriaResponse> {
    return Http.get<CategoriaResponse>(`/categoria/mostrar/${id}`) as Promise<CategoriaResponse>;
  }
}