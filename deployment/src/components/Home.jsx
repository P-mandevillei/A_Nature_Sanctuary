import { Container, Row, Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router";
import TimeStamp from "./TimeStamp";

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

    const updates = [
        {'key': '1', 'name': 'waterChangeCalculator', 'link': 'aquarium_calculator/water_change_calculator'},
        {'key': '2', 'name': 'chloramine', 'link': 'focus/chloramine'},
        {'key': '3', 'name': 'waterChangeLevelAdjustment', 'link': 'aquarium_calculator/water_change_level_adjustment'},
    ]

    return <div>
        <Card style={{position: 'relative', height: '90vh'}}>
            <img 
                className="backgroundImgFlex"
                src="/texas_horned_lizard.webp"
                alt="An image of my Texas horned lizard"
            />
            <div className="frontTextWrapper">
                <h1 className="primaryColor" style={{margin: 30}}> 
                    {t('title')}
                </h1>
                <div 
                    style={{position: 'absolute', right: 20}} 
                    className="selectable primaryColor primaryColorHover"
                    onClick={switchLang}
                    >
                    {
                        lang === 'en'? '中文': 'English'
                    }
                </div>
                
                <p className="secondaryColor enlarge" style={{paddingLeft: 30}}>{t('des1')}</p>
                <p className="secondaryColor" style={{paddingLeft: 30}}>{t('des2')} </p>

                <div className="flexColAndCenter pad" style={{position: 'absolute', bottom: 0, width: '100%'}}>
                    <span className="primaryColor enlarge bold"> {t('updates')} </span>
                    {
                        updates.map(cur => <Card key={cur.key} className="pad" style={{width: '70%'}}>
                            <Container>
                                <Row>
                                    <Col sm={12} md={6}>
                                        <Link to={cur.link}> {t(cur.key)} </Link>
                                    </Col>
                                    <Col sm={12} md={6} style={{position: 'relative'}}>
                                        <TimeStamp name={cur.name} style={{position: 'absolute', right: 0}} />
                                    </Col>
                                </Row>
                            </Container>
                        </Card>)
                    }
                </div>
            </div>
            
            

        </Card>
        
    </div>
}