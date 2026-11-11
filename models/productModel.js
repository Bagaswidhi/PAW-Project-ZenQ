const pool = require('../config/db');

class ProductModel {
  // GET /api/produk - Mendukung filter pencarian
  static async getAll(filters = {}) {
    let query = 'SELECT * FROM products WHERE 1=1';
    const values = [];
    let paramIndex = 1;

    // Filter by Kategori
    if (filters && filters.kategori) {
      query += ` AND LOWER(kategori) = LOWER($${paramIndex})`;
      values.push(filters.kategori);
      paramIndex++;
    }

    // Search by Keyword (nama, deskripsi, atau prosesor)
    if (filters && filters.search) {
      query += ` AND (LOWER(nama) LIKE LOWER($${paramIndex}) OR LOWER(deskripsi) LIKE LOWER($${paramIndex}) OR LOWER(prosesor) LIKE LOWER($${paramIndex}))`;
      values.push(`%${filters.search}%`);
      paramIndex++;
    }

    query += ' ORDER BY id ASC';
    const { rows } = await pool.query(query, values);
    return rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM products WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async create(data) {
    const { nama, kategori, prosesor, ram, storage, harga, rating, terjual, stok, deskripsi } = data;
    const query = `
      INSERT INTO products (nama, kategori, prosesor, ram, storage, harga, rating, terjual, stok, deskripsi)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;
    const values = [
      nama, kategori, prosesor, ram, storage, Number(harga),
      rating ? Number(rating) : 4.5, terjual ? Number(terjual) : 0, Number(stok), deskripsi || ''
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async update(id, data) {
    const { nama, kategori, prosesor, ram, storage, harga, rating, terjual, stok, deskripsi } = data;
    const query = `
      UPDATE products
      SET nama = $1, kategori = $2, prosesor = $3, ram = $4, storage = $5,
          harga = $6, rating = $7, terjual = $8, stok = $9, deskripsi = $10
      WHERE id = $11
      RETURNING *
    `;
    const values = [
      nama, kategori, prosesor, ram, storage, Number(harga),
      Number(rating), Number(terjual), Number(stok), deskripsi, id
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = ProductModel;