const express = require('express');
const router = express.Router();
const webController = require('../controllers/webController');

// GET / (Frontend Homepage)
router.get('/', webController.renderHomePage);

module.exports = router;