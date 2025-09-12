const Recipe = require("../models/Recipe");
const mealdb = require("../servicies/mealdb.service");

//Buscar recetas en la API externa

async function searchRecipes(req, res) {
  try {
    const { ingredient } = req.query;
    const meals = await mealdb.searchByIngredient(ingredient);
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: "Error al buscar recetas" });
  }
}

// Guardar receta favorita en Mongo

async function saveFavorite(req, res) {
  try {
    const { idMeal } = req.body;
    const meal = await mealdb.getMealById(idMeal);

    const recipe = new Recipe({
      mealId: meal.id,
      name: meal.strMeal,
      category: meal.strCategory,
      instructions: meal.strInstructions,
      thumbnail: meal.strMealThumb,
    });

    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: "Error al guardar receta favorita" });
  }
}

module.exports = { searchRecipes, saveFavorite };
