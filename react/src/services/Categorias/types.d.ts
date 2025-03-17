export interface CategoriaDato {
  _id: string;
  nombre: string;
}

export interface CategoriaResponse {
  _id: string;
  datos: number | CategoriaDato[];
  nombre: string;
  descripcion: string;
}