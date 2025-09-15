const express = require("express");
const {
  searchRecipes,
  saveFavorite,
  getFavorites,
  deleteFavorite,
} = require("../controllers/recipes.controller");

const router = express.Router();

router.get("/search", searchRecipes);
router.post("/favorite", saveFavorite);
router.get("/favorites", getFavorites);
router.delete("/favorites/:id", deleteFavorite);

module.exports = router;
