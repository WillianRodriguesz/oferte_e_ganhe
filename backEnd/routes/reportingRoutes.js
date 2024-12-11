const express = require('express');
const path = require('path');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const { exportarRelatorioUsuarios } = require('../controllers/reportingController');


// Rota para gerar e exportar o CSV
router.get('/relatorio/usuarios', authenticateToken, exportarRelatorioUsuarios);

module.exports = router;