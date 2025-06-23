import { Card } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function FocusCards(props) {

    const nav = useNavigate();

    return <Card 
        className="selectable primaryColor primaryColorHover selectableImgWrapper" 
        onClick={()=>{nav(props.linkTo)}} 
        style={{height: '150px', overflow: 'hidden', display: 'flex', alignItems: 'center', flexDirection: 'row'}}
    >
        <img src={props?.cover} style={{width: '40%'}}/>
        <div style={{flex: 1}} className="center">
            {props?.children}
        </div>
    </Card>
}