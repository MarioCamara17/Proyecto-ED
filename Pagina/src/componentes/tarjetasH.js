import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "./menu"; // Asegúrate de que la ruta sea correcta
import "./home.css"; // Asegúrate de tener este archivo para los estilos

<<<<<<< HEAD
function TarjetasH({ searchTerm }) {
  const [dataApple, setDataApple] = useState([]); // Datos de Apple
  const [dataSamsung, setDataSamsung] = useState([]); // Datos de Samsung
  const [dataHuawei, setDataHuawei] = useState([]); // Datos de Huawei
=======
function TarjetasH() {
  const [data, setData] = useState([]);
>>>>>>> 0b81af831f0bebe0a3a7740a0fc4d5ad84a491d9
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
<<<<<<< HEAD
        const response = await fetch("http://localhost:3500/api/dispositivosH");
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
=======
        const response = await axios.get("http://localhost:3500/api/dispositivosH");
        
        // Filtrar dispositivos de Huawei
        const huaweiDevices = response.data.filter((item) => item.marca === "Huawei");
        setData(huaweiDevices);
>>>>>>> 0b81af831f0bebe0a3a7740a0fc4d5ad84a491d9
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtrar datos por término de búsqueda
  const filteredData = data.filter((item) =>
    item.modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleButtonClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseFullScreen = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <Menu setSearchTerm={setSearchTerm} />
      <div style={{ overflowY: 'scroll', maxHeight: '100vh', padding: '20px' }}>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredData.map((item) => (
            <div className="col" key={item.id}>
              <div className="card bg-light text-dark shadow-sm text-center">
                <img
                  src={item.imagen || "https://via.placeholder.com/150"}
                  className="card-img-top mx-auto"
                  alt={item.modelo}
                  style={{ maxWidth: '80%' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.modelo}</h5>
                  <p className="card-text"><strong>Marca:</strong> {item.marca}</p>
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
                src={selectedItem.imagen || "https://via.placeholder.com/150"}
                alt={selectedItem.modelo}
                style={{ maxWidth: '100%', maxHeight: '80vh' }}
              />
              <p><strong>Marca:</strong> {selectedItem.marca}</p>
              <p><strong>Año:</strong> {selectedItem.año}</p>
              <p><strong>Características:</strong> {selectedItem.caracteristicas}</p>
              <button className="btn btn-secondary" onClick={handleCloseFullScreen}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TarjetasH;
