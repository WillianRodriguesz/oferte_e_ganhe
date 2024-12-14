const { inserirTalao, obterTodosTaloes, obterTalaoPorId, atualizarTalao, excluirTalao, obterTalaoDestinario,
        atualizarStatusTalao, obterTalaoPorNumeroRemessa, editarRecebimento } = require('../services/talaoServices');

// cadastrar um novo talão
const cadastrarTalao = async (req, res) => {
    const { numero_remessa, qtd_talao, destinatario, remetente, status, data_envio, data_prevista, data_recebimento, observacao } = req.body;
    try {
        const novoTalao = await inserirTalao(numero_remessa, qtd_talao, destinatario, remetente, status, data_envio, data_prevista, data_recebimento, observacao);
        res.status(201).json({ message: 'Talão cadastrado com sucesso!', talao: novoTalao });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao cadastrar talão', error: erro.message });
    }
};

// obter todos os talões
const listarTaloes = async (req, res) => {
    try {
        const taloes = await obterTodosTaloes();
        res.status(200).json(taloes);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter talões', error: erro.message });
    }
};

// obter um talão por ID
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

const atualizarTalaoInfo = async (req, res) => {
    const { id } = req.params;  // Pegando o ID do talão da URL
    const { numero_remessa, qtd_talao, destinatario, remetente, status, data_envio, data_prevista, data_recebimento, observacao} = req.body;  // Pegando os dados do talão do corpo da requisição

    try {
        // Verificando se todos os campos obrigatórios foram enviados
        if (!numero_remessa || !qtd_talao || !destinatario || !remetente || !status || !data_envio || !data_prevista) {
            return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
        }

        const talaoAtualizado = await atualizarTalao(id, numero_remessa, qtd_talao, destinatario, remetente, status, data_envio, data_prevista, data_recebimento, observacao );

        if (!talaoAtualizado) {
            return res.status(404).json({ message: 'Talão não encontrado' });
        }

        return res.status(200).json({ message: 'Talão atualizado com sucesso!', talao: talaoAtualizado });

    } catch (erro) {
        // Em caso de erro, retorna o erro com status 500
        console.error('Erro ao atualizar talão:', erro);
        return res.status(500).json({ message: 'Erro ao atualizar talão', error: erro.message });
    }
};

// excluir um talão pelo ID
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

// atualizar o status de um talão pelo ID
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

async function buscarTalaosPorDestinatario(req, res) {
    try {
        const { destinatario } = req.params; 

        if (!destinatario) {
            return res.status(400).json({ mensagem: 'O campo destinatario é obrigatório' });
        }

        const taloes = await obterTalaoDestinario(destinatario);

        if (taloes.length === 0) {
            return res.status(404).json({ mensagem: 'Nenhum talão encontrado para este destinatário' });
        }

        return res.status(200).json(taloes);
    } catch (error) {
        console.error('Erro no controller:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

module.exports = {
    cadastrarTalao,
    listarTaloes,
    obterTalao,
    atualizarTalaoInfo,
    excluirTalaoInfo,
    atualizarStatus,
    obterTalaoPorRemessa,
    editarRecebimentoTalao,
    buscarTalaosPorDestinatario
};
