const express = require('express');
const router = express.Router();
const path = require('path');
const {inserirPerfil, obterTodosPerfis, obterPerfilPorId, atualizarPerfil, excluirPerfil
} = require('../services/profileServices');

// Rota para cadastrar um novo perfil
router.post('/perfis', async (req, res) => {
    const {funcao } = req.body;
    try {
        const novoPerfil = await inserirPerfil(funcao);
        res.status(201).json({ message: 'Perfil cadastrado com sucesso!', perfil: novoPerfil });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao cadastrar perfil', error: erro.message });
    }
});

// Rota para obter todos os perfis
router.get('/perfis', async (req, res) => {
    try {
        const perfis = await obterTodosPerfis();
        res.status(200).json(perfis);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter perfis', error: erro.message });
    }
});

// Rota para obter um perfil por ID
router.get('/perfis/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const perfil = await obterPerfilPorId(id);
        if (!perfil) {
            return res.status(404).json({ message: 'Perfil não encontrado' });
        }
        res.status(200).json(perfil);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter perfil', error: erro.message });
    }
});

// Rota para atualizar um perfil pelo ID
router.put('/perfis/:id', async (req, res) => {
    const { id } = req.params;
    const { funcao } = req.body;
    try {
        const perfilAtualizado = await atualizarPerfil(id, funcao);
        if (!perfilAtualizado) {
            return res.status(404).json({ message: 'Perfil não encontrado' });
        }
        res.status(200).json({ message: 'Perfil atualizado com sucesso!', perfil: perfilAtualizado });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao atualizar perfil', error: erro.message });
    }
});

// Rota para excluir um perfil pelo ID
router.delete('/perfis/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const perfilDeletado = await excluirPerfil(id);
        if (!perfilDeletado) {
            return res.status(404).json({ message: 'Perfil não encontrado' });
        }
        res.status(200).json({ message: 'Perfil excluído com sucesso!' });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao excluir perfil', error: erro.message });
    }
});

router.get('/perfis/view', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/perfis.html'));
});

module.exports = router;
