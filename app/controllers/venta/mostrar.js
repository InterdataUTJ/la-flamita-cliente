import Venta from '#models/Venta.js';
import { VentaShowError } from '#middlewares/error.middleware.js';

export default async function mostrar(req, res, next) {
  try {

    const ventaId = req.params.id;
    if (!ventaId) {
      return next(new VentaShowError('Venta no encontrada'));
    }

    const cliente_id = req.user._id;
    const venta = await Venta.findOne({ _id: ventaId, cliente_id }).populate('productos.producto_id');

    if (!venta) {
      return next(new VentaShowError('Venta no encontrada'));
    }

    return res.json(venta);

  } catch (error) {
    return next(new VentaShowError(error.message));
  }
};