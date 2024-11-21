const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const authenticateToken = require('../middlewares/authMiddleware');

// Rota para servir a página de estoque
router.get('/estoques/view', authenticateToken, stockController.exibirPaginaEstoque);

// Rota para cadastrar um novo item no estoque
router.post('/estoques', authenticateToken, stockController.criarItemEstoque);

// Rota para obter todos os itens do estoque
router.get('/estoques', authenticateToken, stockController.listarItensEstoque);

// Rota para obter um item de estoque por ID
router.get('/estoques/:id', authenticateToken, stockController.obterItemEstoque);

// Rota para atualizar um item de estoque pelo ID
router.put('/estoques/:id', authenticateToken, stockController.atualizarItemEstoque);

// Rota para excluir um item de estoque pelo ID
router.delete('/estoques/:id', authenticateToken, stockController.excluirItemEstoque);

module.exports = router;
