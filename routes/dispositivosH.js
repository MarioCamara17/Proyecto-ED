const express = require('express');
const router = express.Router();

// Arreglo lleno con 10 dispositivos Huawei
let huaweiModels = [
  { id: 1, modelo: 'Mate 60 Pro', marca: 'Huawei', año: 2024, caracteristicas: '512GB, 12GB RAM, 5G', imagen: 'huawid1.png' },
  { id: 2, modelo: 'P50 Pro', marca: 'Huawei', año: 2023, caracteristicas: '256GB, 8GB RAM, 5G', imagen: 'huawid2.png' },
  { id: 3, modelo: 'Nova 10', marca: 'Huawei', año: 2022, caracteristicas: '128GB, 8GB RAM, 5G', imagen: 'huawid3.png' },
  { id: 4, modelo: 'Mate 40 Pro', marca: 'Huawei', año: 2021, caracteristicas: '256GB, 8GB RAM, 5G', imagen: 'huawid4.png' },
  { id: 5, modelo: 'P40 Lite', marca: 'Huawei', año: 2020, caracteristicas: '128GB, 6GB RAM, 4G', imagen: 'huawid5.png' },
  { id: 6, modelo: 'Mate 30 Pro', marca: 'Huawei', año: 2019, caracteristicas: '256GB, 8GB RAM, 5G', imagen: 'huwid6.webp' },
  { id: 7, modelo: 'P30 Pro', marca: 'Huawei', año: 2019, caracteristicas: '128GB, 6GB RAM, 4G', imagen: 'huawid7.png' },
  { id: 8, modelo: 'Mate 20', marca: 'Huawei', año: 2018, caracteristicas: '128GB, 6GB RAM, 4G', imagen: 'huawid8.jpg' },
  { id: 9, modelo: 'P20', marca: 'Huawei', año: 2017, caracteristicas: '128GB, 4GB RAM, 4G', imagen: 'huawid9.jpg' },
  { id: 10, modelo: 'Mate 10 Pro', marca: 'Huawei', año: 2016, caracteristicas: '64GB, 4GB RAM, 4G', imagen: 'huawid10.jpg' }
];

// Endpoint para obtener todos los dispositivos Huawei
router.get('/', (req, res) => {
  res.json(huaweiModels); // Devolvemos solo los dispositivos Huawei
});

// Endpoint para agregar un dispositivo Huawei
router.post('/', (req, res) => {
  const { modelo, marca, año, caracteristicas, imagen } = req.body;

  if (!modelo || !marca || !año || !caracteristicas) {
    return res.status(400).json({ error: 'Faltan datos necesarios para agregar el dispositivo.' });
  }

  const newDispositivo = {
    id: huaweiModels.length + 1, // Asegúrate de continuar con el id después de los existentes
    modelo,
    marca,
    año,
    caracteristicas,
    imagen: imagen || 'default_image.png' // Imagen por defecto si no se proporciona una
  };

  huaweiModels.push(newDispositivo); // Agregar el nuevo dispositivo Huawei
  res.status(201).json(newDispositivo); // Devolver el dispositivo agregado con el código de estado 201
});

// Endpoint para eliminar un dispositivo Huawei por su ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  // Buscar el dispositivo por ID
  const index = huaweiModels.findIndex((dispositivo) => dispositivo.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Dispositivo no encontrado' }); // Si no lo encontramos, devolvemos error
  }

  // Eliminar el dispositivo
  huaweiModels.splice(index, 1); // Eliminamos el dispositivo por su índice

  res.status(200).json({ message: 'Dispositivo eliminado correctamente' }); // Confirmamos la eliminación
});

module.exports = router;
