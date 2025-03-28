import mongoose from 'mongoose';
import crypto from 'crypto';
import Venta from '#models/Venta.js';
import Producto from '#models/Producto.js';
import PaypalOrder from '#util/paypal/order/create.js';
import paypalContext from '#config/paypal.config.js';
import { VentaCreateError } from '#middlewares/error.middleware.js';

export default async function capturar(req, res, next) {

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const venta = await Venta.findOne({ paypal_id: req.query.token });
    if (!venta) {
      throw new VentaCreateError('Venta no encontrada');
    }

    // Validar existencias de los productos
    for (const producto of venta.productos) {
      // Actualizar el stock de los productos
      const prod = await Producto.findById(producto.producto_id);
      if (!prod) {
        throw new VentaCreateError(`Producto ${producto.producto_id} no encontrado`);
      }
      
      prod.existencias -= producto.cantidad;
      await prod.save({ session });
    }

    const order = new PaypalOrder(paypalContext);
    const success = await order.capture(req.query.token);

    if (!success || !order.isCompleted()) {
      throw new VentaCreateError('Error al capturar el pago');
    }

    venta.estado = 'PAGADO';
    venta.fecha_pago = new Date();
    venta.token = `${venta._id}:${crypto.randomBytes(5).toString('hex')}`; // 35 characters
    await venta.save({ session });

    await session.commitTransaction();
    session.endSession();

    const redirectTo = ``;
    if (process.env.NODE_ENV === 'production') return res.redirect(`${process.env.APP_URL}/venta/mostrar/${venta._id}`);
    return res.redirect(`http://localhost:5173/venta/mostrar/${venta._id}`);

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    
    if (process.env.NODE_ENV === 'production') return res.redirect(`${process.env.APP_URL}/carrito`);
    return res.redirect(`http://localhost:5173/carrito`);
  }
};