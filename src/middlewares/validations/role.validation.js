import { body } from "express-validator";

export const createRoleValidation = [
  body("rolename")
    .notEmpty()
    .withMessage("El nombre del rol es obligatorio")
    .isString()
    .withMessage("El nombre del rol debe ser una cadena de texto")
    .isLength({ max: 100 })
    .withMessage("El nombre del rol no puede superar los 100 caracteres"),
];

export const updateRoleValidation = [
  body("rolename")
    .optional()
    .notEmpty()
    .withMessage("El nombre del rol no puede estar vacío")
    .isString()
    .withMessage("El nombre del rol debe ser una cadena de texto")
    .isLength({ max: 100 })
    .withMessage("El nombre del rol no puede superar los 100 caracteres"),
];
