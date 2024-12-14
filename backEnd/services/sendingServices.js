const LogEnvio = require('../models/sendingModel');

// Função para inserir um novo registro
async function inserirRegistroEnvio(data_envio, data_prevista, talao, observacao) {
    try {
        const logEnvio = await LogEnvio.create({ data_envio, data_prevista, talao, observacao });
        return logEnvio;
    } catch (erro) {
        console.error('Erro ao inserir registro:', erro);
        throw erro;
    }
}

// Função para obter todos os registros
async function obterTodosRegistros() {
    try {
        const registros = await LogEnvio.findAll();
        return registros;
    } catch (erro) {
        console.error('Erro ao obter registros:', erro);
        throw erro;
    }
}

// Função para obter um registro por ID
async function obterRegistroPorId(id) {
    try {
        const registro = await LogEnvio.findOne({
            where: { id }
        });
        return registro;
    } catch (erro) {
        console.error('Erro ao obter registro por ID:', erro);
        throw erro;
    }
}

// Função para atualizar um registro
async function atualizarRegistro(id, data_envio, data_prevista, talao, observacao) {
    try {
        const logEnvio = await LogEnvio.findOne({
            where: { id }
        });

        if (!logEnvio) return null;

        logEnvio.data_envio = data_envio;
        logEnvio.data_prevista = data_prevista;
        logEnvio.talao = talao;
        logEnvio.observacao = observacao;
        await logEnvio.save(); 

        return logEnvio;
    } catch (erro) {
        console.error('Erro ao atualizar registro:', erro);
        throw erro;
    }
}

// Função para excluir um registro
async function excluirRegistro(id) {
    try {
        const logEnvio = await LogEnvio.findOne({
            where: { id }
        });

        if (!logEnvio) return null;

        await logEnvio.destroy(); 

        return logEnvio;
    } catch (erro) {
        console.error('Erro ao excluir registro:', erro);
        throw erro;
    }
}

module.exports = {
    inserirRegistroEnvio,
    obterTodosRegistros,
    obterRegistroPorId,
    atualizarRegistro,
    excluirRegistro
};
