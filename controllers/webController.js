const ProductModel = require('../models/productModel');
const { cleanBody, validateProduct } = require('../utils/validateProduct');
const { removeImage, uploadedPath } = require('../utils/filehelper');

const renderHomePage = async (req, res) => {
  try {
<<<<<<< HEAD
    // Tangkap query search dari URL browser
    const { search } = req.query;
    
    // Lempar query tersebut ke Model
    const products = await ProductModel.getAll({ search });
=======
    // Tangkap query search dan kategori dari URL browser
    const { search, kategori } = req.query;
    
    // Lempar query tersebut ke Model
    const products = await ProductModel.getAll({ search, kategori });
>>>>>>> ef0b5f9b682ecb052db9c4e7e66a9214729a0064
    
    res.render('index', {
      title: 'ZenQ - Teman Pilih Laptop',
      products: products,
<<<<<<< HEAD
      searchQuery: search || '' // Kirim kata kunci kembali ke view agar teks tidak hilang dari input
=======
      searchQuery: search || '', // Kirim kata kunci kembali ke view agar teks tidak hilang dari input
      currentKategori: kategori || 'Semua'
>>>>>>> ef0b5f9b682ecb052db9c4e7e66a9214729a0064
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
<<<<<<< HEAD
  const gambar = uploadedPath(req);
  try {
    const data = cleanBody(req.body);
    const errors = validateProduct(data);

    if (errors.length > 0) {
      removeImage(gambar);
      return res.status(400).send("Data tidak valid: " + errors.join(', '));
    }

    await ProductModel.create({ ...data, gambar });
    res.redirect('/');
  } catch (error) {
    removeImage(gambar);
=======
  try {
    await ProductModel.create(req.body);
    res.redirect('/');
  } catch (error) {
>>>>>>> ef0b5f9b682ecb052db9c4e7e66a9214729a0064
    res.status(500).send("Gagal menambah produk: " + error.message);
  }
};

const handleUpdateProduct = async (req, res) => {
<<<<<<< HEAD
  const newImage = uploadedPath(req);
  try {
    const { id } = req.params;
    const existing = await ProductModel.getById(id);

    if (!existing) {
      removeImage(newImage);
      return res.status(404).send(`Produk dengan ID ${id} tidak ditemukan`);
    }

    const merged = { ...existing, ...cleanBody(req.body), gambar: newImage || existing.gambar };
    const errors = validateProduct(merged);

    if (errors.length > 0) {
      removeImage(newImage);
      return res.status(400).send("Data tidak valid: " + errors.join(', '));
    }

    await ProductModel.update(id, merged);
    if (newImage) removeImage(existing.gambar); // hapus gambar lama setelah berhasil diganti
    res.redirect('/');
  } catch (error) {
    removeImage(newImage);
=======
  try {
    const { id } = req.params;
    await ProductModel.update(id, req.body);
    res.redirect('/');
  } catch (error) {
>>>>>>> ef0b5f9b682ecb052db9c4e7e66a9214729a0064
    res.status(500).send("Gagal memperbarui produk: " + error.message);
  }
};

const handleDeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
<<<<<<< HEAD
    const deleted = await ProductModel.delete(id);
    if (deleted) removeImage(deleted.gambar);
=======
    await ProductModel.delete(id);
>>>>>>> ef0b5f9b682ecb052db9c4e7e66a9214729a0064
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