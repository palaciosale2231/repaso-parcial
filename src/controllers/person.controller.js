import { matchedData } from "express-validator";
import { PersonModel } from "../models/person.models.js";

// GET /api/persons - Obtener todas las personas
export const getAllPersons = async (req, res) => {
  try {
    const persons = await PersonModel.findAll();
    return res.status(200).json(persons);
  } catch (error) {
    console.error("Error en getAllPersons:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET /api/persons/:id - Obtener una persona por ID
export const getPersonById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const person = await PersonModel.findByPk(id);

    if (!person) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    return res.status(200).json(person);
  } catch (error) {
    console.error("Error en getPersonById:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// POST /api/persons - Crear una nueva persona
export const createPerson = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const newPerson = await PersonModel.create(validatedData);

    return res.status(201).json({
      message: "Persona creada correctamente",
      person: newPerson,
    });
  } catch (error) {
    console.error("Error en createPerson:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT /api/persons/:id - Actualizar persona
export const updatePerson = async (req, res) => {
  try {
    const { id, ...dataToUpdate } = matchedData(req);

    const person = await PersonModel.findByPk(id);
    if (!person) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    await person.update(dataToUpdate);

    return res.status(200).json({
      message: "Persona actualizada correctamente",
      person,
    });
  } catch (error) {
    console.error("Error en updatePerson:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// DELETE /api/persons/:id - Eliminar persona
export const deletePerson = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const person = await PersonModel.findByPk(id);
    if (!person) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    await person.destroy();
    return res.status(200).json({ message: "Persona eliminada correctamente" });
  } catch (error) {
    console.error("Error en deletePerson:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
