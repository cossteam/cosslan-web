import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocalState, setLocalState} from '@/lib/state';

import translationEN from './en/translation.json';
import translationCN from './zh-cn/translation.json';
import translationTW from './zh-tw/translation.json';

const storageKey: string = 'ui-language';  // storage key
const defaultLng: string = getLocalState(storageKey, 'en');   // default language

// language type
export const languageType: {
  [key: string]: string
} = {
  en: 'English',
  zhCN: '简体中文',
  zhTW: '繁体中文',
};

export function setLanguage(lang: string) {
  setLocalState(storageKey, lang);
  return i18next.changeLanguage(lang);
}

i18next.use(initReactI18next).init({
  lng: defaultLng,
  debug: true,
  resources: {
    en: {
      translation: translationEN,
    },
    zhCN: {
      translation: translationCN,
    },
    zhTW: {
      translation: translationTW,
    },
  },
  saveMissing: true,
  missingKeyHandler: (lngs: readonly string[], ns: string, key: string, fallbackValue: string) => {
    if (!lngs.includes('dev')) {
      return;
    }
    const miss: {
      [key: string]: {
        [key: string]: string;
      };
    } = getLocalState("i18next_missing_keys", {});
    if (typeof miss[ns] === "undefined") {
      miss[ns] = {};
    }
    if (typeof miss[ns][key] === "undefined") {
      miss[ns][key] = fallbackValue;
      setLocalState("i18next_missing_keys", miss);
    }
  }
}, (err) => {
  if (err) {
    console.error('i18n init error:', err);
  }
});
