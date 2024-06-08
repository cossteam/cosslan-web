import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEN from './en/common.json';
import commonZH from './zh/common.json';
import { getLocalState, setLocalState } from '@/lib/state';

const storageKey: string = 'ui-language';  // storage key
const defaultNS: string = 'common';  // default namespace
const defaultLN: string = getLocalState(storageKey, 'en');   // default language

// language type
export const languageType: { 
  [key: string]: string 
} = {
  en: 'English',
  zh: '中文',
};

export function setLanguage(lang: string) {
  setLocalState(storageKey, lang);
  i18next.changeLanguage(lang);
}

i18next.use(initReactI18next).init({
  lng: defaultLN,
  debug: true,
  defaultNS,
  resources: {
    en: {
      common: commonEN,
    },
    zh: {
      common: commonZH,
    },
  },
});
