import { useContext, useEffect, useId, useRef, useState } from "react";
import { Button, Form, Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { loginPath, logoutPath } from "../paths/paths.js";
import { BarLoader, HashLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import LoginContext from "../contexts/loginContext.js";

export default function LogIn(props) {

    const { t } = useTranslation('login');
    const { t: msgT } = useTranslation('backend');

    const usernameId = useId();
    const usernameRef = useRef();
    const passwordId = useId();
    const passwordRef = useRef();

    const [loggedIn, setLoggedIn, checkLogin] = useContext(LoginContext);

    const [showLoader, setShowLoader] = useState(false);
    const [showLoader2, setShowLoader2] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
    const [msgHeader, setMsgHeader] = useState("");
    const [msgBody, setMsgBody] = useState("");

    function login() {
        setShowLoader(true);
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const data = {
            'username': username,
            'password': password
        }
        fetch(loginPath, {
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            setShowLoader(false);
            if (result.error) {
                setLoggedIn(false);
                setMsgHeader(t('fail'));
                setMsgBody(msgT(result?.msg));
                setShowMsg(true);
            } else if (!result.login) {
                setLoggedIn(false);
                setMsgHeader(t('fail'));
                setMsgBody(t('cannotFind'));
                setShowMsg(true);
            }
            else {
                setLoggedIn(true);
            }
        })
        .catch(err => {
            setShowLoader(false);
            setMsgHeader(t('fail'));
            setMsgBody(t('cannotConnect'));
            setShowMsg(true);
        });
    }

    function logout() {
        setShowLoader2(true);
        fetch(logoutPath, {
            headers: {
                'content-type': 'application/json'
            },
            method: "POST",
            credentials: 'include'
        }).then(res => res.json())
        .then(result => {
            setShowLoader2(false);
            if (result.error) {
                setMsgHeader(t('logoutFail'));
                setMsgBody(t('cannotConnect'));
                setShowMsg(true);
            } else {
                setLoggedIn(false);
            }
        })
        .catch(err => {
            setShowLoader2(false);
            setMsgHeader(t('logoutFail'));
            setMsgBody(t('cannotConnect'));
            setShowMsg(true);
        })
    }

    return <div >
        <ToastContainer className="p-3" position="middle-center" style={{zIndex: 998}}>
            <Toast className="tertiaryColorBg" show={showMsg} onClose={()=>{setShowMsg(false)}}>
                <Toast.Header>
                    <span style={{flex: 1}}>
                        {msgHeader}
                    </span>
                </Toast.Header>
                <Toast.Body>
                    {msgBody}
                </Toast.Body>
            </Toast>
        </ToastContainer>
        
        {
            loggedIn? <Button 
                    className={`${props.logoutClassName} primaryColorBg primaryColorBgHover largeBtnEffect`} 
                    style={{...props?.logoutStyle, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                    onClick={logout}
                >
                { showLoader2? <BarLoader loading={showLoader} color='rgb(228, 193, 153)' cssOverride={{'margin': '0.6em'}} /> : t('logout')}
            </Button>
            : <Card className={props.loginClassName} style={props?.loginStyle}>
                <div className="center enlarge bold primaryColor"> {t('title')} </div>
                <Form.Label htmlFor={usernameId}>{t('username')}</Form.Label>
                <Form.Control id={usernameId} ref={usernameRef} />
                <Form.Label htmlFor={passwordId}>{t('password')}</Form.Label>
                <Form.Control type='password' id={passwordId} ref={passwordRef} />
                <br />
                <Button onClick={login} disabled={showLoader} className="primaryColorBg primaryColorBgHover largeBtnEffect" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} > 
                    { showLoader? <BarLoader loading={showLoader} color='rgb(228, 193, 153)' cssOverride={{'margin': '0.6em'}} /> : t('login')   }         
                </Button>        
            </Card>
        }
    </div>
}