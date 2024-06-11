import {useEffect, useState} from "react";

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

export function getLocalState<T>(name: string, initialValue: T): T {
  let ns: string = name
  let keys: string[] = []
  if (ns.indexOf('.') !== -1) {
    const array = name.split('.')
    ns = array[0]
    keys = array.slice(1)
  }
  const value = localStorage.getItem(ns);
  if (!value) return initialValue;
  try {
    let obj = JSON.parse(value);
    if (keys.length === 0) return obj
    keys.forEach(key => {
      obj = obj[key]
    })
    return obj || initialValue
  } catch (e) {
    return initialValue;
  }
}

export function setLocalState<T>(name: string, value: T) {
  let ns: string = name
  let keys: string[] = []
  if (ns.indexOf('.') !== -1) {
    const array = name.split('.')
    ns = array[0]
    keys = array.slice(1)
  }
  if (keys.length === 0) {
    localStorage.setItem(ns, JSON.stringify(value));
    return
  }
  const data = localStorage.getItem(ns);
  let obj = data ? JSON.parse(data) : {}
  for (let i = 0; i < keys.length - 1; i++) {
    if (!obj[keys[i]]) {
      obj[keys[i]] = {}
    }
    obj = obj[keys[i]]
  }
  obj[keys[keys.length - 1]] = value
  localStorage.setItem(ns, JSON.stringify(obj));
}
