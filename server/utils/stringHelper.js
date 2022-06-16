const ZERO = 0;
const ONE = 1;

const lowerCaseFirstLetter = (string) => {
  return string.charAt(ZERO).toLowerCase() + string.slice(ONE);
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(ZERO).toUpperCase() + string.slice(ONE);
};

const toCamelCaseFromDashCase = text => {
  const dashIndices = [];
  return text
    .split('')
    .map((char, index) => {
      if(char === '-') {
        dashIndices.push(index);
        return '';
      }

      return char;
    })
    .map((char, index) => {
      if(dashIndices.find(i => i === index - ONE)) {
        return char.toUpperCase();
      }

      return char;
    })
    .join('');
};

module.exports = {
  lowerCaseFirstLetter,
  capitalizeFirstLetter,
  toCamelCaseFromDashCase
};
