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

const HeartIcon = ({ className = "" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const UtensilsIcon = ({ className = "" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 2v6h2v12h2V8h2V2H3zm8 0v6h2v12h2V8h2V2h-6zm8 0v6h2v12h2V8h2V2h-6z" />
  </svg>
);

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-2xl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="animate-bounce">
              <UtensilsIcon className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                RecetApp
              </h1>
              <p className="text-blue-100 text-sm font-medium">
                Discover delicious recipes
              </p>
            </div>
          </div>

          <nav className="flex space-x-2">
            <button
              onClick={() => setActiveTab("search")}
              className={`px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === "search"
                  ? "bg-white text-blue-600 shadow-lg"
                  : "text-white hover:bg-white hover:bg-opacity-20 backdrop-blur-sm"
              }`}
            >
              <span className="flex items-center space-x-2">
                <SearchIcon className="w-5 h-5" />
                <span>Search Recipes</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === "favorites"
                  ? "bg-white text-blue-600 shadow-lg"
                  : "text-white hover:bg-white hover:bg-opacity-20 backdrop-blur-sm"
              }`}
            >
              <span className="flex items-center space-x-2">
                <HeartIcon className="w-5 h-5" />
                <span>My Favorites</span>
              </span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default Header;
