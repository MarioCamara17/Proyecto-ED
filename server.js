const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3500;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const dispositivosRoutes = require('./routes/dispositivos');
app.use('/api/Dispositivos', dispositivosRoutes);

const dispositivosSRoutes = require('./routes/dispositivosS');
app.use('/api/DispositivosS', dispositivosSRoutes);

const dispositivosHRoutes = require('./routes/dispositivosH');
app.use('/api/DispositivosH', dispositivosHRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

