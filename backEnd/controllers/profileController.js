const path = require('path');
const { 
    inserirPerfil, 
    obterTodosPerfis, 
    obterPerfilPorId, 
    atualizarPerfil, 
    excluirPerfil,
    editarFuncaoPerfil
} = require('../services/profileServices');

// Controlador para cadastrar um novo perfil
const criarPerfil = async (req, res) => {
    const { funcao } = req.body;
    try {
        const novoPerfil = await inserirPerfil(funcao);
        res.status(201).json({ message: 'Perfil cadastrado com sucesso!', perfil: novoPerfil });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao cadastrar perfil', error: erro.message });
    }
};

// Controlador para obter todos os perfis
const listarPerfis = async (req, res) => {
    try {
        const perfis = await obterTodosPerfis();
        res.status(200).json(perfis);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter perfis', error: erro.message });
    }
};

// Controlador para obter um perfil por ID
const obterPerfil = async (req, res) => {
    const { id } = req.params;
    try {
        const perfil = await obterPerfilPorId(id);
        if (!perfil) {
            return res.status(404).json({ message: 'Perfil não encontrado' });
        }
        res.status(200).json(perfil);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter perfil', error: erro.message });
    }
};

// Controlador para atualizar um perfil pelo ID
const atualizarPerfilPorId = async (req, res) => {
    const { id } = req.params;
    const { funcao } = req.body;
    try {
        const perfilAtualizado = await atualizarPerfil(id, funcao);
        if (!perfilAtualizado) {
            return res.status(404).json({ message: 'Perfil não encontrado' });
        }
        res.status(200).json({ message: 'Perfil atualizado com sucesso!', perfil: perfilAtualizado });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao atualizar perfil', error: erro.message });
    }
};

// Controlador para excluir um perfil pelo ID
const excluirPerfilPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const perfilDeletado = await excluirPerfil(id);
        if (!perfilDeletado) {
            return res.status(404).json({ message: 'Perfil não encontrado' });
        }
        res.status(200).json({ message: 'Perfil excluído com sucesso!' });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao excluir perfil', error: erro.message });
    }
};

const editarFuncaoPerfilController = async (req, res) => {
    const { id } = req.params;
    const { novaFuncao } = req.body;

    try {
        const resultado = await editarFuncaoPerfil(id, novaFuncao);

        if (resultado.success) {
            return res.status(200).json({ message: resultado.mensagem, perfil: resultado.dados });
        }

        return res.status(404).json({ message: resultado.mensagem });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao editar perfil', error: error.message });
    }
};

const exibirPaginaPerfis = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/perfis.html'));
};

module.exports = {
    criarPerfil,
    listarPerfis,
    obterPerfil,
    atualizarPerfilPorId,
    excluirPerfilPorId,
    exibirPaginaPerfis,
    editarFuncaoPerfilController
};
