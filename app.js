import express from "express";
import dotenv from "dotenv";
import { startDB } from "./src/config/database.js";
import { userRouter } from "./src/routes/user.routes.js";
import { taskRouter } from "./src/routes/task.routes.js";
//import { productRouter } from "./src/routes/product.routes.js";

// Cargar las variables definidas en el archivo .env
dotenv.config();

const app = express();

// Usar el puerto desde .env o usar 3001 como respaldo
const PORT = process.env.PORT || 3001;

// Middleware para entender el formato JSON
app.use(express.json());

// Rutas
app.use("/api", userRouter);
app.use("/api", taskRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor listo http://localhost:${PORT}`);
});

/*  Acá esta como estaba antes de la edición, arriba esta adaptado para que funcione con variables de entorno y dotenv.

import express from "express";
import { startDB } from "./src/config/database.js";
import { productRouter } from "./src/routes/product.routes.js";
// import { Product } from "./src/models/product.model.js";

const app = express();
const PORT = 3001;

// para que entienda el formato json
app.use(express.json());

app.use("/api", productRouter);

// app.use("/", (req, res) => {
//   return res.json({ message: "servidor todo listo" });
// });

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor listo http://localhost:${PORT}`);
});



*/
