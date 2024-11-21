import React, { useState, useEffect } from "react";
import axios from "axios";

function Tabla({ data, setData }) {
  const [newDispositivo, setNewDispositivo] = useState({
    modelo: "",
    marca: "Samsung", // Marca predeterminada
    año: "",
    caracteristicas: "",
    descripcion: "", // Nuevo campo de descripción
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(null);

  // Fetching data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.all([
          axios.get("http://localhost:3500/api/DispositivosS"), // Samsung
          axios.get("http://localhost:3500/api/DispositivosH"), // Huawei
          axios.get("http://localhost:3500/api/Dispositivos"), // Apple
        ]);

        // Combining all data from Samsung, Huawei, and Apple
        setData({
          samsung: response[0].data,
          huawei: response[1].data,
          apple: response[2].data,
        });
      } catch (err) {
        console.error("Error al obtener dispositivos: ", err);
        setError("Error al obtener dispositivos. Intenta más tarde.");
      }
    };
    fetchData();
  }, [setData]);

  // Function to handle deletion of a device
  const handleEliminar = async (id, marca) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este dispositivo?")) {
      try {
        let response;
        // Check the marca and delete from the appropriate endpoint
        if (marca === "samsung") {
          response = await axios.delete(`http://localhost:3500/api/DispositivosS/${id}`);
        } else if (marca === "huawei") {
          response = await axios.delete(`http://localhost:3500/api/DispositivosH/${id}`);
        } else if (marca === "apple") {
          response = await axios.delete(`http://localhost:3500/api/Dispositivos/${id}`);
        }

        if (response.status === 200) {
          // Remove device from the correct brand's array
          setData({
            ...data,
            [marca]: data[marca].filter((item) => item.id !== id),
          });
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

  // Handling input changes for adding a new device
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDispositivo({ ...newDispositivo, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  // Validating form inputs
  const validateForm = (form) => {
    const errors = {};
    if (!form.modelo) errors.modelo = "El modelo es obligatorio.";
    if (!form.año) errors.año = "El año es obligatorio.";
    else if (isNaN(form.año)) errors.año = "El año debe ser un número.";
    if (!form.caracteristicas)
      errors.caracteristicas = "Las características son obligatorias.";
    if (!form.descripcion)
      errors.descripcion = "La descripción es obligatoria."; // Validación para la descripción
    return errors;
  };

  // Function to add a new device
  const handleAgregar = async () => {
    const errors = validateForm(newDispositivo);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      // Send the data to the backend (endpoint para agregar dispositivos)
      const response = await axios.post(
        `http://localhost:3500/api/Dispositivos`, // Usar el endpoint para agregar dispositivos (general)
        newDispositivo
      );
      
      if (response.status === 201) {
        // Add the new device to the corresponding brand's array
        setData({
          ...data,
          [newDispositivo.marca]: [...data[newDispositivo.marca], response.data],
        });
        
        // Reset form after adding
        setNewDispositivo({
          modelo: "",
          marca: "Samsung", // Por defecto Samsung
          año: "",
          caracteristicas: "",
          descripcion: "", // Reseteamos también el campo de descripción
        });
        
        // Clear form errors
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
    <div style={{ padding: "20px", maxHeight: "80vh", overflowY: "auto" }}>
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
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={newDispositivo.descripcion}
            onChange={handleInputChange}
            className={`form-control mb-2 ${formErrors.descripcion ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{formErrors.descripcion}</div>
          <select
            name="marca"
            value={newDispositivo.marca}
            onChange={handleInputChange}
            className="form-control mb-2"
          >
            <option value="Samsung">Samsung</option>
            <option value="Huawei">Huawei</option>
            <option value="Apple">Apple</option>
          </select>
        </div>
        <div className="col-4 d-grid">
          <button className="btn btn-primary" onClick={handleAgregar}>
            Agregar dispositivo
          </button>
        </div>
      </div>

      {/* Render devices for each brand */}
      {['samsung', 'huawei', 'apple'].map((marca) => (
        <div key={marca}>
          <h3>Dispositivos {marca.charAt(0).toUpperCase() + marca.slice(1)}</h3>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Modelo</th>
                <th>Año</th>
                <th>Características</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data[marca] && data[marca].map((dispositivo) => (
                <tr key={dispositivo.id}>
                  <td>{dispositivo.modelo}</td>
                  <td>{dispositivo.año}</td>
                  <td>{dispositivo.caracteristicas}</td>
                  <td>{dispositivo.descripcion}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleEliminar(dispositivo.id, marca)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Tabla;

