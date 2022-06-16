const ONE = 1;
const parseObject = obj => {
  try {
    return JSON.parse(obj);
  } catch (e) {
    return null;
  }
};

const isJSONString = value => (isString(value) && parseObject(value) ? true : false);
const isNumber = (value) => typeof value === 'number';
const isBoolean = (value) => typeof value === 'boolean';
const isString = (value) => typeof value === 'string';
const isObject = (value) => typeof value === 'object';
const isObjectLike = (value) => value !== null && typeof value === 'object';
const xOr = (a, b) => (!a && b) || (a && !b);
const isNotEmpty = (targetObject) => {
  if (!targetObject || !Object.keys(targetObject).length) {
    return false;
  }

  const entries = Object.keys(targetObject);
  const atLeastOneNotNull = entries.some((key) => !isNil(targetObject[key]));

  return atLeastOneNotNull;
};
const isNil = (value) => value === null || value === undefined;
const isEmpty = (targetObject) => !isNotEmpty(targetObject);
const isEqual = (entry1, entry2) => {
  if (!(isObjectLike(entry1) && isObjectLike(entry1))) {
    return entry1 === entry2;
  }
  if (xOr(isEmpty(entry1), isEmpty(entry2))) {
    return false;
  }

  const keys1 = Object.keys(entry1);
  const keys2 = Object.keys(entry2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  const checkEquality = keys1.reduce((accumulator, key) => {
    const child1 = entry1[key];
    const child2 = entry2[key];

    return isObjectLike(child1) && isObjectLike(child2)
      ? accumulator && isEqual(child1, child2)
      : accumulator && child1 === child2;
  }, true);

  return checkEquality;
};

module.exports = {
  isNumber,
  isJSONString,
  isBoolean,
  isObject,
  isEqual,
  isEmpty
};
