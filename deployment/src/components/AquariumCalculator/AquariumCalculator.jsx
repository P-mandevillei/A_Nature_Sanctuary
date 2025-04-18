
import { useId, useRef, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";

export default function() {

    const cSourceId = useId();
    const cSource = useRef();
    const cTargetId = useId();
    const cTarget = useRef();
    const cChangeId = useId();
    const cChange = useRef();

    const [addThenDumpChange, setAddThenDumpChange] = useState();
    const [addWhileDumpChange, setAddWhileDumpChange] = useState();
    const [dumpThenAddChange, setDumpThenAddChange] = useState();
    
    function CalculateWaterChange(e) {
        e?.preventDefault();
        
        const s = cSource.current.value ?? 0;
        const m = cTarget.current.value ?? 0;
        const x = cChange.current.value ?? 0;
        
        const absChange = 7*x/(30*m-30*s+7*x);
        const addWhileDumpActualChange = absChange/(1-1/Math.pow(Math.E, x));
        const addThenDumpActualChange = absChange/(x/(1+x));

        setAddThenDumpChange(addThenDumpActualChange);
        setAddWhileDumpChange(addWhileDumpActualChange);
        setDumpThenAddChange(absChange);
    }

    return <div>
        This is a calculator-to-be!
        <br />
        <Button onClick={(e)=>{CalculateWaterChange(e)}}>Calculate Using Current Inputs</Button>

        <Container>
        <Row>

        <Col xs={12} sm={6} md={4} lg={3}>
            <Form.Label htmlFor={cTargetId}>Target Concentration (mg/L)</Form.Label>
            <Form.Control id={cTargetId} ref={cTarget}></Form.Control>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
            <Form.Label htmlFor={cSourceId}>Source Concentration (mg/L)</Form.Label>
            <Form.Control id={cSourceId} ref={cSource}></Form.Control>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
            <Form.Label htmlFor={cChangeId}>Rate of Change (mg/L/month, negative for decrease)</Form.Label>
            <Form.Control id={cChangeId} ref={cChange}></Form.Control>
        </Col>

        </Row>
        </Container>

        <Container>
        <Row>
        <Col xs={12} sm={6} md={4} lg={3}>
            Absolute Water Change (Dump all before replenishing): {" "}
            <span className="emphasis">{dumpThenAddChange? `${Math.round(dumpThenAddChange*100)}%` : (dumpThenAddChange===0? "0%" : "Invalid inputs")}</span>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
            Replenish while dumping: {" "}
            <span className="emphasis">{addWhileDumpChange? `${Math.round(addWhileDumpChange*100)}%` : (addWhileDumpChange===0? "0%" : "Invalid inputs")}</span>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
            Add all before dumping: {" "}
            <span className="emphasis">{addThenDumpChange? `${Math.round(addThenDumpChange*100)}%` : (addThenDumpChange===0? "0%" : "Invalid inputs")}</span>
        </Col>
        </Row>
        </Container>
    </div>
}