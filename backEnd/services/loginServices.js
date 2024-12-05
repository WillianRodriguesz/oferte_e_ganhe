const Usuario = require('../models/userModel'); // Certifique-se de que o caminho está correto
const bcrypt = require('bcrypt');

// Função para validar o usuário
async function validarUsuario(email, senha) {
    try {
        const usuario = await Usuario.findOne({
            where: { email: email }
        });

        if (!usuario) {
            return null;
        }
        
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        // Se a senha for inválida, retorna null
        if (!senhaValida) {
            return null;
        }

        // Retorna os dados do usuário
        return usuario;
    } catch (erro) {
        console.error('Erro ao validar usuário:', erro);
        throw erro;
    }
}

module.exports = {
    validarUsuario
};
