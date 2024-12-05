const Loja = require('../models/storeModel');
const Estoque = require('../models/stockModel');
const Address = require('../models/addressModel');

// Função para inserir uma nova loja
async function inserirLoja(cod_unidade, id_estoque, logradouro, matriz) {
    try {
        const loja = await Loja.create({ cod_unidade, id_estoque, logradouro, matriz });
        return loja;
    } catch (erro) {
        console.error('Erro ao inserir loja:', erro);
        throw erro;
    }
}

// Função para obter todas as lojas
async function obterTodasLojas() {
    try {
        const lojas = await Loja.findAll({
            include: [
                {
                    model: Estoque,
                    attributes: ['qtd_atual', 'qtd_minima', 'qtd_maxima', 'status'], 
                },
                {
                    model: Address,
                    attributes: ['estado', 'cidade', 'cep', 'bairro', 'endereco', 'numero'], 
                }
            ],
        });
        return lojas;
    } catch (erro) {
        console.error('Erro ao obter lojas:', erro);
        throw erro;
    }
}

// Função para obter uma loja por código de unidade
async function obterLojaId(id) {
    try {
        const loja = await Loja.findOne({
            where: { cod_unidade: id },
            include: [
                {
                    model: Estoque,
                    attributes: ['qtd_atual', 'qtd_minima', 'qtd_maxima', 'status'], 
                },
                {
                    model: Address,
                    attributes: ['estado', 'cidade', 'cep', 'bairro', 'endereco', 'numero'], 
                }
            ],
        });

        return loja;
    } catch (erro) {
        console.error('Erro ao obter loja por ID:', erro);
        throw erro;
    }
}

// Função para atualizar uma loja
async function atualizarLoja(id, cod_unidade, id_estoque, logradouro, matriz) {
    try {
        const loja = await Loja.findOne({
            where: { cod_unidade: id }
        });

        if (!loja) return null;

        loja.cod_unidade = cod_unidade;
        loja.id_estoque = id_estoque;
        loja.logradouro = logradouro;
        loja.matriz = matriz;

        await loja.save(); 

        return loja;
    } catch (erro) {
        console.error('Erro ao atualizar loja:', erro);
        throw erro;
    }
}

// Função para excluir uma loja
async function excluirLoja(id) {
    try {
        const loja = await Loja.findOne({
            where: { cod_unidade: id }
        });

        if (!loja) return null;

        await loja.destroy(); 

        return loja;
    } catch (erro) {
        console.error('Erro ao excluir loja:', erro);
        throw erro;
    }
}

module.exports = {
    inserirLoja,
    obterTodasLojas,
    obterLojaId,
    atualizarLoja,
    excluirLoja
};
