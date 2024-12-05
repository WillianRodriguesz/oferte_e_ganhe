const jwt = require('jsonwebtoken');
const loginService = require('../services/loginServices');
const Perfil = require('../models/profileModel');
const Modulos = require('../models/moduleModel');
const PerfilModulos = require('../models/assignProfileModuleModel');
const JWT_SECRET_KEY = 'SECRET_KEY'; 

const autenticarUsuario = async (req, res) => {
    const { email, senha } = req.body;
    
    try {
        const usuario = await loginService.validarUsuario(email, senha);

        if (!usuario) {
            return res.status(401).json({ erro: 'Credenciais inválidas' });
        }

        // Busca o perfil do usuário
        const perfilUsuario = await Perfil.findOne({
            where: { id: usuario.perfil }
        });

        if (!perfilUsuario) {
            return res.status(404).json({ erro: 'Perfil do usuário não encontrado.' });
        }

        // Busca os módulos associados ao perfil do usuário
        const modulos = await PerfilModulos.findAll({
            where: { perfil_id: perfilUsuario.id },
            include: [{ model: Modulos, attributes: ['nome'] }]
        });

        const modulosNome = modulos.map(modulo => modulo.Modulo.nome);  

        // Informações do usuario
        const user = {
            matricula: usuario.matricula, 
            nome: usuario.nome, 
            id_loja: usuario.id_loja,
            perfil: usuario.perfil, 
            nomePerfil: perfilUsuario.nome, 
            modulos: modulosNome,
            status: usuario.status, 
        }
        // Gera o token JWT com as informações necessárias
        const token = jwt.sign(
            {  
                perfil: usuario.perfil, 
                nomePerfil: perfilUsuario.nome, 
                modulos: modulosNome 
            },
            JWT_SECRET_KEY,
            { expiresIn: '12h' }
        );

        // Configura o token no cookie
        res.cookie('auth_token', token, {
            httpOnly: true, 
            secure: false,
            path: '/',   
            maxAge: 60 * 60 * 1000, 
        });

        res.status(200).json({ mensagem: 'Autenticado com sucesso!', token: token, usuario: user });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro no servidor' });
    }
};

const logoutUsuario = (req, res) => {
    try {
        // Remove o cookie auth_token
        res.clearCookie('auth_token');
        res.status(200).json({ mensagem: 'Logout realizado com sucesso!' });
    } catch (erro) {
        console.error('Erro ao realizar logout:', erro);
        res.status(500).json({ erro: 'Erro no servidor' });
    }
};

module.exports = { autenticarUsuario, logoutUsuario };
