// utils/utils.js
function extractStrings(str) {
  const index = str.indexOf('-');
  if (index !== -1) {
    return {
      before: str.substring(0, index),
      after: str.substring(index + 1)
    };
  } else {
    return null;
  }
}

module.exports = {
  extractStrings
};
