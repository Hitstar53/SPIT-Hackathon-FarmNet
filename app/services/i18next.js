import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en  from '../locales/en.json';
import hn  from '../locales/hn.json';

export const languageResources = {
    en: {translation: en},
    hn: {translation: hn},
  };
  

i18next.use(initReactI18next).init({
    compatabilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    resources: languageResources

})

export default i18next;