import { useState, useEffect } from 'react';

export default function useDebounce(value = "", delay = 1000) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(debounceTimer);
  }, [value, delay]);

  return debouncedValue;
};