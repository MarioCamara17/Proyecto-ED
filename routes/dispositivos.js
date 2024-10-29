const express = require('express');
const router = express.Router();

// Datos de ejemplo para simular una base de datos
let dispositivos = [
  { id: 1, modelo: 'Galaxy S21', marca: 'Samsung', año: 2021, caracteristicas: '128GB, 8GB RAM, 5G' },
  { id: 2, modelo: 'iPhone 13', marca: 'Apple', año: 2021, caracteristicas: '128GB, 6GB RAM, 5G' },
  { id: 3, modelo: 'Pixel 5', marca: 'Google', año: 2020, caracteristicas: '128GB, 8GB RAM, 5G' },
  { id: 4, modelo: 'OnePlus 9', marca: 'OnePlus', año: 2021, caracteristicas: '128GB, 8GB RAM, 5G' },
  { id: 5, modelo: 'Xiaomi Mi 11', marca: 'Xiaomi', año: 2021, caracteristicas: '256GB, 8GB RAM, 5G' },
  { id: 6, modelo: 'iPhone 12', marca: 'Apple', año: 2020, caracteristicas: '128GB, 4GB RAM, 5G' },
  { id: 7, modelo: 'Samsung Galaxy Note 20', marca: 'Samsung', año: 2020, caracteristicas: '256GB, 8GB RAM, 5G' },
  { id: 8, modelo: 'Google Pixel 7', marca: 'Google', año: 2022, caracteristicas: '128GB, 8GB RAM, 5G' },
  { id: 9, modelo: 'iPhone 14', marca: 'Apple', año: 2022, caracteristicas: '128GB, 6GB RAM, 5G' },
  { id: 10, modelo: 'Samsung Galaxy S24', marca: 'Samsung', año: 2024, caracteristicas: '256GB, 12GB RAM, 5G' },
];

// Obtener todos los dispositivos
router.get('/', (req, res) => {
  res.json(dispositivos);
});

// Agregar un nuevo dispositivo
router.post('/', (req, res) => {
  const nuevoDispositivo = req.body;
  nuevoDispositivo.id = dispositivos.length ? dispositivos[dispositivos.length - 1].id + 1 : 1; // Mejor manejo de ID
  dispositivos.push(nuevoDispositivo);
  res.status(201).json(nuevoDispositivo);
});

// Actualizar un dispositivo
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const dispositivoIndex = dispositivos.findIndex(dev => dev.id === parseInt(id));
  if (dispositivoIndex !== -1) {
    dispositivos[dispositivoIndex] = { ...dispositivos[dispositivoIndex], ...req.body };
    res.json(dispositivos[dispositivoIndex]);
  } else {
    res.status(404).json({ mensaje: 'Dispositivo no encontrado' });
  }
});

// Eliminar un dispositivo
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const dispositivoIndex = dispositivos.findIndex(dev => dev.id === parseInt(id));
  if (dispositivoIndex !== -1) {
    dispositivos.splice(dispositivoIndex, 1); // Eliminar el dispositivo
    res.json({ mensaje: 'Dispositivo eliminado' });
  } else {
    res.status(404).json({ mensaje: 'Dispositivo no encontrado' });
  }
});

module.exports = router;
