import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './componentes/menu';
import Home from './componentes/tarjetas';
import WelcomePage from './componentes/home';
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
          <Route path="/" element={<WelcomePage />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route
            path="/home"
            element={<MenuWithCards searchTerm={searchTerm} setSearchTerm={setSearchTerm} data={data} />}
          />
          <Route
            path="/tabla"
            element={<Tabla data={data} setData={setData} />}
          />
          <Route path="/tabla-samsung" element={<TablaS />} />
          <Route path="/tabla-huawei" element={<TablaH />} />
        </Routes>
      </div>
    </Router>
  );
}

function MenuWithCards({ searchTerm, setSearchTerm, data }) {
  return (
    <>
      <Menu setSearchTerm={setSearchTerm} />
      <Home searchTerm={searchTerm} data={data} /> {/* Pasamos 'data' a las tarjetas */}
    </>
  );
}

export default App;
