const express = require('express');
const router = express.Router();
const path = require('path');
const { inserirLoja } = require('../services/storesServices');
const { obterTodasLojas } = require('../services/storesServices');
const { obterLojaId } = require('../services/storesServices');
const { atualizarLoja } = require('../services/storesServices');
const { excluirLoja } = require('../services/storesServices');


router.get('/lojas/view', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/lojas.html'));
});


// Rota para obter todas as lojas
router.get('/lojas', async (req, res) => {
    try {
        const lojas = await obterTodasLojas(); 
        res.status(200).json(lojas);
        console.log(lojas)
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter lojas', error: erro.message });
    }
});

router.get('/lojas/:id', async (req, res) => {
    const { id } = req.params; 

    try {
        const loja = await obterLojaId(id); 
        if (!loja) {
            return res.status(404).json({ message: 'Loja não encontrada' });
        }
        console.log(loja)
        res.status(200).json(loja);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter loja', error: erro.message });
    }
});

// Rota para cadastrar um nova loja
router.post('/lojas', async (req, res) => {
    const { cod_unidade, id_estoque, logradouro, matriz } = req.body;

    try {
        const novaLoja = await inserirLoja(cod_unidade, id_estoque, logradouro, matriz);
        res.status(201).json({ message: 'Loja cadastrado com sucesso!', loja: novaLoja });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao cadastrar loja', error: erro.message });
    }
});

router.put('/lojas/:id', async (req, res) => {
    const { id } = req.params; 
    const { cod_unidade, id_estoque, logradouro, matriz } = req.body; 

    try {
        const lojaAtualizada = await atualizarLoja(id, cod_unidade, id_estoque, logradouro, matriz);
        if (!lojaAtualizada) {
            return res.status(404).json({ message: 'Loja não encontrada' });
        }
        res.status(200).json({ message: 'Loja atualizada com sucesso!', loja: lojaAtualizada });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao atualizar loja', error: erro.message });
    }
});

router.delete('/lojas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const lojaDeletada = await excluirLoja(id);
        if (!lojaDeletada) {
            return res.status(404).json({ message: 'Loja não encontrada' });
        }
        res.status(200).json({ message: 'Loja excluída com sucesso!' });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao excluir loja', error: erro.message });
    }
});


module.exports = router;