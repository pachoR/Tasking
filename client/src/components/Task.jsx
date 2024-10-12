import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { webFormatTaskDate } from '../formatParser.js';
import axios from 'axios';
import '../styles/Task.css'
const base_url = import.meta.env.VITE_BASE_URL;

function Task({task_id, username}){

  const [taskInfo, setTaskInfo] = useState({});
  const [endState, setEndState] = useState('');
  
  async function get_taskInfo(){
    const response = await axios.get(base_url + `api/getTask/${username}/${task_id}`);
    setTaskInfo(response.data[0]);
    console.log(response.data[0]);
  }
 

  useEffect(() => {
    get_taskInfo();
  }, []);

  if(!taskInfo){ 
    return null;
  }

  return (
    <div className="task-container">
      <div className="task-title">
        <h4>{taskInfo.task_title} <span className="project-name">({taskInfo.project_name})</span></h4>
      </div>

      <div className="task-dates"> 
        <p>Due: { webFormatTaskDate(taskInfo.task_end) }</p> 
      </div>

      <div className="task-descp">
        <p>{taskInfo.task_descp}</p>
      </div>

    </div>
  );
}


export default Task;
