import { body } from "express-validator";

export const createTaskValidation = [
  body("title")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isString()
    .withMessage("El título debe ser una cadena de texto")
    .isLength({ max: 100 })
    .withMessage("El título no puede superar los 100 caracteres"),

  body("description")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isString()
    .withMessage("La descripción debe ser una cadena de texto")
    .isLength({ max: 100 })
    .withMessage("La descripción no puede superar los 100 caracteres"),

  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage(
      "El campo 'isComplete' debe ser de tipo booleano (true o false)",
    ),
];

export const updateTaskValidation = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("El título no puede estar vacío")
    .isString()
    .withMessage("El título debe ser una cadena de texto")
    .isLength({ max: 100 })
    .withMessage("El título no puede superar los 100 caracteres"),

  body("description")
    .optional()
    .notEmpty()
    .withMessage("La descripción no puede estar vacía")
    .isString()
    .withMessage("La descripción debe ser una cadena de texto")
    .isLength({ max: 100 })
    .withMessage("La descripción no puede superar los 100 caracteres"),

  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage(
      "El campo 'isComplete' debe ser de tipo booleano (true o false)",
    ),
];
