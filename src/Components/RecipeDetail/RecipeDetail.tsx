import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './RecipeDetail.css';

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

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [details, setDetails] = useState<Details | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/recipes/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipe details');
      }
      
      const data: Details = await response.json();
      setDetails(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      setDetails(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onFavorite = () => {
    // Implement favorite functionality
    console.log('Add to favorites:', details?.id);
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
      <button onClick={() => navigate(-1)} className="back-button">
        Back to Recipes
      </button>
      
      <h1>{details.title}</h1>
      
      <div className="recipe-image-container">
        <img 
          src={details.image} 
          alt={details.title} 
          className="recipe-image"
        />
      </div>
      
      <div className="recipe-meta">
        <p><strong>Catégorie:</strong> {details.category}</p>
        <p><strong>Difficulté:</strong> {details.difficulty}</p>
        <p><strong>Prix:</strong> {details.price}</p>
        <p><strong>Temps de préparation:</strong> {details.time} minutes</p>
        <p><strong>Nombre de servings:</strong> {details.number_servings}</p>
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
        Add to Favorites
      </button>
    </div>
  );
};

export default RecipeDetail;