import React from "react";
import { Recipe } from "../types";

type Props = {
  recipes: Recipe[];
  onSelect: (id: string) => void;
};

const RecipeList: React.FC<Props> = ({ recipes, onSelect }) => (
  <ul>
    {recipes.map((recipe) => (
      <li
        key={recipe.id}
        onClick={() => onSelect(String(recipe.id))}
        style={{ cursor: "pointer" }}
      >
        <img src={recipe.image} alt={recipe.title} width="100" />
        <h4>{recipe.title}</h4>
      </li>
    ))}
  </ul>
);

export default RecipeList;