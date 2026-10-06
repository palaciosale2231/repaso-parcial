import { matchedData } from "express-validator";
import { TaskModel } from "../models/task.models.js";

// GET /api/tasks - Obtener todas las tareas
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error en getAllTasks:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET /api/tasks/:id - Obtener una tarea por ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const task = await TaskModel.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error("Error en getTaskById:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// POST /api/tasks - Crear una nueva tarea
export const createTask = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const newTask = await TaskModel.create(validatedData);

    return res.status(201).json({
      message: "Tarea creada correctamente",
      task: newTask,
    });
  } catch (error) {
    console.error("Error en createTask:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT /api/tasks/:id - Actualizar tarea
export const updateTask = async (req, res) => {
  try {
    const { id, ...dataToUpdate } = matchedData(req);

    const task = await TaskModel.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    await task.update(dataToUpdate);

    return res.status(200).json({
      message: "Tarea actualizada correctamente",
      task,
    });
  } catch (error) {
    console.error("Error en updateTask:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// DELETE /api/tasks/:id - Eliminar tarea
export const deleteTask = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const task = await TaskModel.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    await task.destroy();
    return res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error("Error en deleteTask:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
