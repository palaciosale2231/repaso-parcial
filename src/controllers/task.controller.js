import { TaskModel } from "../models/task.models.js";


// GET /api/tasks - Obtener todas las tareas
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll();
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET /api/tasks/:id - Obtener una tarea por ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// POST /api/tasks - Crear una nueva tarea
export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;

    // Validar title (no vacío, string, max 100 caracteres, único)
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ message: "El título es obligatorio y no puede estar vacío" });
    }
    if (title.length > 100) {
      return res.status(400).json({ message: "El título no puede superar los 100 caracteres" });
    }
    const existingTitle = await TaskModel.findOne({ where: { title: title.trim() } });
    if (existingTitle) {
      return res.status(400).json({ message: "El título de la tarea ya se encuentra registrado" });
    }

    // Validar description (no vacía, string, max 100 caracteres)
    if (!description || typeof description !== "string" || description.trim() === "") {
      return res.status(400).json({ message: "La descripción es obligatoria y no puede estar vacía" });
    }
    if (description.length > 100) {
      return res.status(400).json({ message: "La descripción no puede superar los 100 caracteres" });
    }

    // Validar isComplete (debe ser booleano si se envía)
    if (isComplete !== undefined && typeof isComplete !== "boolean") {
      return res.status(400).json({ message: "El campo 'isComplete' debe ser de tipo booleano (true o false)" });
    }

    const newTask = await Task.create({
      title: title.trim(),
      description: description.trim(),
      isComplete: isComplete ?? false
    });

    return res.status(201).json({
      message: "Tarea creada correctamente",
      task: newTask
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT /api/tasks/:id - Actualizar tarea
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;

    const task = await TaskModel.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // Validar title si fue enviado
    if (title !== undefined) {
      if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({ message: "El título no puede estar vacío" });
      }
      if (title.length > 100) {
        return res.status(400).json({ message: "El título no puede superar los 100 caracteres" });
      }
      const existingTitle = await TaskModel.findOne({
        where: { title: title.trim(), id: { [Op.ne]: id } }
      });
      if (existingTitle) {
        return res.status(400).json({ message: "El título ya está registrado en otra tarea" });
      }
    }

    // Validar description si fue enviada
    if (description !== undefined) {
      if (typeof description !== "string" || description.trim() === "") {
        return res.status(400).json({ message: "La descripción no puede estar vacía" });
      }
      if (description.length > 100) {
        return res.status(400).json({ message: "La descripción no puede superar los 100 caracteres" });
      }
    }

    // Validar isComplete si fue enviado
    if (isComplete !== undefined && typeof isComplete !== "boolean") {
      return res.status(400).json({ message: "El campo 'isComplete' debe ser de tipo booleano (true o false)" });
    }

    await task.update({
      title: title ? title.trim() : task.title,
      description: description ? description.trim() : task.description,
      isComplete: isComplete !== undefined ? isComplete : task.isComplete
    });

    return res.status(200).json({
      message: "Tarea actualizada correctamente",
      task
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// DELETE /api/tasks/:id - Eliminar tarea
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    await task.destroy();
    return res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};