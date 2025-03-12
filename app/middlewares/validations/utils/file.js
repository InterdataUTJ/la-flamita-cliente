import { body } from "express-validator";

const fileTypes = {
  image: ["image/apng", "image/avif", "image/gif", "image/jpeg", "image/png", "image/webp", "image/svg+xml"],
}


const defaultOptions = {
  // general
  type: "image",
  optional: false,
  
  // files
  cantidad: undefined, // cantidad de archivos exacta que se esperan
  min: 1, // Si cantidad es undefined, se espera 
  max: 3, // un número de archivos entre min y max
}



export function file(campo, options = defaultOptions) {
  const newOptions = { ...defaultOptions, ...options };
  const allowedTypes = fileTypes[newOptions.type] || [];
  return (
    body().custom((_, { req }) => {
      // Validar que exista el archivo
      if (!Array.isArray(req.files) || !req.files.length) {
        if (!newOptions.optional) throw new Error(`Falta el archivo ${campo}`);
        return true;
      }
      
      // Validar la cantidad de archivos
      const cantidad = req.files.filter((file) => file.fieldname === campo).length;
      if (cantidad > 1) throw new Error(`Solo se permite un archivo ${campo}`);
      if (cantidad === 0) {
        if (newOptions.optional) return true;
        throw new Error(`Falta el archivo ${campo}`);
      }

      // Validar el tipo de archivo
      const wrongType = req.files.filter((file) => file.fieldname === campo && !allowedTypes.includes(file.mimetype));
      if (wrongType.length > 0) throw new Error(`El archivo ${campo} no es un tipo ${newOptions.type} permitido: ${allowedTypes.join(", ")}`);

      return true;
    })
  );
}


export function files(campo, options = defaultOptions) {
  const newOptions = { ...defaultOptions, ...options };
  const allowedTypes = fileTypes[newOptions.type] || [];
  return (
    body().custom((_, { req }) => {
      // Validar que exista el archivo
      if (!Array.isArray(req.files) || !req.files.length) {
        if (!newOptions.optional) throw new Error(`Faltan los archivos ${campo}`);
        return true;
      }
      
      // Validar la cantidad de archivos
      const cantidad = req.files.filter((file) => file.fieldname === campo).length;
      if (cantidad === 0) {
        if (newOptions.optional) return true;
        throw new Error(`Faltan los archivos ${campo}`);
      }

      if (newOptions.cantidad && cantidad !== newOptions.cantidad) throw new Error(`Se esperan ${newOptions.cantidad} archivos ${campo}`);
      if (!newOptions.cantidad && (cantidad < newOptions.min || cantidad > newOptions.max)) throw new Error(`Se esperan entre ${newOptions.min} y ${newOptions.max} archivos ${campo}`);

      // Validar el tipo de archivo
      const wrongType = req.files.filter((file) => file.fieldname === campo && !allowedTypes.includes(file.mimetype));
      if (wrongType.length > 0) throw new Error(`El archivo ${campo} no es un tipo permitido: ${allowedTypes.join(", ")}`);

      return true;
    })
  );
}