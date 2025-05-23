import { useEffect, useId, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import useLocalStorage from "../../hooks/UseLocalStorage";

export default function CalculatorBlock(props) {

    const substanceId = useId();
    const unitId = useId();
    const sourceId = useId();
    const rocId = useId();
    const targetId = useId();
    const changeId = useId();

    const changeSubstanceRef = useRef();
    const changeUnitRef = useRef();

    const [data, setData] = useLocalStorage(props.name, {'substance': 'substance name', 'unit': 'unit'});
    let dummyData = {...data};
    useEffect(()=>{
        dummyData = {...data};
    }, [data]);
    const [showSubstance, setShowSubstance] = useState(false);
    const [showUnit, setShowUnit] = useState(false);

    return <Card className="pad">  
        <p className="center bold enlarge primaryColor">
            <span className="selectable primaryColorHover" onClick={()=>{setShowSubstance((old)=>!old); setShowUnit(false);}}>
                {data['substance']}
            </span>
            &nbsp;&nbsp;
            <span className="selectable primaryColorHover" onClick={()=>{setShowUnit((old)=>!old); setShowSubstance(false)}}>
                ({data['unit']})
            </span>
            {showSubstance?
                <>
                    <Form.Label htmlFor={substanceId} />
                    <Form.Control id={substanceId} ref={changeSubstanceRef} placeholder="Enter new name"/>
                    <Button className="cardBtn primaryColorBg primaryColorBgHover" onClick={(e)=>{e?.preventDefault(); dummyData['substance']=changeSubstanceRef.current?.value; setData(dummyData);}}>
                        Update Substance Name
                    </Button>
                </>
                :<></>
            }
            {showUnit?
                <>
                    <Form.Label htmlFor={unitId} />
                    <Form.Control id={unitId} ref={changeUnitRef} placeholder="Leave empty if no unit."/>
                    <Button className="cardBtn primaryColorBg primaryColorBgHover" onClick={(e)=>{e?.preventDefault(); dummyData['unit']=changeUnitRef.current?.value; setData(dummyData);}}>
                        Update Unit
                    </Button>
                </>
                :<></>
            }
        </p>

        <Form.Label htmlFor={sourceId}>Source: ({data['unit']})</Form.Label>
        <Form.Control id={sourceId}></Form.Control>
        <Form.Label htmlFor={rocId}>Rate of Change: ({data['unit']}/day)</Form.Label>
        <Form.Control id={rocId}></Form.Control>
        <Form.Label htmlFor={targetId}>Steady State: ({data['unit']})</Form.Label>
        <Form.Control id={targetId}></Form.Control>
        <Form.Label htmlFor={changeId}>% Change:</Form.Label>
        <Form.Control id={changeId}></Form.Control>
    </Card>
}