import { Router } from "express";
import {
  createPerson,
  deletePerson,
  getAllPersons,
  getPersonById,
  updatePerson,
} from "../controllers/person.controller.js";

import { validate } from "../middlewares/validateResult.js";
import {
  createPersonValidation,
  updatePersonValidation,
} from "../middlewares/validations/person.validation.js";
import { body } from "express-validator";

export const personRouter = Router();

personRouter.post("/person", createPersonValidation, validate, createPerson);
personRouter.get("/person", getAllPersons);
personRouter.get("/person", getPersonById);
personRouter.put("/person", updatePersonValidation, validate, updatePerson);
personRouter.delete("/person", deletePerson);
