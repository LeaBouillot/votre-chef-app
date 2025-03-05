import React, { useState } from "react";
import "./RecipeForm.css";

interface Recipe {
  title: string;
  image: string;
  username: string;
  category: string;
  country: string;
  difficulty: string;
  price: string;
  time: number;
  number_servings: number;
  favorites: string;
  ingredients: string[];
  description: string;
  instructions: string[];
}

const RecipeForm: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe>({
    title: "",
    image: "",
    username: "",
    category: "",
    country: "",
    difficulty: "",
    price: "",
    time: 0,
    number_servings: 2,
    favorites: "",
    ingredients: [""],
    description: "",
    instructions: [""],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      if (response.ok) {
        alert("Recette ajoutée avec succès !");
        // Réinitialiser le formulaire ou rediriger
      } else {
        alert("Erreur lors de l'ajout de la recette");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur de connexion");
    }
  };

  const updateField = (field: keyof Recipe, value: string | number) => {
    setRecipe((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateArrayField = (
    field: "ingredients" | "instructions",
    index: number,
    value: string
  ) => {
    const newArray = [...recipe[field]];
    newArray[index] = value;
    setRecipe((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };

  const addArrayItem = (field: "ingredients" | "instructions") => {
    setRecipe((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const categories = ["Entrées", "Plats", "Desserts", "Petit-déjeuner"];
  const difficulties = ["Facile", "Moyen", "Difficile"];
  const prices = ["Bon marché", "Moyen", "Cher"];
  const countries = ["Français", "Italien", "Américain", "Chinois", "Mexicain"];

  return (
    <div className="recipe-form">
      <h2>Ajouter une Recette</h2>
      <form onSubmit={handleSubmit}>
        {/* Ajout de plus d'espace entre les éléments de la première ligne */}
        <div className="form-row form-row-2 form-row-wide-gap">
          <div className="form-group form-row-wide-gap">
            <label>Titre de la recette</label>
            <input
              type="text"
              className="form-control"
              value={recipe.title}
              onChange={(e) => updateField("title", e.target.value)}
              required
            />
          </div>
          <div className="form-group form-row-wide-gap">
            <label>URL de l'image</label>
            <input
              type="url"
              className="form-control"
              value={recipe.image}
              onChange={(e) => updateField("image", e.target.value)}
            />
          </div>
        </div>

        <div className="form-row form-row-3">
          <div className="form-group">
            <label>Catégorie</label>
            <select
              className="form-control"
              value={recipe.category}
              onChange={(e) => updateField("category", e.target.value)}
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Pays</label>
            <select
              className="form-control"
              value={recipe.country}
              onChange={(e) => updateField("country", e.target.value)}
            >
              <option value="">Sélectionnez un pays</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Difficulté</label>
            <select
              className="form-control"
              value={recipe.difficulty}
              onChange={(e) => updateField("difficulty", e.target.value)}
            >
              <option value="">Sélectionnez la difficulté</option>
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ajout de plus d'espace entre Temps et Nombre de portions */}
        <div className="form-row form-row-3" style={{ gap: "30px" }}>
          <div className="form-group">
            <label>Prix</label>
            <select
              className="form-control"
              value={recipe.price}
              onChange={(e) => updateField("price", e.target.value)}
            >
              <option value="">Sélectionnez un budget</option>
              {prices.map((price) => (
                <option key={price} value={price}>
                  {price}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Temps de préparation (min)</label>
            <input
              type="number"
              className="form-control"
              value={recipe.time}
              onChange={(e) => updateField("time", Number(e.target.value))}
              min={0}
            />
          </div>
          <div className="form-group">
            <label>Nombre de portions</label>
            <input
              type="number"
              className="form-control"
              value={recipe.number_servings}
              onChange={(e) =>
                updateField("number_servings", Number(e.target.value))
              }
              min={1}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={recipe.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </div>

        <div className="ingredients-container">
          <h3>Ingrédients</h3>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-item">
              <input
                type="text"
                className="form-control"
                value={ingredient}
                onChange={(e) =>
                  updateArrayField("ingredients", index, e.target.value)
                }
                placeholder={`Ingrédient ${index + 1}`}
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-add"
            onClick={() => addArrayItem("ingredients")}
          >
            Ajouter un ingrédient
          </button>
        </div>

        <div className="instructions-container">
          <h3>Instructions</h3>
          {recipe.instructions.map((instruction, index) => (
            <div key={index} className="instruction-item">
              <textarea
                className="form-control instruction-textarea"
                value={instruction}
                onChange={(e) =>
                  updateArrayField("instructions", index, e.target.value)
                }
                placeholder={`Étape ${index + 1}`}
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-add"
            onClick={() => addArrayItem("instructions")}
          >
            Ajouter une étape
          </button>
        </div>

        <button
          className="btn_submit"
          type="submit"
        >
          Enregistrer la recette
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;