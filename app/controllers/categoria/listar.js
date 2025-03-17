import { CategoriaListError } from "#middlewares/error.middleware.js";
import Categoria from "#models/Categoria.js";

export default async function listar(_, res, next) {
  try {
    const categorias = await Categoria.listar();
    res.json(categorias);
  } catch (error) {
    return next(new CategoriaListError(error.message));
  }
};