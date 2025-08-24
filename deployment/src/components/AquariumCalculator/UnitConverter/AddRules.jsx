import { use, useEffect, useId, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import useLocalStorage from "../../../hooks/UseLocalStorage";

function FormField(props) {
    const unitId = useId();
    const valueId = useId();
    const [value, setValue] = useState(0);
    const [unit, setUnit] = useState('');
    useEffect(() => {
        setValue(0);
        setUnit('');
    }, [props.reset]);

    return <Col xs={12} sm={6} md={4} lg={3} className="fullCol">
        {
            props.index === 0? 
            <p style={{width: '100%', textAlign: 'center', margin: 'auto'}}>1</p> 
            :
            <>
                <p style={{margin: 'auto 10px'}}>=</p>
                <Form.Label htmlFor={valueId} style={{display: 'none'}}>Enter value here</Form.Label>
                <Form.Control type='number' id={valueId} placeholder="value" name={`value_${props.index}`} value={value} onChange={(e) => setValue(e.target.value)} />
            </>
        }
        <Form.Label htmlFor={unitId} style={{display: 'none'}}>Enter unit here</Form.Label>
        <Form.Control type='text' id={unitId} placeholder="unit" name={`unit_${props.index}`} value={unit} onChange={(e) => setUnit(e.target.value)} />
    </Col>
}

export default function AddRules(props) {

    const rules = props.rules;
    const setRules = props.setRules;
    const [fieldNum, setFieldNum] = useState(2);
    const [reset, setReset] = useState(false);

    function handleSubmit(e) {
        e?.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        for (let field in data) {
            if (!data[field]) {
                // todo
                alert('incomplete input!');
                return;
            }
            
            const newRule = [{value: 0, unit: data.unit_0}];
            let rule = {};
            let counter = 0;
            for (let field in data) {
                if (counter === 0) {
                    counter++;
                    continue;
                }
                if (counter % 2 === 1) {
                    rule.value = data[field];
                } else {
                    rule.unit = data[field];
                    newRule.push(rule);
                    rule = {};
                }
                counter++;
            }
            setRules([...rules, newRule]);
        }
        setFieldNum(2);
        setReset(o => !o);
    }

    return <Card style={{ width: '100%', padding: 0, border: 'none' }}>
        <h1>
            Add your own rules here
        </h1>
        <Form onSubmit={handleSubmit}>
            <Container fluid style={{ padding: 0 }} >
                <Row style={{ width: '100%', margin: '15px 0' }}>
                    
                    {Array.from({length: fieldNum}).map((_, index) => <FormField key={index} index={index} reset={reset} />)}
                    <Col xs={12} sm={6} md={4} lg={3} className="fullCol">
                        <Button 
                            className="round primaryColorBg primaryColorBgHover" 
                            style={{'aspectRatio': '1/1', 'margin': 'auto'}}
                            onClick={()=>{ 
                                if (fieldNum>1) {
                                    setFieldNum(fieldNum + 1);
                                } else {
                                    setFieldNum(2);
                                }
                            }}
                        >
                            +
                        </Button>
                    </Col>
                    <Col xs={12}>
                        <Button type="submit">
                            Submit
                        </Button>
                    </Col>
                                    
                </Row>
            </Container>
        </Form>
    </Card>
}