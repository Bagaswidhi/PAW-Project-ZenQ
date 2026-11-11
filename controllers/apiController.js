const ProductModel = require('../models/productModel');

const getStatus = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server ZenQ API berjalan aktif",
    database: "PostgreSQL",
    timestamp: new Date().toISOString()
  });
};

const getProducts = async (req, res) => {
  try {
    const { kategori, search } = req.query;
    const products = await ProductModel.getAll({ kategori, search });
    
    res.status(200).json({
      status: "success",
      total: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Gagal mengambil data produk dari database",
      error: error.message
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.getById(id);
    
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
      message: "Gagal mengambil detail produk",
      error: error.message
    });
  }
};

// POST /api/produk
const createProduct = async (req, res) => {
  try {
    const { nama, kategori, prosesor, ram, storage, harga, stok } = req.body;

    if (!nama || !kategori || !harga || !stok) {
      return res.status(400).json({
        status: "fail",
        message: "Field nama, kategori, harga, dan stok wajib diisi"
      });
    }

    const newProduct = await ProductModel.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Produk berhasil ditambahkan ke database",
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Gagal menambah produk",
      error: error.message
    });
  }
};

// PUT /api/produk/:id
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await ProductModel.getById(id);

    if (!existing) {
      return res.status(404).json({
        status: "fail",
        message: `Produk dengan ID ${id} tidak ditemukan`
      });
    }

    const updatedProduct = await ProductModel.update(id, { ...existing, ...req.body });
    res.status(200).json({
      status: "success",
      message: "Data produk berhasil diperbarui",
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Gagal memperbarui produk",
      error: error.message
    });
  }
};

// DELETE /api/produk/:id
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await ProductModel.delete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        status: "fail",
        message: `Produk dengan ID ${id} tidak ditemukan`
      });
    }

    res.status(200).json({
      status: "success",
      message: "Produk berhasil dihapus dari database",
      data: deletedProduct
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Gagal menghapus produk",
      error: error.message
    });
  }
};

module.exports = {
  getStatus,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};