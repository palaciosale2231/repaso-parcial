import { Router } from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  getRoleById,
  updateRole,
} from "../controllers/role.controller.js";

import { validate } from "../middlewares/validateResult.js";
import {
  createRoleValidation,
  updateRoleValidation,
} from "../middlewares/validations/role.validation.js";
import { body } from "express-validator";

export const roleRouter = Router();

roleRouter.post("/rol", createRoleValidation, validate, createRole);
roleRouter.get("/rol", getAllRoles);
roleRouter.get("/rol", getRoleById);
roleRouter.put("/rol", updateRoleValidation, validate, updateRole);
roleRouter.delete("/rol", deleteRole);
