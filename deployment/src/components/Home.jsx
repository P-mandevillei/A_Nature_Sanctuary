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
        <Card style={{position: 'relative', height: '90vh'}}>
            <img 
                className="backgroundImgFlex"
                src="/texas_horned_lizard.webp"
                alt="An image of my Texas horned lizard"
            />
            <div className="frontTextWrapper pad">
                <h1 className="primaryColor margin"> 
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
                
                <p className="secondaryColor enlarge padLeft">{t('des1')}</p>
                <p className="secondaryColor padLeft">{t('des2')} </p>

                <div>
                    
                </div>
            </div>
            
        </Card>
        
    </div>
}