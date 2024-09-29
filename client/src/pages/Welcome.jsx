import React, { useState } from "react";
import { Dot } from "react-animated-dots"
import { Redirect, useNavigate } from "react-router-dom";
import './Welcome.css';
import ModalLogin from "../components/ModalLogin.jsx";
import ModalRegister from "../components/ModalRegister.jsx";
import AnimatedButton from "../miscellaneous/AnimatedButton.jsx";
import ErrorMessage from "../miscellaneous/ErrorMessage.jsx";


function Welcome()  {
    
    const [isModalLogin, setModalLogin] = useState(false);
    const [isModalSignIn, setModalSignIn] = useState(false);

    async function openLogin() {
        await new Promise(r => setTimeout(r, 300));
        setModalLogin(true);
    }
    
    async function closeLogin() {
        await new Promise(r => setTimeout(r, 300));
        setModalLogin(false);
    }

    async function openSignIn() {
        await new Promise(r => setTimeout(r, 300));
        setModalSignIn(true);
    }
    
    async function closeSignIn() {
        await new Promise(r => setTimeout(r, 300));
        setModalSignIn(false);
    }
    


    return (
        <>
            <div className="welcome-container">
                <div className="title-area">
                    <h1>
                        <Dot>.</Dot>
                        <Dot>.</Dot>
                        Tasking
                        <Dot>.</Dot>
                        <Dot>.</Dot>
                    
                    </h1>
                </div>
                <div className="button-area">
                    <div className="btn">
                        {<AnimatedButton buttonProps={{
                            className:"btn button-login",
                            onClickFunction: openLogin,
                            text: "Login",
                            scaleInfo: {hover: 0.9, tap: 1.4}
                            }}/>}
                        {isModalLogin && 
                        <ModalLogin closeModal={closeLogin}/>}
                    </div>

                    <div className="btn">
                        {<AnimatedButton buttonProps={{
                            className:"btn button-signin",
                            onClickFunction: openSignIn,
                            text: "Sign in",
                            scaleInfo: {hover: 0.9, tap: 1.4}
                            }}/>}
                        {isModalSignIn && 
                        <ModalRegister closeModal={closeSignIn}/>}
                    </div>
                </div>
                

            </div>
        </>
    );
}

export default Welcome;