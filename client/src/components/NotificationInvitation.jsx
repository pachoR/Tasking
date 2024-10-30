import React, { useState, useEffect } from 'react';
import Badge from '@mui/material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import InvitationModal from '../modals/InvitationModal.jsx';
import { atom } from 'jotai';
import { useAtom } from 'jotai';
import { styled } from '@mui/material/styles';


const base_url = import.meta.env.VITE_BASE_URL;
export const countInvitations = atom(0);

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid var(--dark-green)`,
    padding: '0 4px',
    backgroundColor: 'var(--dark-green)',
    color: 'var(--white)',
  },
}));

function NotificationInvitation(){
  const [invitationCount] = useAtom(countInvitations);
  const [isModal, setIsModal] = useState(false);
  async function get_user_notifications(){
  }

  function openInvitationModal(){
    setIsModal(true); 
  }

  function closeInvitationModal(){
    setIsModal(false);
  }
 
  useEffect(() => {
      get_user_notifications();
  }, [countInvitations])
  
  return (
    <div>
      {isModal && <InvitationModal closeModal={closeInvitationModal}/>}
      <div className="notification-container" style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end',}}>
        <button onClick={openInvitationModal} style={{backgroundColor: 'transparent'}}>
          <StyledBadge badgeContent={invitationCount}>
            <EmailIcon sx={{fill: 'var(--orange)'}}/>
          </StyledBadge>
        </button>
      </div>
    </div>
  )
}

export default NotificationInvitation;
