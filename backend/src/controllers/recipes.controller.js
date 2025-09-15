const Recipe = require("../models/Recipe");
const mealdb = require("../services/mealdb.service");

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

    if (!idMeal) {
      return res.status(400).json({ error: "idMeal is required" });
    }

    console.log("Saving favorite recipe with idMeal:", idMeal);

    // Verificar si ya existe por mealId
    const existingRecipe = await Recipe.findOne({ mealId: idMeal });
    if (existingRecipe) {
      console.log("Recipe already exists in favorites:", existingRecipe.name);
      return res.status(409).json({
        error: "Recipe already in favorites",
        existingRecipe: {
          id: existingRecipe._id,
          name: existingRecipe.name,
          mealId: existingRecipe.mealId,
        },
      });
    }

    const meal = await mealdb.getMealById(idMeal);

    if (!meal) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const recipe = new Recipe({
      mealId: meal.idMeal,
      name: meal.strMeal,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: meal.strInstructions,
      thumbnail: meal.strMealThumb,
    });

    const savedRecipe = await recipe.save();
    console.log("Recipe saved successfully:", savedRecipe._id);
    res.json(savedRecipe);
  } catch (err) {
    console.error("Error saving favorite:", err);
    res.status(500).json({ error: "Error saving recipe to favorites" });
  }
}

// Obtener todas las recetas favoritas
async function getFavorites(req, res) {
  try {
    const favorites = await Recipe.find().sort({ createdAt: -1 });
    console.log("Retrieved favorites:", favorites.length);
    res.json(favorites);
  } catch (err) {
    console.error("Error getting favorites:", err);
    res.status(500).json({ error: "Error getting favorites" });
  }
}

// Eliminar receta favorita
async function deleteFavorite(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Recipe ID is required" });
    }

    console.log("Deleting favorite recipe with ID:", id);

    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(404).json({ error: "Recipe not found in favorites" });
    }

    console.log("Recipe deleted successfully:", deletedRecipe._id);
    res.json({ message: "Recipe removed from favorites", deletedRecipe });
  } catch (err) {
    console.error("Error deleting favorite:", err);
    res.status(500).json({ error: "Error deleting recipe from favorites" });
  }
}

module.exports = { searchRecipes, saveFavorite, getFavorites, deleteFavorite };
