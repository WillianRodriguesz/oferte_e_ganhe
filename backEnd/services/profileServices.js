const pool = require('../config/database');

// Função para inserir um novo perfil
async function inserirPerfil(funcao) {
    const query = `
        INSERT INTO perfil (funcao)
        VALUES ($1)
        RETURNING *;
    `;
    const valores = [funcao];
    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0];
    } catch (erro) {
        console.error('Erro ao inserir perfil:', erro);
        throw erro;
    }
}

// Função para obter todos os perfis
async function obterTodosPerfis() {
    const query = 'SELECT * FROM perfil';
    try {
        const resultado = await pool.query(query);
        return resultado.rows;
    } catch (erro) {
        console.error('Erro ao obter perfis:', erro);
        throw erro;
    }
}

// Função para obter um perfil por ID
async function obterPerfilPorId(id) {
    const query = 'SELECT * FROM perfil WHERE id = $1';
    try {
        const resultado = await pool.query(query, [id]);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao obter perfil por ID:', erro);
        throw erro;
    }
}

// Função para atualizar um perfil
async function atualizarPerfil(id, funcao) {
    const query = `
        UPDATE perfil
        SET funcao = $2
        WHERE id = $1
        RETURNING *;
    `;
    const valores = [id, funcao];
    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao atualizar perfil:', erro);
        throw erro;
    }
}

// Função para excluir um perfil
async function excluirPerfil(id) {
    const query = 'DELETE FROM perfil WHERE id = $1 RETURNING *;';
    try {
        const resultado = await pool.query(query, [id]);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao excluir perfil:', erro);
        throw erro;
    }
}

module.exports = {inserirPerfil, obterTodosPerfis, obterPerfilPorId, atualizarPerfil, excluirPerfil
};
