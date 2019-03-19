// functions used throughout template-formatter dir
const fs = require('fs');
const _ = require('lodash');

// slice string to a given length
const sliceString = (str, n) => {
  if (typeof (str) !== 'string') {
    throw new Error(`The parsed ${str} is not a string`);
  }
  if (str.length > n) {
    return `${str.substring(0, n)}...`;
  }
  return str;
};

// check all elements in a given array are of a given type
const checkAllAreType = (array, type) => {
  for (let i = 0; i < array.length; i++) {
    if (typeof (array[i]) !== type) {
      throw new Error(`Index ${i} in the given array contains an non-${type} type`);
    }
  }
};

// returns string in title case
const capitalCase = word => word.toString().replace(/_/g, ' ')
  .replace(/(^|\s)[a-z]/g, f => f.toUpperCase());

// fixes number to a given decimal place
const formatNumber = (number, decimalPlaces = 1) => {
  if (typeof number !== 'number') {
    throw new Error(`Parsed number ${number} is not a valid number type`);
  }
  const parsedNumber = decimalPlaces === 0
    ? parseInt(number) : parseFloat(number.toFixed(decimalPlaces));
  return parsedNumber.toLocaleString(undefined, { minimumFractionDigits: decimalPlaces });
};

// errors if not number or is Infinity or NaN
const checkForValidNumber = (val) => {
  if (typeof val !== 'number' || Number.isNaN(val) || !isFinite(val)) {
    throw new Error(`${val} is not a valid number. The value must be a non-NaN number type.`);
  }
  return val;
};

// summarise all values with the given property string in a given array
const getTotal = (data, propertyString) => {
  const score = data
    .reduce((acc, next) => {
      const val = _.get(next, propertyString);
      checkForValidNumber(val);
      acc += val;
      return acc;
    }, 0);
  return score;
};


const splitArrayIntoChunks = (data, size) => {
  const chunks = [];
  while (data.length > 0) {
    chunks.push(data.splice(0, size));
  }
  return chunks;
};

const checkFileExists = (filePath) => {
  if (fs.existsSync(filePath)) {
    return filePath;
  }
  throw new Error(`${filePath} does not exist.`);
};


module.exports = {
  capitalCase,
  formatNumber,
  getTotal,
  checkAllAreType,
  sliceString,
  splitArrayIntoChunks,
  checkForValidNumber,
  checkFileExists,
};
