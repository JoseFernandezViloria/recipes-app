require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const recipesRoutes = require("./routes/recipes.routes");

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//ruta de prueba
app.get("/", (req, res) => {
  res.send("🍲 API de recetas funcionando 🚀");
});

app.use("/api/recipes", recipesRoutes);

// Conexion a Mongo y arranque del servidor
const PORT = process.env.PORT || 4000;

// Función para conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado con MongoDB");
  } catch (err) {
    console.error("❌ Error al conectar a MongoDB:", err);
    process.exit(1);
  }
};

// Conectar a la base de datos
connectDB();

// Solo iniciar servidor en desarrollo local
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log(`Servidor corriendo en el puerto ${PORT}`)
  );
}

// Exportar la app para Vercel
module.exports = app;
