const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// GET /api/status
router.get('/status', apiController.getStatus);

// GET /api/produk
router.get('/produk', apiController.getProducts);

module.exports = router;