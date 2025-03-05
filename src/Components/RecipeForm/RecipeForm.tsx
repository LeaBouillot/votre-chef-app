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

        <button 
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
// import React, { useState } from 'react';

// interface Ingredient {
//   name: string;
//   quantity: string;
//   unit: string;
// }

// const RecipeForm: React.FC = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [ingredients, setIngredients] = useState<Ingredient[]>([
//     { name: '', quantity: '', unit: '' }
//   ]);
//   const [instructions, setInstructions] = useState<string[]>(['']);
//   const [preparationTime, setPreparationTime] = useState(0);
//   const [cookingTime, setCookingTime] = useState(0);
//   const [servings, setServings] = useState(2);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const recipeData = {
//       name,
//       description,
//       ingredients,
//       instructions,
//       preparationTime,
//       cookingTime,
//       servings
//     };
//     console.log('Recipe submitted:', recipeData);
//   };

//   const addIngredient = () => {
//     setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
//   };

//   const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
//     const newIngredients = [...ingredients];
//     newIngredients[index][field] = value;
//     setIngredients(newIngredients);
//   };

//   const addInstruction = () => {
//     setInstructions([...instructions, '']);
//   };

//   const updateInstruction = (index: number, value: string) => {
//     const newInstructions = [...instructions];
//     newInstructions[index] = value;
//     setInstructions(newInstructions);
//   };

//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
//       <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Ajouter une Recette</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '15px' }}>
//           <label style={{ display: 'block', marginBottom: '5px' }}>Nom de la recette</label>
//           <input 
//             type="text" 
//             value={name} 
//             onChange={(e) => setName(e.target.value)} 
//             placeholder="Ex: Tarte aux pommes" 
//             style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
//             required 
//           />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
//           <textarea 
//             value={description} 
//             onChange={(e) => setDescription(e.target.value)} 
//             placeholder="Une brève description de la recette"
//             style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '100px' }}
//           />
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <h3>Ingrédients</h3>
//           {ingredients.map((ingredient, index) => (
//             <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
//               <input
//                 type="text"
//                 placeholder="Nom"
//                 value={ingredient.name}
//                 onChange={(e) => updateIngredient(index, 'name', e.target.value)}
//                 style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Quantité"
//                 value={ingredient.quantity}
//                 onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
//                 style={{ width: '100px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Unité"
//                 value={ingredient.unit}
//                 onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
//                 style={{ width: '100px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
//               />
//             </div>
//           ))}
//           <button 
//             type="button" 
//             onClick={addIngredient}
//             style={{ padding: '8px 15px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px' }}
//           >
//             Ajouter un ingrédient
//           </button>
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <h3>Instructions</h3>
//           {instructions.map((instruction, index) => (
//             <textarea
//               key={index}
//               placeholder={`Étape ${index + 1}`}
//               value={instruction}
//               onChange={(e) => updateInstruction(index, e.target.value)}
//               style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '100px' }}
//               required
//             />
//           ))}
//           <button 
//             type="button" 
//             onClick={addInstruction}
//             style={{ padding: '8px 15px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px' }}
//           >
//             Ajouter une étape
//           </button>
//         </div>

//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
//           <div>
//             <label style={{ display: 'block', marginBottom: '5px' }}>Préparation (min)</label>
//             <input 
//               type="number" 
//               value={preparationTime} 
//               onChange={(e) => setPreparationTime(Number(e.target.value))} 
//               style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
//               min={0} 
//             />
//           </div>
//           <div>
//             <label style={{ display: 'block', marginBottom: '5px' }}>Cuisson (min)</label>
//             <input 
//               type="number" 
//               value={cookingTime} 
//               onChange={(e) => setCookingTime(Number(e.target.value))} 
//               style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
//               min={0} 
//             />
//           </div>
//           <div>
//             <label style={{ display: 'block', marginBottom: '5px' }}>Portions</label>
//             <input 
//               type="number" 
//               value={servings} 
//               onChange={(e) => setServings(Number(e.target.value))} 
//               style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
//               min={1} 
//             />
//           </div>
//         </div>

//         <button 
//           type="submit" 
//           style={{ 
//             width: '100%', 
//             padding: '12px', 
//             backgroundColor: '#4CAF50', 
//             color: 'white', 
//             border: 'none', 
//             borderRadius: '4px', 
//             cursor: 'pointer' 
//           }}
//         >
//           Enregistrer la recette
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RecipeForm;