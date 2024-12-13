const express = require('express');
const path = require('path');
const router = express.Router();
const loginController = require('../controllers/loginController');
const multipleLoginsMiddleware = require('../middlewares/multipleLoginsMiddleware');

// Rota para autenticação
router.post('/login', loginController.autenticarUsuario);

router.post('/logout', loginController.logoutUsuario);

//router.get('/login', multipleLoginsMiddleware, (req, res) => {
    //res.sendFile(path.join(__dirname, '../../frontEnd/src/pages/login/login.html'));
//});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/src/pages/login/login.html'));
});

router.get('/login/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/src/pages/login/access-request.html'));
});

router.get('/login/esqueci-minha-senha', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/src/pages/login/password-reset-request.html'));
});

router.get('/login/redefinir-senha', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/src/pages/login/change-password.html'));
});

// Rota para processar solicitação de redefinição de senha
router.post('/login/enviar-link-redefinicao', loginController.enviarEmailRedefinicao);

// Rota para redefinir senha
router.post('/login/redefinir-senha', loginController.redefinirSenha);


module.exports = router;
