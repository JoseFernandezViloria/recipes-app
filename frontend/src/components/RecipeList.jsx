import RecipeCard from "./RecipeCard";
import PropTypes from "prop-types";

// SVG Icons
const SearchIcon = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const LightbulbIcon = ({ className = "" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const HeartIcon = ({ className = "" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const RecipeList = ({
  recipes,
  onAddFavorite,
  loading,
  isRecipeInFavorites,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <div className="relative">
          <div className="animate-spin h-16 w-16 border-4 border-blue-200"></div>
          <div className="animate-spin h-16 w-16 border-4 border-blue-500 border-t-transparent absolute top-0 left-0"></div>
        </div>
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            Searching recipes...
          </h3>
          <p className="text-slate-500">This may take a few seconds</p>
        </div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-32 h-32 flex items-center justify-center mx-auto mb-6">
          <SearchIcon className="w-16 h-16 text-blue-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-700 mb-3">
          No recipes found
        </h3>
        <p className="text-slate-500 text-lg mb-6">
          Try searching with another ingredient
        </p>
        <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 text-sm font-medium">
          <LightbulbIcon className="w-4 h-4" />
          <span>Try with: chicken, pasta, rice, tomato...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          🎉 We found {recipes.length} recipes!
        </h2>
        <p className="text-slate-600 text-lg">
          Click on <HeartIcon className="w-5 h-5 inline text-red-500" /> to add
          to your favorites
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe, index) => (
          <div
            key={recipe.idMeal}
            className="animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <RecipeCard
              recipe={recipe}
              onAddFavorite={onAddFavorite}
              isInFavorites={isRecipeInFavorites(recipe.idMeal)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  onAddFavorite: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isRecipeInFavorites: PropTypes.func.isRequired,
};

export default RecipeList;
