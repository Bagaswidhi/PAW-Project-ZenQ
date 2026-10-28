const express = require('express');

const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
  res.send('Server Asisten AI UMKM aktif');
});

app.listen(PORT, () => {
  console.log('Server berjalan di http://localhost:' + PORT);
});
