import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import '../styles/MembersLists.css'
const base_url = import.meta.env.VITE_BASE_URL;

function MembersList({props}){

  const [projectUsers, setProjectUsers] = useState([]);

  async function get_users(){
    let url = base_url + `api/getUsers/${props.project_id}`; 
    const result = (await axios.get(url)).data; 
    setProjectUsers(result)
  }

  useEffect(() => {
        get_users();
  }, []);

  return (
    <div className='list-container'>
      <div className='list-title'>
        <h5>Members</h5>
        <button className='addButton'><AddCircleIcon/></button>
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
