import { CarritoListError } from "#middlewares/error.middleware.js";
import Producto from "#models/Producto.js";

export default async function editar(req, res, next) {
  try {
    const { producto_id, cantidad } = req.body;
    const producto = await Producto.findById(producto_id);
    if (!producto) {
      return next(new CarritoListError("Producto no encontrado"));
    }

    const carrito = req.user.carrito;

    const item = carrito.find(item => item.producto_id.toString() === producto_id);
    if (!item) {
      carrito.push({
        producto_id,
        cantidad,
        precio: producto.precio,
        descuento: producto.descuento
      });
    } else {
      item.cantidad = cantidad;
    }

    await req.user.save();
    res.status(204).end();
  } catch (error) {
    return next(new CategoriaListError(error.message));
  }
};