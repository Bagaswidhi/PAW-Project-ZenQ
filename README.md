# PAW-Project-ZenQ

## Struktur Direktori Proyek

```text
PAW-Project-ZenQ/
│
├── controllers/          # Berisi logika pengontrol ( webController.js)
├── middlewares/          # Berisi fungsi middleware (loggerMiddleware.js)
├── models/               # Berisi model data ( productModel.js)
├── routes/               # Definisi rute aplikasi
├── utils/                # Fungsi utilitas bantu ( dateFormatter.js)
├── views/                # Berisi file tampilan EJS ( index.ejs)
├── .gitignore            # Berkas pengecualian Git
├── app.js                # Titik masuk utama aplikasi (Entry Point)
├── package.json          # Konfigurasi dependensi proyek
└── README.md             # Dokumentasi proyek


## Instalasi dan Menjalankan Aplikasi
npm install
npm start        # atau: npm run dev (auto-reload, Node 18+)
