const pool = require('../config/database');

// Função para associar um perfil a um módulo
async function associarPerfilModulo(perfil_id, modulo_id) {
    const query = `
        INSERT INTO perfilmodulos (perfil_id, modulo_id)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const valores = [perfil_id, modulo_id];
    
    try {
        const resultado = await pool.query(query, valores);
        return resultado.rows[0];
    } catch (erro) {
        console.error('Erro ao associar perfil ao módulo:', erro);
        throw erro;
    }
}

// Função para obter todas as associações de perfis a módulos
async function buscaTodosPerfisModulos() {
    const query = 'SELECT * FROM perfilmodulos';
    
    try {
        const resultado = await pool.query(query);
        return resultado.rows;
    } catch (erro) {
        console.error('Erro ao obter associações de perfis a módulos:', erro);
        throw erro;
    }
}

// Função para obter uma associação de perfil a módulo por ID
async function buscaPerfilModuloId(id) {
    const query = 'SELECT * FROM perfilmodulos WHERE id = $1';
    
    try {
        const resultado = await pool.query(query, [id]);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao obter associação de perfil a módulo por ID:', erro);
        throw erro;
    }
}

// Função para excluir uma associação de perfil a módulo
async function excluirPerfilModulo(id) {
    const query = 'DELETE FROM perfilmodulos WHERE id = $1 RETURNING *;';
    
    try {
        const resultado = await pool.query(query, [id]);
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    } catch (erro) {
        console.error('Erro ao excluir associação de perfil a módulo:', erro);
        throw erro;
    }
}

module.exports = {associarPerfilModulo, buscaTodosPerfisModulos, buscaPerfilModuloId, excluirPerfilModulo};
