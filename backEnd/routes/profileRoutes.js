const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authenticateToken = require('../middlewares/authMiddleware');

// Rota para cadastrar um novo perfil
router.post('/perfis', authenticateToken, profileController.criarPerfil);

// Rota para obter todos os perfis
router.get('/perfis', authenticateToken, profileController.listarPerfis);

// Rota para obter um perfil por ID
router.get('/perfis/:id', authenticateToken, profileController.obterPerfil);

// Rota para atualizar um perfil pelo ID
router.put('/perfis/:id', authenticateToken, profileController.atualizarPerfilPorId);

// Rota para excluir um perfil pelo ID
router.delete('/perfis/:id', authenticateToken, profileController.excluirPerfilPorId);

// Rota para servir o arquivo HTML
router.get('/perfis/view', authenticateToken, profileController.exibirPaginaPerfis);

module.exports = router;
