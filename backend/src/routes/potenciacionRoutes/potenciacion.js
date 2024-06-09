const express = require('express');
const router = express.Router();

//Acá pido de los controladores lo que necesito.
const { generarPotenciacion, generarRadicacion } = require('../../controllers/potenciacionControllers');

//Acá al get le devuelvo lo que devuelve la función.
router.get('/radicacion', generarRadicacion);
router.get('/potenciacion', generarPotenciacion);

module.exports = router;
