// 1. Importamos Express
const express = require('express');

// 2. Inicializamos la aplicación
const app = express();

// 3. Definimos el puerto (usaremos el 5000 para el backend)
const PORT = 5000;

// 4. Ruta de prueba (Hola Mundo)
// req = request (lo que viene del cliente)
// res = response (lo que enviamos nosotros)
app.get('/', (req, res) => {
  res.send('¡Hola! El servidor de Folio está vivo 🚀');
});

// 5. Arrancamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
