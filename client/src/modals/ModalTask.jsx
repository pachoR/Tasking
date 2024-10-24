import React, { useState, useEffect } from 'react';
import Close from '../assets/close_icon.svg?react';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import AnimatedButton from '../miscellaneous/AnimatedButton.jsx';
import ConfirmSlider from '../miscellaneous/ConfirmSlider.jsx';
import axios from 'axios';
import { webFormatTaskDate } from '../formatParser.js';
import '../styles/ModalTask.css';
const base_url = import.meta.env.VITE_BASE_URL;

function ModalTask({closeModal, task, state}){
   
  const [startFormat, setStartFormat] = useState(webFormatTaskDate(task.init_date));
  const [endFormat, setEndFormat] = useState(webFormatTaskDate(task.end_date))
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleClick(){ 
    if(isSubmitted)
      closeModal(true);
    else
      closeModal(false);
  }

  async function handleTaskSubmit(){ 

    try {
      const response = await axios.post(base_url + `api/setDone/${task.task_id}/${task.user_id}`);

      if(response){
        setIsSubmitted(true);
        task.done = true;
        state = "done";
 
        setTimeout(()=>{
          closeModal(true);
        }, 700); 
      }
    } catch(error){
      console.error(`error handling sumbition ${error}`);
    }
    setIsSubmitted(true);
  }


  return (
    <div className="modal" onClick={handleClick}> 
      <div className="modal-container shadow-box" onClick={(event) => {event.stopPropagation()}}>
        <div className="close-symbol"> 
          <AnimatedButton buttonProps={{
            svg: <Close className="close-svg" />,
            onClickFunction: handleClick,
            className: "close-button",
            scaleInfo: {
              hover: 0.9,
              tap: 1.2
              }}}/>


        </div>

        <div className="modal-title">
          {isSubmitted && <h1 style={{color: 'var(--dark-green)'}}>{task.task_title}</h1>} 
          {state && state == 'overdue' && !isSubmitted && <h1 style={{color: 'red'}}>{task.task_title}</h1>} 
          {state && state == 'pending' && !isSubmitted && <h1 style={{color: 'var(--orange)'}}>{task.task_title}</h1>} 
          
          <div className="due-info">{
              (state && state == 'overdue' && !isSubmitted && 
                <div className="state-modal" style={{color: 'red'}}>
                  <AssignmentLateIcon id="svg-state"/>
                </div>) ||
              (isSubmitted && 
                  <div className="state-modal" style={{color: 'var(--dark-green)'}}>
                    <TaskIcon id="svg-state"/>
                  </div>) ||
              (state && state == 'pending' &&  !isSubmitted &&
                  <div className="state-modal" style={{color: 'var(--orange)'}}> 
                    <PendingActionsIcon id="svg-state"/>
                  </div>)
            }
            </div>
        </div>

        <div className="modal-info">
          <div className="modal-head">  
            <div className="modal-initInfo">
              <p>Started at: <b>{startFormat}</b></p>
              <p>created by: <b>{task.task_creator}</b></p>
            </div> 
          </div>

          <div className="modal-desc">
            <h1>{task.project_name}</h1>
            <h3>Due to: {endFormat}</h3>
            <p>{task.task_descp}</p>
          </div>
        </div>

        <div className="modal-confirm"> 
          <ConfirmSlider onSlide={() => {handleTaskSubmit()}}/>
          
          {!isSubmitted ? <p style={{color: 'var(--orange)'}}><i>Slide to mark as complete</i></p> 
            : <p style={{color: 'var(--dark-green)'}}>Slide to mark as complete</p>}
        </div> 
      </div>
    </div>
  );
}

export default ModalTask;
