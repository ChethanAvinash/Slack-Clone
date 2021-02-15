import { Button } from '@material-ui/core';
import React from 'react';
import "../Styles/Login.css";
import {auth,provider} from "../Database/firebase";
import {useStateValue} from "../Providers/StateProvider";
import { actionTypes } from '../Providers/reducer';


function Login() {

    const [state,dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider).then( result =>{
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        })
        .catch((error) => {
            alert(error);
        });
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"/>
                <h1>Sign in to React HQ</h1>
                <p>react.slack.com</p>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    )
}

export default Login;