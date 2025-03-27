import { CarritoListError } from "#middlewares/error.middleware.js";
import Producto from "#models/Producto.js";

export default async function eliminar(req, res, next) {
  try {
    const { productoId } = req.params;
    const producto = await Producto.findById(productoId);
    if (!producto) {
      console.log(productoId, producto);
      return next(new CarritoListError("Producto no encontrado"));
    }

    const carrito = req.user.carrito;

    const itemIdx = carrito.findIndex(item => item.producto_id.toString() === productoId);
    if (itemIdx === -1) throw new CarritoListError("Producto no encontrado en el carrito");
    req.user.carrito.splice(itemIdx, 1);
    
    await req.user.save();
    res.status(204).end();

  } catch (error) {
    return next(new CategoriaListError(error.message));
  }
};