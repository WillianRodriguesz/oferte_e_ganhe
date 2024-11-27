const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const authenticateToken = require('../middlewares/authMiddleware');
const  verificarPermissao = require('../middlewares/checkAccessMiddleware');


// Rota para servir a página de lojas
router.get('/lojas/view', authenticateToken, verificarPermissao, storeController.exibirPaginaLojas);

// Rota para obter todas as lojas
router.get('/lojas', authenticateToken, verificarPermissao, storeController.listarLojas);

// Rota para obter uma loja por ID
router.get('/lojas/:id', authenticateToken, verificarPermissao, storeController.obterLoja);

// Rota para cadastrar uma nova loja
router.post('/lojas', authenticateToken, verificarPermissao, storeController.criarLoja);

// Rota para atualizar uma loja pelo ID
router.put('/lojas/:id', authenticateToken, verificarPermissao, storeController.atualizarLojaInfo);

// Rota para excluir uma loja pelo ID
router.delete('/lojas/:id', authenticateToken, verificarPermissao, storeController.excluirLojaInfo);

module.exports = router;
