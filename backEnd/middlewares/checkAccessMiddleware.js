const Perfil = require('../models/profileModel');
const Modulos = require('../models/moduleModel');
const PerfilModulos = require('../models/assignProfileModuleModel');

async function verificarPermissao(req, res, next) {
    try {
        const { perfil } = req.user; // Extraído do token JWT
        console.log(perfil);
        
        if (!perfil) {
            return res.status(401).json({ erro: 'Perfil do usuário não fornecido no token.' });
        }

        // Verifica se o perfil do usuário existe no banco
        const perfilUsuario = await Perfil.findOne({
             where: { id: perfil } 
        });

        if (!perfilUsuario) {
            return res.status(404).json({ erro: 'Perfil do usuário não encontrado.' });
        }

        // Extrai o nome do módulo solicitado da URL
        const moduloSolicitado = req.originalUrl.split('/')[1];
        const modulo = await Modulos.findOne({ where: { nome: moduloSolicitado } });

        if (!modulo) {
            return res.status(404).json({ erro: `Módulo '${moduloSolicitado}' não encontrado.` });
        }

        // Verifica se o perfil do usuário tem acesso ao módulo
        const acesso = await PerfilModulos.findOne({
            where: { perfil_id: perfilUsuario.id, modulo_id: modulo.id },
        });

        if (!acesso) {
            return res.status(403).json({ erro: `Acesso negado ao módulo '${moduloSolicitado}'.` });
        }

        next(); 
    } catch (erro) {
        console.error('Erro no middleware de autorização:', erro);
        res.status(500).json({ erro: 'Erro no servidor ao verificar permissão.' });
    }
}

module.exports = verificarPermissao;
