import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import cnSiteLayout from "./locales/cn/siteLayout.json";
import cnHome from "./locales/cn/home.json";
import cnAquariumCalculator from "./locales/cn/aquariumCalculator.json";
import cnWaterChangeCalculator from "./locales/cn/waterChangeCalculator.json";
import cnWaterChangeLevelAdjustment from "./locales/cn/waterChangeLevelAdjustment.json";
import cnLogin from "./locales/cn/login.json";
import cnBackend from "./locales/cn/backend.json";
import cnChloramine from "./components/Focus/Chloramine/cn.json";
import cnFocus from "./locales/cn/focus.json";

import enSiteLayout from "./locales/en/siteLayout.json";
import enHome from "./locales/en/home.json";
import enAquariumCalculator from "./locales/en/aquariumCalculator.json";
import enWaterChangeCalculator from "./locales/en/waterChangeCalculator.json";
import enWaterChangeLevelAdjustment from "./locales/en/waterChangeLevelAdjustment.json";
import enLogin from "./locales/en/login.json";
import enBackend from "./locales/en/backend.json";
import enChloramine from "./components/Focus/Chloramine/en.json";
import enFocus from "./locales/en/focus.json";

const resources = {
    en: {
        siteLayout: enSiteLayout,
        home: enHome,
        aquariumCalculator: enAquariumCalculator,
        waterChangeCalculator: enWaterChangeCalculator,
        waterChangeLevelAdjustment: enWaterChangeLevelAdjustment,
        login: enLogin,
        backend: enBackend,
        chloramine: enChloramine,
        focus: enFocus,
    },
    cn: {
        siteLayout: cnSiteLayout,
        home: cnHome,
        aquariumCalculator: cnAquariumCalculator,
        waterChangeLevelAdjustment: cnWaterChangeLevelAdjustment,
        waterChangeCalculator: cnWaterChangeCalculator,
        login: cnLogin,
        backend: cnBackend,
        chloramine: cnChloramine,
        focus: cnFocus,
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