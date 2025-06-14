import { useEffect, useId, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { loginPath, protectedPath } from "../paths/paths.js";

export default function LogIn(props) {

    const usernameId = useId();
    const usernameRef = useRef();
    const passwordId = useId();
    const passwordRef = useRef();

    const [loggedIn, setLoggedIn] = useState(false);

    function login() {
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
            if (result.error) {
                setLoggedIn(false);
            } else {
                setLoggedIn(result?.login);
            }
        })
        .catch(err => {
            console.log(err)
        });
    }

    function checkLogin() {
        fetch(protectedPath, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({request: 'checkLogin'})
        }).then(res => res.json())
        .then(result => {
            if (!result.error) {
                setLoggedIn(result?.login);
            }
            else {
                setLoggedIn(false);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(()=>{
        checkLogin();
    }, []);

    function logout() {
        
    }

    return loggedIn? <Button 
                className={props.logoutClassName} 
                style={props?.logoutStyle}
                onClick={logout}
            >
            Log Out
        </Button>
        : <Card className={props.loginClassName} style={props?.loginStyle}>
            
            <Form.Label htmlFor={usernameId}>Username</Form.Label>
            <Form.Control id={usernameId} ref={usernameRef} />
            <Form.Label htmlFor={passwordId}>Password</Form.Label>
            <Form.Control id={passwordId} ref={passwordRef} />
            <Button onClick={login}> Log In </Button>

        </Card>
    
}