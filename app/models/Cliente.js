import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true, maxLength: 50 },
  apellido: { type: String, required: true, maxLength: 50 },
  correo: { type: String, required: true },
  estado: { type: Boolean, required: true, default: true },
  google_id: String,
  clave: String,
  avatar: String,
  carrito: [{
    producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true },
    descuento: { type: Number, required: true }
  }]
});

// Unique without counting undefined values
clienteSchema.index({ correo: 1 }, { unique: true, sparse: true });
clienteSchema.index({ google_id: 1 }, { unique: true, sparse: true });

// Methods
clienteSchema.statics.listar = function() {
  return this.find({ estado: true }).select('-clave -carrito');
}

// Methods
clienteSchema.statics.mostrar = function(clienteId) {
  return this.findOne({ estado: true, _id: clienteId }).select('-clave');
}

export default mongoose.model("Cliente", clienteSchema);