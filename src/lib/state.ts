import {create} from 'zustand';
import {persist, createJSONStorage, subscribeWithSelector} from 'zustand/middleware'
import {User} from "@/api/types/user.ts";

const userState = create(
  subscribeWithSelector(persist(
    (): User.Info => ({
      user_id: 0,
    }),
    {
      name: 'store_user',
      storage: createJSONStorage(() => localStorage),
    },
  ))
)

const localState = create(
  persist(
    () => ({
      theme: '',
      language: '',
      networkSelectedId: 0,
    }),
    {
      name: 'store_local',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

const routeState = create(
  persist(
    (): {
      history: string[]
    } => ({
      history: [],
    }),
    {
      name: 'store_route',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export {userState, localState, routeState};


// ************************************************************* //
// ************************************************************* //
// ************************************************************* //


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
