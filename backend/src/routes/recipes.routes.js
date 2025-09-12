const express = require("express");
const {
  searchRecipes,
  saveFavorite,
} = require("../controllers/recipes.controller");

const router = express.Router();

router.get("/search", searchRecipes);
router.post("/favorite", saveFavorite);

module.exports = router;
