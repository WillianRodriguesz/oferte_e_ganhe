const { 
    inserirLogRecebimento, 
    obterTodosLogsRecebimento, 
    obterLogRecebimentoPorId, 
    atualizarLogRecebimento, 
    excluirLogRecebimento,
    obterTalaosPorDestinatario
} = require('../services/receivingServices');

// Controlador para cadastrar um novo log de recebimento
const criarLogRecebimento = async (req, res) => {
    const { data_recebimento, talao, observacao } = req.body;
    try {
        const novoLog = await inserirLogRecebimento(data_recebimento, talao, observacao);
        res.status(201).json({ message: 'Log de recebimento cadastrado com sucesso!', log: novoLog });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao cadastrar log de recebimento', error: erro.message });
    }
};

// Controlador para obter todos os logs de recebimento
const listarLogsRecebimento = async (req, res) => {
    try {
        const logs = await obterTodosLogsRecebimento();
        res.status(200).json(logs);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter logs de recebimento', error: erro.message });
    }
};

// Controlador para obter um log de recebimento por ID
const obterLogRecebimento = async (req, res) => {
    const { id } = req.params;
    try {
        const log = await obterLogRecebimentoPorId(id);
        if (!log) {
            return res.status(404).json({ message: 'Log de recebimento não encontrado' });
        }
        res.status(200).json(log);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter log de recebimento', error: erro.message });
    }
};

// Controlador para atualizar um log de recebimento pelo ID
const atualizarLogRecebimentoPorId = async (req, res) => {
    const { id } = req.params;
    const { data_recebimento, talao, observacao } = req.body;
    try {
        const logAtualizado = await atualizarLogRecebimento(id, data_recebimento, talao, observacao);
        if (!logAtualizado) {
            return res.status(404).json({ message: 'Log de recebimento não encontrado' });
        }
        res.status(200).json({ message: 'Log de recebimento atualizado com sucesso!', log: logAtualizado });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao atualizar log de recebimento', error: erro.message });
    }
};

// Controlador para excluir um log de recebimento pelo ID
const excluirLogRecebimentoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const logDeletado = await excluirLogRecebimento(id);
        if (!logDeletado) {
            return res.status(404).json({ message: 'Log de recebimento não encontrado' });
        }
        res.status(200).json({ message: 'Log de recebimento excluído com sucesso!' });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao excluir log de recebimento', error: erro.message });
    }
};

async function buscarTalaosPorDestinario(req, res) {
    try {
        const { destinatarioId } = req.params; 
        const talaos = await obterTalaosPorDestinatario(destinatarioId);

        res.status(200).json(talaos);
    } catch (erro) {
        res.status(500).json({ message: 'Erro interno ao buscar os talões' });
    }
}

module.exports = {
    criarLogRecebimento,
    listarLogsRecebimento,
    obterLogRecebimento,
    atualizarLogRecebimentoPorId,
    excluirLogRecebimentoPorId,
    buscarTalaosPorDestinario,
};
