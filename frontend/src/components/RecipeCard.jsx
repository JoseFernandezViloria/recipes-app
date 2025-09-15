import { useState } from "react";
import PropTypes from "prop-types";

// SVG Icons
const HeartIcon = ({ filled = false, className = "" }) => (
  <svg
    className={className}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const CheckIcon = ({ className = "" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const GlobeIcon = ({ className = "" }) => (
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
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ChevronDownIcon = ({ className = "" }) => (
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
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const RecipeCard = ({ recipe, onAddFavorite, isInFavorites }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddFavorite = (e) => {
    e.stopPropagation();
    onAddFavorite(recipe);
  };

  return (
    <div
      className="bg-white shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className={`w-full h-56 object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <button
          onClick={handleAddFavorite}
          className={`absolute top-4 right-4 p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 backdrop-blur-sm ${
            isInFavorites
              ? "bg-emerald-500/90 hover:bg-emerald-600 text-white"
              : "bg-white/90 hover:bg-white text-slate-600"
          }`}
          title={isInFavorites ? "Already in favorites" : "Add to favorites"}
          disabled={isInFavorites}
        >
          {isInFavorites ? (
            <CheckIcon className="w-5 h-5" />
          ) : (
            <HeartIcon className="w-5 h-5" />
          )}
        </button>

        {recipe.strCategory && (
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-3 py-1 font-semibold shadow-lg">
              {recipe.strCategory}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {recipe.strMeal}
        </h3>

        {recipe.strArea && (
          <div className="flex items-center space-x-2 mb-4">
            <GlobeIcon className="w-4 h-4 text-slate-500" />
            <span className="text-sm text-slate-600 font-medium">
              {recipe.strArea}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center space-x-1 transition-colors duration-300"
          >
            <span>
              {showDetails ? "Hide Instructions" : "View Instructions"}
            </span>
            <ChevronDownIcon
              className={`w-4 h-4 transform transition-transform duration-300 ${
                showDetails ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          <div className="flex items-center space-x-2">
            {isInFavorites && (
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 font-medium">
                <CheckIcon className="w-3 h-3 inline mr-1" />
                In Favorites
              </span>
            )}
            <div className="text-xs text-slate-400 font-mono">
              ID: {recipe.idMeal}
            </div>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-slate-200 animate-fadeIn">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-1">
                  <span>📝</span>
                  <span>Instructions</span>
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {recipe.strInstructions ||
                    "No instructions available for this recipe."}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600">🍽️</span>
                  <span className="text-sm text-slate-600">
                    <strong>Dish:</strong> {recipe.strMeal}
                  </span>
                </div>
                {recipe.strArea && (
                  <div className="flex items-center space-x-2">
                    <GlobeIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-slate-600">
                      <strong>Origin:</strong> {recipe.strArea}
                    </span>
                  </div>
                )}
                {recipe.strCategory && (
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">📂</span>
                    <span className="text-sm text-slate-600">
                      <strong>Category:</strong> {recipe.strCategory}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
  onAddFavorite: PropTypes.func.isRequired,
  isInFavorites: PropTypes.bool.isRequired,
};

export default RecipeCard;
