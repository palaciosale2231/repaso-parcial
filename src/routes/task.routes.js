import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

export const taskRouter = Router();

taskRouter.get("/tasks", getAllTasks);
taskRouter.get("/tasks/:id", getTaskById);
taskRouter.post("/tasks", createTask);
taskRouter.put("/tasks/:id", updateTask);
taskRouter.delete("/tasks/:id", deleteTask);