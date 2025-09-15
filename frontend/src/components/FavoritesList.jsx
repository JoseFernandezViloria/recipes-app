import PropTypes from "prop-types";

// SVG Icons
const HeartIcon = ({ className = "" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const RefreshIcon = ({ className = "" }) => (
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
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const TrashIcon = ({ className = "" }) => (
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
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const CalendarIcon = ({ className = "" }) => (
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
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const FavoritesList = ({ favorites, onRefresh, onDeleteFavorite }) => {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-32 h-32 flex items-center justify-center mx-auto mb-6">
          <HeartIcon className="w-16 h-16 text-blue-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-700 mb-3">
          You have no favorite recipes
        </h3>
        <p className="text-slate-500 text-lg mb-8">
          Search for delicious recipes and add them to your favorites
        </p>
        <button
          onClick={onRefresh}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span className="flex items-center space-x-2">
            <RefreshIcon className="w-5 h-5" />
            <span>Refresh</span>
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center space-x-2">
            <HeartIcon className="w-8 h-8 text-blue-500" />
            <span>My Favorites</span>
          </h2>
          <p className="text-slate-600 text-lg">
            {favorites.length} recipe{favorites.length !== 1 ? "s" : ""} saved
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white font-semibold hover:from-slate-600 hover:to-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span className="flex items-center space-x-2">
            <RefreshIcon className="w-5 h-5" />
            <span>Refresh</span>
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {favorites.map((favorite, index) => (
          <div
            key={favorite._id}
            className="bg-white shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative overflow-hidden">
              <img
                src={favorite.thumbnail}
                alt={favorite.name}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs px-3 py-1 font-semibold shadow-lg">
                  <HeartIcon className="w-3 h-3 inline mr-1" />
                  Favorite
                </span>
              </div>

              <button
                onClick={() => onDeleteFavorite(favorite._id)}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-10"
                title="Remove from favorites"
              >
                <TrashIcon className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {favorite.name}
              </h3>

              <div className="flex flex-wrap gap-2 mb-4">
                {favorite.category && (
                  <span className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs px-3 py-1 font-semibold">
                    {favorite.category}
                  </span>
                )}

                {favorite.area && (
                  <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 font-semibold">
                    {favorite.area}
                  </span>
                )}
              </div>

              <div className="space-y-2 text-sm text-slate-600 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">🆔</span>
                  <span>
                    <strong>ID:</strong> {favorite.mealId}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4 text-blue-500" />
                  <span>
                    <strong>Added:</strong>{" "}
                    {new Date(favorite.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {favorite.instructions && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-1">
                    <span>📝</span>
                    <span>Instructions</span>
                  </h4>
                  <p className="text-sm text-slate-700 line-clamp-3">
                    {favorite.instructions}
                  </p>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-slate-200">
                <button
                  onClick={() => onDeleteFavorite(favorite._id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <TrashIcon className="w-4 h-4" />
                  <span>Remove from Favorites</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

FavoritesList.propTypes = {
  favorites: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onDeleteFavorite: PropTypes.func.isRequired,
};

export default FavoritesList;
