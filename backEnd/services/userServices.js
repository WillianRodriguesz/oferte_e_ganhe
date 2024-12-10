const Usuario  = require('../models/userModel');
const Perfil = require('../models/profileModel'); 
const Loja = require('../models/storeModel'); 

const bcrypt = require('bcrypt');

// Função para inserir um novo usuário com senha criptografada
async function inserirUsuario(nome, matricula, email, senha, perfil, status, id_loja) {
    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const usuario = await Usuario.create({
            nome,
            matricula,
            email,
            senha: senhaCriptografada,
            perfil,
            id_loja,
            status
        });

        return usuario; 
    } catch (erro) {
        console.error('Erro ao inserir usuário:', erro);
        throw erro;
    }
}

// Função para obter todos os usuários
async function obterUsuarios() {
    try {
        const usuarios = await Usuario.findAll({
            include: [
                { model: Perfil, attributes: ['id', 'funcao'] },
                { model: Loja, attributes: ['cod_unidade'] }
            ]
        }); 
        return usuarios;
    } catch (erro) {
        console.error('Erro ao listar usuários:', erro);
        throw erro;
    }
}

// Função para obter um usuário por matricula
async function obterUsuarioId(matricula) {
    try {
        const usuario = await Usuario.findOne({
            where: { matricula },
            include: [
                { model: Perfil, attributes: ['id', 'funcao'] },
                { model: Loja, attributes: ['cod_unidade'] }
            ]
        });  
        return usuario;
    } catch (erro) {
        console.error('Erro ao buscar usuário:', erro);
        throw erro;
    }
}

// Função para atualizar as informações de um usuário
async function atualizarUsuario(id, nome, matricula, email, senha, perfil, status, id_loja) {
    try {
        const usuario = await Usuario.findOne({
            where: { matricula: id }
        });

        if (!usuario) return null;  
        usuario.nome = nome;
        usuario.matricula = matricula;
        usuario.email = email;
        usuario.senha = senha ? await bcrypt.hash(senha, 10) : usuario.senha;  
        usuario.perfil = perfil;
        usuario.status = status;
        usuario.id_loja = id_loja;

        await usuario.save();  

        return usuario;  
    } catch (erro) {
        console.error('Erro ao atualizar usuário:', erro);
        throw erro;
    }
}

// Função para excluir um usuário
async function excluirUsuario(id) {
    try {
        const usuario = await Usuario.findOne({
            where: { matricula: id }
        });

        if (!usuario) return null;  

        await usuario.destroy(); 

        return usuario;  
    } catch (erro) {
        console.error('Erro ao excluir usuário:', erro);
        throw erro;
    }
}

module.exports = { inserirUsuario, obterUsuarios, obterUsuarioId, atualizarUsuario, excluirUsuario };
