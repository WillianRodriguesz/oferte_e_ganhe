const express = require('express');
const router = express.Router();
const talaoController = require('../controllers/talaoController');
const authenticateToken = require('../middlewares/authMiddleware');
const  verificarPermissao = require('../middlewares/checkAccessMiddleware');


// Rota para cadastrar um novo talão
router.post('/talao', authenticateToken, verificarPermissao, talaoController.cadastrarTalao);

// Rota para obter todos os talões
router.get('/talao', authenticateToken, verificarPermissao, talaoController.listarTaloes);

// Rota para obter um talão por ID
router.get('/talao/:id', authenticateToken, verificarPermissao, talaoController.obterTalao);

// Rota para obter um talão pelo número de remessa
router.get('/talao/numeroRemessa/:numero_remessa', authenticateToken, verificarPermissao, talaoController.obterTalaoPorRemessa);

// Rota para atualizar um talão pelo ID
router.put('/talao/:id', authenticateToken, verificarPermissao, talaoController.atualizarTalaoInfo);

// Rota para atualizar apenas o status de um talão pelo ID
router.put('/talao/status/:id', authenticateToken, verificarPermissao, talaoController.atualizarStatus);

// Rota para excluir um talão pelo ID
router.delete('/talao/:id', authenticateToken, verificarPermissao, talaoController.excluirTalaoInfo);

// Rota para editar data_recebimento e status de um talão pelo ID
router.put('/talao/editarRecebimento/:id', authenticateToken, verificarPermissao, talaoController.editarRecebimentoTalao);

module.exports = router;
