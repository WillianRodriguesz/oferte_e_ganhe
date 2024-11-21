const express = require('express');
const path = require('path');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');


router.get('/relatorios', authenticateToken,  (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/relatorios.html'));
});

module.exports = router;