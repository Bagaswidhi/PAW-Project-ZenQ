// Konfigurasi Google Gemini. API key HANYA dibaca dari .env (server), tidak pernah dikirim ke frontend.
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('[WARNING] GEMINI_API_KEY belum diisi di file .env - fitur AI Assistant tidak akan berfungsi.');
}

const fallbackRaw = process.env.GEMINI_FALLBACK_MODELS || process.env.GEMINI_FALLBACK_MODEL || '';
const FALLBACK_MODELS = fallbackRaw
  .split(',')
  .map((m) => m.trim())
  .filter(Boolean);

module.exports = {
  ai: apiKey ? new GoogleGenAI({ apiKey }) : null,
  MODEL: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
  FALLBACK_MODELS,
  MAX_MESSAGE_LENGTH: 500,
  TIMEOUT_MS: 25000
};