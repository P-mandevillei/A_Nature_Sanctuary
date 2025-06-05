import { useTranslation } from "react-i18next"

export default function TimeStamp(props) {

    const {t} = useTranslation('siteLayout');

    const timeStamps = {
        'aquariumCalculator': '2025-06-05',
        'waterChangeCalculator': '2025-06-05'
    }

    return <div className="shrink grey" style={{...props.style}}>
        {t('edit')} {timeStamps[props.name]?? ''}
    </div>
}