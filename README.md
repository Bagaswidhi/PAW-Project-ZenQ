# PAW-Project-ZenQ

## Struktur Direktori Proyek

```text
PAW-Project-ZenQ/
│
├── config/               # Konfigurasi aplikasi (appConfig.js)
├── controllers/          # Logika controller (apiController.js, webController.js)
├── middlewares/          # Middleware Express (loggerMiddleware.js)
├── models/               # Model data (productModel.js)
├── routes/               # Routing aplikasi (apiRoutes.js, webRoutes.js)
├── utils/                # Fungsi utilitas (dateFormatter.js)
├── views/                # Template tampilan EJS (index.ejs, detail.ejs, 404.ejs)
├── .gitignore            # Berkas pengecualian Git
├── app.js                # Titik masuk utama aplikasi (Entry Point)
├── package.json          # Konfigurasi dependensi proyek
└── README.md             # Dokumentasi proyek
```

## Daftar Endpoint CRUD

### 1. Web View (Frontend)
- `GET /` — Menampilkan katalog seluruh produk (homepage).
- `GET /produk/:id` — Menampilkan halaman detail produk berdasarkan ID.

### 2. REST API
- `GET /api/status` — Cek status server API.
- `GET /api/produk` — Mengambil seluruh data produk (mendukung filter query `?kategori=...` dan `?search=...`).
- `GET /api/produk/:id` — Mengambil data 1 produk berdasarkan ID (mengembalikan status `200` jika ditemukan, atau `404` jika tidak ada).
- `POST /api/produk` — Menambahkan produk baru (field `nama` wajib diisi).
- `PUT /api/produk/:id` — Memperbarui produk berdasarkan ID.
- `DELETE /api/produk/:id` — Menghapus produk berdasarkan ID.

Data produk saat ini disimpan di memori aplikasi, sehingga kembali ke data awal ketika server dijalankan ulang.

## Instalasi dan Menjalankan Aplikasi
```bash
npm install
npm start
```
