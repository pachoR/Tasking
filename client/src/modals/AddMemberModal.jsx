import React, { useState, useReact } from 'react';
import AnimatedButton from '../miscellaneous/AnimatedButton.jsx';
import Close from '../assets/close_icon.svg?react';
import TextField from '@mui/material/TextField';
import ErrorMessage from '../miscellaneous/ErrorMessage.jsx'; 
import axios from 'axios';
import '../styles/AddMemberModal.css'

const base_url = import.meta.env.VITE_BASE_URL;

function AddMemberModal({inviter, closeModal}){

  const [ userInput, setUserInput ] = useState('');
  const [ canAdd, setCanAdd ] = useState(false);
  const [ error, setError ] = useState(false);

  async function handleInvitation(){
    console.log('userInput', userInput);
    if(!userInput){ 
      setError(true); 
    }
  }
  
  return (
    <> 
      <div className='add-modal' onClick={closeModal}>
        {error && 
          <div style={{backgroundColor: 'red', color: 'var(--white)', marginBottom: '1rem', borderRadius: '20px', width: 'auto', padding: '1rem'}}>
            <ErrorMessage props={{text: 'Enter a valid username'}}/>
          </div>}
        <div className='add-container' onClick={(e) => {e.stopPropagation()}}>
          <div className='add-title'>
            <h1>Add Members</h1>
            
            <div className='add-close'>
              <AnimatedButton buttonProps={{
                svg: <Close className="close-svg-style" />,
                onClickFunction: closeModal,
                className: "close-style",
                scaleInfo: {
                  hover: 0.9,
                  tap: 1.2
              }}}/>
            </div>
          </div>

          <div className='add-invite'>
            <h4>Invite: </h4>
            <input
              type="text" 
              className="user-input"
              placeholder="username"
              value={userInput}
              onChange={(e)=>{
                setError(false);
                setUserInput(e.target.value);}}
            /> 
          </div>

          <div className='add-button'>
            <AnimatedButton buttonProps={{ 
              onClickFunction: handleInvitation,
              className: 'invite-button',
              text: 'Send invitation'
            }}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddMemberModal;
