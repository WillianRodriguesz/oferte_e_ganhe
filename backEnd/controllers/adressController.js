const { 
    inserirEndereco, 
    buscaTodosEnderecos, 
    buscaEnderecoId, 
    atualizarEndereco, 
    excluirEndereco 
} = require('../services/adressServices');

const obterTodosEnderecos = async (req, res) => {
    try {
        const enderecos = await buscaTodosEnderecos();
        res.status(200).json(enderecos);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao obter endereços', erro: error.message });
    }
};

const obterEnderecoId = async (req, res) => {
    const { id } = req.params;
    try {
        const endereco = await buscaEnderecoId(id);
        if (endereco) {
            res.status(200).json(endereco);
        } else {
            res.status(404).json({ mensagem: 'Endereço não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao obter endereço', erro: error.message });
    }
};

const criarEndereco = async (req, res) => {
    const { estado, cidade, cep, bairro, endereco, numero } = req.body;
    try {
        const novoEndereco = await inserirEndereco(estado, cidade, cep, bairro, endereco, numero);
        res.status(201).json({ mensagem: 'Endereço cadastrado com sucesso', enderecoId: novoEndereco.id });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao cadastrar endereço', erro: error.message });
    }
};

const atualizarEnderecoId = async (req, res) => {
    const { id } = req.params;
    const { estado, cidade, cep, bairro, endereco, numero } = req.body;
    try {
        const enderecoAtualizado = await atualizarEndereco(id, estado, cidade, cep, bairro, endereco, numero);
        if (enderecoAtualizado) {
            res.status(200).json({ mensagem: 'Endereço atualizado com sucesso', endereco: enderecoAtualizado });
        } else {
            res.status(404).json({ mensagem: 'Endereço não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar endereço', erro: error.message });
    }
};

const excluirEnderecoId = async (req, res) => {
    const { id } = req.params;
    try {
        const enderecoExcluido = await excluirEndereco(id);
        if (enderecoExcluido) {
            res.status(200).json({ mensagem: 'Endereço excluído com sucesso', endereco: enderecoExcluido });
        } else {
            res.status(404).json({ mensagem: 'Endereço não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao excluir endereço', erro: error.message });
    }
};

module.exports = {
    obterTodosEnderecos,
    obterEnderecoId,
    criarEndereco,
    atualizarEnderecoId,
    excluirEnderecoId
};
