import { useContext, useId, useRef, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";

const accuracy = 10000;

export default function CalculatorBlock(props) {

    const rules = props.rules;
    const fields = [];
    for (let rule of rules) {
        fields.push({state: useState(rule.value), id: useId()});
    }
    
    function calculate(index, input) {        
        const [curValue, setCurValue] = fields[index].state;
        setCurValue(input);
        if (!input) {
            input = 0;
        }
        for (let i=0; i<fields.length; i++) {
            if (i !== index) {
                const [value, setValue] = fields[i].state;
                const converted = Math.round(input / rules[index].value * rules[i].value * accuracy) / accuracy;
                setValue(converted);
            }
        }
    }

    return <Card style={{ width: '100%', padding: 0, border: 'none' }}>
        <Container fluid style={{ padding: 0 }} >
            <Row style={{ width: '100%', margin: '15px 0' }}>
                {rules.map((rule, index) => {
                    const {state, id} = fields[index];
                    const [value, setValue] = state;

                    return <Col key={index} xs={6} sm={4} md={3} lg={2} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 0}}>
                        <Form.Control id={id} value={value} onChange={e => calculate(index, e.target.value)} type='number' />
                        <Form.Label key={index} htmlFor={id} style={{ margin: 'auto 5px', whiteSpace: 'nowrap'  }}> {index === rules.length-1? rule.unit : rule.unit+' = '} </Form.Label>
                    </Col>;
                })}
            </Row>
        </Container>
    </Card>
}