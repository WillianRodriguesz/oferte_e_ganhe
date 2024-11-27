const Address = require('../models/addressModel');  // Importa o modelo Address

// Função para inserir um novo endereço
async function inserirEndereco(estado, cidade, cep, bairro, endereco, numero) {
    try {
        const novoEndereco = await Address.create({
            estado,
            cidade,
            cep,
            bairro,
            endereco,
            numero
        });
        return novoEndereco;
    } catch (error) {
        console.error('Erro ao inserir endereço:', error);
        throw error;
    }
}

// Função para obter todos os endereços
async function buscaTodosEnderecos() {
    try {
        const enderecos = await Address.findAll();
        return enderecos;
    } catch (error) {
        console.error('Erro ao obter endereços:', error);
        throw error;
    }
}

// Função para obter um endereço específico por ID
async function buscaEnderecoId(id) {
    try {
        const endereco = await Address.findOne({
            where: { id }
        });
        return endereco || null;
    } catch (error) {
        console.error('Erro ao obter endereço por ID:', error);
        throw error;
    }
}

// Função para atualizar um endereço
async function atualizarEndereco(id, estado, cidade, cep, bairro, endereco, numero) {
    try {
        const [updatedCount, updatedEndereco] = await Address.update(
            { estado, cidade, cep, bairro, endereco, numero },
            { where: { id }, returning: true }
        );
        
        if (updatedCount > 0) {
            return updatedEndereco[0];
        }
        return null;
    } catch (error) {
        console.error('Erro ao atualizar endereço:', error);
        throw error;
    }
}

// Função para excluir um endereço
async function excluirEndereco(id) {
    try {
        const deletedCount = await Address.destroy({
            where: { id }
        });
        
        return deletedCount > 0 ? { id } : null;
    } catch (error) {
        console.error('Erro ao excluir endereço:', error);
        throw error;
    }
}

module.exports = {
    inserirEndereco,
    buscaTodosEnderecos,
    buscaEnderecoId,
    atualizarEndereco,
    excluirEndereco
};
