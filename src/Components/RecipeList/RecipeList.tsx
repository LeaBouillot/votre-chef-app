// import React from "react";
// import { Recipe } from "../types";

// type Props = {
//   recipes: Recipe[];
//   onSelect: (id: string) => void;
// };

// const RecipeList: React.FC<Props> = ({ recipes, onSelect }) => (
//   <ul className="recipe-list">
//     {recipes.map((recipe) => (
//       <li
//         key={recipe.id}
//         onClick={() => onSelect(recipe.id)}
//         className="recipe-item"
//       >
//         <img 
//           src={recipe.image} 
//           alt={recipe.title} 
//           className="recipe-image" 
//           width={100} 
//           height={100} 
//         />
//         <h4 className="recipe-title">{recipe.title}</h4>
//       </li>
//     ))}
//   </ul>
// );

// export default RecipeList;