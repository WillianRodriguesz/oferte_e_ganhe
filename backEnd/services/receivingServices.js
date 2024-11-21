const pool = require('../config/database');

// Função para inserir um novo log de recebimento
async function inserirLogRecebimento(data_recebimento, talao, observacao) {
    const query = `
        INSERT INTO logrecebimento (data_recebimento, talao, observacao)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const valores = [data_recebimento, talao, observacao];
    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0];
    } catch (erro) {
        console.error('Erro ao inserir log de recebimento:', erro);
        throw erro;
    }
}

// Função para obter todos os logs de recebimento
async function obterTodosLogsRecebimento() {
    const query = 'SELECT * FROM logrecebimento';
    try {
        const resultado = await pool.query(query);
        return resultado.rows;
    } catch (erro) {
        console.error('Erro ao obter logs de recebimento:', erro);
        throw erro;
    }
}

// Função para obter um log de recebimento por ID
async function obterLogRecebimentoPorId(id) {
    const query = 'SELECT * FROM logrecebimento WHERE id = $1';
    try {
        const resultado = await pool.query(query, [id]);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao obter log de recebimento por ID:', erro);
        throw erro;
    }
}

// Função para atualizar um log de recebimento
async function atualizarLogRecebimento(id, data_recebimento, talao, observacao) {
    const query = `
        UPDATE logrecebimento
        SET data_recebimento = $2, talao = $3, observacao = $4
        WHERE id = $1
        RETURNING *;
    `;
    const valores = [id, data_recebimento, talao, observacao];
    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao atualizar log de recebimento:', erro);
        throw erro;
    }
}

// Função para excluir um log de recebimento
async function excluirLogRecebimento(id) {
    const query = 'DELETE FROM logrecebimento WHERE id = $1 RETURNING *;';
    try {
        const resultado = await pool.query(query, [id]);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao excluir log de recebimento:', erro);
        throw erro;
    }
}

module.exports = {inserirLogRecebimento, obterTodosLogsRecebimento, obterLogRecebimentoPorId, atualizarLogRecebimento, excluirLogRecebimento};