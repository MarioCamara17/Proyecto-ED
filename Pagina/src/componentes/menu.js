import React from 'react';
import { Link } from 'react-router-dom';

function Menu({ setSearchTerm }) {
  const handleSearch = (e) => {
    e.preventDefault();
    // Aquí se realiza la búsqueda
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">PhoneHub</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/inicio">MENÚ</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tabla">TABLA DE DISPOSITIVOS</Link>
            </li>
          </ul>
          
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Buscar dispositivos..." 
              aria-label="Buscar" 
              onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
            />
            <button className="btn btn-outline-primary" type="submit">Buscar</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Menu;