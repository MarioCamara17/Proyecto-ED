import React, { useEffect, useState } from "react";
import axios from "axios"; // Importa Axios
import "./home.css";

function Tarjetas({ searchTerm }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3500/api/dispositivos");
        const result = response.data;
        const appleDevices = result.filter((item) => item.marca === "Apple");
        setData(appleDevices);
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

  const filteredData = data.filter((item) =>
    item.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.marca.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleButtonClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseFullScreen = () => {
    setSelectedItem(null);
  };

  return (
    <div style={{ overflowY: "scroll", maxHeight: "100vh", padding: "20px" }}>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredData.map((item, index) => (
          <div className="col" key={item.id}>
            <div className="card bg-light text-dark shadow-sm text-center">
              <img
                src={item.imagen || "default_image.png"}
                className="card-img-top mx-auto"
                alt={item.modelo}
                style={{ maxWidth: "80%" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.modelo}</h5>
                <p className="card-text">
                  <strong>Marca:</strong> {item.marca}
                </p>
              
                <div className="text-center mt-3">
                  <button className="btn btn-info" onClick={() => handleButtonClick(item)}>
                    Más información
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="full-screen-overlay" onClick={handleCloseFullScreen}>
          <div className="full-screen-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedItem.modelo}</h2>
            <img
              src={selectedItem.imagen}
              alt={selectedItem.modelo}
              style={{ maxWidth: "100%", maxHeight: "80vh" }}
            />
            <p>
              <strong>Marca:</strong> {selectedItem.marca}
            </p>
            <p>
              <strong>Año:</strong> {selectedItem.año}
            </p>
            <p>
              <strong>Características:</strong> {selectedItem.caracteristicas}
            </p>
            <p>
              <strong>Descripción:</strong> {selectedItem.funcionalidad}
            </p>
            <button className="btn btn-secondary" onClick={handleCloseFullScreen}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tarjetas;

