const pool = require('../config/database');

// Função para inserir um novo módulo
async function inserirModulo(nome) {
    const query = `
        INSERT INTO modulos (nome)
        VALUES ($1)
        RETURNING *;
    `;
    const valores = [nome];
    
    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0];
    } catch (erro) {
        console.error('Erro ao inserir módulo:', erro);
        throw erro;
    }
}

// Função para obter todos os módulos
async function buscaTodosModulos() {
    const query = 'SELECT * FROM modulos';
    
    try {
        const resultado = await pool.query(query);
        return resultado.rows;
    } catch (erro) {
        console.error('Erro ao obter módulos:', erro);
        throw erro;
    }
}

// Função para obter um módulo específico por ID
async function buscaModuloId(id) {
    const query = 'SELECT * FROM modulos WHERE id = $1';
    
    try {
        const resultado = await pool.query(query, [id]);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao obter módulo por ID:', erro);
        throw erro;
    }
}

// Função para atualizar um módulo
async function atualizarModulo(id, nome) {
    const query = `
        UPDATE modulos
        SET nome = $2
        WHERE id = $1
        RETURNING *;
    `;
    const valores = [id, nome];
    
    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao atualizar módulo:', erro);
        throw erro;
    }
}

// Função para excluir um módulo
async function excluirModulo(id) {
    const query = 'DELETE FROM modulos WHERE id = $1 RETURNING *;';
    
    try {
        const resultado = await pool.query(query, [id]);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao excluir módulo:', erro);
        throw erro;
    }
}

module.exports = {inserirModulo, buscaTodosModulos, buscaModuloId, atualizarModulo, excluirModulo};
