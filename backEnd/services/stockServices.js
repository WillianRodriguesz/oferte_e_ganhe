const pool = require('../config/database');

// Função para inserir um novo registro no estoque
async function inserirEstoque(qtd_atual, qtd_minima, qtd_maxima, status) {
    const query = `
        INSERT INTO estoque (qtd_atual, qtd_minima, qtd_maxima, status)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const valores = [qtd_atual, qtd_minima, qtd_maxima, status];
    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0];
    } catch (erro) {
        console.error('Erro ao inserir item no estoque:', erro);
        throw erro;
    }
}

// Função para obter todos os registros de estoque
async function obterTodosEstoques() {
    const query = 'SELECT * FROM estoque';
    try {
        const resultado = await pool.query(query);
        return resultado.rows;
    } catch (erro) {
        console.error('Erro ao obter estoque:', erro);
        throw erro;
    }
}

// Função para obter um item de estoque por ID
async function obterEstoqueId(id) {
    const query = 'SELECT * FROM estoque WHERE id = $1';
    try {
        const resultado = await pool.query(query, [id]);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao obter item do estoque por ID:', erro);
        throw erro;
    }
}

// Função para atualizar um item de estoque
async function atualizarEstoque(id, qtd_atual, qtd_minima, qtd_maxima, status) {
    const query = `
        UPDATE estoque
        SET qtd_atual = $2, qtd_minima = $3, qtd_maxima = $4, status = $5
        WHERE id = $1
        RETURNING *;
    `;
    const valores = [id, qtd_atual, qtd_minima, qtd_maxima, status];
    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao atualizar item do estoque:', erro);
        throw erro;
    }
}

// Função para excluir um item de estoque
async function excluirEstoque(id) {
    const query = 'DELETE FROM estoque WHERE id = $1 RETURNING *;';
    try {
        const resultado = await pool.query(query, [id]);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao excluir item do estoque:', erro);
        throw erro;
    }
}

module.exports = {inserirEstoque, obterTodosEstoques, obterEstoqueId, atualizarEstoque, excluirEstoque};
