import { body } from "express-validator";

/**
 * Validar que exista un archivo en la petición obligatoriamente
 * @param {string} message  Mensaje de error
 * @returns 
 */
export function file(message = "Falta el archivo") {
  return (
    body().custom((_, { req }) => {
      if (!(Array.isArray(req.files) && req.files.length === 1)) throw new Error(message);
      return true;
    })
  );
}

/**
 * Validar que exista al menos un archivo en la petición obligatoriamente
 * @param {string} message  Mensaje de error
 * @returns 
 */
export function files(message = "Falta al menos un archivo") {
  return (
    body().custom((_, { req }) => {
      if (!(Array.isArray(req.files) && req.files.length > 0)) throw new Error(message);
      return true;
    })
  );
}
