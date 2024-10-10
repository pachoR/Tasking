import React, { useState } from 'react';
import Close from '../assets/close_icon.svg?react';
import AnimatedButton from '../miscellaneous/AnimatedButton.jsx'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/ModalCreateProject.css'

const base_url = import.meta.env.VITE_BASE_URL;

function getToday(){
  const date = new Date();
  const month = date.getMonth() + 1 > 9 ? `${date.getMonth()+1}`: `0${date.getMonth()+1}`; 
  const day = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
  const year = date.getFullYear(); 
  return `${year}-${month}-${day}`;
}

function ModalCreateProject({closeModal, user}) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [projectName, setProjectName] = useState('');
  const [initDate, setInitDate] = useState(getToday());
  const [dueDate, setDueDate] = useState('');
  const [validProjectName, setValidProjectName] = useState(true);
  const [dateErrorMessage, setDateErrorMessage] = useState('');

  async function handleClick(e){
    e.preventDefault(); 
    if(!validDate(initDate, dueDate) || !validInput(projectName)){
      return;
    } 

    const data = {
      user_id: user.user_id,
      username: user.username,
      project: projectName,
      email: user.email,
      init_date: initDate,
      due_date: dueDate
    }
     
    try {
      const url = base_url + `api/createProject/${user.username}/${projectName}`; 
      console.log(url);
      const res = await axios.post(url, data);
      if(res.data.redirect){
        navigate(res.data.redirect);
      }
        
    } catch (error) {
      console.error('ERR!', error);
    }
    
  }

  async function validInput(input){
    setProjectName(input);
        
    if(!input){
      setValidProjectName(false);
      setErrorMessage('Project name field must be filled');
      return false;
    }
    setValidProjectName(true);
    const result = (await axios.get(base_url + `${user.username}`)).data;
    for(let i = 0; i < result.length; i++){
      if(result[i].project.toLowerCase() === input.toLowerCase()){
        setErrorMessage('Project name already exists');
        setValidProjectName(false);
        return false;
      } 
    }

    return true;
  }

  async function validDate(init, due){
    if(!init){
      setDateErrorMessage('There must be a start date');
      return false;
    }
     
    if(dueDate && dueDate < initDate){ 
      setDateErrorMessage('Ending date must be greater than starting one');
      return false;
    }

    return true;
  }

  return (
    <div className='modal' onClick={closeModal}>
      <div className="info-container" onClick={(event) => { event.stopPropagation(); }}>
        <div className='section header shadow-box'>
          <div className='title'>
            <h4>Create project</h4>
          </div>

          <div className='close-symbol-area'>
            <div className='close-symbol'>            
              <AnimatedButton buttonProps={{
                svg: <Close className="close-svg" />,
                onClickFunction: closeModal,
                className: "close-button",
                scaleInfo: {
                  hover: 0.7,
                  tap: 1.0
                }
              }} />
            </div>
          </div>
        </div>

        <div className='section input shadow-box'>
          <div className='form'>
            <form>
              <div className='form-info'>
                <label>Project name: <span id='project-len' style={{fontSize: '0.8rem'}}>{projectName.length}/20</span></label>
                <input
                    type="text"
                    value={projectName}
                    onChange={(e) => {
                    setErrorMessage('');
                    validInput(e.target.value.trim().slice(0,20)); 
                  }}
                  required
                />
                <div className='errorMessage-area'>
                  {!validProjectName && <h2>{errorMessage}</h2>} 
                </div>

                <div className='initDate date'>
                  <p>Started:</p>
                  <input
                    type="date"
                    value={initDate}
                    onChange={(e) => {setInitDate(e.target.value)}}
                    required
                  />
                </div>
                
                <div className='dueDate date'>
                  <p>Due to <span style={{color: 'var(--orange)'}}>(not required)</span>:</p>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => {setDueDate(e.target.value)}}
                    required
                  />
                </div> 

                <div className='errorMessage-area date-error'>
                  {dateErrorMessage && <h2>{dateErrorMessage}</h2>}
                </div>

                <div className='submitButton-area'>
                  <AnimatedButton buttonProps={{
                  text: 'Create',
                  type: 'submit',
                  onClickFunction: handleClick,
                  className: 'submitButton'
                  }} />
                </div>
                 
              </div> 
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCreateProject;
