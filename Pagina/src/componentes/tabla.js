import React, { useState, useEffect } from "react";
import axios from "axios";

function Tabla({ data, setData }) {
  const [newDispositivo, setNewDispositivo] = useState({
    modelo: "",
    marca: "Apple", // Fijamos la marca a Apple
    año: "",
    caracteristicas: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(null);  // Estado para manejar errores

  // Obtener dispositivos de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3500/api/dispositivos");
        setData(response.data); // Guardamos los datos obtenidos de la API
      } catch (err) {
        console.error("Error al obtener dispositivos: ", err);
        setError("Error al obtener dispositivos. Intenta más tarde.");
      }
    };
    fetchData();
  }, [setData]); // Esto se ejecuta al cargar el componente

  // Eliminar dispositivo
  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este dispositivo?")) {
      try {
        const response = await axios.delete(`http://localhost:3500/api/dispositivos/${id}`);
        if (response.status === 200) {
          // Eliminamos el dispositivo de la vista si se eliminó correctamente
          setData(data.filter((item) => item.id !== id));
          alert("Dispositivo eliminado correctamente.");
        } else {
          throw new Error("No se pudo eliminar el dispositivo.");
        }
      } catch (err) {
        console.error("Error al eliminar dispositivo: ", err);
        setError("Error al eliminar dispositivo.");
      }
    }
  };

  // Manejar el cambio de los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDispositivo({ ...newDispositivo, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  // Validar el formulario
  const validateForm = (form) => {
    const errors = {};
    if (!form.modelo) errors.modelo = "El modelo es obligatorio.";
    if (!form.año) errors.año = "El año es obligatorio.";
    else if (isNaN(form.año)) errors.año = "El año debe ser un número.";
    if (!form.caracteristicas) errors.caracteristicas = "Las características son obligatorias.";
    return errors;
  };

  // Agregar un nuevo dispositivo
  const handleAgregar = async () => {
    const errors = validateForm(newDispositivo);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3500/api/dispositivos", newDispositivo);
      if (response.status === 201) {
        setData([...data, response.data]); // Agregar el nuevo dispositivo a la vista
        setNewDispositivo({ modelo: "", marca: "Apple", año: "", caracteristicas: "" });
        setFormErrors({});
      } else {
        throw new Error("No se pudo agregar el dispositivo.");
      }
    } catch (err) {
      console.error("Error al agregar dispositivo: ", err);
      setError("Error al agregar dispositivo.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mostrar Tabla de Dispositivos</h2>

      {error && <div className="alert alert-danger">{error}</div>}

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
          <button className="btn btn-primary" onClick={handleAgregar}>Agregar dispositivo</button>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Año</th>
            <th>Características</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dispositivo) => (
            <tr key={dispositivo.id}>
              <td>{dispositivo.modelo}</td>
              <td>{dispositivo.año}</td>
              <td>{dispositivo.caracteristicas}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleEliminar(dispositivo.id)}
                >
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

export default Tabla;
