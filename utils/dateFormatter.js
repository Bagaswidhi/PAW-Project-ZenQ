function getFormattedTimestamp() {
  const now = new Date();
  return now.toISOString().replace('T', ' ').substring(0, 19);
}

module.exports = { getFormattedTimestamp };