const pool = require('../config/database');
const bcrypt = require('bcrypt');

// Função para inserir um novo usuário com senha criptografada
async function inserirUsuario(nome, matricula, email, senha, perfil) {
    const query = `
        INSERT INTO usuarios (nome, matricula, email, senha, perfil)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    try {
        // Gera o hash da senha 
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const valores = [nome, matricula, email, senhaCriptografada, perfil];
        const usuario = await pool.query(query, valores);

        return usuario.rows[0]; // Retorna o usuário inserido
    } catch (erro) {
        console.error('Erro ao inserir usuário:', erro);
        throw erro;
    }
}

async function obterUsuarios(){
    const query = `
        SELECT * FROM usuarios
    `;

    try {
        const usuarios = await pool.query(query);
        return usuarios.rows;
    } catch (erro) {
        console.error('Erro ao listar usuarios:', erro);
        throw erro;
    }
}

async function obterUsuarioId(matricula){
    const query = `
        SELECT * FROM usuarios
        WHERE matricula = $1;
    `;

    try {
        const usuario = await pool.query(query, [matricula]);
        return usuario.rows[0];
    } catch (erro) {
        console.error('Erro ao listar usuarios:', erro);
        throw erro;
    }
}

async function atualizarUsuario(id, nome, matricula, email, senha, perfil, status, id_loja) {
    const query = `
        UPDATE usuarios 
        SET nome = $2, matricula = $3, email = $4, senha = $5, perfil = $6, status = $7, id_loja = $8 
        WHERE matricula = $1
        RETURNING *;
    `;

    const valores = [id, nome, matricula, email, senha, perfil, status, id_loja];

    try {
        const usuario = await pool.query(query, valores);
        return usuario.rows.length > 0 ? usuario.rows[0] : null; 
    } catch (erro) {
        console.error('Erro ao atualizar usuário:', erro);
        throw erro;
    }
}

async function excluirUsuario(id) {
    const query = `
        DELETE FROM usuarios WHERE matricula = $1 RETURNING *;
    `;
    try {
        const usuario = await pool.query(query, [id]);
        return usuario.rows.length > 0 ? usuario.rows[0] : null; 
    } catch (erro) {
        console.error('Erro ao excluir usuário:', erro);
        throw erro;
    }
}


module.exports = { inserirUsuario, obterUsuarios, obterUsuarioId, atualizarUsuario, excluirUsuario };
