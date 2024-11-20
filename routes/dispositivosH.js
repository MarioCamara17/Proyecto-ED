const express = require('express');
const router = express.Router();

// Arreglo lleno con 10 dispositivos Huawei
let huaweiModels = [
  { id: 1, modelo: 'Mate 60 Pro', marca: 'Huawei', año: 2024, caracteristicas: '512GB, 12GB RAM, 5G', imagen: 'huawid1.png', funcionalidad: 'Es un teléfono insignia con características de alta gama y tecnología innovadora' },
  { id: 2, modelo: 'P50 Pro', marca: 'Huawei', año: 2023, caracteristicas: '256GB, 8GB RAM, 5G', imagen: 'huawid2.png', funcionalidad: 'Es un smartphone premium diseñado para ofrecer un rendimiento sobresaliente, especialmente en fotografía' },
  { id: 3, modelo: 'Nova 10', marca: 'Huawei', año: 2022, caracteristicas: '128GB, 8GB RAM, 5G', imagen: 'huawid3.png', funcionalidad: 'Es un teléfono de gama media con un diseño atractivo y especificaciones equilibradas' },
  { id: 4, modelo: 'Mate 40 Pro', marca: 'Huawei', año: 2021, caracteristicas: '256GB, 8GB RAM, 5G', imagen: 'huawid4.png', funcionalidad: 'Es  lanzado en 2020, diseñado para ofrecer un rendimiento robusto y características destacadas' },
  { id: 5, modelo: 'P40 Lite', marca: 'Huawei', año: 2020, caracteristicas: '128GB, 6GB RAM, 4G', imagen: 'huawid5.png', funcionalidad: 'Se destaca por su buena relación calidad-precio, especialmente por su cámara principal y excelente autonomía, aunque se ve limitado por la ausencia de los servicios de Google y una pantalla LCD que no es OLED'},
  { id: 6, modelo: 'Mate 30 Pro', marca: 'Huawei', año: 2019, caracteristicas: '256GB, 8GB RAM, 5G', imagen: 'huwid6.webp', funcionalidad: 'Es un dispositivo emblemático que destaca por su diseño innovador y su potente hardware'},
  { id: 7, modelo: 'P30 Pro', marca: 'Huawei', año: 2019, caracteristicas: '128GB, 6GB RAM, 4G', imagen: 'huawid7.png', funcionalidad: 'Es un teléfono inteligente emblemático conocido por su impresionante sistema de cámara y su diseño premium' },
  { id: 8, modelo: 'Mate 20', marca: 'Huawei', año: 2018, caracteristicas: '128GB, 6GB RAM, 4G', imagen: 'huawid8.jpg', funcionalidad:'Ofrece una sólida combinación de rendimiento, capacidades de cámara y duración de la batería' },
  { id: 9, modelo: 'P20', marca: 'Huawei', año: 2017, caracteristicas: '128GB, 4GB RAM, 4G', imagen: 'huawid9.jpg', funcionalidad:'Es un smartphone insignia de gama media que combina un gran rendimiento con un diseño elegante' },
  { id: 10, modelo: 'Mate 10 Pro', marca: 'Huawei', año: 2016, caracteristicas: '64GB, 4GB RAM, 4G', imagen: 'huawid10.jpg' , funcionalidad: 'Es conocido por su diseño premium, potente rendimiento y enfoque en la inteligencia artificial (IA)'}
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
