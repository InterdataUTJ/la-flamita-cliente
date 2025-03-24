import checkValidationResult from './utils/checkValidationResult.js';
import { param } from "express-validator";


export default function validate(method) {
  switch(method) {
    case "mostrar": {
      return [
        param('categoriaId').exists().isString().trim().notEmpty(),
        checkValidationResult
      ]
    }

    default: return [];
  }
}