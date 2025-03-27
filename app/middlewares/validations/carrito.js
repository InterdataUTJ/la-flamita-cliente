import { body, param } from 'express-validator';
import { number } from './utils/custom.js';
import checkValidationResult from './utils/checkValidationResult.js';


export default function validate(method) {
  switch(method) {
    case "editar": {
      return [        
        body("producto_id", "Falta el ID de producto").exists().isString().withMessage("El ID debe de ser un string").trim().notEmpty().withMessage("El ID no puede estar vacío"),
        number("cantidad", { minNumber: 1, decimal: false, articulo: "la" }),
        checkValidationResult
      ]
    }

    case "eliminar": {
      return [        
        param("productoId", "Falta el ID de producto").exists().isString().withMessage("El ID debe de ser un string").trim().notEmpty().withMessage("El ID no puede estar vacío"),
        checkValidationResult
      ]
    }

    default: return [];
  }
}