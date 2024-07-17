import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SearchRecipe.css";
import RecipeDetail from "../RecipeDetail/RecipeDetail";

interface Recipe {
  id: number;
  title: string;
  image: string;
  description: string;
}

const SearchRecipe = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  const filterRecipe = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="recipe-list">
        <h2>Recherchez une recette</h2>
        <input
          type="text"
          placeholder="Rechercher des recettes..."
          autoComplete="On"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div>
          {filterRecipe.map((recipe) => (
            <Link to={`/recipedetail/${recipe.id}`} key={recipe.id}>
              <div>
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} width={300} />
                <p>{recipe.description}</p>
                <RecipeDetail/>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchRecipe;
