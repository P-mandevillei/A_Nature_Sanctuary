import { useTranslation } from "react-i18next"

export default function TimeStamp(props) {

    const {t} = useTranslation('siteLayout');

    const timeStamps = {
        'aquariumCalculator': '2025-06-25',
        'waterChangeCalculator': '2025-07-06',
        "chloramine": "2025-07-01",
        "waterChangeLevelAdjustment": "2025-07-06",
    }

    return <div className="shrink grey" style={{...props.style}}>
        {t('edit')} {timeStamps[props.name]?? ''}
    </div>
}