import mongoose from "mongoose";
import Producto from "./Producto.js";

const categoriaDatosSchema = new mongoose.Schema({
  nombre: { type: String, required: true, maxLength: 50 },
});

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, maxLength: 50 },
  descripcion: { type: String, required: true },
  datos: [categoriaDatosSchema]
});

// Unique without counting undefined values
categoriaSchema.index({ nombre: 1 }, { unique: true });
categoriaDatosSchema.index({ nombre: 1 }, { unique: true });

// Methods
categoriaSchema.statics.listar = function() {
  return this.find().lean();
}


// Middleware
categoriaSchema.pre("save", async function (next) {
  if (!this.isModified("datos")) return next(); // Solo si `datos` cambió
  const datosIds = new Set(this.datos.map((d) => d._id.toString())); // Obtener los IDs actuales

  // Buscar productos que referencian datos eliminados y actualizar su array
  await Producto.updateMany(
    { categorias: { $nin: [...datosIds] } }, // Buscar productos con categorías que ya no existen
    { $pull: { categorias: { $nin: [...datosIds] } } } // Eliminar referencias a datos eliminados
  );

  next();
});

// Middleware para eliminar referencias en `Producto.categorias` cuando se elimina una categoría
categoriaSchema.pre("findByIdAndDelete", async function (next) {
  // Obtenemos la categoría a eliminar
  const categoria = await this.model.findById(this.getQuery()._id);
  
  if (!categoria) return next(); // Si no existe la categoría, no hacemos nada

  const datosIds = categoria.datos.map((d) => d._id.toString()); // Obtener los _id de los datos de la categoría

  // Si hay datos relacionados, eliminamos las referencias en Producto
  if (datosIds.length > 0) {
    await Producto.updateMany(
      { categorias: { $in: datosIds } }, // Buscar productos que tengan alguna referencia en `categorias`
      { $pull: { categorias: { $in: datosIds } } } // Eliminar las referencias en `categorias`
    );
  }

  next();
});



export default mongoose.model("Categoria", categoriaSchema);