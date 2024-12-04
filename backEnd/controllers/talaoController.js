const { inserirTalao, obterTodosTaloes, obterTalaoPorId, atualizarTalao, excluirTalao } = require('../services/talaoServices');

// Controlador para cadastrar um novo talão
const cadastrarTalao = async (req, res) => {
    const { numero_remessa, qtd_talao, destinatario, remetente, status, data_envio, data_prevista, data_recebimento, observacao } = req.body;
    try {
        const novoTalao = await inserirTalao(numero_remessa, qtd_talao, destinatario, remetente, status, data_envio, data_prevista, data_recebimento, observacao);
        res.status(201).json({ message: 'Talão cadastrado com sucesso!', talao: novoTalao });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao cadastrar talão', error: erro.message });
    }
};

// Controlador para obter todos os talões
const listarTaloes = async (req, res) => {
    try {
        const taloes = await obterTodosTaloes();
        res.status(200).json(taloes);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter talões', error: erro.message });
    }
};

// Controlador para obter um talão por ID
const obterTalao = async (req, res) => {
    const { id } = req.params;
    try {
        const talao = await obterTalaoPorId(id);
        if (!talao) {
            return res.status(404).json({ message: 'Talão não encontrado' });
        }
        res.status(200).json(talao);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter talão', error: erro.message });
    }
};

// Controlador para atualizar um talão pelo ID
const atualizarTalaoInfo = async (req, res) => {
    const { id } = req.params;
    const { numero_remessa, qtd_talao, destinatario, remetente, status } = req.body;
    try {
        const talaoAtualizado = await atualizarTalao(numero_remessa, qtd_talao, destinatario, remetente, status, data_envio, data_prevista, data_recebimento, observacao);
        if (!talaoAtualizado) {
            return res.status(404).json({ message: 'Talão não encontrado' });
        }
        res.status(200).json({ message: 'Talão atualizado com sucesso!', talao: talaoAtualizado });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao atualizar talão', error: erro.message });
    }
};

// Controlador para excluir um talão pelo ID
const excluirTalaoInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const talaoDeletado = await excluirTalao(id);
        if (!talaoDeletado) {
            return res.status(404).json({ message: 'Talão não encontrado' });
        }
        res.status(200).json({ message: 'Talão excluído com sucesso!' });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao excluir talão', error: erro.message });
    }
};

module.exports = {
    cadastrarTalao,
    listarTaloes,
    obterTalao,
    atualizarTalaoInfo,
    excluirTalaoInfo
};
