const { 
    inserirUsuario, 
    obterUsuarios, 
    obterUsuarioId, 
    atualizarUsuario, 
    excluirUsuario } = require('../services/userServices');

// Controlador para buscar todos os usuários
const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await obterUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar usuários');
    }
};

// Controlador para buscar um usuário por ID
const buscarUsuarioId = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await obterUsuarioId(id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar usuário');
    }
};

// Controlador para cadastrar um novo usuário
const cadastrarUsuario = async (req, res) => {
    const { nome, matricula, email, senha, perfil } = req.body;
    try {
        const novoUsuario = await inserirUsuario(nome, matricula, email, senha, perfil);
        res.status(200).json({ message: 'Usuário cadastrado com sucesso!', usuario: novoUsuario });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário', error: erro.message });
    }
};

// Controlador para atualizar um usuário
const atualizarUsuarioInfo = async (req, res) => {
    const { id } = req.params;
    const { nome, matricula, email, senha, perfil, status, id_loja } = req.body;
    try {
        const usuarioAtualizado = await atualizarUsuario(id, nome, matricula, email, senha, perfil, status, id_loja);
        if (!usuarioAtualizado) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json({ message: 'Usuário atualizado com sucesso!', usuario: usuarioAtualizado });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao atualizar usuário', error: erro.message });
    }
};

// Controlador para excluir um usuário
const excluirUsuarioInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const usuarioDeletado = await excluirUsuario(id);
        if (!usuarioDeletado) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json({ message: 'Usuário excluído com sucesso!' });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao excluir usuário', error: erro.message });
    }
};

module.exports = {
    listarUsuarios,
    buscarUsuarioId,
    cadastrarUsuario,
    atualizarUsuarioInfo,
    excluirUsuarioInfo
};
