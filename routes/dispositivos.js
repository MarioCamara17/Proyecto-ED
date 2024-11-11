const express = require('express');
const router = express.Router();

// Datos de ejemplo para simular una base de datos
let dispositivos = [
  { id: 1, modelo: 'Galaxy S21', marca: 'Samsung', año: 2021, caracteristicas: '128GB, 8GB RAM, 5G', imagen: 'galaxy S21.jpg' },
  { id: 2, modelo: 'iPhone 13', marca: 'Apple', año: 2021, caracteristicas: '128GB, 6GB RAM, 5G', imagen: 'iphone13.jpg' },
  { id: 3, modelo: 'Huawei P40', marca: 'Huawei', año: 2020, caracteristicas: '256GB, 8GB RAM, 5G', imagen: 'huawei_p40.jpg' }
];

// Función para generar 10 modelos vacíos
const generateEmptyModels = (brand) => {
  return Array.from({ length: 10 }, (_, index) => ({
    id: dispositivos.length + index + 1,
    modelo: `Modelo Vacío ${index + 1}`,
    marca: brand,
    año: 2024,
    caracteristicas: 'Por definir',
    imagen: 'default_image.png'
  }));
};

// Función para generar 10 modelos de Apple
const generateAppleModels = () => {
  return Array.from({ length: 10 }, (_, index) => ({
    id: dispositivos.length + index + 1,
    modelo: `iPhone ${14 - index}`,
    marca: 'Apple',
    año: 2024 - index,
    caracteristicas: `Características del iPhone ${14 - index}`,
    imagen: `iphone_${14 - index}.jpg`
  }));
};

// Endpoint para obtener los dispositivos de una marca específica
router.get('/', (req, res) => {
  const { marca } = req.query;
  if (marca === 'Samsung' || marca === 'Huawei') {
    res.json(generateEmptyModels(marca));
  } else if (marca === 'Apple') {
    res.json(generateAppleModels());
  } else {
    res.json(dispositivos);
  }
});

// Endpoint para agregar un dispositivo
router.post('/', (req, res) => {
  const { modelo, marca, año, caracteristicas, imagen } = req.body;

  if (!modelo || !marca || !año || !caracteristicas) {
    return res.status(400).json({ error: 'Faltan datos necesarios para agregar el dispositivo.' });
  }

  const newDispositivo = {
    id: dispositivos.length + 1,
    modelo,
    marca,
    año,
    caracteristicas,
    imagen: imagen || 'default_image.png' // Si no se pasa una imagen, se asigna una por defecto
  };

  dispositivos.push(newDispositivo);
  res.status(201).json(newDispositivo); // Devuelve el dispositivo agregado con el código de estado 201
});

module.exports = router;

