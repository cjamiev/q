const parseObject = obj => {
  try {
    return JSON.parse(obj);
  } catch (e) {
    return null;
  }
};

const isBoolean = value => typeof value === 'boolean';
const isNumber = value => typeof value === 'number' && !isNaN(value);
const isString = value => typeof value === 'string';
const isObject = value => typeof value === 'object';
const isObjectLike = value => value !== null && typeof value === 'object';
const isJSONString = value => (isString(value) && parseObject(value) ? true : false);
const isNil = value => value === null || value === undefined;

export {
  isBoolean,
  isJSONString,
  isNil,
  isNumber,
  isObject,
  isObjectLike,
  isString,
  parseObject
};
