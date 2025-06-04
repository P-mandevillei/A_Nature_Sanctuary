import { useEffect, useId, useState } from "react";
import { Nav, Navbar, Container, Form, Card,  } from "react-bootstrap";
import { Link, Navigate, Outlet, useNavigate, useParams } from "react-router";
import { useTranslation } from 'react-i18next';

const langs = ['en', 'cn'];

export default function SiteLayout(props) {

    const { lang } = useParams();
    const { i18n } = useTranslation();
    useEffect(()=>{
        if (langs.includes(lang)) {
            i18n.changeLanguage(lang);
        }
    }, [lang, i18n]);
    if (!langs.includes(lang)) {
        return <Navigate to='/en' replace />;
    }

    const { t } = useTranslation('siteLayout');

    const langId = useId();
    const [curLang, setCurLang] = useState(lang);
    const nav = useNavigate();
    useEffect(()=>{
        const currentPath = window.location.hash.split(`/${lang}`)[1]?? '';
        nav(`/${curLang}${currentPath}`);
    }, [curLang]);

    return <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <Navbar bg="dark" data-bs-theme="dark" sticky="top" expand="lg" className="bg-body-tertiary primaryColorBg">
        <Container>
            <Navbar.Brand as={Link} to='/'>
                <img
                src="/logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/">{t('home')}</Nav.Link>
                <Nav.Link as={Link} to='aquarium_calculator'>{t('calculator')}</Nav.Link>
                <label>
                    <Form.Select 
                        className="primaryColorBg selectableHover" 
                        id={langId}
                        value={curLang}
                        onChange={(e)=>{setCurLang(e.target.value)}}>
                        <option value='en'>English</option>
                        <option value='cn'>中文</option>
                    </Form.Select>
                </label>
                
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>

        <div className="margin" style={{flex: 1}} >
            <Outlet />
        </div>

        <Navbar className="primaryColorBg" bg="dark" data-bs-theme="dark"
            style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <img 
                    className="selectable" 
                    src="/github.png" 
                    alt="github logo redirect" 
                    onClick={()=>{window.location.href = "https://github.com/P-mandevillei"}}
                    style={{
                        aspectRatio: '1/1',
                        height: 30
                    }}
                />
            </div>
            <Navbar.Text className="pad shrink">
                {t('disclaimer')}
            </Navbar.Text>
        </Navbar>
    </div>

}