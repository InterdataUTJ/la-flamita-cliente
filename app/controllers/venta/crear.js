import mongoose from 'mongoose';
import Venta from '#models/Venta.js';
import Producto from '#models/Producto.js';
import PaypalOrder from '#util/paypal/order/create.js';
import paypalContext from '#config/paypal.config.js';
import { VentaCreateError } from '#middlewares/error.middleware.js';

export default async function crear(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    // Obtener productos del carrito del usuario
    const productos = req.user.carrito.toObject();

    // Verificar que haya productos en el carrito
    if (!productos.length) {
      throw new VentaCreateError('No hay productos en el carrito');
    }

    // Crear la venta en la base de datos
    const venta = new Venta();
    venta.cliente_id = req.user._id;
    venta.fecha_venta = new Date();
    venta.fecha_pago = new Date();
    venta.estado = 'PENDIENTE';
    venta.metodo_pago = 'PAYPAL';
    venta.productos = productos;
    let total = 0;

    // Validar existencias de los productos
    for (const producto of productos) {
      // Actualizar el stock de los productos
      const prod = await Producto.findById(producto.producto_id);
      if (!prod) {
        throw new VentaCreateError(`Producto ${producto.producto_id} no encontrado`);
      }
      
      if (prod.existencias < producto.cantidad) {
        throw new VentaCreateError(`No hay suficiente stock para el producto ${producto.producto_id}`);
      }
      
      // No restar existencias hasta que se haya realizado el pago
      // prod.existencias -= producto.cantidad;
      total += (producto.precio - ((producto.descuento / 100) * producto.precio)) * producto.cantidad;
    }

    // Crear la orden de pago en Paypal
    const order = new PaypalOrder(paypalContext);
    const success = await order.create(total);
    if (!success) {
      throw new VentaCreateError('Error al crear la orden de pago');
    }

    // Guardar el id de la orden de paypal en la venta
    venta.paypal_id = order.id();
    await venta.save({ session });

    // Limpiar el carrito del usuario
    req.user.carrito = [];
    await req.user.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();
    
    res.json({
      paypalId: order.id(),
      paypalLink: order.link()
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return next(new VentaCreateError(error.message));
  }
};