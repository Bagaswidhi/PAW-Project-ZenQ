const ProductModel = require('../models/productModel');

const getStatus = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server ZenQ Store API berjalan aktif",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
};

const getProducts = (req, res) => {
  try {
    const data = ProductModel.getAll();
    res.status(200).json({
      status: "success",
      total: data.length,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Gagal mengambil data produk"
    });
  }
};

module.exports = {
  getStatus,
  getProducts
};