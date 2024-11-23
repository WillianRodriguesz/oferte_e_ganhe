const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Rota para autenticação
router.post('/login', loginController.autenticarUsuario);
router.post('/logout', loginController.logoutUsuario);

module.exports = router;
