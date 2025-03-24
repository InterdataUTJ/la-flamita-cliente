import checkValidationResult from './utils/checkValidationResult.js';
import { param, query } from "express-validator";


export default function validate(method) {
  switch(method) {
    case "capturar": {
      return [
        query('token').exists().isString().trim().notEmpty(),
        checkValidationResult
      ]
    }

    case "mostrar": {
      return [
        param('id').exists().isString().trim().notEmpty(),
        checkValidationResult
      ]
    }

    default: return [];
  }
}