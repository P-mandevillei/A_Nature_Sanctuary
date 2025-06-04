import { Container, Row, Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";

export default function Home(props) {

    const {t} = useTranslation('home');
    const {lang} = useParams();
    const nav = useNavigate();
    function switchLang() {
        if (lang === 'en') {
            nav('/cn');
        }
        else {
            nav('/en');
        }
    }

    return <div>
        <div 
            style={{position: 'absolute', right: 20}} 
            className="selectable primaryColor primaryColorHover"
            onClick={switchLang}
            >
            {
                lang === 'en'? '中文': 'English'
            }
        </div>
        <h1 className="center"> {t('title')} </h1>
        
        <p>Welcome to my homepage.</p>
        <Container>
            <Row>
                
                <Col xs={8} sm={9} md={10} lg={11}>
                    <p>Blah Blah Blah</p>
                </Col>
            </Row>
        </Container>
        
    </div>
}