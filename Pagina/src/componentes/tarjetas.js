import React, { useEffect, useState } from "react";

function Home({ searchTerm }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {filteredData.map((item, index) => (
        <div className="col" key={item.id}>
          <div className={`card ${getColorClass(index)} text-dark shadow-sm`}>
            <img src={item.imagen} className="card-img-top" alt={item.modelo} />
            <div className="card-body">
              <h5 className="card-title">{item.modelo}</h5>
              <p className="card-text">
                <strong>Marca:</strong> {item.marca}<br />
                <strong>Año:</strong> {item.año}<br />
                <strong>Características:</strong> {item.caracteristicas}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Home;

