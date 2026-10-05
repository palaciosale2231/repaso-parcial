import { PersonModel } from "../models/person.models.js"; // Ajusta la ruta según tu proyecto

// GET /api/persons - Obtener todas las personas
export const getAllPersons = async (req, res) => {
  try {
    const persons = await PersonModel.findAll();
    return res.status(200).json(persons);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET /api/persons/:id - Obtener una persona por ID
export const getPersonById = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await PersonModel.findByPk(id);

    if (!person) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    return res.status(200).json(person);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// POST /api/persons - Crear una nueva persona
export const createPerson = async (req, res) => {
  try {
    const { name, lastname } = req.body;

    // Validar name (no vacío, string, max 100 caracteres)
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ message: "El nombre es obligatorio y no puede estar vacío" });
    }
    if (name.length > 100) {
      return res.status(400).json({ message: "El nombre no puede superar los 100 caracteres" });
    }

    // Validar lastname (no vacío, string, max 100 caracteres, único)
    if (!lastname || typeof lastname !== "string" || lastname.trim() === "") {
      return res.status(400).json({ message: "El apellido es obligatorio y no puede estar vacío" });
    }
    if (lastname.length > 100) {
      return res.status(400).json({ message: "El apellido no puede superar los 100 caracteres" });
    }
    const existingLastname = await PersonModel.findOne({ where: { lastname: lastname.trim() } });
    if (existingLastname) {
      return res.status(400).json({ message: "El apellido ya se encuentra registrado" });
    }

    const newPerson = await PersonModel.create({
      name: name.trim(),
      lastname: lastname.trim()
    });

    return res.status(201).json({
      message: "Persona creada correctamente",
      person: newPerson
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT /api/persons/:id - Actualizar persona
export const updatePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname } = req.body;

    const person = await PersonModel.findByPk(id);
    if (!person) {
      return res.status(404).json({ message: "Persona no encontrada" });
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

    // Validar lastname si fue enviado
    if (lastname !== undefined) {
      if (typeof lastname !== "string" || lastname.trim() === "") {
        return res.status(400).json({ message: "El apellido no puede estar vacío" });
      }
      if (lastname.length > 100) {
        return res.status(400).json({ message: "El apellido no puede superar los 100 caracteres" });
      }
      
      // Buscar si el apellido ya existe
      const existingLastname = await PersonModel.findOne({
        where: { lastname: lastname.trim() }
      });
      
      // Si existe, verificamos que el ID no sea el de la persona que estamos editando
      // Usamos .toString() por si acaso uno es número y otro string
      if (existingLastname && existingLastname.id.toString() !== id.toString()) {
        return res.status(400).json({ message: "El apellido ya está registrado por otra persona" });
      }
    }

    await person.update({
      name: name ? name.trim() : person.name,
      lastname: lastname ? lastname.trim() : person.lastname
    });

    return res.status(200).json({
      message: "Persona actualizada correctamente",
      person
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// DELETE /api/persons/:id - Eliminar persona
export const deletePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await PersonModel.findByPk(id);

    if (!person) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    await person.destroy();
    return res.status(200).json({ message: "Persona eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};