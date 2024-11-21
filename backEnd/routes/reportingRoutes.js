const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/relatorios', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/relatorios.html'));
});

module.exports = router;