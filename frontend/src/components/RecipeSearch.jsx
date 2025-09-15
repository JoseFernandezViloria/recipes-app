import { useState } from "react";
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

const UtensilsIcon = ({ className = "" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 2v6h2v12h2V8h2V2H3zm8 0v6h2v12h2V8h2V2h-6zm8 0v6h2v12h2V8h2V2h-6z" />
  </svg>
);

const RocketIcon = ({ className = "" }) => (
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
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const LightbulbIcon = ({ className = "" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const RecipeSearch = ({ onSearch, loading }) => {
  const [ingredient, setIngredient] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredient.trim()) {
      onSearch(ingredient.trim());
    }
  };

  return (
    <div className="mb-12">
      <div className="bg-gradient-to-br from-white to-blue-50 shadow-2xl p-8 border border-blue-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center space-x-2">
            <UtensilsIcon className="w-8 h-8 text-blue-500" />
            <span>Search Recipes by Ingredient</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Discover amazing dishes with the ingredients you have
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="w-6 h-6 text-slate-400" />
            </div>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              placeholder="Ex: chicken, tomato, rice, pasta..."
              className="w-full pl-14 pr-4 py-4 text-lg border-2 border-blue-200 focus:ring-4 focus:ring-blue-300 focus:border-blue-400 outline-none transition-all duration-300 shadow-lg"
              disabled={loading}
            />
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              disabled={loading || !ingredient.trim()}
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Searching...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <RocketIcon className="w-5 h-5" />
                  <span>Search Recipes</span>
                </span>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 text-sm font-medium">
            <LightbulbIcon className="w-4 h-4" />
            <span>Write an ingredient to find delicious recipes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

RecipeSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default RecipeSearch;
