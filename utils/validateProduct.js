const cleanBody = (body = {}) => {
  const cleaned = {};
  for (const [key, val] of Object.entries(body)) {
    if (typeof val === 'string') {
      cleaned[key] = val.trim();
    } else {
      cleaned[key] = val;
    }
  }
  return cleaned;
};

const validateProduct = (data = {}) => {
  const errors = [];
  if (!data.nama) errors.push('Field nama wajib diisi');
  if (!data.kategori) errors.push('Field kategori wajib diisi');
  if (!data.harga || isNaN(Number(data.harga)) || Number(data.harga) < 0) {
    errors.push('Field harga wajib diisi angka valid');
  }
  if (!data.stok || isNaN(Number(data.stok)) || Number(data.stok) < 0) {
    errors.push('Field stok wajib diisi angka valid');
  }
  return errors;
};

module.exports = {
  cleanBody,
  validateProduct
};
