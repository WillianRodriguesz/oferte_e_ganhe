const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const authenticateToken = require('../middlewares/authMiddleware');
const  verificarPermissao = require('../middlewares/checkAccessMiddleware');


// Rota para obter todos os módulos
router.get('/modulos', authenticateToken, verificarPermissao, moduleController.obterTodosModulos);

// Rota para obter um módulo específico por ID
router.get('/modulos/:id', authenticateToken, verificarPermissao, moduleController.obterModuloPorId);

// Rota para cadastrar um novo módulo
router.post('/modulos', authenticateToken, verificarPermissao, moduleController.cadastrarModulo);

// Rota para atualizar um módulo
router.put('/modulos/:id', authenticateToken, verificarPermissao, moduleController.atualizarModuloPorId);

// Rota para excluir um módulo
router.delete('/modulos/:id', authenticateToken, verificarPermissao, moduleController.excluirModuloPorId);

module.exports = router;
