import { body } from "express-validator";

export const createPersonValidation = [
  body("name")
    .notEmpty()
    .withMessage("El nombre no debe estar vacío")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto"),
  body("lastname")
    .notEmpty()
    .withMessage("El apellido no debe estar vacío")
    .isString()
    .withMessage("El apellido debe ser una cadena de texto"),
];

export const updatePersonValidation = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("El nombre no debe estar vacío"),
  body("lastname")
    .optional()
    .notEmpty()
    .withMessage("El apellido no debe estar vacío"),
];
