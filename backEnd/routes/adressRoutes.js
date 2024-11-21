const express = require('express');
const path = require('path');
const router = express.Router();
const { inserirEndereco, buscaTodosEnderecos, buscaEnderecoId, atualizarEndereco, excluirEndereco} = require('../services/adressServices');

// Rota para obter todos os endereços
router.get('/endereco', async (req, res) => {
    try {
        const enderecos = await buscaTodosEnderecos();
        res.status(200).json(enderecos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter endereços', error: error.message });
    }
});

// Rota para obter um endereço específico por ID
router.get('/endereco/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const endereco = await buscaEnderecoId(id);
        if (endereco) {
            res.status(200).json(endereco);
        } else {
            res.status(404).json({ message: 'Endereço não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter endereço', error: error.message });
    }
});

// Rota para cadastrar um novo endereço
router.post('/endereco', async (req, res) => {
    const {estado, cidade, cep, bairro, endereco, numero } = req.body;
    try {
        const novoEndereco = await inserirEndereco(estado, cidade, cep, bairro, endereco, numero);
        res.status(201).json({ message: 'Endereço cadastrado com sucesso', endereco: novoEndereco });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar endereço', error: error.message });
    }
});

// Rota para atualizar um endereço
router.put('/endereco/:id', async (req, res) => {
    const { id } = req.params;
    const { estado, cidade, cep, bairro, endereco, numero } = req.body;
    try {
        const enderecoAtualizado = await atualizarEndereco(id, estado, cidade, cep, bairro, endereco, numero);
        if (enderecoAtualizado) {
            res.status(200).json({ message: 'Endereço atualizado com sucesso', endereco: enderecoAtualizado });
        } else {
            res.status(404).json({ message: 'Endereço não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar endereço', error: error.message });
    }
});

// Rota para excluir um endereço
router.delete('/endereco/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const enderecoExcluido = await excluirEndereco(id);
        if (enderecoExcluido) {
            res.status(200).json({ message: 'Endereço excluído com sucesso', endereco: enderecoExcluido });
        } else {
            res.status(404).json({ message: 'Endereço não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir endereço', error: error.message });
    }
});

module.exports = router;
