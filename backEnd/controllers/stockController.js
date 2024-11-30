const {
    inserirEstoque,
    obterTodosEstoques,
    obterEstoqueId,
    atualizarEstoque,
    excluirEstoque
} = require('../services/stockServices');
const path = require('path');

// Controlador para servir a página de estoque
const exibirPaginaEstoque = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/estoque.html'));
};

// Controlador para cadastrar um novo item no estoque
const criarEstoque = async (req, res) => {
    const { qtd_atual, qtd_minima, qtd_maxima, status } = req.body;
    try {
        const novoEstoque = await inserirEstoque(qtd_atual, qtd_minima, qtd_maxima, status);

        res.status(201).json({ 
            message: 'Estoque cadastrado com sucesso!', 
            estoqueId: novoEstoque.id 
        });

    } catch (erro) {
        res.status(500).json({ message: 'Erro ao cadastrar item no estoque', error: erro.message });
    }
};

// Controlador para obter todos os itens do estoque
const listarItensEstoque = async (req, res) => {
    try {
        const estoques = await obterTodosEstoques();
        res.status(200).json(estoques);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter estoque', error: erro.message });
    }
};

// Controlador para obter um item de estoque por ID
const obterItemEstoque = async (req, res) => {
    const { id } = req.params;
    try {
        const itemEstoque = await obterEstoqueId(id);
        if (!itemEstoque) {
            return res.status(404).json({ message: 'Item não encontrado no estoque' });
        }
        res.status(200).json(itemEstoque);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter item do estoque', error: erro.message });
    }
};

// Controlador para atualizar um item de estoque pelo ID
const atualizarItemEstoque = async (req, res) => {
    const { id } = req.params;
    const { qtd_atual, qtd_minima, qtd_maxima, status } = req.body;
    try {
        const estoqueAtualizado = await atualizarEstoque(id, qtd_atual, qtd_minima, qtd_maxima, status);
        if (!estoqueAtualizado) {
            return res.status(404).json({ message: 'Item não encontrado no estoque' });
        }
        res.status(200).json({ message: 'Item atualizado com sucesso!', estoque: estoqueAtualizado });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao atualizar item do estoque', error: erro.message });
    }
};

// Controlador para excluir um item de estoque pelo ID
const excluirItemEstoque = async (req, res) => {
    const { id } = req.params;
    try {
        const estoqueExcluido = await excluirEstoque(id);
        if (!estoqueExcluido) {
            return res.status(404).json({ message: 'Item não encontrado no estoque' });
        }
        res.status(200).json({ message: 'Item excluído com sucesso!' });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao excluir item do estoque', error: erro.message });
    }
};

module.exports = {
    exibirPaginaEstoque,
    criarEstoque,
    listarItensEstoque,
    obterItemEstoque,
    atualizarItemEstoque,
    excluirItemEstoque,
};
