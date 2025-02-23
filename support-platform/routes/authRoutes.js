const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
    console.log('Register request received:', req.body);
    res.json({ message: 'Реєстрація успішна' });
});

module.exports = router;
