const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// GET /api/status
router.get('/status', apiController.getStatus);

// GET /api/produk
router.get('/produk', apiController.getProducts);

// GET /api/produk/:id
router.get('/produk/:id', apiController.getProductById);

module.exports = router;