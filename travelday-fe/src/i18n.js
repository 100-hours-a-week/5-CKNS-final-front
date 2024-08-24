import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationKo from './locales/ko/translation.json'; 

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ko: {
        translation: translationKo, 
      },
    },
    lng: 'ko', 
    fallbackLng: 'ko', 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
