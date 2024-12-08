const ZERO = 0;
const ONE = 1;
const THREE = 3;

const reverseString = (str = '') => str.split('').reverse().join('');

const toDashCaseFromCamelCase = (text) => {
  return text
    .split('')
    .map((char) => {
      if (char === char.toUpperCase() && /[a-zA-Z]/.test(char)) {
        return `-${char.toLowerCase()}`;
      }

      return char;
    })
    .join('');
};

const toCamelCaseFromDashCase = (text) => {
  const dashIndices = [];
  return text
    .split('')
    .map((char, index) => {
      if (char === '-') {
        dashIndices.push(index);
        return '';
      }

      return char;
    })
    .map((char, index) => {
      if (dashIndices.find((i) => i === index - ONE)) {
        return char.toUpperCase();
      }

      return char;
    })
    .join('');
};

const getEllipsisForLongText = (text, maxLength) => {
  return text.length > maxLength ? `${text.substring(ZERO, maxLength)}...` : text;
};

const lowerCaseFirstLetter = (string) => {
  return string.charAt(ZERO).toLowerCase() + string.slice(ONE);
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(ZERO).toUpperCase() + string.slice(ONE);
};

// // Missing decimal
const formatMoney = (amount) => {
  const amountAsStr = String(amount);

  let formattedAmount = '';
  for (let i = ZERO; i < amountAsStr.length; i++) {
    if (i !== ZERO && i % THREE === ZERO) {
      formattedAmount = amountAsStr.charAt(amountAsStr.length - i - ONE) + ',' + formattedAmount;
    } else {
      formattedAmount = amountAsStr.charAt(amountAsStr.length - i - ONE) + formattedAmount;
    }
  }

  return '$' + formattedAmount;
};

export {
  reverseString,
  toDashCaseFromCamelCase,
  toCamelCaseFromDashCase,
  getEllipsisForLongText,
  lowerCaseFirstLetter,
  capitalizeFirstLetter,
  formatMoney
};
