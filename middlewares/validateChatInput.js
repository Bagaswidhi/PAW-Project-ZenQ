// Guardrail sisi backend: memeriksa pesan SEBELUM dikirim ke Gemini.
const { MAX_MESSAGE_LENGTH } = require('../config/gemini');

// Pola umum prompt injection (Indonesia & Inggris)
const INJECTION_PATTERNS = [
  /(abaikan|lupakan|hiraukan|kesampingkan).{0,30}(instruksi|perintah|aturan|prompt)/i,
  /ignore.{0,30}(previous|above|all|prior|system).{0,30}(instruction|prompt|rule)/i,
  /(system|developer)\s*(prompt|instruction|message)/i,
  /(tampilkan|bocorkan|tunjukkan|ungkap|reveal|show|print).{0,30}(prompt|instruksi|instruction)/i,
  /(kamu|anda)\s+(sekarang\s+)?(adalah|menjadi|berperan)/i,
  /you\s+are\s+now/i,
  /(pura-pura|berpura-pura|pretend|roleplay|act\s+as)/i,
  /\b(jailbreak|DAN mode|developer mode)\b/i
];

const validateChatInput = (req, res, next) => {
  const { message } = req.body || {};

  // 1. Harus berupa teks
  if (typeof message !== 'string') {
    return res.status(400).json({ success: false, message: 'Field "message" wajib berupa teks.' });
  }

  const cleaned = message.trim();

  // 2. Tidak boleh kosong
  if (cleaned.length === 0) {
    return res.status(400).json({ success: false, message: 'Pesan tidak boleh kosong.' });
  }

  // 3. Batas panjang
  if (cleaned.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({
      success: false,
      message: `Pesan terlalu panjang. Maksimal ${MAX_MESSAGE_LENGTH} karakter.`
    });
  }

  // 4. Deteksi prompt injection
  if (INJECTION_PATTERNS.some((pattern) => pattern.test(cleaned))) {
    return res.status(400).json({
      success: false,
      message: 'Pesan ditolak. Silakan tanyakan seputar laptop di ZenQ Store.'
    });
  }

  req.body.message = cleaned;
  next();
};

module.exports = validateChatInput;