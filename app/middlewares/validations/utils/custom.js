import { check } from "express-validator";

const defaultOptions = {
  // general
  min: 3,
  max: 50,
  articulo: "El",
  optional: false,

  // number
  decimal: false,
  minNumber: 0,
  maxNumber: undefined,
}


export function text(campo, options = defaultOptions) {
  const newOptions = { ...defaultOptions, ...options };
  const articulo = [newOptions.articulo.charAt(0).toUpperCase() + newOptions.articulo.slice(1).toLowerCase(), newOptions.articulo.slice(1).toLowerCase()];
  let chain = check(campo);

  if (newOptions.optional) chain = chain.optional();
  else chain = chain.exists().withMessage(`Falta ${articulo[1]} ${campo}`);
  
  return chain
    .trim().notEmpty().withMessage(`${articulo[0]} ${campo} no puede estar vacio`)
    .isString().withMessage(`${articulo[0]} ${campo} debe ser texto`)
    .isLength({ min: newOptions.min, max: newOptions.max }).withMessage(`${articulo[0]} ${campo} debe tener entre ${newOptions.min} y ${newOptions.max} caracteres`);
}


export function email(campo, options) {
  const newOptions = { ...defaultOptions, ...options };
  const articulo = [newOptions.articulo.charAt(0).toUpperCase() + newOptions.articulo.slice(1).toLowerCase(), newOptions.articulo.slice(1).toLowerCase()];
  let chain = check(campo);
  
  if (newOptions.optional) chain = chain.optional();
  else chain = chain.exists().withMessage(`Falta ${articulo[1]} ${campo}`);
  
  return chain
    .trim().notEmpty().withMessage(`${articulo[0]} ${campo} no puede estar vacio`)
    .isString().withMessage(`${articulo[0]} ${campo} debe ser texto`)
    .isEmail().withMessage(`${articulo[0]} ${campo} debe ser un correo valido`);
}


const decimalChain = (init, { max, min, articulo, campo }) => {
  const opt = max ? { max, min } : { min };
  return init.isFloat(opt).toFloat().withMessage(`${articulo[0]} ${campo} debe ser un numero decimal entre ${min} y ${max ? max : "cualquier numero"}`);
}

const intChain = (init, { max, min, articulo, campo }) => {
  const opt = max ? { max, min } : { min };
  return init.isInt(opt).toInt().withMessage(`${articulo[0]} ${campo} debe ser un numero entero entre ${min} y ${max ? max : "cualquier numero"}`);
}

const optional = (init, { optional, articulo, campo }) => optional ? init.optional() : init.exists().withMessage(`Falta ${articulo[1]} ${campo}`);

export function number(campo, options = defaultOptions) {
  const newOptions = { ...defaultOptions, ...options };
  const articulo = [newOptions.articulo.charAt(0).toUpperCase() + newOptions.articulo.slice(1).toLowerCase(), newOptions.articulo.slice(1).toLowerCase()];
  const chain = check(campo).isNumeric().withMessage(`${articulo[0]} ${campo} debe ser un numero`);
  const newChain = optional(chain, { optional: newOptions.optional, articulo, campo });

  if (newOptions.decimal) return decimalChain(newChain, { 
    max: newOptions.maxNumber, 
    min: newOptions.minNumber, 
    articulo, 
    campo 
  });
  
  return intChain(newChain, { 
    max: newOptions.maxNumber, 
    min: newOptions.minNumber, 
    articulo, 
    campo 
  });
}