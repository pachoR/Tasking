import React, { useState, useEffect } from 'react';
import ModalTaskPM from '../modals/ModalTaskPM.jsx';
import { webFormatTaskDate, compareNow_JSONformat } from '../formatParser.js';
import '../styles/TaskPM.css'


function TaskPM({ task_info }){
  const [taskId, taskInfo ] = task_info;  
  const [ isModal, setIsModal ] = useState(false);  
  const current_date = new Date().toISOString();  

  function openModal(){
    setIsModal(true);
  }

  function closeModal(){
    setIsModal(false);
  }

  return (
    <>
      {isModal && <ModalTaskPM task={task_info} closeModal={closeModal}/>}

      <div className="taskPM-container" onClick={openModal}>
        <div>
          <h2 className="taskPM-title">
            {taskInfo.task_title}  
          </h2>
        </div>
        <div className="taskPM-dates">
          <p>Started at: {webFormatTaskDate(taskInfo.init_date)}</p>
          <p><b>Death-line: {compareNow_JSONformat({date: taskInfo.end_date}) === 1 ? 'Overdue' : ''} {webFormatTaskDate(taskInfo.end_date)}</b></p>
        </div>
      </div>
    </>
  )
} 

export default TaskPM;
