import { useState, useEffect } from "react";
import RecipeSearch from "./components/RecipeSearch";
import RecipeList from "./components/RecipeList";
import FavoritesList from "./components/FavoritesList";
import Header from "./components/Header";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("search");

  // Load favorites on startup
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:4000"
        }/api/recipes/favorites`
      );
      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const handleSearch = async (ingredient) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:4000"
        }/api/recipes/search?ingredient=${ingredient}`
      );
      if (response.ok) {
        const data = await response.json();
        setRecipes(data || []);
      } else {
        console.error("Search error");
      }
    } catch (error) {
      console.error("Error searching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFavorite = async (recipe) => {
    try {
      console.log("Adding recipe to favorites:", recipe.idMeal);

      // Verificar si ya existe en la lista local
      const alreadyExists = favorites.some(
        (fav) => fav.mealId === recipe.idMeal
      );
      if (alreadyExists) {
        alert("This recipe is already in your favorites!");
        return;
      }

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:4000"
        }/api/recipes/favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idMeal: recipe.idMeal }),
        }
      );

      console.log("Response status:", response.status);

      if (response.ok) {
        const newFavorite = await response.json();
        console.log("New favorite saved:", newFavorite);
        setFavorites([...favorites, newFavorite]);
        alert("Recipe added to favorites!");
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);

        if (response.status === 409) {
          // Receta ya existe en favoritos
          alert(`"${recipe.strMeal}" is already in your favorites!`);
          // Actualizar la lista de favoritos para sincronizar
          loadFavorites();
        } else {
          alert(
            `Error adding to favorites: ${errorData.error || "Unknown error"}`
          );
        }
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
      alert(`Error adding to favorites: ${error.message}`);
    }
  };

  const handleDeleteFavorite = async (favoriteId) => {
    try {
      console.log("Deleting favorite with ID:", favoriteId);

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:4000"
        }/api/recipes/favorites/${favoriteId}`,
        {
          method: "DELETE",
        }
      );

      console.log("Delete response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Favorite deleted:", result);
        setFavorites(favorites.filter((fav) => fav._id !== favoriteId));
        alert("Recipe removed from favorites!");
      } else {
        const errorData = await response.json();
        console.error("Delete error response:", errorData);
        alert(
          `Error removing from favorites: ${errorData.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error deleting favorite:", error);
      alert(`Error removing from favorites: ${error.message}`);
    }
  };

  // Función para verificar si una receta ya está en favoritos
  const isRecipeInFavorites = (recipeId) => {
    return favorites.some((fav) => fav.mealId === recipeId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="container mx-auto px-4 py-12">
        {activeTab === "search" && (
          <div>
            <RecipeSearch onSearch={handleSearch} loading={loading} />
            <RecipeList
              recipes={recipes}
              onAddFavorite={handleAddFavorite}
              loading={loading}
              isRecipeInFavorites={isRecipeInFavorites}
            />
          </div>
        )}

        {activeTab === "favorites" && (
          <FavoritesList
            favorites={favorites}
            onRefresh={loadFavorites}
            onDeleteFavorite={handleDeleteFavorite}
          />
        )}
      </main>
    </div>
  );
}

export default App;
