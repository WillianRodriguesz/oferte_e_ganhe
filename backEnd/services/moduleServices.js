const Modulos = require('../models/moduleModel');

// Função para inserir um novo módulo
async function inserirModulo(nome) {
    try {
        const modulo = await Modulos.create({ nome });
        return modulo;
    } catch (erro) {
        console.error('Erro ao inserir módulo:', erro);
        throw erro;
    }
}

// Função para obter todos os módulos
async function buscaTodosModulos() {
    try {
        const modulos = await Modulos.findAll();
        return modulos;
    } catch (erro) {
        console.error('Erro ao obter módulos:', erro);
        throw erro;
    }
}

// Função para obter um módulo específico por ID
async function buscaModuloId(id) {
    try {
        const modulo = await Modulos.findOne({
            where: { id }
        });
        return modulo;
    } catch (erro) {
        console.error('Erro ao obter módulo por ID:', erro);
        throw erro;
    }
}

// Função para atualizar um módulo
async function atualizarModulo(id, nome) {
    try {
        const modulo = await Modulos.findOne({
            where: { id }
        });

        if (!modulo) return null;

        modulo.nome = nome;
        await modulo.save(); 

        return modulo;
    } catch (erro) {
        console.error('Erro ao atualizar módulo:', erro);
        throw erro;
    }
}

// Função para excluir um módulo
async function excluirModulo(id) {
    try {
        const modulo = await Modulos.findOne({
            where: { id }
        });

        if (!modulo) return null;

        await modulo.destroy(); 

        return modulo;
    } catch (erro) {
        console.error('Erro ao excluir módulo:', erro);
        throw erro;
    }
}

module.exports = {
    inserirModulo,
    buscaTodosModulos,
    buscaModuloId,
    atualizarModulo,
    excluirModulo
};
