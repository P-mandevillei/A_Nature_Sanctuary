import { Container, Row, Col, Card } from "react-bootstrap";

export default function Home(props) {
    return <div>
        <h1 className="center">A Nature Sanctuary</h1>
        <p>Welcome to my homepage.</p>
        <Container>
            <Row>
                <Col xs={4} sm={3} md={2} lg={1}>
                    <Card style={{"width": "40%"}}>
                        <img 
                            className="selectable" 
                            src="/github.png" 
                            alt="github logo redirect" 
                            onClick={()=>{window.location.href = "https://github.com/P-mandevillei"}}
                        />
                    </Card>
                </Col>
                <Col xs={8} sm={9} md={10} lg={11}>
                    <p>Blah Blah Blah</p>
                </Col>
            </Row>
        </Container>
        
    </div>
}