const ProductModel = require('../models/productModel');
const { cleanBody, validateProduct } = require('../utils/validateProduct');
const { removeImage, uploadedPath } = require('../utils/filehelper');

// GET /api/status
const getStatus = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server ZenQ API berjalan dengan baik",
    timestamp: new Date().toISOString()
  });
};

// GET /api/produk
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
      message: "Gagal mengambil data produk",
      error: error.message
    });
  }
};

// GET /api/produk/:id
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

// POST /api/produk (JSON atau multipart/form-data dengan field file "gambar")
const createProduct = async (req, res) => {
  const gambar = uploadedPath(req);
  try {
    const data = cleanBody(req.body);
    const errors = validateProduct(data);

    if (errors.length > 0) {
      removeImage(gambar);
      return res.status(400).json({
        status: "fail",
        message: errors.join(', ')
      });
    }

    const newProduct = await ProductModel.create({ ...data, gambar });
    res.status(201).json({
      status: "success",
      message: "Produk berhasil ditambahkan ke database",
      data: newProduct
    });
  } catch (error) {
    removeImage(gambar);
    res.status(500).json({
      status: "error",
      message: "Gagal menambah produk",
      error: error.message
    });
  }
};

// PUT /api/produk/:id (JSON atau multipart/form-data dengan field file "gambar")
const updateProduct = async (req, res) => {
  const newImage = uploadedPath(req);
  try {
    const { id } = req.params;
    const existing = await ProductModel.getById(id);

    if (!existing) {
      removeImage(newImage);
      return res.status(404).json({
        status: "fail",
        message: `Produk dengan ID ${id} tidak ditemukan`
      });
    }

    const merged = { ...existing, ...cleanBody(req.body), gambar: newImage || existing.gambar };
    const errors = validateProduct(merged);

    if (errors.length > 0) {
      removeImage(newImage);
      return res.status(400).json({
        status: "fail",
        message: errors.join(', ')
      });
    }

    const updatedProduct = await ProductModel.update(id, merged);
    if (newImage) removeImage(existing.gambar); // hapus gambar lama setelah berhasil diganti

    res.status(200).json({
      status: "success",
      message: "Data produk berhasil diperbarui",
      data: updatedProduct
    });
  } catch (error) {
    removeImage(newImage);
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

    removeImage(deletedProduct.gambar);

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
