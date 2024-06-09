//Manejo las rutas.

const express = require('express');
const router = express.Router();

//Acá pido de los controladores lo que necesito.
const { generarOperaciones } = require('../../controllers/multiplicacionesControllers');


//Acá al get le devuelvo lo que devuelve la función.
router.get('/', generarOperaciones);


module.exports = router;