// Controller: hanya menerima request & mengirim response. Logika Gemini ada di service.
const geminiService = require('../services/gemini.service');

const chat = async (req, res) => {
  try {
      const { message, history } = req.body || {};

      // Validasi dasar controller (HTTP 400)
      if(!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Pesan tidak boleh kosong.'
      });
    }

    const result = await geminiService.askGemini(message, history);

    return res.status(200).json({
      success: true,
      data: {
        reply: result.reply,
        products: result.products || [],
        isUnrecognized: Boolean(result.isUnrecognized)
      }
    });
  } catch (error) {
    const errorMsg = error && error.message ? error.message : '';
    console.error('[ERROR] Chat Controller:', errorMsg);

    // 1. Quota / Rate Limit Gemini (HTTP 429)
    if (
      errorMsg.includes('429') ||
      errorMsg.includes('RESOURCE_EXHAUSTED') ||
      errorMsg.toLowerCase().includes('quota')
    ) {
      return res.status(429).json({
        success: false,
        message: 'Kuota harian layanan AI sedang penuh. Silakan coba beberapa saat lagi.'
      });
    }

    // 2. Timeout Layanan Gemini (HTTP 504)
    if (errorMsg.toLowerCase().includes('timeout')) {
      return res.status(504).json({
        success: false,
        message: 'Permintaan ke asisten AI melebihi batas waktu tunggu. Silakan coba lagi.'
      });
    }

      // 3. Kesalahan Internal Backend atau Database (HTTP 500)
      if(
        error.isDatabaseError ||
          errorMsg.includes('database') ||
          errorMsg.includes('Database') ||
          errorMsg.includes('ECONNREFUSED') ||
          errorMsg.includes('password authentication') ||
          errorMsg.includes('GEMINI_API_KEY')
    ) {
      const safeMessage = errorMsg.includes('GEMINI_API_KEY')
        ? 'Layanan asisten AI belum dikonfigurasi dengan API Key yang valid di server.'
        : 'Terjadi kesalahan saat mengakses basis data katalog. Pastikan database PostgreSQL aktif.';

      return res.status(500).json({
        success: false,
        message: safeMessage
      });
    }

    // 4. Kegagalan komunikasi dengan layanan eksternal Gemini (HTTP 502)
    return res.status(502).json({
      success: false,
      message: 'Layanan AI sedang tidak dapat dihubungi. Silakan coba lagi beberapa saat.'
    });
  }
};

module.exports = { chat };