//Configuración del server
const { server } = require('./app');

const PORT = 3001;

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
});
