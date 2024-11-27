const express = require('express');
const router = express.Router();
const sendingController = require('../controllers/sendingController');
const authenticateToken = require('../middlewares/authMiddleware');
const  verificarPermissao = require('../middlewares/checkAccessMiddleware')

// Rota para cadastrar um novo registro
router.post('/envioTalao', authenticateToken, verificarPermissao, sendingController.criarRegistroEnvio);

// Rota para obter todos os registros
router.get('/envioTalao', authenticateToken, verificarPermissao, sendingController.listarRegistrosEnvio);

// Rota para obter um registro por ID
router.get('/envioTalao/:id', authenticateToken, verificarPermissao, sendingController.obterRegistroEnvio);

// Rota para atualizar um registro pelo ID
router.put('/envioTalao/:id', authenticateToken, verificarPermissao, sendingController.atualizarRegistroEnvio);

// Rota para excluir um registro pelo ID
router.delete('/envioTalao/:id', authenticateToken, verificarPermissao, sendingController.excluirRegistroEnvio);

module.exports = router;
