const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const authenticateToken = require('../middlewares/authMiddleware');
const  verificarPermissao = require('../middlewares/checkAccessMiddleware');

// Rota para servir a página de estoque
router.get('/estoques/view', authenticateToken, verificarPermissao, stockController.exibirPaginaEstoque);

// Rota para cadastrar um novo item no estoque
router.post('/estoques', authenticateToken, verificarPermissao, stockController.criarEstoque);

// Rota para obter todos os itens do estoque
router.get('/estoques', authenticateToken, verificarPermissao, stockController.listarItensEstoque);

// Rota para obter um item de estoque por ID
router.get('/estoques/:id', authenticateToken, verificarPermissao, stockController.obterItemEstoque);

// Rota para atualizar um item de estoque pelo ID
router.put('/estoques/:id', authenticateToken, verificarPermissao, stockController.atualizarItemEstoque);

router.put('/estoques/retirarTalao/:id', authenticateToken, verificarPermissao, stockController.atualizarQtdEstoque);

// Rota para excluir um item de estoque pelo ID
router.delete('/estoques/:id', authenticateToken, verificarPermissao, stockController.excluirItemEstoque);

module.exports = router;
