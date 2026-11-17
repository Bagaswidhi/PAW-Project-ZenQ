// Controller: hanya menerima request & mengirim response. Logika Gemini ada di service.
const { askGemini } = require('../services/gemini.service');

const chat = async (req, res) => {
  try {
    const result = await askGemini(req.body.message, req.body.history);
    res.status(200).json({
      success: true,
      data: {
        reply: result.reply,
        products: result.products || [],
        isUnrecognized: Boolean(result.isUnrecognized)
      }
    });
  } catch (error) {
    console.error('[ERROR] Gemini:', error.message);

    const isQuotaError =
      error.message &&
      (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED'));

    const statusCode = isQuotaError ? 429 : 502;
    const clientMessage = isQuotaError
      ? 'Kuota harian layanan AI sedang penuh. Silakan coba beberapa saat lagi.'
      : 'Layanan AI sedang tidak tersedia. Silakan coba lagi beberapa saat.';

    res.status(statusCode).json({
      success: false,
      message: clientMessage
    });
  }
};

module.exports = { chat };