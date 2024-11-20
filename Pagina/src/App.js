import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './componentes/menu';
import Tarjetas from './componentes/tarjetas';
import TarjetasS from './componentes/tarjetasS';
import TarjetasH from './componentes/tarjetasH';
import Home from './componentes/home';
import Tabla from './componentes/tabla';
import TablaS from './componentes/tablaS';
import TablaH from './componentes/tablaH';
import Inicio from './componentes/Inicio'; // Importamos el componente Inicio

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]); // Estado compartido para los dispositivos

  return (
    <Router>
      <div className="container-fluid">
        <Routes>
          {/* Ruta de bienvenida */}
          <Route path="/" element={<Home />} />
          
          {/* Ruta de inicio */}
          <Route path="/inicio" element={<Inicio />} />
          
          {/* Ruta para el menú y las tarjetas de apple */}
          <Route
            path="/home"
            element={<MenuWithCards searchTerm={searchTerm} setSearchTerm={setSearchTerm} data={data} />}
          />
          
          {/* Ruta para la tabla de apple */}
          <Route
            path="/tabla"
            element={<Tabla data={data} setData={setData} />}
          />

          {/* Rutas para tablas específicas de cada marca */}
          <Route path="/tabla-samsung" element={<TablaS />} />
          <Route path="/tabla-huawei" element={<TablaH />} />

          {/* Rutas para tarjetas específicas de cada marca */}
          <Route path="tarjetasS" element={<TarjetasS />} />
          <Route path="/tarjetas-huawei" element={<TarjetasH />} />
        </Routes>
      </div>
    </Router>
  );
}

function MenuWithCards({ searchTerm, setSearchTerm, data }) {
  return (
    <>
      <Menu setSearchTerm={setSearchTerm} />
      <Tarjetas searchTerm={searchTerm} data={data} /> {/* Pasamos 'data' a las tarjetas */}
    </>
  );
}

export default App;
