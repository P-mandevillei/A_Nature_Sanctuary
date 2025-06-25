import FocusCards from "./FocusCards";
import autopsy from "./Chloramine/pics/autopsy_enantiopus_kilesa.webp";
import { useTranslation } from "react-i18next";
import TimeStamp from "../TimeStamp";

export default function Focus() {

    const { t } = useTranslation('focus');
    const { t: chloramineT } = useTranslation("chloramine");

    return <div className="pad">
        <h1 className="center primaryColor">
            {t('title')}
        </h1>
        <h2 className="center secondaryColor" style={{fontSize: '1em', paddingBottom: '1em'}}>
            {t('des')}
        </h2>
        <FocusCards linkTo='chloramine' cover={autopsy}>
            <p> {chloramineT('title')} </p>
            <TimeStamp name='chloramine' />
        </FocusCards>
    </div>
}