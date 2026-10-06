import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

import { validate } from "../middlewares/validateResult.js";
import {
  createTaskValidation,
  updateTaskValidation,
} from "../middlewares/validations/task.validation.js";
import { body } from "express-validator";

export const taskRouter = Router();

taskRouter.get("/tasks", getAllTasks);
taskRouter.get("/tasks/:id", getTaskById);
taskRouter.post("/tasks", createTaskValidation, validate, createTask);
taskRouter.put("/tasks/:id", updateTaskValidation, validate, updateTask);
taskRouter.delete("/tasks/:id", deleteTask);
