import React, { useState, useEffect } from "react";
import axios from "axios";

function Tabla({ data, setData }) {
  const [newDispositivo, setNewDispositivo] = useState({
    modelo: "",
    marca: "Samsung", // Marca predeterminada
    año: "",
    caracteristicas: "",
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
      const response = await axios.post(
        `http://localhost:3500/api/Dispositivos`,
        newDispositivo
      ); // Usar el endpoint para agregar dispositivos (general)
      if (response.status === 201) {
        setData({
          ...data,
          [newDispositivo.marca]: [...data[newDispositivo.marca], response.data],
        });
        setNewDispositivo({
          modelo: "",
          marca: "Samsung", // Por defecto Samsung
          año: "",
          caracteristicas: "",
        });
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
        </div>
        <div className="col-4 d-grid">
          <button className="btn btn-primary" onClick={handleAgregar}>
            Agregar dispositivo
          </button>
        </div>
      </div>

      {/* Samsung Devices */}
      <h3>Dispositivos Samsung</h3>
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
          {data.samsung && data.samsung.map((dispositivo) => (
            <tr key={dispositivo.id}>
              <td>{dispositivo.modelo}</td>
              <td>{dispositivo.año}</td>
              <td>{dispositivo.caracteristicas}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleEliminar(dispositivo.id, "samsung")}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Huawei Devices */}
      <h3>Dispositivos Huawei</h3>
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
          {data.huawei && data.huawei.map((dispositivo) => (
            <tr key={dispositivo.id}>
              <td>{dispositivo.modelo}</td>
              <td>{dispositivo.año}</td>
              <td>{dispositivo.caracteristicas}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleEliminar(dispositivo.id, "huawei")}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Apple Devices */}
      <h3>Dispositivos Apple</h3>
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
          {data.apple && data.apple.map((dispositivo) => (
            <tr key={dispositivo.id}>
              <td>{dispositivo.modelo}</td>
              <td>{dispositivo.año}</td>
              <td>{dispositivo.caracteristicas}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleEliminar(dispositivo.id, "apple")}
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
