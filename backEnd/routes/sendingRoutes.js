const express = require('express');
const router = express.Router();
const sendingController = require('../controllers/sendingController');
const authenticateToken = require('../middlewares/authMiddleware');

// Rota para cadastrar um novo registro
router.post('/envioTalao', authenticateToken, sendingController.criarRegistroEnvio);

// Rota para obter todos os registros
router.get('/envioTalao', authenticateToken, sendingController.listarRegistrosEnvio);

// Rota para obter um registro por ID
router.get('/envioTalao/:id', authenticateToken, sendingController.obterRegistroEnvio);

// Rota para atualizar um registro pelo ID
router.put('/envioTalao/:id', authenticateToken, sendingController.atualizarRegistroEnvio);

// Rota para excluir um registro pelo ID
router.delete('/envioTalao/:id', authenticateToken, sendingController.excluirRegistroEnvio);

module.exports = router;
