const Talao = require('../models/talaoModel');

async function inserirTalao(numero_remessa, qtd_talao, destinatario, remetente, status, data_envio, data_prevista, data_recebimento, observacao) {
    try {
        const talao = await Talao.create({ numero_remessa, qtd_talao, destinatario, remetente, status, data_envio, data_prevista, data_recebimento, observacao });
        return talao; 
    } catch (erro) {
        console.error('Erro ao inserir talão:', erro);
        throw erro;
    }
}

async function obterTodosTaloes() {
    try {
        const taloes = await Talao.findAll();
        return taloes; 
    } catch (erro) {
        console.error('Erro ao obter talões:', erro);
        throw erro;
    }
}

async function obterTalaoPorId(id) {
    try {
        const talao = await Talao.findOne({
            where: { id: id }
        });
        return talao ? talao : null; 
    } catch (erro) {
        console.error('Erro ao obter talão por ID:', erro);
        throw erro;
    }
}

async function atualizarTalao(id, numero_remessa, qtd_talao, destinatario, remetente, status, data_envio, data_prevista, data_recebimento, observacao) {
    try {
        const talao = await Talao.findOne({
            where: { id: id }
        });

        if (!talao) return null; 

        talao.numero_remessa = numero_remessa;
        talao.qtd_talao = qtd_talao;
        talao.destinatario = destinatario;
        talao.remetente = remetente;
        talao.status = status;
        talao.data_envio = data_envio;
        talao.data_prevista = data_prevista;
        talao.data_recebimento = data_recebimento;
        talao.observacao = observacao;

        await talao.save();

        return talao; 
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

        if (!talao) return null; 

        await talao.destroy(); 

        return talao; 
    } catch (erro) {
        console.error('Erro ao excluir talão:', erro);
        throw erro;
    }
}

async function atualizarStatusTalao(id, novoStatus) {
    try {
        const talao = await Talao.findOne({
            where: { id: id }
        });

        if (!talao) return null; // Retorna null se o talão não for encontrado

        talao.status = novoStatus; // Atualiza apenas o status
        await talao.save(); // Salva a alteração no banco

        return talao; // Retorna o talão atualizado
    } catch (erro) {
        console.error('Erro ao atualizar status do talão:', erro);
        throw erro;
    }
}

module.exports = {
    inserirTalao,
    obterTodosTaloes,
    obterTalaoPorId,
    atualizarTalao,
    excluirTalao,
    atualizarStatusTalao
};
