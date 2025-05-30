import { useEffect, useId, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import useLocalStorage from "../../hooks/UseLocalStorage";
import calculate from "./Calculator";

export default function CalculatorBlock(props) {

    const substanceId = useId();
    const unitId = useId();
    const sourceId = useId();
    const rocId = useId();
    const targetId = useId();
    const changeId = useId();

    const changeSubstanceRef = useRef();
    const changeUnitRef = useRef();

    const [result, setResult] = useState({'error': true, 'msg': 'Incomplete input'})
    const [data, setData] = useLocalStorage(props.name, {'substance': 'name', 'unit': 'unit', 's': null, 'x': null, 'm': null, 'y': null});
    useEffect(()=>{
        sRef.current.value = data.s;
        xRef.current.value = data.x;
        mRef.current.value = data.m;
        yRef.current.value = data.y;
        disable();
    }, []);
    useEffect(()=>{
        calculateBlock();
    }, [props.mode]);
    let dummyData = {...data};
    useEffect(()=>{
        dummyData = {...data};
    }, [data]);

    const [showSubstance, setShowSubstance] = useState(false);
    const [showUnit, setShowUnit] = useState(false);

    const sRef = useRef(), xRef = useRef(), mRef = useRef(), yRef = useRef();

    const fields = {
        's': {'name': 'Source', 'unit': data['unit'], 'id': sourceId, 'ref': sRef},
        'x': {'name': 'Rate of Change', 'unit': `${data['unit']}/month`, 'id': rocId, 'ref': xRef},
        'm': {'name': 'Steady State', 'unit': data['unit'], 'id': targetId, 'ref': mRef},
        'y': {'name': '% Change', 'unit': '%/week', 'id': changeId, 'ref': yRef}
    }

    function calculateBlock() {
        dummyData.s = sRef.current?.value;
        dummyData.x = xRef.current?.value;
        dummyData.m = mRef.current?.value;
        dummyData.y = yRef.current?.value;
        setData(dummyData);
        setResult(
            calculate(
                parseFloat(sRef.current.value), 
                parseFloat(xRef.current.value), 
                parseFloat(mRef.current.value), 
                parseFloat(yRef.current.value),
                props.mode
            )
        );
    }

    const [disableInput, setDisableInput] = useState();
    function disable() {
        const s = parseFloat(sRef.current.value);
        const x = parseFloat(xRef.current.value); 
        const m = parseFloat(mRef.current.value); 
        const y = parseFloat(yRef.current.value);
        
        const knownS = typeof s === 'number' && s>=0;
        const knownX = typeof x === 'number' && x>0;
        const knownM = typeof m === 'number' && m>=0;
        const knownY = typeof y === 'number' && y>=0;
        const totalKnown = knownS + knownX + knownM + knownY;
        
        if (totalKnown<3) {
            setDisableInput('');
            return;
        };
        if (!knownS) {
            setDisableInput('s');
            return;
        } else if (!knownX) {
            setDisableInput('x');
            return;
        } else if (!knownM) {
            setDisableInput('m');
            return;
        } else {
            setDisableInput('y');
            return;
        }
    }

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
        <Form.Control id={sourceId} ref={sRef} onChange={disable} disabled={disableInput==='s'}></Form.Control>
        <Form.Label htmlFor={rocId}>Rate of Change: ({data['unit']}/month)</Form.Label>
        <Form.Control id={rocId} ref={xRef} onChange={disable} disabled={disableInput==='x'}></Form.Control>
        <Form.Label htmlFor={targetId}>Steady State: ({data['unit']})</Form.Label>
        <Form.Control id={targetId} ref={mRef} onChange={disable} disabled={disableInput==='m'}></Form.Control>
        <Form.Label htmlFor={changeId}>% Change: (%/week)</Form.Label>
        <Form.Control id={changeId} ref={yRef} onChange={disable} disabled={disableInput==='y'}></Form.Control>
        <br/>
        <Button 
            className="primaryColorBg primaryColorBgHover"
            onClick={calculateBlock}
        >
            Calculate
        </Button>
        {result.error? result.msg
        :<p>
            {fields[result.unknown].name}: {result.value} {fields[result.unknown].unit? `(${fields[result.unknown].unit})`: ''}
        </p>}
    </Card>
}