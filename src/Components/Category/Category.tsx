import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Category.css";

// URL de base pour l'API - suppression du slash à la fin
const API_URL = "https://recettes-api-olive.vercel.app/api/recettes";

interface Recipe {
  id: number;
  title: string;
  image: string;
  category: string;
}

const Category: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${API_URL}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();

        // Filter recipes by category (case-insensitive)
        const filteredRecipes = data.filter(
          (recipe: Recipe) =>
            recipe.category &&
            recipe.category.toLowerCase() === category?.toLowerCase()
        );

        setRecipes(filteredRecipes);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [category]);

  if (loading) {
    return <div>Chargement des recettes...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className="category-page">
      <h2>Recettes {category}</h2>
      {recipes.length > 0 ? (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <Link to={`/detail/${recipe.id}`}>
                <img src={recipe.image} alt={recipe.title} />
                <h2>{recipe.title}</h2>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucune recette trouvée dans cette catégorie.</p>
      )}
    </div>
  );
};

export default Category;
