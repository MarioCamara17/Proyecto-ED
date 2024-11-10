import React, { useEffect, useState } from "react";
import "./home.css";

function Home({ searchTerm }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedBrand, setExpandedBrand] = useState(null); // Marca expandida

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3500/api/dispositivos");
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const result = await response.json();
        // Mostrar solo las marcas iniciales Samsung, Apple y Huawei
        const initialDisplay = result.filter(
          (item) => item.marca === "Samsung" || item.marca === "Apple" || item.marca === "Huawei"
        );
        setData(initialDisplay);
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

  // Filtrar datos según el término de búsqueda o la marca expandida
  const filteredData = data.filter((item) =>
    item.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.marca.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleButtonClick = (item) => {
    setSelectedItem(item); // Mostrar detalles completos
  };

  const handleCloseFullScreen = () => {
    setSelectedItem(null); // Cerrar detalles completos
  };

  const handleExpandBrand = async (brand) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3500/api/dispositivos?marca=${brand}`);
      const result = await response.json();
      setData(result);
      setExpandedBrand(brand);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ overflowY: 'scroll', maxHeight: '100vh', padding: '20px' }}>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredData.map((item, index) => (
          <div className="col" key={item.id}>
            <div className="card bg-light text-dark shadow-sm text-center">
              <img src={item.imagen || "default_image.png"} className="card-img-top mx-auto" alt={item.modelo} style={{ maxWidth: '80%' }} />
              <div className="card-body">
                <h5 className="card-title">{item.modelo}</h5>
                <p className="card-text"><strong>Marca:</strong> {item.marca}</p>
                <div className="text-center mt-3">
                  {expandedBrand === item.marca ? (
                    <button className="btn btn-info" onClick={() => handleButtonClick(item)}>Más información</button>
                  ) : (
                    <button className="btn btn-primary" onClick={() => handleExpandBrand(item.marca)}>Ver modelos</button>
                  )}
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

