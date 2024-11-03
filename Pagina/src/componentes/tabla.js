import React, { useEffect, useState } from "react";
import axios from "axios";

function Tabla() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [newDispositivo, setNewDispositivo] = useState({
    modelo: "",
    marca: "",
    año: "",
    caracteristicas: ""
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3500/api/dispositivos");
        setData(response.data);
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
      const response = await axios.post("http://localhost:3500/api/dispositivos", newDispositivo);
      setData([...data, response.data]);
      setNewDispositivo({ modelo: "", marca: "", año: "", caracteristicas: "" });
      setFormErrors({});
    } catch (err) {
      setError(err.message);
    }
  };

  const validateForm = (dispositivo) => {
    const errors = {};
    if (!dispositivo.modelo) errors.modelo = "El modelo es obligatorio.";
    if (!dispositivo.marca) errors.marca = "La marca es obligatoria.";
    if (!dispositivo.año) errors.año = "El año es obligatorio.";
    if (!dispositivo.caracteristicas) errors.caracteristicas = "Las características son obligatorias.";
    return errors;
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este dispositivo?")) {
      try {
        await axios.delete(`http://localhost:3500/api/dispositivos/${id}`);
        setData(data.filter((item) => item.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleModificar = (id) => {
    const dispositivo = data.find((item) => item.id === id);
    setNewDispositivo(dispositivo);
    setEditing(id);
  };

  const handleGuardarModificacion = async () => {
    try {
      const response = await axios.put(`http://localhost:3500/api/dispositivos/${editing}`, newDispositivo);
      setData(data.map((item) => (item.id === editing ? response.data : item)));
      setEditing(null);
      setNewDispositivo({ modelo: "", marca: "", año: "", caracteristicas: "" });
      setFormErrors({});
    } catch (err) {
      setError(err.message);
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
    <>
      <div style={{ overflowY: 'auto', maxHeight: '100vh', padding: '20px' }}>
        <div className="row mb-3">
          <div className="col-8">
            <input
              type="text"
              name="modelo"
              placeholder="Modelo"
              value={newDispositivo.modelo}
              onChange={handleInputChange}
              className={`form-control mb-2 ${formErrors.modelo ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{formErrors.modelo}</div>
            <input
              type="text"
              name="marca"
              placeholder="Marca"
              value={newDispositivo.marca}
              onChange={handleInputChange}
              className={`form-control mb-2 ${formErrors.marca ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{formErrors.marca}</div>
            <input
              type="number"
              name="año"
              placeholder="Año"
              value={newDispositivo.año}
              onChange={handleInputChange}
              className={`form-control mb-2 ${formErrors.año ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{formErrors.año}</div>
            <input
              type="text"
              name="caracteristicas"
              placeholder="Características"
              value={newDispositivo.caracteristicas}
              onChange={handleInputChange}
              className={`form-control mb-2 ${formErrors.caracteristicas ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{formErrors.caracteristicas}</div>
          </div>
          <div className="col-4 d-grid">
            {editing ? (
              <button className="btn btn-success" onClick={handleGuardarModificacion}>
                Guardar Cambios
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleAgregar}>
                Agregar
              </button>
            )}
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
              <th>Modificar</th>
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
                <td>
                  <button className="btn btn-warning" onClick={() => handleModificar(item.id)}>
                    Modificar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Tabla;