const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3500;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importar y utilizar las rutas de dispositivos
const dispositivosRoutes = require('./routes/Dispositivos'); // Asegúrate de que la ruta y el nombre del archivo sean correctos
app.use('/api/Dispositivos', dispositivosRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
