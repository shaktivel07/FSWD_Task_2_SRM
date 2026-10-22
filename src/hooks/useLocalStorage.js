import { useState, useEffect } from "react";

// A small custom hook: works like useState, but the value is kept in
// localStorage so it survives page reloads.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage may be unavailable (private mode); ignore */
    }
  }, [key, value]);

  return [value, setValue];
}
