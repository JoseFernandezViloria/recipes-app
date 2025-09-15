const axios = require("axios");

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

//Buscar receta por ingrediente

async function searchByIngredient(ingredient) {
  const res = await axios.get(`${BASE_URL}/filter.php?i=${ingredient}`);
  return res.data.meals;
}

// Obtener detalles de una receta por ID

async function getMealById(id) {
  const res = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
  return res.data.meals[0];
}

module.exports = { searchByIngredient, getMealById };
