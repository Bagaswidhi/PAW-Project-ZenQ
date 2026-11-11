const express = require('express');
const router = express.Router();
const webController = require('../controllers/webController');

// GET / (Frontend Homepage)
router.get('/', webController.renderHomePage);

// GET /produk/:id (Frontend Detail Page)
router.get('/produk/:id', webController.renderDetailPage);

module.exports = router;