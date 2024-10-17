import React, { useState, useEffect } from 'react';
import Close from '../assets/close_icon.svg?react';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import AnimatedButton from '../miscellaneous/AnimatedButton.jsx';
import ConfirmSlider from '../miscellaneous/ConfirmSlider.jsx';
import { webFormatTaskDate } from '../formatParser.js';
import '../styles/ModalTask.css';


function ModalTask({closeModal, task, state}){
  
  console.log(task);
  const [startFormat, setStartFormat] = useState(webFormatTaskDate(task.init_date));
  const [endFormat, setEndFormat] = useState(webFormatTaskDate(task.end_date));

  function handleClick(){ 
    closeModal();
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
          {state && state == 'overdue' && <h1 style={{color: 'red'}}>{task.task_title}</h1>} 
          {state && state == 'pending' && <h1 style={{color: 'var(--orange)'}}>{task.task_title}</h1>} 
          {state && state == 'done' && <h1 style={{color: 'var(--dark-green)'}}>{task.task_title}</h1>} 

          <div className="due-info">{
              (state && state == 'overdue' && 
                <div className="state-modal" style={{color: 'red'}}>
                  <AssignmentLateIcon id="svg-state"/>
                </div>) ||
              (state && state == 'done' && 
                  <div className="state-modal" style={{color: 'var(--dark-green)'}}>
                    <TaskIcon id="svg-state"/>
                  </div>) ||
              (state && state == 'pending' && 
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
            <p>{task.task_descp}</p>
          </div>
        </div>

        <ConfirmSlider onSlide={() => {console.log('confirm task')}}/>
      </div>
    </div>
  );
}

export default ModalTask;
