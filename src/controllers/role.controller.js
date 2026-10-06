import { matchedData } from "express-validator";
import { RoleModel } from "../models/role.models.js";

// GET /api/roles - Obtener todos los roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await RoleModel.findAll();
    return res.status(200).json(roles);
  } catch (error) {
    console.error("Error en getAllRoles:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET /api/roles/:id - Obtener un rol por ID
export const getRoleById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const role = await RoleModel.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    return res.status(200).json(role);
  } catch (error) {
    console.error("Error en getRoleById:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// POST /api/roles - Crear un nuevo rol
export const createRole = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const newRole = await RoleModel.create(validatedData);

    return res.status(201).json({
      message: "Rol creado correctamente",
      role: newRole,
    });
  } catch (error) {
    console.error("Error en createRole:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT /api/roles/:id - Actualizar rol
export const updateRole = async (req, res) => {
  try {
    const { id, ...dataToUpdate } = matchedData(req);

    const role = await RoleModel.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    await role.update(dataToUpdate);

    return res.status(200).json({
      message: "Rol actualizado correctamente",
      role,
    });
  } catch (error) {
    console.error("Error en updateRole:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// DELETE /api/roles/:id - Eliminar rol
export const deleteRole = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const role = await RoleModel.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    await role.destroy();
    return res.status(200).json({ message: "Rol eliminado correctamente" });
  } catch (error) {
    console.error("Error en deleteRole:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
