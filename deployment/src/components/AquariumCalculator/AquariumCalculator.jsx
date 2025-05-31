import { Col, Container, Row, Form, Button } from "react-bootstrap";
import CalculatorBlock from "./CalculatorBlock";
import { useEffect, useId, useState } from "react";
import useLocalStorage from "../../hooks/UseLocalStorage";

export default function() {
    const [calcMode, setCalcMode] = useLocalStorage('mode', 'default');
    const [blockNum, setBlockNum] = useLocalStorage('blocks', [0]);
    const modeId = useId();
    const rocLevelId = useId();
    const rocUnitId = useId();
    const [rocLevel, setRocLevel] = useState(0);
    const [rocUnit, setRocUnit] = useState(30);
    const [rocConverted, setRocConverted] = useState(0);

    useEffect(()=>{
        if (isNaN(parseFloat(rocLevel)) || isNaN(parseFloat(rocUnit))) {
            setRocConverted(0);
            return;
        }
        setRocConverted(rocLevel/rocUnit*30);
    }, [rocLevel, rocUnit]);

    return <Container>
        <Row>
            <Col sm={12} md={6} lg={4} xl={3} className="pad">
                <p className="primaryColor bold enlarge center">Water Change Calculator</p>
                <p>Click the "<span className="secondaryColor bold">+</span>" to add a new block, and define its name and unit.</p>
                <p><span className="secondaryColor bold">Calculate</span> the unknown from <span className="secondaryColor bold">any three</span> given quantities.</p>
                <p>Everything is <span className="secondaryColor bold">stored</span> until you clear your browser's memory.</p>
                <Form.Label htmlFor={modeId} className="primaryColor">Select Mode:</Form.Label>
                <Form.Select id={modeId} value={calcMode} onChange={e => setCalcMode(e.target.value)}>
                    <option value='default'>-- Mode of Water Change --</option>
                    <option value='removeThenAdd'>Remove Old➡️Add New</option>
                    <option value='removeWhileAdd'>Remove While Adding</option>
                    <option value='addThenRemove'>Add New➡️Remove Old</option>
                </Form.Select>
                <br />
                <p className="primaryColor">Rate of Change Conversion</p>
                <Container>
                    <Row>
                        <Col xs={6}>
                            <Form.Label htmlFor={rocLevelId}>Level</Form.Label>
                            <Form.Control type="number" id={rocLevelId} value={rocLevel} onChange={(e)=>{setRocLevel(e.target.value)}} />
                        </Col>
                        <Col xs={6}>
                            <Form.Label htmlFor={rocUnitId}># days</Form.Label>
                            <Form.Control type="number" id={rocUnitId} value={rocUnit} onChange={(e)=>{setRocUnit(e.target.value)}} />
                        </Col>
                    </Row>
                </Container>     
                <p className="secondaryColor bold">
                    {rocLevel} (arbitrary unit/{rocUnit} days) = {rocConverted} (arbitrary unit/month)
                </p>

            </Col>
            <Col sm={12} md={6} lg={8} xl={9}>
                <Container>
                    <Row>
                        {blockNum.map(cur=><Col key={cur} sm={12} md={6} xl={4}>
                            <CalculatorBlock mode={calcMode} name={cur} blockNum={blockNum} setBlockNum={setBlockNum}/>
                        </Col>)}
                        <Col sm={12} md={6} xl={4} className="pad" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Button 
                                className="round primaryColorBg primaryColorBgHover" 
                                style={{'aspectRatio': '1/1', 'margin': 'auto'}}
                                onClick={()=>{setBlockNum([...blockNum, blockNum[blockNum.length-1]+1])}}
                            >
                                +
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Col>
        </Row>
        
        
    </Container>
}