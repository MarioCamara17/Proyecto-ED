import React from 'react';
import { useNavigate } from 'react-router-dom';
import './fondo.css'

function Home() {
  const navigate = useNavigate();

  const goToInicio = () => {
    navigate('/inicio'); // Navegar a la página de Inicio
  };

  return (
    <div className="welcome-container text-center my-5">
      <h1 className="welcome-title">Bienvenido a PhoneHub</h1>
      <button className="welcome-button" onClick={goToInicio}>Ir al Menú</button>
    </div>
  );
}

export default Home;



