import React, { useEffect, useState } from "react";
import "./home.css";

function Home({ searchTerm }) {
  const [dataApple, setDataApple] = useState([]); // Datos de Apple
  const [dataSamsung, setDataSamsung] = useState([]); // Datos de Samsung
  const [dataHuawei, setDataHuawei] = useState([]); // Datos de Huawei
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3500/api/dispositivos");
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const result = await response.json();

        // Filtrar dispositivos de Apple, Samsung y Huawei
        const appleDevices = result.filter((item) => item.marca === "Apple");
        const samsungDevices = result.filter((item) => item.marca === "Samsung");
        const huaweiDevices = result.filter((item) => item.marca === "Huawei");

        setDataApple(appleDevices);
        setDataSamsung(samsungDevices);
        setDataHuawei(huaweiDevices);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filtrar datos según el término de búsqueda
  const filteredAppleData = dataApple.filter((item) =>
    item.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.marca.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredSamsungData = dataSamsung.filter((item) =>
    item.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.marca.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredHuaweiData = dataHuawei.filter((item) =>
    item.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.marca.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleButtonClick = (item) => {
    setSelectedItem(item); // Mostrar detalles completos
  };

  const handleCloseFullScreen = () => {
    setSelectedItem(null); // Cerrar detalles completos
  };

  return (
    <div style={{ overflowY: 'scroll', maxHeight: '100vh', padding: '20px' }}>
      <h2>Dispositivos Apple</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredAppleData.map((item) => (
          <div className="col" key={item.id}>
            <div className="card bg-light text-dark shadow-sm text-center">
              <img src={item.imagen || "default_image.png"} className="card-img-top mx-auto" alt={item.modelo} style={{ maxWidth: '80%' }} />
              <div className="card-body">
                <h5 className="card-title">{item.modelo}</h5>
                <p className="card-text"><strong>Marca:</strong> {item.marca}</p>
                <div className="text-center mt-3">
                  <button className="btn btn-info" onClick={() => handleButtonClick(item)}>Más información</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Dispositivos Samsung</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredSamsungData.map((item) => (
          <div className="col" key={item.id}>
            <div className="card bg-light text-dark shadow-sm text-center">
              <img src={item.imagen || "default_image.png"} className="card-img-top mx-auto" alt={item.modelo} style={{ maxWidth: '80%' }} />
              <div className="card-body">
                <h5 className="card-title">{item.modelo}</h5>
                <p className="card-text"><strong>Marca:</strong> {item.marca}</p>
                <div className="text-center mt-3">
                  <button className="btn btn-info" onClick={() => handleButtonClick(item)}>Más información</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Dispositivos Huawei</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredHuaweiData.map((item) => (
          <div className="col" key={item.id}>
            <div className="card bg-light text-dark shadow-sm text-center">
              <img src={item.imagen || "default_image.png"} className="card-img-top mx-auto" alt={item.modelo} style={{ maxWidth: '80%' }} />
              <div className="card-body">
                <h5 className="card-title">{item.modelo}</h5>
                <p className="card-text"><strong>Marca:</strong> {item.marca}</p>
                <div className="text-center mt-3">
                  <button className="btn btn-info" onClick={() => handleButtonClick(item)}>Más información</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vista completa para detalles */}
      {selectedItem && (
        <div className="full-screen-overlay" onClick={handleCloseFullScreen}>
          <div className="full-screen-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedItem.modelo}</h2>
            <img src={selectedItem.imagen} alt={selectedItem.modelo} style={{ maxWidth: '100%', maxHeight: '80vh' }} />
            <p><strong>Marca:</strong> {selectedItem.marca}</p>
            <p><strong>Año:</strong> {selectedItem.año}</p>
            <p><strong>Características:</strong> {selectedItem.caracteristicas}</p>
            <p><strong>Funcionalidad:</strong> Texto adicional sobre la funcionalidad del dispositivo.</p>
            <button className="btn btn-secondary" onClick={handleCloseFullScreen}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
