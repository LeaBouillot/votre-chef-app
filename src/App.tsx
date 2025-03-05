import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import SearchRecipe from "./Components/SearchRecipe/SearchRecipe";
import RecipeDetail from "./Components/RecipeDetail/RecipeDetail";
import FavoriteRecipe from "./Components/FavoriteRecipe/FavoriteRecipe";
import RecipeForm from "./Components/RecipeForm/RecipeForm";
import Category from "./Components/Category/Category";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<SearchRecipe />} />
        <Route path="/recipes/:category" element={<Category />} />
        <Route path="//detail/:id" element={<RecipeDetail />} /> 
        <Route path="/add-recipe" element={<RecipeForm />} />
        <Route path="/favorites" element={<FavoriteRecipe />} />
      </Routes>
    </>
  );
}

export default App;
