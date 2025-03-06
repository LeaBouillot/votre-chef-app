import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../assets/logo-chef.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Reset error
    setError("");
    
    // Validation améliorée
    if (!email) {
      setError("Veuillez saisir votre adresse email");
      return;
    }
    
    if (!validateEmail(email)) {
      setError("Veuillez saisir une adresse email valide");
      return;
    }
    
    if (!password) {
      setError("Veuillez saisir votre mot de passe");
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulation d'appel API (à remplacer par votre logique d'authentification)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Gestion du "Se souvenir de moi"
      if (rememberMe) {
        localStorage.setItem("userEmail", email);
      } else {
        localStorage.removeItem("userEmail");
      }
      
      // Ici, vous intégreriez votre logique de connexion
      console.log("Tentative de connexion avec:", { email, password, rememberMe });
      
      // Redirection après connexion réussie
      navigate("/");
    } catch (err) {
      setError("Échec de la connexion. Veuillez vérifier vos identifiants.");
      console.error("Erreur de connexion:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="Votre Chef" className="login-logo" />
          <h1>Bienvenue sur Votre Chef</h1>
          <p>Accédez à vos recettes favorites et découvrez de nouvelles inspirations culinaires</p>
        </div>
        
        {error && <div className="login-error" role="alert">{error}</div>}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              aria-required="true"
              aria-invalid={error && !email ? "true" : "false"}
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Votre mot de passe"
                aria-required="true"
                aria-invalid={error && !password ? "true" : "false"}
                disabled={isLoading}
              />
              <button 
                type="button" 
                className="toggle-password-visibility" 
                onClick={toggleShowPassword}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? "Masquer" : "Afficher"}
              </button>
            </div>
          </div>
          
          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <label htmlFor="remember">Se souvenir de moi</label>
            </div>
            <Link to="/forgot-password" className="forgot-password" tabIndex={isLoading ? -1 : 0}>
              Mot de passe oublié?
            </Link>
          </div>
          
          <button
            type="submit"
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                <span>Connexion en cours...</span>
              </>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>
        
        <div className="social-login">
          <p>Ou connectez-vous avec</p>
          <div className="social-buttons">
            <button className="social-button google">Google</button>
            <button className="social-button facebook">Facebook</button>
          </div>
        </div>
        
        <div className="login-footer">
          <p>Pas encore de compte?</p>
          <Link to="/register" className="register-link" tabIndex={isLoading ? -1 : 0}>
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;