import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key}`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
      console.log(`Saved to localstorage:${key}`, value.length, "items");
    } catch (err) {
      console.error(`Error setting localstorage key "${key}"`, err);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
