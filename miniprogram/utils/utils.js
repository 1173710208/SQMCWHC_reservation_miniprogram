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

// Function to verify that a string is all numeric
function isNumeric(str) {
  const regex = /^[0-9]+$/;
  return regex.test(str);
}

module.exports = {
  extractStrings,
  isNumeric
};
