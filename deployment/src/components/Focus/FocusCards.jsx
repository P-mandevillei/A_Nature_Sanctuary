import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function FocusCards(props) {

    const nav = useNavigate();
    const {t} = useTranslation('chloramine')

    return <Card 
        className="selectable pad primaryColor primaryColorHover" 
        onClick={()=>{nav(props.linkTo)}} 
        style={{height: '150px', overflow: 'hidden', display: 'flex', alignItems: 'center', flexDirection: 'row'}}
    >
        <img src={props?.cover} style={{width: '40%'}}/>
        <p style={{flex: 1}} className="center">
            {t('title')}
        </p>
    </Card>
}