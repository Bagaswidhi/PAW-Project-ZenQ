const express = require('express');
const router = express.Router();
const validateChatInput = require('../middlewares/validateChatInput');
const chatController = require('../controllers/chat.controller');

// POST /api/chat
router.post('/', validateChatInput, chatController.chat);

module.exports = router;