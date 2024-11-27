const Usuario = require('../models/userModel'); // Certifique-se de que o caminho está correto
const bcrypt = require('bcrypt');

// Função para validar o usuário
async function validarUsuario(email, senha) {
    try {
        // Encontrando o usuário pelo email
        const usuario = await Usuario.findOne({
            where: { email: email }
        });

        // Se o usuário não existir, retorna null
        if (!usuario) {
            return null;
        }

        // Compara a senha fornecida com a senha armazenada no banco
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        // Se a senha for inválida, retorna null
        if (!senhaValida) {
            return null;
        }

        // Retorna os dados do usuário
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
