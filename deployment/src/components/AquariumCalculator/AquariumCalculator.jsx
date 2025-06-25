import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import WaterChangeCalculator from "./WaterChangeCalculator/WaterChangeCalculator";
import TimeStamp from "../TimeStamp";

export default function AquariumCalculator() {

    const {lang} = useParams();
    const {t} = useTranslation('aquariumCalculator');

    return <div className="pad" style={{minHeight: '90vh', position: 'relative'}}>
        <div style={{height: '100%'}}>
            <h1 className="center primaryColor">
                {t('title')}
            </h1>
            <div>
                <Link to={`/${lang}/aquarium_calculator/water_change_calculator`} >{t('waterChange')}</Link>
            </div>
            <div>
                <Link to={`/${lang}/aquarium_calculator/water_change_level_adjustment`} > {t('levelAdj')} </Link>
            </div>
            {/*
            <div>
                <Link to={`/${lang}/aquarium_calculator/unit_converter`} > {t('unitConverter')} </Link>
            </div>
            */}
        </div>
        <TimeStamp name='aquariumCalculator' style={{position: 'absolute', bottom: 0}} />
    </div>
}