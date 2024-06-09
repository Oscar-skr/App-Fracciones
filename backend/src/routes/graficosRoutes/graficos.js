//Manejo las rutas.

const express = require('express');
const router = express.Router();

//Acá pido de los controladores lo que necesito.
const { generarFraccion } = require('../../controllers/graficosControllers.js');
const { generarEquivalentes } = require('../../controllers/equivalentesControllers.js');


//Acá al get le devuelvo lo que devuelve la función.
router.get('/generarFraccion', generarFraccion);
router.get('/equivalentes', generarEquivalentes);

module.exports = router;