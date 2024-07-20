import { useState, useEffect } from "react";
import "./SearchRecipe.css";
import { useParams, Link } from "react-router-dom";

interface Recipe {
  id: number;
  title: string;
  image: string;
}

const SearchRecipe = () => {
  const API_URL = "http://localhost:3000/recipes";

  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const params = useParams();
  //fetch db json
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(API_URL);
        const listReciptes = await response.json();
        setRecipes(listReciptes);
      } catch (err) {
        console.log(err);
      }
    };
    (async () => await fetchRecipes())();
  }, [params]);

  //filter recipe by query : rechercher des recettes
  const filterRecipe = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(query.toLowerCase())
  );

  // ajouter favorite recettes et stocker dans local storage
  const addFavorite = (id: string) => {
    const favorite = recipes.find((recipe) => recipe.id === id);
    if (favorite) {
      const storedFavorites = localStorage.getItem("favorites");
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      favorites.push(favorite);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  return (
    <div className="container">
      <div className="input-search">
        <h2>Recherchez une recette</h2>
        <input
          type="text"
          placeholder="Rechercher des recettes..."
          autoComplete="On"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* affichage list de recipe */}

        <div className="liste-recipe">
          {filterRecipe.map((recipe) => {
            return (
              <div key={recipe.id} className="recipe">
                <h4>{recipe.title}</h4>
                <Link to="/detail">
                  <img src={recipe.image} alt={recipe.title} width={300} />
                </Link>
                <Link to="/favorite">
                  <button className="btn-favorite" onClick={() => addFavorite(recipe.id)}>
                    Ajouter à mes favoris
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchRecipe;
