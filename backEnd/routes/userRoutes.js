const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

// Rota para redirecionar novo usuário para view
router.get('/usuarios/view', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/usuarios.html'));
}); 

// Rota GET para buscar todos os usuários
router.get('/usuarios', authenticateToken, userController.listarUsuarios);

// Rota GET para buscar um usuário pelo ID
router.get('/usuarios/:id', authenticateToken, userController.buscarUsuarioId);

// Rota POST para cadastrar um novo usuário
router.post('/usuarios', authenticateToken, userController.cadastrarUsuario);

// Rota PUT para atualizar um usuário pelo ID
router.put('/usuarios/:id', authenticateToken, userController.atualizarUsuarioInfo);

// Rota DELETE para excluir um usuário pelo ID
router.delete('/usuarios/:id', authenticateToken, userController.excluirUsuarioInfo);

module.exports = router;
