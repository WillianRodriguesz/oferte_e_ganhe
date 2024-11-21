const pool = require('../config/database'); 
const bcrypt = require('bcrypt'); 

// Função para validar o usuário
async function validarUsuario(email, senha) {
    const query = 'SELECT * FROM usuarios WHERE email = $1'; 
    try {
        const resultado = await pool.query(query, [email]);
        
        if (resultado.rows.length == 0) {
            return null;
        }
        const usuario = resultado.rows[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        
        if (!senhaValida) {
            return null;
        }
        return {
            matricula: usuario.matricula,
            nome: usuario.nome,
            perfil: usuario.perfil, 
        };
    } catch (erro) {
        console.error('Erro ao validar usuário:', erro);
        throw erro;
    }
}

module.exports = {
    validarUsuario
};
