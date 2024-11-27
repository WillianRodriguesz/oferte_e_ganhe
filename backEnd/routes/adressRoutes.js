const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/adressController');
const authenticateToken = require('../middlewares/authMiddleware');
const verificarPermissao = require('../middlewares/checkAccessMiddleware');

// Rota para obter todos os endereços
router.get('/endereco', authenticateToken, verificarPermissao, enderecoController.obterTodosEnderecos);

// Rota para obter um endereço específico por ID
router.get('/endereco/:id', authenticateToken, verificarPermissao, enderecoController.obterEnderecoId);

// Rota para cadastrar um novo endereço
router.post('/endereco', authenticateToken, verificarPermissao, enderecoController.criarEndereco);

// Rota para atualizar um endereço
router.put('/endereco/:id', authenticateToken, verificarPermissao, enderecoController.atualizarEnderecoId);

// Rota para excluir um endereço
router.delete('/endereco/:id', authenticateToken, verificarPermissao, enderecoController.excluirEnderecoId);

module.exports = router;
