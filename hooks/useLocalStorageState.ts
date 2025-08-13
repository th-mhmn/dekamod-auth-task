import { useEffect, useState } from "react";


const useLocalStorageState = <T,>(key: string, initialState: T) => {
  const [value, setValue] = useState<T>(initialState);
  const [isHydrated, setIsHydrated] = useState(false);


  useEffect(() => {
    try {
      const storedValue = typeof window !== "undefined" ? localStorage.getItem(key) : null;
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue));
      }
    } catch {

    } finally {
      setIsHydrated(true);
    }
  }, [key]);


  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch {

    }
  }, [key, value, isHydrated]);

  return [value, setValue, isHydrated] as [T, React.Dispatch<React.SetStateAction<T>>, boolean];
};

export default useLocalStorageState;


