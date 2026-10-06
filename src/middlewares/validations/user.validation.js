import { body } from "express-validator";

export const createUserValidation = [
  body("name").notEmpty().withMessage("El name no debe ser vacio"),
  body("email")
    .notEmpty()
    .withMessage("El email no debe ser vacio")
    .isEmail()
    .withMessage("El email debe ser valido"),
  body("password").notEmpty().withMessage("La password no debe ser vacia"),
  body("person_id").notEmpty().withMessage("El person_id no debe ser vacio"),
];

export const updateUserValidation = [
  body("name").optional().notEmpty().withMessage("El name no debe ser vacio"),
  body("email")
    .notEmpty()
    .withMessage("El email no debe ser vacio")
    .isEmail()
    .withMessage("El email debe ser valido"),
  body("password").notEmpty().withMessage("La password no debe ser vacia"),
  body("person_id").notEmpty().withMessage("El person_id no debe ser vacio"),
];
