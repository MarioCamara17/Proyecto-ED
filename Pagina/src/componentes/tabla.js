import React, { useState, useEffect } from "react";
import axios from "axios";

function Tabla({ data, setData }) {
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(null);

  // Fetching data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.all([
          axios.get("http://localhost:3500/api/DispositivosS"), // Samsung
          axios.get("http://localhost:3500/api/DispositivosH"), // Huawei
          axios.get("http://localhost:3500/api/Dispositivos"),  // Apple
        ]);

        // Combine all data from Samsung, Huawei, and Apple
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

  // Funcion para eliminar
  const handleEliminar = async (id, marca) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este dispositivo?")) {
      try {
        let response;
        // endopoint para eliminar
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

  // Validating form inputs
  const validateForm = (form) => {
    const errors = {};
    if (!form.modelo) errors.modelo = "El modelo es obligatorio.";
    if (!form.año) errors.año = "El año es obligatorio.";
    else if (isNaN(form.año)) errors.año = "El año debe ser un número.";
    if (!form.caracteristicas)
      errors.caracteristicas = "Las características son obligatorias.";
    if (!form.descripcion)
      errors.descripcion = "La descripción es obligatoria.";
    return errors;
  };

  // Funcion de agregar
  const handleAgregar = async (marca, newDispositivo) => {
    const errors = validateForm(newDispositivo);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

  
    try {
      let endpoint;
      if (marca === "samsung") {
        endpoint  = "http://localhost:3500/api/DispositivosS"; // Endpoint para agregar dispositivos Samsung
      } else if (marca === "huawei") {
        endpoint = "http://localhost:3500/api/DispositivosH"; // Endpoint para agregar dispositivos Huawei
      } else if (marca === "apple") {
        endpoint = "http://localhost:3500/api/Dispositivos"; // Endpoint para agregar dispositivos Apple
      } else {
        throw new Error("Marca no reconocida.");
      }

      const response = await axios.post(endpoint, { ...newDispositivo, marca });

      if (response.status === 201) {
        // Add the new device to the corresponding brand's array
        setData({
          ...data,
          [marca]: [...data[marca], response.data],
        });
        alert("Dispositivo agregado correctamente.");
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

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Render devices for each brand */}
      {["samsung", "huawei", "apple"].map((marca) => (
        <div key={marca}>
          <h1>Dispositivos {marca.charAt(0).toUpperCase() + marca.slice(1)}</h1>

          {/* Formulario para agregar dispositivos específicos a la marca */}
          <div className="mb-3">
            <h2>Agregar nuevo dispositivo a {marca.charAt(0).toUpperCase() + marca.slice(1)}</h2>
            <FormularioAgregar
              marca={marca}
              onAgregar={(nuevoDispositivo) => handleAgregar(marca, nuevoDispositivo)}
            />
          </div>

          {/* Tabla de dispositivos */}
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

function FormularioAgregar({ marca, onAgregar }) {
  const [form, setForm] = useState({
    modelo: "",
    año: "",
    caracteristicas: "",
    descripcion: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="row">
      <div className="col-8">
        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          value={form.modelo}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="number"
          name="año"
          placeholder="Año"
          value={form.año}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="caracteristicas"
          placeholder="Características"
          value={form.caracteristicas}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
      </div>
      <div className="col-4">
        <button
          className="btn btn-primary"
          onClick={() => onAgregar({ ...form })}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}

export default Tabla;




