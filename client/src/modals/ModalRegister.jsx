import React, { useState } from "react";
import '../styles/Modal.css';
import AnimatedButton from "../miscellaneous/AnimatedButton";
import { useNavigate } from "react-router-dom";
import Close from '../assets/close_icon.svg?react';
import axios from "axios";
import ErrorMessage from '../miscellaneous/ErrorMessage';

const base_url = import.meta.env.VITE_BASE_URL;

function ModalRegister({closeModal}){
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error_message, setError_message] = useState('');
    
    async function handleSubmit(e){
        e.preventDefault();

        if(!username || !email || !password){
          return;
        }

        const data = {
          user: username,
          pass: password,
          email: email
        }

        try {
          const url = base_url + 'welcome/register';
          const res = await axios.post(url, data);

          if(res.status == 200){ 
            navigate(res.data.redirect, {state: 200});
            closeModal();
          }
              
        } catch (error) {
          if(error.response && error.response.status === 403){
            const server_errMsg = error.response.data.errorMessage || 'Invalid credentials';
            setError_message(server_errMsg);
          }
        }  

    }


    return (
      <>
      <div className="modal">

          {error_message &&
          <div className="errorMessage-container">
              <ErrorMessage props={{
                text: error_message,
              }}
              />
          </div>
          }

          <div className="register-container">
            <div className="title-section section">
              <h1>Register</h1>
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
                      onChange={(e) => {
                        setError_message('');
                        setUsername(e.target.value.toLowerCase());
                      }}
                      required
                    />
                  </div>

                  <div className="form-info">
                    <label>email:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setError_message('');
                        setEmail(e.target.value.toLowerCase());
                      }}
                      required
                    />
                  </div>

                  <div className="form-info">
                    <label>password:</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setError_message('');
                        setPassword(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <AnimatedButton buttonProps={{
                    text: 'Register',
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
