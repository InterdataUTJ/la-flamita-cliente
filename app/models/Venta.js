import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
  empleado_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado' },
  cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  fecha_venta: { type: Date, required: true, default: Date.now },
  fecha_pago: { type: Date, required: true, default: Date.now },
  estado: { type: String, required: true, enum: ['PENDIENTE', 'PAGADO', 'COMPLETADO'], default: 'PENDIENTE' },
  token: String,
  metodo_pago: { type: String, required: true },
  paypal_id: String,
  productos: [{
    producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true },
    descuento: { type: Number, required: true }
  }]
});

// Unique without counting undefined values
ventaSchema.index({ token: 1 }, { unique: true, sparse: true });
ventaSchema.index({ paypal_id: 1 }, { unique: true, sparse: true });

// Methods
ventaSchema.statics.listar = function() {
  return this.find().select('-token -productos');
}

export default mongoose.model("Venta", ventaSchema);