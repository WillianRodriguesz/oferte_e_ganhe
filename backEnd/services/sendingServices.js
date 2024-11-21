const pool = require('../config/database');

// Função para inserir um novo registro
async function inserirRegistroEnvio(data_envio, data_prevista, talao, observacao) {
    const query = `
        INSERT INTO logenvio (data_envio, data_prevista, talao, observacao)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const valores = [data_envio, data_prevista, talao, observacao];
    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0];
    } catch (erro) {
        console.error('Erro ao inserir registro:', erro);
        throw erro;
    }
}

// Função para obter todos os registros
async function obterTodosRegistros() {
    const query = 'SELECT * FROM logenvio';
    try {
        const resultado = await pool.query(query);
        return resultado.rows;
    } catch (erro) {
        console.error('Erro ao obter registros:', erro);
        throw erro;
    }
}

// Função para obter um registro por ID
async function obterRegistroPorId(id) {
    const query = 'SELECT * FROM logenvio WHERE id = $1';
    try {
        const resultado = await pool.query(query, [id]);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao obter registro por ID:', erro);
        throw erro;
    }
}

// Função para atualizar um registro
async function atualizarRegistro(id, data_envio, data_prevista, talao, observacao) {
    const query = `
        UPDATE logenvio
        SET data_envio = $2, data_prevista = $3, talao = $4, observacao = $5
        WHERE id = $1
        RETURNING *;
    `;
    const valores = [id, data_envio, data_prevista, talao, observacao];
    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao atualizar registro:', erro);
        throw erro;
    }
}

// Função para excluir um registro
async function excluirRegistro(id) {
    const query = 'DELETE FROM logenvio WHERE id = $1 RETURNING *;';
    try {
        const resultado = await pool.query(query, [id]);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao excluir registro:', erro);
        throw erro;
    }
}

module.exports = {inserirRegistroEnvio, obterTodosRegistros, obterRegistroPorId, atualizarRegistro, excluirRegistro
};