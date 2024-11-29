const express = require('express');
const path = require('path');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Rota para autenticação
router.post('/login', loginController.autenticarUsuario);
router.post('/logout', loginController.logoutUsuario);

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/src/pages/login/login.html'));
}); 


module.exports = router;
