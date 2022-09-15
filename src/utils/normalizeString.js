/**
 * Escape single quotes
 *
 * @param {String} value -
 * @returns {String}
 */
function normalizeString(value) {
  if (typeof value !== "string") {
    return value;
  }

  if (!value) {
    return "";
  }

  return value.replace(/'/gm, "''");
}

module.exports = normalizeString;
