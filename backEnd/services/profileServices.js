const Perfil = require('../models/profileModel');

// Função para inserir um novo perfil
async function inserirPerfil(funcao) {
    try {
        const perfil = await Perfil.create({ funcao });
        return perfil;
    } catch (erro) {
        console.error('Erro ao inserir perfil:', erro);
        throw erro;
    }
}

// Função para obter todos os perfis
async function obterTodosPerfis() {
    try {
        const perfis = await Perfil.findAll();
        return perfis;
    } catch (erro) {
        console.error('Erro ao obter perfis:', erro);
        throw erro;
    }
}

// Função para obter um perfil por ID
async function obterPerfilPorId(id) {
    try {
        const perfil = await Perfil.findOne({
            where: { id }
        });
        return perfil;
    } catch (erro) {
        console.error('Erro ao obter perfil por ID:', erro);
        throw erro;
    }
}

// Função para atualizar um perfil
async function atualizarPerfil(id, funcao) {
    try {
        const perfil = await Perfil.findOne({
            where: { id }
        });

        if (!perfil) return null;

        perfil.funcao = funcao;
        await perfil.save(); 

        return perfil;
    } catch (erro) {
        console.error('Erro ao atualizar perfil:', erro);
        throw erro;
    }
}

// Função para excluir um perfil
async function excluirPerfil(id) {
    try {
        const perfil = await Perfil.findOne({
            where: { id }
        });

        if (!perfil) return null;

        await perfil.destroy(); 

        return perfil;
    } catch (erro) {
        console.error('Erro ao excluir perfil:', erro);
        throw erro;
    }
}

async function editarFuncaoPerfil(id, novaFuncao) {
    try {
        const resultado = await atualizarPerfil(id, novaFuncao);

        if (resultado) {
            console.log('Perfil atualizado com sucesso:', resultado);
            return { success: true, mensagem: 'Perfil atualizado com sucesso.', dados: resultado };
        } else {
            console.log('Perfil não encontrado para atualização.');
            return { success: false, mensagem: 'Perfil não encontrado para atualização.' };
        }
    } catch (error) {
        console.error('Erro ao editar perfil:', error);
        return { success: false, mensagem: 'Erro ao editar perfil.' };
    }
}

module.exports = {
    inserirPerfil,
    obterTodosPerfis,
    obterPerfilPorId,
    atualizarPerfil,
    excluirPerfil,
    editarFuncaoPerfil
};
