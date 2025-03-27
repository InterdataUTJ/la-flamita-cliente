import { CategoriaListError } from "#middlewares/error.middleware.js";
import Cliente from "#models/Cliente.js";

export default async function listar(req, res, next) {
  try {
    const usuario = await Cliente.findById(req.user._id).populate("carrito.producto_id");
    if (!usuario) throw new CategoriaListError("Error de Autenticación");
    const carrito = usuario.carrito;
    
    const respuesta = {
      subtotal: 0,
      descuento: 0,
      total: 0,
      carrito
    };

    carrito.forEach(item => {
      respuesta.subtotal += item.precio * item.cantidad;
      respuesta.descuento += (item.precio * (item.descuento / 100)) * item.cantidad;
    });

    respuesta.total = respuesta.subtotal - respuesta.descuento;
    res.json(respuesta);

  } catch (error) {
    return next(new CategoriaListError(error.message));
  }
};