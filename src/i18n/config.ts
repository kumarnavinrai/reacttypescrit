import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import deutsch from './de/translation.json';
import english from './en/translation.json';

const resources = {
  en: {
    translation: english,
  },
  de: {
    translation: deutsch,
  },
};

const languageDetectorOptions = {
  order: ['querystring', 'localStorage'],
  lookupQuerystring: 'lang',
  lookupLocalStorage: 'i18nextLng',
  caches: ['localStorage'],
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'en',
  resources: resources,
  detection: languageDetectorOptions,
});

export default i18n;
