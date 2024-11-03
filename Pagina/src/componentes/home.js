import React from 'react';
import { useNavigate } from 'react-router-dom';
import './fondo.css'

function WelcomePage() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home'); // Navegar a la página de Menú y tarjetas
  };

  return (
    
    <div className="welcome-container text-center my-5">
      <h1 className="welcome-title">Bienvenido a PhoneHub</h1>
      <button className="welcome-button" onClick={goToHome}>Ir al Menú</button>
    </div>
  );
}

export default WelcomePage;




