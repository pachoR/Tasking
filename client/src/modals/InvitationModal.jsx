import React, { useState, useEffect } from 'react';
import AnimatedButton from '../miscellaneous/AnimatedButton.jsx';
import { socket } from '../socket.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../styles/InvitationModal.css';
import { useAtom } from 'jotai';
import { userInfoAtom, updateHomeToogle } from '../atoms.js';

const base_url = import.meta.env.VITE_BASE_URL;

function InvitationModal({ closeModal }){
  
  const [invitations, setInvitations] = useState(null);
  const [invitationsLen, setInvitationsLen] = useState(0);
  const [userInfo] = useAtom(userInfoAtom);
  const navigate = useNavigate(); 
  

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado al servidor con id: ', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.error('Err! de conexion', err.message);
    });

    socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('disconnect');
    }
  }, [])

  async function get_invitations(){
    if(!userInfo){
      navigate('/');
    }

    socket.emit('user_connected', userInfo.username);
    const url = base_url + 'api/getPendingInvitations/' + userInfo.username; 
    const result = (await axios.get(url)).data.result;
    setInvitations(result);  
  }

  
  async function acceptInvitation(invitation_id){
    const url = base_url + `api/setInvitationStatus/${invitation_id}/A`;
    const result = (await axios.post(url)).data.result;
   
    setTimeout(()=>{
      closeModal(true);
    }, 700);
    window.location.reload();
  }

  async function declineInvitation(invitation_id){
    const url = base_url + `api/setInvitationStatus/${invitation_id}/D`; 
    const result = (await axios.post(url)).data.result;
  
    setTimeout(()=>{
      closeModal(true);
    }, 700);
    window.location.reload();
  } 

  useEffect(() => {
    get_invitations();
  }, []);

return (
  <div className='invitation-modal' onClick={closeModal}>
    <div className='invitation-dropdown' onClick={(e) => {e.stopPropagation()}}>
      <div style={{display:'flex', flexDirection: 'column', width: '100%', textAlign: 'center', justifyContent: 'center', marginTop: '0.5rem'}}>
        <h1 style={{fontSize: '1rem', margin: '0'}}>Invitations</h1>
      </div>
              
      <div className='invitation-list-container'>
        {invitations && 
          invitations.map((invitation) => (
            <div className='invitation-div' key={invitation.invitation_id}>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'start',}}>                
                <p style={{fontSize: '0.7rem', margin: '10px 0 0 0'}}>{invitation.inviter_username} invited you to:</p>
                <p style={{fontSize: '1.0rem', margin: '0 0 10px 0'}}>{invitation.project_name}</p>
              </div>
              
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <AnimatedButton buttonProps={{
                  scaleInfo: {hover: 0.9, tap: 1.0},
                  text: 'Accept',
                  className: 'acceptInvitation-button invitationButton',
                  onClickFunction: () => acceptInvitation(invitation.invitation_id)
                }}/>

                <AnimatedButton buttonProps={{
                  scaleInfo: {hover: 0.9, tap: 1.0},
                  text: 'Decline',
                  className: 'declineInvitation-button invitationButton',
                  onClickFunction: () => declineInvitation(invitation.invitation_id) 
                }}/> 
              </div>  
                
            </div>
          ))
        }   

        {!invitations || invitations.length == 0  && 
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%'}}>
            <p>No pending invitations</p>              
          </div>
        }
      </div>
    </div>      
  </div>
)
}

export default InvitationModal;
