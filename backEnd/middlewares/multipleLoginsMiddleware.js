const jwt = require('jsonwebtoken');

const preventMultipleLogins = (req, res, next) => {
    const token = req.cookies.auth_token;

    if (!token) {
        console.log('Token ausente, redirecionando para a página de login.');
        return next();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            console.log('Token inválido ou expirado:', err.message);
            return next();
        }

        console.log('Token válido, redirecionando para /home.');
        return res.redirect('/home');
    });
};

module.exports = preventMultipleLogins;
