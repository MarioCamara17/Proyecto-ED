import React, { useEffect, useState } from "react";
import axios from "axios";

function TablaH() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newDispositivo, setNewDispositivo] = useState({
    modelo: "",
    marca: "Huawei", // Fijamos la marca a Huawei
    año: "",
    caracteristicas: ""
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3500/api/dispositivosH");
        // Filtrar solo los dispositivos de Huawei
        const huaweiDevices = response.data.filter((item) => item.marca === "Huawei");
        setData(huaweiDevices);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAgregar = async () => {
    const errors = validateForm(newDispositivo);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3500/api/dispositivosH", newDispositivo);
      setData([...data, response.data]);
      setNewDispositivo({ modelo: "", marca: "Huawei", año: "", caracteristicas: "" });
      setFormErrors({});
    } catch (err) {
      setError(`Error al agregar dispositivo: ${err.message}`);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este dispositivo?")) {
      try {
        await axios.delete(`http://localhost:3500/api/dispositivosH/${id}`);
        setData(data.filter((item) => item.id !== id));
      } catch (err) {
        setError(`Error al eliminar dispositivo: ${err.message}`);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDispositivo({ ...newDispositivo, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mostrar Tabla de Dispositivos Huawei</h2>

      <div className="row mb-3">
        <div className="col-8">
          <input
            type="text"
            name="modelo"
            placeholder="Modelo"
            value={newDispositivo.modelo}
            onChange={handleInputChange}
            className={`form-control mb-2 ${formErrors.modelo ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{formErrors.modelo}</div>
          <input
            type="number"
            name="año"
            placeholder="Año"
            value={newDispositivo.año}
            onChange={handleInputChange}
            className={`form-control mb-2 ${formErrors.año ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{formErrors.año}</div>
          <input
            type="text"
            name="caracteristicas"
            placeholder="Características"
            value={newDispositivo.caracteristicas}
            onChange={handleInputChange}
            className={`form-control mb-2 ${formErrors.caracteristicas ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{formErrors.caracteristicas}</div>
        </div>
        <div className="col-4 d-grid">
          <button className="btn btn-primary" onClick={handleAgregar}>
            Agregar
          </button>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Año</th>
            <th>Características</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.modelo}</td>
              <td>{item.marca}</td>
              <td>{item.año}</td>
              <td>{item.caracteristicas}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleEliminar(item.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const validateForm = (form) => {
  const errors = {};

  if (!form.modelo) {
    errors.modelo = "El modelo es obligatorio.";
  }

  if (!form.año) {
    errors.año = "El año es obligatorio.";
  } else if (isNaN(form.año)) {
    errors.año = "El año debe ser un número.";
  }

  if (!form.caracteristicas) {
    errors.caracteristicas = "Las características son obligatorias.";
  }

  return errors;
};

export default TablaH;
