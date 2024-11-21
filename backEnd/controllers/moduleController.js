const { 
    inserirModulo, 
    buscaTodosModulos, 
    buscaModuloId, 
    atualizarModulo, 
    excluirModulo 
} = require('../services/moduleServices');

// Obter todos os módulos
const obterTodosModulos = async (req, res) => {
    try {
        const modulos = await buscaTodosModulos();
        res.status(200).json(modulos);
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao obter módulos', erro: erro.message });
    }
};

// Obter um módulo específico por ID
const obterModuloPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const modulo = await buscaModuloId(id);
        if (modulo) {
            res.status(200).json(modulo);
        } else {
            res.status(404).json({ mensagem: 'Módulo não encontrado' });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao obter módulo', erro: erro.message });
    }
};

// Cadastrar um novo módulo
const cadastrarModulo = async (req, res) => {
    const { nome } = req.body;
    try {
        const novoModulo = await inserirModulo(nome);
        res.status(201).json({ mensagem: 'Módulo cadastrado com sucesso', modulo: novoModulo });
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao cadastrar módulo', erro: erro.message });
    }
};

// Atualizar um módulo
const atualizarModuloPorId = async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    try {
        const moduloAtualizado = await atualizarModulo(id, nome);
        if (moduloAtualizado) {
            res.status(200).json({ mensagem: 'Módulo atualizado com sucesso', modulo: moduloAtualizado });
        } else {
            res.status(404).json({ mensagem: 'Módulo não encontrado' });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao atualizar módulo', erro: erro.message });
    }
};

// Excluir um módulo
const excluirModuloPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const moduloExcluido = await excluirModulo(id);
        if (moduloExcluido) {
            res.status(200).json({ mensagem: 'Módulo excluído com sucesso', modulo: moduloExcluido });
        } else {
            res.status(404).json({ mensagem: 'Módulo não encontrado' });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao excluir módulo', erro: erro.message });
    }
};

module.exports = {
    obterTodosModulos,
    obterModuloPorId,
    cadastrarModulo,
    atualizarModuloPorId,
    excluirModuloPorId
};
