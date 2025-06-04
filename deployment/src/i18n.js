import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import cnSiteLayout from "./locales/cn/siteLayout.json";
import cnHome from "./locales/cn/home.json";
import cnAquariumCalculator from "./locales/cn/aquariumCalculator.json";
import cnWaterChangeCalculator from "./locales/cn/waterChangeCalculator.json";

import enSiteLayout from "./locales/en/siteLayout.json";
import enHome from "./locales/en/home.json";
import enAquariumCalculator from "./locales/en/aquariumCalculator.json";
import enWaterChangeCalculator from "./locales/en/waterChangeCalculator.json";

const resources = {
    en: {
        siteLayout: enSiteLayout,
        home: enHome,
        aquariumCalculator: enAquariumCalculator,
        waterChangeCalculator: enWaterChangeCalculator
    },
    cn: {
        siteLayout: cnSiteLayout,
        home: cnHome,
        aquariumCalculator: cnAquariumCalculator,
        waterChangeCalculator: cnWaterChangeCalculator
    }
};

i18n.use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        ns: Object.keys(resources.en),
        defaultNS: 'siteLayout',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;