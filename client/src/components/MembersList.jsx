import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AnimatedButton from '../miscellaneous/AnimatedButton.jsx';
import AddMemberModal from '../modals/AddMemberModal.jsx';
import axios from 'axios';
import '../styles/MembersLists.css'
import { flag_bit, if_can } from '../permission.js';
const base_url = import.meta.env.VITE_BASE_URL;

function MembersList({props}){

  const [canAdd, setCanAdd] = useState(false);
  const [projectUsers, setProjectUsers] = useState([]);
  const [isModal, setIsModal] = useState(false);
 

  function openModal(){
    setIsModal(true);
  }

  function closeModal(){
    setIsModal(false);
  }

  async function get_users(){
    let url = base_url + `api/getUsers/${props.project_id}`; 
    const result = (await axios.get(url)).data; 
    setProjectUsers(result);
  }

  async function canAdd_permisions(){
    const project = props.project;
    const username = props.current_user;
   
    const permissions = (await axios.get(base_url + `${username}/${project}`)).data[0].permissions;
    setCanAdd(if_can(permissions, flag_bit.ADD_REMOVE_USERS));
    
  }
  
  useEffect(() => {
    get_users();
    canAdd_permisions();
  }, []);

  return (
    <div className='list-container'>
      {canAdd && isModal && <AddMemberModal inviter={props.current_user} closeModal={closeModal}/>}
      <div className='list-title'>
        <h5>Members</h5>
        {canAdd && <AnimatedButton buttonProps={{
                        scaleInfo: {hover: 0.8, tap: 1.5},
                        onClickFunction: openModal,
                        className: 'addButton',
                        component: <AddCircleIcon/>
                    }}/>}
      </div>
      <div className='list-members'>
        {projectUsers.map((user) => {
            return (
              <div key={user.username} className='list-member'>
                <p className='list-user'><b>{user.username}</b></p>
                <p className='list-rol'>{user.rol}</p>
              </div>
            );
        })}
      </div>
    </div>
  )
}

export default MembersList;
