import React, { useEffect, useState } from "react";
import { Recipe } from "../types";
import "./FavoriteRecipe.css";

type Props = {
  id: string;
  title: string;
  image: string; // Ajout de la propriété image manquante
  recipe: Recipe | null;
  onFavorite: (id: string) => void;
};

const FavoriteRecipe: React.FC = () => {
  const [favorites, setFavorites] = useState<Props[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const openRecipeDetail = (id: string) => {
    window.open(`/detail/${id}`, '_blank');
  };

  return (
    <div className="fav-container">
      {/* <button onClick={() => navigate(-1)} className="back-button">
        Retour
      </button> */}
      <h2 className="fav-titre">Favorites</h2>
      <ul className="favorites-list">
        {favorites.map((recipe) => (
          <li key={recipe.id} className="favorite-item">
            <div className="recipe-content">
              <h4>{recipe.title}</h4>
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
              <div className="recipe-actions">
                <button
                  onClick={() => removeFavorite(recipe.id)}
                  className="delete-btn"
                >
                  Supprimer
                </button>
                <button
                  className="detail-btn"
                  onClick={() => openRecipeDetail(recipe.id)}
                >
                  Voir détail
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteRecipe;