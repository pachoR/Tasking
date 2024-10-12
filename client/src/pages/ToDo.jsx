import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx'
import LoadingMessage from '../miscellaneous/LoadingMessage.jsx';
import Task from '../components/Task.jsx';
import AnimatedButton from '../miscellaneous/AnimatedButton.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/ToDo.css';
const base_url = import.meta.env.VITE_BASE_URL;

function ToDo(){

  const { username } = useParams();
  const [ loading, setLoading ] = useState(true);
  const [tasks, setTasks] = useState([]);
  
  async function get_userTasks(){
    try{
      const result = await axios.get(base_url + `api/getTasksUser/${username}`); 
      setTasks(result.data); 
    } catch(error){
      console.error('ERR! get_userTasks()', error);
    }
      
  }

  useEffect(() => {
    get_userTasks();
  }, [])

return (
    <>
      <NavBar/>

      <div className="todo-title">
        <h1>To Do</h1>
      </div>

      <div className="page-grid">
        <div className="tasks-container">
          {tasks.map((task) => {
            return (
              <div key={task.task_id} style={{paddingLeft: '2rem', width: '100%', paddingBottom: '1rem'}}>
                <Task key={task.task_id} username={username} task_id={task.task_id}/>
              </div>
            );
          })}
        </div>
      </div>
      
    </>
  );
}

export default ToDo;

