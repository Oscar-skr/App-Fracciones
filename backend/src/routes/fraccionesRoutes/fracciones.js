//Manejo las rutas.

const express = require('express');
const router = express.Router();

//Acá pido de los controladores lo que necesito.
const { generarFracciones, generarFraccionesDD} = require('../../controllers/fraccionesControllers.js');



//Acá al get le devuelvo lo que devuelve la función.
//Elijo el nombre de la ruta y la función que devuelve que la tengo que importar.
router.get('/', generarFracciones);
router.get('/fdd', generarFraccionesDD );



module.exports = router;