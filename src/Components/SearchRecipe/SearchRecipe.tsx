import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SearchRecipe.css";
import FavoriteRecipe from "../FavoriteRecipe/FavoriteRecipe";

interface Recipe {
  id: number;
  title: string;
  image: string;
}

const SearchRecipe = () => {
  const API_URL = "http://localhost:3000/recipes";

  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const listRecipes = await response.json();
        setRecipes(listRecipes);
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
      }
    };
    fetchRecipes();

    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const filterRecipe = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(query.toLowerCase())
  );

  const addFavorite = (recipe: Recipe) => {
    try {
      // Check if recipe is already in favorites
      if (favorites.some((fav) => fav.id === recipe.id)) {
        alert("Cette recette est déjà dans vos favoris !");
        return;
      }

      // Add to favorites state and localStorage
      const updatedFavorites = [...favorites, recipe];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (err) {
      console.error("Failed to add favorite:", err);
    }
  };

  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
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
        <div className="liste-recipe">
          {filterRecipe.map((recipe) => (
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
          ))}
        </div>
        <FavoriteRecipe 
          favorites={favorites} 
          onRemoveFavorite={removeFavorite} 
        />
      </div>
    </div>
  );
};

export default SearchRecipe;