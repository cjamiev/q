const testFunctionHelper = ({ testMessage = '', args, expectedResult }, functionToTest) => {
  const recievedResult = functionToTest(...args);

  it(testMessage, () => expect(recievedResult).toEqual(expectedResult));
};

const mockDate = (date) => {
  // eslint-disable-next-line no-magic-numbers
  const DATE_TO_USE = date ? date : new Date(2021, 0, 1, 5, 0, 0);
  const _Date = Date;
  const MockDate = (...args) => {
    switch (args.length) {
      case 0:
        return DATE_TO_USE;
      default:
        return new _Date(...args);
    }
  };
  MockDate.UTC = _Date.UTC;
  MockDate.now = () => DATE_TO_USE.getTime();
  MockDate.parse = _Date.parse;
  MockDate.toString = _Date.toString;
  MockDate.prototype = _Date.prototype;
  global.Date = MockDate;
};

const mockLocalStorage = (defaultStorage) => {
  const localStorageMock = () => {
    let store = defaultStorage;

    return {
      getItem(key) {
        return store[key];
      },
      setItem(key, value) {
        store[key] = value;
      },
      clear() {
        store = {};
      },
      removeItem(key) {
        delete store[key];
      }
    };
  };

  Object.defineProperty(window, 'localStorage', { value: localStorageMock() });
};

export { testFunctionHelper, mockDate, mockLocalStorage };
