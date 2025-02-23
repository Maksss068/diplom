const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { saveMessage, getMessages } = require('../models/Chat');
const router = express.Router();
router.post('/send', authMiddleware, async (req, res) => {
const { message } = req.body;
try {
const savedMessage = await saveMessage(req.user.userId,
message);
res.json(savedMessage);
} catch (error) {
res.status(500).json({ message: 'Помилка сервера' });
}
});
router.get('/messages', async (req, res) => {
try {
const messages = await getMessages();
res.json(messages);
} catch (error) {
res.status(500).json({ message: 'Помилка сервера' });
}
});
module.exports = router;