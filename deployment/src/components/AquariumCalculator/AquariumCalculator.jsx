import { Col, Container, Row, Form, Button } from "react-bootstrap";
import CalculatorBlock from "./CalculatorBlock";
import { useState } from "react";

export default function() {
    const [calcMode, setCalcMode] = useState('default');

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
                <CalculatorBlock mode={calcMode} name={'1'}/>
            </Col>
        </Row>
        
        
    </Container>
}