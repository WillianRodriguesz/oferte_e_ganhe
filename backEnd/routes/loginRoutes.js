const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/login.html'));
});

module.exports = router;