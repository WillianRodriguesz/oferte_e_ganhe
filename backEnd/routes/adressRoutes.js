const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/adressController');
const authenticateToken = require('../middlewares/authMiddleware');

// Rota para obter todos os endereços
router.get('/endereco', authenticateToken, enderecoController.obterTodosEnderecos);

// Rota para obter um endereço específico por ID
router.get('/endereco/:id', authenticateToken, enderecoController.obterEnderecoId);

// Rota para cadastrar um novo endereço
router.post('/endereco', authenticateToken, enderecoController.criarEndereco);

// Rota para atualizar um endereço
router.put('/endereco/:id', authenticateToken, enderecoController.atualizarEnderecoId);

// Rota para excluir um endereço
router.delete('/endereco/:id', authenticateToken, enderecoController.excluirEnderecoId);

module.exports = router;
