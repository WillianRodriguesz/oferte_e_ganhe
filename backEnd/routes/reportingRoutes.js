const express = require('express');
const path = require('path');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const { exportarRelatorioUsuarios, exportarRelatorioEstoque, exportarRelatorioPerfis, 
    exportarRelatorioRecebimento, exportarRelatorioTalao} = require('../controllers/reportingController');

// Rota para gerar e exportar o CSV de usuários
router.get('/relatorio/usuarios', authenticateToken, exportarRelatorioUsuarios);

// Rota para gerar e exportar o CSV de estoque
router.get('/relatorio/estoque', authenticateToken, exportarRelatorioEstoque);

// Rota para gerar e exportar o CSV de perfis
router.get('/relatorio/perfis', authenticateToken, exportarRelatorioPerfis);

// Rota para gerar e exportar o CSV de recebimentos
router.get('/relatorio/recebimento', authenticateToken, exportarRelatorioRecebimento);

// Rota para gerar e exportar o CSV de talões
router.get('/relatorio/talao', authenticateToken, exportarRelatorioTalao);

module.exports = router;
