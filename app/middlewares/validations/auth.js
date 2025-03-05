import { body } from "express-validator";

export default function validate(method) {
  switch(method) {
    case "login": {
      return [
        body("correo", "Falta el correo o es invalido").exists().isEmail(),
        body("clave", "Falta la clave o es invalida").exists().isLength({ min: 8, max: 255 }),
      ]
    }

    case "editar": {
      return [
        body("nombre", "El nombre es invalido").optional().isLength({ min: 3, max: 50 }),
        body("apellido", "El apellido es invalido").optional().isLength({ min: 3, max: 50 }),
        body("correo", "El correo es invalido").optional().isEmail(),
        body("clave", "La clave es invalida").optional().isLength({ min: 8, max: 255 }),
        // file("Falta el avatar").optional(),
      ]
    }
  }
}