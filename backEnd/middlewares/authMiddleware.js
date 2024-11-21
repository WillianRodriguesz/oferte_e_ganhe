const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'SECRET_KEY'; 

// Função de middleware para autenticação via JWT
function authenticateToken(req, res, next) {

    const token = req.header('Authorization')?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ erro: 'Token não fornecido!' }); 
    }
    // Verifica a validade do token
    jwt.verify(token, JWT_SECRET_KEY, (erro, usuario) => {
        if (erro) {
            // Verifica se o erro é de expiração do token
            if (erro.name == 'TokenExpiredError') {
                return res.status(401).json({ erro: 'Token expirado!' }); 
            }
            // Se for qualquer outro erro, trata como um erro de token inválido
            return res.status(403).json({ erro: 'Token inválido!' }); 
        }

        req.user = usuario;
        next(); 
    });
}

module.exports = authenticateToken;
