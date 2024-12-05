const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/src/pages/index.html'));
}); 


module.exports = router;
