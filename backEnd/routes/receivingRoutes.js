const express = require('express');
const router = express.Router();
const receivingController = require('../controllers/receivingController');
const authenticateToken = require('../middlewares/authMiddleware');

// Rota para cadastrar um novo log de recebimento
router.post('/recebimentoTalao', authenticateToken, receivingController.criarLogRecebimento);

// Rota para obter todos os logs de recebimento
router.get('/recebimentoTalao', authenticateToken, receivingController.listarLogsRecebimento);

// Rota para obter um log de recebimento por ID
router.get('/recebimentoTalao/:id', authenticateToken, receivingController.obterLogRecebimento);

// Rota para atualizar um log de recebimento pelo ID
router.put('/recebimentoTalao/:id', authenticateToken, receivingController.atualizarLogRecebimentoPorId);

// Rota para excluir um log de recebimento pelo ID
router.delete('/recebimentoTalao/:id', authenticateToken, receivingController.excluirLogRecebimentoPorId);

module.exports = router;
