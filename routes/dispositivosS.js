const express = require('express');
const router = express.Router();

// Arreglo lleno con 10 dispositivos Samsung
let samsungModels = [
  { id: 4, modelo: 'Galaxy S24 Ultra', marca: 'Samsung', año: 2024, caracteristicas: '512GB, 12GB RAM, 5G', imagen: 'Galaxy S24 ultra.png', funcionalidad: 'Ideal para creadores de contenido y productividad avanzada.' },
  { id: 5, modelo: 'Galaxy S22', marca: 'Samsung', año: 2023, caracteristicas: '256GB, 8GB RAM, 5G', imagen: 'sid2.webp', funcionalidad: 'Diseñado para gaming y multitarea eficiente.' },
  { id: 6, modelo: 'Galaxy S21 Ultra', marca: 'Samsung', año: 2022, caracteristicas: '128GB, 8GB RAM, 5G', imagen: 'sid3.png', funcionalidad: 'Perfecto para uso diario con un diseño elegante.' },
  { id: 7, modelo: 'Galaxy Note 20 Ultra', marca: 'Samsung', año: 2021, caracteristicas: '512GB, 12GB RAM, 5G', imagen: 'sid4.png', funcionalidad: 'Pantalla grande y lápiz S Pen para productividad máxima.' },
  { id: 8, modelo: 'Galaxy A72', marca: 'Samsung', año: 2021, caracteristicas: '128GB, 6GB RAM, 4G', imagen: 'sid5.png', funcionalidad: 'Gran batería y rendimiento ideal para entretenimiento.' },
  { id: 9, modelo: 'Galaxy S20 FE', marca: 'Samsung', año: 2020, caracteristicas: '128GB, 6GB RAM, 5G', imagen: 'sid6.png', funcionalidad: 'Balance perfecto entre precio y rendimiento.' },
  { id: 10, modelo: 'Galaxy A52', marca: 'Samsung', año: 2020, caracteristicas: '128GB, 4GB RAM, 4G', imagen: 'sid7.webp', funcionalidad: 'Compacto y accesible con excelentes cámaras.' },
  { id: 11, modelo: 'Galaxy A50', marca: 'Samsung', año: 2019, caracteristicas: '64GB, 4GB RAM, 4G', imagen: 'sid8.webp', funcionalidad: 'Ideal para usuarios que buscan buen diseño y precio.' },
  { id: 12, modelo: 'Galaxy S10', marca: 'Samsung', año: 2018, caracteristicas: '256GB, 8GB RAM, 4G', imagen: 'sid9.jpg', funcionalidad: 'Innovador en su tiempo con una gran pantalla.' },
  { id: 13, modelo: 'Galaxy Note 9', marca: 'Samsung', año: 2017, caracteristicas: '128GB, 6GB RAM, 4G', imagen: 'note9.jpg', funcionalidad: 'Confiable y con excelente capacidad para productividad.' }
];

// Endpoint para obtener todos los dispositivos Samsung
router.get('/', (req, res) => {
  res.json(samsungModels); // Devolvemos solo los dispositivos Samsung
});

// Endpoint para agregar un dispositivo Samsung
router.post('/', (req, res) => {
  const { modelo, marca, año, caracteristicas, imagen } = req.body;

  // Validación básica de datos
  if (!modelo || !marca || !año || !caracteristicas) {
    return res.status(400).json({ error: 'Faltan datos necesarios para agregar el dispositivo.' });
  }

  if (isNaN(año)) {
    return res.status(400).json({ error: 'El año debe ser un número.' });
  }

  const newDispositivo = {
    id: samsungModels.length + 4, //  continuar con el id después de los existentes
    modelo,
    marca,
    año,
    caracteristicas,
    imagen: imagen || 'default_image.png' // Imagen por defecto si no se proporciona una
  };

  samsungModels.push(newDispositivo); // Agregar el nuevo dispositivo Samsung
  res.status(201).json(newDispositivo); // Devolver el dispositivo agregado con el código de estado 201
});

// Endpoint para eliminar un dispositivo Samsung por su ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // Buscar el dispositivo por ID
  const index = samsungModels.findIndex((dispositivo) => dispositivo.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Dispositivo no encontrado' }); // Si no lo encontramos, devolvemos error
  }

  // Eliminar el dispositivo
  samsungModels.splice(index, 1); // Eliminamos el dispositivo por su índice

  res.status(200).json({ message: 'Dispositivo eliminado correctamente' }); // Confirmamos la eliminación
});

module.exports = router;
