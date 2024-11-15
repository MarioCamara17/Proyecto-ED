import React from 'react';
import { Link } from 'react-router-dom'; // Para redirigir al usuario

function Inicio() {
  return (
    <div className="container" style={{ marginTop: '50px' }}>
      <div className="row">
        {/* Columna izquierda: Samsung */}
        <div className="col-md-4">
          <div className="card" style={{ width: '18rem' }}>
            <img 
              src="https://via.placeholder.com/150" 
              className="card-img-top" 
              alt="Imagen de Samsung" 
            />
            <div className="card-body">
              <h5 className="card-title">Samsung</h5>
              <p className="card-text">
                Descubre los dispositivos disponibles de Samsung.
              </p>
              <Link to="/home" className="btn btn-primary">
                Ver Dispositivos
              </Link>
            </div>
          </div>
        </div>

        {/* Columna central: Apple */}
        <div className="col-md-4">
          <div className="card" style={{ width: '18rem' }}>
            <img 
              src="https://via.placeholder.com/150" 
              className="card-img-top" 
              alt="Imagen de Apple" 
            />
            <div className="card-body">
              <h5 className="card-title">Apple</h5>
              <p className="card-text">
                Descubre los dispositivos disponibles de Apple.
              </p>
              <Link to="/home" className="btn btn-primary">
                Ver Dispositivos
              </Link>
            </div>
          </div>
        </div>

        {/* Columna derecha: Huawei */}
        <div className="col-md-4">
          <div className="card" style={{ width: '18rem' }}>
            <img 
              src="https://via.placeholder.com/150" 
              className="card-img-top" 
              alt="Imagen de Huawei" 
            />
            <div className="card-body">
              <h5 className="card-title">Huawei</h5>
              <p className="card-text">
                Descubre los dispositivos disponibles de Huawei.
              </p>
              <Link to="/home" className="btn btn-primary">
                Ver Dispositivos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
