import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SearchRecipe.css";
import FavoriteRecipe from "../FavoriteRecipe/FavoriteRecipe";

interface Recipe {
  id: number;
  title: string;
  image: string;
}

const SearchRecipe = () => {
  const API_URL = "http://localhost:3000/recipes";

  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const listRecipes = await response.json();
        setRecipes(listRecipes);
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
      }
    };
    fetchRecipes();
  }, []);

  const filterRecipe = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(query.toLowerCase())
  );

  const addFavorite = (id: number) => {
    try {
      const favorite = recipes.find((recipe) => recipe.id === id);
      if (!favorite) {
        console.warn("Recipe not found:", id);
        return;
      }

      const storedFavorites = localStorage.getItem("favorites");
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      if (!Array.isArray(favorites)) {
        console.error("Stored favorites is not an array");
        return;
      }

      if (favorites.some((fav: Recipe) => fav.id === id)) {
        console.warn("Recipe is already in favorites:", id);
        return;
      }

      favorites.push(favorite);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      console.log("Recipe added to favorites:", id);
    } catch (err) {
      console.error("Failed to add favorite:", err);
    }
  };

  return (
    <div className="container">
      <div className="recipe-list">
        <h2>Recherchez une recette</h2>
        <input
          name="search"
          type="text"
          placeholder="Rechercher des recettes..."
          autoComplete="on"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="liste-recipe">
          {filterRecipe.map((recipe) => (
            <div className="recipe" key={recipe.id}>
              <Link to={`/detail/${recipe.id}`}>
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} width={300} />
              </Link>
              <button
                className="btn-favorite"
                onClick={() => addFavorite(recipe.id)}
              >
                Ajouter aux Favoris
              </button>
            </div>
          ))}
        </div>
        <FavoriteRecipe />
      </div>
    </div>
  );
};

export default SearchRecipe;

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./SearchRecipe.css";
// import FavoriteRecipe from "../FavoriteRecipe/FavoriteRecipe";

// interface Recipe {
//   id: number;
//   title: string;
//   image: string;
// }

// const SearchRecipe = () => {
//   const API_URL = "http://localhost:3000/recipes";

//   const [query, setQuery] = useState("");
//   const [recipes, setRecipes] = useState<Recipe[]>([]);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch(API_URL);
//         const listRecipes = await response.json();
//         setRecipes(listRecipes);
//       } catch (err) {
//         console.error("Failed to fetch recipes:", err);
//       }
//     };
//     fetchRecipes();
//   }, []);

//   const filterRecipe = recipes.filter((recipe) =>
//     recipe.title.toLowerCase().includes(query.toLowerCase())
//   );

//   const addFavorite = (id: number) => {
//     const favorite = recipes.find((recipe) => recipe.id === id);
//     if (favorite) {
//       const storedFavorites = localStorage.getItem("favorites");
//       const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
//       if (!favorites.some((fav: Recipe) => fav.id === id)) {
//         favorites.push(favorite);
//         localStorage.setItem("favorites", JSON.stringify(favorites));
//       }
//     }
//   };

//   return (
//     <div className="container">
//       <div className="recipe-list">
//         <h2>Recherchez une recette</h2>
//         <input
//           name="search"
//           type="text"
//           placeholder="Rechercher des recettes..."
//           autoComplete="on"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <div className="liste-recipe">
//           {filterRecipe.map((recipe) => (
//             <div className="recipe" key={recipe.id}>
//               <Link to={`/detail/${recipe.id}`}>
//                 <h3>{recipe.title}</h3>
//                 <img src={recipe.image} alt={recipe.title} width={300} />
//               </Link>
//               <button
//                 className="btn-favorite"
//                 onClick={() => addFavorite(recipe.id)}
//               >
//                 Ajouter aux Favoris
//               </button>
//             </div>
//           ))}
//         </div>
//         <FavoriteRecipe />
//       </div>
//     </div>
//   );
// };

// export default SearchRecipe;
