const express = require('express');
const router = express.Router();

// Arreglo lleno con 10 dispositivos de iPhone
let iphoneModels = [
  
  { id: 4, modelo: 'iPhone 14', marca: 'Apple', año: 2024, caracteristicas: '256GB, 6GB RAM, 5G', imagen: 'Iphone 14.png', funcionalidad: 'Ideal para fotografía profesional y alto rendimiento.' },
  { id: 5, modelo: 'iPhone 13 Pro', marca: 'Apple', año: 2023, caracteristicas: '512GB, 8GB RAM, 5G', imagen: 'ipid2.png', funcionalidad: 'Diseñado para multitareas y gaming extremo.' },
  { id: 6, modelo: 'iPhone 13', marca: 'Apple', año: 2022, caracteristicas: '128GB, 6GB RAM, 5G', imagen: 'ipid3.png', funcionalidad: 'Perfecto para uso diario con excelente duración de batería.' },
  { id: 7, modelo: 'iPhone 12 Pro Max', marca: 'Apple', año: 2021, caracteristicas: '256GB, 6GB RAM, 5G', imagen: 'ipid4.png', funcionalidad: 'Pantalla grande ideal para edición de videos.' },
  { id: 8, modelo: 'iPhone 12', marca: 'Apple', año: 2021, caracteristicas: '128GB, 4GB RAM, 5G', imagen: 'ipid5.png', funcionalidad: 'Diseño compacto con tecnología 5G.' },
  { id: 9, modelo: 'iPhone 11 Pro', marca: 'Apple', año: 2020, caracteristicas: '256GB, 4GB RAM, 4G', imagen: 'ipid6.png', funcionalidad: 'Cámara profesional y gran potencia.' },
  { id: 10, modelo: 'iPhone 11', marca: 'Apple', año: 2020, caracteristicas: '128GB, 4GB RAM, 4G', imagen: 'ipid7.png', funcionalidad: 'Buen rendimiento a precio accesible.' },
  { id: 11, modelo: 'iPhone XR', marca: 'Apple', año: 2019, caracteristicas: '64GB, 3GB RAM, 4G', imagen: 'ipid8.png', funcionalidad: 'Colores vivos y diseño único.' },
  { id: 12, modelo: 'iPhone X', marca: 'Apple', año: 2018, caracteristicas: '256GB, 3GB RAM, 4G', imagen: 'ipid9.png', funcionalidad: 'Primer iPhone con Face ID.' },
  { id: 13, modelo: 'iPhone 8 Plus', marca: 'Apple', año: 2017, caracteristicas: '64GB, 3GB RAM, 4G', imagen: 'ipid10.png', funcionalidad: 'Excelente para fotografía clásica.' }
];


// Endpoint para obtener todos los dispositivos de iPhone
router.get('/', (req, res) => {
  res.json(iphoneModels); // Devolvemos solo los dispositivos de iPhone
});

// Endpoint para agregar un dispositivo de iPhone
router.post('/', (req, res) => {
  const { modelo, marca, año, caracteristicas, imagen } = req.body;

  if (!modelo || !marca || !año || !caracteristicas) {
    return res.status(400).json({ error: 'Faltan datos necesarios para agregar el dispositivo.' });
  }

  const newDispositivo = {
    id: iphoneModels.length + 4, // Asegúrate de continuar con el id después de los existentes
    modelo,
    marca,
    año,
    caracteristicas,
    imagen: imagen || 'default_image.png' // Imagen por defecto si no se proporciona una
  };

  iphoneModels.push(newDispositivo); // Agregar el nuevo dispositivo de iPhone
  res.status(201).json(newDispositivo); // Devolver el dispositivo agregado con el código de estado 201
});

// Endpoint para eliminar un dispositivo de iPhone por su ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  // Buscar el dispositivo por ID
  const index = iphoneModels.findIndex((dispositivo) => dispositivo.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Dispositivo no encontrado' }); // Si no lo encontramos, devolvemos error
  }

  // Eliminar el dispositivo
  iphoneModels.splice(index, 1); // Eliminamos el dispositivo por su índice

  res.status(200).json({ message: 'Dispositivo eliminado correctamente' }); // Confirmamos la eliminación
});

module.exports = router; 
