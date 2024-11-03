import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from './componentes/menu';
import Home from './componentes/tarjetas';
import WelcomePage from './componentes/home';
import Tabla from './componentes/tabla'; 

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
         
      
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<MenuWithCards searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          <Route path="/tabla" element={<Tabla />} />
        </Routes>
      </div>
    </Router>
  );
}

// Componente que combina el menú con las tarjetas de dispositivos
function MenuWithCards({ searchTerm, setSearchTerm }) {
  return (
    <>
      <Menu setSearchTerm={setSearchTerm} />
      <Home searchTerm={searchTerm} />
    </>
  );
}

export default App;
