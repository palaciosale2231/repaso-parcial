import { RoleModel } from "../models/role.models.js"; // Ajusta la ruta según tu proyecto

// GET /api/roles - Obtener todos los roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await RoleModel.findAll();
    return res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET /api/roles/:id - Obtener un rol por ID
export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await RoleModel.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    return res.status(200).json(role);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// POST /api/roles - Crear un nuevo rol
export const createRole = async (req, res) => {
  try {
    const { rolename } = req.body;

    // Validar rolename (no vacío, string, max 100 caracteres)
    if (!rolename || typeof rolename !== "string" || rolename.trim() === "") {
      return res.status(400).json({ message: "El nombre del rol es obligatorio y no puede estar vacío" });
    }
    if (rolename.length > 100) {
      return res.status(400).json({ message: "El nombre del rol no puede superar los 100 caracteres" });
    }

    // Verificar si el rol ya existe
    const existingRole = await RoleModel.findOne({ where: { rolename: rolename.trim() } });
    if (existingRole) {
      return res.status(400).json({ message: "El rol ya se encuentra registrado" });
    }

    const newRole = await RoleModel.create({
      rolename: rolename.trim(),
    });

    return res.status(201).json({
      message: "Rol creado correctamente",
      role: newRole
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT /api/roles/:id - Actualizar rol
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { rolename } = req.body;

    const role = await RoleModel.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    // Validar rolename si fue enviado
    if (rolename !== undefined) {
      if (typeof rolename !== "string" || rolename.trim() === "") {
        return res.status(400).json({ message: "El nombre del rol no puede estar vacío" });
      }
      if (rolename.length > 100) {
        return res.status(400).json({ message: "El nombre del rol no puede superar los 100 caracteres" });
      }
      
      // Buscar si el rol ya existe
      const existingRole = await RoleModel.findOne({
        where: { rolename: rolename.trim() }
      });
      
      // Si existe, verificamos que el ID no sea el del rol que estamos editando
      if (existingRole && existingRole.id.toString() !== id.toString()) {
        return res.status(400).json({ message: "El nombre del rol ya está registrado por otro rol" });
      }
    }

    await role.update({
      rolename: rolename ? rolename.trim() : role.rolename,
    });

    return res.status(200).json({
      message: "Rol actualizado correctamente",
      role
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// DELETE /api/roles/:id - Eliminar rol
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await RoleModel.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    await role.destroy();
    return res.status(200).json({ message: "Rol eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};