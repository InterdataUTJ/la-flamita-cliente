import Categoria from "#models/Categoria.js";
import { CategoriaShowError } from "#middlewares/error.middleware.js";

export default async function mostrar(req, res, next) {
  try {
    const categoria = await Categoria.findById(req.params.categoriaId);
    if (!categoria) {
      return next(new CategoriaShowError("Categoria no encontrada"));
    }

    return res.json(categoria);
  } catch (error) {
    return next(new CategoriaShowError(error.message));
  }
};