const Usuario = require('../models/userModel'); 
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


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

        if (!senhaValida) {
            return null;
        }

        return usuario;
    } catch (erro) {
        console.error('Erro ao validar usuário:', erro);
        throw erro;
    }
}

// Função para buscar usuário por email
async function buscarUsuarioPorEmail(email) {
    try {
        const usuario = await Usuario.findOne({
            where: { email: email }
        });

        if (!usuario) {
            return null;
        }

        return usuario;
    } catch (erro) {
        console.error('Erro ao buscar usuário por email:', erro);
        throw erro;
    }
}


async function enviarEmail(email, subject, message) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ADICIONAR SEU EMAIL AQUI', 
                pass: 'ADICIONAR SEU TOKEN AQUI', 
            },
        });

        const mailOptions = {
            from: 'ADICIONAR SEU EMAIL AQUI',
            to: email,
            subject: subject,
            text: message,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        throw error;
    }
}

// Função para atualizar a senha no banco de dados
async function atualizarSenhaPorEmail(email, senhaHash) {
    try {
        const resultado = await Usuario.update(
            { senha: senhaHash }, 
            { where: { email } }
        );

        return resultado[0] > 0;
    } catch (erro) {
        console.error('Erro ao atualizar senha no banco:', erro);
        throw erro;
    }
}

module.exports = {
    validarUsuario,
    buscarUsuarioPorEmail,
    enviarEmail,
    atualizarSenhaPorEmail
};
