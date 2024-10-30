import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import '../styles/InvitationModal.css';
import { useAtom } from 'jotai';
import { userInfoAtom } from '../atoms.js';

const base_url = import.meta.env.VITE_BASE_URL;
function InvitationModal({ closeModal }){
  
  const [invitations, setInvitations] = useState(null);
  const [userInfo] = useAtom(userInfoAtom); 

  async function get_invitations(){
    const url = base_url + 'api/getPendingInvitations/' + userInfo.username;
    const result = (await axios.get(url)).data.result;
    console.log(result);
    setInvitations(result); 
  }

  useEffect(() => {
    get_invitations();
  }, [])

return (
  <div className='invitation-modal' onClick={closeModal}>
    <div className='invitation-dropdown' onClick={(e) => {e.stopPropagation()}}>
      <div style={{display:'flex', flexDirection: 'column', width: '100%', textAlign: 'center', justifyContent: 'center'}}>
        <h1 style={{fontSize: '1rem', margin: '0'}}>Invitations</h1>
      </div>
              
      <div className='invitation-list-container'>
        {invitations && 
          invitations.map((invitation) => (
            <div key={invitation.invitation_id}>
              <p>{invitation.project_name}</p>
            </div>
          ))
        }   

        {!invitations && 
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
