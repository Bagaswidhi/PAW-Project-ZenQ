const express = require('express');
const path = require('path');
const config = require('./config/appConfig');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
const apiRoutes = require('./routes/apiRoutes');
const webRoutes = require('./routes/webRoutes');

const app = express();

// 1. Konfigurasi View Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. Parser Middleware Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Pasang Middleware Logger untuk seluruh request
app.use(loggerMiddleware);

// 4. Registrasi Router
app.use('/api', apiRoutes);
app.use('/', webRoutes);

// 5. Jalankan Server
app.listen(config.PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 ${config.APP_NAME} Berhasil Dijalankan!`);
  console.log(`🌐 Frontend  : http://localhost:${config.PORT}`);
  console.log(`🔌 API Status: http://localhost:${config.PORT}/api/status`);
  console.log(`🔌 API Produk: http://localhost:${config.PORT}/api/produk`);
  console.log(`🔌 API Detail: http://localhost:${config.PORT}/api/produk/1`);
  console.log(`===============================================`);
});