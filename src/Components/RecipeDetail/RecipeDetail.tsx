import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FaTag, FaFire, FaEuroSign, FaClock, FaUsers } from "react-icons/fa";
import "./RecipeDetail.css";

interface Details {
  id: number;
  title: string;
  image: string;
  category: string;
  difficulty: string;
  price: string;
  time: number;
  number_servings: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

const API_URL = "http://localhost:3000";
const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<Details | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/recipes/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch recipe details");
      }
      const data: Details = await response.json();

      // Clean up instruction text by removing the numbering if it exists
      const cleanedInstructions = data.instructions.map((instruction) =>
        instruction.replace(/^\d+-/, "")
      );

      setDetails({
        ...data,
        instructions: cleanedInstructions,
      });
      setError(null);
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      setDetails(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onFavorite = () => {
    console.log("Add to favorites:", details?.id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!details) {
    return <div>No recipe found</div>;
  }

  return (
    <div className="recipe-detail">
      <h2>{details.title}</h2>
      <div className="recipe-image-container">
        <img src={details.image} alt={details.title} className="recipe-image" />
      </div>
      <div className="recipe-meta">
        <p>
          <FaTag className="meta-icon" />
          <strong>Catégorie:</strong> {details.category}
        </p>
        <p>
          <FaFire className="meta-icon" />
          <strong>Difficulté:</strong> {details.difficulty}
        </p>
        <p>
          <FaEuroSign className="meta-icon" />
          <strong>Prix:</strong> {details.price}
        </p>
        <p>
          <FaClock className="meta-icon" />
          <strong>Temps de préparation:</strong> {details.time} minutes
        </p>
        <p>
          <FaUsers className="meta-icon" />
          <strong>Nombre de servings:</strong> {details.number_servings}
        </p>
      </div>
      <p className="recipe-description">{details.description}</p>
      <h2>Ingrédients:</h2>
      <ul className="ingredients-list">
        {details.ingredients.map((ingredient, index) => (
          <li key={`ingredient-${index}`}>{ingredient}</li>
        ))}
      </ul>
      <h2>Instructions:</h2>
      <ol className="instructions-list">
        {details.instructions.map((instruction, index) => (
          <li key={`instruction-${index}`}>{instruction}</li>
        ))}
      </ol>
      <button onClick={onFavorite} className="favorite-button">
        Ajouter aux Favorites
      </button>
    </div>
  );
};

export default RecipeDetail;
