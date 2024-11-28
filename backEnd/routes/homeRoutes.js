const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');

// Rota para redirecionar para a página home (pode ser qualquer outra página)
router.get('/home', authenticateToken, (req, res) => {
    // Se o token for válido, redireciona para a página desejada
    res.redirect('/pages/login/home.html');
});

module.exports = router;