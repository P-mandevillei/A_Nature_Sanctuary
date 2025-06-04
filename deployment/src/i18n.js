import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import cnSiteLayout from "./locales/cn/siteLayout.json";
import cnHome from "./locales/cn/home.json";

import enSiteLayout from "./locales/en/siteLayout.json";
import enHome from "./locales/en/home.json";

const resources = {
    en: {
        siteLayout: enSiteLayout,
        home: enHome
    },
    cn: {
        siteLayout: cnSiteLayout,
        home: cnHome
    }
};

i18n.use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        ns: ['siteLayout', 'home'],
        defaultNS: 'siteLayout',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;