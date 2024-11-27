const express = require('express');
const router = express.Router();
const receivingController = require('../controllers/receivingController');
const authenticateToken = require('../middlewares/authMiddleware');
const  verificarPermissao = require('../middlewares/checkAccessMiddleware');

// Rota para cadastrar um novo log de recebimento
router.post('/recebimentoTalao', authenticateToken, verificarPermissao, receivingController.criarLogRecebimento);

// Rota para obter todos os logs de recebimento
router.get('/recebimentoTalao', authenticateToken, verificarPermissao, receivingController.listarLogsRecebimento);

// Rota para obter um log de recebimento por ID
router.get('/recebimentoTalao/:id', authenticateToken, verificarPermissao, receivingController.obterLogRecebimento);

// Rota para atualizar um log de recebimento pelo ID
router.put('/recebimentoTalao/:id', authenticateToken, verificarPermissao, receivingController.atualizarLogRecebimentoPorId);

// Rota para excluir um log de recebimento pelo ID
router.delete('/recebimentoTalao/:id', authenticateToken, verificarPermissao, receivingController.excluirLogRecebimentoPorId);

module.exports = router;
