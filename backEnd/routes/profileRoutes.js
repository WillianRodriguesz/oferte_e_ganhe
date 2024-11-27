const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authenticateToken = require('../middlewares/authMiddleware');
const  verificarPermissao = require('../middlewares/checkAccessMiddleware');


// Rota para cadastrar um novo perfil
router.post('/perfis', authenticateToken, verificarPermissao, profileController.criarPerfil);

// Rota para obter todos os perfis
router.get('/perfis', authenticateToken, verificarPermissao, profileController.listarPerfis);

// Rota para obter um perfil por ID
router.get('/perfis/:id', authenticateToken, verificarPermissao, profileController.obterPerfil);

// Rota para atualizar um perfil pelo ID
router.put('/perfis/:id', authenticateToken, verificarPermissao, profileController.atualizarPerfilPorId);

// Rota para excluir um perfil pelo ID
router.delete('/perfis/:id', authenticateToken, verificarPermissao, profileController.excluirPerfilPorId);

// Rota para servir o arquivo HTML
router.get('/perfis/view', authenticateToken, verificarPermissao, profileController.exibirPaginaPerfis);

module.exports = router;
