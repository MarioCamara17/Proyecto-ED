import React from 'react';
import { Link } from 'react-router-dom'; // Para redirigir al usuario

function Inicio() {
  return (
    <div className="container" style={{ marginTop: '50px' }}>
      <div className="row">
        {/* Columna izquierda: Samsung */}
        <div className="col-md-4 mb-4">
          <div className="card" style={{ width: '100%', borderRadius: '10px' }}>
            <img 
              src="logosamsung.png" 
              className="card-img-top" 
              alt="Dispositivo Samsung"
              style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
            />
            <div className="card-body">
              <h5 className="card-title">Samsung</h5>
              <p className="card-text">
                Descubre los dispositivos disponibles de Samsung.
              </p>
              <Link to="/tarjetasS" className="btn btn-primary">
                Ver Dispositivos
              </Link>
            </div>
          </div>
        </div>

        {/* Columna central: Apple */}
        <div className="col-md-4 mb-4">
          <div className="card" style={{ width: '100%', borderRadius: '10px' }}>
            <img 
              src="apple.png" 
              className="card-img-top" 
              alt="Dispositivo Apple"
              style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
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
        <div className="col-md-4 mb-4">
          <div className="card" style={{ width: '100%', borderRadius: '10px' }}>
            <img 
              src="logohuawei.png" 
              className="card-img-top" 
              alt="Dispositivo Huawei"
              style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
            />
            <div className="card-body">
              <h5 className="card-title">Huawei</h5>
              <p className="card-text">
                Descubre los dispositivos disponibles de Huawei.
              </p>
              <Link to="/tarjetasH" className="btn btn-primary">
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
