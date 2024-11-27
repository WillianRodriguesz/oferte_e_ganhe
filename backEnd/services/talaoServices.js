const Talao = require('../models/talaoModel');

// Função para inserir um novo talão
async function inserirBooklet(numero_remessa, qtd_talao, destinatario, remetente, status) {
    try {
        const talao = await Talao.create({
            numero_remessa,
            qtd_talao,
            destinatario,
            remetente,
            status
        });
        return talao; // Retorna o talão inserido
    } catch (erro) {
        console.error('Erro ao inserir talão:', erro);
        throw erro;
    }
}

// Função para obter todos os talões
async function obterTodosTaloes() {
    try {
        const taloes = await Talao.findAll();
        return taloes; // Retorna todos os talões
    } catch (erro) {
        console.error('Erro ao obter talões:', erro);
        throw erro;
    }
}

// Função para obter um talão por ID
async function obterTalaoPorId(id) {
    try {
        const talao = await Talao.findOne({
            where: { id: id }
        });
        return talao ? talao : null; // Retorna o talão ou null se não encontrado
    } catch (erro) {
        console.error('Erro ao obter talão por ID:', erro);
        throw erro;
    }
}

// Função para atualizar um talão
async function atualizarTalao(id, numero_remessa, qtd_talao, destinatario, remetente, status) {
    try {
        const talao = await Talao.findOne({
            where: { id: id }
        });

        if (!talao) return null; // Retorna null se o talão não for encontrado

        talao.numero_remessa = numero_remessa;
        talao.qtd_talao = qtd_talao;
        talao.destinatario = destinatario;
        talao.remetente = remetente;
        talao.status = status;

        await talao.save(); // Salva as alterações no banco

        return talao; // Retorna o talão atualizado
    } catch (erro) {
        console.error('Erro ao atualizar talão:', erro);
        throw erro;
    }
}

// Função para excluir um talão
async function excluirTalao(id) {
    try {
        const talao = await Talao.findOne({
            where: { id: id }
        });

        if (!talao) return null; // Retorna null se o talão não for encontrado

        await talao.destroy(); // Exclui o talão do banco de dados

        return talao; // Retorna o talão excluído
    } catch (erro) {
        console.error('Erro ao excluir talão:', erro);
        throw erro;
    }
}

module.exports = {
    inserirBooklet,
    obterTodosTaloes,
    obterTalaoPorId,
    atualizarTalao,
    excluirTalao
};
