import { body } from "express-validator";
import { email, text } from "./utils/custom.js";
import { file } from "./utils/file.js";
import checkValidationResult from './utils/checkValidationResult.js';

export default function validate(method) {
  switch(method) {
    case "editar": {
      return [
        text("nombre", { optional: true }),
        text("apellido", { optional: true }),
        email("correo", { optional: true }),
        text("clave", { min: 8, max: 50, articulo: "la", optional: true }),
        file("avatar", { type: "image", optional: true }),
        checkValidationResult
      ]
    }

    default: return [];
  }
}