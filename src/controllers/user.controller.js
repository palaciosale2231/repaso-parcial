import { User } from "../models/user.models.js";


// GET /api/users - Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET /api/users/:id - Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// POST /api/users - Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validar name (no vacío, string, max 100 caracteres)
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ message: "El nombre es obligatorio y no puede estar vacío" });
    }
    if (name.length > 100) {
      return res.status(400).json({ message: "El nombre no puede superar los 100 caracteres" });
    }

    // Validar email (no vacío, string, max 100 caracteres, único)
    if (!email || typeof email !== "string" || email.trim() === "") {
      return res.status(400).json({ message: "El email es obligatorio y no puede estar vacío" });
    }
    if (email.length > 100) {
      return res.status(400).json({ message: "El email no puede superar los 100 caracteres" });
    }
    const existingEmail = await User.findOne({ where: { email: email.trim() } });
    if (existingEmail) {
      return res.status(400).json({ message: "El email ya se encuentra registrado" });
    }

    // Validar password (no vacío, string, max 100 caracteres)
    if (!password || typeof password !== "string" || password.trim() === "") {
      return res.status(400).json({ message: "La contraseña es obligatoria y no puede estar vacía" });
    }
    if (password.length > 100) {
      return res.status(400).json({ message: "La contraseña no puede superar los 100 caracteres" });
    }

    const newUser = await User.create({
      name: name.trim(),
      email: email.trim(),
      password: password.trim()
    });

    return res.status(201).json({
      message: "Usuario creado correctamente",
      user: newUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT /api/users/:id - Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Validar name si fue enviado
    if (name !== undefined) {
      if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ message: "El nombre no puede estar vacío" });
      }
      if (name.length > 100) {
        return res.status(400).json({ message: "El nombre no puede superar los 100 caracteres" });
      }
    }

    // Validar email si fue enviado
    if (email !== undefined) {
      if (typeof email !== "string" || email.trim() === "") {
        return res.status(400).json({ message: "El email no puede estar vacío" });
      }
      if (email.length > 100) {
        return res.status(400).json({ message: "El email no puede superar los 100 caracteres" });
      }
      const existingEmail = await User.findOne({
        where: { email: email.trim(), id: { [Op.ne]: id } }
      });
      if (existingEmail) {
        return res.status(400).json({ message: "El email ya está registrado por otro usuario" });
      }
    }

    // Validar password si fue enviada
    if (password !== undefined) {
      if (typeof password !== "string" || password.trim() === "") {
        return res.status(400).json({ message: "La contraseña no puede estar vacía" });
      }
      if (password.length > 100) {
        return res.status(400).json({ message: "La contraseña no puede superar los 100 caracteres" });
      }
    }

    await user.update({
      name: name ? name.trim() : user.name,
      email: email ? email.trim() : user.email,
      password: password ? password.trim() : user.password
    });

    return res.status(200).json({
      message: "Usuario actualizado correctamente",
      user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// DELETE /api/users/:id - Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.destroy();
    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};