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

const getProductId = req => Number(req.params.id);

const isValidProductId = id => Number.isInteger(id) && id > 0;

const isValidBody = body => body && typeof body === "object" && !Array.isArray(body);

const createProduct = (req, res) => {
  if (!isValidBody(req.body) || !req.body.nama) {
    return res.status(400).json({
      status: "error",
      message: "Field nama wajib diisi"
    });
  }

  const product = ProductModel.create(req.body);
  return res.status(201).json({
    status: "success",
    message: "Produk berhasil ditambahkan",
    data: product
  });
};

const updateProduct = (req, res) => {
  const id = getProductId(req);

  if (!isValidProductId(id)) {
    return res.status(400).json({
      status: "error",
      message: "ID produk tidak valid"
    });
  }

  if (!isValidBody(req.body) || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "Data produk wajib diisi"
    });
  }

  const product = ProductModel.update(id, req.body);

  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "Produk tidak ditemukan"
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Produk berhasil diperbarui",
    data: product
  });
};

const deleteProduct = (req, res) => {
  const id = getProductId(req);

  if (!isValidProductId(id)) {
    return res.status(400).json({
      status: "error",
      message: "ID produk tidak valid"
    });
  }

  const product = ProductModel.delete(id);

  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "Produk tidak ditemukan"
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Produk berhasil dihapus",
    data: product
  });
};

module.exports = {
  getStatus,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};