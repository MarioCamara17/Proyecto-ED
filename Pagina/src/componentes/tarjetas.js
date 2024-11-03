import React, { useEffect, useState } from "react";
import "./home.css";

function Home({ searchTerm }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // Estado para el dispositivo seleccionado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3500/api/dispositivos");
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const result = await response.json();
        setData(result);
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

  // Filtrar los dispositivos según el término de búsqueda
  const filteredData = data.filter(item =>
    item.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.marca.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getColorClass = (index) => {
    const colors = [
      "bg-primary",
      "bg-success",
      "bg-info",
      "bg-warning",
      "bg-danger",
      "bg-secondary",
      "bg-light"
    ];
    return colors[index % colors.length];
  };

  const handleButtonClick = (item) => {
    setSelectedItem(item); // Establecer el dispositivo seleccionado
  };

  const handleCloseFullScreen = () => {
    setSelectedItem(null); // Cerrar la vista a pantalla completa
  };

  return (
    <div style={{ overflowY: 'scroll', maxHeight: '100vh', padding: '20px' }}>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredData.map((item, index) => (
          <div className="col" key={item.id}>
            <div className={`card ${getColorClass(index)} text-dark shadow-sm`}>
              <img src={item.imagen} className="card-img-top" alt={item.modelo} />
              <div className="card-body">
                <h5 className="card-title">{item.modelo}</h5>
                <p className="card-text">
                  <strong>Marca:</strong> {item.marca}
                </p>
                <div className="text-center mt-3">
                  <button 
                    className="btn btn-info" 
                    onClick={() => handleButtonClick(item)}
                  >
                    Más información
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Componente para vista a pantalla completa */}
      {selectedItem && (
        <div className="full-screen-overlay" onClick={handleCloseFullScreen}>
          <div className="full-screen-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedItem.modelo}</h2>
            <img src={selectedItem.imagen} alt={selectedItem.modelo} style={{ maxWidth: '100%', maxHeight: '80vh' }} />
            <p><strong>Marca:</strong> {selectedItem.marca}</p>
            <p><strong>Año:</strong> {selectedItem.año}</p>
            <p><strong>Características:</strong> {selectedItem.caracteristicas}</p>
            <button className="btn btn-secondary" onClick={handleCloseFullScreen}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
