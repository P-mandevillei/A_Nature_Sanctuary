import { useId, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { serverPath } from "../../paths/paths";

export default function About() {
    const usernameId = useId();
    const usernameRef = useRef();
    const passwordId = useId();
    const passwordRef = useRef();

    function login() {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const data = {
            'request': 'login',
            'username': username,
            'password': password
        }
        fetch(serverPath, {
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            alert(result.valid);
        }).catch(err=>console.log(err));
    }

    return <div className="pad">
        <Form.Label htmlFor={usernameId}>Username</Form.Label>
        <Form.Control id={usernameId} ref={usernameRef} />
        <Form.Label htmlFor={passwordId}>Password</Form.Label>
        <Form.Control id={passwordId} ref={passwordRef} />
        <Button onClick={login}> Log In </Button>
    </div>
}