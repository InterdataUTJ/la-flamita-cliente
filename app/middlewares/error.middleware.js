import print from "#util/print/index.js";

// Error handler middleware
export default (err, req, res, next) => {
  console.log(err);
  print.error(req.method, `${req.originalUrl}:`, err.name, err.message);
  if (err.name && err.code && err.message) {
    return res.status(err.code).json({ message: err.message, name: err.name });
  }

  return res.status(500).json({ message: 'A ocurrido un error inesperado', name: err.name });
}


function errorMaker (name, defaultMessage = '', defaultCode = 500) {
  return (class ErrorMaker extends Error {
    constructor (message = defaultMessage, code = defaultCode) {
      super(message);
      this.name = name;
      this.code = code;
    }
  });
}




// ====================================
// ======                        ======
// ======       Error List       ======
// ======                        ======
// ====================================


// ===== Request Errors =====
/** Error en los datos enviados */
export const ValidationError = errorMaker('ValidationError', 'Error en los datos enviados: {{message}}', 400);



// ===== Perfil Errors =====

/** No se encontro un JWT valido */
export const JwtMissingError = errorMaker('JwtMissingError', 'No se encontro un JWT valido', 403);
/** El JWT no es valido o esta expirado */
export const JwtInvalidError = errorMaker('JwtInvalidError', 'El JWT no es valido o esta expirado', 403);
/** Las credenciales no son correctas */
export const InvalidAuthError = errorMaker('InvalidAuthError', 'Las credenciales no son correctas', 400);
/** Error al actualizar el perfil */
export const PerfilUpdateError = errorMaker('PerfilUpdateError', 'Error al actualizar el perfil', 500);
/** Error al mostrar el perfil */
export const PerfilShowError = errorMaker('PerfilShowError', 'Error al mostrar el perfil', 500);
/** Error al desactivar el perfil */
export const PerfilDeleteError = errorMaker('PerfilDeleteError', 'Error al desactivar el perfil', 500);



// ===== Producto Errors =====

/** Error al listar los productos */
export const ProductoListError = errorMaker('ProductoListError', 'Error al listar los productos', 500);
/** Error al mostrar el producto */
export const ProductoShowError = errorMaker('ProductoShowError', 'Error al mostrar el producto', 500);



// ===== Categoria Errors =====

/** Error al listar los productos */
export const CategoriaListError = errorMaker('CategoriaListError', 'Error al listar los Categorias', 500);
/** Error al mostrar el Categoria */
export const CategoriaShowError = errorMaker('CategoriaShowError', 'Error al mostrar el Categoria', 500);



// ===== Venta Errors =====

/** Error al listar los productos */
export const VentaListError = errorMaker('VentaListError', 'Error al listar los Ventas', 500);
/** Error al crear el Venta */
export const VentaCreateError = errorMaker('VentaCreateError', 'Error al crear el Venta', 500);
/** Error al editar el Venta */
export const VentaUpdateError = errorMaker('VentaUpdateError', 'Error al editar el Venta', 500);
/** Error al eliminar el Venta */
export const VentaDeleteError = errorMaker('VentaDeleteError', 'Error al eliminar el Venta', 500);
/** Error al mostrar el Venta */
export const VentaShowError = errorMaker('VentaShowError', 'Error al mostrar el Venta', 500);