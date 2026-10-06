import { matchedData, validationResult } from "express-validator";
import { UserModel } from "../models/user.models.js";

export const createUser = async (req, res) => {
  try {
    console.log("=== BODY RECIBIDO ===", req.body);
    console.log("=== MATCHED DATA ===", matchedData(req));

    const validatedData = matchedData(req);
    const user = await UserModel.create(validatedData);
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getUserById = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const validatedDataBody = matchedData(req, { locations: ["body"] });
    const { id } = matchedData(req, { locations: ["params"] });

    const userExist = await UserModel.findByPk(id);

    if (!userExist) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await userExist.update(validatedDataBody);

    // const user = await UserModel.create(validatedData);
    return res.status(200).json({ message: "Usuario editado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    const userExist = await UserModel.findByPk(id);

    if (!userExist) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await userExist.destroy();

    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
