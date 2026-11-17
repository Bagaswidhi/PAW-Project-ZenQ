# PAW-Project-ZenQ (ZenQ Store)

> Aplikasi Web Katalog Laptop & Konsultasi Cerdas berbasis **Express.js**, **EJS**, **PostgreSQL**, dan **Google Gemini AI**.  
> Proyek Tugas Praktikum Mata Kuliah Pengembangan Aplikasi Web (PAW) - Kelompok ZenQ.

---

## 🚀 Fitur Utama Aplikasi

1. **Katalog Produk Interaktif (Frontend EJS + Tailwind CSS)**:
   - Menampilkan daftar katalog produk laptop beserta harga, rating, spesifikasi, dan stok.
   - **Filter Pencarian Keyword** (nama, prosesor, deskripsi).
   - **Filter Kategori Cepat (Category Pills)**: Laptop Kuliah, Laptop Editing, Laptop Gaming.
   - Manajemen Produk Lengkap (Create, Read, Update, Delete) melalui Modal responsif.
   - Halaman **Detail Produk** (`/produk/:id`) dan halaman penanganan **404 Not Found**.

2. **ZenQ AI Assistant Chatbot (Google Gemini & RAG Database)**:
   - **Floating Action Chat Widget**: Widget chat interaktif yang melayang di pojok kanan bawah halaman.
   - **Konsultasi Cerdas**: Rekomendasi laptop berbasis data riil katalog dari database PostgreSQL (RAG context).
   - **Guardrail & Validasi Prompt Injection**: Perlindungan sisi server terhadap upaya jailbreak / manipulasi instruksi sistem.
   - **Smart Fallback**: Mode mock otomatis saat API key belum diisi atau kuota habis sehingga aplikasi tetap berjalan lancar.
   - Tombol instan *"Tanya AI tentang Laptop Ini"* pada halaman detail produk.

3. **RESTful API Lengkap**:
   - Endpoint terstandarisasi JSON untuk integrasi sistem dan pengujian API.
   - Middleware Logger otomatis yang mencatat method, URL, status code, dan response time.

---

## 📁 Struktur Direktori Proyek

```text
PAW-Project-ZenQ/
│
├── config/               # Konfigurasi aplikasi (appConfig.js, db.js, gemini.js)
├── controllers/          # Logika controller (apiController.js, chat.controller.js, webController.js)
├── middlewares/          # Middleware Express (loggerMiddleware.js, validateChatInput.js)
├── models/               # Model data database (productModel.js)
├── routes/               # Routing aplikasi (apiRoutes.js, chat.routes.js, webRoutes.js)
├── services/             # Integrasi pihak ketiga / AI (gemini.service.js)
├── utils/                # Fungsi utilitas (dateFormatter.js)
├── views/                # Template tampilan EJS (index.ejs, detail.ejs, 404.ejs)
├── .env.example          # Template konfigurasi environment
├── .gitignore            # Berkas pengecualian Git
├── app.js                # Titik masuk utama aplikasi (Entry Point)
├── package.json          # Konfigurasi dependensi proyek
├── shcema.sql            # Skema basis data PostgreSQL
└── README.md             # Dokumentasi proyek
```

---

## 🔌 Daftar Rute & Endpoint

### 1. Web View (Frontend)
| Method | Rute | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/` | Halaman utama katalog produk dengan filter pencarian & kategori serta widget AI Chatbot. |
| `GET` | `/produk/:id` | Halaman detail produk laptop berdasarkan ID. |
| `POST` | `/produk/add` | Handler penambahan produk baru via form modal. |
| `POST` | `/produk/edit/:id` | Handler pembaruan data produk via form modal. |
| `POST` | `/produk/delete/:id` | Handler penghapusan data produk. |

### 2. REST API & AI Chatbot
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/status` | Cek status kesehatan server API. |
| `GET` | `/api/produk` | Mengambil seluruh data produk (mendukung query `?kategori=...` dan `?search=...`). |
| `GET` | `/api/produk/:id` | Mengambil data 1 produk berdasarkan ID (200 OK / 404 Not Found). |
| `POST` | `/api/produk` | Menambahkan data produk baru via REST API. |
| `PUT` | `/api/produk/:id` | Memperbarui data produk via REST API. |
| `DELETE` | `/api/produk/:id` | Menghapus data produk via REST API. |
| `POST` | `/api/chat` | Endpoint AI Chatbot ZenQ Assistant untuk konsultasi laptop. |

#### Contoh Request `POST /api/chat`:
```json
{
  "message": "Rekomendasi laptop untuk mahasiswa kuliah budget 7 jutaan"
}
```

#### Contoh Response:
```json
{
  "success": true,
  "data": {
    "reply": "Halo! Berikut adalah rekomendasi laptop dari katalog ZenQ Store yang sesuai dengan kebutuhan Anda..."
  }
}
```

---

## 🛠️ Instalasi dan Menjalankan Aplikasi

### 1. Clone Repository & Install Dependensi
```bash
git clone https://github.com/Bagaswidhi/PAW-Project-ZenQ.git
cd PAW-Project-ZenQ
npm install
```

### 2. Konfigurasi Environment (`.env`)
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Sesuaikan konfigurasi database dan API Key pada file `.env`:
```env
PORT=3000

# Konfigurasi Database PostgreSQL
DB_USER=postgres
DB_HOST=localhost
DB_NAME=zenq_db
DB_PASSWORD=password_postgres_kamu
DB_PORT=5432

# Konfigurasi Google Gemini AI
GEMINI_API_KEY=api_key_gemini_kamu
GEMINI_MODEL=gemini-2.5-flash
```

### 3. Setup Basis Data PostgreSQL
Import tabel dan data awal dari file `shcema.sql` ke database `zenq_db` pada PostgreSQL.

### 4. Jalankan Server
```bash
npm start
```
Buka browser pada alamat: **http://localhost:3000**
