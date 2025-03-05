import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Recipe } from "../types";
import "./FavoriteRecipe.css";

type Props = {
  id: string;
  title: string;
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

  return (
    <div className="fav-container">
      {/* ajoute bouton retour */}

      <Link to={`/`}>
                  <button className="retour-btn">Retour</button>
                </Link>
    
      <h3 className="fav-titre">Favorites</h3>
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
                <Link to={`/detail/${recipe.id}`} className="detail-link">
                  <button className="detail-btn">Voir détail</button>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteRecipe;