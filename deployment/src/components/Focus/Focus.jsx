import FocusCards from "./FocusCards";
import autopsy from "./Chloramine/pics/autopsy_enantiopus_kilesa.jpeg";
import { useTranslation } from "react-i18next";
import TimeStamp from "../TimeStamp";

export default function Focus() {

    const { t: chloramineT } = useTranslation("chloramine");

    return <div className="pad">
        <FocusCards linkTo='chloramine' cover={autopsy}>
            <p> {chloramineT('title')} </p>
            <TimeStamp name='chloramine' />
        </FocusCards>
    </div>
}