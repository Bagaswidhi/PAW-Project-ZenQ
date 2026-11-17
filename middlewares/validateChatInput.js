// Guardrail sisi backend: memeriksa pesan SEBELUM dikirim ke Gemini.
const { MAX_MESSAGE_LENGTH } = require('../config/gemini');

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /abaikan\s+(semua\s+)?instruksi/i,
  /system\s*prompt/i,
  /jailbreak/i,
  /act\s+as\s+(?!customer|pembeli)/i,
  /berpura-pura\s+menjadi/i
];

const validateChatInput = (req, res, next) => {
  const { message, history } = req.body || {};

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Pesan tidak boleh kosong.'
    });
  }

  const trimmed = message.trim();

  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({
      success: false,
      message: `Pesan terlalu panjang (maksimal ${MAX_MESSAGE_LENGTH} karakter).`
    });
  }

  const isInjection = INJECTION_PATTERNS.some((pattern) => pattern.test(trimmed));
  if (isInjection) {
    return res.status(400).json({
      success: false,
      message: 'Permintaan tidak valid. Silakan ajukan pertanyaan seputar produk laptop ZenQ Store.'
    });
  }

  // Sanitasi riwayat percakapan multi-turn (maksimal 6 pesan terakhir)
  let safeHistory = [];
  if (Array.isArray(history)) {
    safeHistory = history
      .filter(
        (item) =>
          item &&
          (item.role === 'user' || item.role === 'model') &&
          typeof item.text === 'string' &&
          item.text.trim().length > 0
      )
      .slice(-6)
      .map((item) => ({
        role: item.role,
        text: item.text.trim().slice(0, MAX_MESSAGE_LENGTH)
      }));
  }

  req.body.message = trimmed;
  req.body.history = safeHistory;
  next();
};

module.exports = validateChatInput;