const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');

// Rota para validar o token e confirmar autenticação
router.get('/validaToken', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Autenticação válida' });
});

module.exports = router;
