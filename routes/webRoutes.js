const express = require('express');
const router = express.Router();
const webController = require('../controllers/webController');

router.get('/', webController.renderHomePage);
router.get('/produk/:id', webController.renderDetailPage);
router.post('/produk/add', webController.handleCreateProduct);
router.post('/produk/edit/:id', webController.handleUpdateProduct);
router.post('/produk/delete/:id', webController.handleDeleteProduct);

module.exports = router;