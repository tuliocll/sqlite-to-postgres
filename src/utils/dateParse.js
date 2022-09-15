/**
 * Receive integer date and parse it
 * to DATE ISO string.
 *
 * @param {Number} date
 * @returns {String} Date ISO String
 */
function dateParse(date) {
  try {
    return new Date(date).toISOString();
  } catch (_) {
    return new Date().toISOString();
  }
}

module.exports = dateParse;
