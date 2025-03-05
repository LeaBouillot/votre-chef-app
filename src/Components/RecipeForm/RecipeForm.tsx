import React, { useState } from 'react';

interface Ingredient {
  name: string;
}

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
    title: '',
    image: '',
    username: '',
    category: '',
    country: '',
    difficulty: '',
    price: '',
    time: 0,
    number_servings: 2,
    favorites: '',
    ingredients: [''],
    description: '',
    instructions: ['']
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe)
      });

      if (response.ok) {
        alert('Recette ajoutée avec succès !');
        // Réinitialiser le formulaire ou rediriger
      } else {
        alert('Erreur lors de l\'ajout de la recette');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur de connexion');
    }
  };

  const updateField = (field: keyof Recipe, value: string | number) => {
    setRecipe(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateArrayField = (field: 'ingredients' | 'instructions', index: number, value: string) => {
    const newArray = [...recipe[field]];
    newArray[index] = value;
    setRecipe(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const addArrayItem = (field: 'ingredients' | 'instructions') => {
    setRecipe(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const categories = ['Entrées', 'Plats', 'Desserts', 'Petit-déjeuner'];
  const difficulties = ['Facile', 'Moyen', 'Difficile'];
  const prices = ['Bon marché', 'Moyen', 'Cher'];
  const countries = ['Français', 'Italien', 'Américain', 'Chinois', 'Mexicain'];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Ajouter une Recette</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label>Titre de la recette</label>
            <input 
              type="text" 
              value={recipe.title} 
              onChange={(e) => updateField('title', e.target.value)}
              required 
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
          </div>
          <div>
            <label>URL de l'image</label>
            <input 
              type="url" 
              value={recipe.image} 
              onChange={(e) => updateField('image', e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label>Catégorie</label>
            <select 
              value={recipe.category} 
              onChange={(e) => updateField('category', e.target.value)}
              required
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Pays</label>
            <select 
              value={recipe.country} 
              onChange={(e) => updateField('country', e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="">Sélectionnez un pays</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Difficulté</label>
            <select 
              value={recipe.difficulty} 
              onChange={(e) => updateField('difficulty', e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="">Sélectionnez la difficulté</option>
              {difficulties.map(diff => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label>Prix</label>
            <select 
              value={recipe.price} 
              onChange={(e) => updateField('price', e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="">Sélectionnez un budget</option>
              {prices.map(price => (
                <option key={price} value={price}>{price}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Temps de préparation (min)</label>
            <input 
              type="number" 
              value={recipe.time} 
              onChange={(e) => updateField('time', Number(e.target.value))}
              min={0}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div>
            <label>Nombre de portions</label>
            <input 
              type="number" 
              value={recipe.number_servings} 
              onChange={(e) => updateField('number_servings', Number(e.target.value))}
              min={1}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Description</label>
          <textarea 
            value={recipe.description} 
            onChange={(e) => updateField('description', e.target.value)}
            style={{ width: '100%', padding: '8px', minHeight: '100px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h3>Ingrédients</h3>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => updateArrayField('ingredients', index, e.target.value)}
                placeholder={`Ingrédient ${index + 1}`}
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
          ))}
          <button 
            type="button" 
            onClick={() => addArrayItem('ingredients')}
            style={{ padding: '8px 15px', backgroundColor: '#f0f0f0' }}
          >
            Ajouter un ingrédient
          </button>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h3>Instructions</h3>
          {recipe.instructions.map((instruction, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <textarea
                value={instruction}
                onChange={(e) => updateArrayField('instructions', index, e.target.value)}
                placeholder={`Étape ${index + 1}`}
                style={{ width: '100%', padding: '8px', minHeight: '80px' }}
              />
            </div>
          ))}
          <button 
            type="button" 
            onClick={() => addArrayItem('instructions')}
            style={{ padding: '8px 15px', backgroundColor: '#f0f0f0' }}
          >
            Ajouter une étape
          </button>
        </div>

        <button className='btn_submit'
          type="submit" 
          style={{ 
           width: '100%', 
            padding: '12px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer'  
          }}
        >
          Enregistrer la recette
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;