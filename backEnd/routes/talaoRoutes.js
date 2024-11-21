const express = require('express');
const router = express.Router();
const {inserirBooklet, obterTodosTaloes, obterTalaoPorId, atualizarTalao, excluirTalao} = require('../services/bookletServices');

// Rota para cadastrar um novo talão
router.post('/talao', async (req, res) => {
    const { numero_remessa, qtd_talao, destinatario, remetente, status } = req.body;
    try {
        const novoTalao = await inserirBooklet(numero_remessa, qtd_talao, destinatario, remetente, status);
        res.status(201).json({ message: 'Talão cadastrado com sucesso!', talao: novoTalao });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao cadastrar talão', error: erro.message });
    }
});

// Rota para obter todos os talões
router.get('/talao', async (req, res) => {
    try {
        const taloes = await obterTodosTaloes();
        res.status(200).json(taloes);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter talões', error: erro.message });
    }
});

// Rota para obter um talão por ID
router.get('/talao/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const talao = await obterTalaoPorId(id);
        if (!talao) {
            return res.status(404).json({ message: 'Talão não encontrado' });
        }
        res.status(200).json(talao);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter talão', error: erro.message });
    }
});

// Rota para atualizar um talão pelo ID
router.put('/talao/:id', async (req, res) => {
    const { id } = req.params;
    const { numero_remessa, qtd_talao, destinatario, remetente, status } = req.body;
    try {
        const talaoAtualizado = await atualizarTalao(id, numero_remessa, qtd_talao, destinatario, remetente, status);
        if (!talaoAtualizado) {
            return res.status(404).json({ message: 'Talão não encontrado' });
        }
        res.status(200).json({ message: 'Talão atualizado com sucesso!', talao: talaoAtualizado });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao atualizar talão', error: erro.message });
    }
});

// Rota para excluir um talão pelo ID
router.delete('/talao/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const talaoDeletado = await excluirTalao(id);
        if (!talaoDeletado) {
            return res.status(404).json({ message: 'Talão não encontrado' });
        }
        res.status(200).json({ message: 'Talão excluído com sucesso!' });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao excluir talão', error: erro.message });
    }
});

module.exports = router;
