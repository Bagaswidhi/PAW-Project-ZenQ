const ProductModel = require('../models/productModel');

const renderHomePage = (req, res) => {
  const products = ProductModel.getAll();
  res.render('index', {
    title: 'ZenQ Store - Teman Pilih Laptop',
    products: products
  });
};

const renderDetailPage = (req, res) => {
  const { id } = req.params;
  const product = ProductModel.getById(id);

  if (!product) {
    return res.status(404).render('404', {
      title: 'Produk Tidak Ditemukan - ZenQ Store',
      message: `Produk dengan ID #${id} tidak ditemukan.`
    });
  }

  res.render('detail', {
    title: `${product.nama} - ZenQ Store`,
    product: product
  });
};

module.exports = {
  renderHomePage,
  renderDetailPage
};