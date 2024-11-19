import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../componentes/home';
import Tabla from '../componentes/tabla';

function Rutas() {
  return (
    <Routes>
      {/* Ruta principal que muestra el componente Home */}
      <Route path='/' element={<Home />} />
      
      {/* Ruta para la tabla */}
      <Route path='/tabla' element={<Tabla />} />
      
      {/* Ruta opcional para páginas no encontradas */}
      <Route path='*' element={<h1>Página no encontrada</h1>} />
    </Routes>
  );
}

export default Rutas;
