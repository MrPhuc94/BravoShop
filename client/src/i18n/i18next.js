import React from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './languages/en.json';
import vi from './languages/vi.json';
import { CONSTANTS } from '../contants';
import localStorage from 'redux-persist/es/storage';

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: async (language) => {
        const persistedLocale = await localStorage.getItem(
            CONSTANTS.LOCALE_PERSISTENCE_KEY,
        );
        console.log('persistedLocale', persistedLocale);
        if (!persistedLocale) {
            return language('en');
        }

        return language(persistedLocale);
    },
    init: () => { },
    cacheUserLanguage: async(locale) => {
        const persistedLocale = await localStorage.getItem(
            CONSTANTS.LOCALE_PERSISTENCE_KEY,
        );
        console.log('HELEOE', CONSTANTS.LOCALE_PERSISTENCE_KEY, locale, persistedLocale)
        localStorage.setItem(CONSTANTS.LOCALE_PERSISTENCE_KEY, locale);
    },
};

i18next
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        lng: 'vi',
        resources: {
            en: {
                translation: en,
            },
            vi: {
                translation: vi
            },
        },
    });
export default i18next;
