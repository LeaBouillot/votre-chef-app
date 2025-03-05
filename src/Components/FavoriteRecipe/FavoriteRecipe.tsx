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
      <h3 className="fav-titre">Favorites</h3>
      <ul>
        {favorites.map((recipe) => (
          <li key={recipe.id}>
            {recipe.title}
            <img src={recipe.image} alt={recipe.title} width={300} />
            <div className="recipe-actions">
              <button 
                onClick={() => removeFavorite(recipe.id)} 
                className="delete-btn"
              >
                Supprimer
              </button>
              <Link to={`/detail/${recipe.id}`}>
                <button className="detail-btn">Voir détail</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FavoriteRecipe;
