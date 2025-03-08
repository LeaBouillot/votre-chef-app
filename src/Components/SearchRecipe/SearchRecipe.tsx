import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SearchRecipe.css";

interface Recipe {
  id: number;
  title: string;
  image: string;
  category?: string;
  country?: string;
}

const SearchRecipe = () => {
  // URL de base pour l'API
  const API_URL = "http://localhost:3000";
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/recipes`);
        if (!response.ok) {
          throw new Error(`Erreur réseau: ${response.status}`);
        }
        const listRecipes = await response.json();
        setRecipes(listRecipes);
        setError(null);
      } catch (err) {
        console.error("Échec du chargement des recettes:", err);
        setError("Impossible de charger les recettes. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();

    // Chargement des favoris depuis localStorage
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (e) {
        console.error("Erreur lors du chargement des favoris:", e);
        localStorage.removeItem("favorites"); // Nettoyer les données corrompues
      }
    }
  }, []);

  const filterRecipe = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(query.toLowerCase())
  );

  const addFavorite = (recipe: Recipe) => {
    try {
      // Vérifier si la recette est déjà dans les favoris
      if (favorites.some((fav) => fav.id === recipe.id)) {
        alert("Cette recette est déjà dans vos favoris !");
        return;
      }
      // Ajouter aux favoris et sauvegarder dans localStorage
      const updatedFavorites = [...favorites, recipe];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      alert("Recette ajoutée aux favoris !");
    } catch (err) {
      console.error("Échec de l'ajout aux favoris:", err);
      alert("Impossible d'ajouter cette recette aux favoris.");
    }
  };

  return (
    <div className="container">
      <div className="recipe-list">
        <h2>Recherchez une recette</h2>
        <input
          name="search"
          type="text"
          placeholder="Rechercher des recettes..."
          autoComplete="on"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {loading && <p>Chargement des recettes...</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="liste-recipe">
          {filterRecipe.length > 0 ? (
            filterRecipe.map((recipe) => (
              <div className="recipe" key={recipe.id}>
                <Link to={`/detail/${recipe.id}`}>
                  <h3>{recipe.title}</h3>
                  <img src={recipe.image} alt={recipe.title} width={300} />
                </Link>
                <button
                  className="btn-favorite"
                  onClick={() => addFavorite(recipe)}
                >
                  Ajouter aux Favoris
                </button>
              </div>
            ))
          ) : (
            !loading && <p>Aucune recette trouvée pour "{query}"</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchRecipe;