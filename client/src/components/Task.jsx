import React, { useState, useEffect } from 'react';
import LoadingMessage from '../miscellaneous/LoadingMessage.jsx'
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ModalTask from '../components/ModalTask.jsx';
import { webFormatTaskDate, compareNow_JSONformat} from '../formatParser.js';
import axios from 'axios';
import '../styles/Task.css'
const base_url = import.meta.env.VITE_BASE_URL;

function Task({task_id, username}){

  const [taskInfo, setTaskInfo] = useState(null);
  const [endState, setEndState] = useState('');
  const [isModal, setIsModal] = useState(false);

  async function get_taskInfo(){
    const response = await axios.get(base_url + `api/getTask/${username}/${task_id}`);
    setTaskInfo(response.data[0]);
    const task = response.data[0];

    if(task && !task.done){  
      const flag = compareNow_JSONformat({date: task.end_date}) 
      if(flag >= 0){
        setEndState('overdue'); 
      }else{
        setEndState('pending'); 
      }
    }else if(task && task.done){
      setEndState('done'); 
    }
  }

  function closeModal(){ 
    setIsModal(false);
  }
 
  function openModal(){
    setIsModal(true);
  } 

  useEffect(() => {
    get_taskInfo();
  }, []);

  useEffect(() => {
    if(!isModal){
      get_taskInfo();
    }
  }, [isModal]);

  if(!taskInfo){ 
    return <LoadingMessage/>;
  }

  return (  
    <div className="task-container" onClick={openModal}>
      <div className="task-title" style={{paddingLeft: '1rem'}}>
        <h4>{taskInfo.task_title} <span className="project-name">({taskInfo.project_name})</span></h4>
      </div>

      <div className="task-dates" style={{paddingLeft: '1rem'}}> 
        <p>Due to: { webFormatTaskDate(taskInfo.end_date) } </p>
        <div className="status-container"> 
          {endState == "pending" && 
            <div className="pending status tooltip">
              <PendingActionsIcon/>
              <span className="tooltiptext pending-border">pending</span>
            </div>}

          {endState == "done" && 
            <div className="done status tooltip">
              <TaskIcon/>
              <span className="tooltiptext done-border">done</span>
            </div>}

          {endState == "overdue" && 
            <div className="overdue status tooltip">
              <AssignmentLateIcon/>
              <span className="tooltiptext overdue-border">overdue</span>
            </div>}
        </div>
      </div>

      <div className="task-descp"> 
        {taskInfo.task_descp.length > 30 ? <p>{taskInfo.task_descp.slice(0,30)}...</p> : <p>{taskInfo.task_descp}</p>} 
      </div>

      {isModal && <ModalTask closeModal={closeModal} task={taskInfo} state={endState}/>}
    </div>
  );
}

export default Task;
