const express = require('express');
const router = express.Router();
const perfilModuloController = require('../controllers/assignProfileModuleController');
const authenticateToken = require('../middlewares/authMiddleware');

// Rota para obter todas as associações de perfis a módulos
router.get('/perfilmodulos', authenticateToken, perfilModuloController.obterTodosPerfisModulos);

// Rota para obter uma associação de perfil a módulo por ID
router.get('/perfilmodulos/:id', authenticateToken, perfilModuloController.obterPerfilModuloPorId);

// Rota para criar uma nova associação de perfil a módulo
router.post('/perfilmodulos', authenticateToken, perfilModuloController.criarAssociacaoPerfilModulo);

// Rota para excluir uma associação de perfil a módulo
router.delete('/perfilmodulos/:id', authenticateToken, perfilModuloController.excluirAssociacaoPerfilModulo);

module.exports = router;
