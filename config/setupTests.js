import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

window.scrollTo = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});