
async function verificarPermissao(req, res, next) {
    try {
        const { perfil, modulos } = req.user; // Extraído do token JWT
        console.log(perfil, modulos);
        
        if (!perfil) {
            return res.status(401).json({ erro: 'Perfil do usuário não fornecido no token.' });
        }

        if (!modulos || modulos.length == 0) {
            return res.status(401).json({ erro: 'Nenhum módulo associado ao perfil no token.' });
        }

        // Extrai o nome do módulo solicitado da URL
        const moduloSolicitado = req.originalUrl.split('/')[1];

        // Verifica se o módulo solicitado está na lista de módulos do perfil 
        if (!modulos.includes(moduloSolicitado)) {
            return res.status(403).json({ erro: `Acesso negado ao módulo '${moduloSolicitado}'.` });
        }

        next(); 
    } catch (erro) {
        console.error('Erro no middleware de autorização:', erro);
        res.status(500).json({ erro: 'Erro no servidor ao verificar permissão.' });
    }
}

module.exports = verificarPermissao;
