import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import WaterChangeCalculator from "./WaterChangeCalculator/WaterChangeCalculator";

export default function AquariumCalculator() {

    const {lang} = useParams();
    const {t} = useTranslation('aquariumCalculator');

    return <div>
        <h1 className="center primaryColor">
            {t('title')}
        </h1>
        <Link to={`/${lang}/aquarium_calculator/water_change_calculator`} >{t('waterChange')}</Link>
    </div>
}