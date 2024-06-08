import { useEffect, useState } from "react";

export default function useLocalState<T>(
   key: string,
   initialValue: T
): [T, (value: T) => void] {
   const [state, setInternalState] = useState<T>(initialValue);

   useEffect(() => {
       const value = localStorage.getItem(key);
       if (!value) return;
       setInternalState(JSON.parse(value));
   }, [key]);

   const setState = (value: T) => {
       localStorage.setItem(key, JSON.stringify(value));
       setInternalState(value);
   };

   return [state, setState];
}

export function getLocalState<T>(key: string, initialValue: T): T {
   const value = localStorage.getItem(key);
   if (!value) return initialValue;
   return JSON.parse(value);
}

export function setLocalState<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
}