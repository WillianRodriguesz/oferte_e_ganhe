const express = require('express');
const path = require('path');
const router = express.Router();
const {inserirModulo, buscaTodosModulos, buscaModuloId, atualizarModulo, excluirModulo} = require('../services/moduleServices');

// Rota para obter todos os módulos
router.get('/modulos', async (req, res) => {
    try {
        const modulos = await buscaTodosModulos();
        res.status(200).json(modulos);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter módulos', error: erro.message });
    }
});

// Rota para obter um módulo específico por ID
router.get('/modulos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const modulo = await buscaModuloId(id);
        if (modulo) {
            res.status(200).json(modulo);
        } else {
            res.status(404).json({ message: 'Módulo não encontrado' });
        }
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter módulo', error: erro.message });
    }
});

// Rota para cadastrar um novo módulo
router.post('/modulos', async (req, res) => {
    const { nome } = req.body;
    try {
        const novoModulo = await inserirModulo(nome);
        res.status(201).json({ message: 'Módulo cadastrado com sucesso', modulo: novoModulo });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao cadastrar módulo', error: erro.message });
    }
});

// Rota para atualizar um módulo
router.put('/modulos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    try {
        const moduloAtualizado = await atualizarModulo(id, nome);
        if (moduloAtualizado) {
            res.status(200).json({ message: 'Módulo atualizado com sucesso', modulo: moduloAtualizado });
        } else {
            res.status(404).json({ message: 'Módulo não encontrado' });
        }
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao atualizar módulo', error: erro.message });
    }
});

// Rota para excluir um módulo
router.delete('/modulos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const moduloExcluido = await excluirModulo(id);
        if (moduloExcluido) {
            res.status(200).json({ message: 'Módulo excluído com sucesso', modulo: moduloExcluido });
        } else {
            res.status(404).json({ message: 'Módulo não encontrado' });
        }
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao excluir módulo', error: erro.message });
    }
});

module.exports = router;
