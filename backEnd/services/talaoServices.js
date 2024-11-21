const pool = require('../config/database');

// Função para inserir um novo talão
async function inserirBooklet(numero_remessa, qtd_talao, destinatario, remetente, status) {
    const query = `
        INSERT INTO talao (numero_remessa, qtd_talao, destinatario, remetente, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const valores = [numero_remessa, qtd_talao, destinatario, remetente, status];
    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0];
    } catch (erro) {
        console.error('Erro ao inserir talão:', erro);
        throw erro;
    }
}

// Função para obter todos os talões
async function obterTodosTaloes() {
    const query = 'SELECT * FROM talao';
    try {
        const resultado = await pool.query(query);
        return resultado.rows;
    } catch (erro) {
        console.error('Erro ao obter talões:', erro);
        throw erro;
    }
}

// Função para obter um talão por ID
async function obterTalaoPorId(id) {
    const query = 'SELECT * FROM talao WHERE id = $1';
    try {
        const resultado = await pool.query(query, [id]);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao obter talão por ID:', erro);
        throw erro;
    }
}

// Função para atualizar um talão
async function atualizarTalao(id, numero_remessa, qtd_talao, destinatario, remetente, status) {
    const query = `
        UPDATE talao
        SET numero_remessa = $2, qtd_talao = $3, destinatario = $4, remetente = $5, status = $6
        WHERE id = $1
        RETURNING *;
    `;
    const valores = [id, numero_remessa, qtd_talao, destinatario, remetente, status];
    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao atualizar talão:', erro);
        throw erro;
    }
}

// Função para excluir um talão
async function excluirTalao(id) {
    const query = 'DELETE FROM talao WHERE id = $1 RETURNING *;';
    try {
        const resultado = await pool.query(query, [id]);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao excluir talão:', erro);
        throw erro;
    }
}

module.exports = {inserirBooklet, obterTodosTaloes, obterTalaoPorId, atualizarTalao, excluirTalao };
