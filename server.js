// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3500;

// Middlewares
app.use(cors()); // Permitir CORS para todas las rutas
app.use(express.json()); // Permitir recibir datos en formato JSON

// Rutas
const DispositivosRoutes = require('./Rutas/Dispositivos');
app.use('/api/Dispositivos', DispositivosRoutes); // 

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
