import { Col, Container, Row, Form, Button } from "react-bootstrap";
import CalculatorBlock from "./CalculatorBlock";
import { useState } from "react";
import useLocalStorage from "../../hooks/UseLocalStorage";

export default function() {
    const [calcMode, setCalcMode] = useLocalStorage('mode', 'default');
    const [blockNum, setBlockNum] = useLocalStorage('blocks', [0]);

    return <Container>
        <Row>
            <Col sm={12} md={6} lg={4} xl={3}>
                This is a calculator-to-be!
                <Form.Select value={calcMode} onChange={e => setCalcMode(e.target.value)}>
                    <option value='default'>-- Mode of Water Change --</option>
                    <option value='removeThenAdd'>Remove Old➡️Add New</option>
                    <option value='removeWhileAdd'>Remove While Adding Simultaneously</option>
                    <option value='addThenRemove'>Add New➡️Remove Old</option>
                </Form.Select>
            </Col>
            <Col sm={12} md={6} lg={8} xl={9}>
                <Container>
                    <Row>
                        {blockNum.map(cur=><Col key={cur} sm={12} md={6} xl={4}>
                            <CalculatorBlock mode={calcMode} name={cur}/>
                        </Col>)}
                        <Col sm={12} md={6} xl={4} className="pad" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Button 
                                className="round primaryColorBg primaryColorBgHover" 
                                style={{'width': '50%', 'aspectRatio': '1/1'}}
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