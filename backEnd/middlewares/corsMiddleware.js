const cors = require('cors');

// Configurações do CORS
const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Endereço do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  credentials: true, // Permitir envio de cookies/autenticação
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
