const LogRecebimento = require('../models/receivingModel');

// Função para inserir um novo log de recebimento
async function inserirLogRecebimento(data_recebimento, talao, observacao) {
    try {
        const logRecebimento = await LogRecebimento.create({ data_recebimento, talao, observacao });
        return logRecebimento;
    } catch (erro) {
        console.error('Erro ao inserir log de recebimento:', erro);
        throw erro;
    }
}

// Função para obter todos os logs de recebimento
async function obterTodosLogsRecebimento() {
    try {
        const logsRecebimento = await LogRecebimento.findAll();
        return logsRecebimento;
    } catch (erro) {
        console.error('Erro ao obter logs de recebimento:', erro);
        throw erro;
    }
}

// Função para obter um log de recebimento por ID
async function obterLogRecebimentoPorId(id) {
    try {
        const logRecebimento = await LogRecebimento.findOne({
            where: { id }
        });
        return logRecebimento;
    } catch (erro) {
        console.error('Erro ao obter log de recebimento por ID:', erro);
        throw erro;
    }
}

// Função para atualizar um log de recebimento
async function atualizarLogRecebimento(id, data_recebimento, talao, observacao) {
    try {
        const logRecebimento = await LogRecebimento.findOne({
            where: { id }
        });

        if (!logRecebimento) return null;

        logRecebimento.data_recebimento = data_recebimento;
        logRecebimento.talao = talao;
        logRecebimento.observacao = observacao;
        await logRecebimento.save(); // Salva as alterações no banco

        return logRecebimento;
    } catch (erro) {
        console.error('Erro ao atualizar log de recebimento:', erro);
        throw erro;
    }
}

// Função para excluir um log de recebimento
async function excluirLogRecebimento(id) {
    try {
        const logRecebimento = await LogRecebimento.findOne({
            where: { id }
        });

        if (!logRecebimento) return null;

        await logRecebimento.destroy(); // Remove o registro do banco

        return logRecebimento;
    } catch (erro) {
        console.error('Erro ao excluir log de recebimento:', erro);
        throw erro;
    }
}

module.exports = {
    inserirLogRecebimento,
    obterTodosLogsRecebimento,
    obterLogRecebimentoPorId,
    atualizarLogRecebimento,
    excluirLogRecebimento
};
