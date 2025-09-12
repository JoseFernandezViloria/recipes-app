const mongoose = "mongoose";

const recipeSchema = new mongoose.Schema({
  mealId: { type: String, required: true }, // ID de TheMealDB
  name: { type: String, required: true },
  category: String,
  area: String,
  instructions: String,
  thumbnail: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Recipe", recipeSchema);
