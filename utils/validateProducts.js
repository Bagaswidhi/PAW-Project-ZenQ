// Membersihkan body: string kosong dianggap "tidak diisi" (bukan 0 / teks kosong)
const cleanBody = (body = {}) => {
  const out = {};
  for (const [key, value] of Object.entries(body)) {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed !== '') out[key] = trimmed;
    } else if (value !== undefined && value !== null) {
      out[key] = value;
    }
  }
  return out;
};

const isBlank = (v) => v === undefined || v === null || String(v).trim() === '';

// Mengembalikan array pesan error (kosong = valid)
const validateProduct = (data) => {
  const errors = [];

  ['nama', 'kategori', 'prosesor', 'ram', 'storage'].forEach((f) => {
    if (isBlank(data[f])) errors.push(`Field ${f} wajib diisi`);
  });

  if (isBlank(data.harga) || !Number.isFinite(Number(data.harga)) || Number(data.harga) < 0) {
    errors.push('Harga wajib berupa angka >= 0');
  }

  // stok = 0 adalah nilai valid (stok habis)
  if (isBlank(data.stok) || !Number.isInteger(Number(data.stok)) || Number(data.stok) < 0) {
    errors.push('Stok wajib berupa bilangan bulat >= 0');
  }

  if (!isBlank(data.rating) && !(Number(data.rating) >= 0 && Number(data.rating) <= 5)) {
    errors.push('Rating harus antara 0 sampai 5');
  }

  if (!isBlank(data.terjual) && (!Number.isInteger(Number(data.terjual)) || Number(data.terjual) < 0)) {
    errors.push('Terjual harus bilangan bulat >= 0');
  }

  return errors;
};

module.exports = { cleanBody, validateProduct };
