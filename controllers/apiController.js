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
    const { kategori, search } = req.query;
    const data = ProductModel.getAll({ kategori, search });
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

const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = ProductModel.getById(id);

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: `Produk dengan ID ${id} tidak ditemukan`
      });
    }

    res.status(200).json({
      status: "success",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Gagal mengambil detail produk"
    });
  }
};

module.exports = {
  getStatus,
  getProducts,
  getProductById
};