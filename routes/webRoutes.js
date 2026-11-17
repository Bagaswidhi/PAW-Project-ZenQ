const express = require('express');
const router = express.Router();
const webController = require('../controllers/webController');
const { uploadImage } = require('../config/upload');

router.get('/', webController.renderHomePage);
router.get('/produk/:id', webController.renderDetailPage);
router.post('/produk/add', uploadImage, webController.handleCreateProduct);
router.post('/produk/edit/:id', uploadImage, webController.handleUpdateProduct);
router.post('/produk/add', webController.handleCreateProduct);
router.post('/produk/edit/:id', webController.handleUpdateProduct);
router.post('/produk/delete/:id', webController.handleDeleteProduct);

module.exports = router;