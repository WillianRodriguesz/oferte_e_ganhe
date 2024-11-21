const pool = require('../config/database');

// Função para inserir um novo endereço
async function inserirEndereco(estado, cidade, cep, bairro, endereco, numero) {
    const query = `
        INSERT INTO logradouro (estado, cidade, cep, bairro, endereco, numero)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const values = [estado, cidade, cep, bairro, endereco, numero];
    
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao inserir endereço:', error);
        throw error;
    }
}

// Função para obter todos os endereços
async function buscaTodosEnderecos() {
    const query = 'SELECT * FROM logradouro';
    
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Erro ao obter endereços:', error);
        throw error;
    }
}

// Função para obter um endereço específico por ID
async function buscaEnderecoId(id) {
    const query = 'SELECT * FROM logradouro WHERE id = $1';
    
    try {
        const result = await pool.query(query, [id]);
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error('Erro ao obter endereço por ID:', error);
        throw error;
    }
}

// Função para atualizar um endereço
async function atualizarEndereco(id, estado, cidade, cep, bairro, endereco, numero) {
    const query = `
        UPDATE logradouro
        SET estado = $2, cidade = $3, cep = $4, bairro = $5, endereco = $6, numero = $7
        WHERE id = $1
        RETURNING *;
    `;
    const values = [id, estado, cidade, cep, bairro, endereco, numero];
    
    try {
        const result = await pool.query(query, values);
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error('Erro ao atualizar endereço:', error);
        throw error;
    }
}

// Função para excluir um endereço
async function excluirEndereco(id) {
    const query = 'DELETE FROM logradouro WHERE id = $1 RETURNING *;';
    
    try {
        const result = await pool.query(query, [id]);
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error('Erro ao excluir endereço:', error);
        throw error;
    }
}

module.exports = {inserirEndereco, buscaTodosEnderecos, buscaEnderecoId, atualizarEndereco, excluirEndereco};
