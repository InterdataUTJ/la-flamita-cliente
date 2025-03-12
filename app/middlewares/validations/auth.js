import { email, text } from "./utils/custom.js";
import checkValidationResult from './utils/checkValidationResult.js';


export default function validate(method) {
  switch(method) {
    case "login": {
      return [
        email("correo", { articulo: "el" }),
        text("clave", { min: 8, max: 50, articulo: "la" }),
        checkValidationResult
      ]
    }

    case "singup": {
      return [
        text("nombre"),
        text("apellido"),
        email("correo"),
        text("clave", { min: 8, max: 50, articulo: "la" }),
        checkValidationResult
      ]
    }

    default: return [];
  }
}