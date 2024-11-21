const path = require('path');
const {
    inserirLoja,
    obterTodasLojas,
    obterLojaId,
    atualizarLoja,
    excluirLoja
} = require('../services/storesServices');

// Controlador para servir a página de lojas
const exibirPaginaLojas = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/lojas.html'));
};

// Controlador para obter todas as lojas
const listarLojas = async (req, res) => {
    try {
        const lojas = await obterTodasLojas();
        res.status(200).json(lojas);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter lojas', error: erro.message });
    }
};

// Controlador para obter uma loja por ID
const obterLoja = async (req, res) => {
    const { id } = req.params;
    try {
        const loja = await obterLojaId(id);
        if (!loja) {
            return res.status(404).json({ message: 'Loja não encontrada' });
        }
        res.status(200).json(loja);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter loja', error: erro.message });
    }
};

// Controlador para cadastrar uma nova loja
const criarLoja = async (req, res) => {
    const { cod_unidade, id_estoque, logradouro, matriz } = req.body;
    try {
        const novaLoja = await inserirLoja(cod_unidade, id_estoque, logradouro, matriz);
        res.status(201).json({ message: 'Loja cadastrada com sucesso!', loja: novaLoja });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao cadastrar loja', error: erro.message });
    }
};

// Controlador para atualizar uma loja pelo ID
const atualizarLojaInfo = async (req, res) => {
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
};

// Controlador para excluir uma loja pelo ID
const excluirLojaInfo = async (req, res) => {
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
};

module.exports = {
    exibirPaginaLojas,
    listarLojas,
    obterLoja,
    criarLoja,
    atualizarLojaInfo,
    excluirLojaInfo
};
