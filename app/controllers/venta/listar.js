import Venta from '#models/Venta.js';
import { VentaListError } from '#middlewares/error.middleware.js';

export default async function listar(req, res, next) {
  try {

    const cliente_id = req.user._id;
    const ventas = await Venta.find({ cliente_id, estado: { $ne: "PENDIENTE" } }).populate('productos.producto_id').sort({ fecha_compra: -1 });
    return res.json(ventas);

  } catch (error) {
    return next(new VentaListError(error.message));
  }
};