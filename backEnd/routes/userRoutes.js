const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');
const  verificarPermissao = require('../middlewares/checkAccessMiddleware');

// Rota para redirecionar novo usuário para view
router.get('/usuarios/view', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/usuarios.html'));
}); 

// Rota GET para buscar todos os usuários
router.get('/usuarios', authenticateToken, verificarPermissao, userController.listarUsuarios);

// Rota GET para buscar um usuário pelo ID
router.get('/usuarios/:id', authenticateToken, verificarPermissao, userController.buscarUsuarioId);

// Rota POST para cadastrar um novo usuário
router.post('/usuarios', userController.cadastrarUsuario);

// Rota PUT para atualizar um usuário pelo ID
router.put('/usuarios/:id', authenticateToken, verificarPermissao, userController.atualizarUsuarioInfo);

// Rota DELETE para excluir um usuário pelo ID
router.delete('/usuarios/:id', authenticateToken, verificarPermissao, userController.excluirUsuarioInfo);

module.exports = router;
