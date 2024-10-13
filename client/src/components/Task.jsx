import React, { useState, useEffect } from 'react';
import LoadingMessage from '../miscellaneous/LoadingMessage.jsx'
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { webFormatTaskDate, compareNow_JSONformat} from '../formatParser.js';
import axios from 'axios';
import '../styles/Task.css'
const base_url = import.meta.env.VITE_BASE_URL;

function Task({task_id, username}){

  const [taskInfo, setTaskInfo] = useState(null);
  const [endState, setEndState] = useState('');
  
  async function get_taskInfo(){
    const response = await axios.get(base_url + `api/getTask/${username}/${task_id}`);
    setTaskInfo(response.data[0]);
    console.log(response.data[0]);
  }
  
  useEffect(() => {
    if(taskInfo && !taskInfo.done){  
      const flag = compareNow_JSONformat({date: taskInfo.end_date})
      console.log(taskInfo.task_title,flag);
      if(flag >= 0){
        setEndState('overdue');
      }else{
        setEndState('pending');
      }
    }else if(taskInfo && taskInfo.done){
      setEndState('done');
    }
    
  })

  useEffect(() => {
    get_taskInfo();
  }, []);

  if(!taskInfo){ 
    return <LoadingMessage/>;
  }

  return ( 
    <div className="task-container">
      <div className="task-title">
        <h4>{taskInfo.task_title} <span className="project-name">({taskInfo.project_name})</span></h4>
      </div>

      <div className="task-dates"> 
        <p>Due to: { webFormatTaskDate(taskInfo.end_date) } </p>
        <div>
          <p><b>status: {endState}</b></p>
          {endState == 'overdue'} 
        </div><
      </div>

      <div className="task-descp">
        <p>{taskInfo.task_descp}</p>
      </div>

    </div>
  );
}


export default Task;
