import { useContext, useEffect, useState } from "react";
import LogIn from "../Login";
import LoginContext from "../../contexts/loginContext";
import { protectedPath } from "../../paths/paths";
import { useParams } from "react-router";

export default function About() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    const [content1, setContent1] = useState('');
    const {lang} = useParams();

    function fetchContent1() {
        fetch(protectedPath, {
            method: "POST",
            credentials: 'include',
            headers: {
                'content-type': "application/json"
            },
            body:  JSON.stringify({'request': 'aboutContent1'})
        })
        .then(res => res.json())
        .then(result => {
            if (!result.error) {
                console.log(result);
                setContent1(result.content);
            }
            
        })
        .catch(err => console.log(err));
    }
    useEffect(()=>{
        if (loggedIn) {
            fetchContent1();
        }
    }, [loggedIn]);


    return <div>
        <LogIn loginClassName='pad' logoutStyle={{position: 'absolute', right: 0, fontSize: '0.8em', padding: '0.4em'}} />
        {
            loggedIn? <>
                {content1[lang]}
            </>
            : ""
        }
    </div>
    
}