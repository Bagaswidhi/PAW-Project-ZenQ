const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const { uploadImage } = require('../config/upload');

// GET /api/status
router.get('/status', apiController.getStatus);

// GET /api/produk
router.get('/produk', apiController.getProducts);

// GET /api/produk/:id
router.get('/produk/:id', apiController.getProductById);

// POST /api/produk
router.post('/produk', uploadImage, apiController.createProduct);

// PUT /api/produk/:id
router.put('/produk/:id', uploadImage, apiController.updateProduct);

// DELETE /api/produk/:id
router.delete('/produk/:id', apiController.deleteProduct);

module.exports = router;