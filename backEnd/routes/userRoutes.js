const express = require('express');
const router = express.Router();
const path = require('path');
const { inserirUsuario } = require('../services/userServices');
const { obterUsuarios } = require('../services/userServices');
const { obterUsuarioId } = require('../services/userServices');
const { atualizarUsuario } = require('../services/userServices');
const { excluirUsuario } = require('../services/userServices');


// Rota para redirecionar novo usuario para view
router.get('/usuarios/view', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/usuarios.html'));
}); 

// Rota get para buscar todos os usuarios 
router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await obterUsuarios();
        res.status(200).json(usuarios.rows);
        console.log(usuarios)
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar usuários');
    }
});

// Rota get para buscar todos os usuarios ID
router.get('/usuarios/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const usuario = await obterUsuarioId(id);
        if (usuario) {
            res.json(usuario);
            console.log(usuario)
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar usuario');
    }
});

// Rota para cadastrar um novo usuário
router.post('/usuarios', async (req, res) => {
    const { nome, matricula, email, senha, perfil } = req.body;

    try {
        const novoUsuario = await inserirUsuario(nome, matricula, email, senha, perfil);
        res.status(200).json({ message: 'Usuário cadastrado com sucesso!', usuario: novoUsuario });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário', error: erro.message });
    }
});

// Rota para atualizar um usuário pelo ID
router.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params; // ID do usuário a ser atualizado
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
});

// Rota para deletar um usuário pelo ID
router.delete('/usuarios/:id', async (req, res) => {
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
});


module.exports = router;