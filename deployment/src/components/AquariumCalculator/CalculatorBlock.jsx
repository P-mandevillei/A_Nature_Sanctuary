import { useEffect, useId, useRef, useState } from "react";
import { Button, Card, Form, Toast, ToastContainer } from "react-bootstrap";
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
        's': {'name': 'Source Level', 'unit': data['unit'], 'id': sourceId, 'ref': sRef},
        'x': {'name': 'In-tank Level Rate of Change', 'unit': `${data['unit']}/month`, 'id': rocId, 'ref': xRef},
        'm': {'name': 'In-tank Level Steady State', 'unit': data['unit'], 'id': targetId, 'ref': mRef},
        'y': {'name': 'Water Change', 'unit': '%/week', 'id': changeId, 'ref': yRef}
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
        const knownX = typeof x === 'number' && !isNaN(x);
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

    function askDelete() {
        setShowMsg(true);
    }

    function deleteSelf() {
        setShowMsg(false);
        localStorage.removeItem(props.name);
        const newBlocks = props.blockNum.filter(cur => cur!=props.name);
        props.setBlockNum(newBlocks);
    }

    const [showMsg, setShowMsg] = useState(false);

    return <Card className="pad">  
        <span 
            style={{position: 'absolute', top: '1%', right: '2%'}} 
            className="tertiaryColor tertiaryColorHover selectableHover"
            onClick={askDelete}
        >
            ✘
        </span>

        <ToastContainer className="p-3" position="middle-center">
            <Toast className="secondaryColor tertiaryColorReverseBg" show={showMsg} onClose={()=>{setShowMsg(old=>!old)}}>
                <Toast.Header>
                    <strong className="me-auto">Delete This Block</strong>
                </Toast.Header>
                <Toast.Body style={{display: 'flex', flexDirection: 'column'}}>
                    Are you sure you want to delete this block?
                    <Button 
                        className="secondaryColorBg secondaryColorBgHover largeBtnEffect" 
                        style={{margin: 10}}
                        onClick={()=>setShowMsg(false)}
                    >
                        Cancel
                    </Button>
                    <span 
                        className="emphasis emphasisHover selectable"
                        onClick={deleteSelf}
                    >
                        Delete
                    </span>
                </Toast.Body>
            </Toast>
        </ToastContainer>

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

        <Form.Label htmlFor={sourceId}>Source Level: {data['unit']? `(${data['unit']})`:''}</Form.Label>
        <Form.Control type="number" id={sourceId} ref={sRef} onChange={disable} disabled={disableInput==='s'}></Form.Control>
        <Form.Label htmlFor={rocId}>In-tank Level Rate of Change: ({data['unit']}/month)</Form.Label>
        <Form.Control type="number" id={rocId} ref={xRef} onChange={disable} disabled={disableInput==='x'}></Form.Control>
        <Form.Label htmlFor={targetId}>In-tank Level Steady State: {data['unit']? `(${data['unit']})`:''}</Form.Label>
        <Form.Control type="number" id={targetId} ref={mRef} onChange={disable} disabled={disableInput==='m'}></Form.Control>
        <Form.Label htmlFor={changeId}>Water Change: (%/week)</Form.Label>
        <Form.Control type="number" id={changeId} ref={yRef} onChange={disable} disabled={disableInput==='y'}></Form.Control>
        <br/>
        <Button 
            className="primaryColorBg primaryColorBgHover largeBtnEffect"
            onClick={calculateBlock}
        >
            Calculate
        </Button>
        <p className="secondaryColor bold">
        {result.error? result.msg
        : <>
            {fields[result.unknown].name}: {result.value} {fields[result.unknown].unit? `(${fields[result.unknown].unit})`: ''}
        </>}
        </p>
    </Card>
}