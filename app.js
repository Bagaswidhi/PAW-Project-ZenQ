require('dotenv').config();
const express = require('express');
const path = require('path');
const config = require('./config/appConfig');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
const apiRoutes = require('./routes/apiRoutes');
const webRoutes = require('./routes/webRoutes');

const app = express();

// Konfigurasi View Engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware Logger
app.use(loggerMiddleware);

// Registrasi Routes
app.use('/api', apiRoutes);
app.use('/', webRoutes);

// Jalankan Server
app.listen(config.PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 ${config.APP_NAME} Berhasil Dijalankan!`);
  console.log(`🌐 Frontend  : http://localhost:${config.PORT}`);
  console.log(`🔌 API Status: http://localhost:${config.PORT}/api/status`);
  console.log(`🔌 API Produk: http://localhost:${config.PORT}/api/produk`);
  console.log(`===============================================`);
});