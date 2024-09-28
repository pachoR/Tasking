import React, { useState } from "react";
import './ModalRegister.css';
import AnimatedButton from "./AnimatedButton";
import { useNavigate } from "react-router-dom";
import Close from '../assets/close_icon.svg?react';
import axios from "axios";
//import { ReactComponent as CloseIcon } from '../assets/close_icon.svg'

const base_url = import.meta.env.VITE_BASE_URL;

function ModalRegister({type, closeModal}){
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isUserLenValid , setUserLenValid] = useState('true');
    
    async function handleSubmit(e){
        e.preventDefault();

        var data = {
          user: username,
          pass: password
        }


        try {
          const url = base_url + 'welcome/login'
          console.log("url: " + url);
          const res = await axios.post(url, data);
          
          if(res.status === 200){
            navigate(res.data.redirect);
          }
              
        } catch (error) {
          console.log(error.message);  
        }  
        closeModal();
    }


    return (
      <>
      <div className="modal">
          <div className="register-container">
            <div className="title-section section">
              <h1>Log In</h1>
            </div>
            <div className="form-section section">
              <div className="close-button-area">
                
                <AnimatedButton buttonProps={{
                  svg: <Close className="close-svg"/>,
                  onClickFunction: closeModal,
                  className: "close-button",
                  scaleInfo: {
                    hover: 0.7,
                    tap: 1.0
                  }
                }}
                />
                
              </div>
              <div className="form">
                <form onSubmit={handleSubmit}>
                  <div className="form-info">
                    <label>username:</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-info">
                    <label>password:</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <AnimatedButton buttonProps={{
                    text: 'Log in',
                    type: 'submit',
                    onClickFunction: handleSubmit,
                    className: 'submit-button',
                  }}
                  />
                </form>
              </div>
              
            </div>
          </div>
        </div>
      </>
     )
}

export default ModalRegister;
