const ProductModel = require('../models/productModel');
const { cleanBody, validateProduct } = require('../utils/validateProducts');

const renderHomePage = async (req, res) => {
  try {
    // Tangkap query search dari URL browser
    const { search } = req.query;
    
    // Lempar query tersebut ke Model
    const products = await ProductModel.getAll({ search });
    
    res.render('index', {
      title: 'ZenQ - Teman Pilih Laptop',
      products: products,
      searchQuery: search || '' // Kirim kata kunci kembali ke view agar teks tidak hilang dari input
    });
  } catch (error) {
    res.status(500).send("Gagal memuat halaman: " + error.message);
  }
};

const renderDetailPage = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.getById(id);

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
  } catch (error) {
    res.status(500).send("Terjadi kesalahan sistem: " + error.message);
  }
};

const handleCreateProduct = async (req, res) => {
  try {
    const data = cleanBody(req.body);
    const errors = validateProduct(data);

    if (errors.length > 0) {
      return res.status(400).send("Data tidak valid: " + errors.join(', '));
    }

    await ProductModel.create(data);
    res.redirect('/');
  } catch (error) {
    res.status(500).send("Gagal menambah produk: " + error.message);
  }
};

const handleUpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await ProductModel.getById(id);

    if (!existing) {
      return res.status(404).send(`Produk dengan ID ${id} tidak ditemukan`);
    }

    const merged = { ...existing, ...cleanBody(req.body) };
    const errors = validateProduct(merged);

    if (errors.length > 0) {
      return res.status(400).send("Data tidak valid: " + errors.join(', '));
    }

    await ProductModel.update(id, merged);
    res.redirect('/');
  } catch (error) {
    res.status(500).send("Gagal memperbarui produk: " + error.message);
  }
};

const handleDeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductModel.delete(id);
    res.redirect('/');
  } catch (error) {
    res.status(500).send("Gagal menghapus produk: " + error.message);
  }
};

module.exports = {
  renderHomePage,
  renderDetailPage,
  handleCreateProduct,
  handleUpdateProduct,
  handleDeleteProduct
};
