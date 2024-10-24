import React, { useState, useEffect } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { webFormatTaskDate, compareNow_JSONformat } from '../formatParser.js';
import '../styles/ModalTaskPM.css'

function ModalTaskPM({task, closeModal}){ 
  const [taskId, taskInfo ] = task;  

  return (
    <>
      <div className='modal-PM' onClick={closeModal}>
        <div className='modal-container-PM' onClick={(e) => {e.stopPropagation()}}>
          <div className='task-info'>
            <div className='task-info-header'>
              <h2>{taskInfo.task_title}</h2>
              <p><b>
                Death-line: {webFormatTaskDate(taskInfo.end_date)}
                <span style={{color: 'var(--red)', paddingLeft: '0.5rem'}}>{compareNow_JSONformat({date: taskInfo.end_date}) === 1 ? 'Overdue' : ''}</span> 
              </b></p> 
            </div>

            <div className='task-info-desc'>
              <p><b>Start-Date: {webFormatTaskDate(taskInfo.init_date)}</b></p>
              <p style={{fontSize: '1.5rem', marginTop:'1.5rem', color: 'var(--orange)'}}><b>Description:</b></p>
              <p>{taskInfo.task_descp}</p>
            </div>
          </div>

          <div className='members-info'>
            <div className='members-list-container'>

              {taskInfo.users_info.length > 0 &&
              <ul style={{listStyle: 'none'}}>
                {taskInfo.users_info.map((user) => {
                  return  <li key={user.user_id}>
                            <div className='li-user'>
                              <p>{user.username}</p>
                              {user.done ? <DoneIcon sx={{fill: 'var(--dark-green)'}}/> : <DoNotDisturbIcon sx={{fill: 'red'}}/>}
                            </div>
                          </li>  
                })}
              </ul>}

              {taskInfo.users_info.length === 0 &&
                <h2 style={{paddingTop: '2rem', color: 'var(--red)'}}>No user got this task assigned</h2>
              }
            </div>
          </div>
        </div> 
      </div>
    </>
  )
}

export default ModalTaskPM;
