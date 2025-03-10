# Projet : Application de Recettes de Cuisine


## Description Générale
Cette application permet aux utilisateurs de rechercher, ajouter et consulter des recettes de cuisine. Elle inclut une fonctionnalité pour marquer des recettes comme favorites. Le projet utilise React JS, TypeScript et HTML/CSS avec une architecture modulaire.

---

## Fonctionnalités

### 1. Recherche de Recettes
- **Barre de recherche interactive** :
  - Suggestions en temps réel basées sur les caractères saisis
  - Recherche dans une base de données de recettes (mockée ou API externe)
  - Historique des recherches récentes (optionnel)

### 2. Affichage des Recettes
- **Liste de recettes** :
  - Affichage en carte avec image, titre, temps de préparation et catégorie
  - Filtres par catégorie (Entrées, Plats principaux, Desserts) et type de cuisine (Italienne, Asiatique, etc.)
  - Tri par popularité ou temps de préparation
- **Page détaillée** :
  - Vue complète avec ingrédients, étapes de préparation, conseils
  - Affichage du nombre de portions et de la difficulté
  - Bouton "Ajouter aux favoris"

### 3. Ajout de Recettes
- **Formulaire de soumission** :
  - Champs validés en temps réel (ex: titre > 3 caractères)
  - Gestion des images via upload ou URL
  - Catégories et types de cuisine en liste déroulante
  - Validation des ingrédients (format liste)

### 4. Gestion des Favoris
- **Favoris persistants** :
  - Stockage dans le `localStorage`
  - Page dédiée avec filtre et suppression
  - Indicateur visuel de favori dans la liste principale

---

## Architecture Technique

### Composants React
| Composant         | Rôle                                                                 |
|-------------------|---------------------------------------------------------------------|
| `App`             | Gestion de l'état global et de la navigation                          |
| `Header`          | Barre de navigation avec lien de recherche et favoris                |
| `RecipeList`      | Affichage filtré/trié avec pagination                                 |
| `RecipeDetail`    | Vue détaillée avec interactions (favoris, partage)                   |
| `RecipeForm`      | Formulaire validé avec gestion des erreurs en temps réel             |
| `FavoriteList`    | Page des favoris avec suppression interactive                        |

### Gestion d'État
- **TypeScript** :
  - Définition de types pour `Recipe`, `FormState`, `FilterOptions`
  - Hooks personnalisés pour gestion des favoris (ex: `useFavorites`)
- **Context API** :
  - Partage des données de recettes entre composants
  - Gestion de l'état global avec `useReducer`

### Outils & Bibliothèques
| Catégorie           | Outils Bibliothèques                          |
|---------------------|---------------------------------------------|
| **Framework**       | React JS v18, TypeScript v5.1              |
| **Design**          | CSS Modules, Flexbox/Grid, Tailwind CSS     |
| **Navigation**      | React Router v6 (Navigateur de page)        |
| **Validation**      | Yup + Formik pour formulaire               |
| **Assets**          | Base64 pour stockage temporaire d'images    |

---

## Déploiement
```bash
# Installation
npm install

# Démarrage (mode dev)
npm start

# Build production
npm run build
