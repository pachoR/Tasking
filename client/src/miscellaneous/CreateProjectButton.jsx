import React, { useEffect, useState } from 'react';
import '../styles/CreateProjectButton.css'
import AnimatedButton from '../miscellaneous/AnimatedButton.jsx';
import ModalCreateProject from '../modals/ModalCreateProject.jsx';
import axios from 'axios';
const base_url = import.meta.env.VITE_BASE_URL;

function CreateProjectButton({props}){

  const [isModal, setIsModal] = useState(false);
  const [user, setUser] = useState({});

  function openModal(){ 
    setIsModal(true);
  }

  function closeModal(redirect_url){
    setIsModal(false);
  }
 
  async function get_userFullInfo(username){
    try { 
      const response = await axios.get(base_url+`api/getUserInfo/${username}`); 
      setUser(response.data[0]);
    } catch (error) {
      console.error('ERR! Create Project Button: getting user full info', error); 
    }   
  }
 
  useEffect(() => {
    get_userFullInfo(props.user_info.username);
    
  }, []); 

  if(!user){
    return;
  }

  return (
    <div className="create-button-container">
      <AnimatedButton buttonProps={{
        className: 'create-project-button',
        text: 'Create Project',
        onClickFunction: openModal 
      }} 
      />
      {isModal && 
      <ModalCreateProject closeModal={closeModal} user={user}/>}
    </div> 
  )
}

export default CreateProjectButton;
