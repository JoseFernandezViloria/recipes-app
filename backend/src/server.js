require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const recipesRoutes = require(".src/routes/recipes.routes");

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//ruta de prueba
app.get("/", (req, res) => {
  res.send("🍲 API de recetas funcionando 🚀");
});

app.use("/api/recipes, recipesRoutes");

// Conexion a Mongo y arranque del servidor

const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado con MongoDB");
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en el puerto ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));
