const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET_KEY = 'SECRET_KEY'; 
const Perfil = require('../models/profileModel');
const Modulos = require('../models/moduleModel');
const PerfilModulos = require('../models/assignProfileModuleModel');
const {validarUsuario, enviarEmail, buscarUsuarioPorEmail, atualizarSenhaPorEmail } = require('../services/loginServices');


const autenticarUsuario = async (req, res) => {
    const { email, senha } = req.body;
    
    try {
        const usuario = await validarUsuario(email, senha);

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

const enviarEmailRedefinicao = async (req, res) => {
    const { email } = req.body;

    try {
        const usuario = await buscarUsuarioPorEmail(email);

        if (!usuario) {
            return res.status(404).json({ erro: 'E-mail não encontrado.' });
        }

        const token = jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: '1h' });

        const link = `${req.protocol}://${req.get('host')}/login/redefinir-senha?token=${token}`;

        const mensagem = `
            Olá, ${usuario.nome}.
            
            Recebemos uma solicitação para redefinir sua senha.
            Clique no link abaixo para continuar:
            
            ${link}
        `;

        // Chamando a função 'enviarEmail' do loginService
        await enviarEmail(email, 'Redefinição de Senha', mensagem);

        res.status(200).json({ mensagem: 'E-mail de redefinição enviado com sucesso!' });
    } catch (erro) {
        console.error('Erro ao enviar e-mail de redefinição:', erro);
        res.status(500).json({ erro: 'Erro ao processar a solicitação.' });
    }
};

const redefinirSenha = async (req, res) => {
    const { token, novaSenha } = req.body;

    try {
        console.log('Token recebido:', token);

        // Verifique se o token existe no body
        if (!token) {
            return res.status(400).json({ erro: 'Token não informado.' });
        }

        const decoded = jwt.verify(token, JWT_SECRET_KEY);

        if (!decoded || !decoded.email) {
            return res.status(400).json({ erro: 'Token inválido ou expirado.' });
        }

        const { email } = decoded;

        const usuario = await buscarUsuarioPorEmail(email);

        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }

        const senhaHash = await bcrypt.hash(novaSenha, 10);

        const resultado = await atualizarSenhaPorEmail(email, senhaHash);

        if (!resultado) {
            return res.status(500).json({ erro: 'Erro ao atualizar senha no banco.' });
        }

        res.status(200).json({ mensagem: 'Senha redefinida com sucesso.' });
    } catch (erro) {
        console.error('Erro ao redefinir senha:', erro);
        if (erro.name === 'TokenExpiredError') {
            return res.status(401).json({ erro: 'Token expirado.' });
        }

        res.status(400).json({ erro: 'Erro ao processar o token.' });
    }
};

module.exports = { autenticarUsuario, logoutUsuario, enviarEmailRedefinicao, redefinirSenha };
