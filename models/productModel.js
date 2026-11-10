const products = [
  {
    id: 1,
    nama: "Lenovo IdeaPad Slim 3",
    kategori: "Laptop Kuliah",
    prosesor: "Intel Core i3",
    ram: "8GB",
    storage: "512GB SSD",
    harga: 7299000,
    rating: 4.8,
    terjual: 120,
    stok: 15,
    deskripsi: "Baterai tahan 8 jam & keyboard nyaman untuk ngetik lama."
  },
  {
    id: 2,
    nama: "ASUS Vivobook Go 14",
    kategori: "Laptop Kuliah",
    prosesor: "AMD Ryzen 3",
    ram: "8GB",
    storage: "512GB SSD",
    harga: 6899000,
    rating: 4.7,
    terjual: 85,
    stok: 10,
    deskripsi: "Laptop ringan (1.3 kg), enak dibawa ke kampus."
  },
  {
    id: 3,
    nama: "Acer Aspire Lite",
    kategori: "Laptop Kuliah",
    prosesor: "Intel N100",
    ram: "8GB",
    storage: "256GB SSD",
    harga: 6499000,
    rating: 4.5,
    terjual: 45,
    stok: 8,
    deskripsi: "Desain simpel dan hemat daya untuk komputasi harian."
  },
  {
    id: 4,
    nama: "HP Laptop 14",
    kategori: "Laptop Editing",
    prosesor: "AMD Ryzen 5",
    ram: "16GB",
    storage: "512GB SSD",
    harga: 8099000,
    rating: 4.9,
    terjual: 60,
    stok: 5,
    deskripsi: "Performa tinggi untuk multitasking dan editing video ringan."
  }
];

class ProductModel {
  static getAll(filters = {}) {
    let result = products;

    if (filters && filters.kategori) {
      result = result.filter(
        p => p.kategori.toLowerCase() === filters.kategori.toLowerCase()
      );
    }

    if (filters && filters.search) {
      const keyword = filters.search.toLowerCase();
      result = result.filter(
        p =>
          p.nama.toLowerCase().includes(keyword) ||
          p.deskripsi.toLowerCase().includes(keyword) ||
          p.prosesor.toLowerCase().includes(keyword)
      );
    }

    return result;
  }

  static getById(id) {
    return products.find(p => p.id === parseInt(id));
  }
}

module.exports = ProductModel;