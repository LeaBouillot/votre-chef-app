import React, { useState } from "react";
import "./Header.css";
import logo from "../assets/logo-chef.png";
import { Link, NavLink } from "react-router-dom";

const categories = [
  "Entrées",
  "Plats", 
  "Desserts", 
  "Français", 
  "Italien", 
  "Asiatique"
];

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="header">
      <div className="nav-logo">
        <img src={logo} alt="logo" width={100} />
        <p>Meilleurs Recettes</p>
      </div>
      
      <nav className="main-nav">
        <ul className="nav-list">
          <li>
            <NavLink to="/" end>Recettes</NavLink>
          </li>
          <li 
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span>Categories</span>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                {categories.map((category) => (
                  <li key={category}>
                    <Link to={`/recipes/${category.toLowerCase()}`}>
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <NavLink to="/add-recipe">Ajouter Recette</NavLink>
          </li>
          <li>
            <NavLink to="/favorites">Favoris</NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="nav-login">
        <Link to="/login">
          <button>Connexion</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;