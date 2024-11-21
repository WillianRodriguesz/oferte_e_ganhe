const jwt = require('jsonwebtoken');
const loginService = require('../services/loginServices');
const JWT_SECRET_KEY = 'SECRET_KEY'; 

const autenticarUsuario = async (req, res) => {
    const { email, senha } = req.body;
    
    try {
        // Valida o usuário
        const usuario = await loginService.validarUsuario(email, senha);

        if (!usuario) {
            return res.status(401).json({ erro: 'Credenciais inválidas' });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { matricula: usuario.matricula, nome: usuario.nome, perfil: usuario.perfil },
            JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Configura o token no cookie
        res.cookie('auth_token', token, {
            httpOnly: true, 
            secure: false,  
            maxAge: 60 * 60 * 1000 
        });

        res.status(200).json({ mensagem: 'Autenticado com sucesso!' });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro no servidor' });
    }
};

module.exports = { autenticarUsuario };