const { inserirTalao, obterTodosTaloes, obterTalaoPorId, atualizarTalao, excluirTalao, 
        atualizarStatusTalao, obterTalaoPorNumeroRemessa, editarRecebimento } = require('../services/talaoServices');

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

// Controlador para atualizar o status de um talão pelo ID
const atualizarStatus = async (req, res) => {
    const { id } = req.params; // ID do talão na URL
    const { status } = req.body; // Novo status no corpo da requisição

    if (!status) {
        return res.status(400).json({ message: 'O campo status é obrigatório.' });
    }

    try {
        const talaoAtualizado = await atualizarStatusTalao(id, status); // Chama o serviço para atualizar o status

        if (!talaoAtualizado) {
            return res.status(404).json({ message: 'Talão não encontrado' });
        }

        res.status(200).json({ 
            message: 'Status do talão atualizado com sucesso!', 
            talao: talaoAtualizado 
        });
    } catch (erro) {
        console.error('Erro ao atualizar status do talão:', erro);
        res.status(500).json({ 
            message: 'Erro ao atualizar status do talão.', 
            error: erro.message 
        });
    }
};

const obterTalaoPorRemessa = async (req, res) => {
    const { numero_remessa } = req.params; // Número de remessa na URL

    try {
        const talao = await obterTalaoPorNumeroRemessa(numero_remessa); // Chama o serviço

        if (!talao) {
            return res.status(404).json({ message: 'Talão não encontrado para o número de remessa fornecido.' });
        }

        res.status(200).json(talao);
    } catch (erro) {
        console.error('Erro ao obter talão por número de remessa:', erro);
        res.status(500).json({ 
            message: 'Erro ao buscar talão pelo número de remessa.', 
            error: erro.message 
        });
    }
};

const editarRecebimentoTalao = async (req, res) => {
    const { id } = req.params; 
    const { data_recebimento, status } = req.body; 

    // Verifica se os campos data_recebimento e status foram fornecidos
    if (!data_recebimento || !status) {
        return res.status(400).json({ 
            message: 'Os campos data_recebimento e status são obrigatórios.' 
        });
    }

    try {
        const talao = await obterTalaoPorId(id);
        
        if (!talao) {
            return res.status(404).json({ message: 'Talão não encontrado' });
        }

        if (talao.status == 'Recebido') {
            return res.status(400).json({
                message: 'Não é possível atualizar o recebimento. A remessa ja foi recebida.'
            });
        }

        if (talao.status !== 'Enviado') {
            return res.status(400).json({
                message: 'Não é possível atualizar o recebimento. A remessa não foi Enviada.'
            });
        }

        if (talao.data_recebimento !== null) {
            return res.status(400).json({
                message: 'Não é possível atualizar o recebimento. A remessa ja foi recebida.'
            });
        }

        const talaoAtualizado = await editarRecebimento(id, data_recebimento, status); 

        if (!talaoAtualizado) {
            return res.status(404).json({ message: 'Erro ao atualizar o talão.' });
        }

        res.status(200).json({ 
            message: 'Remessa recebida com sucesso!', 
            talao: talaoAtualizado 
        });
    } catch (erro) {
        console.error('Erro ao atualizar data_recebimento e status:', erro);
        res.status(500).json({ 
            message: 'Erro ao atualizar data_recebimento e status do talão.', 
            error: erro.message 
        });
    }
};

module.exports = {
    cadastrarTalao,
    listarTaloes,
    obterTalao,
    atualizarTalaoInfo,
    excluirTalaoInfo,
    atualizarStatus,
    obterTalaoPorRemessa,
    editarRecebimentoTalao
};
