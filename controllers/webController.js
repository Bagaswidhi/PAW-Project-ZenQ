const ProductModel = require('../models/productModel');

const renderHomePage = (req, res) => {
  const products = ProductModel.getAll();
  res.render('index', {
    title: 'ZenQ Store - Teman Pilih Laptop',
    products: products
  });
};

module.exports = {
  renderHomePage
};