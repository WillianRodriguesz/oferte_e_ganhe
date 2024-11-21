const pool = require('../config/database');

//Função para inserir loja
async function inserirLoja(cod_unidade, id_estoque, logradouro, matriz) {
    const query = `
        INSERT INTO loja (cod_unidade, id_estoque, logradouro, matriz)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    const valores = [cod_unidade, id_estoque, logradouro, matriz];

    try {
        const loja = await pool.query(query, valores);
        return loja.rows[0]; // Retorna o usuário inserido
    } catch (erro) {
        console.error('Erro ao inserir usuário:', erro);
        throw erro;
    }
}

async function obterTodasLojas() {
    const query = 'SELECT * FROM loja';

    try {
        const lojas = await pool.query(query);
        return lojas.rows; 
    } catch (erro) {
        console.error('Erro ao obter lojas:', erro);
        throw erro;
    }
}

async function obterLojaId(id) {
    const query = 'SELECT * FROM loja WHERE cod_unidade = $1';

    try {
        const loja = await pool.query(query, [id]);
        return loja.rows.length > 0 ? loja.rows[0] : null; 
    } catch (erro) {
        console.error('Erro ao obter loja por ID:', erro);
        throw erro;
    }
}

async function atualizarLoja(id, cod_unidade, id_estoque, logradouro, matriz) {
    const query = `
        UPDATE loja
        SET cod_unidade = $2, id_estoque = $3, logradouro = $4, matriz = $5
        WHERE cod_unidade = $1
        RETURNING *;
    `;

    const valores = [id, cod_unidade, id_estoque, logradouro, matriz];

    try {
        const loja = await pool.query(query, valores);
        return loja.rows.length > 0 ? loja.rows[0] : null;  
    } catch (erro) {
        console.error('Erro ao atualizar loja:', erro);
        throw erro;
    }
}

async function excluirLoja(id) {
    const query = `
        DELETE FROM loja WHERE cod_unidade = $1 RETURNING *;
    `;
    
    try {
        const loja = await pool.query(query, [id]);
        return loja.rows.length > 0 ? loja.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao excluir loja:', erro);
        throw erro;
    }
}



module.exports = {inserirLoja, obterTodasLojas, obterLojaId, atualizarLoja, excluirLoja};
