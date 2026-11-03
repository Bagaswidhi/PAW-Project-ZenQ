const { getFormattedTimestamp } = require('../utils/dateFormatter');

const loggerMiddleware = (req, res, next) => {
  const start = Date.now();
  const timestamp = getFormattedTimestamp();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const method = req.method;
    const url = req.originalUrl || req.url;
    const statusCode = res.statusCode;

    console.log(`[${timestamp}] ${method} ${url} - Status: ${statusCode} (${duration}ms)`);
  });

  next();
};

module.exports = loggerMiddleware;