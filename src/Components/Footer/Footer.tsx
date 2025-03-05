import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../assets/logo-chef.png";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="logo" width={60} />
          <p>Meilleurs Recettes</p>
        </div>
        
        <div className="footer-links">
          <Link to="/">Recettes</Link>
          <Link to="/add-recipe">Ajouter</Link>
          <Link to="/favorites">Favoris</Link>
          <Link to="/about">À propos</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Léa Bouillot - Tous droits réservés</p>
      </div>
    </footer>
  );
};

export default Footer;