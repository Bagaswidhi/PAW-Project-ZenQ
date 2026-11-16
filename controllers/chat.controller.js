// Controller: hanya menerima request & mengirim response. Logika Gemini ada di service.
const { askGemini } = require('../services/gemini.service');

const chat = async (req, res) => {
  try {
    const reply = await askGemini(req.body.message);
    res.status(200).json({ success: true, data: { reply } });
  } catch (error) {
    console.error('[ERROR] Gemini:', error.message);
    res.status(502).json({
      success: false,
      message: 'Layanan AI sedang tidak tersedia. Silakan coba lagi beberapa saat.'
    });
  }
};

module.exports = { chat };