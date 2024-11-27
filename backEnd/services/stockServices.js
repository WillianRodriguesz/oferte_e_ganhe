const Estoque = require('../models/stockModel');

// Função para inserir um novo item no estoque
async function inserirEstoque(qtd_atual, qtd_minima, qtd_maxima, status) {
    try {
        const estoque = await Estoque.create({ qtd_atual, qtd_minima, qtd_maxima, status });
        return estoque;
    } catch (erro) {
        console.error('Erro ao inserir item no estoque:', erro);
        throw erro;
    }
}

// Função para obter todos os itens de estoque
async function obterTodosEstoques() {
    try {
        const estoques = await Estoque.findAll();
        return estoques;
    } catch (erro) {
        console.error('Erro ao obter estoques:', erro);
        throw erro;
    }
}

// Função para obter um item de estoque por ID
async function obterEstoqueId(id) {
    try {
        const estoque = await Estoque.findOne({
            where: { id }
        });
        return estoque;
    } catch (erro) {
        console.error('Erro ao obter item de estoque por ID:', erro);
        throw erro;
    }
}

// Função para atualizar um item de estoque
async function atualizarEstoque(id, qtd_atual, qtd_minima, qtd_maxima, status) {
    try {
        const estoque = await Estoque.findOne({
            where: { id }
        });

        if (!estoque) return null;

        estoque.qtd_atual = qtd_atual;
        estoque.qtd_minima = qtd_minima;
        estoque.qtd_maxima = qtd_maxima;
        estoque.status = status;

        await estoque.save(); // Salva as alterações no banco

        return estoque;
    } catch (erro) {
        console.error('Erro ao atualizar item de estoque:', erro);
        throw erro;
    }
}

// Função para excluir um item de estoque
async function excluirEstoque(id) {
    try {
        const estoque = await Estoque.findOne({
            where: { id }
        });

        if (!estoque) return null;

        await estoque.destroy(); // Remove o item do estoque

        return estoque;
    } catch (erro) {
        console.error('Erro ao excluir item de estoque:', erro);
        throw erro;
    }
}

module.exports = {
    inserirEstoque,
    obterTodosEstoques,
    obterEstoqueId,
    atualizarEstoque,
    excluirEstoque
};
