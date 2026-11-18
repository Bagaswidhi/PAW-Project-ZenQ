// Konfigurasi upload gambar produk (multer). File disimpan di public/uploads,
// sedangkan database hanya menyimpan path-nya (kolom products.gambar).
const multer = require('multer');
const crypto = require('crypto');
const { UPLOAD_DIR } = require('../utils/filehelper');

const EXT_BY_MIME = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp'
};

const MAX_SIZE_MB = 2;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  // Nama file dibuat acak; ekstensi diambil dari tipe file, bukan dari nama asli
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${EXT_BY_MIME[file.mimetype]}`)
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (EXT_BY_MIME[file.mimetype]) return cb(null, true);
    cb(new Error('Format gambar harus JPG, PNG, atau WEBP'));
  }
}).single('gambar');

// Middleware pembungkus agar error upload tampil rapi (JSON untuk /api, teks untuk web)
const uploadImage = (req, res, next) => {
  upload(req, res, (err) => {
    if (!err) return next();

    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? `Ukuran gambar maksimal ${MAX_SIZE_MB} MB`
        : err.message;

    if (req.originalUrl.startsWith('/api')) {
      return res.status(400).json({ status: 'fail', message });
    }
    return res.status(400).send('Gagal upload gambar: ' + message);
  });
};

module.exports = { uploadImage };
