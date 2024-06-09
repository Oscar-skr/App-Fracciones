const express = require('express');
const cors = require('cors'); //Cors permite recibir solicitudes del front.
const server = express();
const graficos = require('./routes/graficosRoutes/graficos');
const fracciones = require('./routes/fraccionesRoutes/fracciones');
const generarOperaciones = require('./routes/multiplicacionesRoutes/multiplicaciones');
const potenciacion = require('./routes/potenciacionRoutes/potenciacion');

//Middlewares
//Este convierte los datos recibidos a objetos. Va primero que todos los demás.
server.use(express.json());

server.use(cors()); //Acá implemento el CORS.
server.use('/graficos', graficos);
server.use('/fracciones', fracciones);
server.use('/operaciones', generarOperaciones);
server.use('/potenciacion', potenciacion);

module.exports = {
    server
};
