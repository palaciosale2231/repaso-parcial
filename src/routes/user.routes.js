import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { validate } from "../middlewares/validateResult.js";
import {
  createUserValidation,
  updateUserValidation,
} from "../middlewares/validations/user.validation.js";
import { body } from "express-validator";

export const userRouter = Router();

userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUserById);
userRouter.post("/users", createUserValidation, validate, createUser);
userRouter.put("/users/:id", updateUserValidation, validate, updateUser);
userRouter.delete("/users/:id", deleteUser);
