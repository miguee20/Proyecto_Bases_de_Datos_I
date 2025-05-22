const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/auth');

router.get('/verify-session', verificarToken, (req, res) => {
    const { rol } = req.usuario;
    res.json({ isAuthenticated: true, rol });
});

module.exports = router;
