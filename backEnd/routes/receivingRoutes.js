const express = require('express');
const router = express.Router();
const path = require('path');
const {inserirLogRecebimento, obterTodosLogsRecebimento, obterLogRecebimentoPorId, atualizarLogRecebimento, excluirLogRecebimento} = require('../services/receivingServices');

// Rota para cadastrar um novo log de recebimento
router.post('/recebimentoTalao', async (req, res) => {
    const {data_recebimento, talao, observacao } = req.body;
    try {
        const novoLog = await inserirLogRecebimento(data_recebimento, talao, observacao);
        res.status(201).json({ message: 'Log de recebimento cadastrado com sucesso!', log: novoLog });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao cadastrar log de recebimento', error: erro.message });
    }
});

// Rota para obter todos os logs de recebimento
router.get('/recebimentoTalao', async (req, res) => {
    try {
        const logs = await obterTodosLogsRecebimento();
        res.status(200).json(logs);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter logs de recebimento', error: erro.message });
    }
});

// Rota para obter um log de recebimento por ID
router.get('/recebimentoTalao/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const log = await obterLogRecebimentoPorId(id);
        if (!log) {
            return res.status(404).json({ message: 'Log de recebimento não encontrado' });
        }
        res.status(200).json(log);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter log de recebimento', error: erro.message });
    }
});

// Rota para atualizar um log de recebimento pelo ID
router.put('/recebimentoTalao/:id', async (req, res) => {
    const { id } = req.params;
    const { data_recebimento, talao, observacao } = req.body;
    try {
        const logAtualizado = await atualizarLogRecebimento(id, data_recebimento, talao, observacao);
        if (!logAtualizado) {
            return res.status(404).json({ message: 'Log de recebimento não encontrado' });
        }
        res.status(200).json({ message: 'Log de recebimento atualizado com sucesso!', log: logAtualizado });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao atualizar log de recebimento', error: erro.message });
    }
});

// Rota para excluir um log de recebimento pelo ID
router.delete('/recebimentoTalao/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const logDeletado = await excluirLogRecebimento(id);
        if (!logDeletado) {
            return res.status(404).json({ message: 'Log de recebimento não encontrado' });
        }
        res.status(200).json({ message: 'Log de recebimento excluído com sucesso!' });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao excluir log de recebimento', error: erro.message });
    }
});

module.exports = router;