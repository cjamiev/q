import { useState } from 'react';

const useLocalStorage = (key, initialValue, shouldParse = true) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);

    return item && shouldParse ? JSON.parse(item) : item || initialValue;
  });

  const setValue = (value) => {
    setStoredValue(value);

    localStorage.setItem(key, shouldParse ? JSON.stringify(value) : value);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
