const express = require('express');
const router = express.Router();
const perfilModuloController = require('../controllers/assignProfileModuleController');
const authenticateToken = require('../middlewares/authMiddleware');
const  verificarPermissao = require('../middlewares/checkAccessMiddleware');


// Rota para obter todas as associações de perfis a módulos
router.get('/perfilmodulos', authenticateToken, verificarPermissao, perfilModuloController.obterTodosPerfisModulos);

// Rota para obter uma associação de perfil a módulo por ID
router.get('/perfilmodulos/:id', authenticateToken, verificarPermissao, perfilModuloController.obterPerfilModuloPorId);

// Rota para criar uma nova associação de perfil a módulo
router.post('/perfilmodulos', authenticateToken, verificarPermissao, perfilModuloController.criarAssociacaoPerfilModulo);

// Rota para excluir uma associação de perfil a módulo
router.delete('/perfilmodulos/:id', authenticateToken, verificarPermissao, perfilModuloController.excluirAssociacaoPerfilModulo);

router.get('/perfilmodulos/associados/:id', authenticateToken, verificarPermissao, perfilModuloController.buscarModulosPorPerfil);

module.exports = router;
