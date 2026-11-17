CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(150) NOT NULL,
    kategori VARCHAR(50) NOT NULL,
    prosesor VARCHAR(100) NOT NULL,
    ram VARCHAR(20) NOT NULL,
    storage VARCHAR(50) NOT NULL,
    harga NUMERIC(12, 2) NOT NULL,
    rating NUMERIC(3, 1) DEFAULT 4.5,
    terjual INT DEFAULT 0,
    stok INT NOT NULL,
    deskripsi TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (nama, kategori, prosesor, ram, storage, harga, rating, terjual, stok, deskripsi) VALUES
('Lenovo IdeaPad Slim 3', 'Laptop Kuliah', 'Intel Core i3', '8GB', '512GB SSD', 7299000.00, 4.8, 120, 15, 'Baterai tahan 8 jam & keyboard nyaman untuk ngetik lama.'),
('ASUS Vivobook Go 14', 'Laptop Kuliah', 'AMD Ryzen 3', '8GB', '512GB SSD', 6899000.00, 4.7, 85, 10, 'Laptop ringan (1.3 kg), enak dibawa ke kampus.'),
('Acer Aspire Lite', 'Laptop Kuliah', 'Intel N100', '8GB', '256GB SSD', 6499000.00, 4.5, 45, 8, 'Desain simpel dan hemat daya untuk komputasi harian.'),
('HP Laptop 14', 'Laptop Editing', 'AMD Ryzen 5', '16GB', '512GB SSD', 8099000.00, 4.9, 60, 5, 'Performa tinggi untuk multitasking dan editing video ringan.');