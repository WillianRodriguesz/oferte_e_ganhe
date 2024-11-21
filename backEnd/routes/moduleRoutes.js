const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const authenticateToken = require('../middlewares/authMiddleware');

// Rota para obter todos os módulos
router.get('/modulos', authenticateToken, moduleController.obterTodosModulos);

// Rota para obter um módulo específico por ID
router.get('/modulos/:id', authenticateToken, moduleController.obterModuloPorId);

// Rota para cadastrar um novo módulo
router.post('/modulos', authenticateToken, moduleController.cadastrarModulo);

// Rota para atualizar um módulo
router.put('/modulos/:id', authenticateToken, moduleController.atualizarModuloPorId);

// Rota para excluir um módulo
router.delete('/modulos/:id', authenticateToken, moduleController.excluirModuloPorId);

module.exports = router;
