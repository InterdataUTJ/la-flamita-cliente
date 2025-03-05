import mongoose from "mongoose";

const empleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, maxLength: 50 },
  apellido: { type: String, required: true, maxLength: 50 },
  correo: { type: String, required: true },
  clave: String,
  avatar: String,
  estado: { type: Boolean, required: true, default: true },
  rol: { type: String, enum: ['ADMINISTRADOR', 'GERENTE', 'EMPLEADO'], required: true, default: 'EMPLEADO' },
});

// Unique without counting undefined values
empleadoSchema.index({ correo: 1 }, { unique: true, sparse: true });

// Methods
empleadoSchema.statics.listar = function() {
  return this.find({ estado: true }).select('-clave');
}

// Methods
empleadoSchema.statics.mostrar = function(empleadoId) {
  return this.findOne({ estado: true, _id: empleadoId }).select('-clave');
}

export default mongoose.model("Empleado", empleadoSchema);