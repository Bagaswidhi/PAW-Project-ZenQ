const fs = require('fs');
const path = require('path');

const UPLOAD_DIR = path.join(__dirname, '..', 'public', 'uploads');

// Hapus file gambar dari folder uploads. Aman: hanya mengambil nama file (basename).
const removeImage = (gambarPath) => {
  if (!gambarPath) return;
  const file = path.join(UPLOAD_DIR, path.basename(gambarPath));
  fs.unlink(file, () => {}); // abaikan error bila file sudah tidak ada
};

// Path gambar dari file yang baru di-upload (disimpan ke database)
const uploadedPath = (req) => (req.file ? `/uploads/${req.file.filename}` : undefined);

module.exports = { UPLOAD_DIR, removeImage, uploadedPath };
